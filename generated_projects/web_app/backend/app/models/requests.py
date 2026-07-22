from pydantic import BaseModel
from typing import Optional

class RequestsModel(BaseModel):
    id: Optional[str] = None
    request_name: str
    code_identifier: str
    category: str
    status: str
    created_at: str
