import os
import openai
import asyncio
import contextvars
import functools

from context.ui_context import base_instructions, element_samples, component_constructs

class ChatCompletion:
    def __init__(self, response_file_name='model_response.txt'):
        openai.api_key = os.getenv('OPEN_AI_API_KEY')
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
        self.response_file_name = response_file_name

    async def asyncio_to_thread(self, func, /, *args, **kwargs):
        loop = asyncio.get_running_loop()
        ctx = contextvars.copy_context()
        func_call = functools.partial(ctx.run, func, *args, **kwargs)
        return await loop.run_in_executor(None, func_call)

    async def get_model_response(self, final_context=[], user_prompt=None, model_name='basic4o', existing_session=False):
        try:
            gpt = self.gpt_options[model_name]
            messages = final_context
            if user_prompt is not None:
                messages.append(user_prompt)
                if existing_session is True:
                    user_prompt['content'] += '\nOnly modify the files needed to be changed, do not regenerate all the files unless specifically asked for.'
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
            with open(self.response_file_name, 'w', encoding='utf-8') as file:
                file.write(content)
            return self.response_file_name
        except Exception as e:
            print(f"Error writing model response to file: {str(e)}")

    def get_context(self):
        try:
            system_context = ''
            initial_context = base_instructions + element_samples + component_constructs
            for part in initial_context:
                if part['role'] == 'system':
                    system_context = \
                        f"{system_context}\n\n\n" \
                        f"{part['content']}"
            return [{
                "role": "system",
                "content": system_context,
            }]
        except Exception as e:
            print(f"Error during getting base context: {str(e)}")
