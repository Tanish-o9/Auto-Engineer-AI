from pydantic import BaseModel
from typing import Optional

class SellsModel(BaseModel):
    id: Optional[str] = None
    sell_name: str
    code_identifier: str
    category: str
    status: str
    created_at: str
