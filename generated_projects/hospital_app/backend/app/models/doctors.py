from pydantic import BaseModel
from typing import Optional

class DoctorsModel(BaseModel):
    id: Optional[str] = None
    license_number: str
    full_name: str
    specialization: str
    department: str
    consultation_fee: str
    on_duty_status: str
