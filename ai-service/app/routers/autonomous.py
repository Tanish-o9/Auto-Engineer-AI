from fastapi import APIRouter, HTTPException, status
from pydantic import BaseModel
from typing import Optional
from app.engines.autonomous_engine import AutonomousPipelineEngine

router = APIRouter(prefix="/api/v1/autonomous", tags=["autonomous"])

class AutonomousExecuteRequest(BaseModel):
    prompt: str
    target_scale: Optional[str] = "Medium"

engine = AutonomousPipelineEngine()

@router.post("/execute")
async def execute_autonomous_pipeline(payload: AutonomousExecuteRequest):
    if not payload.prompt.strip():
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Prompt must not be empty")

    result = engine.run_autonomous_pipeline(payload.prompt, payload.target_scale)
    return {
        "status": "COMPLETED",
        "result": result
    }
