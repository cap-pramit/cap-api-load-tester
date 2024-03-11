import argparse
import os
import httpx
from fastapi import FastAPI, HTTPException
from fastapi.responses import JSONResponse
import openai
import asyncio
from pydantic import BaseModel
from starlette.middleware.cors import CORSMiddleware

app = FastAPI()
origins = [
    "http://localhost:8000",
    "https://devenv-crm.cc.capillarytech.com",
    "https://crm-nightly-new.cc.capillarytech.com",
    "https://crm-staging-new.cc.capillarytech.com"
]
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


class PromptRequest(BaseModel):
    prompt: str


class CreateJourneyRequest(BaseModel):
    body: dict
    userId: str
    orgId: int


def initialize_openai(api_key):
    openai.api_key = api_key


def read_context_from_file(directory_path):
    try:
        files = [f for f in os.listdir(directory_path) if f.endswith(".txt")]
        context_list = []
        for file_name in files:
            file_path = os.path.join(directory_path, file_name)
            with open(file_path, 'r', encoding='utf-8') as file:
                context_list.append(file.read())
        return "\n".join(context_list)
    except Exception as e:
        return f"Error reading context from files: {str(e)}"


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


async def generate_model_response(chat_history, user_prompt):
    try:
        chat_history.append({"role": "user", "content": user_prompt})
        chat_review = await asyncio.to_thread(openai.ChatCompletion.create,
                                              model="gpt-4-32k-0314",
                                              temperature=0,
                                              max_tokens=4096,
                                              messages=chat_history)
        model_response = chat_review.choices[0].message
        return model_response['content']
    except Exception as e:
        return JSONResponse(content={"error": str(e)}, status_code=429)


async def in_context_training(file_path):
    try:
        initial_context = read_context_from_file(file_path)
        chat_history = [
            {"role": "system", "content": "You are a helpful assistant, who works for Capillary Technologies. Your "
                                          "job is to create journey meta templates which STRICTLY DEFINED in the "
                                          "context."},
            {"role": "user", "content": initial_context}
        ]
        await generate_model_response(chat_history, "")
        print("In-context training completed.")
    except Exception as e:
        print(f"Error during in-context training: {e}")


async def read_files_from_directory(directory_path):
    tasks = []
    for filename in os.listdir(directory_path):
        if filename.endswith(".txt"):  # Assuming your files have a specific extension
            file_path = os.path.join(directory_path, filename)
            task = asyncio.create_task(in_context_training(file_path))
            tasks.append(task)
    await asyncio.gather(*tasks)


@app.post('/sendPrompt')
async def send_prompt(request: PromptRequest):
    try:
        prompt = request.prompt
        context = read_context_from_file(args.directory_path)  # Use the directory path as context
        response_str = "Response: {}".format({"name": 'SMS Engagement Journey', "description": 'Journey template focusing on SMS communication',
             "entryBlock": {"blockId": '1', "entryCriteriaType": 'USER_EVENT_BASED', "userEventType": 'TRANSACTION',
                            "nextBlockId": '2'}, "engagementBlocks": [{"blockId": '2', "engagementChannel": 'SMS',
                                                                       "engagementType" : "WELCOME_MESSAGE",
                                                                       "nextBlockId": '3'},
                                                                      {"blockId": '3', "engagementChannel": 'SMS',
                                                                       "engagementType" : "WELCOME_MESSAGE",
                                                                       "nextBlockId": '4'}],
             "endBlocks": [{"blockId": '4'}]})
        chat_history = [
            {"role": "system", "content": "As an accomplished marketer specializing in core marketing, your task is "
                                          "to craft an engaging customer journey. The provided data includes various "
                                          "attributes such as delivery rate, incentive redemption rate, "
                                          "and other transactional Key Performance Indicators (KPIs). Your objective "
                                          "is to meticulously analyze the data using the details outlined in the 'My "
                                          "Journey' payload. When developing journey templates, it is crucial to "
                                          "consider specific audience attributes highlighted in the context, "
                                          "such as delivery rate, incentive redemption rate and transactional Key "
                                          "Performance Indicators (KPIs). \n"
                                          "\n"
                                          "\n"
                                          "IMPORTANT: Utilize your general intelligence to select "
                                          "the appropriate blocks and construct templates based on the higher "
                                          "percentage rates.\n"
                                          f"First I will give you one example so from here you can take "
                                          f"reference:\n"
                                          f"Example 1: \n"
                                          f"\n"
                                          f"Prompt: Please follow the context and understand the Example of My Journey JSON "
                                          f"payload of journey meta template creation API. Now generate a sample JSON "
                                          f"payload by strictly following the field definition in the context for "
                                          f"journey meta template creation API, create a SINGLE engagement block "
                                          f"audience based on journey where the audience has 50% EMAIL delivery rate "
                                          f"and 70% SMS delivery rate.\n"
                                          f"{response_str}"
                                          "\n"
                                          "\n"
                                          f"Example 2: \n"
                                          f"Prompt: Create a welcome journey template for newly registered customers.\n"
                                          f"Response: For this you need to carefully go through the given context and "
                                          f"understand the example of 'My JSON payload for journey meta template with "
                                          f"welcome journey objective' and carefully read the explanations then use your intelligence to answer. "
                                          f"Also if the user asks for a different incentive type (promotion, coupon etc) "
                                          f"and different engagement block type (SMS, EMAIL etc) you need to refer STRICTLY to"
                                          f"the mentioned 'My journey meta template with welcome journey objective' "
                                          f"structures to answer. \n"
                                          f"IMPORTANT: Two different journey template blocks can not have the same next block id or remainder block id. It should be unique across "
                                          f"journey template blocks i.e. two different blocks can not point to the same block. \n"
                                          f"IMPORTANT: There can be no orphan journey template block. Except entry block all the other journey template block should be referenced from another block. \n"},

            {"role": "system", "content": "Giving you the context below carefully read the whole the context and "
                                          "you every time you will answer you need to keep everything in mind from "
                                          "this context only strictly.\n"
                                          f"Context mentioned below:\n"
                                          f"{context}"
                                          f"\n"
                                          f"MOST IMPORTANT: In the mentioned example carefully read when the user "
                                          f"prompted 70% SMS and 50% EMAIL you need to pick the best journey with "
                                          f"the higher % delivery rate engagement block."}
        ]

        model_response = await generate_model_response(chat_history, prompt)
        # print(model_response.body)
        chat_history.append({"role": "assistant", "content": model_response})

        updated_context = "\n".join(message["content"] for message in chat_history)

        # Write the updated context back to all files in the directory
        write_context_to_file("chat_history", "prompt: {} \n".format(prompt) + "Response: {} \n".format(str(model_response)))
        write_context_to_file(args.directory_path, "prompt: {} \n".format(prompt) + "Response: {} \n".format(str(model_response)),isAppendOnly="w")
        return JSONResponse(content={"model_response": model_response})
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@app.post('/createJourneyTemplate')
def create_journey_template(request: CreateJourneyRequest):
    url = "https://adiona-api-swagger.devenv-crm.cc.capillarytech.com/v1/ai/journeytemplate"
    json_body = request.body
    userId = request.userId
    orgId = request.orgId
    headers = {
        "X_ADIONA_API_KEY": "adiona_ui_6eb4175f-75a7-4691-b973-7c30455058ff",
        "X_LOGGED_IN_USER_ID": "{}".format(userId),
        "orgId": "{}".format(orgId),
        "Content-Type": "application/json"
    }

    try:
        response = httpx.post(url, json=json_body, headers=headers)
        response.raise_for_status()
        return response.json()
    except httpx.HTTPError as e:
        raise HTTPException(status_code=e.response.status_code, detail="Journey template creation failed")


if __name__ == "__main__":
    parser = argparse.ArgumentParser(description="FastAPI service for OpenAI chat completion.")
    parser.add_argument("--directory_path", type=str, help="Path to the directory containing text files", required=True)

    args = parser.parse_args()

    asyncio.run(read_files_from_directory(args.directory_path))
    initialize_openai(os.getenv('OPEN_AI_KEY'))  # need to be replaced by os.getenv

    import uvicorn

    uvicorn.run(app, host="0.0.0.0", port=8001)