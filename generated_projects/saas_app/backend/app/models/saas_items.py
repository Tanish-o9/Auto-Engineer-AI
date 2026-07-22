from pydantic import BaseModel
from typing import Optional

class Saas_itemsModel(BaseModel):
    id: Optional[str] = None
    saas_item_name: str
    code_identifier: str
    category: str
    status: str
    created_at: str
