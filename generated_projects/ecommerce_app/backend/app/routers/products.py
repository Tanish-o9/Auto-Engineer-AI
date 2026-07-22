from fastapi import APIRouter, HTTPException, status
from typing import List, Dict, Any
from app.models.products import ProductsModel

router = APIRouter(prefix="/api/v1/ecommerce/products", tags=["products"])

# Active memory database
products_repository: List[Dict[str, Any]] = [
    {"id": "products_1", "status": "ACTIVE", "created_at": "2026-07-21 12:00:00"}
]

@router.get("/", response_model=List[Dict[str, Any]])
async def fetch_all_products_records():
    return products_repository

@router.post("/", status_code=status.HTTP_201_CREATED)
async def create_products_record(payload: ProductsModel):
    data = payload.model_dump()
    data["id"] = f"products_" + str(len(products_repository) + 1)
    products_repository.append(data)
    return {"status": "CREATED", "data": data}

@router.get("/{record_id}")
async def get_products_by_id(record_id: str):
    for item in products_repository:
        if item.get("id") == record_id:
            return item
    raise HTTPException(status_code=404, detail="Products record not found")

@router.delete("/{record_id}")
async def delete_products_record(record_id: str):
    global products_repository
    products_repository = [r for r in products_repository if r.get("id") != record_id]
    return {"status": "DELETED", "id": record_id}
