from pydantic import BaseModel
from typing import Optional

class OrdersModel(BaseModel):
    id: Optional[str] = None
    order_number: str
    customer_id: str
    total_amount: str
    order_status: str
    shipping_address: str
    ordered_at: str
