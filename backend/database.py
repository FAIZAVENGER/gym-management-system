from pymongo import MongoClient
from dotenv import load_dotenv
import os
import logging

logger = logging.getLogger(__name__)

# Load environment variables
load_dotenv()

# Get MongoDB URI from environment
MONGO_URI = os.getenv("MONGO_URI")

if not MONGO_URI:
    logger.error("❌ MONGO_URI environment variable not set!")
    raise ValueError("MONGO_URI environment variable is required")

try:
    # Connect to MongoDB
    client = MongoClient(MONGO_URI)
    db = client["gymdb"]
    
    # Test connection
    client.admin.command('ping')
    logger.info("✅ Connected to MongoDB successfully!")
    
except Exception as e:
    logger.error(f"❌ Failed to connect to MongoDB: {e}")
    raise

# Collections
members_collection = db["members"]
leads_collection = db["leads"]
payments_collection = db["payments"]
users_collection = db["users"]
attendance_collection = db["attendance"]
