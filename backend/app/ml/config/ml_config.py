"""
ML System Configuration
Centralized configuration for all ML components
"""

import os
from typing import Dict, Any
from dataclasses import dataclass

@dataclass
class ModelConfig:
    """Configuration for individual ML models"""
    name: str
    version: str
    path: Optional[str] = None
    parameters: Dict[str, Any] = None
    performance_targets: Dict[str, float] = None

@dataclass
class SystemConfig:
    """Overall system configuration"""
    environment: str = "development"
    debug: bool = False
    max_concurrent_sessions: int = 10
    analysis_interval: float = 1.0
    enable_gpu: bool = True
    
class MLConfig:
    """Centralized ML configuration management"""
    
    def __init__(self):
        self.environment = os.getenv('ENVIRONMENT', 'development')
        self.debug = os.getenv('DEBUG', 'false').lower() == 'true'
        
    def get_pose_config(self) -> Dict:
        """Configuration for pose analysis"""
        return {
            'model_complexity': 1,  # 0=lite, 1=full, 2=heavy
            'min_detection_confidence': 0.7,
            'min_tracking_confidence': 0.5,
            'enable_segmentation': False,
            'smooth_landmarks': True,
            'calibration_frames': 10,
            'history_window': 30,
            'performance_targets': {
                'accuracy': 0.85,
                'latency_ms': 50,
                'fps': 30
            }
        }
    
    def get_face_config(self) -> Dict:
        """Configuration for face analysis"""
        return {
            'max_num_faces': 1,
            'refine_landmarks': True,
            'min_detection_confidence': 0.7,
            'min_tracking_confidence': 0.5,
            'calibration_frames': 15,
            'blink_threshold': 0.25,
            'gaze_sensitivity': 0.1,
            'performance_targets': {
                'accuracy': 0.88,
                'latency_ms': 40,
                'fps': 30
            }
        }
    
    def get_speech_config(self) -> Dict:
        """Configuration for speech analysis"""
        return {
            'sample_rate': 16000,
            'chunk_duration': 2.0,  # seconds
            'language': 'en-US',
            'enable_offline_fallback': True,
            'confidence_threshold': 0.6,
            'filler_words': [
                'um', 'uh', 'like', 'you know', 'so', 'actually',
                'basically', 'literally', 'right', 'okay', 'well'
            ],
            'performance_targets': {
                'transcription_accuracy': 0.90,
                'latency_ms': 200,
                'real_time_factor': 0.3
            }
        }
    
    def get_voice_config(self) -> Dict:
        """Configuration for voice analysis"""
        return {
            'sample_rate': 16000,
            'frame_length': 2048,
            'hop_length': 512,
            'pitch_range': (80, 400),  # Hz
            'energy_threshold': 0.001,
            'calibration_frames': 10,
            'smoothing_window': 5,
            'performance_targets': {
                'accuracy': 0.82,
                'latency_ms': 60,
                'fps': 20
            }
        }
    
    def get_feedback_config(self) -> Dict:
        """Configuration for feedback generation"""
        return {
            'weights': {
                'body_language': 0.35,
                'vocal_delivery': 0.35,
                'content_quality': 0.30
            },
            'thresholds': {
                'excellent': 85,
                'good': 70,
                'fair': 55,
                'needs_improvement': 40
            },
            'tip_frequency': 6.0,  # seconds between tips
            'max_live_tips': 3,
            'feedback_templates_path': 'app/ml/data/feedback_templates.json'
        }
    
    def get_system_config(self) -> SystemConfig:
        """Get overall system configuration"""
        return SystemConfig(
            environment=self.environment,
            debug=self.debug,
            max_concurrent_sessions=int(os.getenv('MAX_CONCURRENT_SESSIONS', '10')),
            analysis_interval=float(os.getenv('ANALYSIS_INTERVAL', '1.0')),
            enable_gpu=os.getenv('ENABLE_GPU', 'true').lower() == 'true'
        )
    
    def get_performance_config(self) -> Dict:
        """Configuration for performance monitoring"""
        return {
            'monitoring_interval': 1.0,  # seconds
            'metrics_window_size': 100,
            'alert_thresholds': {
                'cpu_usage': 80.0,
                'memory_usage': 85.0,
                'latency_ms': 200.0,
                'error_rate': 0.05
            },
            'optimization_targets': {
                'target_fps': 30,
                'target_latency_ms': 100,
                'target_accuracy': 0.85
            }
        }
    
    def get_deployment_config(self) -> Dict:
        """Configuration for deployment"""
        return {
            'model_serving': {
                'batch_size': 1,
                'max_batch_delay': 0.1,
                'model_cache_size': 3,
                'enable_model_warming': True
            },
            'scaling': {
                'min_replicas': 1,
                'max_replicas': 5,
                'target_cpu_utilization': 70,
                'scale_up_threshold': 80,
                'scale_down_threshold': 30
            },
            'resource_limits': {
                'cpu_cores': 4,
                'memory_gb': 8,
                'gpu_memory_gb': 4
            }
        }
    
    def validate_config(self) -> Dict[str, bool]:
        """Validate all configuration settings"""
        validation_results = {}
        
        try:
            # Validate pose config
            pose_config = self.get_pose_config()
            validation_results['pose'] = (
                0 <= pose_config['model_complexity'] <= 2 and
                0 < pose_config['min_detection_confidence'] <= 1
            )
            
            # Validate face config
            face_config = self.get_face_config()
            validation_results['face'] = (
                face_config['max_num_faces'] > 0 and
                0 < face_config['min_detection_confidence'] <= 1
            )
            
            # Validate speech config
            speech_config = self.get_speech_config()
            validation_results['speech'] = (
                speech_config['sample_rate'] > 0 and
                speech_config['chunk_duration'] > 0
            )
            
            # Validate voice config
            voice_config = self.get_voice_config()
            validation_results['voice'] = (
                voice_config['sample_rate'] > 0 and
                voice_config['frame_length'] > 0
            )
            
            # Validate feedback config
            feedback_config = self.get_feedback_config()
            weights = feedback_config['weights']
            validation_results['feedback'] = (
                abs(sum(weights.values()) - 1.0) < 0.01  # Weights should sum to 1
            )
            
        except Exception as e:
            validation_results['error'] = str(e)
        
        return validation_results

# Global configuration instance
ml_config = MLConfig()

# Export commonly used configurations
POSE_CONFIG = ml_config.get_pose_config()
FACE_CONFIG = ml_config.get_face_config()
SPEECH_CONFIG = ml_config.get_speech_config()
VOICE_CONFIG = ml_config.get_voice_config()
FEEDBACK_CONFIG = ml_config.get_feedback_config()
SYSTEM_CONFIG = ml_config.get_system_config()
PERFORMANCE_CONFIG = ml_config.get_performance_config()
DEPLOYMENT_CONFIG = ml_config.get_deployment_config()