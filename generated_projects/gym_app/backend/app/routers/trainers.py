from fastapi import APIRouter, HTTPException, status
from typing import List, Dict, Any
from app.models.trainers import TrainersModel

router = APIRouter(prefix="/api/v1/gym/trainers", tags=["trainers"])

# Active memory database
trainers_repository: List[Dict[str, Any]] = [
    {"id": "trainers_1", "status": "ACTIVE", "created_at": "2026-07-21 12:00:00"}
]

@router.get("/", response_model=List[Dict[str, Any]])
async def fetch_all_trainers_records():
    return trainers_repository

@router.post("/", status_code=status.HTTP_201_CREATED)
async def create_trainers_record(payload: TrainersModel):
    data = payload.model_dump()
    data["id"] = f"trainers_" + str(len(trainers_repository) + 1)
    trainers_repository.append(data)
    return {"status": "CREATED", "data": data}

@router.get("/{record_id}")
async def get_trainers_by_id(record_id: str):
    for item in trainers_repository:
        if item.get("id") == record_id:
            return item
    raise HTTPException(status_code=404, detail="Trainers record not found")

@router.delete("/{record_id}")
async def delete_trainers_record(record_id: str):
    global trainers_repository
    trainers_repository = [r for r in trainers_repository if r.get("id") != record_id]
    return {"status": "DELETED", "id": record_id}
