"""
Graduate Interview Preparation Endpoints
"""

from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from typing import List, Optional, Dict
import logging

router = APIRouter()
logger = logging.getLogger(__name__)

class InterviewQuestion(BaseModel):
    id: str
    question: str
    category: str
    difficulty: str
    tips: List[str]
    sample_answer: Optional[str] = None

class MockInterviewSession(BaseModel):
    session_id: str
    questions: List[InterviewQuestion]
    duration_minutes: int
    feedback_enabled: bool

@router.get("/questions", response_model=List[InterviewQuestion])
async def get_interview_questions(
    category: Optional[str] = None,
    difficulty: Optional[str] = None,
    count: int = 10
):
    """Get interview questions for practice"""
    questions = [
        InterviewQuestion(
            id="grad_q1",
            question="Tell me about yourself and your background.",
            category="introduction",
            difficulty="easy",
            tips=[
                "Keep it professional and relevant",
                "Structure: past, present, future",
                "Connect to the role you're applying for"
            ],
            sample_answer="I'm a recent computer science graduate with a passion for software development..."
        ),
        InterviewQuestion(
            id="grad_q2",
            question="Describe a challenging project you worked on during your studies.",
            category="experience",
            difficulty="medium",
            tips=[
                "Use the STAR method",
                "Focus on your specific contributions",
                "Highlight problem-solving skills"
            ]
        ),
        InterviewQuestion(
            id="grad_q3",
            question="Where do you see yourself in 5 years?",
            category="career_goals",
            difficulty="medium",
            tips=[
                "Show ambition but be realistic",
                "Align with company growth opportunities",
                "Demonstrate commitment to learning"
            ]
        )
    ]
    
    # Filter by category and difficulty
    if category:
        questions = [q for q in questions if q.category == category]
    if difficulty:
        questions = [q for q in questions if q.difficulty == difficulty]
    
    return questions[:count]

@router.post("/mock-session/start")
async def start_mock_interview(session_config: dict):
    """Start mock interview session"""
    try:
        session_id = f"mock_{int(datetime.now().timestamp())}"
        
        # Get questions based on configuration
        questions = await get_interview_questions(
            category=session_config.get("category"),
            difficulty=session_config.get("difficulty", "medium"),
            count=session_config.get("question_count", 5)
        )
        
        return {
            "session_id": session_id,
            "questions": questions,
            "status": "started",
            "message": "Mock interview session started"
        }
        
    except Exception as e:
        logger.error(f"Mock interview start error: {e}")
        raise HTTPException(status_code=400, detail="Failed to start mock interview")

@router.post("/mock-session/{session_id}/submit")
async def submit_interview_responses(session_id: str, responses: List[dict]):
    """Submit interview responses for analysis"""
    try:
        # Mock interview analysis
        feedback = {
            "overall_score": 78,
            "category_scores": {
                "content": 80,
                "delivery": 75,
                "confidence": 82
            },
            "strengths": [
                "Clear communication",
                "Good use of examples",
                "Professional demeanor"
            ],
            "improvements": [
                "Add more specific metrics",
                "Improve eye contact",
                "Reduce filler words"
            ],
            "next_steps": [
                "Practice with STAR method",
                "Record yourself practicing",
                "Research company-specific questions"
            ]
        }
        
        return {
            "session_id": session_id,
            "feedback": feedback,
            "status": "completed"
        }
        
    except Exception as e:
        logger.error(f"Interview submission error: {e}")
        raise HTTPException(status_code=400, detail="Failed to analyze responses")

@router.get("/salary-negotiation")
async def get_salary_negotiation_guide():
    """Get salary negotiation guidance"""
    return {
        "guide": {
            "preparation_steps": [
                "Research market rates for your role",
                "Document your achievements and value",
                "Practice negotiation scenarios",
                "Prepare multiple negotiation points"
            ],
            "negotiation_tactics": [
                "Start with non-salary benefits",
                "Use data to support your request",
                "Be prepared to walk away",
                "Focus on mutual value"
            ],
            "common_mistakes": [
                "Not doing enough research",
                "Accepting the first offer",
                "Focusing only on salary",
                "Being too aggressive or passive"
            ]
        }
    }