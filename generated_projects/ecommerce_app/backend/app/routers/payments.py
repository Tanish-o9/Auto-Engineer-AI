from fastapi import APIRouter, HTTPException, status
from typing import List, Dict, Any
from app.models.payments import PaymentsModel

router = APIRouter(prefix="/api/v1/ecommerce/payments", tags=["payments"])

# Active memory database
payments_repository: List[Dict[str, Any]] = [
    {"id": "payments_1", "status": "ACTIVE", "created_at": "2026-07-21 12:00:00"}
]

@router.get("/", response_model=List[Dict[str, Any]])
async def fetch_all_payments_records():
    return payments_repository

@router.post("/", status_code=status.HTTP_201_CREATED)
async def create_payments_record(payload: PaymentsModel):
    data = payload.model_dump()
    data["id"] = f"payments_" + str(len(payments_repository) + 1)
    payments_repository.append(data)
    return {"status": "CREATED", "data": data}

@router.get("/{record_id}")
async def get_payments_by_id(record_id: str):
    for item in payments_repository:
        if item.get("id") == record_id:
            return item
    raise HTTPException(status_code=404, detail="Payments record not found")

@router.delete("/{record_id}")
async def delete_payments_record(record_id: str):
    global payments_repository
    payments_repository = [r for r in payments_repository if r.get("id") != record_id]
    return {"status": "DELETED", "id": record_id}
