from pydantic import BaseModel
from typing import Optional

class ProductsModel(BaseModel):
    id: Optional[str] = None
    sku: str
    product_name: str
    category: str
    price: str
    stock_quantity: str
    image_url: str
