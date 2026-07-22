from fastapi import APIRouter
from typing import Optional, Dict, Any
from app.engines.master_ai_orchestrator import MasterAIOrchestratorEngine

router = APIRouter(prefix="/api/v1/ai-orchestrator", tags=["ai-orchestrator"])

@router.post("/orchestrate")
async def orchestrate_agents(payload: Optional[Dict[str, Any]] = None):
    engine = MasterAIOrchestratorEngine()
    return engine.get_orchestrator_status()

@router.get("/health")
async def get_orchestrator_health():
    engine = MasterAIOrchestratorEngine()
    status = engine.get_orchestrator_status()
    return status["telemetry"]

@router.post("/recover")
async def trigger_recovery():
    engine = MasterAIOrchestratorEngine()
    status = engine.get_orchestrator_status()
    return status["recovery"]

@router.get("/context")
async def check_context():
    engine = MasterAIOrchestratorEngine()
    status = engine.get_orchestrator_status()
    return status["context_sync"]
