from fastapi import APIRouter, HTTPException, status
from typing import List, Dict, Any
from app.models.saas_records import Saas_recordsModel

router = APIRouter(prefix="/api/v1/saas/saas_records", tags=["saas_records"])

# Active memory database
saas_records_repository: List[Dict[str, Any]] = [
    {"id": "saas_records_1", "status": "ACTIVE", "created_at": "2026-07-21 12:00:00"}
]

@router.get("/", response_model=List[Dict[str, Any]])
async def fetch_all_saas_records_records():
    return saas_records_repository

@router.post("/", status_code=status.HTTP_201_CREATED)
async def create_saas_records_record(payload: Saas_recordsModel):
    data = payload.model_dump()
    data["id"] = f"saas_records_" + str(len(saas_records_repository) + 1)
    saas_records_repository.append(data)
    return {"status": "CREATED", "data": data}

@router.get("/{record_id}")
async def get_saas_records_by_id(record_id: str):
    for item in saas_records_repository:
        if item.get("id") == record_id:
            return item
    raise HTTPException(status_code=404, detail="Saas records record not found")

@router.delete("/{record_id}")
async def delete_saas_records_record(record_id: str):
    global saas_records_repository
    saas_records_repository = [r for r in saas_records_repository if r.get("id") != record_id]
    return {"status": "DELETED", "id": record_id}
