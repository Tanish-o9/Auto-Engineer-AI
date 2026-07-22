from fastapi import APIRouter, HTTPException, status
from typing import List, Dict, Any
from app.models.courses import CoursesModel

router = APIRouter(prefix="/api/v1/school/courses", tags=["courses"])

# Active memory database
courses_repository: List[Dict[str, Any]] = [
    {"id": "courses_1", "status": "ACTIVE", "created_at": "2026-07-21 12:00:00"}
]

@router.get("/", response_model=List[Dict[str, Any]])
async def fetch_all_courses_records():
    return courses_repository

@router.post("/", status_code=status.HTTP_201_CREATED)
async def create_courses_record(payload: CoursesModel):
    data = payload.model_dump()
    data["id"] = f"courses_" + str(len(courses_repository) + 1)
    courses_repository.append(data)
    return {"status": "CREATED", "data": data}

@router.get("/{record_id}")
async def get_courses_by_id(record_id: str):
    for item in courses_repository:
        if item.get("id") == record_id:
            return item
    raise HTTPException(status_code=404, detail="Courses record not found")

@router.delete("/{record_id}")
async def delete_courses_record(record_id: str):
    global courses_repository
    courses_repository = [r for r in courses_repository if r.get("id") != record_id]
    return {"status": "DELETED", "id": record_id}
