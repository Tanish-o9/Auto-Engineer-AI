from fastapi import APIRouter, HTTPException, status
from typing import List, Dict, Any
from app.models.bookings import BookingsModel

router = APIRouter(prefix="/api/v1/gym/bookings", tags=["bookings"])

# Active memory database
bookings_repository: List[Dict[str, Any]] = [
    {"id": "bookings_1", "status": "ACTIVE", "created_at": "2026-07-21 12:00:00"}
]

@router.get("/", response_model=List[Dict[str, Any]])
async def fetch_all_bookings_records():
    return bookings_repository

@router.post("/", status_code=status.HTTP_201_CREATED)
async def create_bookings_record(payload: BookingsModel):
    data = payload.model_dump()
    data["id"] = f"bookings_" + str(len(bookings_repository) + 1)
    bookings_repository.append(data)
    return {"status": "CREATED", "data": data}

@router.get("/{record_id}")
async def get_bookings_by_id(record_id: str):
    for item in bookings_repository:
        if item.get("id") == record_id:
            return item
    raise HTTPException(status_code=404, detail="Bookings record not found")

@router.delete("/{record_id}")
async def delete_bookings_record(record_id: str):
    global bookings_repository
    bookings_repository = [r for r in bookings_repository if r.get("id") != record_id]
    return {"status": "DELETED", "id": record_id}
