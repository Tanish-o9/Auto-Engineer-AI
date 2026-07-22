from pydantic import BaseModel
from typing import Optional

class ClothesModel(BaseModel):
    id: Optional[str] = None
    clothe_name: str
    code_identifier: str
    category: str
    status: str
    created_at: str
