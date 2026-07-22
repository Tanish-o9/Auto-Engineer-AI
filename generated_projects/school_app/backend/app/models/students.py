from pydantic import BaseModel
from typing import Optional

class StudentsModel(BaseModel):
    id: Optional[str] = None
    roll_number: str
    full_name: str
    email: str
    grade_level: str
    parent_phone: str
    enrollment_status: str
    created_at: str
