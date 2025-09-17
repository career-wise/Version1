// Interview Practice Types

export interface InterviewSession {
  id: string;
  type: 'college' | 'job';
  mode: 'quick' | 'mock' | 'custom';
  questions: InterviewQuestion[];
  startTime: Date;
  endTime?: Date;
  duration?: number;
  recordingEnabled: boolean;
  status: 'in-progress' | 'completed' | 'cancelled';
}

export interface InterviewQuestion {
  id: string;
  text: string;
  category: string;
  difficulty: 'easy' | 'medium' | 'hard';
  timeLimit: number;
  tags: string[];
  tips: string[];
}

export interface InterviewResponse {
  questionId: string;
  startTime: Date;
  endTime: Date;
  duration: number;
  transcript: string;
  audioBlob?: Blob;
  videoBlob?: Blob;
}

export interface LiveMetrics {
  timestamp: number;
  eyeContact: number; // 0-100
  posture: number; // 0-100
  voiceClarity: number; // 0-100
  speakingPace: number; // words per minute
  fillerWordCount: number;
  confidenceLevel: number; // 0-100
  volume: number; // 0-100
}

export interface LiveTip {
  id: string;
  message: string;
  type: 'body_language' | 'vocal' | 'content' | 'general';
  priority: 'low' | 'medium' | 'high';
  timestamp: number;
  duration: number; // how long to show the tip
}

export interface TimestampedFlag {
  timestamp: number;
  type: 'positive' | 'warning' | 'improvement' | 'neutral';
  category: 'body_language' | 'vocal' | 'content';
  message: string;
  severity: 'low' | 'medium' | 'high';
  suggestion?: string;
}

export interface InterviewReport {
  sessionId: string;
  overallScore: number; // 0-100
  subScores: {
    bodyLanguage: number;
    vocalDelivery: number;
    contentQuality: number;
    confidence: number;
  };
  metrics: {
    averageResponseTime: number;
    totalFillerWords: number;
    averageEyeContact: number;
    averagePosture: number;
    speakingPaceConsistency: number;
  };
  transcript: string;
  timestampedFlags: TimestampedFlag[];
  suggestions: string[];
  strengths: string[];
  areasForImprovement: string[];
  nextSteps: string[];
  detailedAnalysis: {
    questionAnalysis: Array<{
      questionId: string;
      score: number;
      feedback: string;
      keyPoints: string[];
    }>;
    behavioralInsights: string[];
    improvementPlan: string[];
  };
}

export interface AnalysisSettings {
  tipIntensity: 'low' | 'medium' | 'high';
  enableLiveTips: boolean;
  enableRecording: boolean;
  analysisDepth: 'basic' | 'detailed' | 'comprehensive';
  focusAreas: Array<'body_language' | 'vocal' | 'content'>;
}

export interface SessionHistory {
  sessions: InterviewSession[];
  totalSessions: number;
  averageScore: number;
  improvementTrend: 'improving' | 'stable' | 'declining';
  lastSessionDate: Date;
  streakDays: number;
}

export interface DrillSession {
  id: string;
  type: 'eye_contact' | 'filler_words' | 'pace_control' | 'posture' | 'confidence';
  name: string;
  description: string;
  duration: number; // in seconds
  exercises: DrillExercise[];
  targetMetric: string;
  improvementGoal: number;
}

export interface DrillExercise {
  id: string;
  name: string;
  instruction: string;
  duration: number;
  targetBehavior: string;
  successCriteria: string;
}

export interface AnnotationSchema {
  sessionId: string;
  annotations: Array<{
    timestamp: number;
    annotator: string;
    category: 'body_language' | 'vocal' | 'content' | 'overall';
    score: number; // 1-5 scale
    notes: string;
    tags: string[];
    confidence: number; // annotator confidence 0-100
  }>;
  overallRating: {
    bodyLanguage: number;
    vocal: number;
    content: number;
    overall: number;
  };
  qualitativeNotes: string;
  improvementSuggestions: string[];
}

export interface MLModelMetrics {
  accuracy: number;
  precision: number;
  recall: number;
  f1Score: number;
  correlationWithHumanRaters: number;
  latency: {
    visualProcessing: number; // ms
    audioProcessing: number; // ms
    fusedAnalysis: number; // ms
  };
  confidenceScores: {
    bodyLanguage: number;
    vocal: number;
    content: number;
  };
}