from fastapi import APIRouter
from typing import Optional, Dict, Any
from app.engines.company_learning_engine import CompanyLearningEngine

router = APIRouter(prefix="/api/v1/company", tags=["company"])

@router.post("/run")
async def run_company_workflow(payload: Optional[Dict[str, Any]] = None):
    engine = CompanyLearningEngine()
    idea = payload.get("idea", "") if payload else ""
    return engine.execute_company_workflow(idea)

@router.get("/improvement")
async def get_improvement_stats():
    engine = CompanyLearningEngine()
    return engine.get_self_improvement()

@router.get("/routes")
async def get_model_routing():
    engine = CompanyLearningEngine()
    return engine.get_multimodel_routes()

@router.get("/marketplace")
async def get_marketplace_assets():
    engine = CompanyLearningEngine()
    return engine.get_marketplace()
