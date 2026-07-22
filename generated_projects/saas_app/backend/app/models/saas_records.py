from pydantic import BaseModel
from typing import Optional

class Saas_recordsModel(BaseModel):
    id: Optional[str] = None
    event_type: str
    details_json: str
    log_level: str
    recorded_at: str
