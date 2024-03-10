import argparse
import httpx
from fastapi import FastAPI, HTTPException
from fastapi.responses import JSONResponse
import openai
import asyncio
from pydantic import BaseModel
from starlette.middleware.cors import CORSMiddleware
import os

app = FastAPI()
origins = [
    "http://localhost:8000"
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


def read_context_from_file(file_path):
    try:
        with open(file_path, 'r', encoding='utf-8') as file:
            context = file.read()
        return context
    except FileNotFoundError:
        return "File not found."
    except Exception as e:
        return f"Error reading file: {str(e)}"


def write_context_to_file(file_path, content):
    try:
        with open(file_path, 'w', encoding='utf-8') as file:
            file.write(content)
    except Exception as e:
        print(f"Error writing to file: {str(e)}")


async def generate_model_response(chat_history, user_prompt):
    try:
        # Update chat history with the latest user prompt
        chat_history.append({"role": "user", "content": user_prompt})

        # Use the chat history in your OpenAI request
        chat_review = await asyncio.to_thread(openai.ChatCompletion.create,
                                              model="gpt-3.5-turbo-0125",
                                              temperature=0,
                                              max_tokens=4096,
                                              messages=chat_history,
                                              )

        # Extract and return the model's response
        model_response = chat_review.choices[0].message
        # a=json.loads(model_response)
        # print(a)
        return model_response['content']

    # except openai.error.RateLimitError:
    #     return JSONResponse(content={"error": "Rate limit exceeded. Please try again later."}, status_code=429)
    except Exception as e:
        return JSONResponse(content={"error": str(e)}, status_code=429)


async def in_context_training(file_path):
    try:
        # Read content from the local context file
        initial_context = read_context_from_file(file_path)

        # Initialize chat history with the initial context
        chat_history = [
            {"role": "system", "content": "You are a helpful assistant, who works for Capillary Technologies. Your "
                                          "job is to create journey meta templates which STRICTLY DEFINED in the "
                                          "context."},
            {"role": "user", "content": initial_context}
        ]

        # Perform in-context training without generating a response
        await generate_model_response(chat_history, "")

        print("In-context training completed.")
    except Exception as e:
        print(f"Error during in-context training: {e}")


@app.post('/sendPrompt')
async def send_prompt(request: PromptRequest):
    try:
        prompt = request.prompt
        # Read content from the local context file
        context = read_context_from_file(args.file_path)

        # Initialize chat history with the initial context
        chat_history = [
            {"role": "system", "content": "As an accomplished marketer specializing in core marketing, your task is \n"
                                          "to craft an engaging customer journey. The provided data includes various \n"
                                          "attributes such as delivery rate, incentive redemption rate, \n"
                                          "and other transactional Key Performance Indicators (KPIs). Your objective \n"
                                          "is to meticulously analyze the data using the details outlined in the 'My \n"
                                          "Journey' payload. When developing journey templates, it is crucial to \n"
                                          "consider specific audience attributes highlighted in the context, \n"
                                          "such as delivery rate, incentive redemption rate and transactional Key \n"
                                          "Performance Indicators (KPIs). \n"
                                          ""
                                          ""
                                          "IMPORTANT: Utilize your general intelligence to select \n"
                                          "the appropriate blocks and construct templates based on the higher \n"
                                          "percentage rates.\n"
                                          f"Example 1: \n"
                                          f"Prompt: First I will give you one example so from here you can take "
                                          f"reference:\n"
                                          f"\n"
                                          f"Please follow the context and understand the Example of My Journey JSON "
                                          f"payload of journey meta template creation API. Now generate a sample JSON "
                                          f"payload by strictly following the field definition in the context for "
                                          f"journey meta template creation API, create a SINGLE engagement block "
                                          f"audience based on journey where the audience has 50% EMAIL delivery rate "
                                          f"and 70% SMS delivery rate."
                                          "Response:{}".format({"name": "SMS Engagement Journey",
                                                                "description": "Journey template focusing on SMS communication",
                                                                "entryBlock": {
                                                                    "blockId": "1",
                                                                    "entryCriteriaType": "USER_EVENT_BASED",
                                                                    "userEventType": "TRANSACTION",
                                                                    "nextBlockId": "2"
                                                                },
                                                                "engagementBlocks": [
                                                                    {
                                                                        "blockId": "2",
                                                                        "engagementChannel": "SMS",
                                                                        "content": "Hi there! Thank you for your recent transaction.",
                                                                        "nextBlockId": "3"
                                                                    },
                                                                    {
                                                                        "blockId": "3",
                                                                        "engagementChannel": "SMS",
                                                                        "content": "Exclusive offer just for you! Don't miss out.",
                                                                        "nextBlockId": "4"
                                                                    }
                                                                ],
                                                                "endBlocks": [
                                                                    {
                                                                        "blockId": "4"
                                                                    }]})},
            {"role": "assistant", "content": "Giving you the context below carefully read the whole the context and "
                                             "you everytime you will answer you need to keep everything in mind from "
                                             "this context only strictly.\n"
                                             f"Context mentioned below:\n"
                                             f"{context}\n"
                                             f""
                                             f"MOST IMPORTANT: In the mentioned example carefully read when the user "
                                             f"prompted 70% SMS and 50% EMAIL you need to pick the best journey with "
                                             f"the higher % delivery rate engagement block."
             }
        ]

        # Generate the model response based on the user prompt and in-context training
        model_response = await generate_model_response(chat_history, prompt)

        # Append model response to the chat history
        chat_history.append({"role": "assistant", "content": model_response})

        # Write updated context back to the local file
        updated_context = "\n".join(message["content"] for message in chat_history)
        write_context_to_file(args.file_path, updated_context)
        return JSONResponse(content={"model_response": model_response})
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@app.post('/createJourneyTemplate')
def create_journey_template(request: CreateJourneyRequest):
    url = "https://adiona-api-swagger.devenv-crm.cc.capillarytech.com/v1/ai/journeytemplate"
    print(request)
    json_body = request.body
    userId = request.userId
    orgId = request.orgId
    headers = {
        "X_ADIONA_API_KEY": os.environ['ADIONA_API_KEY'],
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
    # Parse command line arguments
    parser = argparse.ArgumentParser(description="FastAPI service for OpenAI chat completion.")
    parser.add_argument("--file_path", type=str, help="Path to the local file", required=True)
    # Add other arguments...

    args = parser.parse_args()

    # Perform in-context training during startup (without generating a response)
    asyncio.run(in_context_training(args.file_path))

    # Initialize OpenAI with API key
    initialize_openai(os.environ['OPEN_AI_KEY'])  # need to be replaced by os.getenv

    # Run FastAPI app with uvicorn (asynchronous worker)
    import uvicorn

    uvicorn.run(app, host="0.0.0.0", port=8001)