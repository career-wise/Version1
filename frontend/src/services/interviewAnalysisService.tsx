// Interview Analysis Service
// Handles ML-based analysis of interview sessions

export interface VisualCue {
  timestamp: number;
  eyeContact: number; // 0-100
  posture: number; // 0-100
  facialExpression: 'confident' | 'nervous' | 'neutral' | 'engaged';
  handGestures: 'appropriate' | 'excessive' | 'minimal';
}

export interface AudioCue {
  timestamp: number;
  volume: number; // 0-100
  pace: number; // words per minute
  clarity: number; // 0-100
  fillerWords: string[];
  pauses: number[]; // pause durations in seconds
}

export interface ContentAnalysis {
  relevance: number; // 0-100
  structure: number; // 0-100
  examples: number; // count of specific examples
  keywords: string[];
  sentiment: 'positive' | 'neutral' | 'negative';
}

export interface LiveTip {
  id: string;
  message: string;
  type: 'body_language' | 'vocal' | 'content';
  priority: 'low' | 'medium' | 'high';
  timestamp: number;
}

export interface SessionAnalysis {
  overallScore: number;
  bodyLanguageScore: number;
  vocalScore: number;
  contentScore: number;
  visualCues: VisualCue[];
  audioCues: AudioCue[];
  contentAnalysis: ContentAnalysis;
  liveTips: LiveTip[];
  transcript: string;
  duration: number;
}

class InterviewAnalysisService {
  private mediaStream: MediaStream | null = null;
  private analysisWorker: Worker | null = null;
  private isAnalyzing = false;
  private tipQueue: LiveTip[] = [];
  private lastTipTime = 0;
  private tipIntensity: 'low' | 'medium' | 'high' = 'medium';

  constructor() {
    // Initialize analysis worker for background processing
    if (typeof Worker !== 'undefined') {
      this.analysisWorker = new Worker('/workers/interview-analysis-worker.js');
    }
  }

  async startAnalysis(stream: MediaStream, options: {
    tipIntensity?: 'low' | 'medium' | 'high';
    enableLiveTips?: boolean;
  } = {}): Promise<void> {
    this.mediaStream = stream;
    this.tipIntensity = options.tipIntensity || 'medium';
    this.isAnalyzing = true;

    // Start visual analysis
    this.startVisualAnalysis(stream);
    
    // Start audio analysis
    this.startAudioAnalysis(stream);

    // Start live tip generation
    if (options.enableLiveTips) {
      this.startLiveTipGeneration();
    }
  }

  stopAnalysis(): void {
    this.isAnalyzing = false;
    this.mediaStream = null;
  }

  private startVisualAnalysis(stream: MediaStream): void {
    const video = document.createElement('video');
    video.srcObject = stream;
    video.play();

    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');

    const analyzeFrame = () => {
      if (!this.isAnalyzing || !ctx) return;

      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      ctx.drawImage(video, 0, 0);

      // Extract visual features (mock implementation)
      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const visualCue = this.extractVisualFeatures(imageData);

      // Send to analysis worker
      if (this.analysisWorker) {
        this.analysisWorker.postMessage({
          type: 'visual_cue',
          data: visualCue,
          timestamp: Date.now()
        });
      }

      // Continue analysis
      requestAnimationFrame(analyzeFrame);
    };

    video.addEventListener('loadedmetadata', () => {
      analyzeFrame();
    });
  }

  private startAudioAnalysis(stream: MediaStream): void {
    const audioContext = new AudioContext();
    const source = audioContext.createMediaStreamSource(stream);
    const analyser = audioContext.createAnalyser();
    
    analyser.fftSize = 2048;
    source.connect(analyser);

    const bufferLength = analyser.frequencyBinCount;
    const dataArray = new Uint8Array(bufferLength);

    const analyzeAudio = () => {
      if (!this.isAnalyzing) return;

      analyser.getByteFrequencyData(dataArray);
      
      // Extract audio features (mock implementation)
      const audioCue = this.extractAudioFeatures(dataArray);

      // Send to analysis worker
      if (this.analysisWorker) {
        this.analysisWorker.postMessage({
          type: 'audio_cue',
          data: audioCue,
          timestamp: Date.now()
        });
      }

      // Continue analysis
      setTimeout(analyzeAudio, 100); // 10 FPS
    };

    analyzeAudio();
  }

  private startLiveTipGeneration(): void {
    const generateTips = () => {
      if (!this.isAnalyzing) return;

      const now = Date.now();
      const tipInterval = this.getTipInterval();

      if (now - this.lastTipTime > tipInterval) {
        const tip = this.generateLiveTip();
        if (tip) {
          this.tipQueue.push(tip);
          this.lastTipTime = now;
        }
      }

      setTimeout(generateTips, 1000); // Check every second
    };

    generateTips();
  }

  private getTipInterval(): number {
    switch (this.tipIntensity) {
      case 'high': return 4000; // 4 seconds
      case 'medium': return 6000; // 6 seconds
      case 'low': return 8000; // 8 seconds
      default: return 6000;
    }
  }

  private extractVisualFeatures(imageData: ImageData): VisualCue {
    // Mock implementation - in real app, this would use computer vision
    return {
      timestamp: Date.now(),
      eyeContact: Math.random() * 40 + 60, // 60-100
      posture: Math.random() * 30 + 70, // 70-100
      facialExpression: ['confident', 'nervous', 'neutral', 'engaged'][Math.floor(Math.random() * 4)] as any,
      handGestures: ['appropriate', 'excessive', 'minimal'][Math.floor(Math.random() * 3)] as any
    };
  }

  private extractAudioFeatures(audioData: Uint8Array): AudioCue {
    // Mock implementation - in real app, this would analyze audio
    const avgVolume = audioData.reduce((sum, val) => sum + val, 0) / audioData.length;
    
    return {
      timestamp: Date.now(),
      volume: (avgVolume / 255) * 100,
      pace: Math.random() * 50 + 120, // 120-170 WPM
      clarity: Math.random() * 20 + 80, // 80-100
      fillerWords: Math.random() > 0.8 ? ['um'] : [],
      pauses: Math.random() > 0.7 ? [Math.random() * 2] : []
    };
  }

  private generateLiveTip(): LiveTip | null {
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

    // Only generate tip 30% of the time to avoid overwhelming
    if (Math.random() > 0.3) return null;

    const tip = tips[Math.floor(Math.random() * tips.length)];
    return {
      id: `tip_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      ...tip,
      timestamp: Date.now()
    };
  }

  getNextTip(): LiveTip | null {
    return this.tipQueue.shift() || null;
  }

  async generateSessionReport(sessionData: {
    duration: number;
    questions: string[];
    responses: string[];
  }): Promise<SessionAnalysis> {
    // Mock implementation - in real app, this would process all collected data
    const overallScore = Math.floor(Math.random() * 20) + 75;
    
    return {
      overallScore,
      bodyLanguageScore: Math.floor(Math.random() * 20) + 70,
      vocalScore: Math.floor(Math.random() * 20) + 75,
      contentScore: Math.floor(Math.random() * 20) + 80,
      visualCues: [], // Would contain all collected visual cues
      audioCues: [], // Would contain all collected audio cues
      contentAnalysis: {
        relevance: Math.floor(Math.random() * 20) + 80,
        structure: Math.floor(Math.random() * 20) + 75,
        examples: Math.floor(Math.random() * 3) + 1,
        keywords: ['leadership', 'teamwork', 'problem-solving'],
        sentiment: 'positive'
      },
      liveTips: this.tipQueue,
      transcript: "This is a sample transcript of your interview responses. In a real implementation, this would contain the actual transcribed speech from your session.",
      duration: sessionData.duration
    };
  }
}

export const interviewAnalysisService = new InterviewAnalysisService();