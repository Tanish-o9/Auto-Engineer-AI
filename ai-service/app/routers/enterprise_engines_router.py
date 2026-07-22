from fastapi import APIRouter
from typing import Optional
from app.engines.dependency_graph_engine import DependencyGraphEngine
from app.engines.autonomous_build_runner import AutonomousBuildRunner
from app.engines.ai_code_review_engine import AICodeReviewEngine

router = APIRouter(prefix="/api/v1/enterprise", tags=["enterprise"])

@router.get("/dependency-graph")
async def get_dependency_graph(project_path: Optional[str] = None):
    path = project_path or r"c:\Users\tanis\OneDrive\Desktop\Auto Engineer\generated_projects\gym_app"
    engine = DependencyGraphEngine()
    return engine.build_graph(path)

@router.post("/run-build")
async def run_autonomous_build(project_path: Optional[str] = None):
    path = project_path or r"c:\Users\tanis\OneDrive\Desktop\Auto Engineer\generated_projects\gym_app"
    runner = AutonomousBuildRunner()
    return runner.run_build_pipeline(path)

@router.post("/code-review")
async def run_code_review(project_path: Optional[str] = None):
    path = project_path or r"c:\Users\tanis\OneDrive\Desktop\Auto Engineer\generated_projects\gym_app"
    engine = AICodeReviewEngine()
    return engine.review_repository(path)
