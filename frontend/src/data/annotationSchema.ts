// Annotation Schema for Interview Sessions
// Used for labeling training data and evaluation

export interface AnnotationSchema {
  version: string;
  sessionId: string;
  annotatorId: string;
  annotationDate: string;
  
  // Overall session metadata
  sessionMetadata: {
    duration: number; // seconds
    interviewType: 'college' | 'job';
    questionCount: number;
    recordingQuality: 'poor' | 'fair' | 'good' | 'excellent';
    technicalIssues: string[];
  };
  
  // Time-stamped annotations
  timestampedAnnotations: TimestampedAnnotation[];
  
  // Overall scores (1-5 scale)
  overallScores: {
    bodyLanguage: OverallScore;
    vocalDelivery: OverallScore;
    contentQuality: OverallScore;
    overallPerformance: OverallScore;
  };
  
  // Qualitative feedback
  qualitativeFeedback: {
    strengths: string[];
    areasForImprovement: string[];
    specificSuggestions: string[];
    generalNotes: string;
  };
  
  // Annotator confidence and reliability
  annotatorMetrics: {
    confidenceLevel: number; // 1-5 scale
    annotationTime: number; // minutes spent annotating
    previousExperience: 'novice' | 'intermediate' | 'expert';
    interRaterReliability?: number; // if multiple annotators
  };
}

export interface TimestampedAnnotation {
  timestamp: number; // seconds from start
  duration: number; // seconds (for range annotations)
  category: 'body_language' | 'vocal' | 'content' | 'technical';
  subcategory: string;
  score: number; // 1-5 scale
  description: string;
  severity: 'minor' | 'moderate' | 'major';
  tags: string[];
  confidence: number; // 1-5 scale
}

export interface OverallScore {
  score: number; // 1-5 scale
  confidence: number; // 1-5 scale
  notes: string;
  subComponents: {
    [key: string]: {
      score: number;
      weight: number; // relative importance
    };
  };
}

// Predefined categories and subcategories for consistency
export const ANNOTATION_CATEGORIES = {
  body_language: {
    eye_contact: {
      name: 'Eye Contact',
      description: 'Frequency and naturalness of eye contact with camera',
      scale: {
        1: 'Rarely looks at camera, appears distracted',
        2: 'Occasional eye contact, often looking away',
        3: 'Moderate eye contact with some natural breaks',
        4: 'Good eye contact with appropriate breaks',
        5: 'Excellent, natural eye contact throughout'
      }
    },
    posture: {
      name: 'Posture',
      description: 'Body positioning and alignment',
      scale: {
        1: 'Slouched, poor posture throughout',
        2: 'Generally poor posture with brief improvements',
        3: 'Average posture, some slouching',
        4: 'Good posture with minor lapses',
        5: 'Excellent, confident posture maintained'
      }
    },
    facial_expressions: {
      name: 'Facial Expressions',
      description: 'Appropriateness and engagement of facial expressions',
      scale: {
        1: 'Inappropriate or no expressions',
        2: 'Limited range of expressions',
        3: 'Some appropriate expressions',
        4: 'Good range of appropriate expressions',
        5: 'Excellent, natural and engaging expressions'
      }
    },
    hand_gestures: {
      name: 'Hand Gestures',
      description: 'Use and appropriateness of hand movements',
      scale: {
        1: 'Distracting or inappropriate gestures',
        2: 'Minimal or awkward gestures',
        3: 'Some appropriate gestures',
        4: 'Good use of natural gestures',
        5: 'Excellent, purposeful and natural gestures'
      }
    }
  },
  
  vocal: {
    clarity: {
      name: 'Speech Clarity',
      description: 'Articulation and pronunciation',
      scale: {
        1: 'Difficult to understand, poor articulation',
        2: 'Some unclear speech, occasional mumbling',
        3: 'Generally clear with minor issues',
        4: 'Clear speech with good articulation',
        5: 'Excellent clarity and articulation'
      }
    },
    pace: {
      name: 'Speaking Pace',
      description: 'Speed and rhythm of speech',
      scale: {
        1: 'Too fast or too slow, difficult to follow',
        2: 'Pace issues that affect comprehension',
        3: 'Generally appropriate pace',
        4: 'Good pace with minor variations',
        5: 'Excellent, well-controlled pace'
      }
    },
    volume: {
      name: 'Volume',
      description: 'Appropriate volume level',
      scale: {
        1: 'Too quiet or too loud',
        2: 'Volume issues affecting clarity',
        3: 'Generally appropriate volume',
        4: 'Good volume control',
        5: 'Excellent, consistent volume'
      }
    },
    filler_words: {
      name: 'Filler Words',
      description: 'Frequency of "um", "uh", "like", etc.',
      scale: {
        1: 'Excessive filler words (>10 per minute)',
        2: 'Frequent filler words (6-10 per minute)',
        3: 'Moderate filler words (3-5 per minute)',
        4: 'Few filler words (1-2 per minute)',
        5: 'Minimal or no filler words'
      }
    },
    tone: {
      name: 'Tone and Inflection',
      description: 'Vocal variety and engagement',
      scale: {
        1: 'Monotone, disengaged',
        2: 'Limited vocal variety',
        3: 'Some vocal variation',
        4: 'Good vocal variety and engagement',
        5: 'Excellent, dynamic and engaging tone'
      }
    }
  },
  
  content: {
    relevance: {
      name: 'Response Relevance',
      description: 'How well responses address the questions',
      scale: {
        1: 'Responses do not address questions',
        2: 'Partially relevant responses',
        3: 'Generally relevant with some drift',
        4: 'Relevant and focused responses',
        5: 'Highly relevant and comprehensive responses'
      }
    },
    structure: {
      name: 'Response Structure',
      description: 'Organization and flow of responses',
      scale: {
        1: 'No clear structure, rambling',
        2: 'Poor structure, difficult to follow',
        3: 'Some structure with unclear points',
        4: 'Well-structured with clear points',
        5: 'Excellent structure, logical flow'
      }
    },
    examples: {
      name: 'Use of Examples',
      description: 'Quality and relevance of specific examples',
      scale: {
        1: 'No specific examples provided',
        2: 'Vague or irrelevant examples',
        3: 'Some relevant examples',
        4: 'Good, relevant examples',
        5: 'Excellent, compelling examples'
      }
    },
    depth: {
      name: 'Response Depth',
      description: 'Thoroughness and insight in responses',
      scale: {
        1: 'Superficial, lacks depth',
        2: 'Limited depth and insight',
        3: 'Adequate depth for most responses',
        4: 'Good depth and thoughtfulness',
        5: 'Excellent depth and insight'
      }
    }
  },
  
  technical: {
    audio_quality: {
      name: 'Audio Quality',
      description: 'Technical quality of audio recording',
      scale: {
        1: 'Poor audio, difficult to hear',
        2: 'Audio issues affecting comprehension',
        3: 'Acceptable audio quality',
        4: 'Good audio quality',
        5: 'Excellent audio quality'
      }
    },
    video_quality: {
      name: 'Video Quality',
      description: 'Technical quality of video recording',
      scale: {
        1: 'Poor video, difficult to see',
        2: 'Video issues affecting analysis',
        3: 'Acceptable video quality',
        4: 'Good video quality',
        5: 'Excellent video quality'
      }
    }
  }
};

// Helper functions for annotation validation
export const validateAnnotation = (annotation: AnnotationSchema): string[] => {
  const errors: string[] = [];
  
  // Check required fields
  if (!annotation.sessionId) errors.push('Session ID is required');
  if (!annotation.annotatorId) errors.push('Annotator ID is required');
  
  // Validate scores are in range
  Object.values(annotation.overallScores).forEach((score, index) => {
    if (score.score < 1 || score.score > 5) {
      errors.push(`Overall score ${index} must be between 1 and 5`);
    }
  });
  
  // Validate timestamped annotations
  annotation.timestampedAnnotations.forEach((ta, index) => {
    if (ta.score < 1 || ta.score > 5) {
      errors.push(`Timestamped annotation ${index} score must be between 1 and 5`);
    }
    if (ta.timestamp < 0) {
      errors.push(`Timestamped annotation ${index} timestamp cannot be negative`);
    }
  });
  
  return errors;
};

export const calculateInterRaterReliability = (
  annotations: AnnotationSchema[]
): number => {
  if (annotations.length < 2) return 0;
  
  // Simplified correlation calculation for overall scores
  const scores = annotations.map(a => [
    a.overallScores.bodyLanguage.score,
    a.overallScores.vocalDelivery.score,
    a.overallScores.contentQuality.score,
    a.overallScores.overallPerformance.score
  ]);
  
  // Calculate Pearson correlation coefficient
  // This is a simplified implementation - in practice, you'd use a proper statistical library
  let correlation = 0;
  for (let i = 0; i < scores[0].length; i++) {
    const values = scores.map(s => s[i]);
    const mean = values.reduce((a, b) => a + b) / values.length;
    const variance = values.reduce((sum, val) => sum + Math.pow(val - mean, 2), 0) / values.length;
    correlation += variance > 0 ? 1 - (variance / 4) : 1; // Normalized to 0-1
  }
  
  return correlation / scores[0].length;
};

// Export sample annotation for testing
export const SAMPLE_ANNOTATION: AnnotationSchema = {
  version: '1.0',
  sessionId: 'session_001',
  annotatorId: 'annotator_001',
  annotationDate: '2024-01-15T10:30:00Z',
  
  sessionMetadata: {
    duration: 180,
    interviewType: 'job',
    questionCount: 3,
    recordingQuality: 'good',
    technicalIssues: []
  },
  
  timestampedAnnotations: [
    {
      timestamp: 15,
      duration: 5,
      category: 'body_language',
      subcategory: 'eye_contact',
      score: 4,
      description: 'Good initial eye contact, appears confident',
      severity: 'minor',
      tags: ['positive', 'confidence'],
      confidence: 4
    },
    {
      timestamp: 45,
      duration: 10,
      category: 'vocal',
      subcategory: 'pace',
      score: 2,
      description: 'Speaking too quickly, difficult to follow',
      severity: 'moderate',
      tags: ['pace', 'clarity'],
      confidence: 5
    }
  ],
  
  overallScores: {
    bodyLanguage: {
      score: 4,
      confidence: 4,
      notes: 'Generally good posture and eye contact',
      subComponents: {
        eye_contact: { score: 4, weight: 0.4 },
        posture: { score: 4, weight: 0.3 },
        facial_expressions: { score: 3, weight: 0.2 },
        hand_gestures: { score: 4, weight: 0.1 }
      }
    },
    vocalDelivery: {
      score: 3,
      confidence: 4,
      notes: 'Clear speech but pace issues',
      subComponents: {
        clarity: { score: 4, weight: 0.3 },
        pace: { score: 2, weight: 0.3 },
        volume: { score: 4, weight: 0.2 },
        filler_words: { score: 3, weight: 0.1 },
        tone: { score: 3, weight: 0.1 }
      }
    },
    contentQuality: {
      score: 4,
      confidence: 3,
      notes: 'Good examples and structure',
      subComponents: {
        relevance: { score: 4, weight: 0.3 },
        structure: { score: 4, weight: 0.3 },
        examples: { score: 4, weight: 0.2 },
        depth: { score: 3, weight: 0.2 }
      }
    },
    overallPerformance: {
      score: 4,
      confidence: 4,
      notes: 'Strong performance with minor areas for improvement',
      subComponents: {
        body_language: { score: 4, weight: 0.3 },
        vocal: { score: 3, weight: 0.3 },
        content: { score: 4, weight: 0.4 }
      }
    }
  },
  
  qualitativeFeedback: {
    strengths: [
      'Confident body language and good eye contact',
      'Well-structured responses with relevant examples',
      'Clear articulation and good volume'
    ],
    areasForImprovement: [
      'Slow down speaking pace for better comprehension',
      'Reduce filler words during pauses',
      'Add more depth to responses'
    ],
    specificSuggestions: [
      'Practice speaking at 140-150 words per minute',
      'Use strategic pauses instead of filler words',
      'Prepare more detailed examples for common questions'
    ],
    generalNotes: 'Overall strong interview performance with good potential for improvement in vocal delivery.'
  },
  
  annotatorMetrics: {
    confidenceLevel: 4,
    annotationTime: 25,
    previousExperience: 'expert',
    interRaterReliability: 0.85
  }
};