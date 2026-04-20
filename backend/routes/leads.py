from fastapi import APIRouter
from database import leads_collection
from models.lead import Lead
from bson import ObjectId

router = APIRouter()

def lead_helper(lead) -> dict:
    return {
        "id": str(lead["_id"]),
        "name": lead["name"],
        "phone": lead["phone"],
        "goal": lead["goal"],
        "source": lead["source"],
        "created_at": str(lead["created_at"]),
        "status": lead["status"]
    }

@router.get("/leads")
def get_all_leads():
    leads = []
    for lead in leads_collection.find().sort("created_at", -1):
        leads.append(lead_helper(lead))
    return leads

@router.post("/leads")
def add_lead(lead: Lead):
    lead_dict = lead.dict()
    result = leads_collection.insert_one(lead_dict)
    return {"message": "Lead added successfully", "id": str(result.inserted_id)}

@router.put("/leads/{lead_id}/status")
def update_lead_status(lead_id: str, status: str):
    result = leads_collection.update_one(
        {"_id": ObjectId(lead_id)},
        {"$set": {"status": status}}
    )
    return {"message": "Lead status updated"}

@router.delete("/leads/{lead_id}")
def delete_lead(lead_id: str):
    leads_collection.delete_one({"_id": ObjectId(lead_id)})
    return {"message": "Lead deleted"}