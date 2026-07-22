from fastapi import APIRouter
from typing import Optional, Dict, Any
from app.engines.master_orchestrator_engine import MasterOrchestratorEngine

router = APIRouter(prefix="/api/v1/orchestrator", tags=["orchestrator"])

@router.post("/run")
async def run_orchestration(project_path: Optional[str] = None):
    engine = MasterOrchestratorEngine()
    return engine.execute_pipeline(project_path)

@router.get("/status")
async def get_orchestration_status(project_path: Optional[str] = None):
    engine = MasterOrchestratorEngine()
    return engine.execute_pipeline(project_path)

@router.post("/verify")
async def verify_build(project_path: Optional[str] = None):
    engine = MasterOrchestratorEngine()
    res = engine.execute_pipeline(project_path)
    return {"build_verification": res["build_verification"]}
