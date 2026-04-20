from fastapi import APIRouter, HTTPException
from database import users_collection
from models.user import User
from passlib.context import CryptContext
from jose import jwt
from datetime import datetime, timedelta
import os

router = APIRouter()
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")
SECRET_KEY = os.getenv("SECRET_KEY", "mysecretkey")

def hash_password(password: str):
    return pwd_context.hash(password)

def verify_password(plain_password, hashed_password):
    return pwd_context.verify(plain_password, hashed_password)

@router.post("/register")
def register(user: User):
    if users_collection.find_one({"email": user.email}):
        raise HTTPException(status_code=400, detail="Email already registered")
    
    hashed = hash_password(user.password)
    user_dict = user.dict()
    user_dict["password"] = hashed
    users_collection.insert_one(user_dict)
    return {"message": "User created successfully"}

@router.post("/login")
def login(email: str, password: str):
    user = users_collection.find_one({"email": email})
    if not user or not verify_password(password, user["password"]):
        raise HTTPException(status_code=401, detail="Invalid credentials")
    
    token = jwt.encode(
        {"sub": email, "exp": datetime.utcnow() + timedelta(hours=24)},
        SECRET_KEY
    )
    return {"access_token": token, "token_type": "bearer"}