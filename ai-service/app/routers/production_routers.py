from fastapi import APIRouter, HTTPException, status
from pydantic import BaseModel
from typing import Optional, Dict, Any, List

from app.engines.security_agent_engine import SecurityAgentEngine
from app.engines.performance_agent_engine import PerformanceAgentEngine
from app.engines.github_agent_engine import GitHubAgentEngine
from app.engines.rag_engine import MultiSourceRAGEngine
from app.engines.cost_optimizer_engine import CostOptimizerEngine
from app.engines.figma_engine import FigmaToCodeEngine
from app.engines.workspace_intelligence import WorkspaceIntelligenceEngine
from app.engines.ai_terminal_engine import AITerminalEngine
from app.core.production_suite import ProductionHardeningSuite

router = APIRouter(prefix="/api/v1/prod", tags=["production"])

sec_engine = SecurityAgentEngine()
perf_engine = PerformanceAgentEngine()
gh_engine = GitHubAgentEngine()
rag_engine = MultiSourceRAGEngine()
cost_engine = CostOptimizerEngine()
figma_engine = FigmaToCodeEngine()
workspace_engine = WorkspaceIntelligenceEngine()
terminal_engine = AITerminalEngine()
prod_suite = ProductionHardeningSuite()

class SecurityAuditRequest(BaseModel):
    code_snippet: str
    file_path: Optional[str] = "app/main.py"

class GitHubActionRequest(BaseModel):
    action: str
    params: Optional[Dict[str, Any]] = {}

class RAGSearchRequest(BaseModel):
    query: str
    top_k: Optional[int] = 3

class CostOptimizeRequest(BaseModel):
    task_prompt: str
    complexity_hint: Optional[str] = "AUTO"

class FigmaConvertRequest(BaseModel):
    figma_node: str

class WorkspaceSuggestRequest(BaseModel):
    active_file: Optional[str] = "ai-service/app/main.py"
    cursor_line: Optional[int] = 30

class TerminalCommandRequest(BaseModel):
    command: str
    confirmed: Optional[bool] = False

@router.post("/security/audit")
async def audit_security(payload: SecurityAuditRequest):
    return {"status": "SUCCESS", "result": sec_engine.audit_security(payload.code_snippet, payload.file_path)}

@router.get("/performance/benchmark")
async def benchmark_performance():
    return {"status": "SUCCESS", "result": perf_engine.benchmark_performance()}

@router.post("/github/action")
async def github_action(payload: GitHubActionRequest):
    return {"status": "SUCCESS", "result": gh_engine.execute_git_action(payload.action, payload.params)}

@router.post("/rag/search")
async def rag_search(payload: RAGSearchRequest):
    return {"status": "SUCCESS", "result": rag_engine.semantic_search_with_citations(payload.query, payload.top_k)}

@router.post("/cost/optimize")
async def optimize_cost(payload: CostOptimizeRequest):
    return {"status": "SUCCESS", "result": cost_engine.optimize_task(payload.task_prompt, payload.complexity_hint)}

@router.post("/figma/convert")
async def convert_figma(payload: FigmaConvertRequest):
    return {"status": "SUCCESS", "result": figma_engine.convert_figma_node(payload.figma_node)}

@router.post("/workspace/observe")
async def observe_workspace(payload: WorkspaceSuggestRequest):
    return {"status": "SUCCESS", "result": workspace_engine.observe_and_suggest(payload.active_file, payload.cursor_line)}

@router.post("/terminal/execute")
async def execute_terminal(payload: TerminalCommandRequest):
    return {"status": "SUCCESS", "result": terminal_engine.execute_terminal_command(payload.command, payload.confirmed)}

@router.get("/suite/status")
async def get_prod_status():
    return {"status": "SUCCESS", "result": prod_suite.get_production_status(), "metrics": prod_suite.get_opentelemetry_metrics()}
