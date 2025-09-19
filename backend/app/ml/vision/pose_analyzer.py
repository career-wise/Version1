"""
Body Pose and Posture Analysis Component
Uses MediaPipe for real-time pose estimation and posture scoring
"""

import cv2
import numpy as np
import mediapipe as mp
from typing import Dict, List, Optional, Tuple
import math
from dataclasses import dataclass
import time

@dataclass
class PostureMetrics:
    """Posture analysis metrics"""
    shoulder_alignment: float  # 0-100
    spine_straightness: float  # 0-100
    head_position: float      # 0-100
    overall_posture: float    # 0-100
    confidence: float         # 0-1

@dataclass
class BodyLanguageMetrics:
    """Body language analysis metrics"""
    openness_score: float     # 0-100 (arms crossed vs open)
    engagement_level: float   # 0-100
    fidgeting_score: float    # 0-100 (lower is better)
    gesture_quality: float    # 0-100

class PoseAnalyzer:
    """
    Real-time body pose and posture analysis using MediaPipe
    Provides detailed feedback on professional presentation
    """
    
    def __init__(self, config: Dict):
        self.config = config
        
        # Initialize MediaPipe Pose
        self.mp_pose = mp.solutions.pose
        self.pose = self.mp_pose.Pose(
            static_image_mode=False,
            model_complexity=1,  # Balance between accuracy and speed
            enable_segmentation=False,
            min_detection_confidence=0.7,
            min_tracking_confidence=0.5
        )
        
        # Pose landmarks for analysis
        self.pose_landmarks = self.mp_pose.PoseLandmarks
        
        # Historical data for movement analysis
        self.pose_history = []
        self.max_history = 30  # Keep last 30 frames (1 second at 30fps)
        
        # Calibration data
        self.baseline_posture = None
        self.calibration_frames = 0
        self.calibration_required = 10
        
    async def initialize(self):
        """Initialize the pose analyzer"""
        self.pose_history = []
        self.baseline_posture = None
        self.calibration_frames = 0
        
    def analyze(self, frame: np.ndarray) -> Dict:
        """
        Analyze body pose and posture from video frame
        
        Args:
            frame: RGB video frame
            
        Returns:
            Dictionary containing pose analysis results
        """
        try:
            # Convert BGR to RGB for MediaPipe
            rgb_frame = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)
            
            # Process pose
            results = self.pose.process(rgb_frame)
            
            if not results.pose_landmarks:
                return self._create_empty_result()
            
            # Extract landmarks
            landmarks = self._extract_landmarks(results.pose_landmarks)
            
            # Calibrate baseline if needed
            if self.calibration_frames < self.calibration_required:
                self._calibrate_baseline(landmarks)
                return self._create_calibration_result()
            
            # Analyze posture
            posture_metrics = self._analyze_posture(landmarks)
            
            # Analyze body language
            body_language_metrics = self._analyze_body_language(landmarks)
            
            # Update history
            self._update_history(landmarks, posture_metrics, body_language_metrics)
            
            # Generate feedback
            feedback = self._generate_pose_feedback(posture_metrics, body_language_metrics)
            
            return {
                'status': 'success',
                'posture_metrics': posture_metrics.__dict__,
                'body_language_metrics': body_language_metrics.__dict__,
                'feedback': feedback,
                'landmarks': landmarks,
                'timestamp': time.time()
            }
            
        except Exception as e:
            return {'status': 'error', 'message': str(e)}
    
    def _extract_landmarks(self, pose_landmarks) -> Dict[str, Tuple[float, float, float]]:
        """Extract key pose landmarks"""
        landmarks = {}
        
        # Key points for posture analysis
        key_points = [
            'NOSE', 'LEFT_SHOULDER', 'RIGHT_SHOULDER',
            'LEFT_ELBOW', 'RIGHT_ELBOW', 'LEFT_WRIST', 'RIGHT_WRIST',
            'LEFT_HIP', 'RIGHT_HIP', 'LEFT_EAR', 'RIGHT_EAR'
        ]
        
        for point_name in key_points:
            point = getattr(self.pose_landmarks, point_name)
            landmark = pose_landmarks.landmark[point]
            landmarks[point_name.lower()] = (landmark.x, landmark.y, landmark.z)
            
        return landmarks
    
    def _calibrate_baseline(self, landmarks: Dict):
        """Calibrate baseline posture for comparison"""
        if self.baseline_posture is None:
            self.baseline_posture = landmarks.copy()
        else:
            # Average with existing baseline
            for key in landmarks:
                if key in self.baseline_posture:
                    x, y, z = self.baseline_posture[key]
                    new_x, new_y, new_z = landmarks[key]
                    self.baseline_posture[key] = (
                        (x + new_x) / 2,
                        (y + new_y) / 2,
                        (z + new_z) / 2
                    )
        
        self.calibration_frames += 1
    
    def _analyze_posture(self, landmarks: Dict) -> PostureMetrics:
        """Analyze posture quality"""
        
        # Shoulder alignment
        left_shoulder = landmarks['left_shoulder']
        right_shoulder = landmarks['right_shoulder']
        shoulder_diff = abs(left_shoulder[1] - right_shoulder[1])
        shoulder_alignment = max(0, 100 - (shoulder_diff * 1000))
        
        # Spine straightness (using shoulders and hips)
        left_hip = landmarks['left_hip']
        right_hip = landmarks['right_hip']
        
        # Calculate spine angle
        shoulder_center = (
            (left_shoulder[0] + right_shoulder[0]) / 2,
            (left_shoulder[1] + right_shoulder[1]) / 2
        )
        hip_center = (
            (left_hip[0] + right_hip[0]) / 2,
            (left_hip[1] + right_hip[1]) / 2
        )
        
        spine_angle = math.atan2(
            shoulder_center[0] - hip_center[0],
            shoulder_center[1] - hip_center[1]
        )
        spine_straightness = max(0, 100 - abs(math.degrees(spine_angle)) * 2)
        
        # Head position (using nose and ears)
        nose = landmarks['nose']
        left_ear = landmarks['left_ear']
        right_ear = landmarks['right_ear']
        
        # Head tilt analysis
        ear_diff = abs(left_ear[1] - right_ear[1])
        head_position = max(0, 100 - (ear_diff * 500))
        
        # Overall posture score
        overall_posture = (shoulder_alignment + spine_straightness + head_position) / 3
        
        # Confidence based on landmark visibility
        confidence = self._calculate_pose_confidence(landmarks)
        
        return PostureMetrics(
            shoulder_alignment=shoulder_alignment,
            spine_straightness=spine_straightness,
            head_position=head_position,
            overall_posture=overall_posture,
            confidence=confidence
        )
    
    def _analyze_body_language(self, landmarks: Dict) -> BodyLanguageMetrics:
        """Analyze body language and engagement"""
        
        # Openness score (arms position)
        left_wrist = landmarks['left_wrist']
        right_wrist = landmarks['right_wrist']
        left_shoulder = landmarks['left_shoulder']
        right_shoulder = landmarks['right_shoulder']
        
        # Calculate arm openness
        left_arm_angle = self._calculate_arm_angle(left_shoulder, left_wrist)
        right_arm_angle = self._calculate_arm_angle(right_shoulder, right_wrist)
        
        # Higher angles indicate more open posture
        openness_score = min(100, (left_arm_angle + right_arm_angle) / 2)
        
        # Engagement level (based on forward lean and alertness)
        engagement_level = self._calculate_engagement(landmarks)
        
        # Fidgeting analysis (movement consistency)
        fidgeting_score = self._analyze_fidgeting()
        
        # Gesture quality
        gesture_quality = self._analyze_gestures()
        
        return BodyLanguageMetrics(
            openness_score=openness_score,
            engagement_level=engagement_level,
            fidgeting_score=fidgeting_score,
            gesture_quality=gesture_quality
        )
    
    def _calculate_arm_angle(self, shoulder: Tuple, wrist: Tuple) -> float:
        """Calculate arm angle for openness assessment"""
        dx = wrist[0] - shoulder[0]
        dy = wrist[1] - shoulder[1]
        angle = math.degrees(math.atan2(dy, dx))
        return abs(angle)
    
    def _calculate_engagement(self, landmarks: Dict) -> float:
        """Calculate engagement level based on body position"""
        # Use head position relative to shoulders
        nose = landmarks['nose']
        left_shoulder = landmarks['left_shoulder']
        right_shoulder = landmarks['right_shoulder']
        
        shoulder_center_y = (left_shoulder[1] + right_shoulder[1]) / 2
        forward_lean = max(0, (shoulder_center_y - nose[1]) * 100)
        
        return min(100, forward_lean + 50)  # Base engagement + lean bonus
    
    def _analyze_fidgeting(self) -> float:
        """Analyze movement consistency to detect fidgeting"""
        if len(self.pose_history) < 10:
            return 80  # Default good score
        
        # Calculate movement variance over recent frames
        recent_poses = self.pose_history[-10:]
        movement_variance = 0
        
        for i in range(1, len(recent_poses)):
            prev_pose = recent_poses[i-1]['landmarks']
            curr_pose = recent_poses[i]['landmarks']
            
            # Calculate movement for key points
            for key in ['left_wrist', 'right_wrist', 'nose']:
                if key in prev_pose and key in curr_pose:
                    prev_x, prev_y, _ = prev_pose[key]
                    curr_x, curr_y, _ = curr_pose[key]
                    movement = math.sqrt((curr_x - prev_x)**2 + (curr_y - prev_y)**2)
                    movement_variance += movement
        
        # Convert to score (lower movement = higher score)
        fidgeting_score = max(0, 100 - (movement_variance * 1000))
        return fidgeting_score
    
    def _analyze_gestures(self) -> float:
        """Analyze gesture quality and appropriateness"""
        if len(self.pose_history) < 5:
            return 75  # Default score
        
        # Analyze hand movement patterns
        recent_poses = self.pose_history[-5:]
        gesture_score = 75  # Base score
        
        # Check for natural hand movements
        hand_movements = []
        for pose_data in recent_poses:
            landmarks = pose_data['landmarks']
            if 'left_wrist' in landmarks and 'right_wrist' in landmarks:
                left_wrist = landmarks['left_wrist']
                right_wrist = landmarks['right_wrist']
                hand_movements.append((left_wrist, right_wrist))
        
        if len(hand_movements) >= 3:
            # Analyze movement smoothness and naturalness
            movement_smoothness = self._calculate_movement_smoothness(hand_movements)
            gesture_score = min(100, gesture_score + movement_smoothness)
        
        return gesture_score
    
    def _calculate_movement_smoothness(self, movements: List) -> float:
        """Calculate smoothness of hand movements"""
        if len(movements) < 3:
            return 0
        
        smoothness_score = 0
        for i in range(2, len(movements)):
            # Calculate acceleration (change in velocity)
            prev_left, prev_right = movements[i-2]
            curr_left, curr_right = movements[i-1]
            next_left, next_right = movements[i]
            
            # Left hand smoothness
            vel1_left = (curr_left[0] - prev_left[0], curr_left[1] - prev_left[1])
            vel2_left = (next_left[0] - curr_left[0], next_left[1] - curr_left[1])
            accel_left = math.sqrt((vel2_left[0] - vel1_left[0])**2 + (vel2_left[1] - vel1_left[1])**2)
            
            # Lower acceleration = smoother movement
            smoothness_score += max(0, 10 - (accel_left * 100))
        
        return smoothness_score / max(1, len(movements) - 2)
    
    def _calculate_pose_confidence(self, landmarks: Dict) -> float:
        """Calculate confidence in pose detection"""
        # Check if all key landmarks are present and reasonable
        required_points = ['nose', 'left_shoulder', 'right_shoulder', 'left_hip', 'right_hip']
        
        confidence = 1.0
        for point in required_points:
            if point not in landmarks:
                confidence -= 0.2
            else:
                x, y, z = landmarks[point]
                # Check if coordinates are reasonable (within frame)
                if x < 0 or x > 1 or y < 0 or y > 1:
                    confidence -= 0.1
        
        return max(0, confidence)
    
    def _update_history(self, landmarks: Dict, posture_metrics: PostureMetrics, 
                       body_language_metrics: BodyLanguageMetrics):
        """Update pose history for temporal analysis"""
        self.pose_history.append({
            'timestamp': time.time(),
            'landmarks': landmarks,
            'posture_metrics': posture_metrics,
            'body_language_metrics': body_language_metrics
        })
        
        # Keep only recent history
        if len(self.pose_history) > self.max_history:
            self.pose_history = self.pose_history[-self.max_history:]
    
    def _generate_pose_feedback(self, posture_metrics: PostureMetrics, 
                               body_language_metrics: BodyLanguageMetrics) -> List[str]:
        """Generate actionable feedback based on pose analysis"""
        feedback = []
        
        # Posture feedback
        if posture_metrics.overall_posture < 60:
            feedback.append("Try to sit up straighter and align your shoulders")
        elif posture_metrics.overall_posture > 85:
            feedback.append("Excellent posture! You look confident and professional")
        
        # Shoulder alignment
        if posture_metrics.shoulder_alignment < 70:
            feedback.append("Keep your shoulders level and relaxed")
        
        # Head position
        if posture_metrics.head_position < 70:
            feedback.append("Keep your head centered and avoid tilting")
        
        # Body language feedback
        if body_language_metrics.openness_score < 60:
            feedback.append("Try to keep your arms open and avoid crossing them")
        
        if body_language_metrics.fidgeting_score < 60:
            feedback.append("Try to minimize fidgeting and maintain steady positioning")
        
        if body_language_metrics.engagement_level > 80:
            feedback.append("Great engagement! Your body language shows you're attentive")
        
        return feedback
    
    def _create_empty_result(self) -> Dict:
        """Create result when no pose is detected"""
        return {
            'status': 'no_pose_detected',
            'posture_metrics': None,
            'body_language_metrics': None,
            'feedback': ['Please ensure you are visible in the camera frame'],
            'timestamp': time.time()
        }
    
    def _create_calibration_result(self) -> Dict:
        """Create result during calibration phase"""
        return {
            'status': 'calibrating',
            'calibration_progress': self.calibration_frames / self.calibration_required,
            'message': f'Calibrating... {self.calibration_frames}/{self.calibration_required}',
            'timestamp': time.time()
        }
    
    def get_session_summary(self) -> Dict:
        """Generate summary of pose analysis for the session"""
        if not self.pose_history:
            return {}
        
        # Calculate averages
        posture_scores = [frame['posture_metrics'].overall_posture for frame in self.pose_history]
        engagement_scores = [frame['body_language_metrics'].engagement_level for frame in self.pose_history]
        
        return {
            'average_posture': np.mean(posture_scores),
            'posture_consistency': 100 - np.std(posture_scores),
            'average_engagement': np.mean(engagement_scores),
            'total_frames_analyzed': len(self.pose_history),
            'posture_trend': self._calculate_trend(posture_scores),
            'engagement_trend': self._calculate_trend(engagement_scores)
        }
    
    def _calculate_trend(self, scores: List[float]) -> str:
        """Calculate trend direction for scores"""
        if len(scores) < 10:
            return 'stable'
        
        recent_avg = np.mean(scores[-10:])
        earlier_avg = np.mean(scores[-20:-10]) if len(scores) >= 20 else np.mean(scores[:-10])
        
        diff = recent_avg - earlier_avg
        if diff > 5:
            return 'improving'
        elif diff < -5:
            return 'declining'
        else:
            return 'stable'