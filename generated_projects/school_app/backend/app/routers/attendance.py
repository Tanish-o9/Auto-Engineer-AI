from fastapi import APIRouter, HTTPException, status
from typing import List, Dict, Any
from app.models.attendance import AttendanceModel

router = APIRouter(prefix="/api/v1/school/attendance", tags=["attendance"])

# Active memory database
attendance_repository: List[Dict[str, Any]] = [
    {"id": "attendance_1", "status": "ACTIVE", "created_at": "2026-07-21 12:00:00"}
]

@router.get("/", response_model=List[Dict[str, Any]])
async def fetch_all_attendance_records():
    return attendance_repository

@router.post("/", status_code=status.HTTP_201_CREATED)
async def create_attendance_record(payload: AttendanceModel):
    data = payload.model_dump()
    data["id"] = f"attendance_" + str(len(attendance_repository) + 1)
    attendance_repository.append(data)
    return {"status": "CREATED", "data": data}

@router.get("/{record_id}")
async def get_attendance_by_id(record_id: str):
    for item in attendance_repository:
        if item.get("id") == record_id:
            return item
    raise HTTPException(status_code=404, detail="Attendance record not found")

@router.delete("/{record_id}")
async def delete_attendance_record(record_id: str):
    global attendance_repository
    attendance_repository = [r for r in attendance_repository if r.get("id") != record_id]
    return {"status": "DELETED", "id": record_id}
