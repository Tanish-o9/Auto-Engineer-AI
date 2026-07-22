from pydantic import BaseModel
from typing import Optional

class FeesModel(BaseModel):
    id: Optional[str] = None
    student_id: str
    invoice_number: str
    amount_due: str
    amount_paid: str
    payment_status: str
    due_date: str
