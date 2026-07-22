from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.config import settings
from app.routers import (
    agents, integrations, architect, intelligence, memory, autonomous, 
    debugger, review, docs, testing, devops, production_routers, 
    core_engine_router, autonomous_platform_router, enterprise_engines_router, 
    autonomous_capabilities_router, advanced_platform_router, requirement_analyzer_router,
    repo_intelligence_router, master_orchestrator_router, master_ai_orchestrator_router,
    cto_quality_router, company_learning_router, goal_simulation_router, startup_builder_router,
    enterprise_governance_router, ai_os_kernel_router, self_evolution_router, autonomous_execution_router,
    global_knowledge_router, company_ecosystem_router, grand_master_router, unified_intelligence_router
)

app = FastAPI(
    title=settings.PROJECT_NAME,
    version="10.0.0",
    description="FastAPI Autonomous Software Engineering Platform for AutoEngineer AI"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(agents.router)
app.include_router(integrations.router)
app.include_router(architect.router)
app.include_router(intelligence.router)
app.include_router(memory.router)
app.include_router(autonomous.router)
app.include_router(debugger.router)
app.include_router(review.router)
app.include_router(docs.router)
app.include_router(testing.router)
app.include_router(devops.router)
app.include_router(production_routers.router)
app.include_router(core_engine_router.router)
app.include_router(autonomous_platform_router.router)
app.include_router(enterprise_engines_router.router)
app.include_router(autonomous_capabilities_router.router)
app.include_router(advanced_platform_router.router)
app.include_router(requirement_analyzer_router.router)
app.include_router(repo_intelligence_router.router)
app.include_router(master_orchestrator_router.router)
app.include_router(master_ai_orchestrator_router.router)
app.include_router(cto_quality_router.router)
app.include_router(company_learning_router.router)
app.include_router(goal_simulation_router.router)
app.include_router(startup_builder_router.router)
app.include_router(enterprise_governance_router.router)
app.include_router(ai_os_kernel_router.router)
app.include_router(self_evolution_router.router)
app.include_router(autonomous_execution_router.router)
app.include_router(global_knowledge_router.router)
app.include_router(company_ecosystem_router.router)
app.include_router(grand_master_router.router)
app.include_router(unified_intelligence_router.router)

@app.get("/health")
def health_check():
    return {"status": "ok", "service": "ai-service", "version": "10.0.0"}
