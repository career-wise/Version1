import numpy as np
import cv2
from typing import Tuple, List, Dict
import logging

logger = logging.getLogger(__name__)

def preprocess_video_frame(frame: np.ndarray, target_size: Tuple[int, int] = (640, 480)) -> np.ndarray:
    """
    Preprocess video frame for ML analysis
    
    Args:
        frame: Input video frame
        target_size: Target size for resizing
        
    Returns:
        Preprocessed frame
    """
    try:
        # Resize frame
        resized = cv2.resize(frame, target_size)
        
        # Normalize pixel values
        normalized = resized.astype(np.float32) / 255.0
        
        return normalized
        
    except Exception as e:
        logger.error(f"Error preprocessing frame: {e}")
        return frame

def calculate_confidence_score(metrics: Dict[str, float]) -> float:
    """
    Calculate overall confidence score from individual metrics
    
    Args:
        metrics: Dictionary of individual metric scores
        
    Returns:
        Overall confidence score (0-100)
    """
    try:
        # Weight different metrics based on importance
        weights = {
            'eye_contact': 0.25,
            'posture': 0.20,
            'hand_gestures': 0.15,
            'facial_expressions': 0.20,
            'speech_clarity': 0.20
        }
        
        weighted_score = 0
        total_weight = 0
        
        for metric, score in metrics.items():
            if metric in weights:
                weighted_score += score * weights[metric]
                total_weight += weights[metric]
        
        if total_weight > 0:
            return weighted_score / total_weight
        else:
            return np.mean(list(metrics.values()))
            
    except Exception as e:
        logger.error(f"Error calculating confidence score: {e}")
        return 0

def generate_improvement_suggestions(scores: Dict[str, float]) -> List[str]:
    """
    Generate specific improvement suggestions based on scores
    
    Args:
        scores: Dictionary of metric scores
        
    Returns:
        List of improvement suggestions
    """
    suggestions = []
    
    # Define thresholds and suggestions
    improvement_map = {
        'eye_contact': {
            'threshold': 70,
            'suggestion': "Practice maintaining eye contact with the camera. Try placing a small arrow or dot near your camera lens as a reminder."
        },
        'posture': {
            'threshold': 75,
            'suggestion': "Work on your posture. Sit up straight, keep shoulders back, and lean slightly forward to show engagement."
        },
        'hand_gestures': {
            'threshold': 65,
            'suggestion': "Use more natural hand gestures. Practice explaining concepts while using your hands to emphasize points."
        },
        'facial_expressions': {
            'threshold': 70,
            'suggestion': "Show more facial expressions. Practice smiling naturally and reacting appropriately to questions."
        },
        'speech_clarity': {
            'threshold': 75,
            'suggestion': "Focus on speaking clearly. Practice articulation exercises and speak at a moderate pace."
        },
        'pace': {
            'threshold': 70,
            'suggestion': "Adjust your speaking pace. Aim for 150-160 words per minute for optimal comprehension."
        },
        'volume': {
            'threshold': 75,
            'suggestion': "Adjust your speaking volume. Ensure you're speaking loud enough to be clearly heard."
        },
        'filler_words': {
            'threshold': 70,
            'suggestion': "Reduce filler words. Practice pausing instead of saying 'um', 'uh', or 'like'."
        }
    }
    
    for metric, score in scores.items():
        if metric in improvement_map and score < improvement_map[metric]['threshold']:
            suggestions.append(improvement_map[metric]['suggestion'])
    
    return suggestions

def detect_speech_segments(audio: np.ndarray, sample_rate: int, 
                          frame_length: int = 2048, hop_length: int = 512) -> List[Tuple[float, float]]:
    """
    Detect speech segments in audio using energy-based voice activity detection
    
    Args:
        audio: Audio signal
        sample_rate: Sample rate of audio
        frame_length: Frame length for analysis
        hop_length: Hop length for analysis
        
    Returns:
        List of (start_time, end_time) tuples for speech segments
    """
    try:
        import librosa
        
        # Calculate RMS energy
        rms = librosa.feature.rms(y=audio, frame_length=frame_length, hop_length=hop_length)[0]
        
        # Calculate threshold
        threshold = np.mean(rms) * 0.3
        
        # Find speech frames
        speech_frames = rms > threshold
        
        # Convert frame indices to time
        times = librosa.frames_to_time(np.arange(len(speech_frames)), 
                                     sr=sample_rate, hop_length=hop_length)
        
        # Find continuous speech segments
        segments = []
        start_time = None
        
        for i, (time, is_speech) in enumerate(zip(times, speech_frames)):
            if is_speech and start_time is None:
                start_time = time
            elif not is_speech and start_time is not None:
                segments.append((start_time, time))
                start_time = None
        
        # Handle case where speech continues to end
        if start_time is not None:
            segments.append((start_time, times[-1]))
        
        return segments
        
    except Exception as e:
        logger.error(f"Error detecting speech segments: {e}")
        return []

def calculate_speaking_rate(text: str, duration: float) -> float:
    """
    Calculate speaking rate in words per minute
    
    Args:
        text: Transcribed text
        duration: Duration in seconds
        
    Returns:
        Speaking rate in words per minute
    """
    try:
        word_count = len(text.split())
        if duration > 0:
            return (word_count / duration) * 60
        return 0
        
    except Exception as e:
        logger.error(f"Error calculating speaking rate: {e}")
        return 0

def normalize_score(score: float, min_val: float = 0, max_val: float = 100) -> float:
    """
    Normalize score to 0-100 range
    
    Args:
        score: Input score
        min_val: Minimum value
        max_val: Maximum value
        
    Returns:
        Normalized score (0-100)
    """
    try:
        normalized = max(min_val, min(max_val, score))
        return normalized
        
    except Exception as e:
        logger.error(f"Error normalizing score: {e}")
        return 0