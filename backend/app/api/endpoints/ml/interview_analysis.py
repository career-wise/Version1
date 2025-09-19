"""
ML Interview Analysis API Endpoints
RESTful API for real-time interview analysis and feedback
"""

from fastapi import APIRouter, WebSocket, WebSocketDisconnect, HTTPException, UploadFile, File
from fastapi.responses import JSONResponse
import asyncio
import json
import base64
import numpy as np
import cv2
from typing import Dict, List, Optional
import logging
from datetime import datetime
import time
import psutil
import json
import numpy as np

from app.ml.core.multimodal_analyzer import MultimodalAnalyzer
from app.core.database import get_db
from app.models.interview_session import InterviewSession
from app.schemas.ml_analysis import (
    SessionStartRequest, SessionStartResponse,
    AnalysisFrame, LiveFeedbackResponse,
    SessionReportResponse
)

router = APIRouter(prefix="/ml/interview", tags=["ML Interview Analysis"])
logger = logging.getLogger(__name__)

# Global analyzer instance (in production, would use dependency injection)
analyzer_config = {
    'analysis_interval': 1.0,
    'pose': {'model_complexity': 1},
    'face': {'max_num_faces': 1},
    'speech': {'sample_rate': 16000},
    'voice': {'sample_rate': 16000},
    'feedback': {
        'weights': {
            'body_language': 0.35,
            'vocal_delivery': 0.35,
            'content_quality': 0.30
        }
    }
}

# Store active sessions
active_sessions: Dict[str, MultimodalAnalyzer] = {}

@router.post("/session/start", response_model=SessionStartResponse)
async def start_interview_session(request: SessionStartRequest):
    """Start a new interview analysis session"""
    try:
        # Create new analyzer instance
        analyzer = MultimodalAnalyzer(analyzer_config)
        
        # Start session
        session_config = {
            'session_id': request.session_id,
            'interview_type': request.interview_type,
            'user_id': request.user_id
        }
        
        result = await analyzer.start_session(session_config)
        
        if result['status'] == 'success':
            # Store active session
            active_sessions[request.session_id] = analyzer
            
            # Save session to database
            # db_session = next(get_db())
            # interview_session = InterviewSession(
            #     session_id=request.session_id,
            #     user_id=request.user_id,
            #     interview_type=request.interview_type,
            #     status='active',
            #     started_at=datetime.utcnow()
            # )
            # db_session.add(interview_session)
            # db_session.commit()
            
            return SessionStartResponse(
                status="success",
                session_id=request.session_id,
                message="Interview session started successfully"
            )
        else:
            raise HTTPException(status_code=400, detail=result['message'])
            
    except Exception as e:
        logger.error(f"Error starting session: {e}")
        raise HTTPException(status_code=500, detail=str(e))

@router.websocket("/session/{session_id}/analyze")
async def websocket_analysis(websocket: WebSocket, session_id: str):
    """WebSocket endpoint for real-time analysis"""
    await websocket.accept()
    
    if session_id not in active_sessions:
        await websocket.close(code=4004, reason="Session not found")
        return
    
    analyzer = active_sessions[session_id]
    
    try:
        while True:
            # Receive frame data
            data = await websocket.receive_text()
            frame_data = json.loads(data)
            
            # Decode video frame
            video_data = base64.b64decode(frame_data['video'])
            video_array = np.frombuffer(video_data, dtype=np.uint8)
            video_frame = cv2.imdecode(video_array, cv2.IMREAD_COLOR)
            
            # Decode audio chunk
            audio_data = base64.b64decode(frame_data['audio'])
            audio_chunk = np.frombuffer(audio_data, dtype=np.float32)
            
            # Process frame
            feedback = await analyzer.process_frame(
                video_frame, audio_chunk, frame_data['timestamp']
            )
            
            # Send feedback if available
            if feedback:
                await websocket.send_text(json.dumps({
                    'type': 'live_feedback',
                    'data': feedback
                }))
                
    except WebSocketDisconnect:
        logger.info(f"WebSocket disconnected for session {session_id}")
    except Exception as e:
        logger.error(f"WebSocket error: {e}")
        await websocket.close(code=4000, reason=str(e))

@router.post("/session/{session_id}/end", response_model=SessionReportResponse)
async def end_interview_session(session_id: str):
    """End interview session and generate report"""
    try:
        if session_id not in active_sessions:
            raise HTTPException(status_code=404, detail="Session not found")
        
        analyzer = active_sessions[session_id]
        
        # End session and get report
        result = await analyzer.end_session()
        
        if result['status'] == 'success':
            report = result['report']
            
            # Clean up session
            analyzer.cleanup()
            del active_sessions[session_id]
            
            # Update database
            # db_session = next(get_db())
            # interview_session = db_session.query(InterviewSession).filter(
            #     InterviewSession.session_id == session_id
            # ).first()
            # 
            # if interview_session:
            #     interview_session.status = 'completed'
            #     interview_session.ended_at = datetime.utcnow()
            #     interview_session.analysis_report = report
            #     db_session.commit()
            
            return SessionReportResponse(
                status="success",
                session_id=session_id,
                report=report
            )
        else:
            raise HTTPException(status_code=500, detail=result['message'])
            
    except Exception as e:
        logger.error(f"Error ending session: {e}")
        raise HTTPException(status_code=500, detail=str(e))

@router.get("/session/{session_id}/metrics")
async def get_session_metrics(session_id: str):
    """Get current session performance metrics"""
    try:
        if session_id not in active_sessions:
            raise HTTPException(status_code=404, detail="Session not found")
        
        analyzer = active_sessions[session_id]
        metrics = analyzer.get_performance_metrics()
        
        return JSONResponse(content={
            'status': 'success',
            'session_id': session_id,
            'metrics': metrics
        })
        
    except Exception as e:
        logger.error(f"Error getting metrics: {e}")
        raise HTTPException(status_code=500, detail=str(e))

@router.post("/session/{session_id}/upload-frame")
async def upload_analysis_frame(
    session_id: str,
    video_file: UploadFile = File(...),
    audio_file: UploadFile = File(...),
    timestamp: float = 0
):
    """Upload individual frame for analysis (alternative to WebSocket)"""
    try:
        if session_id not in active_sessions:
            raise HTTPException(status_code=404, detail="Session not found")
        
        analyzer = active_sessions[session_id]
        
        # Read video frame
        video_data = await video_file.read()
        video_array = np.frombuffer(video_data, dtype=np.uint8)
        video_frame = cv2.imdecode(video_array, cv2.IMREAD_COLOR)
        
        # Read audio chunk
        audio_data = await audio_file.read()
        audio_chunk = np.frombuffer(audio_data, dtype=np.float32)
        
        # Process frame
        feedback = await analyzer.process_frame(video_frame, audio_chunk, timestamp)
        
        if feedback:
            return JSONResponse(content={
                'status': 'success',
                'feedback': feedback
            })
        else:
            return JSONResponse(content={
                'status': 'processing',
                'message': 'Frame received, analysis in progress'
            })
            
    except Exception as e:
        logger.error(f"Error processing frame: {e}")
        raise HTTPException(status_code=500, detail=str(e))

@router.get("/health")
async def health_check():
    """Health check endpoint for ML service"""
    try:
        # Check system resources
        cpu_usage = psutil.cpu_percent()
        memory_usage = psutil.virtual_memory().percent
        
        # Check active sessions
        active_session_count = len(active_sessions)
        
        return JSONResponse(content={
            'status': 'healthy',
            'timestamp': time.time(),
            'system_metrics': {
                'cpu_usage': cpu_usage,
                'memory_usage': memory_usage,
                'active_sessions': active_session_count
            },
            'service_info': {
                'version': '1.0.0',
                'capabilities': [
                    'pose_analysis',
                    'face_analysis', 
                    'speech_analysis',
                    'voice_analysis',
                    'real_time_feedback'
                ]
            }
        })
        
    except Exception as e:
        logger.error(f"Health check error: {e}")
        return JSONResponse(
            status_code=503,
            content={'status': 'unhealthy', 'error': str(e)}
        )

@router.delete("/session/{session_id}")
async def cleanup_session(session_id: str):
    """Cleanup and remove session"""
    try:
        if session_id in active_sessions:
            analyzer = active_sessions[session_id]
            analyzer.cleanup()
            del active_sessions[session_id]
        
        return JSONResponse(content={
            'status': 'success',
            'message': f'Session {session_id} cleaned up successfully'
        })
        
    except Exception as e:
        logger.error(f"Error cleaning up session: {e}")
        raise HTTPException(status_code=500, detail=str(e))

@router.get("/sessions/active")
async def get_active_sessions():
    """Get list of active analysis sessions"""
    try:
        sessions = []
        for session_id, analyzer in active_sessions.items():
            metrics = analyzer.get_performance_metrics()
            sessions.append({
                'session_id': session_id,
                'status': 'active',
                'performance_metrics': metrics
            })
        
        return JSONResponse(content={
            'status': 'success',
            'active_sessions': sessions,
            'total_count': len(sessions)
        })
        
    except Exception as e:
        logger.error(f"Error getting active sessions: {e}")
        raise HTTPException(status_code=500, detail=str(e))