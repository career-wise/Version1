"""
Voice Characteristics Analysis Component
Analyzes vocal delivery, tone, and audio quality
"""

import numpy as np
import librosa
from typing import Dict, List, Optional, Tuple
import time
from dataclasses import dataclass
from scipy import signal
from scipy.stats import entropy

@dataclass
class VoiceMetrics:
    """Voice analysis metrics"""
    pitch_mean: float           # Average fundamental frequency
    pitch_variance: float       # Pitch variation
    volume_level: float         # 0-100
    volume_consistency: float   # 0-100
    speech_rate: float          # syllables per second
    voice_quality: float        # 0-100

@dataclass
class ToneMetrics:
    """Voice tone analysis metrics"""
    confidence_level: float     # 0-100
    energy_level: float         # 0-100
    emotional_tone: str         # 'confident', 'nervous', 'calm', etc.
    tone_appropriateness: float # 0-100

class VoiceAnalyzer:
    """
    Real-time voice characteristics and tone analysis
    Provides feedback on vocal delivery and presentation quality
    """
    
    def __init__(self, config: Dict):
        self.config = config
        
        # Audio processing parameters
        self.sample_rate = config.get('sample_rate', 16000)
        self.frame_length = config.get('frame_length', 2048)
        self.hop_length = config.get('hop_length', 512)
        
        # Voice analysis history
        self.voice_history = []
        self.max_history = 50
        
        # Baseline voice characteristics
        self.baseline_pitch = None
        self.baseline_volume = None
        self.calibration_frames = 0
        self.calibration_required = 10
        
    async def initialize(self):
        """Initialize the voice analyzer"""
        self.voice_history = []
        self.baseline_pitch = None
        self.baseline_volume = None
        self.calibration_frames = 0
    
    def analyze(self, audio_chunk: np.ndarray, sample_rate: int = None) -> Dict:
        """
        Analyze voice characteristics from audio chunk
        
        Args:
            audio_chunk: Audio data as numpy array
            sample_rate: Audio sample rate (optional, uses default if None)
            
        Returns:
            Dictionary containing voice analysis results
        """
        try:
            if sample_rate is None:
                sample_rate = self.sample_rate
            
            # Ensure audio is float32 and normalized
            if audio_chunk.dtype != np.float32:
                audio_chunk = audio_chunk.astype(np.float32)
            
            # Normalize audio
            if np.max(np.abs(audio_chunk)) > 0:
                audio_chunk = audio_chunk / np.max(np.abs(audio_chunk))
            
            # Check if audio contains speech
            if not self._contains_speech(audio_chunk):
                return self._create_empty_result()
            
            # Extract voice features
            voice_metrics = self._extract_voice_features(audio_chunk, sample_rate)
            
            # Analyze tone
            tone_metrics = self._analyze_tone(audio_chunk, sample_rate)
            
            # Calibrate baseline if needed
            if self.calibration_frames < self.calibration_required:
                self._calibrate_baseline(voice_metrics)
                return self._create_calibration_result()
            
            # Update history
            self._update_history(voice_metrics, tone_metrics)
            
            # Generate feedback
            feedback = self._generate_voice_feedback(voice_metrics, tone_metrics)
            
            return {
                'status': 'success',
                'voice_metrics': voice_metrics.__dict__,
                'tone_metrics': tone_metrics.__dict__,
                'feedback': feedback,
                'timestamp': time.time()
            }
            
        except Exception as e:
            return {'status': 'error', 'message': str(e)}
    
    def _contains_speech(self, audio_chunk: np.ndarray) -> bool:
        """Check if audio chunk contains speech"""
        # Simple energy-based speech detection
        energy = np.sum(audio_chunk ** 2)
        return energy > 0.001  # Threshold for speech presence
    
    def _extract_voice_features(self, audio: np.ndarray, sample_rate: int) -> VoiceMetrics:
        """Extract voice characteristics from audio"""
        
        # Pitch analysis using librosa
        pitches, magnitudes = librosa.piptrack(
            y=audio, 
            sr=sample_rate,
            threshold=0.1,
            fmin=80,   # Minimum frequency for human voice
            fmax=400   # Maximum frequency for human voice
        )
        
        # Extract fundamental frequency
        pitch_values = []
        for t in range(pitches.shape[1]):
            index = magnitudes[:, t].argmax()
            pitch = pitches[index, t]
            if pitch > 0:
                pitch_values.append(pitch)
        
        if pitch_values:
            pitch_mean = np.mean(pitch_values)
            pitch_variance = np.var(pitch_values)
        else:
            pitch_mean = 150  # Default pitch
            pitch_variance = 100
        
        # Volume analysis
        rms_energy = librosa.feature.rms(y=audio, frame_length=self.frame_length, hop_length=self.hop_length)[0]
        volume_level = np.mean(rms_energy) * 100
        volume_consistency = max(0, 100 - (np.std(rms_energy) * 1000))
        
        # Speech rate estimation (simplified)
        # In production, would use more sophisticated syllable detection
        zero_crossings = librosa.zero_crossings(audio, pad=False)
        speech_rate = np.sum(zero_crossings) / len(audio) * sample_rate / 2
        
        # Voice quality (based on spectral features)
        voice_quality = self._calculate_voice_quality(audio, sample_rate)
        
        return VoiceMetrics(
            pitch_mean=pitch_mean,
            pitch_variance=pitch_variance,
            volume_level=volume_level,
            volume_consistency=volume_consistency,
            speech_rate=speech_rate,
            voice_quality=voice_quality
        )
    
    def _analyze_tone(self, audio: np.ndarray, sample_rate: int) -> ToneMetrics:
        """Analyze voice tone and emotional characteristics"""
        
        # Extract spectral features for tone analysis
        mfccs = librosa.feature.mfcc(y=audio, sr=sample_rate, n_mfcc=13)
        spectral_centroid = librosa.feature.spectral_centroid(y=audio, sr=sample_rate)[0]
        spectral_rolloff = librosa.feature.spectral_rolloff(y=audio, sr=sample_rate)[0]
        
        # Confidence level (based on voice stability and energy)
        energy_variance = np.var(librosa.feature.rms(y=audio)[0])
        confidence_level = max(0, 100 - (energy_variance * 10000))
        
        # Energy level
        energy_level = np.mean(librosa.feature.rms(y=audio)[0]) * 100
        
        # Emotional tone classification (simplified)
        emotional_tone = self._classify_emotional_tone(mfccs, spectral_centroid)
        
        # Tone appropriateness for interview context
        tone_appropriateness = self._calculate_tone_appropriateness(
            confidence_level, energy_level, emotional_tone
        )
        
        return ToneMetrics(
            confidence_level=confidence_level,
            energy_level=energy_level,
            emotional_tone=emotional_tone,
            tone_appropriateness=tone_appropriateness
        )
    
    def _calculate_voice_quality(self, audio: np.ndarray, sample_rate: int) -> float:
        """Calculate overall voice quality score"""
        # Spectral features for quality assessment
        spectral_centroid = librosa.feature.spectral_centroid(y=audio, sr=sample_rate)[0]
        spectral_bandwidth = librosa.feature.spectral_bandwidth(y=audio, sr=sample_rate)[0]
        spectral_rolloff = librosa.feature.spectral_rolloff(y=audio, sr=sample_rate)[0]
        
        # Quality indicators
        centroid_stability = 100 - (np.std(spectral_centroid) / np.mean(spectral_centroid) * 100)
        bandwidth_quality = min(100, np.mean(spectral_bandwidth) / 1000 * 100)
        
        # Combine metrics
        voice_quality = (centroid_stability + bandwidth_quality) / 2
        
        return max(0, min(100, voice_quality))
    
    def _classify_emotional_tone(self, mfccs: np.ndarray, spectral_centroid: np.ndarray) -> str:
        """Classify emotional tone from voice features"""
        # Simplified emotion classification based on spectral features
        avg_mfcc = np.mean(mfccs, axis=1)
        avg_centroid = np.mean(spectral_centroid)
        
        # Basic classification rules (would use ML model in production)
        if avg_centroid > 2000 and avg_mfcc[1] > 0:
            return 'confident'
        elif avg_centroid < 1500 and avg_mfcc[1] < -5:
            return 'nervous'
        elif avg_mfcc[2] > 5:
            return 'enthusiastic'
        else:
            return 'calm'
    
    def _calculate_tone_appropriateness(self, confidence: float, energy: float, 
                                      emotional_tone: str) -> float:
        """Calculate appropriateness of tone for interview context"""
        base_score = 70
        
        # Adjust based on confidence
        if confidence > 70:
            base_score += 15
        elif confidence < 40:
            base_score -= 20
        
        # Adjust based on energy
        if 40 <= energy <= 80:  # Appropriate energy range
            base_score += 10
        elif energy < 20 or energy > 90:
            base_score -= 15
        
        # Adjust based on emotional tone
        tone_adjustments = {
            'confident': 15,
            'calm': 10,
            'enthusiastic': 5,
            'nervous': -10
        }
        
        base_score += tone_adjustments.get(emotional_tone, 0)
        
        return max(0, min(100, base_score))
    
    def _calibrate_baseline(self, voice_metrics: VoiceMetrics):
        """Calibrate baseline voice characteristics"""
        if self.baseline_pitch is None:
            self.baseline_pitch = voice_metrics.pitch_mean
            self.baseline_volume = voice_metrics.volume_level
        else:
            # Average with existing baseline
            self.baseline_pitch = (self.baseline_pitch + voice_metrics.pitch_mean) / 2
            self.baseline_volume = (self.baseline_volume + voice_metrics.volume_level) / 2
        
        self.calibration_frames += 1
    
    def _update_history(self, voice_metrics: VoiceMetrics, tone_metrics: ToneMetrics):
        """Update voice analysis history"""
        self.voice_history.append({
            'timestamp': time.time(),
            'voice_metrics': voice_metrics,
            'tone_metrics': tone_metrics
        })
        
        # Keep only recent history
        if len(self.voice_history) > self.max_history:
            self.voice_history = self.voice_history[-self.max_history:]
    
    def _generate_voice_feedback(self, voice_metrics: VoiceMetrics, 
                                tone_metrics: ToneMetrics) -> List[str]:
        """Generate actionable feedback based on voice analysis"""
        feedback = []
        
        # Volume feedback
        if voice_metrics.volume_level < 30:
            feedback.append("Speak a bit louder to ensure you're clearly heard")
        elif voice_metrics.volume_level > 80:
            feedback.append("Your volume is quite high - try speaking a bit softer")
        elif voice_metrics.volume_level >= 40 and voice_metrics.volume_level <= 70:
            feedback.append("Perfect volume level! Clear and comfortable to listen to")
        
        # Volume consistency
        if voice_metrics.volume_consistency < 60:
            feedback.append("Try to maintain consistent volume throughout your response")
        
        # Voice quality
        if voice_metrics.voice_quality > 80:
            feedback.append("Excellent voice quality - clear and professional")
        elif voice_metrics.voice_quality < 60:
            feedback.append("Focus on speaking clearly and avoid mumbling")
        
        # Tone feedback
        if tone_metrics.confidence_level > 80:
            feedback.append("Your voice conveys strong confidence!")
        elif tone_metrics.confidence_level < 50:
            feedback.append("Try to project more confidence through your voice")
        
        if tone_metrics.energy_level < 30:
            feedback.append("Add more energy and enthusiasm to your voice")
        elif tone_metrics.energy_level > 85:
            feedback.append("Great energy! You sound engaged and enthusiastic")
        
        return feedback
    
    def _create_empty_result(self) -> Dict:
        """Create result when no voice is detected"""
        return {
            'status': 'no_voice_detected',
            'voice_metrics': None,
            'tone_metrics': None,
            'feedback': ['Please speak into the microphone'],
            'timestamp': time.time()
        }
    
    def _create_calibration_result(self) -> Dict:
        """Create result during calibration phase"""
        return {
            'status': 'calibrating',
            'calibration_progress': self.calibration_frames / self.calibration_required,
            'message': f'Calibrating voice analysis... {self.calibration_frames}/{self.calibration_required}',
            'timestamp': time.time()
        }
    
    def get_session_summary(self) -> Dict:
        """Generate summary of voice analysis for the session"""
        if not self.voice_history:
            return {}
        
        # Calculate averages
        pitch_values = [frame['voice_metrics'].pitch_mean for frame in self.voice_history]
        volume_values = [frame['voice_metrics'].volume_level for frame in self.voice_history]
        confidence_values = [frame['tone_metrics'].confidence_level for frame in self.voice_history]
        energy_values = [frame['tone_metrics'].energy_level for frame in self.voice_history]
        
        return {
            'average_pitch': np.mean(pitch_values),
            'pitch_range': np.max(pitch_values) - np.min(pitch_values),
            'average_volume': np.mean(volume_values),
            'volume_consistency': 100 - np.std(volume_values),
            'average_confidence': np.mean(confidence_values),
            'average_energy': np.mean(energy_values),
            'voice_stability': self._calculate_voice_stability(),
            'total_frames_analyzed': len(self.voice_history)
        }
    
    def _calculate_voice_stability(self) -> float:
        """Calculate overall voice stability score"""
        if len(self.voice_history) < 5:
            return 75  # Default score
        
        # Analyze consistency across multiple metrics
        pitch_values = [frame['voice_metrics'].pitch_mean for frame in self.voice_history]
        volume_values = [frame['voice_metrics'].volume_level for frame in self.voice_history]
        
        # Calculate coefficient of variation (lower = more stable)
        pitch_cv = np.std(pitch_values) / max(np.mean(pitch_values), 1)
        volume_cv = np.std(volume_values) / max(np.mean(volume_values), 1)
        
        # Convert to stability score
        stability = max(0, 100 - ((pitch_cv + volume_cv) * 50))
        
        return stability