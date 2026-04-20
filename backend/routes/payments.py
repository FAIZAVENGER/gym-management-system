from fastapi import APIRouter, HTTPException
from database import payments_collection, members_collection
from models.payment import Payment
from bson import ObjectId
from datetime import datetime

router = APIRouter()

def payment_helper(payment) -> dict:
    return {
        "id": str(payment["_id"]),
        "member_id": payment["member_id"],
        "amount": payment["amount"],
        "month": payment["month"],
        "status": payment["status"],
        "payment_date": str(payment["payment_date"]),
        "payment_method": payment["payment_method"]
    }

@router.get("/payments")
def get_all_payments():
    payments = []
    for payment in payments_collection.find().sort("payment_date", -1):
        payment_dict = payment_helper(payment)
        # Get member name
        member = members_collection.find_one({"_id": ObjectId(payment["member_id"])})
        payment_dict["member_name"] = member["name"] if member else "Unknown"
        payments.append(payment_dict)
    return payments

@router.post("/payments")
def add_payment(payment: Payment):
    payment_dict = payment.dict()
    result = payments_collection.insert_one(payment_dict)
    return {"message": "Payment recorded", "id": str(result.inserted_id)}

@router.get("/payments/pending")
def get_pending_payments():
    # Find members with no payment for current month
    current_month = datetime.now().strftime("%B %Y")
    members_with_payment = set()
    for payment in payments_collection.find({"month": current_month}):
        members_with_payment.add(payment["member_id"])
    
    pending = []
    for member in members_collection.find():
        if str(member["_id"]) not in members_with_payment and member["status"] == "active":
            pending.append({
                "member_id": str(member["_id"]),
                "name": member["name"],
                "phone": member["phone"],
                "plan": member["plan"],
                "fee": member.get("fee", 500)
            })
    return pending

@router.get("/payments/member/{member_id}")
def get_member_payments(member_id: str):
    payments = []
    for payment in payments_collection.find({"member_id": member_id}):
        payments.append(payment_helper(payment))
    return payments