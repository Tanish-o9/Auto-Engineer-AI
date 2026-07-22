from fastapi import APIRouter, HTTPException, status
from typing import List, Dict, Any
from app.models.inventory import InventoryModel

router = APIRouter(prefix="/api/v1/ecommerce/inventory", tags=["inventory"])

# Active memory database
inventory_repository: List[Dict[str, Any]] = [
    {"id": "inventory_1", "status": "ACTIVE", "created_at": "2026-07-21 12:00:00"}
]

@router.get("/", response_model=List[Dict[str, Any]])
async def fetch_all_inventory_records():
    return inventory_repository

@router.post("/", status_code=status.HTTP_201_CREATED)
async def create_inventory_record(payload: InventoryModel):
    data = payload.model_dump()
    data["id"] = f"inventory_" + str(len(inventory_repository) + 1)
    inventory_repository.append(data)
    return {"status": "CREATED", "data": data}

@router.get("/{record_id}")
async def get_inventory_by_id(record_id: str):
    for item in inventory_repository:
        if item.get("id") == record_id:
            return item
    raise HTTPException(status_code=404, detail="Inventory record not found")

@router.delete("/{record_id}")
async def delete_inventory_record(record_id: str):
    global inventory_repository
    inventory_repository = [r for r in inventory_repository if r.get("id") != record_id]
    return {"status": "DELETED", "id": record_id}
