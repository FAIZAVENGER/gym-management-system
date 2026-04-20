import schedule
import time
from notifications import check_expiring_memberships, check_pending_payments
from threading import Thread

def run_scheduler():
    """Run scheduled tasks in background"""
    
    # Schedule daily tasks at 9 AM
    schedule.every().day.at("09:00").do(check_expiring_memberships)
    schedule.every().day.at("10:00").do(check_pending_payments)
    
    print("⏰ Scheduler started! Running daily tasks at 9 AM and 10 AM")
    
    while True:
        schedule.run_pending()
        time.sleep(60)  # Check every minute

def start_scheduler():
    """Start scheduler in a separate thread"""
    scheduler_thread = Thread(target=run_scheduler, daemon=True)
    scheduler_thread.start()