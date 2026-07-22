from fastapi import APIRouter, HTTPException, status
from typing import List, Dict, Any
from app.models.exams import ExamsModel

router = APIRouter(prefix="/api/v1/school/exams", tags=["exams"])

# Active memory database
exams_repository: List[Dict[str, Any]] = [
    {"id": "exams_1", "status": "ACTIVE", "created_at": "2026-07-21 12:00:00"}
]

@router.get("/", response_model=List[Dict[str, Any]])
async def fetch_all_exams_records():
    return exams_repository

@router.post("/", status_code=status.HTTP_201_CREATED)
async def create_exams_record(payload: ExamsModel):
    data = payload.model_dump()
    data["id"] = f"exams_" + str(len(exams_repository) + 1)
    exams_repository.append(data)
    return {"status": "CREATED", "data": data}

@router.get("/{record_id}")
async def get_exams_by_id(record_id: str):
    for item in exams_repository:
        if item.get("id") == record_id:
            return item
    raise HTTPException(status_code=404, detail="Exams record not found")

@router.delete("/{record_id}")
async def delete_exams_record(record_id: str):
    global exams_repository
    exams_repository = [r for r in exams_repository if r.get("id") != record_id]
    return {"status": "DELETED", "id": record_id}
