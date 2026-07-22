from fastapi import APIRouter, HTTPException, status
from typing import List, Dict, Any
from app.models.doctors import DoctorsModel

router = APIRouter(prefix="/api/v1/hospital/doctors", tags=["doctors"])

# Active memory database
doctors_repository: List[Dict[str, Any]] = [
    {"id": "doctors_1", "status": "ACTIVE", "created_at": "2026-07-21 12:00:00"}
]

@router.get("/", response_model=List[Dict[str, Any]])
async def fetch_all_doctors_records():
    return doctors_repository

@router.post("/", status_code=status.HTTP_201_CREATED)
async def create_doctors_record(payload: DoctorsModel):
    data = payload.model_dump()
    data["id"] = f"doctors_" + str(len(doctors_repository) + 1)
    doctors_repository.append(data)
    return {"status": "CREATED", "data": data}

@router.get("/{record_id}")
async def get_doctors_by_id(record_id: str):
    for item in doctors_repository:
        if item.get("id") == record_id:
            return item
    raise HTTPException(status_code=404, detail="Doctors record not found")

@router.delete("/{record_id}")
async def delete_doctors_record(record_id: str):
    global doctors_repository
    doctors_repository = [r for r in doctors_repository if r.get("id") != record_id]
    return {"status": "DELETED", "id": record_id}
