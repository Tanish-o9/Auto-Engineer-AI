from fastapi import APIRouter
from typing import Optional, Dict, Any
from app.engines.enterprise_governance_engine import EnterpriseGovernanceEngine

router = APIRouter(prefix="/api/v1/enterprise", tags=["enterprise"])

@router.get("/workspaces")
async def get_workspaces():
    engine = EnterpriseGovernanceEngine()
    return engine.get_workspace_state()

@router.get("/compliance")
async def get_compliance():
    engine = EnterpriseGovernanceEngine()
    return engine.run_compliance_audit()

@router.get("/billing")
async def get_billing():
    engine = EnterpriseGovernanceEngine()
    return engine.get_billing_charges()

@router.get("/dependencies")
async def get_dependencies():
    engine = EnterpriseGovernanceEngine()
    return engine.get_multi_repo_graph()

@router.get("/governance")
async def get_governance():
    engine = EnterpriseGovernanceEngine()
    return engine.get_security_access_logs()
