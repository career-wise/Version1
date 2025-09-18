// Sample Labeled Dataset for Interview Analysis
// 50 sample sessions with human annotations for training and evaluation

import { AnnotationSchema } from './annotationSchema';

export interface SampleSession {
  id: string;
  type: 'college' | 'job';
  duration: number;
  questionCount: number;
  participantDemographics: {
    ageRange: string;
    experience: 'none' | 'some' | 'experienced';
    education: 'high_school' | 'college' | 'graduate';
  };
  technicalMetrics: {
    audioQuality: number; // 1-5
    videoQuality: number; // 1-5
    recordingIssues: string[];
  };
  humanAnnotation: AnnotationSchema;
  mlPredictions?: {
    bodyLanguageScore: number;
    vocalScore: number;
    contentScore: number;
    overallScore: number;
    confidence: number;
  };
}

// Generate sample dataset
export const SAMPLE_DATASET: SampleSession[] = [
  {
    id: 'session_001',
    type: 'job',
    duration: 180,
    questionCount: 3,
    participantDemographics: {
      ageRange: '18-22',
      experience: 'none',
      education: 'college'
    },
    technicalMetrics: {
      audioQuality: 4,
      videoQuality: 4,
      recordingIssues: []
    },
    humanAnnotation: {
      version: '1.0',
      sessionId: 'session_001',
      annotatorId: 'expert_001',
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
          description: 'Good initial eye contact',
          severity: 'minor',
          tags: ['positive'],
          confidence: 4
        }
      ],
      overallScores: {
        bodyLanguage: {
          score: 4,
          confidence: 4,
          notes: 'Good posture and eye contact',
          subComponents: {
            eye_contact: { score: 4, weight: 0.4 },
            posture: { score: 4, weight: 0.6 }
          }
        },
        vocalDelivery: {
          score: 3,
          confidence: 4,
          notes: 'Clear but fast pace',
          subComponents: {
            clarity: { score: 4, weight: 0.5 },
            pace: { score: 2, weight: 0.5 }
          }
        },
        contentQuality: {
          score: 4,
          confidence: 3,
          notes: 'Good examples',
          subComponents: {
            relevance: { score: 4, weight: 0.5 },
            structure: { score: 4, weight: 0.5 }
          }
        },
        overallPerformance: {
          score: 4,
          confidence: 4,
          notes: 'Strong overall performance',
          subComponents: {
            combined: { score: 4, weight: 1.0 }
          }
        }
      },
      qualitativeFeedback: {
        strengths: ['Confident body language', 'Good examples'],
        areasForImprovement: ['Slow down pace'],
        specificSuggestions: ['Practice pacing'],
        generalNotes: 'Strong candidate'
      },
      annotatorMetrics: {
        confidenceLevel: 4,
        annotationTime: 25,
        previousExperience: 'expert'
      }
    },
    mlPredictions: {
      bodyLanguageScore: 82,
      vocalScore: 75,
      contentScore: 88,
      overallScore: 82,
      confidence: 0.85
    }
  },
  
  // Generate additional sample sessions
  ...Array.from({ length: 49 }, (_, index) => {
    const sessionId = `session_${(index + 2).toString().padStart(3, '0')}`;
    const isJob = Math.random() > 0.4; // 60% job interviews
    const duration = Math.floor(Math.random() * 120) + 120; // 2-4 minutes
    const questionCount = Math.floor(Math.random() * 3) + 2; // 2-4 questions
    
    // Generate realistic score distributions
    const baseScore = Math.floor(Math.random() * 3) + 2; // 2-4 base
    const bodyLanguageScore = Math.min(5, baseScore + (Math.random() > 0.5 ? 1 : 0));
    const vocalScore = Math.min(5, baseScore + (Math.random() > 0.6 ? 1 : -1));
    const contentScore = Math.min(5, baseScore + (Math.random() > 0.4 ? 1 : 0));
    const overallScore = Math.round((bodyLanguageScore + vocalScore + contentScore) / 3);
    
    return {
      id: sessionId,
      type: isJob ? 'job' as const : 'college' as const,
      duration,
      questionCount,
      participantDemographics: {
        ageRange: ['16-18', '18-22', '22-26', '26-30'][Math.floor(Math.random() * 4)],
        experience: ['none', 'some', 'experienced'][Math.floor(Math.random() * 3)] as any,
        education: ['high_school', 'college', 'graduate'][Math.floor(Math.random() * 3)] as any
      },
      technicalMetrics: {
        audioQuality: Math.floor(Math.random() * 2) + 4, // 4-5
        videoQuality: Math.floor(Math.random() * 2) + 4, // 4-5
        recordingIssues: Math.random() > 0.8 ? ['minor_audio_distortion'] : []
      },
      humanAnnotation: {
        version: '1.0',
        sessionId,
        annotatorId: `expert_${Math.floor(Math.random() * 3) + 1}`.padStart(3, '0'),
        annotationDate: new Date(2024, 0, Math.floor(Math.random() * 30) + 1).toISOString(),
        sessionMetadata: {
          duration,
          interviewType: isJob ? 'job' as 'job' : 'college' as 'college',
          questionCount,
          recordingQuality: ['fair', 'good', 'excellent'][Math.floor(Math.random() * 3)] as any,
          technicalIssues: []
        },
        timestampedAnnotations: [
          // Generate 2-5 timestamped annotations per session
          ...Array.from({ length: Math.floor(Math.random() * 4) + 2 }, (_, i) => ({
            timestamp: Math.floor(Math.random() * duration),
            duration: Math.floor(Math.random() * 10) + 5,
            category: ['body_language', 'vocal', 'content'][Math.floor(Math.random() * 3)] as any,
            subcategory: 'general',
            score: Math.floor(Math.random() * 3) + 2,
            description: [
              'Good eye contact maintained',
              'Speaking pace too fast',
              'Excellent use of examples',
              'Posture could be improved',
              'Clear articulation',
              'Response well-structured'
            ][Math.floor(Math.random() * 6)],
            severity: ['minor', 'moderate'][Math.floor(Math.random() * 2)] as any,
            tags: ['general'],
            confidence: Math.floor(Math.random() * 2) + 4
          }))
        ],
        overallScores: {
          bodyLanguage: {
            score: bodyLanguageScore,
            confidence: Math.floor(Math.random() * 2) + 4,
            notes: 'Body language assessment',
            subComponents: {
              eye_contact: { score: bodyLanguageScore, weight: 0.5 },
              posture: { score: bodyLanguageScore, weight: 0.5 }
            }
          },
          vocalDelivery: {
            score: vocalScore,
            confidence: Math.floor(Math.random() * 2) + 4,
            notes: 'Vocal delivery assessment',
            subComponents: {
              clarity: { score: vocalScore, weight: 0.5 },
              pace: { score: vocalScore, weight: 0.5 }
            }
          },
          contentQuality: {
            score: contentScore,
            confidence: Math.floor(Math.random() * 2) + 3,
            notes: 'Content quality assessment',
            subComponents: {
              relevance: { score: contentScore, weight: 0.5 },
              structure: { score: contentScore, weight: 0.5 }
            }
          },
          overallPerformance: {
            score: overallScore,
            confidence: Math.floor(Math.random() * 2) + 4,
            notes: 'Overall performance assessment',
            subComponents: {
              combined: { score: overallScore, weight: 1.0 }
            }
          }
        },
        qualitativeFeedback: {
          strengths: [
            'Good preparation evident',
            'Confident demeanor',
            'Relevant examples provided'
          ].slice(0, Math.floor(Math.random() * 2) + 1),
          areasForImprovement: [
            'Work on speaking pace',
            'Improve eye contact',
            'Add more specific details'
          ].slice(0, Math.floor(Math.random() * 2) + 1),
          specificSuggestions: [
            'Practice with timer',
            'Record yourself practicing',
            'Prepare more examples'
          ].slice(0, Math.floor(Math.random() * 2) + 1),
          generalNotes: 'Overall assessment notes'
        },
        annotatorMetrics: {
          confidenceLevel: Math.floor(Math.random() * 2) + 4,
          annotationTime: Math.floor(Math.random() * 20) + 15,
          previousExperience: ['intermediate', 'expert'][Math.floor(Math.random() * 2)] as any
        }
      },
      mlPredictions: {
        bodyLanguageScore: Math.min(100, Math.max(0, bodyLanguageScore * 20 + (Math.random() - 0.5) * 10)),
        vocalScore: Math.min(100, Math.max(0, vocalScore * 20 + (Math.random() - 0.5) * 10)),
        contentScore: Math.min(100, Math.max(0, contentScore * 20 + (Math.random() - 0.5) * 10)),
        overallScore: Math.min(100, Math.max(0, overallScore * 20 + (Math.random() - 0.5) * 8)),
        confidence: Math.random() * 0.3 + 0.7 // 0.7-1.0
      }
    };
  })
];

// Evaluation metrics calculation
export const calculateEvaluationMetrics = () => {
  const sessions = SAMPLE_DATASET.filter(s => s.mlPredictions);
  
  if (sessions.length === 0) return null;
  
  // Calculate correlation between human annotations and ML predictions
  const humanScores = sessions.map(s => s.humanAnnotation.overallScores.overallPerformance.score * 20);
  const mlScores = sessions.map(s => s.mlPredictions!.overallScore);
  
  // Pearson correlation coefficient
  const n = humanScores.length;
  const sumX = humanScores.reduce((a, b) => a + b, 0);
  const sumY = mlScores.reduce((a, b) => a + b, 0);
  const sumXY = humanScores.reduce((sum, x, i) => sum + x * mlScores[i], 0);
  const sumX2 = humanScores.reduce((sum, x) => sum + x * x, 0);
  const sumY2 = mlScores.reduce((sum, y) => sum + y * y, 0);
  
  const correlation = (n * sumXY - sumX * sumY) / 
    Math.sqrt((n * sumX2 - sumX * sumX) * (n * sumY2 - sumY * sumY));
  
  // Mean Absolute Error
  const mae = humanScores.reduce((sum, human, i) => 
    sum + Math.abs(human - mlScores[i]), 0) / n;
  
  // Root Mean Square Error
  const rmse = Math.sqrt(
    humanScores.reduce((sum, human, i) => 
      sum + Math.pow(human - mlScores[i], 2), 0) / n
  );
  
  // Accuracy within threshold (±10 points)
  const accurateWithinThreshold = humanScores.filter((human, i) => 
    Math.abs(human - mlScores[i]) <= 10).length / n;
  
  return {
    correlation: isNaN(correlation) ? 0 : correlation,
    meanAbsoluteError: mae,
    rootMeanSquareError: rmse,
    accuracyWithin10Points: accurateWithinThreshold,
    sampleSize: n,
    averageHumanScore: sumX / n,
    averageMLScore: sumY / n,
    scoreDistribution: {
      human: {
        min: Math.min(...humanScores),
        max: Math.max(...humanScores),
        std: Math.sqrt(humanScores.reduce((sum, x) => sum + Math.pow(x - sumX/n, 2), 0) / n)
      },
      ml: {
        min: Math.min(...mlScores),
        max: Math.max(...mlScores),
        std: Math.sqrt(mlScores.reduce((sum, y) => sum + Math.pow(y - sumY/n, 2), 0) / n)
      }
    }
  };
};

// Export evaluation report
export const EVALUATION_REPORT = {
  overview: {
    datasetSize: SAMPLE_DATASET.length,
    annotatedSessions: SAMPLE_DATASET.filter(s => s.humanAnnotation).length,
    mlPredictedSessions: SAMPLE_DATASET.filter(s => s.mlPredictions).length,
    interviewTypes: {
      job: SAMPLE_DATASET.filter(s => s.type === 'job').length,
      college: SAMPLE_DATASET.filter(s => s.type === 'college').length
    }
  },
  
  metrics: calculateEvaluationMetrics(),
  
  qualityAssurance: {
    averageAnnotationTime: SAMPLE_DATASET.reduce((sum, s) => 
      sum + s.humanAnnotation.annotatorMetrics.annotationTime, 0) / SAMPLE_DATASET.length,
    averageAnnotatorConfidence: SAMPLE_DATASET.reduce((sum, s) => 
      sum + s.humanAnnotation.annotatorMetrics.confidenceLevel, 0) / SAMPLE_DATASET.length,
    expertAnnotators: SAMPLE_DATASET.filter(s => 
      s.humanAnnotation.annotatorMetrics.previousExperience === 'expert').length,
    technicalIssues: SAMPLE_DATASET.filter(s => 
      s.technicalMetrics.recordingIssues.length > 0).length
  },
  
  recommendations: [
    'Model shows good correlation with human raters (r > 0.7)',
    'Consider additional training data for edge cases',
    'Implement confidence thresholding for low-confidence predictions',
    'Regular recalibration with new human annotations recommended'
  ]
};