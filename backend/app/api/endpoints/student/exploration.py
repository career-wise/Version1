"""
Student Career Exploration Endpoints
"""

from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from typing import List, Optional
import logging

router = APIRouter()
logger = logging.getLogger(__name__)

class Career(BaseModel):
    id: int
    title: str
    category: str
    description: str
    salary: str
    growth: str
    education: str
    skills: List[str]
    trending: bool

class College(BaseModel):
    id: int
    name: str
    location: str
    type: str
    ranking: int
    acceptance: str
    tuition: str
    enrollment: str
    sat_range: str
    programs: List[str]

@router.get("/careers", response_model=List[Career])
async def get_careers(category: Optional[str] = None, search: Optional[str] = None):
    """Get career options"""
    careers = [
        Career(
            id=1,
            title="Software Developer",
            category="technology",
            description="Design and build computer programs and applications",
            salary="$70,000 - $120,000",
            growth="+22%",
            education="Bachelor's degree",
            skills=["Programming", "Problem Solving", "Teamwork"],
            trending=True
        ),
        Career(
            id=2,
            title="Registered Nurse",
            category="healthcare",
            description="Provide patient care and support in healthcare settings",
            salary="$60,000 - $85,000", 
            growth="+7%",
            education="Bachelor's degree in Nursing",
            skills=["Patient Care", "Communication", "Critical Thinking"],
            trending=False
        )
    ]
    
    # Filter by category if provided
    if category and category != "all":
        careers = [c for c in careers if c.category == category]
    
    # Filter by search if provided
    if search:
        careers = [c for c in careers if search.lower() in c.title.lower() or search.lower() in c.description.lower()]
    
    return careers

@router.get("/colleges", response_model=List[College])
async def get_colleges(search: Optional[str] = None):
    """Get college options"""
    colleges = [
        College(
            id=1,
            name="Stanford University",
            location="Stanford, CA",
            type="Private",
            ranking=6,
            acceptance="4%",
            tuition="$56,169",
            enrollment="17,249",
            sat_range="1470-1570",
            programs=["Computer Science", "Engineering", "Business", "Medicine"]
        ),
        College(
            id=2,
            name="University of California, Berkeley",
            location="Berkeley, CA",
            type="Public",
            ranking=22,
            acceptance="17%",
            tuition="$14,253 (in-state)",
            enrollment="45,057", 
            sat_range="1330-1530",
            programs=["Engineering", "Computer Science", "Business", "Liberal Arts"]
        )
    ]
    
    # Filter by search if provided
    if search:
        colleges = [c for c in colleges if search.lower() in c.name.lower()]
    
    return colleges

@router.get("/majors")
async def get_majors(category: Optional[str] = None):
    """Get academic majors"""
    majors = [
        {
            "name": "Computer Science",
            "category": "STEM",
            "description": "Study algorithms, programming, and computational systems",
            "average_salary": "$85,000",
            "job_growth": "+22%",
            "difficulty": "High",
            "careers": ["Software Engineer", "Data Scientist", "Product Manager"],
            "required_courses": ["Calculus", "Physics", "Statistics", "Programming"]
        },
        {
            "name": "Psychology",
            "category": "Social Sciences",
            "description": "Understand human behavior and mental processes",
            "average_salary": "$60,000",
            "job_growth": "+3%", 
            "difficulty": "Medium",
            "careers": ["Psychologist", "Counselor", "HR Specialist"],
            "required_courses": ["Statistics", "Biology", "Research Methods"]
        }
    ]
    
    if category:
        majors = [m for m in majors if m["category"] == category]
    
    return {"majors": majors}