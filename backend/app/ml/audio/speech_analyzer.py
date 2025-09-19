"""
Speech Content Analysis Component
Transcription, content quality, and communication effectiveness analysis
"""

import asyncio
import numpy as np
import librosa
import speech_recognition as sr
from typing import Dict, List, Optional
import time
import re
from dataclasses import dataclass
from textblob import TextBlob
import nltk
from collections import Counter

@dataclass
class ContentMetrics:
    """Speech content analysis metrics"""
    word_count: int
    speaking_rate: float          # words per minute
    filler_word_count: int
    filler_word_rate: float      # fillers per minute
    vocabulary_diversity: float   # 0-100
    sentence_complexity: float    # 0-100
    content_relevance: float     # 0-100

@dataclass
class CommunicationMetrics:
    """Communication effectiveness metrics"""
    clarity_score: float         # 0-100
    structure_score: float       # 0-100
    engagement_score: float      # 0-100
    professionalism_score: float # 0-100

class SpeechAnalyzer:
    """
    Real-time speech content and communication analysis
    Provides feedback on content quality and communication effectiveness
    """
    
    def __init__(self, config: Dict):
        self.config = config
        
        # Initialize speech recognition
        self.recognizer = sr.Recognizer()
        self.recognizer.energy_threshold = 300
        self.recognizer.dynamic_energy_threshold = True
        
        # Download required NLTK data
        try:
            nltk.data.find('tokenizers/punkt')
        except LookupError:
            nltk.download('punkt')
        
        try:
            nltk.data.find('corpora/stopwords')
        except LookupError:
            nltk.download('stopwords')
        
        # Filler words list
        self.filler_words = {
            'um', 'uh', 'like', 'you know', 'so', 'actually', 'basically',
            'literally', 'right', 'okay', 'well', 'i mean', 'sort of',
            'kind of', 'you see', 'obviously', 'clearly', 'honestly'
        }
        
        # Session data
        self.session_transcript = ""
        self.speech_segments = []
        self.analysis_history = []
        
        # Timing
        self.session_start_time = None
        
    async def initialize(self):
        """Initialize the speech analyzer"""
        self.session_transcript = ""
        self.speech_segments = []
        self.analysis_history = []
        self.session_start_time = time.time()
    
    def analyze(self, audio_chunk: np.ndarray, sample_rate: int = 16000) -> Dict:
        """
        Analyze speech content from audio chunk
        
        Args:
            audio_chunk: Audio data as numpy array
            sample_rate: Audio sample rate
            
        Returns:
            Dictionary containing speech analysis results
        """
        try:
            # Convert audio to format suitable for speech recognition
            audio_data = self._prepare_audio_for_recognition(audio_chunk, sample_rate)
            
            # Transcribe speech
            transcription = self._transcribe_audio(audio_data)
            
            if not transcription:
                return self._create_empty_result()
            
            # Update session transcript
            self.session_transcript += " " + transcription
            self.speech_segments.append({
                'timestamp': time.time(),
                'text': transcription,
                'duration': len(audio_chunk) / sample_rate
            })
            
            # Analyze content
            content_metrics = self._analyze_content(transcription)
            
            # Analyze communication effectiveness
            communication_metrics = self._analyze_communication(transcription)
            
            # Update history
            self._update_history(content_metrics, communication_metrics)
            
            # Generate feedback
            feedback = self._generate_speech_feedback(content_metrics, communication_metrics)
            
            return {
                'status': 'success',
                'transcription': transcription,
                'content_metrics': content_metrics.__dict__,
                'communication_metrics': communication_metrics.__dict__,
                'feedback': feedback,
                'timestamp': time.time()
            }
            
        except Exception as e:
            return {'status': 'error', 'message': str(e)}
    
    def _prepare_audio_for_recognition(self, audio_chunk: np.ndarray, sample_rate: int) -> sr.AudioData:
        """Prepare audio data for speech recognition"""
        # Ensure audio is in the right format
        if audio_chunk.dtype != np.int16:
            audio_chunk = (audio_chunk * 32767).astype(np.int16)
        
        # Convert to bytes
        audio_bytes = audio_chunk.tobytes()
        
        # Create AudioData object
        audio_data = sr.AudioData(audio_bytes, sample_rate, 2)  # 2 bytes per sample
        
        return audio_data
    
    def _transcribe_audio(self, audio_data: sr.AudioData) -> Optional[str]:
        """Transcribe audio to text using speech recognition"""
        try:
            # Use Google Speech Recognition (free tier)
            text = self.recognizer.recognize_google(audio_data, language='en-US')
            return text.strip()
        except sr.UnknownValueError:
            # Speech was unintelligible
            return None
        except sr.RequestError as e:
            # API error - fallback to offline recognition if available
            try:
                text = self.recognizer.recognize_sphinx(audio_data)
                return text.strip()
            except:
                return None
    
        except sr.UnknownValueError:
            # Speech was unintelligible - return None
            return None
        except Exception as e:
            # Any other error - return None
            self.logger.warning(f"Speech recognition error: {e}")
            return None
    def _analyze_content(self, text: str) -> ContentMetrics:
        """Analyze speech content quality"""
        
        # Basic text metrics
        words = text.split()
        word_count = len(words)
        
        # Calculate speaking rate
        if self.session_start_time:
            elapsed_time = time.time() - self.session_start_time
            speaking_rate = (word_count / max(elapsed_time / 60, 0.1))  # WPM
        else:
            speaking_rate = 0
        
        # Count filler words
        text_lower = text.lower()
        filler_count = 0
        for filler in self.filler_words:
            filler_count += text_lower.count(filler)
        
        # Calculate filler rate
        if self.session_start_time:
            elapsed_time = time.time() - self.session_start_time
            filler_rate = filler_count / max(elapsed_time / 60, 0.1)  # Fillers per minute
        else:
            filler_rate = 0
        
        # Vocabulary diversity (unique words / total words)
        unique_words = set(word.lower() for word in words if word.isalpha())
        vocabulary_diversity = (len(unique_words) / max(word_count, 1)) * 100
        
        # Sentence complexity using TextBlob
        blob = TextBlob(text)
        sentences = blob.sentences
        
        if sentences:
            avg_sentence_length = sum(len(sentence.words) for sentence in sentences) / len(sentences)
            sentence_complexity = min(100, (avg_sentence_length / 15) * 100)  # 15 words = 100%
        else:
            sentence_complexity = 0
        
        # Content relevance (simplified - would use more sophisticated NLP in production)
        content_relevance = self._calculate_content_relevance(text)
        
        return ContentMetrics(
            word_count=word_count,
            speaking_rate=speaking_rate,
            filler_word_count=filler_count,
            filler_word_rate=filler_rate,
            vocabulary_diversity=vocabulary_diversity,
            sentence_complexity=sentence_complexity,
            content_relevance=content_relevance
        )
    
    def _analyze_communication(self, text: str) -> CommunicationMetrics:
        """Analyze communication effectiveness"""
        
        # Clarity score (based on sentence structure and grammar)
        clarity_score = self._calculate_clarity_score(text)
        
        # Structure score (logical flow and organization)
        structure_score = self._calculate_structure_score(text)
        
        # Engagement score (use of examples, questions, etc.)
        engagement_score = self._calculate_engagement_score(text)
        
        # Professionalism score (appropriate language and tone)
        professionalism_score = self._calculate_professionalism_score(text)
        
        return CommunicationMetrics(
            clarity_score=clarity_score,
            structure_score=structure_score,
            engagement_score=engagement_score,
            professionalism_score=professionalism_score
        )
    
    def _calculate_clarity_score(self, text: str) -> float:
        """Calculate speech clarity based on grammar and structure"""
        blob = TextBlob(text)
        
        # Grammar and spelling check
        corrected = str(blob.correct())
        similarity = self._text_similarity(text, corrected)
        
        # Sentence completeness
        sentences = blob.sentences
        complete_sentences = sum(1 for s in sentences if str(s).strip().endswith(('.', '!', '?')))
        completeness = (complete_sentences / max(len(sentences), 1)) * 100
        
        # Combine metrics
        clarity_score = (similarity * 100 + completeness) / 2
        
        return min(100, clarity_score)
    
    def _calculate_structure_score(self, text: str) -> float:
        """Calculate logical structure and flow"""
        # Look for transition words and logical connectors
        transition_words = {
            'first', 'second', 'third', 'next', 'then', 'finally',
            'however', 'therefore', 'because', 'since', 'although',
            'for example', 'in addition', 'furthermore', 'moreover'
        }
        
        text_lower = text.lower()
        transition_count = sum(1 for word in transition_words if word in text_lower)
        
        # Calculate structure score based on transitions and length
        words = text.split()
        if len(words) > 0:
            transition_density = (transition_count / len(words)) * 100
            structure_score = min(100, transition_density * 20 + 50)  # Base 50 + bonus
        else:
            structure_score = 0
        
        return structure_score
    
    def _calculate_engagement_score(self, text: str) -> float:
        """Calculate engagement level of speech content"""
        # Look for engaging elements
        engaging_elements = {
            'example': 2, 'experience': 2, 'learned': 1, 'achieved': 2,
            'challenge': 1, 'success': 2, 'project': 1, 'team': 1,
            'result': 2, 'impact': 2, 'improved': 2, 'created': 1
        }
        
        text_lower = text.lower()
        engagement_score = 50  # Base score
        
        for element, weight in engaging_elements.items():
            if element in text_lower:
                engagement_score += weight * 5  # Each element adds points
        
        return min(100, engagement_score)
    
    def _calculate_professionalism_score(self, text: str) -> float:
        """Calculate professionalism of language used"""
        # Check for professional language patterns
        professional_indicators = {
            'responsible', 'leadership', 'collaboration', 'achievement',
            'professional', 'development', 'skills', 'experience',
            'opportunity', 'challenge', 'solution', 'result'
        }
        
        # Check for unprofessional elements
        unprofessional_indicators = {
            'like', 'totally', 'awesome', 'cool', 'whatever',
            'stuff', 'things', 'kinda', 'sorta', 'yeah'
        }
        
        text_lower = text.lower()
        words = text_lower.split()
        
        if not words:
            return 50
        
        professional_count = sum(1 for word in professional_indicators if word in text_lower)
        unprofessional_count = sum(1 for word in unprofessional_indicators if word in text_lower)
        
        # Calculate score
        professional_ratio = professional_count / len(words)
        unprofessional_ratio = unprofessional_count / len(words)
        
        professionalism_score = 70 + (professional_ratio * 200) - (unprofessional_ratio * 300)
        
        return max(0, min(100, professionalism_score))
    
    def _calculate_content_relevance(self, text: str) -> float:
        """Calculate relevance of content to interview context"""
        # Keywords that indicate relevant interview content
        relevant_keywords = {
            'experience', 'skills', 'education', 'project', 'team',
            'challenge', 'achievement', 'goal', 'strength', 'weakness',
            'learn', 'develop', 'improve', 'contribute', 'passion',
            'interest', 'career', 'future', 'opportunity'
        }
        
        text_lower = text.lower()
        words = text_lower.split()
        
        if not words:
            return 50
        
        relevant_count = sum(1 for word in relevant_keywords if word in text_lower)
        relevance_ratio = relevant_count / len(words)
        
        # Convert to 0-100 scale
        relevance_score = min(100, relevance_ratio * 500 + 30)  # Base 30 + bonus
        
        return relevance_score
    
    def _text_similarity(self, text1: str, text2: str) -> float:
        """Calculate similarity between two texts"""
        # Simple character-based similarity
        if not text1 or not text2:
            return 0
        
        # Calculate Levenshtein distance ratio
        import difflib
        similarity = difflib.SequenceMatcher(None, text1.lower(), text2.lower()).ratio()
        
        return similarity
    
    def _update_history(self, content_metrics: ContentMetrics, 
                       communication_metrics: CommunicationMetrics):
        """Update speech analysis history"""
        self.analysis_history.append({
            'timestamp': time.time(),
            'content_metrics': content_metrics,
            'communication_metrics': communication_metrics
        })
        
        # Keep only recent history
        if len(self.analysis_history) > 50:
            self.analysis_history = self.analysis_history[-50:]
    
    def _generate_speech_feedback(self, content_metrics: ContentMetrics,
                                 communication_metrics: CommunicationMetrics) -> List[str]:
        """Generate actionable feedback based on speech analysis"""
        feedback = []
        
        # Speaking rate feedback
        if content_metrics.speaking_rate > 180:
            feedback.append("Try to slow down your speaking pace for better clarity")
        elif content_metrics.speaking_rate < 120:
            feedback.append("You can speak a bit faster to maintain engagement")
        elif content_metrics.speaking_rate >= 140 and content_metrics.speaking_rate <= 160:
            feedback.append("Perfect speaking pace! Very easy to follow")
        
        # Filler words feedback
        if content_metrics.filler_word_rate > 5:
            feedback.append("Try to reduce filler words like 'um' and 'uh'")
        elif content_metrics.filler_word_rate < 2:
            feedback.append("Excellent! Very few filler words")
        
        # Vocabulary diversity
        if content_metrics.vocabulary_diversity > 70:
            feedback.append("Great vocabulary variety! Your responses are engaging")
        elif content_metrics.vocabulary_diversity < 40:
            feedback.append("Try to use more varied vocabulary in your responses")
        
        # Communication effectiveness
        if communication_metrics.clarity_score > 85:
            feedback.append("Your communication is very clear and easy to understand")
        elif communication_metrics.clarity_score < 60:
            feedback.append("Focus on speaking more clearly and structuring your thoughts")
        
        if communication_metrics.structure_score > 80:
            feedback.append("Well-structured responses with good logical flow")
        elif communication_metrics.structure_score < 60:
            feedback.append("Try using transition words to improve response structure")
        
        return feedback
    
    def _create_empty_result(self) -> Dict:
        """Create result when no speech is detected"""
        return {
            'status': 'no_speech_detected',
            'transcription': '',
            'content_metrics': None,
            'communication_metrics': None,
            'feedback': ['Speak clearly into the microphone'],
            'timestamp': time.time()
        }
    
    def get_session_summary(self) -> Dict:
        """Generate summary of speech analysis for the session"""
        if not self.analysis_history:
            return {}
        
        # Calculate session-wide metrics
        total_words = sum(frame['content_metrics'].word_count for frame in self.analysis_history)
        total_fillers = sum(frame['content_metrics'].filler_word_count for frame in self.analysis_history)
        
        # Average scores
        avg_clarity = np.mean([frame['communication_metrics'].clarity_score for frame in self.analysis_history])
        avg_structure = np.mean([frame['communication_metrics'].structure_score for frame in self.analysis_history])
        avg_engagement = np.mean([frame['communication_metrics'].engagement_score for frame in self.analysis_history])
        avg_professionalism = np.mean([frame['communication_metrics'].professionalism_score for frame in self.analysis_history])
        
        # Session duration
        session_duration = time.time() - self.session_start_time if self.session_start_time else 0
        
        return {
            'total_words_spoken': total_words,
            'total_filler_words': total_fillers,
            'average_speaking_rate': total_words / max(session_duration / 60, 0.1),
            'filler_word_percentage': (total_fillers / max(total_words, 1)) * 100,
            'average_clarity_score': avg_clarity,
            'average_structure_score': avg_structure,
            'average_engagement_score': avg_engagement,
            'average_professionalism_score': avg_professionalism,
            'full_transcript': self.session_transcript.strip(),
            'session_duration_minutes': session_duration / 60,
            'speech_segments_count': len(self.speech_segments)
        }