// ML Analysis Service for Interview Preparation
// This service would integrate with your ML backend for real-time analysis

export interface BodyLanguageMetrics {
  eyeContact: number;
  posture: number;
  handGestures: number;
  facialExpressions: number;
  headMovement: number;
  shoulderPosition: number;
}

export interface SpeechMetrics {
  clarity: number;
  pace: number;
  volume: number;
  fillerWords: number;
  confidence: number;
  articulation: number;
  tonality: number;
}

export interface MLAnalysisResult {
  bodyLanguage: BodyLanguageMetrics & { overall: number };
  speech: SpeechMetrics & { overall: number };
  recommendations: string[];
  strengths: string[];
  areasForImprovement: string[];
  timestamp: string;
  sessionId: string;
}

class MLAnalysisService {
  private baseUrl = import.meta.env.VITE_ML_API_URL || 'http://localhost:8001';
  private websocket: WebSocket | null = null;

  // Initialize real-time analysis session
  async startAnalysisSession(sessionId: string): Promise<void> {
    try {
      // In production, this would connect to your ML WebSocket endpoint
      this.websocket = new WebSocket(`${this.baseUrl}/ws/analysis/${sessionId}`);
      
      this.websocket.onopen = () => {
        console.log('ML Analysis session started');
      };

      this.websocket.onerror = (error) => {
        console.error('WebSocket error:', error);
      };
    } catch (error) {
      console.error('Failed to start analysis session:', error);
    }
  }

  // Send video frame for real-time body language analysis
  async analyzeVideoFrame(videoFrame: ImageData): Promise<Partial<BodyLanguageMetrics>> {
    try {
      // Convert ImageData to base64 for transmission
      const canvas = document.createElement('canvas');
      canvas.width = videoFrame.width;
      canvas.height = videoFrame.height;
      const ctx = canvas.getContext('2d');
      ctx?.putImageData(videoFrame, 0, 0);
      const frameData = canvas.toDataURL('image/jpeg', 0.8);

      // In production, send to your ML model endpoint
      const response = await fetch(`${this.baseUrl}/analyze/body-language`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          frame: frameData,
          timestamp: Date.now()
        })
      });

      if (!response.ok) {
        throw new Error('Failed to analyze video frame');
      }

      return await response.json();
    } catch (error) {
      console.error('Video frame analysis error:', error);
      // Return mock data for demo
      return {
        eyeContact: Math.random() * 100,
        posture: Math.random() * 100,
        handGestures: Math.random() * 100,
        facialExpressions: Math.random() * 100
      };
    }
  }

  // Send audio chunk for real-time speech analysis
  async analyzeAudioChunk(audioBlob: Blob): Promise<Partial<SpeechMetrics>> {
    try {
      const formData = new FormData();
      formData.append('audio', audioBlob);
      formData.append('timestamp', Date.now().toString());

      // In production, send to your ML model endpoint
      const response = await fetch(`${this.baseUrl}/analyze/speech`, {
        method: 'POST',
        body: formData
      });

      if (!response.ok) {
        throw new Error('Failed to analyze audio chunk');
      }

      return await response.json();
    } catch (error) {
      console.error('Audio chunk analysis error:', error);
      // Return mock data for demo
      return {
        clarity: Math.random() * 100,
        pace: Math.random() * 100,
        volume: Math.random() * 100,
        confidence: Math.random() * 100
      };
    }
  }

  // Perform comprehensive analysis on recorded session
  async analyzeCompleteSession(
    videoBlob: Blob, 
    audioBlob: Blob, 
    sessionId: string
  ): Promise<MLAnalysisResult> {
    try {
      const formData = new FormData();
      formData.append('video', videoBlob);
      formData.append('audio', audioBlob);
      formData.append('sessionId', sessionId);

      // In production, send to your comprehensive ML analysis endpoint
      const response = await fetch(`${this.baseUrl}/analyze/complete`, {
        method: 'POST',
        body: formData
      });

      if (!response.ok) {
        throw new Error('Failed to analyze complete session');
      }

      return await response.json();
    } catch (error) {
      console.error('Complete session analysis error:', error);
      
      // Return comprehensive mock data for demo
      return this.generateMockAnalysisResult(sessionId);
    }
  }

  // Generate personalized recommendations based on analysis
  async generateRecommendations(
    analysisResult: MLAnalysisResult,
    userProfile: any
  ): Promise<string[]> {
    try {
      const response = await fetch(`${this.baseUrl}/recommendations`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          analysis: analysisResult,
          profile: userProfile
        })
      });

      if (!response.ok) {
        throw new Error('Failed to generate recommendations');
      }

      const data = await response.json();
      return data.recommendations;
    } catch (error) {
      console.error('Recommendation generation error:', error);
      return this.generateMockRecommendations(analysisResult);
    }
  }

  // Close analysis session
  closeSession(): void {
    if (this.websocket) {
      this.websocket.close();
      this.websocket = null;
    }
  }

  // Mock data generators for demo purposes
  private generateMockAnalysisResult(sessionId: string): MLAnalysisResult {
    const bodyLanguageScores = {
      eyeContact: 70 + Math.random() * 25,
      posture: 75 + Math.random() * 20,
      handGestures: 65 + Math.random() * 30,
      facialExpressions: 80 + Math.random() * 15,
      headMovement: 85 + Math.random() * 10,
      shoulderPosition: 78 + Math.random() * 18
    };

    const speechScores = {
      clarity: 75 + Math.random() * 20,
      pace: 70 + Math.random() * 25,
      volume: 85 + Math.random() * 10,
      fillerWords: 60 + Math.random() * 30,
      confidence: 72 + Math.random() * 23,
      articulation: 80 + Math.random() * 15,
      tonality: 77 + Math.random() * 18
    };

    const bodyLanguageOverall = Object.values(bodyLanguageScores).reduce((a, b) => a + b, 0) / Object.keys(bodyLanguageScores).length;
    const speechOverall = Object.values(speechScores).reduce((a, b) => a + b, 0) / Object.keys(speechScores).length;

    return {
      bodyLanguage: {
        ...bodyLanguageScores,
        overall: Math.round(bodyLanguageOverall)
      },
      speech: {
        ...speechScores,
        overall: Math.round(speechOverall)
      },
      recommendations: this.generateMockRecommendations({ bodyLanguage: { ...bodyLanguageScores, overall: bodyLanguageOverall }, speech: { ...speechScores, overall: speechOverall } } as any),
      strengths: [
        "Good vocal volume and projection",
        "Excellent posture throughout the interview",
        "Natural facial expressions that convey engagement",
        "Clear articulation of key points"
      ],
      areasForImprovement: [
        "Eye contact consistency",
        "Reducing filler words",
        "Speaking pace control",
        "Hand gesture coordination"
      ],
      timestamp: new Date().toISOString(),
      sessionId
    };
  }

  private generateMockRecommendations(analysisResult: Partial<MLAnalysisResult>): string[] {
    const recommendations: string[] = [];

    if (analysisResult.bodyLanguage?.eyeContact && analysisResult.bodyLanguage.eyeContact < 75) {
      recommendations.push("Maintain more consistent eye contact with the camera - aim for 70-80% of the time");
    }

    if (analysisResult.speech?.fillerWords && analysisResult.speech.fillerWords < 70) {
      recommendations.push("Reduce the use of filler words like 'um' and 'uh' by pausing instead");
    }

    if (analysisResult.speech?.pace && analysisResult.speech.pace < 70) {
      recommendations.push("Speak slightly slower for better clarity and to appear more confident");
    }

    if (analysisResult.bodyLanguage?.handGestures && analysisResult.bodyLanguage.handGestures < 70) {
      recommendations.push("Use more purposeful hand gestures to emphasize points and appear more engaging");
    }

    if (analysisResult.bodyLanguage?.posture && analysisResult.bodyLanguage.posture < 80) {
      recommendations.push("Practice confident posture - sit up straight and lean slightly forward to show interest");
    }

    // Add default recommendations if none were generated
    if (recommendations.length === 0) {
      recommendations.push(
        "Continue practicing to maintain your strong performance",
        "Focus on storytelling techniques to make your answers more compelling",
        "Practice with different question types to build versatility"
      );
    }

    return recommendations;
  }
}

export const mlAnalysisService = new MLAnalysisService();