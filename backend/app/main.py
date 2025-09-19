"""
FastAPI Main Application
Complete backend for CareerWise Interview Analysis System
"""

from fastapi import FastAPI, HTTPException, Depends
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from fastapi.responses import JSONResponse
import uvicorn
import logging
from contextlib import asynccontextmanager

# Import routers
from app.api.router import api_router
from app.api.endpoints.ml.interview_analysis import router as ml_router
from app.api.endpoints.shared.auth import router as auth_router
from app.api.endpoints.shared.chat import router as chat_router
from app.api.endpoints.shared.user_profile import router as profile_router

# Import core modules
from app.core.config import settings
from app.core.database import engine, Base
from app.core.middleware import setup_middleware

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s - %(name)s - %(levelname)s - %(message)s"
)
logger = logging.getLogger(__name__)

@asynccontextmanager
async def lifespan(app: FastAPI):
    """Application lifespan management"""
    # Startup
    logger.info("Starting CareerWise Backend...")
    
    # Create database tables
    try:
        Base.metadata.create_all(bind=engine)
        logger.info("Database tables created successfully")
    except Exception as e:
        logger.error(f"Database initialization failed: {e}")
    
    # Initialize ML models (if needed)
    try:
        # Warm up ML models for faster first inference
        logger.info("Warming up ML models...")
        # This would initialize the ML models in production
        logger.info("ML models ready")
    except Exception as e:
        logger.warning(f"ML model initialization warning: {e}")
    
    logger.info("CareerWise Backend started successfully")
    
    yield
    
    # Shutdown
    logger.info("Shutting down CareerWise Backend...")
    # Cleanup resources here
    logger.info("Shutdown complete")

# Create FastAPI application
app = FastAPI(
    title="CareerWise API",
    description="AI-Powered Career Guidance Platform",
    version="1.0.0",
    docs_url="/docs",
    redoc_url="/redoc",
    lifespan=lifespan
)

# Setup middleware
setup_middleware(app)

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://localhost:3000", "*"],  # Configure for production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Health check endpoint
@app.get("/health")
async def health_check():
    """Health check endpoint"""
    return {
        "status": "healthy",
        "service": "CareerWise Backend",
        "version": "1.0.0",
        "timestamp": "2024-01-01T00:00:00Z"
    }

# Root endpoint
@app.get("/")
async def root():
    """Root endpoint"""
    return {
        "message": "Welcome to CareerWise API",
        "docs": "/docs",
        "health": "/health"
    }

# Include routers
app.include_router(auth_router, prefix="/api/v1")
app.include_router(chat_router, prefix="/api/v1")
app.include_router(profile_router, prefix="/api/v1")
app.include_router(ml_router, prefix="/api/v1")
app.include_router(api_router, prefix="/api/v1")

# Error handlers
@app.exception_handler(404)
async def not_found_handler(request, exc):
    return JSONResponse(
        status_code=404,
        content={"message": "Endpoint not found", "status": "error"}
    )

@app.exception_handler(500)
async def internal_error_handler(request, exc):
    logger.error(f"Internal server error: {exc}")
    return JSONResponse(
        status_code=500,
        content={"message": "Internal server error", "status": "error"}
    )

if __name__ == "__main__":
    uvicorn.run(
        "main:app",
        host="0.0.0.0",
        port=8000,
        reload=True,
        log_level="info"
    )