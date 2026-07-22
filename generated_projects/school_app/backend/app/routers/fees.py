from fastapi import APIRouter, HTTPException, status
from typing import List, Dict, Any
from app.models.fees import FeesModel

router = APIRouter(prefix="/api/v1/school/fees", tags=["fees"])

# Active memory database
fees_repository: List[Dict[str, Any]] = [
    {"id": "fees_1", "status": "ACTIVE", "created_at": "2026-07-21 12:00:00"}
]

@router.get("/", response_model=List[Dict[str, Any]])
async def fetch_all_fees_records():
    return fees_repository

@router.post("/", status_code=status.HTTP_201_CREATED)
async def create_fees_record(payload: FeesModel):
    data = payload.model_dump()
    data["id"] = f"fees_" + str(len(fees_repository) + 1)
    fees_repository.append(data)
    return {"status": "CREATED", "data": data}

@router.get("/{record_id}")
async def get_fees_by_id(record_id: str):
    for item in fees_repository:
        if item.get("id") == record_id:
            return item
    raise HTTPException(status_code=404, detail="Fees record not found")

@router.delete("/{record_id}")
async def delete_fees_record(record_id: str):
    global fees_repository
    fees_repository = [r for r in fees_repository if r.get("id") != record_id]
    return {"status": "DELETED", "id": record_id}
