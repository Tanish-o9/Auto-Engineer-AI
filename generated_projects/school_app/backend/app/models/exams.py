from pydantic import BaseModel
from typing import Optional

class ExamsModel(BaseModel):
    id: Optional[str] = None
    exam_title: str
    course_id: str
    max_marks: str
    passing_marks: str
    exam_date: str
