from fastapi import APIRouter, HTTPException, status
from typing import List, Dict, Any
from app.models.web_items import Web_itemsModel

router = APIRouter(prefix="/api/v1/web/web_items", tags=["web_items"])

# Active memory database
web_items_repository: List[Dict[str, Any]] = [
    {"id": "web_items_1", "status": "ACTIVE", "created_at": "2026-07-21 12:00:00"}
]

@router.get("/", response_model=List[Dict[str, Any]])
async def fetch_all_web_items_records():
    return web_items_repository

@router.post("/", status_code=status.HTTP_201_CREATED)
async def create_web_items_record(payload: Web_itemsModel):
    data = payload.model_dump()
    data["id"] = f"web_items_" + str(len(web_items_repository) + 1)
    web_items_repository.append(data)
    return {"status": "CREATED", "data": data}

@router.get("/{record_id}")
async def get_web_items_by_id(record_id: str):
    for item in web_items_repository:
        if item.get("id") == record_id:
            return item
    raise HTTPException(status_code=404, detail="Web items record not found")

@router.delete("/{record_id}")
async def delete_web_items_record(record_id: str):
    global web_items_repository
    web_items_repository = [r for r in web_items_repository if r.get("id") != record_id]
    return {"status": "DELETED", "id": record_id}
