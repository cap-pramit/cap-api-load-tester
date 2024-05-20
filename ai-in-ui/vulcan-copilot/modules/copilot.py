from ..modules.response_parser import ResponseParser
from ..modules.chat_completion import ChatCompletion
from ..context.ui_context import chat_history

class Copilot:
    def __init__(self):
        self.chat_summary = {}
        self.chat_instance = ChatCompletion()

    async def generate_code(self, session_id, prompt):
        user_prompt = {
            "role": "user",
            "content": prompt,
        }
        chat_messages = []
        prev_chat = []
        existing_session = False
        chat_count = 0
        folder_name = None
        if session_id in self.chat_summary:
            existing_session = True
            prev_chat = self.chat_summary[session_id]['chat']
            chat_count = self.chat_summary[session_id]['count']
            folder_name = self.chat_summary[session_id]['folder']
            chat_messages += prev_chat
        else:
            chat_messages += chat_history
        model_response, summary_available = await self.chat_instance.get_model_response(
            chat_history=chat_messages,
            user_prompt=user_prompt,
            existing_session=existing_session
        )
        file_name = self.chat_instance.write_response_to_file(model_response)
        parser = ResponseParser(file_name, summary_available)
        parsed_data, summary = parser.parse(folder_name if existing_session is True else None)
        if summary_available:
            prev_chat = prev_chat[:2]
            chat_count = 0
            prev_chat.append({
                "role": "user",
                "content": summary,
            })
        else:
            prev_chat.append(user_prompt)
            prev_chat.append({
                "role": "assistant",
                "content": model_response,
            })
        cfg = {
            'chat': prev_chat,
            'count': chat_count + 1,
            'folder': folder_name if existing_session is True else parsed_data['folder_name']
        }
        self.chat_summary[session_id] = cfg
        return parsed_data
