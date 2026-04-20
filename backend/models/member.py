from pydantic import BaseModel
from typing import Optional
from datetime import date, datetime

class Member(BaseModel):
    name: str
    phone: str
    email: Optional[str] = None
    plan: str  # "monthly", "quarterly", "yearly"
    start_date: str  # Changed from date to str
    end_date: str    # Changed from date to str
    status: str = "active"  # "active", "expired", "pending"
    fee: float = 0
    join_date: str = str(date.today())  # Changed to string