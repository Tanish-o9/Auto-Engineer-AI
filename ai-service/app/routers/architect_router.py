from fastapi import APIRouter
from typing import Optional, Dict, Any
from app.engines.architect_engine import ArchitectEngine

router = APIRouter(prefix="/api/v1/architect", tags=["architect"])

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
