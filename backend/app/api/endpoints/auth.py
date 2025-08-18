from fastapi import APIRouter, HTTPException, status, Depends
from fastapi.security import HTTPAuthorizationCredentials
from pydantic import BaseModel, EmailStr
from typing import Optional, List
from app.core.auth import get_supabase_client, security, get_current_user
from app.core.config import settings
import logging
import json

logger = logging.getLogger(__name__)

router = APIRouter()


class SignUpRequest(BaseModel):
    email: EmailStr
    password: str
    full_name: str


class SignInRequest(BaseModel):
    email: EmailStr
    password: str


class UserProfileUpdate(BaseModel):
    full_name: Optional[str] = None
    user_type: Optional[str] = None
    career_stage: Optional[str] = None
    experience_level: Optional[str] = None
    primary_goals: Optional[List[str]] = None
    industry_interests: Optional[List[str]] = None
    skills: Optional[List[str]] = None
    location: Optional[str] = None
    bio: Optional[str] = None
    linkedin_url: Optional[str] = None
    portfolio_url: Optional[str] = None
    onboarding_completed: Optional[bool] = None  # Add this field


class AuthResponse(BaseModel):
    access_token: str
    token_type: str = "bearer"
    user: dict


class UserResponse(BaseModel):
    id: str
    email: str
    full_name: Optional[str] = None
    user_type: Optional[str] = None
    career_stage: Optional[str] = None
    experience_level: Optional[str] = None
    primary_goals: Optional[List[str]] = None
    industry_interests: Optional[List[str]] = None
    skills: Optional[List[str]] = None
    location: Optional[str] = None
    bio: Optional[str] = None
    linkedin_url: Optional[str] = None
    portfolio_url: Optional[str] = None
    onboarding_completed: Optional[bool] = None
    created_at: Optional[str] = None
    updated_at: Optional[str] = None


def safe_parse_list(value) -> List[str]:
    """Safely parse a list value that might be a string or actual list"""
    if value is None:
        return []
    if isinstance(value, list):
        return value
    if isinstance(value, str):
        try:
            parsed = json.loads(value)
            return parsed if isinstance(parsed, list) else []
        except (json.JSONDecodeError, TypeError):
            return []
    return []


@router.post("/signup", response_model=AuthResponse)
async def sign_up(request: SignUpRequest):
    """Sign up a new user"""
    try:
        supabase = get_supabase_client()

        # Sign up user with Supabase Auth
        auth_response = supabase.auth.sign_up({
            "email": request.email,
            "password": request.password,
            "options": {
                "data": {
                    "full_name": request.full_name
                }
            }
        })

        if auth_response.user is None:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Failed to create user account"
            )

        # Create user profile in database matching your schema
        try:
            profile_data = {
                "user_id": auth_response.user.id,  # Note: user_id not id
                "full_name": request.full_name,
                "email": request.email,
                "user_type": "professional",  # Default value
                "career_stage": None,
                "experience_level": None,
                "primary_goals": [],
                "industry_interests": [],
                "skills": [],
                "location": None,
                "bio": None,
                "linkedin_url": None,
                "portfolio_url": None,
                "onboarding_completed": False
            }

            result = supabase.table("user_profiles").insert(profile_data).execute()
            logger.info(f"Created profile for user: {auth_response.user.email}")

        except Exception as profile_error:
            logger.error(f"Failed to create user profile: {profile_error}")
            # Don't fail the signup if profile creation fails
            # The user can complete their profile later

        return AuthResponse(
            access_token=auth_response.session.access_token if auth_response.session else "",
            user={
                "id": auth_response.user.id,
                "email": auth_response.user.email,
                "full_name": request.full_name,
                "onboarding_completed": False
            }
        )

    except Exception as e:
        logger.error(f"Sign up error: {e}")
        if "already registered" in str(e).lower():
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Email already registered"
            )
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=str(e)
        )


@router.post("/signin", response_model=AuthResponse)
async def sign_in(request: SignInRequest):
    """Sign in an existing user"""
    try:
        supabase = get_supabase_client()

        # Sign in with Supabase Auth
        auth_response = supabase.auth.sign_in_with_password({
            "email": request.email,
            "password": request.password
        })

        if auth_response.user is None or auth_response.session is None:
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Invalid email or password"
            )

        # Get user profile
        profile = {}
        try:
            profile_response = supabase.table("user_profiles").select("*").eq("user_id",
                                                                              auth_response.user.id).single().execute()
            profile = profile_response.data if profile_response.data else {}
            logger.info(f"Retrieved profile for user: {auth_response.user.email}")
        except Exception as e:
            logger.warning(f"Failed to get user profile: {e}")
            # Create profile if it doesn't exist
            try:
                profile_data = {
                    "user_id": auth_response.user.id,
                    "full_name": auth_response.user.user_metadata.get("full_name", ""),
                    "email": auth_response.user.email,
                    "user_type": "professional",
                    "onboarding_completed": False
                }
                supabase.table("user_profiles").insert(profile_data).execute()
                profile = profile_data
                logger.info(f"Created missing profile for user: {auth_response.user.email}")
            except Exception as create_error:
                logger.error(f"Failed to create profile: {create_error}")

        return AuthResponse(
            access_token=auth_response.session.access_token,
            user={
                "id": auth_response.user.id,
                "email": auth_response.user.email,
                "full_name": profile.get("full_name", ""),
                "user_type": profile.get("user_type"),
                "experience_level": profile.get("experience_level"),
                "onboarding_completed": profile.get("onboarding_completed", False)
            }
        )

    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Sign in error: {e}")
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid email or password"
        )


@router.post("/signout")
async def sign_out(credentials: HTTPAuthorizationCredentials = Depends(security)):
    """Sign out current user"""
    try:
        supabase = get_supabase_client()
        supabase.auth.sign_out()
        return {"message": "Successfully signed out"}

    except Exception as e:
        logger.error(f"Sign out error: {e}")
        return {"message": "Signed out locally"}  # Don't fail if server signout fails


@router.get("/me", response_model=UserResponse)
async def get_current_user_profile(current_user: dict = Depends(get_current_user)):
    """Get current user profile"""
    try:
        supabase = get_supabase_client()

        # Get user profile
        try:
            profile_response = supabase.table("user_profiles").select("*").eq("user_id",
                                                                              current_user["id"]).single().execute()
            profile = profile_response.data if profile_response.data else {}
            logger.info(f"Retrieved profile for user: {current_user['email']}")
        except Exception as e:
            logger.warning(f"Failed to get user profile: {e}")
            # Create profile if it doesn't exist
            try:
                profile_data = {
                    "user_id": current_user["id"],
                    "full_name": "",
                    "email": current_user["email"],
                    "user_type": "professional",
                    "onboarding_completed": False
                }
                result = supabase.table("user_profiles").insert(profile_data).execute()
                profile = profile_data
                logger.info(f"Created missing profile for user: {current_user['email']}")
            except Exception as create_error:
                logger.error(f"Failed to create profile: {create_error}")
                profile = {}

        # Safely parse list fields
        primary_goals = safe_parse_list(profile.get("primary_goals"))
        industry_interests = safe_parse_list(profile.get("industry_interests"))
        skills = safe_parse_list(profile.get("skills"))

        return UserResponse(
            id=current_user["id"],
            email=current_user["email"],
            full_name=profile.get("full_name", ""),
            user_type=profile.get("user_type"),
            career_stage=profile.get("career_stage"),
            experience_level=profile.get("experience_level"),
            primary_goals=primary_goals,
            industry_interests=industry_interests,
            skills=skills,
            location=profile.get("location"),
            bio=profile.get("bio"),
            linkedin_url=profile.get("linkedin_url"),
            portfolio_url=profile.get("portfolio_url"),
            onboarding_completed=profile.get("onboarding_completed", False),
            created_at=profile.get("created_at"),
            updated_at=profile.get("updated_at")
        )

    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Get user profile error: {e}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Failed to retrieve user profile"
        )


@router.put("/profile", response_model=UserResponse)
async def update_user_profile(
        profile_update: UserProfileUpdate,
        current_user: dict = Depends(get_current_user)
):
    """Update user profile"""
    try:
        supabase = get_supabase_client()

        # Prepare update data (only include non-None values)
        update_data = {}
        for field, value in profile_update.dict().items():
            if value is not None:
                update_data[field] = value

        if update_data:
            # Update user profile
            result = supabase.table("user_profiles").update(update_data).eq("user_id", current_user["id"]).execute()
            logger.info(f"Updated profile for user: {current_user['email']}")

        # Get updated profile
        profile_response = supabase.table("user_profiles").select("*").eq("user_id",
                                                                          current_user["id"]).single().execute()
        profile = profile_response.data if profile_response.data else {}

        # Safely parse list fields
        primary_goals = safe_parse_list(profile.get("primary_goals"))
        industry_interests = safe_parse_list(profile.get("industry_interests"))
        skills = safe_parse_list(profile.get("skills"))

        return UserResponse(
            id=current_user["id"],
            email=current_user["email"],
            full_name=profile.get("full_name", ""),
            user_type=profile.get("user_type"),
            career_stage=profile.get("career_stage"),
            experience_level=profile.get("experience_level"),
            primary_goals=primary_goals,
            industry_interests=industry_interests,
            skills=skills,
            location=profile.get("location"),
            bio=profile.get("bio"),
            linkedin_url=profile.get("linkedin_url"),
            portfolio_url=profile.get("portfolio_url"),
            onboarding_completed=profile.get("onboarding_completed", False),
            created_at=profile.get("created_at"),
            updated_at=profile.get("updated_at")
        )

    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Update profile error: {e}")
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Failed to update profile"
        )


@router.post("/refresh")
async def refresh_token(credentials: HTTPAuthorizationCredentials = Depends(security)):
    """Refresh access token"""
    try:
        supabase = get_supabase_client()

        # Get current session
        user_response = supabase.auth.get_user(credentials.credentials)
        if not user_response.user:
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Invalid token"
            )

        # Refresh session
        refresh_response = supabase.auth.refresh_session()

        if not refresh_response.session:
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Failed to refresh token"
            )

        return {
            "access_token": refresh_response.session.access_token,
            "token_type": "bearer"
        }

    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Refresh token error: {e}")
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Failed to refresh token"
        )