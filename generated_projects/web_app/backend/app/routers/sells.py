from fastapi import APIRouter, HTTPException, status
from typing import List, Dict, Any
from app.models.sells import SellsModel

router = APIRouter(prefix="/api/v1/web/sells", tags=["sells"])

# Active memory database
sells_repository: List[Dict[str, Any]] = [
    {"id": "sells_1", "status": "ACTIVE", "created_at": "2026-07-21 12:00:00"}
]

@router.get("/", response_model=List[Dict[str, Any]])
async def fetch_all_sells_records():
    return sells_repository

@router.post("/", status_code=status.HTTP_201_CREATED)
async def create_sells_record(payload: SellsModel):
    data = payload.model_dump()
    data["id"] = f"sells_" + str(len(sells_repository) + 1)
    sells_repository.append(data)
    return {"status": "CREATED", "data": data}

@router.get("/{record_id}")
async def get_sells_by_id(record_id: str):
    for item in sells_repository:
        if item.get("id") == record_id:
            return item
    raise HTTPException(status_code=404, detail="Sells record not found")

@router.delete("/{record_id}")
async def delete_sells_record(record_id: str):
    global sells_repository
    sells_repository = [r for r in sells_repository if r.get("id") != record_id]
    return {"status": "DELETED", "id": record_id}
