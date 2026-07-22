from pydantic import BaseModel
from typing import Optional

class TrainersModel(BaseModel):
    id: Optional[str] = None
    trainer_name: str
    specialty: str
    experience_years: str
    hourly_rate: str
    availability_status: str
