from fastapi import APIRouter, HTTPException, status
from pydantic import BaseModel
from typing import Optional
from app.memory.persistent_memory import PersistentMemoryEngine

router = APIRouter(prefix="/api/v1/memory", tags=["memory"])

class MemoryStoreRequest(BaseModel):
    category: str
    content: str
    memory_type: Optional[str] = "long_term"
    importance: Optional[float] = 0.8

class MemorySearchRequest(BaseModel):
    query: str
    category: Optional[str] = None
    top_k: Optional[int] = 5

engine = PersistentMemoryEngine()

@router.post("/store")
async def store_memory(payload: MemoryStoreRequest):
    if not payload.content.strip():
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Content must not be empty")

    item = engine.store_memory(payload.category, payload.content, payload.memory_type, payload.importance)
    return {
        "status": "STORED",
        "memory_item": item
    }

@router.post("/search")
async def search_memory(payload: MemorySearchRequest):
    results = engine.semantic_search(payload.query, payload.category, payload.top_k)
    return {
        "status": "SUCCESS",
        "results_count": len(results),
        "results": results
    }

@router.get("/all")
async def get_all_memories():
    return {
        "status": "SUCCESS",
        "data": engine.get_all_memories()
    }
