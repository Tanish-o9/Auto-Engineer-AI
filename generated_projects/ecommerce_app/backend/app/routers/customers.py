from fastapi import APIRouter, HTTPException, status
from typing import List, Dict, Any
from app.models.customers import CustomersModel

router = APIRouter(prefix="/api/v1/ecommerce/customers", tags=["customers"])

# Active memory database
customers_repository: List[Dict[str, Any]] = [
    {"id": "customers_1", "status": "ACTIVE", "created_at": "2026-07-21 12:00:00"}
]

@router.get("/", response_model=List[Dict[str, Any]])
async def fetch_all_customers_records():
    return customers_repository

@router.post("/", status_code=status.HTTP_201_CREATED)
async def create_customers_record(payload: CustomersModel):
    data = payload.model_dump()
    data["id"] = f"customers_" + str(len(customers_repository) + 1)
    customers_repository.append(data)
    return {"status": "CREATED", "data": data}

@router.get("/{record_id}")
async def get_customers_by_id(record_id: str):
    for item in customers_repository:
        if item.get("id") == record_id:
            return item
    raise HTTPException(status_code=404, detail="Customers record not found")

@router.delete("/{record_id}")
async def delete_customers_record(record_id: str):
    global customers_repository
    customers_repository = [r for r in customers_repository if r.get("id") != record_id]
    return {"status": "DELETED", "id": record_id}
