from fastapi import APIRouter
from typing import Optional, Dict, Any
from app.engines.repo_intelligence_engine import RepoIntelligenceEngine

router = APIRouter(prefix="/api/v1/repo", tags=["repository"])

@router.get("/scan")
async def scan_repository(project_path: Optional[str] = None):
    engine = RepoIntelligenceEngine()
    return engine.scan_repository(project_path)

@router.get("/memory")
async def get_repository_memory(project_path: Optional[str] = None):
    engine = RepoIntelligenceEngine()
    return engine.get_repository_memory(project_path)

@router.post("/impact")
async def analyze_impact(payload: Optional[Dict[str, Any]] = None):
    target_file = payload.get("target_file", "web-backend/apps/sells/views.py") if payload else "web-backend/apps/sells/views.py"
    desc = payload.get("change_description", "Modify ViewSet") if payload else "Modify ViewSet"
    engine = RepoIntelligenceEngine()
    return engine.analyze_impact(target_file, desc)

@router.get("/dead-code")
async def get_dead_code(project_path: Optional[str] = None):
    engine = RepoIntelligenceEngine()
    scan = engine.scan_repository(project_path)
    return scan["dead_code_report"]

@router.get("/timeline")
async def get_timeline(project_path: Optional[str] = None):
    engine = RepoIntelligenceEngine()
    scan = engine.scan_repository(project_path)
    return {"checkpoints": scan["checkpoints"]}
