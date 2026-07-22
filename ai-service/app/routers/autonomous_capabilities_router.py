from fastapi import APIRouter
from typing import Optional, Dict, Any
from app.engines.ai_test_generator import AITestGenerator
from app.engines.security_analysis_agent import SecurityAnalysisAgent
from app.engines.ai_performance_optimizer import AIPerformanceOptimizer
from app.engines.github_intelligence import GitHubIntelligenceEngine
from app.engines.deployment_agent import DeploymentAgent

router = APIRouter(prefix="/api/v1/capabilities", tags=["capabilities"])

@router.post("/generate-tests")
async def generate_tests(project_path: Optional[str] = None):
    path = project_path or r"c:\Users\tanis\OneDrive\Desktop\Auto Engineer\generated_projects\gym_app"
    generator = AITestGenerator()
    return generator.generate_tests_for_repository(path)

@router.get("/security-scan")
async def security_scan(project_path: Optional[str] = None):
    path = project_path or r"c:\Users\tanis\OneDrive\Desktop\Auto Engineer\generated_projects\gym_app"
    agent = SecurityAnalysisAgent()
    return agent.scan_repository(path)

@router.get("/performance-analysis")
async def performance_analysis(project_path: Optional[str] = None):
    path = project_path or r"c:\Users\tanis\OneDrive\Desktop\Auto Engineer\generated_projects\gym_app"
    optimizer = AIPerformanceOptimizer()
    return optimizer.analyze_performance(path)

@router.post("/github-action")
async def github_action(action: str = "status", payload: Optional[Dict[str, Any]] = None):
    engine = GitHubIntelligenceEngine()
    return engine.execute_git_workflow(action, payload or {})

@router.post("/generate-deployment")
async def generate_deployment(target_cloud: str = "AWS"):
    agent = DeploymentAgent()
    return agent.generate_deployment_config(target_cloud)
