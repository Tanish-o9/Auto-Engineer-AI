from fastapi import APIRouter
from typing import Optional, Dict, Any
from app.engines.startup_builder_engine import StartupBuilderEngine

router = APIRouter(prefix="/api/v1/startup", tags=["startup"])

@router.post("/blueprint")
async def get_startup_blueprint(payload: Optional[Dict[str, Any]] = None):
    engine = StartupBuilderEngine()
    idea = payload.get("idea", "") if payload else ""
    return engine.generate_startup_assets(idea)

@router.get("/predict")
async def get_predictions():
    engine = StartupBuilderEngine()
    return engine.get_project_predictions()

@router.post("/twin")
async def run_twin_sim():
    engine = StartupBuilderEngine()
    return engine.run_digital_twin_sim()

@router.get("/bugs")
async def get_bugs():
    engine = StartupBuilderEngine()
    return engine.scan_bugs()

@router.get("/mentor")
async def get_mentorship():
    engine = StartupBuilderEngine()
    return engine.get_mentor_explanations()
