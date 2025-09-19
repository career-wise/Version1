"""
Data Preparation and Augmentation Pipeline
Comprehensive data processing for training interview analysis models
"""

import os
import cv2
import numpy as np
import librosa
import pandas as pd
from typing import Dict, List, Tuple, Optional
import json
import random
from pathlib import Path
import logging
from dataclasses import dataclass
import albumentations as A
from sklearn.model_selection import train_test_split
import albumentations as A

logger = logging.getLogger(__name__)

@dataclass
class DataSample:
    """Single training data sample"""
    session_id: str
    video_path: str
    audio_path: str
    annotation: Dict
    metadata: Dict

@dataclass
class ProcessedSample:
    """Processed training sample"""
    session_id: str
    video_features: np.ndarray
    audio_features: np.ndarray
    labels: Dict
    metadata: Dict

class DataPreparator:
    """
    Comprehensive data preparation pipeline for interview analysis
    Handles video/audio processing, feature extraction, and augmentation
    """
    
    def __init__(self, config: Dict):
        self.config = config
        
        # Video processing parameters
        self.target_fps = config.get('target_fps', 30)
        self.target_resolution = config.get('target_resolution', (640, 480))
        
        # Audio processing parameters
        self.target_sample_rate = config.get('target_sample_rate', 16000)
        self.audio_chunk_duration = config.get('audio_chunk_duration', 2.0)
        
        # Augmentation pipelines
        self.video_augmentation = self._create_video_augmentation_pipeline()
        self.audio_augmentation = self._create_audio_augmentation_pipeline()
        
        # Feature extraction
        self.extract_pose_features = config.get('extract_pose_features', True)
        self.extract_face_features = config.get('extract_face_features', True)
        self.extract_audio_features = config.get('extract_audio_features', True)
        
    def prepare_dataset(self, raw_data_dir: str, annotation_file: str, 
                       output_dir: str) -> Dict:
        """
        Prepare complete dataset for training
        
        Args:
            raw_data_dir: Directory containing raw video/audio files
            annotation_file: Path to annotation file
            output_dir: Output directory for processed data
            
        Returns:
            Dataset preparation summary
        """
        try:
            logger.info("Starting dataset preparation...")
            
            # Load annotations
            annotations = self._load_annotations(annotation_file)
            
            # Discover data files
            data_samples = self._discover_data_files(raw_data_dir, annotations)
            
            # Process samples
            processed_samples = []
            for sample in data_samples:
                processed = self._process_sample(sample)
                if processed:
                    processed_samples.append(processed)
            
            # Split dataset
            train_samples, val_samples, test_samples = self._split_dataset(processed_samples)
            
            # Save processed datasets
            self._save_processed_dataset(train_samples, f"{output_dir}/train")
            self._save_processed_dataset(val_samples, f"{output_dir}/val")
            self._save_processed_dataset(test_samples, f"{output_dir}/test")
            
            # Generate dataset statistics
            stats = self._generate_dataset_statistics(processed_samples)
            
            summary = {
                'total_samples': len(processed_samples),
                'train_samples': len(train_samples),
                'val_samples': len(val_samples),
                'test_samples': len(test_samples),
                'statistics': stats,
                'output_directory': output_dir
            }
            
            logger.info(f"Dataset preparation completed: {summary}")
            return summary
            
        except Exception as e:
            logger.error(f"Dataset preparation failed: {e}")
            return {"status": "error", "message": str(e)}
    
    def _load_annotations(self, annotation_file: str) -> Dict:
        """Load human annotations from file"""
        try:
            with open(annotation_file, 'r') as f:
                annotations = json.load(f)
            
            # Convert to session_id -> annotation mapping
            annotation_dict = {}
            for annotation in annotations:
                session_id = annotation['session_id']
                annotation_dict[session_id] = annotation
            
            return annotation_dict
            
        except Exception as e:
            logger.error(f"Error loading annotations: {e}")
            return {}
    
    def _discover_data_files(self, data_dir: str, annotations: Dict) -> List[DataSample]:
        """Discover and match video/audio files with annotations"""
        data_samples = []
        
        data_path = Path(data_dir)
        
        for session_id, annotation in annotations.items():
            # Look for corresponding video and audio files
            video_patterns = [f"{session_id}.mp4", f"{session_id}.avi", f"{session_id}.mov"]
            audio_patterns = [f"{session_id}.wav", f"{session_id}.mp3", f"{session_id}.m4a"]
            
            video_path = None
            audio_path = None
            
            # Find video file
            for pattern in video_patterns:
                potential_path = data_path / "videos" / pattern
                if potential_path.exists():
                    video_path = str(potential_path)
                    break
            
            # Find audio file
            for pattern in audio_patterns:
                potential_path = data_path / "audio" / pattern
                if potential_path.exists():
                    audio_path = str(potential_path)
                    break
            
            if video_path and audio_path:
                data_samples.append(DataSample(
                    session_id=session_id,
                    video_path=video_path,
                    audio_path=audio_path,
                    annotation=annotation,
                    metadata=annotation.get('sessionMetadata', {})
                ))
            else:
                logger.warning(f"Missing files for session {session_id}")
        
        logger.info(f"Discovered {len(data_samples)} complete data samples")
        return data_samples
    
    def _process_sample(self, sample: DataSample) -> Optional[ProcessedSample]:
        """Process a single data sample"""
        try:
            # Process video
            video_features = self._process_video(sample.video_path)
            if video_features is None:
                return None
            
            # Process audio
            audio_features = self._process_audio(sample.audio_path)
            if audio_features is None:
                return None
            
            # Extract labels from annotation
            labels = self._extract_labels(sample.annotation)
            
            return ProcessedSample(
                session_id=sample.session_id,
                video_features=video_features,
                audio_features=audio_features,
                labels=labels,
                metadata=sample.metadata
            )
            
        except Exception as e:
            logger.error(f"Error processing sample {sample.session_id}: {e}")
            return None
    
    def _process_video(self, video_path: str) -> Optional[np.ndarray]:
        """Process video file and extract features"""
        try:
            cap = cv2.VideoCapture(video_path)
            
            if not cap.isOpened():
                logger.error(f"Cannot open video: {video_path}")
                return None
            
            frames = []
            frame_count = 0
            
            while True:
                ret, frame = cap.read()
                if not ret:
                    break
                
                # Resize frame
                frame = cv2.resize(frame, self.target_resolution)
                
                # Apply augmentation (randomly)
                if random.random() < 0.3:  # 30% chance of augmentation
                    frame = self.video_augmentation(image=frame)['image']
                
                frames.append(frame)
                frame_count += 1
                
                # Limit frames for memory efficiency
                if frame_count >= 300:  # ~10 seconds at 30fps
                    break
            
            cap.release()
            
            if frames:
                return np.array(frames)
            else:
                return None
                
        except Exception as e:
            logger.error(f"Error processing video {video_path}: {e}")
            return None
    
    def _process_audio(self, audio_path: str) -> Optional[np.ndarray]:
        """Process audio file and extract features"""
        try:
            # Load audio
            audio, sr = librosa.load(audio_path, sr=self.target_sample_rate)
            
            # Apply augmentation (randomly)
            if random.random() < 0.3:  # 30% chance of augmentation
                audio = self._apply_audio_augmentation(audio, sr)
            
            # Extract features
            features = self._extract_audio_features(audio, sr)
            
            return features
            
        except Exception as e:
            logger.error(f"Error processing audio {audio_path}: {e}")
            return None
    
    def _extract_audio_features(self, audio: np.ndarray, sr: int) -> np.ndarray:
        """Extract comprehensive audio features"""
        features = []
        
        # MFCCs
        mfccs = librosa.feature.mfcc(y=audio, sr=sr, n_mfcc=13)
        features.append(np.mean(mfccs, axis=1))
        features.append(np.std(mfccs, axis=1))
        
        # Spectral features
        spectral_centroid = librosa.feature.spectral_centroid(y=audio, sr=sr)[0]
        spectral_bandwidth = librosa.feature.spectral_bandwidth(y=audio, sr=sr)[0]
        spectral_rolloff = librosa.feature.spectral_rolloff(y=audio, sr=sr)[0]
        
        features.extend([
            np.mean(spectral_centroid),
            np.std(spectral_centroid),
            np.mean(spectral_bandwidth),
            np.std(spectral_bandwidth),
            np.mean(spectral_rolloff),
            np.std(spectral_rolloff)
        ])
        
        # Rhythm features
        tempo, beats = librosa.beat.beat_track(y=audio, sr=sr)
        features.append(tempo)
        
        # Energy features
        rms_energy = librosa.feature.rms(y=audio)[0]
        features.extend([
            np.mean(rms_energy),
            np.std(rms_energy)
        ])
        
        # Zero crossing rate
        zcr = librosa.feature.zero_crossing_rate(audio)[0]
        features.extend([
            np.mean(zcr),
            np.std(zcr)
        ])
        
        return np.array(features)
    
    def _extract_labels(self, annotation: Dict) -> Dict:
        """Extract training labels from annotation"""
        labels = {}
        
        # Overall scores
        overall_scores = annotation.get('overallScores', {})
        
        for component, score_data in overall_scores.items():
            if isinstance(score_data, dict) and 'score' in score_data:
                # Convert 1-5 scale to 0-100 scale
                labels[f'{component}_score'] = (score_data['score'] - 1) * 25
        
        # Timestamped annotations for detailed analysis
        timestamped = annotation.get('timestampedAnnotations', [])
        
        # Aggregate timestamped scores by category
        category_scores = {}
        for annotation_item in timestamped:
            category = annotation_item.get('category')
            score = annotation_item.get('score', 3)  # Default to middle score
            
            if category not in category_scores:
                category_scores[category] = []
            category_scores[category].append((score - 1) * 25)  # Convert to 0-100
        
        # Average category scores
        for category, scores in category_scores.items():
            labels[f'{category}_detailed_score'] = np.mean(scores)
        
        return labels
    
    def _create_video_augmentation_pipeline(self) -> A.Compose:
        """Create video augmentation pipeline"""
        return A.Compose([
            A.RandomBrightnessContrast(brightness_limit=0.2, contrast_limit=0.2, p=0.5),
            A.HueSaturationValue(hue_shift_limit=10, sat_shift_limit=20, val_shift_limit=10, p=0.3),
            A.GaussNoise(var_limit=(10.0, 50.0), p=0.2),
            A.Blur(blur_limit=3, p=0.1),
            A.RandomGamma(gamma_limit=(80, 120), p=0.2)
        ])
    
    def _create_audio_augmentation_pipeline(self) -> Dict:
        """Create audio augmentation configuration"""
        return {
            'noise_factor': 0.005,
            'pitch_shift_range': (-2, 2),  # semitones
            'time_stretch_range': (0.9, 1.1),
            'volume_change_range': (0.8, 1.2)
        }
    
    def _apply_audio_augmentation(self, audio: np.ndarray, sr: int) -> np.ndarray:
        """Apply audio augmentation"""
        augmented = audio.copy()
        
        # Add noise
        if random.random() < 0.3:
            noise = np.random.normal(0, self.audio_augmentation['noise_factor'], audio.shape)
            augmented = audio + noise
        
        # Pitch shift
        if random.random() < 0.2:
            pitch_shift = random.uniform(*self.audio_augmentation['pitch_shift_range'])
            augmented = librosa.effects.pitch_shift(augmented, sr=sr, n_steps=pitch_shift)
        
        # Time stretch
        if random.random() < 0.2:
            stretch_factor = random.uniform(*self.audio_augmentation['time_stretch_range'])
            augmented = librosa.effects.time_stretch(augmented, rate=stretch_factor)
        
        # Volume change
        if random.random() < 0.3:
            volume_factor = random.uniform(*self.audio_augmentation['volume_change_range'])
            augmented = augmented * volume_factor
        
        return augmented
    
    def _split_dataset(self, samples: List[ProcessedSample]) -> Tuple[List, List, List]:
        """Split dataset into train/validation/test sets"""
        
        # Stratify by overall performance score if available
        stratify_labels = []
        for sample in samples:
            overall_score = sample.labels.get('overallPerformance_score', 50)
            # Create bins for stratification
            if overall_score >= 80:
                stratify_labels.append('high')
            elif overall_score >= 60:
                stratify_labels.append('medium')
            else:
                stratify_labels.append('low')
        
        # First split: train+val vs test (80% vs 20%)
        train_val_samples, test_samples = train_test_split(
            samples, 
            test_size=0.2, 
            stratify=stratify_labels,
            random_state=42
        )
        
        # Second split: train vs val (75% vs 25% of train+val)
        train_stratify = stratify_labels[:len(train_val_samples)]
        train_samples, val_samples = train_test_split(
            train_val_samples,
            test_size=0.25,
            stratify=train_stratify,
            random_state=42
        )
        
        return train_samples, val_samples, test_samples
    
    def _save_processed_dataset(self, samples: List[ProcessedSample], output_dir: str):
        """Save processed dataset to disk"""
        os.makedirs(output_dir, exist_ok=True)
        
        # Save features and labels separately
        video_features = []
        audio_features = []
        labels = []
        metadata = []
        
        for sample in samples:
            video_features.append(sample.video_features)
            audio_features.append(sample.audio_features)
            labels.append(sample.labels)
            metadata.append({
                'session_id': sample.session_id,
                'metadata': sample.metadata
            })
        
        # Save as numpy arrays
        np.save(f"{output_dir}/video_features.npy", np.array(video_features))
        np.save(f"{output_dir}/audio_features.npy", np.array(audio_features))
        
        # Save labels and metadata as JSON
        with open(f"{output_dir}/labels.json", 'w') as f:
            json.dump(labels, f, indent=2)
        
        with open(f"{output_dir}/metadata.json", 'w') as f:
            json.dump(metadata, f, indent=2)
        
        logger.info(f"Saved {len(samples)} processed samples to {output_dir}")
    
    def _generate_dataset_statistics(self, samples: List[ProcessedSample]) -> Dict:
        """Generate comprehensive dataset statistics"""
        stats = {
            'sample_count': len(samples),
            'label_distributions': {},
            'feature_statistics': {},
            'quality_metrics': {}
        }
        
        # Label distributions
        all_labels = {}
        for sample in samples:
            for label_name, label_value in sample.labels.items():
                if label_name not in all_labels:
                    all_labels[label_name] = []
                all_labels[label_name].append(label_value)
        
        for label_name, values in all_labels.items():
            stats['label_distributions'][label_name] = {
                'mean': np.mean(values),
                'std': np.std(values),
                'min': np.min(values),
                'max': np.max(values),
                'median': np.median(values)
            }
        
        # Feature statistics
        if samples:
            video_shapes = [sample.video_features.shape for sample in samples]
            audio_shapes = [sample.audio_features.shape for sample in samples]
            
            stats['feature_statistics'] = {
                'video_feature_shape': video_shapes[0] if video_shapes else None,
                'audio_feature_shape': audio_shapes[0] if audio_shapes else None,
                'consistent_video_shapes': len(set(video_shapes)) == 1,
                'consistent_audio_shapes': len(set(audio_shapes)) == 1
            }
        
        return stats
    
    def create_synthetic_data(self, base_samples: List[ProcessedSample], 
                            augmentation_factor: int = 2) -> List[ProcessedSample]:
        """Create synthetic training data through augmentation"""
        synthetic_samples = []
        
        for sample in base_samples:
            for _ in range(augmentation_factor):
                # Create augmented version
                augmented_video = self._augment_video_features(sample.video_features)
                augmented_audio = self._augment_audio_features(sample.audio_features)
                
                # Add noise to labels (slight variations)
                augmented_labels = self._augment_labels(sample.labels)
                
                synthetic_sample = ProcessedSample(
                    session_id=f"{sample.session_id}_aug_{len(synthetic_samples)}",
                    video_features=augmented_video,
                    audio_features=augmented_audio,
                    labels=augmented_labels,
                    metadata={**sample.metadata, 'synthetic': True}
                )
                
                synthetic_samples.append(synthetic_sample)
        
        logger.info(f"Generated {len(synthetic_samples)} synthetic samples")
        return synthetic_samples
    
    def _augment_video_features(self, video_features: np.ndarray) -> np.ndarray:
        """Augment video features"""
        # Apply random transformations to video features
        augmented = video_features.copy()
        
        # Add small amount of noise
        noise = np.random.normal(0, 0.01, augmented.shape)
        augmented = augmented + noise
        
        # Random scaling
        scale_factor = random.uniform(0.95, 1.05)
        augmented = augmented * scale_factor
        
        return augmented
    
    def _augment_audio_features(self, audio_features: np.ndarray) -> np.ndarray:
        """Augment audio features"""
        augmented = audio_features.copy()
        
        # Add noise
        noise = np.random.normal(0, 0.005, augmented.shape)
        augmented = augmented + noise
        
        # Random scaling
        scale_factor = random.uniform(0.98, 1.02)
        augmented = augmented * scale_factor
        
        return augmented
    
    def _augment_labels(self, labels: Dict) -> Dict:
        """Augment labels with small variations"""
        augmented = labels.copy()
        
        # Add small random variations to scores
        for label_name, value in labels.items():
            if isinstance(value, (int, float)) and 'score' in label_name:
                # Add small random variation (±2 points)
                variation = random.uniform(-2, 2)
                augmented[label_name] = max(0, min(100, value + variation))
        
        return augmented
    
    def validate_dataset_quality(self, dataset_dir: str) -> Dict:
        """Validate dataset quality and completeness"""
        validation_results = {
            'data_quality': {},
            'annotation_quality': {},
            'consistency_checks': {},
            'recommendations': []
        }
        
        try:
            # Load dataset
            train_dir = f"{dataset_dir}/train"
            val_dir = f"{dataset_dir}/val"
            test_dir = f"{dataset_dir}/test"
            
            # Check data completeness
            for split_name, split_dir in [('train', train_dir), ('val', val_dir), ('test', test_dir)]:
                if os.path.exists(split_dir):
                    video_features_path = f"{split_dir}/video_features.npy"
                    audio_features_path = f"{split_dir}/audio_features.npy"
                    labels_path = f"{split_dir}/labels.json"
                    
                    validation_results['data_quality'][split_name] = {
                        'video_features_exist': os.path.exists(video_features_path),
                        'audio_features_exist': os.path.exists(audio_features_path),
                        'labels_exist': os.path.exists(labels_path)
                    }
                    
                    if all(validation_results['data_quality'][split_name].values()):
                        # Check data shapes and consistency
                        video_features = np.load(video_features_path)
                        audio_features = np.load(audio_features_path)
                        
                        with open(labels_path, 'r') as f:
                            labels = json.load(f)
                        
                        validation_results['data_quality'][split_name].update({
                            'sample_count': len(video_features),
                            'video_shape': video_features.shape,
                            'audio_shape': audio_features.shape,
                            'labels_count': len(labels),
                            'shapes_consistent': len(video_features) == len(audio_features) == len(labels)
                        })
            
            # Generate recommendations
            if not all(validation_results['data_quality'].get('train', {}).values()):
                validation_results['recommendations'].append("Training data is incomplete")
            
            if validation_results['data_quality'].get('train', {}).get('sample_count', 0) < 100:
                validation_results['recommendations'].append("Consider collecting more training data")
            
        except Exception as e:
            validation_results['error'] = str(e)
        
        return validation_results

# Data collection utilities
class DataCollector:
    """Utilities for collecting training data"""
    
    @staticmethod
    def create_annotation_template(session_id: str) -> Dict:
        """Create annotation template for human annotators"""
        return {
            "version": "1.0",
            "sessionId": session_id,
            "annotatorId": "",
            "annotationDate": "",
            "sessionMetadata": {
                "duration": 0,
                "interviewType": "",
                "questionCount": 0,
                "recordingQuality": "",
                "technicalIssues": []
            },
            "timestampedAnnotations": [],
            "overallScores": {
                "bodyLanguage": {
                    "score": 3,
                    "confidence": 4,
                    "notes": "",
                    "subComponents": {
                        "eye_contact": {"score": 3, "weight": 0.4},
                        "posture": {"score": 3, "weight": 0.6}
                    }
                },
                "vocalDelivery": {
                    "score": 3,
                    "confidence": 4,
                    "notes": "",
                    "subComponents": {
                        "clarity": {"score": 3, "weight": 0.5},
                        "pace": {"score": 3, "weight": 0.5}
                    }
                },
                "contentQuality": {
                    "score": 3,
                    "confidence": 3,
                    "notes": "",
                    "subComponents": {
                        "relevance": {"score": 3, "weight": 0.5},
                        "structure": {"score": 3, "weight": 0.5}
                    }
                },
                "overallPerformance": {
                    "score": 3,
                    "confidence": 4,
                    "notes": "",
                    "subComponents": {
                        "combined": {"score": 3, "weight": 1.0}
                    }
                }
            },
            "qualitativeFeedback": {
                "strengths": [],
                "areasForImprovement": [],
                "specificSuggestions": [],
                "generalNotes": ""
            },
            "annotatorMetrics": {
                "confidenceLevel": 4,
                "annotationTime": 0,
                "previousExperience": "intermediate"
            }
        }
    
    @staticmethod
    def validate_annotation(annotation: Dict) -> List[str]:
        """Validate annotation completeness and quality"""
        errors = []
        
        # Check required fields
        required_fields = ['sessionId', 'annotatorId', 'overallScores']
        for field in required_fields:
            if field not in annotation:
                errors.append(f"Missing required field: {field}")
        
        # Check score ranges
        if 'overallScores' in annotation:
            for component, score_data in annotation['overallScores'].items():
                if isinstance(score_data, dict) and 'score' in score_data:
                    score = score_data['score']
                    if not (1 <= score <= 5):
                        errors.append(f"Score for {component} out of range (1-5): {score}")
        
        return errors

# Example usage
if __name__ == "__main__":
    # Configuration
    config = {
        'target_fps': 30,
        'target_resolution': (640, 480),
        'target_sample_rate': 16000,
        'audio_chunk_duration': 2.0
    }
    
    # Create data preparator
    preparator = DataPreparator(config)
    
    # Prepare dataset
    summary = preparator.prepare_dataset(
        raw_data_dir='data/raw',
        annotation_file='data/annotations.json',
        output_dir='data/processed'
    )
    
    print("Dataset preparation completed!")
    print(f"Summary: {summary}")