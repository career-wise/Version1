"""
Multimodal Interview Analysis System
Core orchestrator for real-time interview feedback
"""

import asyncio
import logging
import time
from typing import Dict, List, Optional, Tuple
import numpy as np
import cv2
from dataclasses import dataclass
from concurrent.futures import ThreadPoolExecutor

from .vision.pose_analyzer import PoseAnalyzer
from .vision.face_analyzer import FaceAnalyzer
from .audio.speech_analyzer import SpeechAnalyzer
from .audio.voice_analyzer import VoiceAnalyzer
from .fusion.feedback_generator import FeedbackGenerator
from .utils.performance_monitor import PerformanceMonitor

@dataclass
class AnalysisFrame:
    """Single frame of analysis data"""
    timestamp: float
    video_frame: Optional[np.ndarray] = None
    audio_chunk: Optional[np.ndarray] = None
    pose_data: Optional[Dict] = None
    face_data: Optional[Dict] = None
    speech_data: Optional[Dict] = None
    voice_data: Optional[Dict] = None

@dataclass
class LiveFeedback:
    """Real-time feedback structure"""
    timestamp: float
    body_language_score: float
    vocal_delivery_score: float
    content_quality_score: float
    overall_confidence: float
    live_tips: List[str]
    metrics: Dict[str, float]

class MultimodalAnalyzer:
    """
    Main orchestrator for real-time multimodal interview analysis
    Coordinates vision, audio, and NLP components for comprehensive feedback
    """
    
    def __init__(self, config: Dict):
        self.config = config
        self.logger = logging.getLogger(__name__)
        
        # Initialize analyzers
        self.pose_analyzer = PoseAnalyzer(config.get('pose', {}))
        self.face_analyzer = FaceAnalyzer(config.get('face', {}))
        self.speech_analyzer = SpeechAnalyzer(config.get('speech', {}))
        self.voice_analyzer = VoiceAnalyzer(config.get('voice', {}))
        self.feedback_generator = FeedbackGenerator(config.get('feedback', {}))
        
        # Performance monitoring
        self.performance_monitor = PerformanceMonitor()
        
        # Session state
        self.session_active = False
        self.session_data = []
        self.executor = ThreadPoolExecutor(max_workers=4)
        
        # Real-time buffers
        self.frame_buffer = []
        self.audio_buffer = []
        self.analysis_buffer = []
        
        # Timing controls
        self.last_analysis_time = 0
        self.analysis_interval = config.get('analysis_interval', 1.0)  # seconds
        
    async def start_session(self, session_config: Dict) -> Dict:
        """Initialize a new interview session"""
        try:
            self.session_active = True
            self.session_data = []
            self.frame_buffer = []
            self.audio_buffer = []
            self.analysis_buffer = []
            self.last_analysis_time = time.time()
            
            # Initialize all analyzers
            await self._initialize_analyzers(session_config)
            
            self.logger.info("Interview session started successfully")
            return {"status": "success", "session_id": session_config.get('session_id')}
            
        except Exception as e:
            self.logger.error(f"Failed to start session: {e}")
            return {"status": "error", "message": str(e)}
    
    async def process_frame(self, video_frame: np.ndarray, audio_chunk: np.ndarray, 
                          timestamp: float) -> Optional[LiveFeedback]:
        """Process a single frame of video and audio data"""
        if not self.session_active:
            return None
            
        try:
            # Add to buffers
            self.frame_buffer.append((timestamp, video_frame))
            self.audio_buffer.append((timestamp, audio_chunk))
            
            # Check if it's time for analysis
            current_time = time.time()
            if current_time - self.last_analysis_time >= self.analysis_interval:
                feedback = await self._analyze_accumulated_data()
                self.last_analysis_time = current_time
                return feedback
                
            return None
            
        except Exception as e:
            self.logger.error(f"Error processing frame: {e}")
            return None
    
    async def _analyze_accumulated_data(self) -> LiveFeedback:
        """Analyze accumulated frames and audio for feedback"""
        if not self.frame_buffer or not self.audio_buffer:
            return None
            
        # Get latest frame and audio
        latest_timestamp, latest_frame = self.frame_buffer[-1]
        audio_timestamps, audio_chunks = zip(*self.audio_buffer)
        combined_audio = np.concatenate(audio_chunks)
        
        # Run parallel analysis
        tasks = [
            self._analyze_pose(latest_frame),
            self._analyze_face(latest_frame),
            self._analyze_speech(combined_audio),
            self._analyze_voice(combined_audio)
        ]
        
        pose_result, face_result, speech_result, voice_result = await asyncio.gather(*tasks)
        
        # Create analysis frame
        analysis_frame = AnalysisFrame(
            timestamp=latest_timestamp,
            video_frame=latest_frame,
            audio_chunk=combined_audio,
            pose_data=pose_result,
            face_data=face_result,
            speech_data=speech_result,
            voice_data=voice_result
        )
        
        # Generate live feedback
        feedback = await self._generate_live_feedback(analysis_frame)
        
        # Store for session analysis
        self.analysis_buffer.append(analysis_frame)
        
        # Clear buffers (keep last few frames for context)
        self.frame_buffer = self.frame_buffer[-5:]
        self.audio_buffer = self.audio_buffer[-5:]
        
        return feedback
    
    async def _analyze_pose(self, frame: np.ndarray) -> Dict:
        """Analyze body pose and posture"""
        return await asyncio.get_event_loop().run_in_executor(
            self.executor, self.pose_analyzer.analyze, frame
        )
    
    async def _analyze_face(self, frame: np.ndarray) -> Dict:
        """Analyze facial expressions and eye contact"""
        return await asyncio.get_event_loop().run_in_executor(
            self.executor, self.face_analyzer.analyze, frame
        )
    
    async def _analyze_speech(self, audio: np.ndarray) -> Dict:
        """Analyze speech content and transcription"""
        return await asyncio.get_event_loop().run_in_executor(
            self.executor, self.speech_analyzer.analyze, audio
        )
    
    async def _analyze_voice(self, audio: np.ndarray) -> Dict:
        """Analyze voice characteristics"""
        return await asyncio.get_event_loop().run_in_executor(
            self.executor, self.voice_analyzer.analyze, audio
        )
    
    async def _generate_live_feedback(self, analysis_frame: AnalysisFrame) -> LiveFeedback:
        """Generate real-time feedback from analysis results"""
        return await asyncio.get_event_loop().run_in_executor(
            self.executor, self.feedback_generator.generate_live_feedback, analysis_frame
        )
    
    async def end_session(self) -> Dict:
        """End session and generate comprehensive report"""
        if not self.session_active:
            return {"status": "error", "message": "No active session"}
            
        try:
            self.session_active = False
            
            # Generate comprehensive report
            report = await self._generate_session_report()
            
            # Cleanup
            self.frame_buffer = []
            self.audio_buffer = []
            
            self.logger.info("Interview session ended successfully")
            return {"status": "success", "report": report}
            
        except Exception as e:
            self.logger.error(f"Error ending session: {e}")
            return {"status": "error", "message": str(e)}
    
    async def _generate_session_report(self) -> Dict:
        """Generate comprehensive session analysis report"""
        if not self.analysis_buffer:
            return {}
            
        # Aggregate all analysis data
        all_pose_data = [frame.pose_data for frame in self.analysis_buffer if frame.pose_data]
        all_face_data = [frame.face_data for frame in self.analysis_buffer if frame.face_data]
        all_speech_data = [frame.speech_data for frame in self.analysis_buffer if frame.speech_data]
        all_voice_data = [frame.voice_data for frame in self.analysis_buffer if frame.voice_data]
        
        # Generate comprehensive report
        report = await asyncio.get_event_loop().run_in_executor(
            self.executor,
            self.feedback_generator.generate_session_report,
            all_pose_data,
            all_face_data,
            all_speech_data,
            all_voice_data
        )
        
        return report
    
    async def _initialize_analyzers(self, session_config: Dict):
        """Initialize all analyzer components"""
        init_tasks = [
            self.pose_analyzer.initialize(),
            self.face_analyzer.initialize(),
            self.speech_analyzer.initialize(),
            self.voice_analyzer.initialize()
        ]
        
        await asyncio.gather(*init_tasks)
    
    def get_performance_metrics(self) -> Dict:
        """Get current performance metrics"""
        return self.performance_monitor.get_metrics()
    
    def cleanup(self):
        """Cleanup resources"""
        self.session_active = False
        if self.executor:
            self.executor.shutdown(wait=True)