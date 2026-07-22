from pydantic import BaseModel
from typing import Optional

class PatientsModel(BaseModel):
    id: Optional[str] = None
    mrn_number: str
    full_name: str
    dob: str
    gender: str
    contact_phone: str
    blood_group: str
    emergency_contact: str
