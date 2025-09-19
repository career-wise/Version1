"""
ML Model Server for Production Deployment
Optimized serving infrastructure for real-time interview analysis
"""

import asyncio
import logging
import time
from typing import Dict, List, Optional
import uvicorn
from fastapi import FastAPI, WebSocket, HTTPException
from fastapi.middleware.cors import CORSMiddleware
import redis
from contextlib import asynccontextmanager
import json
import numpy as np

from app.ml.core.multimodal_analyzer import MultimodalAnalyzer
from app.ml.config.ml_config import ml_config
from app.ml.utils.performance_monitor import PerformanceMonitor

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

class ModelServer:
    """
    Production ML model server with optimizations for real-time processing
    Handles model loading, caching, and efficient inference
    """
    
    def __init__(self):
        self.app = FastAPI(
            title="Interview Analysis ML Server",
            description="Real-time multimodal interview analysis",
            version="1.0.0",
            lifespan=self.lifespan
        )
        
        # Add CORS middleware
        self.app.add_middleware(
            CORSMiddleware,
            allow_origins=["*"],  # Configure appropriately for production
            allow_credentials=True,
            allow_methods=["*"],
            allow_headers=["*"],
        )
        
        # Initialize components
        self.analyzers = {}  # Session ID -> Analyzer mapping
        self.performance_monitor = PerformanceMonitor()
        self.redis_client = None
        
        # Model warming
        self.models_warmed = False
        
        # Setup routes
        self._setup_routes()
    
    @asynccontextmanager
    async def lifespan(self, app: FastAPI):
        """Application lifespan management"""
        # Startup
        logger.info("Starting ML Model Server...")
        
        # Initialize Redis for session management
        try:
            self.redis_client = redis.Redis(
                host='localhost', 
                port=6379, 
                decode_responses=True
            )
            await self.redis_client.ping()
            logger.info("Redis connection established")
        except Exception as e:
            logger.warning(f"Redis not available: {e}")
            self.redis_client = None
        
        # Warm up models
        await self._warm_up_models()
        
        # Start performance monitoring
        self.performance_monitor.start_monitoring()
        
        logger.info("ML Model Server started successfully")
        
        yield
        
        # Shutdown
        logger.info("Shutting down ML Model Server...")
        
        # Cleanup active sessions
        for session_id, analyzer in self.analyzers.items():
            analyzer.cleanup()
        
        # Stop monitoring
        self.performance_monitor.stop_monitoring()
        
        logger.info("ML Model Server shutdown complete")
    
    async def _warm_up_models(self):
        """Warm up ML models for faster first inference"""
        logger.info("Warming up ML models...")
        
        try:
            # Create dummy analyzer to load models
            config = {
                'pose': ml_config.get_pose_config(),
                'face': ml_config.get_face_config(),
                'speech': ml_config.get_speech_config(),
                'voice': ml_config.get_voice_config(),
                'feedback': ml_config.get_feedback_config()
            }
            
            dummy_analyzer = MultimodalAnalyzer(config)
            await dummy_analyzer._initialize_analyzers({})
            
            # Run dummy inference
            dummy_frame = np.zeros((480, 640, 3), dtype=np.uint8)
            dummy_audio = np.zeros(16000, dtype=np.float32)
            
            await dummy_analyzer.process_frame(dummy_frame, dummy_audio, time.time())
            
            # Cleanup
            dummy_analyzer.cleanup()
            
            self.models_warmed = True
            logger.info("Model warming completed successfully")
            
        except Exception as e:
            logger.error(f"Model warming failed: {e}")
            self.models_warmed = False
    
    def _setup_routes(self):
        """Setup API routes"""
        
        @self.app.get("/health")
        async def health_check():
            """Health check endpoint"""
            metrics = self.performance_monitor.get_metrics()
            
            return {
                "status": "healthy" if self.models_warmed else "warming",
                "timestamp": time.time(),
                "models_warmed": self.models_warmed,
                "active_sessions": len(self.analyzers),
                "performance_metrics": metrics.__dict__
            }
        
        @self.app.post("/session/{session_id}/start")
        async def start_session(session_id: str, config: Dict):
            """Start new analysis session"""
            try:
                if session_id in self.analyzers:
                    raise HTTPException(status_code=400, detail="Session already exists")
                
                # Create analyzer
                analyzer_config = {
                    'pose': ml_config.get_pose_config(),
                    'face': ml_config.get_face_config(),
                    'speech': ml_config.get_speech_config(),
                    'voice': ml_config.get_voice_config(),
                    'feedback': ml_config.get_feedback_config()
                }
                
                analyzer = MultimodalAnalyzer(analyzer_config)
                result = await analyzer.start_session(config)
                
                if result['status'] == 'success':
                    self.analyzers[session_id] = analyzer
                    
                    # Store session in Redis if available
                    if self.redis_client:
                        await self.redis_client.setex(
                            f"session:{session_id}",
                            3600,  # 1 hour expiry
                            json.dumps(config)
                        )
                    
                    return {"status": "success", "session_id": session_id}
                else:
                    raise HTTPException(status_code=400, detail=result['message'])
                    
            except Exception as e:
                logger.error(f"Error starting session {session_id}: {e}")
                raise HTTPException(status_code=500, detail=str(e))
        
        @self.app.websocket("/session/{session_id}/ws")
        async def websocket_endpoint(websocket: WebSocket, session_id: str):
            """WebSocket for real-time analysis"""
            await websocket.accept()
            
            if session_id not in self.analyzers:
                await websocket.close(code=4004, reason="Session not found")
                return
            
            analyzer = self.analyzers[session_id]
            
            try:
                while True:
                    # Receive frame data
                    data = await websocket.receive_json()
                    
                    # Decode and process frame
                    start_time = time.time()
                    
                    # Process frame (implementation depends on data format)
                    feedback = await self._process_websocket_frame(analyzer, data)
                    
                    # Record performance
                    end_time = time.time()
                    self.performance_monitor.record_processing_time(start_time, end_time)
                    
                    # Send feedback
                    if feedback:
                        await websocket.send_json({
                            "type": "feedback",
                            "data": feedback
                        })
                        
            except Exception as e:
                logger.error(f"WebSocket error for session {session_id}: {e}")
                await websocket.close(code=4000, reason=str(e))
        
        @self.app.post("/session/{session_id}/end")
        async def end_session(session_id: str):
            """End analysis session"""
            try:
                if session_id not in self.analyzers:
                    raise HTTPException(status_code=404, detail="Session not found")
                
                analyzer = self.analyzers[session_id]
                result = await analyzer.end_session()
                
                # Cleanup
                analyzer.cleanup()
                del self.analyzers[session_id]
                
                # Remove from Redis
                if self.redis_client:
                    await self.redis_client.delete(f"session:{session_id}")
                
                return result
                
            except Exception as e:
                logger.error(f"Error ending session {session_id}: {e}")
                raise HTTPException(status_code=500, detail=str(e))
        
        @self.app.get("/metrics")
        async def get_system_metrics():
            """Get system performance metrics"""
            return {
                "performance_metrics": self.performance_monitor.get_metrics().__dict__,
                "optimization_suggestions": self.performance_monitor.get_optimization_suggestions(),
                "active_sessions": len(self.analyzers),
                "models_status": "warmed" if self.models_warmed else "cold"
            }
    
    async def _process_websocket_frame(self, analyzer: MultimodalAnalyzer, data: Dict):
        """Process frame data from WebSocket"""
        try:
            # Extract frame data (format depends on frontend implementation)
            video_data = data.get('video')
            audio_data = data.get('audio')
            timestamp = data.get('timestamp', time.time())
            
            if not video_data or not audio_data:
                return None
            
            # Decode data (implementation depends on encoding format)
            # This is a placeholder - actual implementation would decode base64 or binary data
            video_frame = np.zeros((480, 640, 3), dtype=np.uint8)  # Placeholder
            audio_chunk = np.zeros(16000, dtype=np.float32)  # Placeholder
            
            # Process frame
            feedback = await analyzer.process_frame(video_frame, audio_chunk, timestamp)
            
            return feedback
            
        except Exception as e:
            logger.error(f"Error processing WebSocket frame: {e}")
            self.performance_monitor.record_error()
            return None
    
    def run(self, host: str = "0.0.0.0", port: int = 8001, workers: int = 1):
        """Run the model server"""
        uvicorn.run(
            self.app,
            host=host,
            port=port,
            workers=workers,
            log_level="info",
            access_log=True
        )

# Create server instance
model_server = ModelServer()

if __name__ == "__main__":
    # Run server
    model_server.run()