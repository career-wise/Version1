import librosa
import numpy as np
import speech_recognition as sr
from typing import Dict, List, Optional
import logging
import io
import wave
from pydub import AudioSegment

logger = logging.getLogger(__name__)

class SpeechAnalyzer:
    """
    Analyzes speech patterns for interview assessment
    """
    
    def __init__(self):
        self.recognizer = sr.Recognizer()
        self.filler_words = [
            'um', 'uh', 'er', 'ah', 'like', 'you know', 'so', 'well',
            'actually', 'basically', 'literally', 'right', 'okay'
        ]
        
        # Session tracking
        self.total_speech_time = 0
        self.total_silence_time = 0
        self.word_count = 0
        self.filler_word_count = 0
        self.speech_segments = []
        
    def analyze_audio_chunk(self, audio_data: bytes) -> Dict[str, float]:
        """
        Analyze an audio chunk for speech metrics
        
        Args:
            audio_data: Raw audio bytes
            
        Returns:
            Dictionary with speech analysis scores (0-100)
        """
        try:
            # Convert audio data to numpy array
            audio_segment = AudioSegment.from_file(io.BytesIO(audio_data))
            audio_array = np.array(audio_segment.get_array_of_samples())
            
            if audio_segment.channels == 2:
                audio_array = audio_array.reshape((-1, 2))
                audio_array = audio_array.mean(axis=1)
            
            # Normalize audio
            audio_array = audio_array.astype(np.float32) / np.iinfo(np.int16).max
            sample_rate = audio_segment.frame_rate
            
            # Analyze different speech aspects
            clarity_score = self._analyze_clarity(audio_array, sample_rate)
            pace_score = self._analyze_pace(audio_array, sample_rate)
            volume_score = self._analyze_volume(audio_array)
            confidence_score = self._analyze_confidence(audio_array, sample_rate)
            
            # Transcribe and analyze content
            filler_score = self._analyze_filler_words(audio_data)
            
            return {
                'clarity': clarity_score,
                'pace': pace_score,
                'volume': volume_score,
                'filler_words': filler_score,
                'confidence': confidence_score,
                'overall': (clarity_score + pace_score + volume_score + filler_score + confidence_score) / 5
            }
            
        except Exception as e:
            logger.error(f"Error analyzing audio chunk: {e}")
            return {
                'clarity': 0,
                'pace': 0,
                'volume': 0,
                'filler_words': 0,
                'confidence': 0,
                'overall': 0
            }
    
    def _analyze_clarity(self, audio: np.ndarray, sample_rate: int) -> float:
        """Analyze speech clarity using spectral features"""
        try:
            # Calculate spectral centroid (brightness)
            spectral_centroids = librosa.feature.spectral_centroid(y=audio, sr=sample_rate)[0]
            
            # Calculate spectral rolloff
            spectral_rolloff = librosa.feature.spectral_rolloff(y=audio, sr=sample_rate)[0]
            
            # Calculate zero crossing rate
            zcr = librosa.feature.zero_crossing_rate(audio)[0]
            
            # Combine features for clarity score
            clarity_features = np.concatenate([spectral_centroids, spectral_rolloff, zcr])
            clarity_score = min(100, np.mean(clarity_features) * 100)
            
            return max(0, clarity_score)
            
        except Exception as e:
            logger.error(f"Error analyzing clarity: {e}")
            return 0
    
    def _analyze_pace(self, audio: np.ndarray, sample_rate: int) -> float:
        """Analyze speaking pace"""
        try:
            # Detect speech segments using energy-based VAD
            frame_length = int(0.025 * sample_rate)  # 25ms frames
            hop_length = int(0.01 * sample_rate)     # 10ms hop
            
            # Calculate RMS energy
            rms = librosa.feature.rms(y=audio, frame_length=frame_length, hop_length=hop_length)[0]
            
            # Threshold for speech detection
            threshold = np.mean(rms) * 0.3
            speech_frames = rms > threshold
            
            # Calculate speech rate
            speech_duration = np.sum(speech_frames) * hop_length / sample_rate
            
            if speech_duration > 0:
                # Estimate syllables using onset detection
                onset_frames = librosa.onset.onset_detect(y=audio, sr=sample_rate)
                syllable_rate = len(onset_frames) / speech_duration
                
                # Optimal rate is around 4-6 syllables per second
                optimal_rate = 5.0
                rate_deviation = abs(syllable_rate - optimal_rate) / optimal_rate
                pace_score = max(0, 100 - (rate_deviation * 100))
            else:
                pace_score = 0
            
            return pace_score
            
        except Exception as e:
            logger.error(f"Error analyzing pace: {e}")
            return 0
    
    def _analyze_volume(self, audio: np.ndarray) -> float:
        """Analyze volume consistency and appropriateness"""
        try:
            # Calculate RMS energy
            rms = np.sqrt(np.mean(audio**2))
            
            # Convert to dB
            if rms > 0:
                db_level = 20 * np.log10(rms)
                
                # Optimal range is around -20 to -10 dB for normalized audio
                optimal_min, optimal_max = -25, -5
                
                if optimal_min <= db_level <= optimal_max:
                    volume_score = 100
                elif db_level < optimal_min:
                    # Too quiet
                    volume_score = max(0, 100 + (db_level - optimal_min) * 2)
                else:
                    # Too loud
                    volume_score = max(0, 100 - (db_level - optimal_max) * 2)
            else:
                volume_score = 0
            
            return volume_score
            
        except Exception as e:
            logger.error(f"Error analyzing volume: {e}")
            return 0
    
    def _analyze_confidence(self, audio: np.ndarray, sample_rate: int) -> float:
        """Analyze confidence indicators in speech"""
        try:
            # Calculate pitch stability (confident speakers have stable pitch)
            pitches, magnitudes = librosa.piptrack(y=audio, sr=sample_rate)
            
            # Extract fundamental frequency
            f0 = []
            for t in range(pitches.shape[1]):
                index = magnitudes[:, t].argmax()
                pitch = pitches[index, t]
                if pitch > 0:
                    f0.append(pitch)
            
            if len(f0) > 1:
                # Calculate pitch stability (lower variance = more confident)
                pitch_variance = np.var(f0)
                pitch_stability = max(0, 100 - (pitch_variance / 1000))  # Scale factor
                
                # Calculate speech energy consistency
                rms = librosa.feature.rms(y=audio)[0]
                energy_consistency = max(0, 100 - (np.var(rms) * 10000))
                
                confidence_score = (pitch_stability + energy_consistency) / 2
            else:
                confidence_score = 0
            
            return confidence_score
            
        except Exception as e:
            logger.error(f"Error analyzing confidence: {e}")
            return 0
    
    def _analyze_filler_words(self, audio_data: bytes) -> float:
        """Analyze filler word usage through speech recognition"""
        try:
            # Convert audio for speech recognition
            audio_segment = AudioSegment.from_file(io.BytesIO(audio_data))
            
            # Convert to wav format for speech recognition
            wav_io = io.BytesIO()
            audio_segment.export(wav_io, format="wav")
            wav_io.seek(0)
            
            # Recognize speech
            with sr.AudioFile(wav_io) as source:
                audio_sr = self.recognizer.record(source)
                
            try:
                text = self.recognizer.recognize_google(audio_sr).lower()
                words = text.split()
                
                if len(words) > 0:
                    filler_count = sum(1 for word in words if word in self.filler_words)
                    filler_ratio = filler_count / len(words)
                    
                    # Score inversely related to filler ratio
                    filler_score = max(0, 100 - (filler_ratio * 200))
                    
                    # Update session stats
                    self.word_count += len(words)
                    self.filler_word_count += filler_count
                else:
                    filler_score = 100  # No words detected, assume no fillers
                    
            except sr.UnknownValueError:
                # Could not understand audio
                filler_score = 50  # Neutral score
            except sr.RequestError:
                # API error
                filler_score = 50
            
            return filler_score
            
        except Exception as e:
            logger.error(f"Error analyzing filler words: {e}")
            return 50
    
    def analyze_complete_audio(self, audio_data: bytes) -> Dict[str, float]:
        """Analyze complete audio recording"""
        try:
            # Split audio into chunks for analysis
            audio_segment = AudioSegment.from_file(io.BytesIO(audio_data))
            chunk_length = 5000  # 5 seconds
            
            chunk_results = []
            
            for i in range(0, len(audio_segment), chunk_length):
                chunk = audio_segment[i:i + chunk_length]
                chunk_bytes = chunk.export(format="wav").read()
                
                chunk_result = self.analyze_audio_chunk(chunk_bytes)
                chunk_results.append(chunk_result)
            
            # Average results across chunks
            if chunk_results:
                final_result = {}
                for key in chunk_results[0].keys():
                    final_result[key] = np.mean([result[key] for result in chunk_results])
                
                return final_result
            else:
                return {
                    'clarity': 0,
                    'pace': 0,
                    'volume': 0,
                    'filler_words': 0,
                    'confidence': 0,
                    'overall': 0
                }
                
        except Exception as e:
            logger.error(f"Error analyzing complete audio: {e}")
            return {
                'clarity': 0,
                'pace': 0,
                'volume': 0,
                'filler_words': 0,
                'confidence': 0,
                'overall': 0
            }
    
    def get_session_summary(self) -> Dict[str, float]:
        """Get session-wide speech statistics"""
        if self.word_count > 0:
            filler_percentage = (self.filler_word_count / self.word_count) * 100
        else:
            filler_percentage = 0
        
        return {
            'total_words': self.word_count,
            'filler_word_count': self.filler_word_count,
            'filler_percentage': filler_percentage,
            'speech_time': self.total_speech_time,
            'words_per_minute': (self.word_count / (self.total_speech_time / 60)) if self.total_speech_time > 0 else 0
        }
    
    def reset_session(self):
        """Reset session counters"""
        self.total_speech_time = 0
        self.total_silence_time = 0
        self.word_count = 0
        self.filler_word_count = 0
        self.speech_segments = []