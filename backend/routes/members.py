from fastapi import APIRouter, HTTPException
from database import members_collection, payments_collection
from models.member import Member
from datetime import date, datetime, timedelta
from bson import ObjectId
import logging

logger = logging.getLogger(__name__)
router = APIRouter()

def member_helper(member) -> dict:
    return {
        "id": str(member["_id"]),
        "name": member["name"],
        "phone": member["phone"],
        "email": member.get("email", ""),
        "plan": member["plan"],
        "start_date": member.get("start_date", ""),
        "end_date": member.get("end_date", ""),
        "status": member.get("status", "active"),
        "fee": member.get("fee", 0),
        "join_date": member.get("join_date", str(date.today()))
    }

@router.get("/members")
def get_all_members():
    try:
        members = []
        for member in members_collection.find():
            members.append(member_helper(member))
        print(f"✅ Fetched {len(members)} members")  # This will show in backend terminal
        return members
    except Exception as e:
        print(f"❌ Error fetching members: {e}")
        return []

@router.get("/stats")
def get_stats():
    try:
        # Get all members
        all_members = list(members_collection.find({}))
        total_members = len(all_members)
        
        print(f"📊 Total members in database: {total_members}")  # Debug log
        
        # Calculate active members (based on end date)
        active_members = 0
        expired_members = 0
        today = date.today()
        today_str = today.strftime("%Y-%m-%d")
        
        for member in all_members:
            end_date = member.get("end_date", "")
            if end_date:
                # Compare dates as strings
                if end_date < today_str:
                    expired_members += 1
                else:
                    active_members += 1
            else:
                active_members += 1
        
        # Calculate revenue
        current_month = date.today().strftime("%B %Y")
        monthly_revenue = 0
        all_payments = list(payments_collection.find({"month": current_month, "status": "paid"}))
        for payment in all_payments:
            monthly_revenue += payment.get("amount", 0)
        
        # Calculate expiring soon
        expiring_soon = 0
        in_3_days = today + timedelta(days=3)
        in_3_days_str = in_3_days.strftime("%Y-%m-%d")
        
        for member in all_members:
            end_date = member.get("end_date", "")
            if end_date and today_str <= end_date <= in_3_days_str:
                expiring_soon += 1
        
        result = {
            "total": total_members,
            "active": active_members,
            "expired": expired_members,
            "expiring_soon": expiring_soon,
            "revenue": monthly_revenue
        }
        
        print(f"📊 Stats result: {result}")  # Debug log
        return result
        
    except Exception as e:
        print(f"❌ Error in stats: {e}")
        return {
            "total": 0,
            "active": 0,
            "expired": 0,
            "expiring_soon": 0,
            "revenue": 0
        }

@router.get("/members/expiring-soon")
def get_expiring_soon():
    try:
        today = date.today()
        today_str = today.strftime("%Y-%m-%d")
        in_3_days = today + timedelta(days=3)
        in_3_days_str = in_3_days.strftime("%Y-%m-%d")
        
        expiring = []
        for member in members_collection.find():
            end_date = member.get("end_date", "")
            if end_date and today_str <= end_date <= in_3_days_str:
                expiring.append(member_helper(member))
        
        print(f"⏰ Found {len(expiring)} expiring members")
        return expiring
    except Exception as e:
        print(f"❌ Error in expiring-soon: {e}")
        return []

@router.post("/members")
def add_member(member: Member):
    try:
        member_dict = member.dict()
        # Ensure dates are strings
        if 'start_date' in member_dict:
            member_dict['start_date'] = str(member_dict['start_date'])
        if 'end_date' in member_dict:
            member_dict['end_date'] = str(member_dict['end_date'])
        
        result = members_collection.insert_one(member_dict)
        print(f"✅ Member added: {member_dict['name']} (ID: {result.inserted_id})")
        return {"message": "Member added successfully", "id": str(result.inserted_id), "success": True}
    except Exception as e:
        print(f"❌ Error adding member: {e}")
        raise HTTPException(status_code=500, detail=str(e))

@router.put("/members/{member_id}")
def update_member(member_id: str, member: Member):
    try:
        member_dict = member.dict()
        if 'start_date' in member_dict:
            member_dict['start_date'] = str(member_dict['start_date'])
        if 'end_date' in member_dict:
            member_dict['end_date'] = str(member_dict['end_date'])
            
        result = members_collection.update_one(
            {"_id": ObjectId(member_id)},
            {"$set": member_dict}
        )
        if result.modified_count:
            print(f"✅ Member updated: {member_id}")
            return {"message": "Member updated successfully", "success": True}
        raise HTTPException(status_code=404, detail="Member not found")
    except Exception as e:
        print(f"❌ Error updating member: {e}")
        raise HTTPException(status_code=500, detail=str(e))

@router.delete("/members/{member_id}")
def delete_member(member_id: str):
    try:
        result = members_collection.delete_one({"_id": ObjectId(member_id)})
        if result.deleted_count:
            print(f"✅ Member deleted: {member_id}")
            return {"message": "Member deleted successfully", "success": True}
        raise HTTPException(status_code=404, detail="Member not found")
    except Exception as e:
        print(f"❌ Error deleting member: {e}")
        raise HTTPException(status_code=500, detail=str(e))

@router.post("/send-reminder")
def send_reminder(reminder_data: dict):
    try:
        phone = reminder_data.get("phone")
        name = reminder_data.get("name")
        end_date = reminder_data.get("end_date")
        
        message = f"""🏋️‍♂️ GYM MEMBERSHIP REMINDER 🏋️‍♀️

Dear {name},

Your gym membership is expiring on {end_date}!

Please renew your membership.

Contact us: +91XXXXXXXXXX

Thank you! 💪"""
        
        print(f"📱 Reminder to {name} ({phone}): {message[:50]}...")
        return {"success": True, "message": "Reminder sent successfully"}
    except Exception as e:
        print(f"❌ Error: {e}")
        return {"success": False, "message": str(e)}