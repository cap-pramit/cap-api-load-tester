import os
import openai
import asyncio
import contextvars
import functools

from ..context.ui_context import base_instructions, element_samples, component_constructs

class ChatCompletion:
    def __init__(self, response_file_name='model_response.txt'):
        openai.api_key = os.getenv('OPEN_AI_API_KEY')
        self.response_file_name = response_file_name
        self.gpt_options = {
            "35turbo125": {
                "model": "gpt-3.5-turbo-0125",
                "tokens": 4096
            },
            "35turbo301": {
                "model": "gpt-3.5-turbo-0301",
                "tokens": 4096
            },
            "35turbo613": {
                "model": "gpt-3.5-turbo-0613",
                "tokens": 4096
            },
            "35turbo16k": {
                "model": "gpt-3.5-turbo-16k",
                "tokens": 16385
            },
            "custom1": {
                "model": "ft:gpt-3.5-turbo-0125:capillarytech:cap-ai-ui:9OjB8Ic7",
                "tokens": 4096
            },
            "basic4o": {
                "model": "gpt-4o",
                "tokens": 4096
            },
        }

    def create_tmp_folder(self):
        current_directory = os.getcwd()
        folder_path = os.path.join(current_directory, "vulcan_copilot/tmp")
        os.makedirs(folder_path, exist_ok=True)
        return folder_path

    async def asyncio_to_thread(self, func, /, *args, **kwargs):
        loop = asyncio.get_running_loop()
        ctx = contextvars.copy_context()
        func_call = functools.partial(ctx.run, func, *args, **kwargs)
        return await loop.run_in_executor(None, func_call)

    async def get_model_response(self, chat_history=[], user_prompt=None, model_name='basic4o', existing_session=False):
        try:
            gpt = self.gpt_options[model_name]
            messages = self.get_context() + chat_history
            if user_prompt is not None:
                messages.append(user_prompt)
                if existing_session is True:
                    user_prompt['content'] += """
                        Only modify the files needed to be changed, do not regenerate all the files unless specifically asked for.
                        Please make sure to import all the additional UI library elements required for the modifications done.
                    """
            print('-------Prompts--------')
            for msg in messages:
                print('-------single prompt--------')
                print(msg)
                print('-------end of single prompt--------')
            print('-------End of prompts--------')
            chat_review = await self.asyncio_to_thread(openai.ChatCompletion.create,
                                                  model=gpt['model'],
                                                  temperature=0,
                                                  max_tokens=gpt['tokens'],
                                                  messages=messages)
            model_response = chat_review.choices[0].message
            return model_response['content']
        except Exception as e:
            print(f"Error generating response from gpt: {str(e)}")
            raise e

    def write_response_to_file(self, content):
        try:
            file_path = os.path.join(self.create_tmp_folder(), self.response_file_name)
            with open(file_path, 'w', encoding='utf-8') as file:
                file.write(content)
            return file_path
        except Exception as e:
            print(f"Error writing model response to file: {str(e)}")

    def get_context(self):
        try:
            system_context = ''
            initial_context = base_instructions + element_samples + component_constructs
            for part in initial_context:
                if part['role'] == 'system':
                    system_context = \
                        f"{system_context}\n" \
                        f"{part['content']}"
            return [{
                "role": "system",
                "content": system_context,
            }]
        except Exception as e:
            print(f"Error during getting base context: {str(e)}")
