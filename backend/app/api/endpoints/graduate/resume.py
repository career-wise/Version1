"""
Graduate Resume Endpoints
"""

from fastapi import APIRouter, HTTPException, UploadFile, File
from pydantic import BaseModel
from typing import List, Optional, Dict
import logging

router = APIRouter()
logger = logging.getLogger(__name__)

class ResumeAnalysis(BaseModel):
    ats_score: int
    feedback: List[str]
    suggestions: List[str]
    keyword_analysis: Dict[str, int]
    sections_analysis: Dict[str, Dict]

@router.post("/analyze", response_model=ResumeAnalysis)
async def analyze_resume(file: UploadFile = File(...)):
    """Analyze resume for ATS optimization"""
    try:
        # Mock resume analysis
        # In production, this would use actual resume parsing and analysis
        
        return ResumeAnalysis(
            ats_score=78,
            feedback=[
                "Strong technical skills section",
                "Good use of action verbs",
                "Clear formatting and structure"
            ],
            suggestions=[
                "Add more quantifiable achievements",
                "Include relevant keywords for your target role",
                "Optimize for ATS scanning"
            ],
            keyword_analysis={
                "programming": 5,
                "leadership": 2,
                "teamwork": 3,
                "problem_solving": 4
            },
            sections_analysis={
                "contact_info": {"score": 90, "feedback": "Complete and professional"},
                "experience": {"score": 75, "feedback": "Add more metrics"},
                "education": {"score": 85, "feedback": "Well formatted"},
                "skills": {"score": 80, "feedback": "Good variety"}
            }
        )
        
    except Exception as e:
        logger.error(f"Resume analysis error: {e}")
        raise HTTPException(status_code=400, detail="Resume analysis failed")

@router.get("/templates")
async def get_resume_templates():
    """Get resume templates"""
    return {
        "templates": [
            {
                "id": "modern",
                "name": "Modern Professional",
                "description": "Clean, ATS-friendly design",
                "preview_url": "/templates/modern.png"
            },
            {
                "id": "creative",
                "name": "Creative Portfolio", 
                "description": "For design and creative roles",
                "preview_url": "/templates/creative.png"
            }
        ]
    }

@router.post("/optimize")
async def optimize_resume(resume_data: dict, target_role: str):
    """Optimize resume for specific role"""
    return {
        "optimized_resume": resume_data,
        "changes_made": [
            "Added relevant keywords",
            "Improved action verbs",
            "Enhanced quantifiable results"
        ],
        "ats_score_improvement": 15
    }