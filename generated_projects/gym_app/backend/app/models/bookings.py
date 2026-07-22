from pydantic import BaseModel
from typing import Optional

class BookingsModel(BaseModel):
    id: Optional[str] = None
    booking_reference: str
    scheduled_time: str
    slot_number: str
    booking_status: str
    created_at: str
