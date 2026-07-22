from fastapi import APIRouter, HTTPException, status
from typing import List, Dict, Any
from app.models.orders import OrdersModel

router = APIRouter(prefix="/api/v1/ecommerce/orders", tags=["orders"])

# Active memory database
orders_repository: List[Dict[str, Any]] = [
    {"id": "orders_1", "status": "ACTIVE", "created_at": "2026-07-21 12:00:00"}
]

@router.get("/", response_model=List[Dict[str, Any]])
async def fetch_all_orders_records():
    return orders_repository

@router.post("/", status_code=status.HTTP_201_CREATED)
async def create_orders_record(payload: OrdersModel):
    data = payload.model_dump()
    data["id"] = f"orders_" + str(len(orders_repository) + 1)
    orders_repository.append(data)
    return {"status": "CREATED", "data": data}

@router.get("/{record_id}")
async def get_orders_by_id(record_id: str):
    for item in orders_repository:
        if item.get("id") == record_id:
            return item
    raise HTTPException(status_code=404, detail="Orders record not found")

@router.delete("/{record_id}")
async def delete_orders_record(record_id: str):
    global orders_repository
    orders_repository = [r for r in orders_repository if r.get("id") != record_id]
    return {"status": "DELETED", "id": record_id}
