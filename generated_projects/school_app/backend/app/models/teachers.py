from pydantic import BaseModel
from typing import Optional

class TeachersModel(BaseModel):
    id: Optional[str] = None
    employee_id: str
    full_name: str
    email: str
    department: str
    qualification: str
    joining_date: str
