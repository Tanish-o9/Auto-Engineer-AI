from pydantic import BaseModel
from typing import Optional

class CustomersModel(BaseModel):
    id: Optional[str] = None
    full_name: str
    email: str
    phone: str
    account_status: str
    created_at: str
