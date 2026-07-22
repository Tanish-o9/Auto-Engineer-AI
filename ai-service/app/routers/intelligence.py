from fastapi import APIRouter, HTTPException, status
from pydantic import BaseModel
from typing import Optional
from app.engines.repo_intelligence import RepositoryIntelligenceEngine

router = APIRouter(prefix="/api/v1/intelligence", tags=["intelligence"])

class ScanRequest(BaseModel):
    repo_path: Optional[str] = None

class QueryRequest(BaseModel):
    query: str
    repo_path: Optional[str] = None

engine = RepositoryIntelligenceEngine()

@router.post("/scan")
async def scan_repository(payload: ScanRequest):
    res = engine.scan_repository(payload.repo_path)
    dep_graph = engine.build_dependency_graph()
    smells = engine.detect_code_smells()
    return {
        "status": "SCANNED",
        "scan_summary": res,
        "dependency_graph": dep_graph,
        "code_smells": smells
    }

@router.post("/query")
async def query_repository(payload: QueryRequest):
    if not payload.query.strip():
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Query must not be empty")

    if payload.repo_path:
        engine.scan_repository(payload.repo_path)
        
    answer = engine.query_repository(payload.query)
    return {
        "status": "SUCCESS",
        "result": answer
    }
