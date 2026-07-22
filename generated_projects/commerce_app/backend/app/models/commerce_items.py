from pydantic import BaseModel
from typing import Optional

class Commerce_itemsModel(BaseModel):
    id: Optional[str] = None
    commerce_item_name: str
    code_identifier: str
    category: str
    status: str
    created_at: str
