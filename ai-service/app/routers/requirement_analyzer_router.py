from fastapi import APIRouter
from typing import Optional, Dict, Any
from app.engines.requirement_analyzer_engine import RequirementAnalyzerEngine

router = APIRouter(prefix="/api/v1/requirements", tags=["requirements"])

@router.post("/analyze")
async def analyze_requirements(payload: Optional[Dict[str, Any]] = None):
    prompt = payload.get("prompt", "Build a Gym & Fitness Management Platform") if payload else "Build a Gym & Fitness Management Platform"
    engine = RequirementAnalyzerEngine()
    return engine.analyze(prompt)

@router.post("/user-stories")
async def get_user_stories(payload: Optional[Dict[str, Any]] = None):
    prompt = payload.get("prompt", "Build a Gym & Fitness Management Platform") if payload else "Build a Gym & Fitness Management Platform"
    engine = RequirementAnalyzerEngine()
    result = engine.analyze(prompt)
    return {"user_stories": result["user_stories"], "acceptance_criteria_format": "Given-When-Then"}

@router.post("/business-rules")
async def get_business_rules(payload: Optional[Dict[str, Any]] = None):
    prompt = payload.get("prompt", "Build a Gym & Fitness Management Platform") if payload else "Build a Gym & Fitness Management Platform"
    engine = RequirementAnalyzerEngine()
    result = engine.analyze(prompt)
    return {"business_rules": result["business_rules"]}
