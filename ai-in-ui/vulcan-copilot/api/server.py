import argparse
import uuid
from fastapi import FastAPI, HTTPException
from fastapi.responses import JSONResponse
from pydantic import BaseModel
from typing import Optional
from starlette.middleware.cors import CORSMiddleware

from ..modules.response_parser import ResponseParser
from ..modules.chat_completion import ChatCompletion
from ..context.ui_context import chat_history

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
    session_id: Optional[str] = None

def generate_session_id():
    # Generate a UUIDv4
    session_id = str(uuid.uuid4())
    return session_id

@app.post('/generate-component')
async def send_prompt(request: PromptRequest):
    try:
        prompt = request.prompt
        if len(prompt.strip()) == 0:
            raise HTTPException(status_code=500, detail="Empty prompt sent!!")
        session_id = request.session_id
        if session_id is None:
            session_id = generate_session_id()
        elif len(session_id.strip()) == 0:
            raise HTTPException(status_code=500, detail="Empty session_id sent!!")
        user_prompt = {
            "role": "user",
            "content": prompt,
        }
        chat_messages = []
        prev_chat = []
        existing_session = False
        chat_count = 0
        folder_name = None
        if session_id in chat_summary:
            existing_session = True
            prev_chat = chat_summary[session_id]['chat']
            chat_count = chat_summary[session_id]['count']
            folder_name = chat_summary[session_id]['folder']
            chat_messages += prev_chat
        else:
            chat_messages += chat_history
        model_response = await chat_instance.get_model_response(
            chat_history=chat_messages,
            user_prompt=user_prompt,
            existing_session=existing_session
        )
        file_name = chat_instance.write_response_to_file(model_response)
        parser = ResponseParser(file_name)
        prev_chat.append(user_prompt)
        prev_chat.append({
            "role": "assistant",
            "content": model_response,
        })
        parsed_data = parser.parse(folder_name if existing_session is True else None)
        cfg = {
            'chat': prev_chat,
            'count': chat_count + 1,
            'folder': folder_name if existing_session is True else parsed_data['folder_name']
        }
        chat_summary[session_id] = cfg
        return JSONResponse(content={
            "code": 200,
            "success": True,
            "response": {
                "session_id": session_id,
                "result": parsed_data,
            }
        })
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

if __name__ == "__main__":
    arg_parser = argparse.ArgumentParser(description="FastAPI service for OpenAI chat completion")
    args = arg_parser.parse_args()
    chat_instance = ChatCompletion()
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=9876)
