from fastapi import APIRouter
from typing import Optional, Dict, Any
from app.engines.cto_quality_engine import CTOQualityEngine

router = APIRouter(prefix="/api/v1/cto", tags=["cto"])

@router.get("/report")
async def get_cto_report():
    engine = CTOQualityEngine()
    return engine.generate_cto_report()

@router.get("/drift")
async def get_drift():
    engine = CTOQualityEngine()
    return engine.detect_drift()

@router.get("/traceability")
async def get_traceability():
    engine = CTOQualityEngine()
    return engine.trace_requirements()

@router.get("/debt")
async def get_technical_debt():
    engine = CTOQualityEngine()
    return engine.get_technical_debt()

@router.post("/heal")
async def trigger_self_healing():
    engine = CTOQualityEngine()
    return engine.run_self_healing()

@router.get("/explainability")
async def get_explainability():
    engine = CTOQualityEngine()
    return engine.get_explainability()
