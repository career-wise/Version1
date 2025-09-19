"""
Authentication Endpoints
"""

from fastapi import APIRouter, HTTPException, Depends
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from pydantic import BaseModel, EmailStr
from typing import Optional
import jwt
import bcrypt
from datetime import datetime, timedelta
import logging

from app.core.config import settings

router = APIRouter()
security = HTTPBearer()
logger = logging.getLogger(__name__)

class SignUpRequest(BaseModel):
    email: EmailStr
    password: str
    full_name: str

class SignInRequest(BaseModel):
    email: EmailStr
    password: str

class AuthResponse(BaseModel):
    user: dict
    token: str
    message: str

class UserProfileUpdate(BaseModel):
    user_type: Optional[str] = None
    career_stage: Optional[str] = None
    experience_level: Optional[str] = None
    primary_goals: Optional[list] = None
    industry_interests: Optional[list] = None
    skills: Optional[list] = None
    linkedin_url: Optional[str] = None
    portfolio_url: Optional[str] = None
    bio: Optional[str] = None
    location: Optional[str] = None
    onboarding_completed: Optional[bool] = None

def create_access_token(data: dict) -> str:
    """Create JWT access token"""
    to_encode = data.copy()
    expire = datetime.utcnow() + timedelta(minutes=settings.ACCESS_TOKEN_EXPIRE_MINUTES)
    to_encode.update({"exp": expire})
    
    encoded_jwt = jwt.encode(to_encode, settings.SECRET_KEY, algorithm="HS256")
    return encoded_jwt

def verify_token(credentials: HTTPAuthorizationCredentials = Depends(security)) -> dict:
    """Verify JWT token"""
    try:
        payload = jwt.decode(credentials.credentials, settings.SECRET_KEY, algorithms=["HS256"])
        return payload
    except jwt.ExpiredSignatureError:
        raise HTTPException(status_code=401, detail="Token expired")
    except jwt.JWTError:
        raise HTTPException(status_code=401, detail="Invalid token")

@router.post("/signup", response_model=AuthResponse)
async def sign_up(request: SignUpRequest):
    """User registration"""
    try:
        # In production, this would interact with a real database
        # For now, return mock response
        
        user_data = {
            "id": f"user_{int(datetime.now().timestamp())}",
            "email": request.email,
            "full_name": request.full_name,
            "created_at": datetime.utcnow().isoformat(),
            "onboarding_completed": False
        }
        
        # Create token
        token = create_access_token({"sub": user_data["id"], "email": request.email})
        
        return AuthResponse(
            user=user_data,
            token=token,
            message="Account created successfully"
        )
        
    except Exception as e:
        logger.error(f"Sign up error: {e}")
        raise HTTPException(status_code=400, detail="Registration failed")

@router.post("/signin", response_model=AuthResponse)
async def sign_in(request: SignInRequest):
    """User authentication"""
    try:
        # In production, this would verify against database
        # For now, return mock response
        
        user_data = {
            "id": f"user_{int(datetime.now().timestamp())}",
            "email": request.email,
            "full_name": request.email.split('@')[0].title(),
            "created_at": datetime.utcnow().isoformat(),
            "onboarding_completed": False
        }
        
        # Create token
        token = create_access_token({"sub": user_data["id"], "email": request.email})
        
        return AuthResponse(
            user=user_data,
            token=token,
            message="Signed in successfully"
        )
        
    except Exception as e:
        logger.error(f"Sign in error: {e}")
        raise HTTPException(status_code=401, detail="Authentication failed")

@router.post("/signout")
async def sign_out(current_user: dict = Depends(verify_token)):
    """User sign out"""
    return {"message": "Signed out successfully"}

@router.get("/me")
async def get_current_user(current_user: dict = Depends(verify_token)):
    """Get current user profile"""
    return {
        "user": current_user,
        "status": "success"
    }

@router.put("/profile")
async def update_profile(
    profile_data: UserProfileUpdate,
    current_user: dict = Depends(verify_token)
):
    """Update user profile"""
    try:
        # In production, this would update the database
        updated_profile = {
            "id": current_user.get("sub"),
            "email": current_user.get("email"),
            **profile_data.dict(exclude_unset=True),
            "updated_at": datetime.utcnow().isoformat()
        }
        
        return {
            "profile": updated_profile,
            "message": "Profile updated successfully"
        }
        
    except Exception as e:
        logger.error(f"Profile update error: {e}")
        raise HTTPException(status_code=400, detail="Profile update failed")