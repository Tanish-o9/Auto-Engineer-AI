from fastapi import APIRouter, HTTPException, status
from typing import List, Dict, Any
from app.models.records import RecordsModel

router = APIRouter(prefix="/api/v1/hospital/records", tags=["records"])

# Active memory database
records_repository: List[Dict[str, Any]] = [
    {"id": "records_1", "status": "ACTIVE", "created_at": "2026-07-21 12:00:00"}
]

@router.get("/", response_model=List[Dict[str, Any]])
async def fetch_all_records_records():
    return records_repository

@router.post("/", status_code=status.HTTP_201_CREATED)
async def create_records_record(payload: RecordsModel):
    data = payload.model_dump()
    data["id"] = f"records_" + str(len(records_repository) + 1)
    records_repository.append(data)
    return {"status": "CREATED", "data": data}

@router.get("/{record_id}")
async def get_records_by_id(record_id: str):
    for item in records_repository:
        if item.get("id") == record_id:
            return item
    raise HTTPException(status_code=404, detail="Records record not found")

@router.delete("/{record_id}")
async def delete_records_record(record_id: str):
    global records_repository
    records_repository = [r for r in records_repository if r.get("id") != record_id]
    return {"status": "DELETED", "id": record_id}
