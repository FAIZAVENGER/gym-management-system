from pydantic import BaseModel
from datetime import datetime
from typing import Optional

class Payment(BaseModel):
    member_id: str
    amount: float
    month: str  # "January 2024" format
    status: str = "paid"  # "paid", "due", "overdue"
    payment_date: datetime = datetime.now()
    payment_method: str = "cash"  # "cash", "card", "upi"