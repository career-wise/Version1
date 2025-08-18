import { useState, useRef, useCallback } from 'react';
import { mlAnalysisService, MLAnalysisResult, BodyLanguageMetrics, SpeechMetrics } from '../services/mlAnalysisService';

interface UseMLAnalysisOptions {
  onRealTimeUpdate?: (metrics: { bodyLanguage: Partial<BodyLanguageMetrics>; speech: Partial<SpeechMetrics> }) => void;
  onAnalysisComplete?: (result: MLAnalysisResult) => void;
  onError?: (error: Error) => void;
}

export const useMLAnalysis = (options: UseMLAnalysisOptions = {}) => {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [sessionId] = useState(() => `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`);
  
  const videoRef = useRef<HTMLVideoElement>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const recordedChunksRef = useRef<Blob[]>([]);
  const analysisIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const streamRef = useRef<MediaStream | null>(null);

  // Initialize camera and microphone
  const initializeMedia = useCallback(async (constraints: MediaStreamConstraints = { video: true, audio: true }) => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia(constraints);
      streamRef.current = stream;
      
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
      
      return stream;
    } catch (error) {
      options.onError?.(new Error('Failed to access camera/microphone'));
      throw error;
    }
  }, [options]);

  // Start recording and real-time analysis
  const startAnalysis = useCallback(async () => {
    try {
      if (!streamRef.current) {
        await initializeMedia();
      }

      if (!streamRef.current) {
        throw new Error('No media stream available');
      }

      // Start ML analysis session
      await mlAnalysisService.startAnalysisSession(sessionId);

      // Set up media recorder
      const mediaRecorder = new MediaRecorder(streamRef.current, {
        mimeType: 'video/webm;codecs=vp9'
      });

      mediaRecorderRef.current = mediaRecorder;
      recordedChunksRef.current = [];

      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          recordedChunksRef.current.push(event.data);
        }
      };

      mediaRecorder.start(1000); // Collect data every second
      setIsRecording(true);

      // Start real-time analysis
      startRealTimeAnalysis();

    } catch (error) {
      options.onError?.(error as Error);
    }
  }, [sessionId, initializeMedia, options]);

  // Start real-time analysis loop
  const startRealTimeAnalysis = useCallback(() => {
    analysisIntervalRef.current = setInterval(async () => {
      if (!videoRef.current || !streamRef.current) return;

      try {
        // Capture current video frame
        const canvas = document.createElement('canvas');
        const video = videoRef.current;
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        
        const ctx = canvas.getContext('2d');
        if (!ctx) return;
        
        ctx.drawImage(video, 0, 0);
        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);

        // Analyze video frame for body language
        const bodyLanguageMetrics = await mlAnalysisService.analyzeVideoFrame(imageData);

        // Capture audio for speech analysis (simplified for demo)
        const speechMetrics = await mlAnalysisService.analyzeAudioChunk(new Blob());

        // Send real-time updates
        options.onRealTimeUpdate?.({
          bodyLanguage: bodyLanguageMetrics,
          speech: speechMetrics
        });

      } catch (error) {
        console.error('Real-time analysis error:', error);
      }
    }, 2000); // Analyze every 2 seconds
  }, [options]);

  // Stop recording and perform comprehensive analysis
  const stopAnalysis = useCallback(async () => {
    try {
      setIsAnalyzing(true);

      // Stop real-time analysis
      if (analysisIntervalRef.current) {
        clearInterval(analysisIntervalRef.current);
        analysisIntervalRef.current = null;
      }

      // Stop recording
      if (mediaRecorderRef.current && isRecording) {
        mediaRecorderRef.current.stop();
        setIsRecording(false);

        // Wait for final data
        await new Promise(resolve => {
          if (mediaRecorderRef.current) {
            mediaRecorderRef.current.onstop = resolve;
          }
        });
      }

      // Create blobs from recorded data
      const videoBlob = new Blob(recordedChunksRef.current, { type: 'video/webm' });
      const audioBlob = new Blob(recordedChunksRef.current, { type: 'audio/webm' });

      // Perform comprehensive analysis
      const analysisResult = await mlAnalysisService.analyzeCompleteSession(
        videoBlob,
        audioBlob,
        sessionId
      );

      options.onAnalysisComplete?.(analysisResult);
      return analysisResult;

    } catch (error) {
      options.onError?.(error as Error);
      throw error;
    } finally {
      setIsAnalyzing(false);
    }
  }, [isRecording, sessionId, options]);

  // Cleanup resources
  const cleanup = useCallback(() => {
    if (analysisIntervalRef.current) {
      clearInterval(analysisIntervalRef.current);
    }

    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
    }

    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
    }

    mlAnalysisService.closeSession();
    setIsRecording(false);
    setIsAnalyzing(false);
  }, [isRecording]);

  // Toggle camera
  const toggleCamera = useCallback(async (enabled: boolean) => {
    if (streamRef.current) {
      const videoTrack = streamRef.current.getVideoTracks()[0];
      if (videoTrack) {
        videoTrack.enabled = enabled;
      }
    }
  }, []);

  // Toggle microphone
  const toggleMicrophone = useCallback(async (enabled: boolean) => {
    if (streamRef.current) {
      const audioTrack = streamRef.current.getAudioTracks()[0];
      if (audioTrack) {
        audioTrack.enabled = enabled;
      }
    }
  }, []);

  return {
    // State
    isAnalyzing,
    isRecording,
    sessionId,
    videoRef,

    // Actions
    initializeMedia,
    startAnalysis,
    stopAnalysis,
    cleanup,
    toggleCamera,
    toggleMicrophone,

    // Utils
    stream: streamRef.current
  };
};