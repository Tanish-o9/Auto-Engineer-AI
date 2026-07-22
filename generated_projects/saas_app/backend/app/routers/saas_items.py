from fastapi import APIRouter, HTTPException, status
from typing import List, Dict, Any
from app.models.saas_items import Saas_itemsModel

router = APIRouter(prefix="/api/v1/saas/saas_items", tags=["saas_items"])

# Active memory database
saas_items_repository: List[Dict[str, Any]] = [
    {"id": "saas_items_1", "status": "ACTIVE", "created_at": "2026-07-21 12:00:00"}
]

@router.get("/", response_model=List[Dict[str, Any]])
async def fetch_all_saas_items_records():
    return saas_items_repository

@router.post("/", status_code=status.HTTP_201_CREATED)
async def create_saas_items_record(payload: Saas_itemsModel):
    data = payload.model_dump()
    data["id"] = f"saas_items_" + str(len(saas_items_repository) + 1)
    saas_items_repository.append(data)
    return {"status": "CREATED", "data": data}

@router.get("/{record_id}")
async def get_saas_items_by_id(record_id: str):
    for item in saas_items_repository:
        if item.get("id") == record_id:
            return item
    raise HTTPException(status_code=404, detail="Saas items record not found")

@router.delete("/{record_id}")
async def delete_saas_items_record(record_id: str):
    global saas_items_repository
    saas_items_repository = [r for r in saas_items_repository if r.get("id") != record_id]
    return {"status": "DELETED", "id": record_id}
