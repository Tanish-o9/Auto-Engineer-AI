from pydantic import BaseModel
from typing import Optional

class PrescriptionsModel(BaseModel):
    id: Optional[str] = None
    appointment_id: str
    doctor_id: str
    diagnosis_notes: str
    medications_json: str
    prescribed_at: str
