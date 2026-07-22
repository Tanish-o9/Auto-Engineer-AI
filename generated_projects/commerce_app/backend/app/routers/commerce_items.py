from fastapi import APIRouter, HTTPException, status
from typing import List, Dict, Any
from app.models.commerce_items import Commerce_itemsModel

router = APIRouter(prefix="/api/v1/commerce/commerce_items", tags=["commerce_items"])

# Active memory database
commerce_items_repository: List[Dict[str, Any]] = [
    {"id": "commerce_items_1", "status": "ACTIVE", "created_at": "2026-07-21 12:00:00"}
]

@router.get("/", response_model=List[Dict[str, Any]])
async def fetch_all_commerce_items_records():
    return commerce_items_repository

@router.post("/", status_code=status.HTTP_201_CREATED)
async def create_commerce_items_record(payload: Commerce_itemsModel):
    data = payload.model_dump()
    data["id"] = f"commerce_items_" + str(len(commerce_items_repository) + 1)
    commerce_items_repository.append(data)
    return {"status": "CREATED", "data": data}

@router.get("/{record_id}")
async def get_commerce_items_by_id(record_id: str):
    for item in commerce_items_repository:
        if item.get("id") == record_id:
            return item
    raise HTTPException(status_code=404, detail="Commerce items record not found")

@router.delete("/{record_id}")
async def delete_commerce_items_record(record_id: str):
    global commerce_items_repository
    commerce_items_repository = [r for r in commerce_items_repository if r.get("id") != record_id]
    return {"status": "DELETED", "id": record_id}
