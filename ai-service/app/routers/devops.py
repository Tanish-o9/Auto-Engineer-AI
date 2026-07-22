from fastapi import APIRouter, HTTPException, status
from pydantic import BaseModel
from typing import Optional, Dict, Any
from app.engines.devops_cloud_engine import DevOpsMultiCloudEngine
from app.engines.devops_orchestrator import DevOpsOrchestratorEngine

router = APIRouter(prefix="/api/v1/devops", tags=["devops"])

class DevOpsRequest(BaseModel):
    prompt_or_name: str
    cloud_provider: Optional[str] = "AWS"

engine = DevOpsMultiCloudEngine()

@router.post("/generate-config")
async def generate_devops_configuration(payload: DevOpsRequest):
    if not payload.prompt_or_name.strip():
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="prompt_or_name must not be empty")

    result = engine.generate_devops_config(payload.prompt_or_name, payload.cloud_provider)
    return {
        "status": "DEVOPS_GENERATED",
        "result": result
    }

@router.post("/docker")
async def get_docker_config():
    orchestrator = DevOpsOrchestratorEngine()
    result = orchestrator.generate_configs()
    return result["docker_configs"]

@router.post("/k8s")
async def get_k8s_manifests():
    orchestrator = DevOpsOrchestratorEngine()
    result = orchestrator.generate_configs()
    return result["k8s_manifests"]

@router.post("/cicd")
async def get_cicd_pipeline():
    orchestrator = DevOpsOrchestratorEngine()
    result = orchestrator.generate_configs()
    return result["cicd_pipelines"]

@router.post("/iac")
async def get_iac_terraform():
    orchestrator = DevOpsOrchestratorEngine()
    result = orchestrator.generate_configs()
    return result["iac_terraform"]

@router.get("/readiness")
async def validate_readiness():
    orchestrator = DevOpsOrchestratorEngine()
    result = orchestrator.generate_configs()
    return {
        "readiness_score": result["readiness_score"],
        "report": result["readiness_report"]
    }
