from pydantic import BaseModel
from datetime import datetime

class Lead(BaseModel):
    name: str
    phone: str
    goal: str  # "weight-loss", "muscle-gain", "fitness"
    source: str = "website"  # "website", "referral", "walkin"
    created_at: datetime = datetime.now()
    status: str = "new"  # "new", "contacted", "converted", "lost"