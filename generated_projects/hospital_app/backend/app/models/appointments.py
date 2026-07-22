from pydantic import BaseModel
from typing import Optional

class AppointmentsModel(BaseModel):
    id: Optional[str] = None
    patient_id: str
    doctor_id: str
    appointment_date: str
    opd_token_number: str
    booking_status: str
