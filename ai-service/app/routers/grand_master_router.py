from fastapi import APIRouter
from typing import Optional, Dict, Any
from app.engines.grand_master_core import GrandMasterCoreEngine

router = APIRouter(prefix="/api/v1/grandmaster", tags=["grandmaster"])

@router.get("/marketplace")
async def get_marketplace():
    engine = GrandMasterCoreEngine()
    return engine.get_marketplace_agents()

@router.get("/swarms")
async def get_swarms():
    engine = GrandMasterCoreEngine()
    return engine.get_swarm_coordination()

@router.get("/knowledge")
async def get_knowledge():
    engine = GrandMasterCoreEngine()
    return engine.get_universal_knowledge()

@router.get("/research")
async def get_research():
    engine = GrandMasterCoreEngine()
    return engine.get_scientific_research()

@router.get("/innovation")
async def get_innovation():
    engine = GrandMasterCoreEngine()
    return engine.get_innovations()
