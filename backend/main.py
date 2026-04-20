from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routes import members, leads, payments, auth, attendance
from scheduler import start_scheduler
import logging

# Set up logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# Create FastAPI app
app = FastAPI(title="Gym Management API", version="1.0")

# Enable CORS (allows frontend to connect)
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3000",
        "http://localhost:3001", 
        "http://localhost:3002",
        "http://localhost:3003",
        "http://localhost:3004",
        "http://localhost:3005",
        "http://localhost:3006",
        "http://localhost:3007",
        "http://localhost:3008",
        "http://localhost:3009",
        "http://127.0.0.1:3000",
        "http://127.0.0.1:3001",
        "http://127.0.0.1:3009",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include all routes
app.include_router(members.router, prefix="/api")
app.include_router(leads.router, prefix="/api")
app.include_router(payments.router, prefix="/api")
app.include_router(auth.router, prefix="/api")
app.include_router(attendance.router, prefix="/api")

# Root endpoint
@app.get("/")
def root():
    return {
        "message": "Welcome to Gym Management API",
        "docs": "/docs",
        "endpoints": [
            "/api/members",
            "/api/leads",
            "/api/payments",
            "/api/attendance",
            "/api/stats"
        ]
    }

# Test endpoint to check if API is working
@app.get("/api/test")
def test():
    return {"status": "API is working!", "cors": "enabled"}

# Start scheduler when app starts
@app.on_event("startup")
def startup_event():
    logger.info("🚀 Starting Gym Management System Backend...")
    try:
        start_scheduler()
        logger.info("✅ All systems ready!")
    except Exception as e:
        logger.error(f"Error starting scheduler: {e}")

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000, reload=True)