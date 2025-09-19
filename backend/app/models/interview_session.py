"""
Database models for interview sessions and analysis results
"""

from sqlalchemy import Column, Integer, String, DateTime, Text, Float, Boolean, JSON
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.sql import func
from datetime import datetime
from typing import Dict, Optional

Base = declarative_base()

class InterviewSession(Base):
    """Interview session model"""
    __tablename__ = "interview_sessions"
    
    id = Column(Integer, primary_key=True, index=True)
    session_id = Column(String(255), unique=True, index=True, nullable=False)
    user_id = Column(String(255), index=True, nullable=False)
    interview_type = Column(String(50), nullable=False)  # 'college' or 'job'
    status = Column(String(50), default='active')  # 'active', 'completed', 'error'
    
    # Timestamps
    started_at = Column(DateTime(timezone=True), server_default=func.now())
    ended_at = Column(DateTime(timezone=True), nullable=True)
    
    # Session configuration
    settings = Column(JSON, default={})
    
    # Analysis results
    analysis_report = Column(JSON, nullable=True)
    overall_score = Column(Float, nullable=True)
    body_language_score = Column(Float, nullable=True)
    vocal_delivery_score = Column(Float, nullable=True)
    content_quality_score = Column(Float, nullable=True)
    
    # Session metadata
    duration_seconds = Column(Float, nullable=True)
    questions_answered = Column(Integer, default=0)
    recording_enabled = Column(Boolean, default=False)
    
    # Performance metrics
    processing_latency = Column(Float, nullable=True)
    frames_processed = Column(Integer, default=0)
    
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())

class AnalysisResult(Base):
    """Individual analysis result for a frame"""
    __tablename__ = "analysis_results"
    
    id = Column(Integer, primary_key=True, index=True)
    session_id = Column(String(255), index=True, nullable=False)
    timestamp = Column(Float, nullable=False)
    
    # Component results
    pose_analysis = Column(JSON, nullable=True)
    face_analysis = Column(JSON, nullable=True)
    speech_analysis = Column(JSON, nullable=True)
    voice_analysis = Column(JSON, nullable=True)
    
    # Fused results
    live_feedback = Column(JSON, nullable=True)
    
    # Processing metadata
    processing_time_ms = Column(Float, nullable=True)
    
    created_at = Column(DateTime(timezone=True), server_default=func.now())

class UserProgress(Base):
    """User progress tracking across sessions"""
    __tablename__ = "user_progress"
    
    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(String(255), index=True, nullable=False)
    
    # Progress metrics
    total_sessions = Column(Integer, default=0)
    average_overall_score = Column(Float, nullable=True)
    average_body_language_score = Column(Float, nullable=True)
    average_vocal_delivery_score = Column(Float, nullable=True)
    average_content_quality_score = Column(Float, nullable=True)
    
    # Improvement tracking
    improvement_trend = Column(String(50), nullable=True)  # 'improving', 'stable', 'declining'
    last_session_date = Column(DateTime(timezone=True), nullable=True)
    streak_days = Column(Integer, default=0)
    
    # Goals and targets
    target_overall_score = Column(Float, default=85.0)
    priority_focus_area = Column(String(100), nullable=True)
    
    # Achievements
    achievements = Column(JSON, default=[])
    milestones_reached = Column(JSON, default=[])
    
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())

class FeedbackTemplate(Base):
    """Feedback templates for different scenarios"""
    __tablename__ = "feedback_templates"
    
    id = Column(Integer, primary_key=True, index=True)
    category = Column(String(100), nullable=False)  # 'body_language', 'vocal', 'content'
    score_range = Column(String(50), nullable=False)  # 'excellent', 'good', 'fair', 'poor'
    
    # Template content
    strengths_templates = Column(JSON, default=[])
    improvement_templates = Column(JSON, default=[])
    suggestion_templates = Column(JSON, default=[])
    
    # Metadata
    is_active = Column(Boolean, default=True)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())

class MLModelMetrics(Base):
    """ML model performance tracking"""
    __tablename__ = "ml_model_metrics"
    
    id = Column(Integer, primary_key=True, index=True)
    model_name = Column(String(100), nullable=False)
    model_version = Column(String(50), nullable=False)
    
    # Performance metrics
    accuracy = Column(Float, nullable=True)
    precision = Column(Float, nullable=True)
    recall = Column(Float, nullable=True)
    f1_score = Column(Float, nullable=True)
    
    # Latency metrics
    average_processing_time = Column(Float, nullable=True)
    p95_processing_time = Column(Float, nullable=True)
    
    # Usage metrics
    total_predictions = Column(Integer, default=0)
    error_count = Column(Integer, default=0)
    
    # Evaluation data
    evaluation_dataset = Column(String(255), nullable=True)
    evaluation_date = Column(DateTime(timezone=True), nullable=True)
    
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())