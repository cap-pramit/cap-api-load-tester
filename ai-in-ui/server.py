import argparse
import os
import httpx
from fastapi import FastAPI, HTTPException
from fastapi.responses import JSONResponse
import openai
import asyncio
from pydantic import BaseModel
from starlette.middleware.cors import CORSMiddleware

from generateComponent import generate_model_response, write_file
from context.ui_context import chat_history, base_instructions, element_samples, component_constructs

chat_summary = {}

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
    sessionId: str

def initialize_openai(api_key):
    openai.api_key = api_key

async def provide_context_to_gpt():
    try:
        system_context = ''
        initial_context = base_instructions + element_samples + component_constructs
        for part in initial_context:
            if part['role'] == 'system':
                system_context = \
                    f"{system_context}\n\n\n" \
                    f"{part['content']}"
        # print(f"Generating response from gpt...")
        # model_response = await generate_model_response(initial_context)
        # print(f"Response received!")
        write_file('ai_in_ui.txt', system_context)
        return [{
            "role": "system",
            "content": system_context,
        }]
    except Exception as e:
        print(f"Error during generating component: {str(e)}")

# async def complete_initial_training():
#     tasks = [
#         asyncio.create_task(provide_context_to_gpt())
#     ]
#     return await asyncio.gather(*tasks)

@app.post('/generate-component')
async def send_prompt(request: PromptRequest):
    try:
        prompt = request.prompt
        sessionId = request.sessionId
        # implement here
        user_prompt = {
            "role": "user",
            "content": prompt,
        }
        temp_context = await provide_context_to_gpt() + chat_history
        prev_chat = []
        try:
            prev_chat = chat_summary[sessionId]
            temp_context += prev_chat
        except KeyError as ke:
            print(ke)
            # temp_context +=s chat_history
        model_response = await generate_model_response(temp_context, user_prompt)
        print(model_response)
        chat_summary[sessionId] = prev_chat + [
            user_prompt,
            {
                "role": "assistant",
                "content": model_response,
            }
        ]
        return JSONResponse(content={
            "code": 200,
            "success": True,
            "response": {
                "sessionId": sessionId,
                "prompt": model_response,
            }
        })
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

if __name__ == "__main__":
    parser = argparse.ArgumentParser(description="FastAPI service for OpenAI chat completion")
    # parser.add_argument("--directory_path", type=str, help="Path to the directory containing context files", required=True)

    args = parser.parse_args()

    initialize_openai(os.getenv('OPEN_AI_API_KEY'))

    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=9876)