from pydantic import BaseModel
from typing import Optional

class AnalyticsModel(BaseModel):
    id: Optional[str] = None
    analytic_name: str
    code_identifier: str
    category: str
    status: str
    created_at: str
