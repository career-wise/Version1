// Interview Service for managing sessions and analysis

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

export interface SessionReport {
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
  duration: number;
  questionsAnswered: number;
}

export interface DeviceInfo {
  deviceId: string;
  label: string;
  kind: 'videoinput' | 'audioinput';
}

class InterviewService {
  private mediaStream: MediaStream | null = null;
  private mediaRecorder: MediaRecorder | null = null;
  private recordedChunks: Blob[] = [];
  private analysisInterval: NodeJS.Timeout | null = null;
  private tipInterval: NodeJS.Timeout | null = null;
  private sessionStartTime: Date | null = null;
  private currentMetrics: LiveMetrics = {
    timestamp: 0,
    eyeContact: 75,
    posture: 80,
    voiceClarity: 70,
    speakingPace: 140,
    fillerWordCount: 0,
    confidenceLevel: 78,
    volume: 65
  };
  private collectedMetrics: LiveMetrics[] = [];
  private timestampedFlags: TimestampedFlag[] = [];
  private lastTipTime = 0;

  async getAvailableDevices(): Promise<{ cameras: DeviceInfo[], microphones: DeviceInfo[] }> {
    try {
      const devices = await navigator.mediaDevices.enumerateDevices();
      
      const cameras = devices
        .filter(device => device.kind === 'videoinput')
        .map(device => ({
          deviceId: device.deviceId,
          label: device.label || `Camera ${device.deviceId.slice(0, 8)}`,
          kind: 'videoinput' as const
        }));

      const microphones = devices
        .filter(device => device.kind === 'audioinput')
        .map(device => ({
          deviceId: device.deviceId,
          label: device.label || `Microphone ${device.deviceId.slice(0, 8)}`,
          kind: 'audioinput' as const
        }));

      return { cameras, microphones };
    } catch (error) {
      console.error('Error getting devices:', error);
      return { cameras: [], microphones: [] };
    }
  }

  async startSession(options: {
    videoDeviceId?: string;
    audioDeviceId?: string;
    enableRecording?: boolean;
    tipIntensity?: 'low' | 'medium' | 'high';
  } = {}): Promise<{ success: boolean; error?: string; stream?: MediaStream }> {
    try {
      const constraints: MediaStreamConstraints = {
        video: options.videoDeviceId 
          ? { deviceId: { exact: options.videoDeviceId } }
          : { width: 640, height: 480 },
        audio: options.audioDeviceId
          ? { deviceId: { exact: options.audioDeviceId } }
          : true
      };

      const stream = await navigator.mediaDevices.getUserMedia(constraints);
      this.mediaStream = stream;
      this.sessionStartTime = new Date();
      this.collectedMetrics = [];
      this.timestampedFlags = [];

      // Start recording if enabled
      if (options.enableRecording) {
        this.startRecording(stream);
      }

      // Start analysis
      this.startAnalysis(options.tipIntensity || 'medium');

      return { success: true, stream };
    } catch (error) {
      console.error('Error starting session:', error);
      let errorMessage = 'Unable to access camera or microphone.';
      
      if (error instanceof Error) {
        if (error.name === 'NotAllowedError') {
          errorMessage = 'Camera and microphone access denied. Please allow permissions and try again.';
        } else if (error.name === 'NotFoundError') {
          errorMessage = 'No camera or microphone found. Please connect a device and try again.';
        } else if (error.name === 'NotReadableError') {
          errorMessage = 'Camera or microphone is already in use by another application.';
        }
      }

      return { success: false, error: errorMessage };
    }
  }

  private startRecording(stream: MediaStream): void {
    try {
      this.recordedChunks = [];
      this.mediaRecorder = new MediaRecorder(stream, {
        mimeType: 'video/webm;codecs=vp9,opus'
      });

      this.mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          this.recordedChunks.push(event.data);
        }
      };

      this.mediaRecorder.start(1000); // Collect data every second
    } catch (error) {
      console.error('Error starting recording:', error);
    }
  }

  private startAnalysis(tipIntensity: 'low' | 'medium' | 'high'): void {
    // Simulate real-time analysis
    this.analysisInterval = setInterval(() => {
      this.updateMetrics();
      this.detectFlags();
    }, 1000);

    // Generate tips based on intensity
    const tipIntervals = { low: 8000, medium: 6000, high: 4000 };
    this.tipInterval = setInterval(() => {
      this.generateTip();
    }, tipIntervals[tipIntensity]);
  }

  private updateMetrics(): void {
    const now = Date.now();
    const sessionTime = this.sessionStartTime ? (now - this.sessionStartTime.getTime()) / 1000 : 0;

    // Simulate realistic metric variations
    this.currentMetrics = {
      timestamp: sessionTime,
      eyeContact: Math.max(0, Math.min(100, this.currentMetrics.eyeContact + (Math.random() - 0.5) * 8)),
      posture: Math.max(0, Math.min(100, this.currentMetrics.posture + (Math.random() - 0.5) * 6)),
      voiceClarity: Math.max(0, Math.min(100, this.currentMetrics.voiceClarity + (Math.random() - 0.5) * 10)),
      speakingPace: Math.max(80, Math.min(200, this.currentMetrics.speakingPace + (Math.random() - 0.5) * 20)),
      fillerWordCount: this.currentMetrics.fillerWordCount + (Math.random() > 0.85 ? 1 : 0),
      confidenceLevel: Math.max(0, Math.min(100, this.currentMetrics.confidenceLevel + (Math.random() - 0.5) * 5)),
      volume: Math.max(0, Math.min(100, this.currentMetrics.volume + (Math.random() - 0.5) * 15))
    };

    this.collectedMetrics.push({ ...this.currentMetrics });
  }

  private detectFlags(): void {
    const now = this.sessionStartTime ? (Date.now() - this.sessionStartTime.getTime()) / 1000 : 0;

    // Generate flags based on metrics
    if (this.currentMetrics.eyeContact < 40 && Math.random() > 0.8) {
      this.timestampedFlags.push({
        timestamp: now,
        type: 'warning',
        category: 'body_language',
        message: 'Low eye contact detected - try looking directly at the camera',
        severity: 'medium',
        suggestion: 'Practice maintaining eye contact for 3-5 seconds at a time'
      });
    }

    if (this.currentMetrics.speakingPace > 180 && Math.random() > 0.9) {
      this.timestampedFlags.push({
        timestamp: now,
        type: 'improvement',
        category: 'vocal',
        message: 'Speaking pace is quite fast - consider slowing down',
        severity: 'medium',
        suggestion: 'Take a breath between sentences to control pace'
      });
    }

    if (this.currentMetrics.posture > 85 && Math.random() > 0.95) {
      this.timestampedFlags.push({
        timestamp: now,
        type: 'positive',
        category: 'body_language',
        message: 'Excellent posture - you look confident and engaged',
        severity: 'low'
      });
    }
  }

  private generateTip(): void {
    const now = Date.now();
    if (now - this.lastTipTime < 3000) return; // Minimum 3s between tips

    const tips = [
      { message: "Great eye contact! Keep it up.", type: 'body_language' as const, priority: 'low' as const },
      { message: "Try to slow down your pace slightly.", type: 'vocal' as const, priority: 'medium' as const },
      { message: "Excellent posture - you look confident.", type: 'body_language' as const, priority: 'low' as const },
      { message: "Consider pausing before answering.", type: 'vocal' as const, priority: 'medium' as const },
      { message: "Your voice is clear and engaging.", type: 'vocal' as const, priority: 'low' as const },
      { message: "Try to minimize filler words like 'um'.", type: 'vocal' as const, priority: 'high' as const },
      { message: "Use specific examples to support your points.", type: 'content' as const, priority: 'medium' as const },
      { message: "Maintain good posture throughout.", type: 'body_language' as const, priority: 'medium' as const }
    ];

    // Only generate tip 40% of the time to avoid overwhelming
    if (Math.random() > 0.4) return;

    const tip = tips[Math.floor(Math.random() * tips.length)];
    const liveTip: LiveTip = {
      id: `tip_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      ...tip,
      timestamp: now,
      duration: 4000
    };

    // Dispatch custom event for tip display
    window.dispatchEvent(new CustomEvent('interviewTip', { detail: liveTip }));
    this.lastTipTime = now;
  }

  getCurrentMetrics(): LiveMetrics {
    return { ...this.currentMetrics };
  }

  async endSession(): Promise<SessionReport> {
    // Stop analysis
    if (this.analysisInterval) {
      clearInterval(this.analysisInterval);
      this.analysisInterval = null;
    }

    if (this.tipInterval) {
      clearInterval(this.tipInterval);
      this.tipInterval = null;
    }

    // Stop recording
    if (this.mediaRecorder && this.mediaRecorder.state === 'recording') {
      this.mediaRecorder.stop();
    }

    // Stop media stream
    if (this.mediaStream) {
      this.mediaStream.getTracks().forEach(track => track.stop());
      this.mediaStream = null;
    }

    // Generate report
    const duration = this.sessionStartTime ? (Date.now() - this.sessionStartTime.getTime()) / 1000 : 0;
    const report = this.generateReport(duration);

    return report;
  }

  private generateReport(duration: number): SessionReport {
    // Calculate averages from collected metrics
    const avgMetrics = this.collectedMetrics.reduce((acc, metric) => ({
      eyeContact: acc.eyeContact + metric.eyeContact,
      posture: acc.posture + metric.posture,
      voiceClarity: acc.voiceClarity + metric.voiceClarity,
      speakingPace: acc.speakingPace + metric.speakingPace,
      confidenceLevel: acc.confidenceLevel + metric.confidenceLevel
    }), { eyeContact: 0, posture: 0, voiceClarity: 0, speakingPace: 0, confidenceLevel: 0 });

    const count = this.collectedMetrics.length || 1;
    Object.keys(avgMetrics).forEach(key => {
      avgMetrics[key] = avgMetrics[key] / count;
    });

    // Calculate scores
    const bodyLanguageScore = Math.round((avgMetrics.eyeContact + avgMetrics.posture) / 2);
    const vocalScore = Math.round((avgMetrics.voiceClarity + Math.min(100, Math.max(0, 100 - Math.abs(avgMetrics.speakingPace - 150) * 2))) / 2);
    const contentScore = Math.round(avgMetrics.confidenceLevel + (Math.random() * 20 - 10)); // Add some variation
    const overallScore = Math.round((bodyLanguageScore + vocalScore + contentScore) / 3);

    // Generate suggestions based on performance
    const suggestions: string[] = [];
    const strengths: string[] = [];
    const areasForImprovement: string[] = [];

    if (bodyLanguageScore >= 80) {
      strengths.push('Excellent body language and professional presence');
    } else if (bodyLanguageScore < 60) {
      areasForImprovement.push('Body language and posture');
      suggestions.push('Practice maintaining eye contact and good posture during conversations');
    }

    if (vocalScore >= 80) {
      strengths.push('Clear and confident vocal delivery');
    } else if (vocalScore < 60) {
      areasForImprovement.push('Vocal delivery and speaking pace');
      suggestions.push('Work on speaking at a moderate pace and improving voice clarity');
    }

    if (contentScore >= 80) {
      strengths.push('Strong content and confident responses');
    } else if (contentScore < 60) {
      areasForImprovement.push('Response content and structure');
      suggestions.push('Practice structuring responses using the STAR method');
    }

    if (this.currentMetrics.fillerWordCount > 5) {
      suggestions.push('Reduce filler words by pausing instead of saying "um" or "uh"');
    }

    // Default suggestions if performance is good
    if (suggestions.length === 0) {
      suggestions.push('Continue practicing to maintain your strong performance');
      suggestions.push('Consider recording yourself to identify subtle areas for improvement');
    }

    const nextSteps = [
      'Schedule regular practice sessions to maintain skills',
      'Focus on the areas identified for improvement',
      'Practice with different types of questions',
      'Consider doing mock interviews with friends or mentors'
    ];

    return {
      sessionId: `session_${Date.now()}`,
      overallScore,
      subScores: {
        bodyLanguage: bodyLanguageScore,
        vocalDelivery: vocalScore,
        contentQuality: contentScore,
        confidence: Math.round(avgMetrics.confidenceLevel)
      },
      metrics: {
        averageResponseTime: 45 + Math.random() * 30, // 45-75 seconds
        totalFillerWords: this.currentMetrics.fillerWordCount,
        averageEyeContact: Math.round(avgMetrics.eyeContact),
        averagePosture: Math.round(avgMetrics.posture),
        speakingPaceConsistency: Math.round(100 - Math.abs(avgMetrics.speakingPace - 150) * 0.5)
      },
      transcript: this.generateTranscript(),
      timestampedFlags: this.timestampedFlags,
      suggestions,
      strengths,
      areasForImprovement,
      nextSteps,
      duration,
      questionsAnswered: 3 // This would be dynamic based on actual session
    };
  }

  private generateTranscript(): string {
    return `This is a sample transcript of your interview responses. In a real implementation, this would contain the actual transcribed speech from your session using speech-to-text technology.

The transcript would include:
- Your responses to each question
- Timestamps for each response
- Identified filler words and pauses
- Key phrases and content analysis

This feature will be fully implemented in the production version of the application.`;
  }

  async getRecordedVideo(): Promise<Blob | null> {
    if (this.recordedChunks.length === 0) return null;
    
    return new Blob(this.recordedChunks, { type: 'video/webm' });
  }

  cleanup(): void {
    if (this.analysisInterval) {
      clearInterval(this.analysisInterval);
      this.analysisInterval = null;
    }

    if (this.tipInterval) {
      clearInterval(this.tipInterval);
      this.tipInterval = null;
    }

    if (this.mediaRecorder && this.mediaRecorder.state === 'recording') {
      this.mediaRecorder.stop();
    }

    if (this.mediaStream) {
      this.mediaStream.getTracks().forEach(track => track.stop());
      this.mediaStream = null;
    }

    this.recordedChunks = [];
  }
}

export const interviewService = new InterviewService();