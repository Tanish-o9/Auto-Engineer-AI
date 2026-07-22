from fastapi import APIRouter, Header, HTTPException, status
from pydantic import BaseModel
from typing import Optional
from app.config import settings
from app.graph.orchestrator import MultiAgentOrchestratorGraph

router = APIRouter(prefix="/api/v1/agents", tags=["agents"])

class IntakeRequest(BaseModel):
    idea_id: str
    prompt: str
    target_scale: Optional[str] = "Medium (10k-100k DAU)"

@router.post("/intake")
async def run_agent_workflow(
    payload: IntakeRequest,
    x_service_token: Optional[str] = Header(None)
):
    if x_service_token != settings.SERVICE_SECRET:
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="Invalid service token")

    orchestrator = MultiAgentOrchestratorGraph()
    result = orchestrator.run_workflow(payload.prompt, payload.target_scale)
    return {"idea_id": payload.idea_id, "workflow_result": result}
