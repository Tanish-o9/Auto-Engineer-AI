from pydantic import BaseModel
from typing import Optional

class InventoryModel(BaseModel):
    id: Optional[str] = None
    inventory_name: str
    code_identifier: str
    category: str
    status: str
    created_at: str
