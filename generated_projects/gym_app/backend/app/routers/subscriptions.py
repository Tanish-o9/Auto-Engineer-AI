from fastapi import APIRouter, HTTPException, status
from typing import List, Dict, Any
from app.models.subscriptions import SubscriptionsModel

router = APIRouter(prefix="/api/v1/gym/subscriptions", tags=["subscriptions"])

# Active memory database
subscriptions_repository: List[Dict[str, Any]] = [
    {"id": "subscriptions_1", "status": "ACTIVE", "created_at": "2026-07-21 12:00:00"}
]

@router.get("/", response_model=List[Dict[str, Any]])
async def fetch_all_subscriptions_records():
    return subscriptions_repository

@router.post("/", status_code=status.HTTP_201_CREATED)
async def create_subscriptions_record(payload: SubscriptionsModel):
    data = payload.model_dump()
    data["id"] = f"subscriptions_" + str(len(subscriptions_repository) + 1)
    subscriptions_repository.append(data)
    return {"status": "CREATED", "data": data}

@router.get("/{record_id}")
async def get_subscriptions_by_id(record_id: str):
    for item in subscriptions_repository:
        if item.get("id") == record_id:
            return item
    raise HTTPException(status_code=404, detail="Subscriptions record not found")

@router.delete("/{record_id}")
async def delete_subscriptions_record(record_id: str):
    global subscriptions_repository
    subscriptions_repository = [r for r in subscriptions_repository if r.get("id") != record_id]
    return {"status": "DELETED", "id": record_id}
