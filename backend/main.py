from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import os
import logging

# Set up logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# Create FastAPI app
app = FastAPI(title="Gym Management API", version="1.0")

# Enable CORS for all origins (for production)
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "https://gym-website.vercel.app",
        "https://gym-admin.vercel.app",
        "http://localhost:3000",
        "http://localhost:3001",
        "http://localhost:3002",
        "http://localhost:3003",
        "http://localhost:3008",
        "http://localhost:3009",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Import routes after app creation to avoid circular imports
try:
    from routes import members, leads, payments, auth, attendance
    
    # Include all routes
    app.include_router(members.router, prefix="/api")
    app.include_router(leads.router, prefix="/api")
    app.include_router(payments.router, prefix="/api")
    app.include_router(auth.router, prefix="/api")
    app.include_router(attendance.router, prefix="/api")
    logger.info("✅ Routes loaded successfully")
except Exception as e:
    logger.error(f"Error loading routes: {e}")

# Root endpoint
@app.get("/")
def root():
    return {
        "message": "Welcome to Gym Management API",
        "status": "running",
        "docs": "/docs",
        "endpoints": [
            "/api/members",
            "/api/leads",
            "/api/payments",
            "/api/attendance",
            "/api/stats"
        ]
    }

# Health check endpoint for Render
@app.get("/health")
def health_check():
    return {"status": "healthy"}

# Test endpoint to check if API is working
@app.get("/api/test")
def test():
    return {"status": "API is working!", "cors": "enabled"}

# Start scheduler when app starts (only if not in Render's build process)
if not os.environ.get('RENDER'):
    try:
        from scheduler import start_scheduler
        @app.on_event("startup")
        def startup_event():
            logger.info("🚀 Starting Gym Management System Backend...")
            start_scheduler()
            logger.info("✅ All systems ready!")
    except Exception as e:
        logger.error(f"Error starting scheduler: {e}")
else:
    logger.info("🚀 Starting Gym Management System Backend on Render...")

if __name__ == "__main__":
    import uvicorn
    port = int(os.environ.get("PORT", 8000))
    uvicorn.run(app, host="0.0.0.0", port=port)
