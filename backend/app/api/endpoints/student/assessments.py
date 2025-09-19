"""
Student Assessment Endpoints
"""

from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from typing import List, Dict, Optional
import logging

router = APIRouter()
logger = logging.getLogger(__name__)

class AssessmentQuestion(BaseModel):
    id: str
    question: str
    type: str  # multiple_choice, scale, text
    options: Optional[List[str]] = None
    category: str

class AssessmentResponse(BaseModel):
    question_id: str
    answer: str
    confidence: Optional[int] = None

class AssessmentResult(BaseModel):
    assessment_type: str
    score: int
    category_scores: Dict[str, int]
    recommendations: List[str]
    career_matches: List[str]

@router.get("/interest-assessment", response_model=List[AssessmentQuestion])
async def get_interest_assessment():
    """Get career interest assessment questions"""
    return [
        AssessmentQuestion(
            id="q1",
            question="How much do you enjoy working with technology?",
            type="scale",
            options=["1", "2", "3", "4", "5"],
            category="technology"
        ),
        AssessmentQuestion(
            id="q2",
            question="Do you prefer working alone or in teams?",
            type="multiple_choice",
            options=["Alone", "In small teams", "In large teams", "Both equally"],
            category="work_style"
        ),
        AssessmentQuestion(
            id="q3",
            question="What type of problems do you most enjoy solving?",
            type="multiple_choice",
            options=["Technical problems", "People problems", "Creative challenges", "Analytical puzzles"],
            category="problem_solving"
        )
    ]

@router.post("/interest-assessment/submit", response_model=AssessmentResult)
async def submit_interest_assessment(responses: List[AssessmentResponse]):
    """Submit interest assessment responses"""
    try:
        # Mock assessment scoring
        # In production, this would use actual scoring algorithms
        
        category_scores = {
            "technology": 85,
            "healthcare": 60,
            "business": 70,
            "creative": 45,
            "education": 55
        }
        
        career_matches = [
            "Software Developer",
            "Data Scientist", 
            "Product Manager",
            "UX Designer"
        ]
        
        recommendations = [
            "Consider exploring computer science programs",
            "Look into technology internships",
            "Develop programming skills",
            "Join coding communities"
        ]
        
        return AssessmentResult(
            assessment_type="interest",
            score=78,
            category_scores=category_scores,
            recommendations=recommendations,
            career_matches=career_matches
        )
        
    except Exception as e:
        logger.error(f"Assessment submission error: {e}")
        raise HTTPException(status_code=400, detail="Assessment submission failed")

@router.get("/personality-assessment")
async def get_personality_assessment():
    """Get personality assessment questions"""
    return {
        "questions": [
            {
                "id": "p1",
                "question": "I enjoy meeting new people",
                "type": "scale",
                "category": "extraversion"
            },
            {
                "id": "p2", 
                "question": "I prefer to plan things in advance",
                "type": "scale",
                "category": "conscientiousness"
            }
        ]
    }

@router.get("/skills-assessment")
async def get_skills_assessment():
    """Get skills assessment questions"""
    return {
        "questions": [
            {
                "id": "s1",
                "question": "Rate your programming ability",
                "type": "scale",
                "category": "technical"
            },
            {
                "id": "s2",
                "question": "How comfortable are you with public speaking?",
                "type": "scale", 
                "category": "communication"
            }
        ]
    }