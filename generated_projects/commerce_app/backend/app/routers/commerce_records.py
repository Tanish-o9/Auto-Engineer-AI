from fastapi import APIRouter, HTTPException, status
from typing import List, Dict, Any
from app.models.commerce_records import Commerce_recordsModel

router = APIRouter(prefix="/api/v1/commerce/commerce_records", tags=["commerce_records"])

# Active memory database
commerce_records_repository: List[Dict[str, Any]] = [
    {"id": "commerce_records_1", "status": "ACTIVE", "created_at": "2026-07-21 12:00:00"}
]

@router.get("/", response_model=List[Dict[str, Any]])
async def fetch_all_commerce_records_records():
    return commerce_records_repository

@router.post("/", status_code=status.HTTP_201_CREATED)
async def create_commerce_records_record(payload: Commerce_recordsModel):
    data = payload.model_dump()
    data["id"] = f"commerce_records_" + str(len(commerce_records_repository) + 1)
    commerce_records_repository.append(data)
    return {"status": "CREATED", "data": data}

@router.get("/{record_id}")
async def get_commerce_records_by_id(record_id: str):
    for item in commerce_records_repository:
        if item.get("id") == record_id:
            return item
    raise HTTPException(status_code=404, detail="Commerce records record not found")

@router.delete("/{record_id}")
async def delete_commerce_records_record(record_id: str):
    global commerce_records_repository
    commerce_records_repository = [r for r in commerce_records_repository if r.get("id") != record_id]
    return {"status": "DELETED", "id": record_id}
