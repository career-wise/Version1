"""
User Profile Management Endpoints
"""

from fastapi import APIRouter, HTTPException, Depends
from pydantic import BaseModel
from typing import Optional, List
import logging
from datetime import datetime

router = APIRouter()
logger = logging.getLogger(__name__)

class ProfileResponse(BaseModel):
    id: str
    full_name: str
    email: str
    user_type: Optional[str] = None
    career_stage: Optional[str] = None
    experience_level: Optional[str] = None
    primary_goals: Optional[List[str]] = None
    industry_interests: Optional[List[str]] = None
    skills: Optional[List[str]] = None
    linkedin_url: Optional[str] = None
    portfolio_url: Optional[str] = None
    bio: Optional[str] = None
    location: Optional[str] = None
    onboarding_completed: Optional[bool] = None

@router.get("/", response_model=ProfileResponse)
async def get_profile():
    """Get user profile"""
    # Mock profile data
    return ProfileResponse(
        id="demo_user_123",
        full_name="Demo Student",
        email="demo@example.com",
        user_type="student",
        career_stage="high_school",
        experience_level="beginner",
        primary_goals=["explore_careers", "college_prep"],
        industry_interests=["technology", "healthcare"],
        skills=["communication", "problem_solving"],
        onboarding_completed=True
    )

@router.put("/")
async def update_profile(profile_data: dict):
    """Update user profile"""
    try:
        # In production, this would update the database
        updated_profile = {
            **profile_data,
            "updated_at": datetime.utcnow().isoformat()
        }
        
        return {
            "profile": updated_profile,
            "message": "Profile updated successfully"
        }
        
    except Exception as e:
        logger.error(f"Profile update error: {e}")
        raise HTTPException(status_code=400, detail="Profile update failed")

@router.get("/progress")
async def get_user_progress():
    """Get user progress and achievements"""
    return {
        "progress": {
            "assessments_completed": 3,
            "career_paths_explored": 12,
            "study_hours_this_week": 24,
            "goals_achieved": 5,
            "level": 3,
            "experience_points": 1250,
            "streak_days": 7
        },
        "achievements": [
            {
                "id": "first_assessment",
                "title": "First Assessment Complete",
                "description": "Completed your first career assessment",
                "earned_date": "2024-01-10T10:00:00Z",
                "icon": "🎯"
            },
            {
                "id": "week_streak",
                "title": "Week Streak",
                "description": "Used the platform for 7 consecutive days",
                "earned_date": "2024-01-15T09:00:00Z", 
                "icon": "🔥"
            }
        ]
    }