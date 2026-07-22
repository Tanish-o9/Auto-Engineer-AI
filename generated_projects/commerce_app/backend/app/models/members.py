from pydantic import BaseModel
from typing import Optional

class MembersModel(BaseModel):
    id: Optional[str] = None
    member_code: str
    full_name: str
    email: str
    phone: str
    membership_type: str
    qr_pass_hash: str
    join_date: str
