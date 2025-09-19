"""
Main API Router
Combines all API endpoints
"""

from fastapi import APIRouter
from app.api.endpoints.shared import auth, chat, user_profile, notifications
from app.api.endpoints.student import academics, learning, planning, resources, assessments, exploration
from app.api.endpoints.graduate import resume, skills, interview, jobsearch, networking, finance, transition, relocation
from app.api.endpoints.professional import career, resume as prof_resume, skills as prof_skills, interview as prof_interview, analytics, networking as prof_networking, wellness, leadership, transition as prof_transition
from app.api.endpoints.entrepreneur import ideation, planning as ent_planning, funding, legal, skills as ent_skills, networking as ent_networking, learning as ent_learning, financial, operations

api_router = APIRouter()

# Shared endpoints
api_router.include_router(auth.router, prefix="/auth", tags=["Authentication"])
api_router.include_router(chat.router, prefix="/chat", tags=["AI Chat"])
api_router.include_router(user_profile.router, prefix="/profile", tags=["User Profile"])
api_router.include_router(notifications.router, prefix="/notifications", tags=["Notifications"])

# Student endpoints
api_router.include_router(academics.router, prefix="/student/academics", tags=["Student - Academics"])
api_router.include_router(learning.router, prefix="/student/learning", tags=["Student - Learning"])
api_router.include_router(planning.router, prefix="/student/planning", tags=["Student - Planning"])
api_router.include_router(resources.router, prefix="/student/resources", tags=["Student - Resources"])
api_router.include_router(assessments.router, prefix="/student/assessments", tags=["Student - Assessments"])
api_router.include_router(exploration.router, prefix="/student/exploration", tags=["Student - Exploration"])

# Graduate endpoints
api_router.include_router(resume.router, prefix="/graduate/resume", tags=["Graduate - Resume"])
api_router.include_router(skills.router, prefix="/graduate/skills", tags=["Graduate - Skills"])
api_router.include_router(interview.router, prefix="/graduate/interview", tags=["Graduate - Interview"])
api_router.include_router(jobsearch.router, prefix="/graduate/jobsearch", tags=["Graduate - Job Search"])

