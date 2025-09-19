"""
Pydantic schemas for ML analysis API
"""

from pydantic import BaseModel, Field
from typing import Dict, List, Optional, Union
from datetime import datetime

class SessionStartRequest(BaseModel):
    """Request to start interview analysis session"""
    session_id: str = Field(..., description="Unique session identifier")
    user_id: str = Field(..., description="User identifier")
    interview_type: str = Field(..., description="Type of interview (college/job)")
    settings: Optional[Dict] = Field(default={}, description="Session settings")

class SessionStartResponse(BaseModel):
    """Response for session start"""
    status: str = Field(..., description="Status of the request")
    session_id: str = Field(..., description="Session identifier")
    message: str = Field(..., description="Status message")

class AnalysisFrame(BaseModel):
    """Single frame analysis data"""
    timestamp: float = Field(..., description="Frame timestamp")
    video_data: Optional[str] = Field(None, description="Base64 encoded video frame")
    audio_data: Optional[str] = Field(None, description="Base64 encoded audio chunk")

class LiveMetricsResponse(BaseModel):
    """Real-time metrics response"""
    timestamp: float
    eye_contact: float = Field(..., ge=0, le=100)
    posture: float = Field(..., ge=0, le=100)
    voice_clarity: float = Field(..., ge=0, le=100)
    speaking_pace: float = Field(..., description="Words per minute")
    confidence_level: float = Field(..., ge=0, le=100)

class LiveFeedbackResponse(BaseModel):
    """Real-time feedback response"""
    timestamp: float
    body_language_score: float = Field(..., ge=0, le=100)
    vocal_delivery_score: float = Field(..., ge=0, le=100)
    content_quality_score: float = Field(..., ge=0, le=100)
    overall_confidence: float = Field(..., ge=0, le=100)
    live_tips: List[str]
    metrics: Dict[str, float]

class ComponentScores(BaseModel):
    """Component-wise scores"""
    body_language: float = Field(..., ge=0, le=100)
    vocal_delivery: float = Field(..., ge=0, le=100)
    content_quality: float = Field(..., ge=0, le=100)
    confidence: float = Field(..., ge=0, le=100)
    engagement: float = Field(..., ge=0, le=100)

class PersonalizedFeedback(BaseModel):
    """Personalized feedback structure"""
    strengths: List[str]
    areas_for_improvement: List[str]
    specific_suggestions: List[str]
    next_steps: List[str]
    priority_focus: str

class WeeklyGoal(BaseModel):
    """Weekly improvement goal"""
    week: int
    goal: str
    target: str
    activities: List[str]

class Resource(BaseModel):
    """Recommended resource"""
    type: str = Field(..., description="Resource type (video, course, etc.)")
    title: str
    description: str
    duration: str

class ImprovementPlan(BaseModel):
    """Structured improvement plan"""
    timeline: str
    focus_area: str
    priority_component: str
    weekly_goals: List[WeeklyGoal]
    recommended_resources: List[Resource]
    success_metrics: Dict[str, Union[float, str]]

class SessionReport(BaseModel):
    """Comprehensive session analysis report"""
    overall_score: float = Field(..., ge=0, le=100)
    component_scores: ComponentScores
    detailed_metrics: Dict[str, float]
    personalized_feedback: PersonalizedFeedback
    improvement_plan: ImprovementPlan
    session_duration: float
    timestamp: float

class SessionReportResponse(BaseModel):
    """Response for session report"""
    status: str
    session_id: str
    report: SessionReport

class PerformanceMetrics(BaseModel):
    """System performance metrics"""
    cpu_usage: float
    memory_usage: float
    gpu_usage: float
    processing_latency: float
    throughput: float
    error_rate: float

class HealthCheckResponse(BaseModel):
    """Health check response"""
    status: str
    timestamp: float
    system_metrics: Dict[str, Union[float, int]]
    service_info: Dict[str, Union[str, List[str]]]

class ActiveSession(BaseModel):
    """Active session information"""
    session_id: str
    status: str
    performance_metrics: PerformanceMetrics

class ActiveSessionsResponse(BaseModel):
    """Response for active sessions"""
    status: str
    active_sessions: List[ActiveSession]
    total_count: int

# Error response schemas
class ErrorResponse(BaseModel):
    """Standard error response"""
    status: str = "error"
    message: str
    error_code: Optional[str] = None
    timestamp: float = Field(default_factory=lambda: datetime.utcnow().timestamp())

# WebSocket message schemas
class WebSocketMessage(BaseModel):
    """Base WebSocket message"""
    type: str
    timestamp: float = Field(default_factory=lambda: datetime.utcnow().timestamp())

class FrameMessage(WebSocketMessage):
    """Frame data message"""
    type: str = "frame"
    video: str = Field(..., description="Base64 encoded video frame")
    audio: str = Field(..., description="Base64 encoded audio chunk")
    timestamp: float

class FeedbackMessage(WebSocketMessage):
    """Feedback message"""
    type: str = "feedback"
    data: LiveFeedbackResponse

class TipMessage(WebSocketMessage):
    """Live tip message"""
    type: str = "tip"
    message: str
    category: str = Field(..., description="Tip category (body_language, vocal, content)")
    priority: str = Field(..., description="Tip priority (low, medium, high)")
    duration: int = Field(default=5000, description="Display duration in milliseconds")

class StatusMessage(WebSocketMessage):
    """Status update message"""
    type: str = "status"
    status: str
    message: str