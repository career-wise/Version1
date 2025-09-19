"""
Graduate Job Search Endpoints
"""

from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from typing import List, Optional, Dict
import logging

router = APIRouter()
logger = logging.getLogger(__name__)

class JobListing(BaseModel):
    id: str
    title: str
    company: str
    location: str
    salary_range: Optional[str]
    experience_level: str
    job_type: str  # full-time, part-time, internship
    description: str
    requirements: List[str]
    posted_date: str
    application_deadline: Optional[str]

class ApplicationTracker(BaseModel):
    id: str
    job_title: str
    company: str
    status: str  # applied, interview, offer, rejected
    applied_date: str
    last_update: str
    notes: Optional[str]

@router.get("/jobs", response_model=List[JobListing])
async def search_jobs(
    keywords: Optional[str] = None,
    location: Optional[str] = None,
    experience_level: Optional[str] = None,
    job_type: Optional[str] = None
):
    """Search for job opportunities"""
    jobs = [
        JobListing(
            id="job_1",
            title="Software Engineer - New Grad",
            company="Tech Corp",
            location="San Francisco, CA",
            salary_range="$90,000 - $120,000",
            experience_level="entry",
            job_type="full-time",
            description="Join our engineering team to build scalable web applications",
            requirements=[
                "Bachelor's degree in Computer Science",
                "Proficiency in Python or Java",
                "Understanding of web technologies",
                "Strong problem-solving skills"
            ],
            posted_date="2024-01-10",
            application_deadline="2024-02-10"
        ),
        JobListing(
            id="job_2",
            title="Marketing Coordinator",
            company="Growth Marketing Inc",
            location="Remote",
            salary_range="$50,000 - $65,000",
            experience_level="entry",
            job_type="full-time",
            description="Support marketing campaigns and analyze performance metrics",
            requirements=[
                "Bachelor's degree in Marketing or related field",
                "Experience with social media platforms",
                "Basic analytics knowledge",
                "Excellent communication skills"
            ],
            posted_date="2024-01-12",
            application_deadline="2024-02-15"
        )
    ]
    
    # Apply filters
    if keywords:
        jobs = [j for j in jobs if keywords.lower() in j.title.lower() or keywords.lower() in j.description.lower()]
    if location:
        jobs = [j for j in jobs if location.lower() in j.location.lower()]
    if experience_level:
        jobs = [j for j in jobs if j.experience_level == experience_level]
    if job_type:
        jobs = [j for j in jobs if j.job_type == job_type]
    
    return jobs

@router.get("/applications", response_model=List[ApplicationTracker])
async def get_applications():
    """Get user's job applications"""
    return [
        ApplicationTracker(
            id="app_1",
            job_title="Software Engineer",
            company="Tech Corp",
            status="interview",
            applied_date="2024-01-05",
            last_update="2024-01-12",
            notes="Phone interview scheduled for next week"
        ),
        ApplicationTracker(
            id="app_2",
            job_title="Data Analyst",
            company="Data Solutions",
            status="applied",
            applied_date="2024-01-08",
            last_update="2024-01-08",
            notes="Application submitted via company website"
        )
    ]

@router.post("/applications")
async def track_application(application_data: dict):
    """Add new job application to tracker"""
    return {
        "application": {
            "id": f"app_{int(datetime.now().timestamp())}",
            **application_data,
            "created_at": "2024-01-15T10:00:00Z"
        },
        "message": "Application tracked successfully"
    }

@router.get("/market-analysis")
async def get_job_market_analysis(field: Optional[str] = None):
    """Get job market analysis"""
    return {
        "market_data": {
            "total_openings": 15420,
            "growth_rate": "+12%",
            "average_salary": "$75,000",
            "top_skills_demand": [
                {"skill": "Python", "demand": 85},
                {"skill": "Communication", "demand": 92},
                {"skill": "Problem Solving", "demand": 88}
            ],
            "hiring_trends": [
                "Remote work opportunities increasing",
                "Emphasis on soft skills",
                "Entry-level positions growing"
            ]
        }
    }