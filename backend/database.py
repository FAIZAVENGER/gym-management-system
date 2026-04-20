from pymongo import MongoClient
from dotenv import load_dotenv
import os

load_dotenv()

# Connect to MongoDB
MONGO_URI = os.getenv("MONGO_URI")
client = MongoClient(MONGO_URI)
db = client["gymdb"]

# Collections
members_collection = db["members"]
leads_collection = db["leads"]
payments_collection = db["payments"]
users_collection = db["users"]
attendance_collection = db["attendance"]

print("✅ Connected to MongoDB!")