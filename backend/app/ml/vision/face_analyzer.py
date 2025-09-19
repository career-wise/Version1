"""
Facial Expression and Eye Contact Analysis Component
Uses MediaPipe Face Mesh for detailed facial analysis
"""

import cv2
import numpy as np
import mediapipe as mp
from typing import Dict, List, Optional, Tuple
import math
import time
from dataclasses import dataclass

@dataclass
class EyeContactMetrics:
    """Eye contact analysis metrics"""
    gaze_direction: Tuple[float, float]  # (x, y) gaze vector
    eye_contact_score: float             # 0-100
    blink_rate: float                    # blinks per minute
    eye_openness: float                  # 0-100

@dataclass
class ExpressionMetrics:
    """Facial expression analysis metrics"""
    smile_intensity: float      # 0-100
    engagement_level: float     # 0-100
    confidence_level: float     # 0-100
    expression_variety: float   # 0-100

class FaceAnalyzer:
    """
    Real-time facial expression and eye contact analysis
    Provides feedback on professional presentation and engagement
    """
    
    def __init__(self, config: Dict):
        self.config = config
        
        # Initialize MediaPipe Face Mesh
        self.mp_face_mesh = mp.solutions.face_mesh
        self.face_mesh = self.mp_face_mesh.FaceMesh(
            static_image_mode=False,
            max_num_faces=1,
            refine_landmarks=True,
            min_detection_confidence=0.7,
            min_tracking_confidence=0.5
        )
        
        # Face landmarks indices for specific features
        self.eye_landmarks = {
            'left_eye': [33, 7, 163, 144, 145, 153, 154, 155, 133, 173, 157, 158, 159, 160, 161, 246],
            'right_eye': [362, 382, 381, 380, 374, 373, 390, 249, 263, 466, 388, 387, 386, 385, 384, 398]
        }
        
        self.mouth_landmarks = [61, 84, 17, 314, 405, 320, 307, 375, 321, 308, 324, 318]
        
        # Historical data
        self.face_history = []
        self.max_history = 30
        self.blink_history = []
        
        # Calibration
        self.baseline_gaze = None
        self.calibration_frames = 0
        self.calibration_required = 15
        
    async def initialize(self):
        """Initialize the face analyzer"""
        self.face_history = []
        self.blink_history = []
        self.baseline_gaze = None
        self.calibration_frames = 0
    
    def analyze(self, frame: np.ndarray) -> Dict:
        """
        Analyze facial expressions and eye contact
        
        Args:
            frame: RGB video frame
            
        Returns:
            Dictionary containing face analysis results
        """
        try:
            # Convert BGR to RGB for MediaPipe
            rgb_frame = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)
            
            # Process face
            results = self.face_mesh.process(rgb_frame)
            
            if not results.multi_face_landmarks:
                return self._create_empty_result()
            
            # Get first face (assuming single person)
            face_landmarks = results.multi_face_landmarks[0]
            
            # Extract key landmarks
            landmarks = self._extract_face_landmarks(face_landmarks, frame.shape)
            
            # Calibrate baseline if needed
            if self.calibration_frames < self.calibration_required:
                self._calibrate_baseline(landmarks)
                return self._create_calibration_result()
            
            # Analyze eye contact
            eye_contact_metrics = self._analyze_eye_contact(landmarks)
            
            # Analyze expressions
            expression_metrics = self._analyze_expressions(landmarks)
            
            # Update history
            self._update_history(landmarks, eye_contact_metrics, expression_metrics)
            
            # Generate feedback
            feedback = self._generate_face_feedback(eye_contact_metrics, expression_metrics)
            
            return {
                'status': 'success',
                'eye_contact_metrics': eye_contact_metrics.__dict__,
                'expression_metrics': expression_metrics.__dict__,
                'feedback': feedback,
                'timestamp': time.time()
            }
            
        except Exception as e:
            return {'status': 'error', 'message': str(e)}
    
    def _extract_face_landmarks(self, face_landmarks, frame_shape) -> Dict:
        """Extract key facial landmarks"""
        h, w = frame_shape[:2]
        landmarks = {}
        
        # Extract eye landmarks
        for eye_name, indices in self.eye_landmarks.items():
            eye_points = []
            for idx in indices:
                landmark = face_landmarks.landmark[idx]
                eye_points.append((landmark.x * w, landmark.y * h, landmark.z))
            landmarks[eye_name] = eye_points
        
        # Extract mouth landmarks
        mouth_points = []
        for idx in self.mouth_landmarks:
            landmark = face_landmarks.landmark[idx]
            mouth_points.append((landmark.x * w, landmark.y * h, landmark.z))
        landmarks['mouth'] = mouth_points
        
        # Extract key reference points
        nose_tip = face_landmarks.landmark[1]
        landmarks['nose_tip'] = (nose_tip.x * w, nose_tip.y * h, nose_tip.z)
        
        # Eye centers
        left_eye_center = np.mean(landmarks['left_eye'], axis=0)
        right_eye_center = np.mean(landmarks['right_eye'], axis=0)
        landmarks['left_eye_center'] = tuple(left_eye_center)
        landmarks['right_eye_center'] = tuple(right_eye_center)
        
        return landmarks
    
    def _calibrate_baseline(self, landmarks: Dict):
        """Calibrate baseline gaze direction"""
        # Calculate current gaze direction
        gaze_vector = self._calculate_gaze_direction(landmarks)
        
        if self.baseline_gaze is None:
            self.baseline_gaze = gaze_vector
        else:
            # Average with existing baseline
            self.baseline_gaze = (
                (self.baseline_gaze[0] + gaze_vector[0]) / 2,
                (self.baseline_gaze[1] + gaze_vector[1]) / 2
            )
        
        self.calibration_frames += 1
    
    def _analyze_eye_contact(self, landmarks: Dict) -> EyeContactMetrics:
        """Analyze eye contact quality"""
        
        # Calculate gaze direction
        gaze_direction = self._calculate_gaze_direction(landmarks)
        
        # Calculate eye contact score based on gaze direction
        if self.baseline_gaze:
            gaze_diff = math.sqrt(
                (gaze_direction[0] - self.baseline_gaze[0])**2 +
                (gaze_direction[1] - self.baseline_gaze[1])**2
            )
            eye_contact_score = max(0, 100 - (gaze_diff * 200))
        else:
            eye_contact_score = 75  # Default score during calibration
        
        # Calculate blink rate
        blink_rate = self._calculate_blink_rate(landmarks)
        
        # Calculate eye openness
        eye_openness = self._calculate_eye_openness(landmarks)
        
        return EyeContactMetrics(
            gaze_direction=gaze_direction,
            eye_contact_score=eye_contact_score,
            blink_rate=blink_rate,
            eye_openness=eye_openness
        )
    
    def _analyze_expressions(self, landmarks: Dict) -> ExpressionMetrics:
        """Analyze facial expressions for engagement and confidence"""
        
        # Smile intensity
        smile_intensity = self._calculate_smile_intensity(landmarks)
        
        # Engagement level (based on facial alertness)
        engagement_level = self._calculate_facial_engagement(landmarks)
        
        # Confidence level (based on facial tension and openness)
        confidence_level = self._calculate_facial_confidence(landmarks)
        
        # Expression variety (changes over time)
        expression_variety = self._calculate_expression_variety()
        
        return ExpressionMetrics(
            smile_intensity=smile_intensity,
            engagement_level=engagement_level,
            confidence_level=confidence_level,
            expression_variety=expression_variety
        )
    
    def _calculate_gaze_direction(self, landmarks: Dict) -> Tuple[float, float]:
        """Calculate gaze direction vector"""
        left_eye_center = landmarks['left_eye_center']
        right_eye_center = landmarks['right_eye_center']
        nose_tip = landmarks['nose_tip']
        
        # Calculate eye center
        eye_center = (
            (left_eye_center[0] + right_eye_center[0]) / 2,
            (left_eye_center[1] + right_eye_center[1]) / 2
        )
        
        # Calculate gaze vector relative to nose
        gaze_x = (eye_center[0] - nose_tip[0]) / 100  # Normalize
        gaze_y = (eye_center[1] - nose_tip[1]) / 100
        
        return (gaze_x, gaze_y)
    
    def _calculate_blink_rate(self, landmarks: Dict) -> float:
        """Calculate blink rate per minute"""
        # Calculate eye aspect ratio for blink detection
        left_ear = self._calculate_eye_aspect_ratio(landmarks['left_eye'])
        right_ear = self._calculate_eye_aspect_ratio(landmarks['right_eye'])
        
        avg_ear = (left_ear + right_ear) / 2
        
        # Detect blink (EAR < threshold)
        if avg_ear < 0.25:  # Typical blink threshold
            self.blink_history.append(time.time())
        
        # Calculate blinks per minute
        current_time = time.time()
        recent_blinks = [t for t in self.blink_history if current_time - t <= 60]
        self.blink_history = recent_blinks  # Clean old blinks
        
        return len(recent_blinks)
    
    def _calculate_eye_aspect_ratio(self, eye_points: List) -> float:
        """Calculate Eye Aspect Ratio for blink detection"""
        if len(eye_points) < 6:
            return 0.3  # Default open eye ratio
        
        # Convert to numpy array
        points = np.array(eye_points)
        
        # Calculate vertical distances
        vertical_1 = np.linalg.norm(points[1] - points[5])
        vertical_2 = np.linalg.norm(points[2] - points[4])
        
        # Calculate horizontal distance
        horizontal = np.linalg.norm(points[0] - points[3])
        
        # Calculate EAR
        ear = (vertical_1 + vertical_2) / (2.0 * horizontal)
        return ear
    
    def _calculate_eye_openness(self, landmarks: Dict) -> float:
        """Calculate overall eye openness score"""
        left_ear = self._calculate_eye_aspect_ratio(landmarks['left_eye'])
        right_ear = self._calculate_eye_aspect_ratio(landmarks['right_eye'])
        
        avg_ear = (left_ear + right_ear) / 2
        
        # Convert to 0-100 scale (0.3 is fully open, 0.1 is closed)
        openness = min(100, max(0, (avg_ear - 0.1) / 0.2 * 100))
        return openness
    
    def _calculate_smile_intensity(self, landmarks: Dict) -> float:
        """Calculate smile intensity from mouth landmarks"""
        mouth_points = np.array(landmarks['mouth'])
        
        # Calculate mouth width and height
        mouth_width = np.linalg.norm(mouth_points[0] - mouth_points[6])
        mouth_height = np.linalg.norm(mouth_points[3] - mouth_points[9])
        
        # Smile ratio (wider mouth relative to height indicates smile)
        if mouth_height > 0:
            smile_ratio = mouth_width / mouth_height
            smile_intensity = min(100, max(0, (smile_ratio - 2.0) * 50))
        else:
            smile_intensity = 0
        
        return smile_intensity
    
    def _calculate_facial_engagement(self, landmarks: Dict) -> float:
        """Calculate engagement level from facial features"""
        # Base engagement from eye openness
        eye_openness = self._calculate_eye_openness(landmarks)
        
        # Adjust based on facial positioning
        engagement = eye_openness
        
        # Bonus for slight forward lean (nose position)
        nose_tip = landmarks['nose_tip']
        if nose_tip[1] < 0.4:  # Upper part of frame indicates forward lean
            engagement += 10
        
        return min(100, engagement)
    
    def _calculate_facial_confidence(self, landmarks: Dict) -> float:
        """Calculate confidence level from facial features"""
        # Base confidence from eye contact and openness
        eye_openness = self._calculate_eye_openness(landmarks)
        
        # Adjust based on facial symmetry and relaxation
        left_eye_center = landmarks['left_eye_center']
        right_eye_center = landmarks['right_eye_center']
        
        # Facial symmetry
        eye_level_diff = abs(left_eye_center[1] - right_eye_center[1])
        symmetry_score = max(0, 100 - (eye_level_diff * 10))
        
        # Combine metrics
        confidence = (eye_openness + symmetry_score) / 2
        
        return confidence
    
    def _calculate_expression_variety(self) -> float:
        """Calculate variety in facial expressions over time"""
        if len(self.face_history) < 10:
            return 50  # Default score
        
        # Analyze expression changes over recent history
        recent_expressions = self.face_history[-10:]
        smile_values = [frame['expression_metrics'].smile_intensity for frame in recent_expressions]
        engagement_values = [frame['expression_metrics'].engagement_level for frame in recent_expressions]
        
        # Calculate variance (more variety = higher score)
        smile_variance = np.var(smile_values)
        engagement_variance = np.var(engagement_values)
        
        # Convert to 0-100 scale
        variety_score = min(100, (smile_variance + engagement_variance) / 2)
        
        return variety_score
    
    def _update_history(self, landmarks: Dict, eye_contact_metrics: EyeContactMetrics,
                       expression_metrics: ExpressionMetrics):
        """Update face analysis history"""
        self.face_history.append({
            'timestamp': time.time(),
            'landmarks': landmarks,
            'eye_contact_metrics': eye_contact_metrics,
            'expression_metrics': expression_metrics
        })
        
        # Keep only recent history
        if len(self.face_history) > self.max_history:
            self.face_history = self.face_history[-self.max_history:]
    
    def _generate_face_feedback(self, eye_contact_metrics: EyeContactMetrics,
                               expression_metrics: ExpressionMetrics) -> List[str]:
        """Generate actionable feedback based on facial analysis"""
        feedback = []
        
        # Eye contact feedback
        if eye_contact_metrics.eye_contact_score < 60:
            feedback.append("Try to look directly at the camera more often")
        elif eye_contact_metrics.eye_contact_score > 85:
            feedback.append("Excellent eye contact! You appear confident and engaged")
        
        # Blink rate feedback
        if eye_contact_metrics.blink_rate > 30:
            feedback.append("Try to relax - your blink rate seems high")
        elif eye_contact_metrics.blink_rate < 10:
            feedback.append("Remember to blink naturally to avoid appearing tense")
        
        # Expression feedback
        if expression_metrics.smile_intensity > 20:
            feedback.append("Great! Your positive expression is engaging")
        
        if expression_metrics.engagement_level < 60:
            feedback.append("Try to show more engagement through your facial expressions")
        
        if expression_metrics.confidence_level > 80:
            feedback.append("You're projecting confidence well through your expressions")
        
        return feedback
    
    def _create_empty_result(self) -> Dict:
        """Create result when no face is detected"""
        return {
            'status': 'no_face_detected',
            'eye_contact_metrics': None,
            'expression_metrics': None,
            'feedback': ['Please ensure your face is clearly visible in the camera'],
            'timestamp': time.time()
        }
    
    def _create_calibration_result(self) -> Dict:
        """Create result during calibration phase"""
        return {
            'status': 'calibrating',
            'calibration_progress': self.calibration_frames / self.calibration_required,
            'message': f'Calibrating facial analysis... {self.calibration_frames}/{self.calibration_required}',
            'timestamp': time.time()
        }
    
    def get_session_summary(self) -> Dict:
        """Generate summary of facial analysis for the session"""
        if not self.face_history:
            return {}
        
        # Calculate averages
        eye_contact_scores = [frame['eye_contact_metrics'].eye_contact_score for frame in self.face_history]
        engagement_scores = [frame['expression_metrics'].engagement_level for frame in self.face_history]
        confidence_scores = [frame['expression_metrics'].confidence_level for frame in self.face_history]
        
        return {
            'average_eye_contact': np.mean(eye_contact_scores),
            'eye_contact_consistency': 100 - np.std(eye_contact_scores),
            'average_engagement': np.mean(engagement_scores),
            'average_confidence': np.mean(confidence_scores),
            'total_frames_analyzed': len(self.face_history),
            'average_blink_rate': np.mean([frame['eye_contact_metrics'].blink_rate for frame in self.face_history]),
            'expression_variety': np.mean([frame['expression_metrics'].expression_variety for frame in self.face_history])
        }