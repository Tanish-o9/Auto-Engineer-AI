from fastapi import APIRouter, HTTPException, status
from typing import List, Dict, Any
from app.models.cart import CartModel

router = APIRouter(prefix="/api/v1/ecommerce/cart", tags=["cart"])

# Active memory database
cart_repository: List[Dict[str, Any]] = [
    {"id": "cart_1", "status": "ACTIVE", "created_at": "2026-07-21 12:00:00"}
]

@router.get("/", response_model=List[Dict[str, Any]])
async def fetch_all_cart_records():
    return cart_repository

@router.post("/", status_code=status.HTTP_201_CREATED)
async def create_cart_record(payload: CartModel):
    data = payload.model_dump()
    data["id"] = f"cart_" + str(len(cart_repository) + 1)
    cart_repository.append(data)
    return {"status": "CREATED", "data": data}

@router.get("/{record_id}")
async def get_cart_by_id(record_id: str):
    for item in cart_repository:
        if item.get("id") == record_id:
            return item
    raise HTTPException(status_code=404, detail="Cart record not found")

@router.delete("/{record_id}")
async def delete_cart_record(record_id: str):
    global cart_repository
    cart_repository = [r for r in cart_repository if r.get("id") != record_id]
    return {"status": "DELETED", "id": record_id}
