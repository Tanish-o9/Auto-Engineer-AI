from fastapi import APIRouter
from typing import Optional, Dict, Any
from app.engines.unified_intelligence_core import UnifiedIntelligenceCoreEngine

router = APIRouter(prefix="/api/v1/unified", tags=["unified"])

@router.get("/collaboration")
async def get_collaboration():
    engine = UnifiedIntelligenceCoreEngine()
    return engine.get_collaboration_status()

@router.get("/robotics")
async def get_robotics():
    engine = UnifiedIntelligenceCoreEngine()
    return engine.get_robotics_fleet()

@router.get("/twins")
async def get_twins():
    engine = UnifiedIntelligenceCoreEngine()
    return engine.get_twin_simulations()

@router.get("/federation")
async def get_federation():
    engine = UnifiedIntelligenceCoreEngine()
    return engine.get_federation_state()

@router.get("/agei")
async def get_agei():
    engine = UnifiedIntelligenceCoreEngine()
    return engine.get_agei_reasoning()
