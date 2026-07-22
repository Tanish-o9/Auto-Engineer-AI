from fastapi import APIRouter
from typing import Optional, Dict, Any
from app.engines.timeline_checkpoint_engine import TimelineCheckpointEngine
from app.engines.business_rule_engine import BusinessRuleEngine
from app.engines.spec_analyzer_engine import SpecAnalyzerEngine
from app.engines.template_marketplace_engine import TemplateMarketplaceEngine
from app.engines.pair_programmer_engine import PairProgrammerEngine

router = APIRouter(prefix="/api/v1/platform", tags=["platform"])

@router.get("/checkpoints")
async def get_checkpoints(project_path: Optional[str] = None):
    path = project_path or r"c:\Users\tanis\OneDrive\Desktop\Auto Engineer\generated_projects\gym_app"
    engine = TimelineCheckpointEngine()
    return engine.get_timeline(path)

@router.post("/create-checkpoint")
async def create_checkpoint(name: str = "Manual Snapshot", description: str = "User triggered checkpoint"):
    engine = TimelineCheckpointEngine()
    return engine.create_checkpoint(name, description)

@router.get("/business-rules")
async def get_business_rules(project_path: Optional[str] = None):
    path = project_path or r"c:\Users\tanis\OneDrive\Desktop\Auto Engineer\generated_projects\gym_app"
    engine = BusinessRuleEngine()
    return engine.extract_and_validate_rules(path)

@router.get("/spec-analysis")
async def get_spec_analysis(project_path: Optional[str] = None):
    path = project_path or r"c:\Users\tanis\OneDrive\Desktop\Auto Engineer\generated_projects\gym_app"
    engine = SpecAnalyzerEngine()
    return engine.analyze_completeness(path)

@router.get("/templates")
async def get_templates():
    return TemplateMarketplaceEngine.get_marketplace_templates()

@router.post("/pair-assist")
async def pair_assist(action: str = "explain", code: str = "", question: str = ""):
    engine = PairProgrammerEngine()
    return engine.assist(action, code, question)
