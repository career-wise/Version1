"""
Feedback Generation and Fusion Component
Combines multimodal analysis results into actionable feedback
"""

import numpy as np
from typing import Dict, List, Optional, Tuple
import time
from dataclasses import dataclass
import json

@dataclass
class FusedMetrics:
    """Combined metrics from all modalities"""
    overall_score: float          # 0-100
    body_language_score: float    # 0-100
    vocal_delivery_score: float   # 0-100
    content_quality_score: float  # 0-100
    confidence_score: float       # 0-100
    engagement_score: float       # 0-100

@dataclass
class PersonalizedFeedback:
    """Personalized feedback structure"""
    strengths: List[str]
    areas_for_improvement: List[str]
    specific_suggestions: List[str]
    next_steps: List[str]
    priority_focus: str

class FeedbackGenerator:
    """
    Intelligent feedback generation system
    Fuses multimodal analysis results into personalized, actionable feedback
    """
    
    def __init__(self, config: Dict):
        self.config = config
        
        # Scoring weights for different components
        self.weights = config.get('weights', {
            'body_language': 0.35,
            'vocal_delivery': 0.35,
            'content_quality': 0.30
        })
        
        # Feedback templates
        self.feedback_templates = self._load_feedback_templates()
        
        # Performance thresholds
        self.thresholds = {
            'excellent': 85,
            'good': 70,
            'fair': 55,
            'needs_improvement': 40
        }
        
    def generate_live_feedback(self, analysis_frame) -> Dict:
        """Generate real-time feedback from current analysis frame"""
        try:
            # Extract metrics from each modality
            pose_data = analysis_frame.pose_data or {}
            face_data = analysis_frame.face_data or {}
            speech_data = analysis_frame.speech_data or {}
            voice_data = analysis_frame.voice_data or {}
            
            # Calculate component scores
            body_language_score = self._calculate_body_language_score(pose_data, face_data)
            vocal_delivery_score = self._calculate_vocal_delivery_score(voice_data)
            content_quality_score = self._calculate_content_quality_score(speech_data)
            
            # Calculate overall metrics
            fused_metrics = self._fuse_metrics(
                body_language_score, vocal_delivery_score, content_quality_score
            )
            
            # Generate live tips
            live_tips = self._generate_live_tips(
                pose_data, face_data, speech_data, voice_data
            )
            
            return {
                'timestamp': analysis_frame.timestamp,
                'body_language_score': body_language_score,
                'vocal_delivery_score': vocal_delivery_score,
                'content_quality_score': content_quality_score,
                'overall_confidence': fused_metrics.confidence_score,
                'live_tips': live_tips,
                'metrics': fused_metrics.__dict__
            }
            
        except Exception as e:
            return {'status': 'error', 'message': str(e)}
    
    def generate_session_report(self, all_pose_data: List, all_face_data: List,
                               all_speech_data: List, all_voice_data: List) -> Dict:
        """Generate comprehensive session analysis report"""
        try:
            # Calculate session-wide scores
            session_scores = self._calculate_session_scores(
                all_pose_data, all_face_data, all_speech_data, all_voice_data
            )
            
            # Generate personalized feedback
            personalized_feedback = self._generate_personalized_feedback(session_scores)
            
            # Calculate detailed metrics
            detailed_metrics = self._calculate_detailed_metrics(
                all_pose_data, all_face_data, all_speech_data, all_voice_data
            )
            
            # Generate improvement plan
            improvement_plan = self._generate_improvement_plan(session_scores, personalized_feedback)
            
            return {
                'overall_score': session_scores.overall_score,
                'component_scores': {
                    'body_language': session_scores.body_language_score,
                    'vocal_delivery': session_scores.vocal_delivery_score,
                    'content_quality': session_scores.content_quality_score,
                    'confidence': session_scores.confidence_score,
                    'engagement': session_scores.engagement_score
                },
                'detailed_metrics': detailed_metrics,
                'personalized_feedback': personalized_feedback.__dict__,
                'improvement_plan': improvement_plan,
                'session_duration': self._calculate_session_duration(all_pose_data),
                'timestamp': time.time()
            }
            
        except Exception as e:
            return {'status': 'error', 'message': str(e)}
    
    def _calculate_body_language_score(self, pose_data: Dict, face_data: Dict) -> float:
        """Calculate combined body language score"""
        score = 70  # Base score
        
        # Pose contribution
        if pose_data.get('status') == 'success':
            posture_metrics = pose_data.get('posture_metrics', {})
            body_language_metrics = pose_data.get('body_language_metrics', {})
            
            posture_score = posture_metrics.get('overall_posture', 70)
            openness_score = body_language_metrics.get('openness_score', 70)
            engagement_score = body_language_metrics.get('engagement_level', 70)
            
            pose_contribution = (posture_score + openness_score + engagement_score) / 3
            score = (score + pose_contribution) / 2
        
        # Face contribution
        if face_data.get('status') == 'success':
            eye_contact_metrics = face_data.get('eye_contact_metrics', {})
            expression_metrics = face_data.get('expression_metrics', {})
            
            eye_contact_score = eye_contact_metrics.get('eye_contact_score', 70)
            confidence_score = expression_metrics.get('confidence_level', 70)
            
            face_contribution = (eye_contact_score + confidence_score) / 2
            score = (score + face_contribution) / 2
        
        return min(100, max(0, score))
    
    def _calculate_vocal_delivery_score(self, voice_data: Dict) -> float:
        """Calculate vocal delivery score"""
        if voice_data.get('status') != 'success':
            return 70  # Default score
        
        voice_metrics = voice_data.get('voice_metrics', {})
        tone_metrics = voice_data.get('tone_metrics', {})
        
        # Component scores
        volume_score = min(100, voice_metrics.get('volume_level', 50) * 1.5)
        quality_score = voice_metrics.get('voice_quality', 70)
        confidence_score = tone_metrics.get('confidence_level', 70)
        appropriateness_score = tone_metrics.get('tone_appropriateness', 70)
        
        # Weighted average
        vocal_score = (
            volume_score * 0.25 +
            quality_score * 0.25 +
            confidence_score * 0.25 +
            appropriateness_score * 0.25
        )
        
        return min(100, max(0, vocal_score))
    
    def _calculate_content_quality_score(self, speech_data: Dict) -> float:
        """Calculate content quality score"""
        if speech_data.get('status') != 'success':
            return 70  # Default score
        
        content_metrics = speech_data.get('content_metrics', {})
        communication_metrics = speech_data.get('communication_metrics', {})
        
        # Component scores
        vocabulary_score = content_metrics.get('vocabulary_diversity', 70)
        relevance_score = content_metrics.get('content_relevance', 70)
        clarity_score = communication_metrics.get('clarity_score', 70)
        structure_score = communication_metrics.get('structure_score', 70)
        
        # Adjust for filler words
        filler_rate = content_metrics.get('filler_word_rate', 0)
        filler_penalty = min(20, filler_rate * 2)  # Max 20 point penalty
        
        # Weighted average
        content_score = (
            vocabulary_score * 0.25 +
            relevance_score * 0.25 +
            clarity_score * 0.25 +
            structure_score * 0.25
        ) - filler_penalty
        
        return min(100, max(0, content_score))
    
    def _fuse_metrics(self, body_language_score: float, vocal_delivery_score: float,
                     content_quality_score: float) -> FusedMetrics:
        """Fuse individual component scores into overall metrics"""
        
        # Calculate overall score using weights
        overall_score = (
            body_language_score * self.weights['body_language'] +
            vocal_delivery_score * self.weights['vocal_delivery'] +
            content_quality_score * self.weights['content_quality']
        )
        
        # Calculate confidence score (average of confidence indicators)
        confidence_score = (body_language_score + vocal_delivery_score) / 2
        
        # Calculate engagement score
        engagement_score = (body_language_score + content_quality_score) / 2
        
        return FusedMetrics(
            overall_score=overall_score,
            body_language_score=body_language_score,
            vocal_delivery_score=vocal_delivery_score,
            content_quality_score=content_quality_score,
            confidence_score=confidence_score,
            engagement_score=engagement_score
        )
    
    def _generate_live_tips(self, pose_data: Dict, face_data: Dict,
                           speech_data: Dict, voice_data: Dict) -> List[str]:
        """Generate real-time tips based on current performance"""
        tips = []
        
        # Collect feedback from each component
        if pose_data.get('feedback'):
            tips.extend(pose_data['feedback'][:1])  # Limit to 1 tip per component
        
        if face_data.get('feedback'):
            tips.extend(face_data['feedback'][:1])
        
        if speech_data.get('feedback'):
            tips.extend(speech_data['feedback'][:1])
        
        if voice_data.get('feedback'):
            tips.extend(voice_data['feedback'][:1])
        
        # Prioritize tips and return top 2-3
        return tips[:3]
    
    def _calculate_session_scores(self, all_pose_data: List, all_face_data: List,
                                 all_speech_data: List, all_voice_data: List) -> FusedMetrics:
        """Calculate average scores across the entire session"""
        
        # Calculate average body language score
        body_scores = []
        for pose_frame, face_frame in zip(all_pose_data, all_face_data):
            score = self._calculate_body_language_score(pose_frame, face_frame)
            body_scores.append(score)
        
        # Calculate average vocal delivery score
        vocal_scores = []
        for voice_frame in all_voice_data:
            score = self._calculate_vocal_delivery_score(voice_frame)
            vocal_scores.append(score)
        
        # Calculate average content quality score
        content_scores = []
        for speech_frame in all_speech_data:
            score = self._calculate_content_quality_score(speech_frame)
            content_scores.append(score)
        
        # Calculate session averages
        avg_body_language = np.mean(body_scores) if body_scores else 70
        avg_vocal_delivery = np.mean(vocal_scores) if vocal_scores else 70
        avg_content_quality = np.mean(content_scores) if content_scores else 70
        
        return self._fuse_metrics(avg_body_language, avg_vocal_delivery, avg_content_quality)
    
    def _generate_personalized_feedback(self, session_scores: FusedMetrics) -> PersonalizedFeedback:
        """Generate personalized feedback based on session performance"""
        
        strengths = []
        areas_for_improvement = []
        specific_suggestions = []
        
        # Analyze each component
        components = {
            'Body Language': session_scores.body_language_score,
            'Vocal Delivery': session_scores.vocal_delivery_score,
            'Content Quality': session_scores.content_quality_score
        }
        
        for component, score in components.items():
            if score >= self.thresholds['excellent']:
                strengths.append(f"Excellent {component.lower()} - you demonstrate strong professional presence")
            elif score >= self.thresholds['good']:
                strengths.append(f"Good {component.lower()} with room for minor improvements")
            elif score >= self.thresholds['fair']:
                areas_for_improvement.append(f"{component} could be enhanced")
                specific_suggestions.extend(self._get_improvement_suggestions(component, score))
            else:
                areas_for_improvement.append(f"{component} needs significant improvement")
                specific_suggestions.extend(self._get_improvement_suggestions(component, score))
        
        # Determine priority focus area
        priority_focus = self._determine_priority_focus(session_scores)
        
        # Generate next steps
        next_steps = self._generate_next_steps(session_scores, priority_focus)
        
        return PersonalizedFeedback(
            strengths=strengths,
            areas_for_improvement=areas_for_improvement,
            specific_suggestions=specific_suggestions,
            next_steps=next_steps,
            priority_focus=priority_focus
        )
    
    def _get_improvement_suggestions(self, component: str, score: float) -> List[str]:
        """Get specific improvement suggestions for a component"""
        suggestions = []
        
        if component == 'Body Language':
            if score < 60:
                suggestions.extend([
                    "Practice maintaining good posture in front of a mirror",
                    "Work on making consistent eye contact with the camera",
                    "Keep your hands visible and use natural gestures"
                ])
            else:
                suggestions.extend([
                    "Fine-tune your posture for maximum confidence",
                    "Practice varying your gestures appropriately"
                ])
        
        elif component == 'Vocal Delivery':
            if score < 60:
                suggestions.extend([
                    "Practice speaking at 140-160 words per minute",
                    "Work on projecting your voice clearly",
                    "Record yourself to identify vocal habits"
                ])
            else:
                suggestions.extend([
                    "Focus on vocal variety and intonation",
                    "Practice controlling nervous vocal habits"
                ])
        
        elif component == 'Content Quality':
            if score < 60:
                suggestions.extend([
                    "Practice structuring responses using the STAR method",
                    "Prepare specific examples for common questions",
                    "Work on reducing filler words"
                ])
            else:
                suggestions.extend([
                    "Add more specific details to your examples",
                    "Practice transitioning smoothly between points"
                ])
        
        return suggestions
    
    def _determine_priority_focus(self, session_scores: FusedMetrics) -> str:
        """Determine the priority area for improvement"""
        scores = {
            'Body Language': session_scores.body_language_score,
            'Vocal Delivery': session_scores.vocal_delivery_score,
            'Content Quality': session_scores.content_quality_score
        }
        
        # Find the lowest scoring area
        lowest_component = min(scores.keys(), key=lambda k: scores[k])
        lowest_score = scores[lowest_component]
        
        if lowest_score < self.thresholds['fair']:
            return lowest_component
        elif session_scores.overall_score < self.thresholds['good']:
            return "Overall Interview Performance"
        else:
            return "Advanced Techniques"
    
    def _generate_next_steps(self, session_scores: FusedMetrics, priority_focus: str) -> List[str]:
        """Generate actionable next steps"""
        next_steps = []
        
        if priority_focus == 'Body Language':
            next_steps.extend([
                "Schedule daily 10-minute posture practice sessions",
                "Practice interviews in front of a mirror",
                "Record yourself answering questions to review body language"
            ])
        elif priority_focus == 'Vocal Delivery':
            next_steps.extend([
                "Practice vocal exercises for 15 minutes daily",
                "Record and review your speaking pace",
                "Work with a speech coach or use voice training apps"
            ])
        elif priority_focus == 'Content Quality':
            next_steps.extend([
                "Prepare and practice STAR method examples",
                "Research common interview questions for your field",
                "Practice storytelling techniques for better engagement"
            ])
        else:
            next_steps.extend([
                "Continue regular interview practice sessions",
                "Focus on advanced techniques like handling difficult questions",
                "Consider mock interviews with industry professionals"
            ])
        
        # Add general next steps
        next_steps.extend([
            "Schedule your next practice session within 3-5 days",
            "Review this feedback before your next session",
            "Track your progress over multiple sessions"
        ])
        
        return next_steps
    
    def _generate_improvement_plan(self, session_scores: FusedMetrics, 
                                  feedback: PersonalizedFeedback) -> Dict:
        """Generate structured improvement plan"""
        
        # Determine improvement timeline
        if session_scores.overall_score >= self.thresholds['excellent']:
            timeline = "1-2 weeks"
            focus = "refinement"
        elif session_scores.overall_score >= self.thresholds['good']:
            timeline = "2-4 weeks"
            focus = "enhancement"
        else:
            timeline = "4-8 weeks"
            focus = "fundamental_improvement"
        
        # Create weekly goals
        weekly_goals = self._create_weekly_goals(feedback.priority_focus, session_scores)
        
        # Recommended resources
        resources = self._recommend_resources(feedback.priority_focus)
        
        return {
            'timeline': timeline,
            'focus_area': focus,
            'priority_component': feedback.priority_focus,
            'weekly_goals': weekly_goals,
            'recommended_resources': resources,
            'success_metrics': self._define_success_metrics(session_scores)
        }
    
    def _create_weekly_goals(self, priority_focus: str, scores: FusedMetrics) -> List[Dict]:
        """Create weekly improvement goals"""
        goals = []
        
        if priority_focus == 'Body Language':
            goals = [
                {
                    'week': 1,
                    'goal': 'Improve posture consistency',
                    'target': 'Maintain good posture for 80% of practice time',
                    'activities': ['Daily posture exercises', 'Mirror practice sessions']
                },
                {
                    'week': 2,
                    'goal': 'Enhance eye contact',
                    'target': 'Achieve 85%+ eye contact score',
                    'activities': ['Camera eye contact drills', 'Video review sessions']
                }
            ]
        elif priority_focus == 'Vocal Delivery':
            goals = [
                {
                    'week': 1,
                    'goal': 'Optimize speaking pace',
                    'target': 'Maintain 140-160 WPM consistently',
                    'activities': ['Paced reading exercises', 'Metronome practice']
                },
                {
                    'week': 2,
                    'goal': 'Improve voice quality',
                    'target': 'Achieve 80%+ voice quality score',
                    'activities': ['Vocal warm-ups', 'Breathing exercises']
                }
            ]
        else:  # Content Quality
            goals = [
                {
                    'week': 1,
                    'goal': 'Reduce filler words',
                    'target': 'Less than 3 filler words per minute',
                    'activities': ['Pause practice', 'Mindful speaking exercises']
                },
                {
                    'week': 2,
                    'goal': 'Improve response structure',
                    'target': 'Use STAR method in 90% of responses',
                    'activities': ['STAR method practice', 'Story preparation']
                }
            ]
        
        return goals
    
    def _recommend_resources(self, priority_focus: str) -> List[Dict]:
        """Recommend specific resources for improvement"""
        resources = []
        
        if priority_focus == 'Body Language':
            resources = [
                {
                    'type': 'video',
                    'title': 'Professional Body Language Masterclass',
                    'description': 'Learn confident posture and gestures',
                    'duration': '45 minutes'
                },
                {
                    'type': 'exercise',
                    'title': 'Daily Posture Routine',
                    'description': '10-minute daily exercises for better posture',
                    'duration': '10 minutes daily'
                }
            ]
        elif priority_focus == 'Vocal Delivery':
            resources = [
                {
                    'type': 'course',
                    'title': 'Voice Training for Professionals',
                    'description': 'Improve vocal clarity and confidence',
                    'duration': '2 hours'
                },
                {
                    'type': 'app',
                    'title': 'Speech Pace Trainer',
                    'description': 'Practice optimal speaking speed',
                    'duration': '15 minutes daily'
                }
            ]
        else:  # Content Quality
            resources = [
                {
                    'type': 'guide',
                    'title': 'STAR Method Interview Guide',
                    'description': 'Structure compelling interview responses',
                    'duration': '30 minutes'
                },
                {
                    'type': 'practice',
                    'title': 'Common Interview Questions Bank',
                    'description': '100+ questions with sample answers',
                    'duration': '1-2 hours'
                }
            ]
        
        return resources
    
    def _define_success_metrics(self, current_scores: FusedMetrics) -> Dict:
        """Define success metrics for improvement tracking"""
        return {
            'target_overall_score': min(100, current_scores.overall_score + 15),
            'target_body_language': min(100, current_scores.body_language_score + 10),
            'target_vocal_delivery': min(100, current_scores.vocal_delivery_score + 10),
            'target_content_quality': min(100, current_scores.content_quality_score + 10),
            'measurement_frequency': 'weekly',
            'success_threshold': 85
        }
    
    def _calculate_detailed_metrics(self, all_pose_data: List, all_face_data: List,
                                   all_speech_data: List, all_voice_data: List) -> Dict:
        """Calculate detailed session metrics"""
        metrics = {}
        
        # Pose metrics
        if all_pose_data:
            valid_pose_data = [data for data in all_pose_data if data.get('status') == 'success']
            if valid_pose_data:
                posture_scores = [data['posture_metrics']['overall_posture'] for data in valid_pose_data]
                metrics['average_posture'] = np.mean(posture_scores)
                metrics['posture_consistency'] = 100 - np.std(posture_scores)
        
        # Face metrics
        if all_face_data:
            valid_face_data = [data for data in all_face_data if data.get('status') == 'success']
            if valid_face_data:
                eye_contact_scores = [data['eye_contact_metrics']['eye_contact_score'] for data in valid_face_data]
                metrics['average_eye_contact'] = np.mean(eye_contact_scores)
                metrics['eye_contact_consistency'] = 100 - np.std(eye_contact_scores)
        
        # Speech metrics
        if all_speech_data:
            valid_speech_data = [data for data in all_speech_data if data.get('status') == 'success']
            if valid_speech_data:
                speaking_rates = [data['content_metrics']['speaking_rate'] for data in valid_speech_data]
                filler_rates = [data['content_metrics']['filler_word_rate'] for data in valid_speech_data]
                metrics['average_speaking_rate'] = np.mean(speaking_rates)
                metrics['average_filler_rate'] = np.mean(filler_rates)
        
        # Voice metrics
        if all_voice_data:
            valid_voice_data = [data for data in all_voice_data if data.get('status') == 'success']
            if valid_voice_data:
                volume_levels = [data['voice_metrics']['volume_level'] for data in valid_voice_data]
                confidence_levels = [data['tone_metrics']['confidence_level'] for data in valid_voice_data]
                metrics['average_volume'] = np.mean(volume_levels)
                metrics['average_vocal_confidence'] = np.mean(confidence_levels)
        
        return metrics
    
    def _calculate_session_duration(self, all_pose_data: List) -> float:
        """Calculate total session duration"""
        if not all_pose_data:
            return 0
        
        timestamps = [data.get('timestamp', 0) for data in all_pose_data if data.get('timestamp')]
        if len(timestamps) >= 2:
            return max(timestamps) - min(timestamps)
        
        return 0
    
    def _load_feedback_templates(self) -> Dict:
        """Load feedback templates for different scenarios"""
        return {
            'excellent_performance': [
                "Outstanding interview performance! You demonstrate strong professional presence.",
                "Your confidence and communication skills are impressive.",
                "You're well-prepared and it shows in your delivery."
            ],
            'good_performance': [
                "Strong interview performance with good professional presence.",
                "You communicate effectively and show good preparation.",
                "Minor adjustments will help you reach the next level."
            ],
            'needs_improvement': [
                "Good foundation with clear areas for development.",
                "Focus on the specific areas highlighted for improvement.",
                "Regular practice will help you build confidence and skills."
            ]
        }