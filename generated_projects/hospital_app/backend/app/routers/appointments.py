from fastapi import APIRouter, HTTPException, status
from typing import List, Dict, Any
from app.models.appointments import AppointmentsModel

router = APIRouter(prefix="/api/v1/hospital/appointments", tags=["appointments"])

# Active memory database
appointments_repository: List[Dict[str, Any]] = [
    {"id": "appointments_1", "status": "ACTIVE", "created_at": "2026-07-21 12:00:00"}
]

@router.get("/", response_model=List[Dict[str, Any]])
async def fetch_all_appointments_records():
    return appointments_repository

@router.post("/", status_code=status.HTTP_201_CREATED)
async def create_appointments_record(payload: AppointmentsModel):
    data = payload.model_dump()
    data["id"] = f"appointments_" + str(len(appointments_repository) + 1)
    appointments_repository.append(data)
    return {"status": "CREATED", "data": data}

@router.get("/{record_id}")
async def get_appointments_by_id(record_id: str):
    for item in appointments_repository:
        if item.get("id") == record_id:
            return item
    raise HTTPException(status_code=404, detail="Appointments record not found")

@router.delete("/{record_id}")
async def delete_appointments_record(record_id: str):
    global appointments_repository
    appointments_repository = [r for r in appointments_repository if r.get("id") != record_id]
    return {"status": "DELETED", "id": record_id}
