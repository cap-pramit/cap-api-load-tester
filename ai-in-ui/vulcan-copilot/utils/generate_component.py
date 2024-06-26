import argparse
import os
import re
import openai
import asyncio
import contextvars
import functools

from ..context.ui_context import chat_history, base_instructions, element_samples
from ..modules.chat_completion import ChatCompletion

def initialize_openai(api_key):
    openai.api_key = api_key

def read_context_from_file(directory_path, is_directory=False):
    try:
        if is_directory == True:
            files = [f for f in os.listdir(directory_path) if f.endswith(".txt")]
            context_list = []
            for file_name in files:
                file_path = os.path.join(directory_path, file_name)
                with open(file_path, 'r', encoding='utf-8') as file:
                    context_list.append(file.read())
            return "\n".join(context_list)
        else:
            with open(directory_path, 'r', encoding='utf-8') as file:
                return file.read()
    except Exception as e:
        return f"Error reading context from files: {str(e)}"

def write_file(file_path, content):
    try:
        with open(file_path, 'w', encoding='utf-8') as file:
            file.write(content)
    except Exception as e:
        print(f"Error writing content to file: {str(e)}")

def write_context_to_file(directory_path, response_content, isAppendOnly="a"):
    try:
        files = [f for f in os.listdir(directory_path) if f.endswith(".txt")]
        if files:
            last_file_path = os.path.join(directory_path, files[-1])
            with open(last_file_path, isAppendOnly, encoding='utf-8') as file:
                file.write("\n")  # Add a newline before appending the response
                file.write(response_content)
            if isAppendOnly == "a":
                print(f"Response written to the last file: {last_file_path}")
            else:
                print(f"Response replace to the last file: {last_file_path}")
        else:
            print("No text files found in the specified directory.")
    except Exception as e:
        print(f"Error writing response to file: {str(e)}")

async def asyncio_to_thread(func, /, *args, **kwargs):
    loop = asyncio.get_running_loop()
    ctx = contextvars.copy_context()
    func_call = functools.partial(ctx.run, func, *args, **kwargs)
    return await loop.run_in_executor(None, func_call)

# async def generate_model_response(final_context, user_prompt = None):
#     try:
#         # gpt = gpt_options['35turbo125']
#         # gpt = gpt_options['custom1']
#         gpt = gpt_options['basic4o']
#         messages = final_context
#         if user_prompt is not None:
#             messages.append(user_prompt)
#         print('-------Prompts--------')
#         for msg in messages:
#             print('-------single prompt--------')
#             print(msg)
#             print('-------end of single prompt--------')
#         print('-------End of prompts--------')
#         chat_review = await asyncio_to_thread(openai.ChatCompletion.create,
#                                               model=gpt['model'],
#                                               temperature=0,
#                                               max_tokens=gpt['tokens'],
#                                               messages=messages)
#         model_response = chat_review.choices[0].message
#         return model_response['content']
#     except Exception as e:
#         print(f"Error generating response from gpt: {str(e)}")
#         raise e

async def instructions_training(file_path):
    try:
        print('fetching base instructions')
        initial_context = read_context_from_file(file_path, False)
        chat_history = [
            {"role": "user", "content": "Carefully read the context and instructions provided and understand the requirements for these types of UI components. "
                                          "You are required to write a react component for the same following the given context and UI elements schema information.\n"
                                          f"Base instructions: \n{initial_context}"
            }
        ]
        # await generate_model_response(chat_history, "")
        # print("Instructions training completed.")
        return chat_history[0]
    except Exception as e:
        print(f"Error during instructions training: {e}")

async def sample_elements_training(file_path):
    try:
        print('fetching sample elements structure')
        elements_data = read_context_from_file(file_path, False)
        chat_history = [
            {"role": "user",
             "content": "\n\nUse the following cap-ui-library elements specifications to replace basic HTML elements from your component code "
                        "with capillary UI library (@capillarytech/cap-ui-library that you have imported at the top of file) elements "
                        "as per requirement to make sure your component adheres to required capillary UX design\n"
                        f"ui_library_schema_specifications: \n{elements_data}"
             }
        ]
        # await generate_model_response(chat_history, "")
        # print("Sample elements training completed.")
        return chat_history[0]
    except Exception as e:
        print(f"Error during sample elements training: {e}")

async def sample_data_training(file_path):
    try:
        print('Training with sample prompt/response examples')
        sample_data = read_context_from_file(file_path, False)
        chat_history = [
            {"role": "system",
             "content": "You are a an accomplished senior react UI web application developer, who works for Capillary Technologies. Your "
                        "job is to write React functional components which STRICTLY ADHERE to given context, elements specifications and instructions. "
                        "Always carefully read the context and instructions provided and understand the requirements for these types of UI components. "
            },
            # {"role": "user", "content": "\n\nProvided are some sample requests and the components generated as result below to help you understand how to generate "
            #                               "the component accurately. This is just to set context and teach you "
            #                               "about the type of UI development that is needed to be done for reference, no response needed here. \n"
            #                               f"{sample_data}"
            # }
        ]
        await chat_instance.get_model_response(chat_history=chat_history)
        print("Sample data training completed.")
    except Exception as e:
        print(f"Error during sample data training: {e}")
        raise e

async def fetch_initial_chat_history(file_path):
    try:
        print('Fetching sample prompt/response examples')
        sample_data = read_context_from_file(file_path, False)
        chat_history = [
            # {"role": "system",
            #  "content": "You are a an accomplished senior react UI web application developer, who works for Capillary Technologies. Your "
            #             "job is to write React functional components which STRICTLY ADHERE to given context, elements specifications and instructions. "
            #             "Always carefully read the context and instructions provided and understand the requirements for these types of UI components. "
            # },
            {"role": "user", "content": "\n\nProvided are some sample requests and the components generated as result below to help you understand how to generate "
                                          "the component accurately. No response needed here. \n"
                                          f"{sample_data}"
            }
        ]
        return chat_history
    except Exception as e:
        print(f"Error during sample data training: {e}")

async def json_schema_training(file_path):
    try:
        print('fetching json schema for UI elements')
        schema = read_context_from_file(file_path, False)
        chat_history = [
            {"role": "user", "content": "\nUse this json schema to replace basic HTML elements from your component code "
                                          "with capillary UI library (@capillarytech/cap-ui-library that you have imported at the top of file) specific elements "
                                          "as per requirement to make sure your component adheres to required capillary UX design\n"
                                          f"ui_library_schema_specifications: \n{schema}"
            }
        ]
        # await generate_model_response(chat_history, "")
        # print("JSON schema training completed.")
        return chat_history[0]
    except Exception as e:
        print(f"Error during JSON schema training: {e}")

async def prompt_schema_training(file_path):
    try:
        print('fetching prompt schema for request')
        schema = read_context_from_file(file_path, False)
        chat_history = [
            {"role": "user", "content": "\n\nUse this json schema to understand my request and its different fields, to generate the component\n"
                                          f"request_specifications: \n{schema}"
            }
        ]
        # await generate_model_response(chat_history, "")
        # print("JSON schema training completed.")
        return chat_history[0]
    except Exception as e:
        print(f"Error during prompt schema training: {e}")

async def generate_context(directory_path):
    context_tasks = [
        asyncio.create_task(instructions_training(f"{directory_path}/instructions.txt")),
        # asyncio.create_task(json_schema_training(f"{directory_path}/ui_library_schema.json")),
        asyncio.create_task(sample_elements_training(f"{directory_path}/element_samples.txt")),
        # asyncio.create_task(sample_data_training(f"{directory_path}/chat_history.txt")),
        # asyncio.create_task(prompt_schema_training(f"{directory_path}/prompt_schema.json")),
    ]
    history_tasks = [
        asyncio.create_task(fetch_initial_chat_history(f"{directory_path}/chat_history.txt")),
    ]
    initial_context = await asyncio.gather(*context_tasks)
    history = await asyncio.gather(*history_tasks)
    return initial_context + history[0]

async def complete_initial_training(directory_path):
    tasks = [
        asyncio.create_task(sample_data_training(f"{directory_path}/chat_history.txt"))
    ]
    return await asyncio.gather(*tasks)

async def generate_component(prompt_file, context):
    file_path = None
    try:
        prompt = read_context_from_file(prompt_file, False)
        final_context = [c for c in context if (c is not None and type(c) == dict)]
        user_prompt = {"role": "user", "content": "Please use the context and instructions provided to you "
                                                  "and write a Capillary specific React component as accurately as possible \n"
                                                  f"{prompt}"
                    }
        print(f"Generating response from gpt...")
        model_response = await chat_instance.get_model_response(chat_history=final_context, user_prompt=user_prompt)
        print(f"Response received!")
        if model_response is not None:
            file_content = re.sub(r'```jsx\n', '', model_response)
            file_content = re.sub(r'\n```', '', file_content)
            match = re.search(r'export\sdefault\s([a-zA-Z]*)', file_content)
            if match is not None:
                file_name = match.group(1)
                print(f"Component name: {file_name}")
                file_path = f"./{file_name}.js"
                write_file(file_path, file_content)
                print(f"Component generated at {file_path}")
    except Exception as e:
        print(f"Error during generating component: {str(e)}")
    finally:
        return file_path

async def generate_component_2(prompt_file):
    file_path = None
    try:
        prompt = read_context_from_file(prompt_file, False)
        final_context = base_instructions + element_samples
        user_prompt = {
            "role": "user",
            "content": prompt,
        }
        print(f"Generating response from gpt...")
        model_response = await chat_instance.get_model_response(chat_history=final_context, user_prompt=user_prompt)
        print(f"Response received!")
        if model_response is not None:
            file_content = re.sub(r'```jsx\n', '', model_response)
            file_content = re.sub(r'\n```', '', file_content)
            match = re.search(r'export\sdefault\s([a-zA-Z]*)', file_content)
            if match is not None:
                file_name = match.group(1)
                print(f"Component name: {file_name}")
                file_path = f"./{file_name}.js"
                write_file(file_path, file_content)
                print(f"Component generated at {file_path}")
    except Exception as e:
        print(f"Error during generating component: {str(e)}")
    finally:
        return file_path

# @app.post('/sendPrompt')
# async def send_prompt(request: PromptRequest):
#     try:
#         prompt = request.prompt
#         context = read_context_from_file(args.directory_path)
#         chat_history = [
#             {"role": "system", "content": "As an accomplished react web application developer, your task is to carefully "
#                                             "read the context and instructions provided and understand the requirements for the UI. "
#                                             "You are required to write a react component for the same adhering to the given context and UI elements schema information.\n"
#                                             f"Sample response below:\n"
#                                             f"{context}"}
#         ]
#
#         model_response = await generate_model_response(chat_history, prompt)
#         # print(model_response.body)
#         chat_history.append({"role": "assistant", "content": model_response})
#
#         updated_context = "\n".join(message["content"] for message in chat_history)
#
#         # Write the updated context back to all files in the directory
#         write_context_to_file("chat_history", "prompt: {} \n".format(prompt) + "Response: {} \n".format(str(model_response)))
#         write_context_to_file(args.directory_path, "prompt: {} \n".format(prompt) + "Response: {} \n".format(str(model_response)),isAppendOnly="w")
#         return JSONResponse(content={"model_response": model_response})
#     except Exception as e:
#         raise HTTPException(status_code=500, detail=str(e))

if __name__ == "__main__":
    parser = argparse.ArgumentParser(description="FastAPI service for OpenAI chat completion.")
    parser.add_argument("--directory_path", type=str, help="Path to the directory containing text files", required=True)
    parser.add_argument("--prompt_file", type=str, help="Path to the prompt file", required=True)

    args = parser.parse_args()

    chat_instance = ChatCompletion()

    # asyncio.run(complete_initial_training(args.directory_path))
    # context = asyncio.run(generate_context(args.directory_path))
    # component_path = asyncio.run(generate_component(args.prompt_file, context))

    component_path = asyncio.run(generate_component_2(args.prompt_file))