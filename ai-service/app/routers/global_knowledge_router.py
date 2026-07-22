from fastapi import APIRouter
from typing import Optional, Dict, Any
from app.engines.global_knowledge_network import GlobalKnowledgeNetworkEngine

router = APIRouter(prefix="/api/v1/knowledge", tags=["knowledge"])

@router.get("/research")
async def get_research():
    engine = GlobalKnowledgeNetworkEngine()
    return engine.get_research_summary()

@router.get("/graph")
async def get_graph():
    engine = GlobalKnowledgeNetworkEngine()
    return engine.get_knowledge_graph()

@router.get("/trends")
async def get_trends():
    engine = GlobalKnowledgeNetworkEngine()
    return engine.get_technology_trends()

@router.get("/patterns")
async def get_patterns():
    engine = GlobalKnowledgeNetworkEngine()
    return engine.get_pattern_blueprints()

@router.post("/validate")
async def validate_source():
    engine = GlobalKnowledgeNetworkEngine()
    return engine.validate_knowledge()
