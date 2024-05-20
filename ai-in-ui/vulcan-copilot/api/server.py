import argparse
import uuid
from fastapi import FastAPI, HTTPException
from fastapi.responses import JSONResponse
from pydantic import BaseModel
from typing import Optional
from starlette.middleware.cors import CORSMiddleware

from ..modules.copilot import Copilot

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
        parsed_data = await copilot.generate_code(session_id, prompt)
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
    copilot = Copilot()
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=9876)
