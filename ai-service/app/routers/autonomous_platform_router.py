from fastapi import APIRouter, HTTPException, status
from pydantic import BaseModel
from typing import Optional
from app.engines.autonomous_engineering_platform import AutonomousEngineeringPlatformEngine

router = APIRouter(prefix="/api/v1/platform", tags=["autonomous-platform"])

class AutonomousExecuteRequest(BaseModel):
    prompt: str

engine = AutonomousEngineeringPlatformEngine()

@router.post("/execute-autonomous-workflow")
async def execute_autonomous_workflow(payload: AutonomousExecuteRequest):
    if not payload.prompt.strip():
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Prompt must not be empty")

    result = engine.execute_autonomous_pipeline(payload.prompt)
    return {
        "status": "SUCCESS",
        "result": result
    }

@router.get("/status")
async def get_platform_status():
    return {
        "status": "ONLINE",
        "active_engine": "Autonomous Engineering Platform Engine v10.0",
        "capabilities": [
            "Requirement Analyzer", "Architecture Generator", "Project Manifest Generator",
            "Implementation Engine", "Repository Scanner", "Dependency Resolver",
            "Context Code Generator", "Build Runner", "Error Fix Agent", "Repository Validator"
        ]
    }
