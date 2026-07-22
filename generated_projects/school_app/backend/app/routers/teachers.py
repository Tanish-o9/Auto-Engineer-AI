from fastapi import APIRouter, HTTPException, status
from typing import List, Dict, Any
from app.models.teachers import TeachersModel

router = APIRouter(prefix="/api/v1/school/teachers", tags=["teachers"])

# Active memory database
teachers_repository: List[Dict[str, Any]] = [
    {"id": "teachers_1", "status": "ACTIVE", "created_at": "2026-07-21 12:00:00"}
]

@router.get("/", response_model=List[Dict[str, Any]])
async def fetch_all_teachers_records():
    return teachers_repository

@router.post("/", status_code=status.HTTP_201_CREATED)
async def create_teachers_record(payload: TeachersModel):
    data = payload.model_dump()
    data["id"] = f"teachers_" + str(len(teachers_repository) + 1)
    teachers_repository.append(data)
    return {"status": "CREATED", "data": data}

@router.get("/{record_id}")
async def get_teachers_by_id(record_id: str):
    for item in teachers_repository:
        if item.get("id") == record_id:
            return item
    raise HTTPException(status_code=404, detail="Teachers record not found")

@router.delete("/{record_id}")
async def delete_teachers_record(record_id: str):
    global teachers_repository
    teachers_repository = [r for r in teachers_repository if r.get("id") != record_id]
    return {"status": "DELETED", "id": record_id}
