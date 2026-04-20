import requests
import os
from datetime import date, timedelta
from database import members_collection

def send_whatsapp(phone: str, message: str):
    """Send WhatsApp message using UltraMsg API"""
    # You can replace this with any WhatsApp API service
    # For now, we'll just print the message
    print(f"\n📱 WHATSAPP to {phone}: {message}\n")
    
    # Uncomment this when you get your UltraMsg token:
    """
    url = "https://api.ultramsg.com/YOUR_INSTANCE_ID/messages/chat"
    payload = {
        "token": os.getenv("ULTRAMSG_TOKEN"),
        "to": f"+91{phone}",
        "body": message
    }
    requests.post(url, data=payload)
    """

def check_expiring_memberships():
    """Check for memberships expiring tomorrow and send notifications"""
    tomorrow = (date.today() + timedelta(days=1)).strftime("%Y-%m-%d")
    
    expiring = members_collection.find({"end_date": tomorrow})
    
    for member in expiring:
        message = f"""🏋️‍♂️ GYM MEMBERSHIP REMINDER 🏋️‍♀️

Dear {member['name']},

Your gym membership EXPIRES TOMORROW!

📅 Expiry Date: {member['end_date']}
📋 Plan: {member['plan']}

To continue your fitness journey, please renew your membership today.

Visit us or contact: +91XXXXXXXXXX

Thank you for being part of our gym family! 💪"""
        
        send_whatsapp(member["phone"], message)
        print(f"✅ Notification sent to {member['name']}")

def check_pending_payments():
    """Check for members with overdue payments"""
    current_month = date.today().strftime("%B %Y")
    
    # This would check payments collection
    # For now, just a placeholder
    print(f"📊 Checking pending payments for {current_month}...")