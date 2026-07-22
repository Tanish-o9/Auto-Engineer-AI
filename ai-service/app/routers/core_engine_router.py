from fastapi import APIRouter, HTTPException, status
from pydantic import BaseModel
from app.engines.core_implementation_engine import CoreImplementationEngine

router = APIRouter(prefix="/api/v1/core-engine", tags=["core-engine"])

class CoreGenerateRequest(BaseModel):
    prompt: str

engine = CoreImplementationEngine()

@router.post("/generate-project")
async def generate_full_project(payload: CoreGenerateRequest):
    if not payload.prompt.strip():
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Prompt must not be empty")

    result = engine.execute_7phase_pipeline(payload.prompt)
    return {
        "status": "SUCCESS",
        "result": result
    }
