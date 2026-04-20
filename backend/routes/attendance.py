from fastapi import APIRouter
from database import attendance_collection, members_collection
from datetime import date, datetime
from bson import ObjectId

router = APIRouter()

@router.post("/attendance/{member_id}")
def mark_attendance(member_id: str):
    today = date.today().strftime("%Y-%m-%d")
    
    # Check if already marked
    existing = attendance_collection.find_one({
        "member_id": member_id,
        "date": today
    })
    
    if existing:
        return {"message": "Attendance already marked for today"}
    
    attendance_collection.insert_one({
        "member_id": member_id,
        "date": today,
        "timestamp": datetime.now()
    })
    return {"message": "Attendance marked successfully"}

@router.get("/attendance/today")
def get_today_attendance():
    today = date.today().strftime("%Y-%m-%d")
    attendance = []
    
    for record in attendance_collection.find({"date": today}):
        member = members_collection.find_one({"_id": ObjectId(record["member_id"])})
        attendance.append({
            "member_id": record["member_id"],
            "name": member["name"] if member else "Unknown",
            "time": str(record["timestamp"])
        })
    
    return {
        "date": today,
        "count": len(attendance),
        "members": attendance
    }