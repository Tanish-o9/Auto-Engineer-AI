from pydantic import BaseModel
from typing import Optional

class PaymentsModel(BaseModel):
    id: Optional[str] = None
    transaction_code: str
    amount: str
    currency: str
    payment_status: str
    processed_at: str
