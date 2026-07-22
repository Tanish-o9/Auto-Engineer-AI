from fastapi import APIRouter
from typing import Optional, Dict, Any
from app.engines.company_ecosystem_engine import CompanyEcosystemEngine

router = APIRouter(prefix="/api/v1/company-ecosystem", tags=["company-ecosystem"])

@router.get("/strategy")
async def get_strategy():
    engine = CompanyEcosystemEngine()
    return engine.get_strategic_roadmap()

@router.get("/financials")
async def get_financials():
    engine = CompanyEcosystemEngine()
    return engine.get_financials()

@router.get("/marketing")
async def get_marketing():
    engine = CompanyEcosystemEngine()
    return engine.get_marketing_sales()

@router.get("/legal")
async def get_legal():
    engine = CompanyEcosystemEngine()
    return engine.get_legal_status()

@router.get("/operations")
async def get_operations():
    engine = CompanyEcosystemEngine()
    return engine.get_operations()
