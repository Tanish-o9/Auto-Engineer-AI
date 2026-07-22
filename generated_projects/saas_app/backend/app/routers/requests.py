from fastapi import APIRouter, HTTPException, status
from typing import List, Dict, Any
from app.models.requests import RequestsModel

router = APIRouter(prefix="/api/v1/saas/requests", tags=["requests"])

# Active memory database
requests_repository: List[Dict[str, Any]] = [
    {"id": "requests_1", "status": "ACTIVE", "created_at": "2026-07-21 12:00:00"}
]

@router.get("/", response_model=List[Dict[str, Any]])
async def fetch_all_requests_records():
    return requests_repository

@router.post("/", status_code=status.HTTP_201_CREATED)
async def create_requests_record(payload: RequestsModel):
    data = payload.model_dump()
    data["id"] = f"requests_" + str(len(requests_repository) + 1)
    requests_repository.append(data)
    return {"status": "CREATED", "data": data}

@router.get("/{record_id}")
async def get_requests_by_id(record_id: str):
    for item in requests_repository:
        if item.get("id") == record_id:
            return item
    raise HTTPException(status_code=404, detail="Requests record not found")

@router.delete("/{record_id}")
async def delete_requests_record(record_id: str):
    global requests_repository
    requests_repository = [r for r in requests_repository if r.get("id") != record_id]
    return {"status": "DELETED", "id": record_id}
