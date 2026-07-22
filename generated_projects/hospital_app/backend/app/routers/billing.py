from fastapi import APIRouter, HTTPException, status
from typing import List, Dict, Any
from app.models.billing import BillingModel

router = APIRouter(prefix="/api/v1/hospital/billing", tags=["billing"])

# Active memory database
billing_repository: List[Dict[str, Any]] = [
    {"id": "billing_1", "status": "ACTIVE", "created_at": "2026-07-21 12:00:00"}
]

@router.get("/", response_model=List[Dict[str, Any]])
async def fetch_all_billing_records():
    return billing_repository

@router.post("/", status_code=status.HTTP_201_CREATED)
async def create_billing_record(payload: BillingModel):
    data = payload.model_dump()
    data["id"] = f"billing_" + str(len(billing_repository) + 1)
    billing_repository.append(data)
    return {"status": "CREATED", "data": data}

@router.get("/{record_id}")
async def get_billing_by_id(record_id: str):
    for item in billing_repository:
        if item.get("id") == record_id:
            return item
    raise HTTPException(status_code=404, detail="Billing record not found")

@router.delete("/{record_id}")
async def delete_billing_record(record_id: str):
    global billing_repository
    billing_repository = [r for r in billing_repository if r.get("id") != record_id]
    return {"status": "DELETED", "id": record_id}
