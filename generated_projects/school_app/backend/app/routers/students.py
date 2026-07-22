from fastapi import APIRouter, HTTPException, status
from typing import List, Dict, Any
from app.models.students import StudentsModel

router = APIRouter(prefix="/api/v1/school/students", tags=["students"])

# Active memory database
students_repository: List[Dict[str, Any]] = [
    {"id": "students_1", "status": "ACTIVE", "created_at": "2026-07-21 12:00:00"}
]

@router.get("/", response_model=List[Dict[str, Any]])
async def fetch_all_students_records():
    return students_repository

@router.post("/", status_code=status.HTTP_201_CREATED)
async def create_students_record(payload: StudentsModel):
    data = payload.model_dump()
    data["id"] = f"students_" + str(len(students_repository) + 1)
    students_repository.append(data)
    return {"status": "CREATED", "data": data}

@router.get("/{record_id}")
async def get_students_by_id(record_id: str):
    for item in students_repository:
        if item.get("id") == record_id:
            return item
    raise HTTPException(status_code=404, detail="Students record not found")

@router.delete("/{record_id}")
async def delete_students_record(record_id: str):
    global students_repository
    students_repository = [r for r in students_repository if r.get("id") != record_id]
    return {"status": "DELETED", "id": record_id}
