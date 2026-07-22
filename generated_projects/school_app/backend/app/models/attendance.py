from pydantic import BaseModel
from typing import Optional

class AttendanceModel(BaseModel):
    id: Optional[str] = None
    student_id: str
    class_date: str
    is_present: str
    remarks: str
    marked_at: str
