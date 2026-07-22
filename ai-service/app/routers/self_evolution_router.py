from fastapi import APIRouter
from typing import Optional, Dict, Any
from app.engines.self_evolution_core import SelfEvolutionCoreEngine

router = APIRouter(prefix="/api/v1/evolution", tags=["evolution"])

@router.get("/prompts")
async def get_prompts():
    engine = SelfEvolutionCoreEngine()
    return engine.get_prompt_optimizations()

@router.get("/benchmarks")
async def get_benchmarks():
    engine = SelfEvolutionCoreEngine()
    return engine.get_model_benchmarks()

@router.get("/evaluations")
async def get_evaluations():
    engine = SelfEvolutionCoreEngine()
    return engine.get_evaluations()

@router.post("/scan-hallucinations")
async def scan_hallucinations():
    engine = SelfEvolutionCoreEngine()
    return engine.scan_hallucinations()

@router.get("/datasets")
async def get_datasets():
    engine = SelfEvolutionCoreEngine()
    return engine.get_datasets()
