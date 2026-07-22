from fastapi import APIRouter, HTTPException, status
from typing import List, Dict, Any
from app.models.prescriptions import PrescriptionsModel

router = APIRouter(prefix="/api/v1/hospital/prescriptions", tags=["prescriptions"])

# Active memory database
prescriptions_repository: List[Dict[str, Any]] = [
    {"id": "prescriptions_1", "status": "ACTIVE", "created_at": "2026-07-21 12:00:00"}
]

@router.get("/", response_model=List[Dict[str, Any]])
async def fetch_all_prescriptions_records():
    return prescriptions_repository

@router.post("/", status_code=status.HTTP_201_CREATED)
async def create_prescriptions_record(payload: PrescriptionsModel):
    data = payload.model_dump()
    data["id"] = f"prescriptions_" + str(len(prescriptions_repository) + 1)
    prescriptions_repository.append(data)
    return {"status": "CREATED", "data": data}

@router.get("/{record_id}")
async def get_prescriptions_by_id(record_id: str):
    for item in prescriptions_repository:
        if item.get("id") == record_id:
            return item
    raise HTTPException(status_code=404, detail="Prescriptions record not found")

@router.delete("/{record_id}")
async def delete_prescriptions_record(record_id: str):
    global prescriptions_repository
    prescriptions_repository = [r for r in prescriptions_repository if r.get("id") != record_id]
    return {"status": "DELETED", "id": record_id}
