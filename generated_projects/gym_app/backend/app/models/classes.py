from pydantic import BaseModel
from typing import Optional

class ClassesModel(BaseModel):
    id: Optional[str] = None
    classe_name: str
    code_identifier: str
    category: str
    status: str
    created_at: str
