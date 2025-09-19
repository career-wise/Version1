"""
AI Chat Endpoints
"""

from fastapi import APIRouter, HTTPException, Depends
from pydantic import BaseModel
from typing import List, Optional
import logging
from datetime import datetime

router = APIRouter()
logger = logging.getLogger(__name__)

class ChatMessage(BaseModel):
    content: str
    role: str = "user"  # user or assistant

class ChatRequest(BaseModel):
    message: str
    conversation_id: Optional[str] = None
    context: Optional[dict] = None

class ChatResponse(BaseModel):
    message: str
    conversation_id: str
    timestamp: str
    suggestions: Optional[List[str]] = None

@router.post("/send", response_model=ChatResponse)
async def send_message(request: ChatRequest):
    """Send message to AI chat"""
    try:
        # In production, this would integrate with actual AI service
        # For now, return intelligent mock responses
        
        conversation_id = request.conversation_id or f"conv_{int(datetime.now().timestamp())}"
        
        # Generate contextual response based on message content
        message_lower = request.message.lower()
        
        if any(word in message_lower for word in ["interview", "practice", "preparation"]):
            response_message = """I can help you prepare for interviews! Here are some ways I can assist:

1. **Interview Practice**: I can simulate real interview scenarios with personalized questions
2. **Answer Strategies**: Learn the STAR method and other effective response techniques  
3. **Body Language Tips**: Improve your non-verbal communication
4. **Industry-Specific Prep**: Tailored questions for your field of interest

Would you like to start with a practice interview session, or do you have specific questions about interview preparation?"""
            
            suggestions = [
                "Start a practice interview",
                "Learn about the STAR method",
                "Get body language tips",
                "Practice common questions"
            ]
            
        elif any(word in message_lower for word in ["career", "job", "profession"]):
            response_message = """I'm here to help with your career journey! I can assist with:

1. **Career Exploration**: Discover careers that match your interests and skills
2. **Skill Development**: Identify skills to develop for your target career
3. **Education Planning**: Find the right educational path
4. **Goal Setting**: Create actionable career goals

What aspect of your career would you like to explore first?"""
            
            suggestions = [
                "Explore career options",
                "Assess my skills",
                "Plan my education",
                "Set career goals"
            ]
            
        elif any(word in message_lower for word in ["college", "university", "education"]):
            response_message = """I can help you navigate your educational journey! Here's how:

1. **College Selection**: Find colleges that match your goals and preferences
2. **Major Exploration**: Discover academic programs aligned with your interests
3. **Application Strategy**: Plan your college application timeline
4. **Scholarship Search**: Find funding opportunities

What would you like to know about your educational path?"""
            
            suggestions = [
                "Find colleges for me",
                "Explore majors",
                "Application timeline",
                "Scholarship opportunities"
            ]
            
        else:
            response_message = """Hello! I'm your AI career assistant. I'm here to help you with:

• **Career Exploration** - Discover exciting career paths
• **Interview Preparation** - Practice with AI-powered coaching
• **Skill Development** - Build in-demand skills
• **Educational Planning** - Plan your academic journey
• **Goal Setting** - Create and track career goals

What would you like to explore today?"""
            
            suggestions = [
                "Explore careers",
                "Practice interviews", 
                "Develop skills",
                "Plan education"
            ]
        
        return ChatResponse(
            message=response_message,
            conversation_id=conversation_id,
            timestamp=datetime.utcnow().isoformat(),
            suggestions=suggestions
        )
        
    except Exception as e:
        logger.error(f"Chat error: {e}")
        raise HTTPException(status_code=500, detail="Chat service error")

@router.get("/conversations")
async def get_conversations():
    """Get user's chat conversations"""
    # Mock conversations for demo
    return {
        "conversations": [
            {
                "id": "conv_1",
                "title": "Career Exploration",
                "last_message": "What careers match my interests?",
                "timestamp": "2024-01-15T10:30:00Z"
            },
            {
                "id": "conv_2", 
                "title": "Interview Preparation",
                "last_message": "How can I improve my interview skills?",
                "timestamp": "2024-01-14T15:45:00Z"
            }
        ]
    }

@router.get("/conversation/{conversation_id}")
async def get_conversation(conversation_id: str):
    """Get specific conversation history"""
    # Mock conversation history
    return {
        "conversation": {
            "id": conversation_id,
            "messages": [
                {
                    "role": "user",
                    "content": "How can I prepare for interviews?",
                    "timestamp": "2024-01-15T10:30:00Z"
                },
                {
                    "role": "assistant", 
                    "content": "I can help you prepare for interviews with personalized practice sessions...",
                    "timestamp": "2024-01-15T10:30:15Z"
                }
            ]
        }
    }