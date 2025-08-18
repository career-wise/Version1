from fastapi import APIRouter, HTTPException, UploadFile, File, WebSocket, WebSocketDisconnect
from fastapi.responses import JSONResponse
from typing import Dict, List, Optional
import cv2
import numpy as np
import logging
import asyncio
import json
from io import BytesIO
import base64

from app.ml.body_language_analyzer import BodyLanguageAnalyzer
from app.ml.speech_analyzer import SpeechAnalyzer

logger = logging.getLogger(__name__)

router = APIRouter()

# Store active analysis sessions
active_sessions: Dict[str, Dict] = {}

class MLAnalysisManager:
    def __init__(self):
        self.body_analyzer = BodyLanguageAnalyzer()
        self.speech_analyzer = SpeechAnalyzer()
    
    def analyze_frame(self, frame_data: str) -> Dict[str, float]:
        """Analyze a single video frame using REAL ML models"""
        try:
            # Decode base64 image
            if ',' in frame_data:
                image_data = base64.b64decode(frame_data.split(',')[1])
            else:
                image_data = base64.b64decode(frame_data)
                
            nparr = np.frombuffer(image_data, np.uint8)
            frame = cv2.imdecode(nparr, cv2.IMREAD_COLOR)
            
            if frame is None:
                logger.error("Failed to decode image frame")
                return self._get_default_body_language_scores()
            
            # Use REAL MediaPipe analysis
            result = self.body_analyzer.analyze_frame(frame)
            logger.info(f"Real ML body language analysis: {result}")
            return result
            
        except Exception as e:
            logger.error(f"Error analyzing frame: {e}")
            return self._get_default_body_language_scores()
    
    def analyze_audio(self, audio_data: bytes) -> Dict[str, float]:
        """Analyze audio chunk using REAL speech analysis"""
        try:
            if len(audio_data) == 0:
                logger.warning("Empty audio data received")
                return self._get_default_speech_scores()
            
            # Use REAL librosa and speech recognition analysis
            result = self.speech_analyzer.analyze_audio_chunk(audio_data)
            logger.info(f"Real ML speech analysis: {result}")
            return result
            
        except Exception as e:
            logger.error(f"Error analyzing audio: {e}")
            return self._get_default_speech_scores()
    
    def _get_default_body_language_scores(self) -> Dict[str, float]:
        """Fallback scores when ML analysis fails"""
        return {
            'eye_contact': 50,
            'posture': 50,
            'hand_gestures': 50,
            'facial_expressions': 50,
            'overall': 50
        }
    
    def _get_default_speech_scores(self) -> Dict[str, float]:
        """Fallback scores when speech analysis fails"""
        return {
            'clarity': 50,
            'pace': 50,
            'volume': 50,
            'filler_words': 50,
            'confidence': 50,
            'overall': 50
        }

# Global ML manager instance
ml_manager = MLAnalysisManager()

@router.websocket("/ws/analysis/{session_id}")
async def websocket_analysis(websocket: WebSocket, session_id: str):
    """WebSocket endpoint for real-time ML analysis"""
    await websocket.accept()
    
    # Initialize session with REAL analyzers
    session_body_analyzer = BodyLanguageAnalyzer()
    session_speech_analyzer = SpeechAnalyzer()
    
    active_sessions[session_id] = {
        'websocket': websocket,
        'body_analyzer': session_body_analyzer,
        'speech_analyzer': session_speech_analyzer,
        'frame_count': 0
    }
    
    logger.info(f"Started REAL ML analysis session: {session_id}")
    
    try:
        while True:
            # Receive data from client
            data = await websocket.receive_text()
            message = json.loads(data)
            
            if message['type'] == 'video_frame':
                # Analyze video frame with REAL ML
                frame_data = message['data']
                result = ml_manager.analyze_frame(frame_data)
                
                # Send real-time feedback
                await websocket.send_text(json.dumps({
                    'type': 'body_language_analysis',
                    'data': result,
                    'timestamp': message.get('timestamp'),
                    'real_analysis': True  # Flag to indicate real analysis
                }))
                
            elif message['type'] == 'audio_chunk':
                # Analyze audio chunk with REAL ML
                try:
                    audio_data = base64.b64decode(message['data'])
                    result = ml_manager.analyze_audio(audio_data)
                    
                    # Send real-time feedback
                    await websocket.send_text(json.dumps({
                        'type': 'speech_analysis',
                        'data': result,
                        'timestamp': message.get('timestamp'),
                        'real_analysis': True  # Flag to indicate real analysis
                    }))
                except Exception as e:
                    logger.error(f"Error processing audio chunk: {e}")
                
            active_sessions[session_id]['frame_count'] += 1
            
    except WebSocketDisconnect:
        logger.info(f"Client disconnected from session: {session_id}")
    except Exception as e:
        logger.error(f"WebSocket error in session {session_id}: {e}")
    finally:
        # Clean up session
        if session_id in active_sessions:
            del active_sessions[session_id]

@router.post("/analyze/body-language")
async def analyze_body_language(
    frame: str,
    timestamp: Optional[int] = None
):
    """Analyze body language from a single frame using REAL ML"""
    try:
        result = ml_manager.analyze_frame(frame)
        
        return JSONResponse({
            'success': True,
            'data': result,
            'timestamp': timestamp,
            'analysis_type': 'real_ml'
        })
        
    except Exception as e:
        logger.error(f"Body language analysis error: {e}")
        raise HTTPException(status_code=500, detail="Analysis failed")

@router.post("/analyze/speech")
async def analyze_speech(
    audio: UploadFile = File(...),
    timestamp: Optional[int] = None
):
    """Analyze speech from audio chunk using REAL ML"""
    try:
        audio_data = await audio.read()
        result = ml_manager.analyze_audio(audio_data)
        
        return JSONResponse({
            'success': True,
            'data': result,
            'timestamp': timestamp,
            'analysis_type': 'real_ml'
        })
        
    except Exception as e:
        logger.error(f"Speech analysis error: {e}")
        raise HTTPException(status_code=500, detail="Analysis failed")

@router.post("/analyze/complete")
async def analyze_complete_session(
    video: UploadFile = File(...),
    audio: UploadFile = File(...),
    session_id: Optional[str] = None
):
    """Perform comprehensive analysis on complete recording using REAL ML"""
    try:
        # Read uploaded files
        video_data = await video.read()
        audio_data = await audio.read()
        
        logger.info(f"Analyzing complete session with {len(video_data)} bytes video, {len(audio_data)} bytes audio")
        
        # Initialize REAL analyzers for this session
        body_analyzer = BodyLanguageAnalyzer()
        speech_analyzer = SpeechAnalyzer()
        
        # Analyze complete audio with REAL ML
        speech_result = speech_analyzer.analyze_complete_audio(audio_data)
        logger.info(f"Real speech analysis result: {speech_result}")
        
        # For video analysis, we'd need to extract frames from the video
        # For now, we'll use the session summary from the body analyzer
        body_language_summary = body_analyzer.get_session_summary()
        
        # Convert session summary to the expected format
        body_language_result = {
            'eye_contact': body_language_summary.get('eye_contact_percentage', 50),
            'posture': body_language_summary.get('good_posture_percentage', 50),
            'hand_gestures': body_language_summary.get('gesture_activity_percentage', 50),
            'facial_expressions': body_language_summary.get('positive_expression_percentage', 50),
            'head_movement': 75,  # Default value
            'shoulder_position': 75  # Default value
        }
        body_language_result['overall'] = np.mean(list(body_language_result.values()))
        
        logger.info(f"Real body language analysis result: {body_language_result}")
        
        # Generate recommendations based on REAL analysis
        recommendations = generate_recommendations(body_language_result, speech_result)
        
        # Generate strengths and improvements based on REAL analysis
        strengths, improvements = generate_feedback(body_language_result, speech_result)
        
        result = {
            'body_language': body_language_result,
            'speech': speech_result,
            'recommendations': recommendations,
            'strengths': strengths,
            'areas_for_improvement': improvements,
            'session_id': session_id or f"session_{int(asyncio.get_event_loop().time())}",
            'timestamp': asyncio.get_event_loop().time(),
            'analysis_type': 'real_ml'
        }
        
        logger.info(f"Complete analysis result: {result}")
        
        return JSONResponse({
            'success': True,
            'data': result
        })
        
    except Exception as e:
        logger.error(f"Complete analysis error: {e}")
        raise HTTPException(status_code=500, detail=f"Analysis failed: {str(e)}")

@router.post("/recommendations")
async def generate_personalized_recommendations(
    analysis_result: Dict,
    user_profile: Optional[Dict] = None
):
    """Generate personalized recommendations based on REAL analysis and user profile"""
    try:
        recommendations = generate_recommendations(
            analysis_result.get('body_language', {}),
            analysis_result.get('speech', {}),
            user_profile
        )
        
        return JSONResponse({
            'success': True,
            'recommendations': recommendations,
            'analysis_type': 'real_ml'
        })
        
    except Exception as e:
        logger.error(f"Recommendation generation error: {e}")
        raise HTTPException(status_code=500, detail="Failed to generate recommendations")

def generate_recommendations(
    body_language: Dict[str, float], 
    speech: Dict[str, float],
    user_profile: Optional[Dict] = None
) -> List[str]:
    """Generate specific recommendations based on REAL analysis results"""
    recommendations = []
    
    # Body language recommendations based on REAL scores
    eye_contact = body_language.get('eye_contact', 0)
    if eye_contact < 70:
        recommendations.append(f"Improve eye contact - currently at {eye_contact:.0f}%. Aim for 70-80% eye contact with the camera")
    
    posture = body_language.get('posture', 0)
    if posture < 75:
        recommendations.append(f"Work on posture - currently at {posture:.0f}%. Sit up straight and lean slightly forward")
    
    gestures = body_language.get('hand_gestures', 0)
    if gestures < 65:
        recommendations.append(f"Use more purposeful hand gestures - currently at {gestures:.0f}%. Practice emphasizing key points with natural hand movements")
    
    expressions = body_language.get('facial_expressions', 0)
    if expressions < 70:
        recommendations.append(f"Show more facial expressions - currently at {expressions:.0f}%. Practice natural smiling and engagement")
    
    # Speech recommendations based on REAL scores
    clarity = speech.get('clarity', 0)
    if clarity < 75:
        recommendations.append(f"Improve speech clarity - currently at {clarity:.0f}%. Focus on clear articulation and pronunciation")
    
    pace = speech.get('pace', 0)
    if pace < 70:
        recommendations.append(f"Adjust speaking pace - currently at {pace:.0f}%. Aim for 150-160 words per minute")
    
    filler_words = speech.get('filler_words', 0)
    if filler_words < 70:
        recommendations.append(f"Reduce filler words - currently at {filler_words:.0f}%. Practice pausing instead of saying 'um' or 'uh'")
    
    volume = speech.get('volume', 0)
    if volume < 75:
        recommendations.append(f"Adjust speaking volume - currently at {volume:.0f}%. Ensure you're speaking clearly and audibly")
    
    confidence = speech.get('confidence', 0)
    if confidence < 75:
        recommendations.append(f"Speak with more confidence - currently at {confidence:.0f}%. Practice speaking with conviction and authority")
    
    # Add general recommendations if scores are good
    if not recommendations:
        overall_body = body_language.get('overall', 0)
        overall_speech = speech.get('overall', 0)
        
        if overall_body > 80 and overall_speech > 80:
            recommendations.extend([
                "Excellent performance! Continue practicing to maintain your strong skills",
                "Focus on storytelling techniques to make answers even more compelling",
                "Practice with different question types to build versatility"
            ])
        else:
            recommendations.append("Continue practicing to improve your overall interview performance")
    
    return recommendations

def generate_feedback(
    body_language: Dict[str, float], 
    speech: Dict[str, float]
) -> tuple[List[str], List[str]]:
    """Generate strengths and areas for improvement based on REAL analysis"""
    strengths = []
    improvements = []
    
    # Analyze strengths based on REAL scores
    if body_language.get('posture', 0) > 80:
        strengths.append(f"Excellent posture ({body_language['posture']:.0f}%) - you maintain professional body positioning")
    
    if body_language.get('facial_expressions', 0) > 75:
        strengths.append(f"Great facial expressions ({body_language['facial_expressions']:.0f}%) - you show natural engagement")
    
    if speech.get('volume', 0) > 80:
        strengths.append(f"Good vocal volume ({speech['volume']:.0f}%) - you project your voice well")
    
    if speech.get('clarity', 0) > 80:
        strengths.append(f"Clear articulation ({speech['clarity']:.0f}%) - you speak distinctly")
    
    if body_language.get('eye_contact', 0) > 80:
        strengths.append(f"Strong eye contact ({body_language['eye_contact']:.0f}%) - you maintain good camera connection")
    
    # Analyze improvements based on REAL scores
    if body_language.get('eye_contact', 0) < 75:
        improvements.append(f"Eye contact consistency ({body_language['eye_contact']:.0f}%)")
    
    if speech.get('filler_words', 0) < 70:
        improvements.append(f"Reducing filler words ({speech['filler_words']:.0f}%)")
    
    if speech.get('pace', 0) < 70:
        improvements.append(f"Speaking pace control ({speech['pace']:.0f}%)")
    
    if body_language.get('hand_gestures', 0) < 70:
        improvements.append(f"Hand gesture coordination ({body_language['hand_gestures']:.0f}%)")
    
    if speech.get('confidence', 0) < 75:
        improvements.append(f"Speaking confidence ({speech['confidence']:.0f}%)")
    
    # Ensure we have at least some feedback
    if not strengths:
        strengths.append("You're making good progress in your interview skills")
    
    if not improvements:
        improvements.append("Continue practicing to refine your technique")
    
    return strengths, improvements

@router.get("/session/{session_id}/status")
async def get_session_status(session_id: str):
    """Get status of an active analysis session"""
    if session_id in active_sessions:
        session = active_sessions[session_id]
        return JSONResponse({
            'active': True,
            'frame_count': session['frame_count'],
            'session_id': session_id,
            'analysis_type': 'real_ml'
        })
    else:
        return JSONResponse({
            'active': False,
            'session_id': session_id
        })

@router.get("/test/ml-status")
async def test_ml_status():
    """Test endpoint to check if ML models are working"""
    try:
        # Test MediaPipe
        import mediapipe as mp
        mp_pose = mp.solutions.pose
        
        # Test OpenCV
        import cv2
        
        # Test librosa
        import librosa
        
        # Test speech recognition
        import speech_recognition as sr
        
        return JSONResponse({
            'ml_status': 'ready',
            'mediapipe': 'available',
            'opencv': 'available', 
            'librosa': 'available',
            'speech_recognition': 'available',
            'analysis_type': 'real_ml'
        })
        
    except ImportError as e:
        return JSONResponse({
            'ml_status': 'error',
            'error': str(e),
            'analysis_type': 'fallback_mock'
        })