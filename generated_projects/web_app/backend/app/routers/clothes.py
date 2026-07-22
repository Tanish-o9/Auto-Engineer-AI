from fastapi import APIRouter, HTTPException, status
from typing import List, Dict, Any
from app.models.clothes import ClothesModel

router = APIRouter(prefix="/api/v1/web/clothes", tags=["clothes"])

# Active memory database
clothes_repository: List[Dict[str, Any]] = [
    {"id": "clothes_1", "status": "ACTIVE", "created_at": "2026-07-21 12:00:00"}
]

@router.get("/", response_model=List[Dict[str, Any]])
async def fetch_all_clothes_records():
    return clothes_repository

@router.post("/", status_code=status.HTTP_201_CREATED)
async def create_clothes_record(payload: ClothesModel):
    data = payload.model_dump()
    data["id"] = f"clothes_" + str(len(clothes_repository) + 1)
    clothes_repository.append(data)
    return {"status": "CREATED", "data": data}

@router.get("/{record_id}")
async def get_clothes_by_id(record_id: str):
    for item in clothes_repository:
        if item.get("id") == record_id:
            return item
    raise HTTPException(status_code=404, detail="Clothes record not found")

@router.delete("/{record_id}")
async def delete_clothes_record(record_id: str):
    global clothes_repository
    clothes_repository = [r for r in clothes_repository if r.get("id") != record_id]
    return {"status": "DELETED", "id": record_id}
