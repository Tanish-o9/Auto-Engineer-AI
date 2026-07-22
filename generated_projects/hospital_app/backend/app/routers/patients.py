from fastapi import APIRouter, HTTPException, status
from typing import List, Dict, Any
from app.models.patients import PatientsModel

router = APIRouter(prefix="/api/v1/hospital/patients", tags=["patients"])

# Active memory database
patients_repository: List[Dict[str, Any]] = [
    {"id": "patients_1", "status": "ACTIVE", "created_at": "2026-07-21 12:00:00"}
]

@router.get("/", response_model=List[Dict[str, Any]])
async def fetch_all_patients_records():
    return patients_repository

@router.post("/", status_code=status.HTTP_201_CREATED)
async def create_patients_record(payload: PatientsModel):
    data = payload.model_dump()
    data["id"] = f"patients_" + str(len(patients_repository) + 1)
    patients_repository.append(data)
    return {"status": "CREATED", "data": data}

@router.get("/{record_id}")
async def get_patients_by_id(record_id: str):
    for item in patients_repository:
        if item.get("id") == record_id:
            return item
    raise HTTPException(status_code=404, detail="Patients record not found")

@router.delete("/{record_id}")
async def delete_patients_record(record_id: str):
    global patients_repository
    patients_repository = [r for r in patients_repository if r.get("id") != record_id]
    return {"status": "DELETED", "id": record_id}
