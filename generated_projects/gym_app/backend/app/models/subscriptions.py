from pydantic import BaseModel
from typing import Optional

class SubscriptionsModel(BaseModel):
    id: Optional[str] = None
    subscription_name: str
    code_identifier: str
    category: str
    status: str
    created_at: str
