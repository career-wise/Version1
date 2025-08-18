import cv2
import mediapipe as mp
import numpy as np
from typing import Dict, List, Tuple, Optional
import logging

logger = logging.getLogger(__name__)

class BodyLanguageAnalyzer:
    """
    Analyzes body language from video frames using MediaPipe
    """
    
    def __init__(self):
        self.mp_pose = mp.solutions.pose
        self.mp_face_mesh = mp.solutions.face_mesh
        self.mp_hands = mp.solutions.hands
        
        # Initialize MediaPipe models
        self.pose = self.mp_pose.Pose(
            static_image_mode=False,
            model_complexity=1,
            smooth_landmarks=True,
            min_detection_confidence=0.5,
            min_tracking_confidence=0.5
        )
        
        self.face_mesh = self.mp_face_mesh.FaceMesh(
            static_image_mode=False,
            max_num_faces=1,
            refine_landmarks=True,
            min_detection_confidence=0.5,
            min_tracking_confidence=0.5
        )
        
        self.hands = self.mp_hands.Hands(
            static_image_mode=False,
            max_num_hands=2,
            min_detection_confidence=0.5,
            min_tracking_confidence=0.5
        )
        
        # Initialize tracking variables
        self.frame_count = 0
        self.eye_contact_frames = 0
        self.good_posture_frames = 0
        self.gesture_frames = 0
        self.smile_frames = 0
        
    def analyze_frame(self, frame: np.ndarray) -> Dict[str, float]:
        """
        Analyze a single video frame for body language metrics
        
        Args:
            frame: RGB image array
            
        Returns:
            Dictionary with body language scores (0-100)
        """
        try:
            self.frame_count += 1
            
            # Convert BGR to RGB if needed
            if len(frame.shape) == 3 and frame.shape[2] == 3:
                rgb_frame = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)
            else:
                rgb_frame = frame
                
            # Analyze different aspects
            eye_contact_score = self._analyze_eye_contact(rgb_frame)
            posture_score = self._analyze_posture(rgb_frame)
            gesture_score = self._analyze_hand_gestures(rgb_frame)
            expression_score = self._analyze_facial_expressions(rgb_frame)
            
            return {
                'eye_contact': eye_contact_score,
                'posture': posture_score,
                'hand_gestures': gesture_score,
                'facial_expressions': expression_score,
                'overall': (eye_contact_score + posture_score + gesture_score + expression_score) / 4
            }
            
        except Exception as e:
            logger.error(f"Error analyzing frame: {e}")
            return {
                'eye_contact': 0,
                'posture': 0,
                'hand_gestures': 0,
                'facial_expressions': 0,
                'overall': 0
            }
    
    def _analyze_eye_contact(self, frame: np.ndarray) -> float:
        """Analyze eye contact and gaze direction"""
        try:
            results = self.face_mesh.process(frame)
            
            if not results.multi_face_landmarks:
                return 0
            
            face_landmarks = results.multi_face_landmarks[0]
            
            # Get eye landmarks
            left_eye_indices = [33, 7, 163, 144, 145, 153, 154, 155, 133, 173, 157, 158, 159, 160, 161, 246]
            right_eye_indices = [362, 382, 381, 380, 374, 373, 390, 249, 263, 466, 388, 387, 386, 385, 384, 398]
            
            # Calculate eye aspect ratio and gaze direction
            h, w = frame.shape[:2]
            
            # Simplified eye contact detection based on face orientation
            nose_tip = face_landmarks.landmark[1]
            nose_x = nose_tip.x * w
            nose_y = nose_tip.y * h
            
            # Check if face is looking towards camera (simplified)
            center_x = w / 2
            center_y = h / 2
            
            # Calculate distance from center
            distance_from_center = np.sqrt((nose_x - center_x)**2 + (nose_y - center_y)**2)
            max_distance = np.sqrt(center_x**2 + center_y**2)
            
            # Score based on how centered the face is
            eye_contact_score = max(0, 100 - (distance_from_center / max_distance) * 100)
            
            if eye_contact_score > 70:
                self.eye_contact_frames += 1
                
            return eye_contact_score
            
        except Exception as e:
            logger.error(f"Error analyzing eye contact: {e}")
            return 0
    
    def _analyze_posture(self, frame: np.ndarray) -> float:
        """Analyze body posture"""
        try:
            results = self.pose.process(frame)
            
            if not results.pose_landmarks:
                return 0
            
            landmarks = results.pose_landmarks.landmark
            
            # Get shoulder landmarks
            left_shoulder = landmarks[self.mp_pose.PoseLandmark.LEFT_SHOULDER]
            right_shoulder = landmarks[self.mp_pose.PoseLandmark.RIGHT_SHOULDER]
            
            # Calculate shoulder alignment
            shoulder_diff = abs(left_shoulder.y - right_shoulder.y)
            shoulder_score = max(0, 100 - (shoulder_diff * 1000))  # Scale factor
            
            # Get spine alignment (simplified)
            nose = landmarks[self.mp_pose.PoseLandmark.NOSE]
            left_hip = landmarks[self.mp_pose.PoseLandmark.LEFT_HIP]
            right_hip = landmarks[self.mp_pose.PoseLandmark.RIGHT_HIP]
            
            # Calculate if person is sitting straight
            hip_center_x = (left_hip.x + right_hip.x) / 2
            spine_alignment = abs(nose.x - hip_center_x)
            spine_score = max(0, 100 - (spine_alignment * 200))
            
            posture_score = (shoulder_score + spine_score) / 2
            
            if posture_score > 75:
                self.good_posture_frames += 1
                
            return posture_score
            
        except Exception as e:
            logger.error(f"Error analyzing posture: {e}")
            return 0
    
    def _analyze_hand_gestures(self, frame: np.ndarray) -> float:
        """Analyze hand gestures and movement"""
        try:
            results = self.hands.process(frame)
            
            if not results.multi_hand_landmarks:
                return 50  # Neutral score when no hands detected
            
            gesture_score = 0
            hand_count = len(results.multi_hand_landmarks)
            
            for hand_landmarks in results.multi_hand_landmarks:
                # Analyze hand openness and gesture naturalness
                landmarks = hand_landmarks.landmark
                
                # Calculate finger extension
                finger_tips = [4, 8, 12, 16, 20]  # Thumb, Index, Middle, Ring, Pinky tips
                finger_mcp = [2, 5, 9, 13, 17]   # MCP joints
                
                extended_fingers = 0
                for tip, mcp in zip(finger_tips, finger_mcp):
                    if landmarks[tip].y < landmarks[mcp].y:  # Finger extended
                        extended_fingers += 1
                
                # Score based on natural hand position
                hand_score = min(100, extended_fingers * 20 + 20)
                gesture_score += hand_score
            
            final_score = gesture_score / hand_count if hand_count > 0 else 50
            
            if final_score > 60:
                self.gesture_frames += 1
                
            return final_score
            
        except Exception as e:
            logger.error(f"Error analyzing hand gestures: {e}")
            return 50
    
    def _analyze_facial_expressions(self, frame: np.ndarray) -> float:
        """Analyze facial expressions and engagement"""
        try:
            results = self.face_mesh.process(frame)
            
            if not results.multi_face_landmarks:
                return 0
            
            face_landmarks = results.multi_face_landmarks[0]
            landmarks = face_landmarks.landmark
            
            # Analyze smile (simplified)
            # Mouth corners
            left_mouth = landmarks[61]
            right_mouth = landmarks[291]
            mouth_center = landmarks[13]
            
            # Calculate if mouth corners are raised (smile)
            mouth_curve = ((left_mouth.y + right_mouth.y) / 2) - mouth_center.y
            smile_score = max(0, min(100, (mouth_curve + 0.01) * 5000))
            
            # Analyze eyebrow position (engagement)
            left_eyebrow = landmarks[70]
            right_eyebrow = landmarks[300]
            eyebrow_height = 1 - ((left_eyebrow.y + right_eyebrow.y) / 2)
            engagement_score = min(100, eyebrow_height * 150)
            
            expression_score = (smile_score + engagement_score) / 2
            
            if expression_score > 60:
                self.smile_frames += 1
                
            return expression_score
            
        except Exception as e:
            logger.error(f"Error analyzing facial expressions: {e}")
            return 0
    
    def get_session_summary(self) -> Dict[str, float]:
        """Get overall session statistics"""
        if self.frame_count == 0:
            return {
                'eye_contact_percentage': 0,
                'good_posture_percentage': 0,
                'gesture_activity_percentage': 0,
                'positive_expression_percentage': 0
            }
        
        return {
            'eye_contact_percentage': (self.eye_contact_frames / self.frame_count) * 100,
            'good_posture_percentage': (self.good_posture_frames / self.frame_count) * 100,
            'gesture_activity_percentage': (self.gesture_frames / self.frame_count) * 100,
            'positive_expression_percentage': (self.smile_frames / self.frame_count) * 100
        }
    
    def reset_session(self):
        """Reset session counters"""
        self.frame_count = 0
        self.eye_contact_frames = 0
        self.good_posture_frames = 0
        self.gesture_frames = 0
        self.smile_frames = 0