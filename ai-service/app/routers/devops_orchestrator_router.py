from fastapi import APIRouter
from typing import Optional, Dict, Any
from app.engines.devops_orchestrator import DevOpsOrchestratorEngine

router = APIRouter(prefix="/api/v1/devops", tags=["devops"])

@router.post("/docker")
async def get_docker_config():
    engine = DevOpsOrchestratorEngine()
    result = engine.generate_configs()
    return result["docker_configs"]

@router.post("/k8s")
async def get_k8s_manifests():
    engine = DevOpsOrchestratorEngine()
    result = engine.generate_configs()
    return result["k8s_manifests"]

@router.post("/cicd")
async def get_cicd_pipeline():
    engine = DevOpsOrchestratorEngine()
    result = engine.generate_configs()
    return result["cicd_pipelines"]

@router.post("/iac")
async def get_iac_terraform():
    engine = DevOpsOrchestratorEngine()
    result = engine.generate_configs()
    return result["iac_terraform"]

@router.get("/readiness")
async def validate_readiness():
    engine = DevOpsOrchestratorEngine()
    result = engine.generate_configs()
    return {
        "readiness_score": result["readiness_score"],
        "report": result["readiness_report"]
    }
