from pydantic import BaseModel
from typing import Optional

class CoursesModel(BaseModel):
    id: Optional[str] = None
    course_code: str
    course_name: str
    credits: str
    department: str
    syllabus_summary: str
