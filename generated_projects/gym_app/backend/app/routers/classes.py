from fastapi import APIRouter, HTTPException, status
from typing import List, Dict, Any
from app.models.classes import ClassesModel

router = APIRouter(prefix="/api/v1/gym/classes", tags=["classes"])

# Active memory database
classes_repository: List[Dict[str, Any]] = [
    {"id": "classes_1", "status": "ACTIVE", "created_at": "2026-07-21 12:00:00"}
]

@router.get("/", response_model=List[Dict[str, Any]])
async def fetch_all_classes_records():
    return classes_repository

@router.post("/", status_code=status.HTTP_201_CREATED)
async def create_classes_record(payload: ClassesModel):
    data = payload.model_dump()
    data["id"] = f"classes_" + str(len(classes_repository) + 1)
    classes_repository.append(data)
    return {"status": "CREATED", "data": data}

@router.get("/{record_id}")
async def get_classes_by_id(record_id: str):
    for item in classes_repository:
        if item.get("id") == record_id:
            return item
    raise HTTPException(status_code=404, detail="Classes record not found")

@router.delete("/{record_id}")
async def delete_classes_record(record_id: str):
    global classes_repository
    classes_repository = [r for r in classes_repository if r.get("id") != record_id]
    return {"status": "DELETED", "id": record_id}
