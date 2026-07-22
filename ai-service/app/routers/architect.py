from fastapi import APIRouter, HTTPException, status
from pydantic import BaseModel
from typing import Optional, Dict, Any
from app.engines.project_architect import ProjectArchitectEngine
from app.engines.architect_engine import ArchitectEngine

router = APIRouter(prefix="/api/v1/architect", tags=["architect"])

class ArchitectGenerateRequest(BaseModel):
    prompt: str
    app_type: Optional[str] = "Web App"

@router.post("/generate")
async def generate_architecture(payload: ArchitectGenerateRequest):
    if not payload.prompt.strip():
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Prompt must not be empty")

    engine = ProjectArchitectEngine()
    result = engine.generate(payload.prompt, payload.app_type)
    return {
        "status": "SUCCESS",
        "blueprint_json": result["json_data"],
        "markdown_report": result["markdown"]
    }

@router.post("/design")
async def get_architecture_design(payload: Optional[Dict[str, Any]] = None):
    prompt = payload.get("prompt", "Build a Gym & Fitness Management Platform") if payload else "Build a Gym & Fitness Management Platform"
    engine = ArchitectEngine()
    return engine.synthesize_architecture(prompt)

@router.post("/adrs")
async def get_adrs(payload: Optional[Dict[str, Any]] = None):
    prompt = payload.get("prompt", "Build a Gym & Fitness Management Platform") if payload else "Build a Gym & Fitness Management Platform"
    engine = ArchitectEngine()
    result = engine.synthesize_architecture(prompt)
    return {"adrs": result["adrs"]}

@router.post("/validate")
async def validate_architecture(payload: Optional[Dict[str, Any]] = None):
    prompt = payload.get("prompt", "Build a Gym & Fitness Management Platform") if payload else "Build a Gym & Fitness Management Platform"
    engine = ArchitectEngine()
    result = engine.synthesize_architecture(prompt)
    return {"validation_score": result["architecture_validation_score"], "report": result["validation_report"]}
