import React, { useState, useRef, useEffect } from 'react';
import { 
  Camera, 
  Mic, 
  MicOff, 
  VideoOff, 
  Play, 
  Pause, 
  Square,
  Eye,
  Volume2,
  Brain,
  TrendingUp,
  AlertCircle,
  CheckCircle,
  BarChart3,
  Clock,
  Zap,
  Wifi,
  WifiOff
} from 'lucide-react';
import Card from '../ui/Card';
import Button from '../ui/Button';
import ProgressBar from '../ui/ProgressBar';
import Modal from '../ui/Modal';

interface AnalysisResult {
  bodyLanguage: {
    eyeContact: number;
    posture: number;
    handGestures: number;
    facialExpressions: number;
    overall: number;
  };
  speech: {
    clarity: number;
    pace: number;
    volume: number;
    fillerWords: number;
    confidence: number;
    overall: number;
  };
  recommendations: string[];
  strengths: string[];
  areasForImprovement: string[];
  analysisType?: string;
}

interface MLInterviewAnalysisProps {
  question: string;
  onComplete: (result: AnalysisResult) => void;
  onCancel: () => void;
}

const MLInterviewAnalysis: React.FC<MLInterviewAnalysisProps> = ({
  question,
  onComplete,
  onCancel
}) => {
  const [isRecording, setIsRecording] = useState(false);
  const [recordingTime, setRecordingTime] = useState(0);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<AnalysisResult | null>(null);
  const [cameraEnabled, setCameraEnabled] = useState(true);
  const [micEnabled, setMicEnabled] = useState(true);
  const [mlConnected, setMlConnected] = useState(false);
  const [realTimeMetrics, setRealTimeMetrics] = useState({
    eyeContact: 0,
    speechClarity: 0,
    confidence: 0,
    analysisType: 'checking...'
  });

  const videoRef = useRef<HTMLVideoElement>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const analysisIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const websocketRef = useRef<WebSocket | null>(null);
  const recordedChunksRef = useRef<Blob[]>([]);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isRecording) {
      interval = setInterval(() => {
        setRecordingTime(prev => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isRecording]);

  useEffect(() => {
    initializeCamera();
    checkMLStatus();
    return () => {
      cleanup();
    };
  }, []);

  const checkMLStatus = async () => {
    try {
      const response = await fetch('http://localhost:8000/api/v1/ml/test/ml-status');
      const data = await response.json();
      
      if (data.ml_status === 'ready') {
        setMlConnected(true);
        setRealTimeMetrics(prev => ({ ...prev, analysisType: 'Real ML Analysis' }));
      } else {
        setMlConnected(false);
        setRealTimeMetrics(prev => ({ ...prev, analysisType: 'Demo Mode' }));
      }
    } catch (error) {
      console.error('ML status check failed:', error);
      setMlConnected(false);
      setRealTimeMetrics(prev => ({ ...prev, analysisType: 'Demo Mode' }));
    }
  };

  const initializeCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: cameraEnabled,
        audio: micEnabled
      });
      
      streamRef.current = stream;
      
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
    } catch (error) {
      console.error('Error accessing camera/microphone:', error);
    }
  };

  const cleanup = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
    }
    if (analysisIntervalRef.current) {
      clearInterval(analysisIntervalRef.current);
    }
    if (websocketRef.current) {
      websocketRef.current.close();
    }
  };

  const startRecording = async () => {
    if (!streamRef.current) return;

    try {
      // Set up media recorder
      const mediaRecorder = new MediaRecorder(streamRef.current);
      mediaRecorderRef.current = mediaRecorder;
      recordedChunksRef.current = [];
      
      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          recordedChunksRef.current.push(event.data);
        }
      };
      
      mediaRecorder.start(1000); // Collect data every second
      setIsRecording(true);
      setRecordingTime(0);
      
      // Start real-time analysis
      if (mlConnected) {
        startRealTimeMLAnalysis();
      } else {
        startDemoAnalysis();
      }
      
    } catch (error) {
      console.error('Error starting recording:', error);
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
      
      if (analysisIntervalRef.current) {
        clearInterval(analysisIntervalRef.current);
      }
      
      if (websocketRef.current) {
        websocketRef.current.close();
      }
      
      // Start comprehensive analysis
      performComprehensiveAnalysis();
    }
  };

  const startRealTimeMLAnalysis = () => {
    const sessionId = `session_${Date.now()}`;
    
    try {
      // Connect to WebSocket for real-time ML analysis
      const ws = new WebSocket(`ws://localhost:8000/api/v1/ml/ws/analysis/${sessionId}`);
      websocketRef.current = ws;
      
      ws.onopen = () => {
        console.log('Connected to ML analysis WebSocket');
        setRealTimeMetrics(prev => ({ ...prev, analysisType: 'Real ML Analysis - Connected' }));
      };
      
      ws.onmessage = (event) => {
        const data = JSON.parse(event.data);
        
        if (data.type === 'body_language_analysis') {
          setRealTimeMetrics(prev => ({
            ...prev,
            eyeContact: data.data.eye_contact || 0,
            analysisType: 'Real ML Analysis - Active'
          }));
        } else if (data.type === 'speech_analysis') {
          setRealTimeMetrics(prev => ({
            ...prev,
            speechClarity: data.data.clarity || 0,
            confidence: data.data.confidence || 0
          }));
        }
      };
      
      ws.onerror = (error) => {
        console.error('WebSocket error:', error);
        setMlConnected(false);
        startDemoAnalysis();
      };
      
      // Send video frames for analysis
      analysisIntervalRef.current = setInterval(() => {
        if (videoRef.current && ws.readyState === WebSocket.OPEN) {
          captureAndSendFrame(ws);
        }
      }, 2000);
      
    } catch (error) {
      console.error('Failed to start real-time ML analysis:', error);
      setMlConnected(false);
      startDemoAnalysis();
    }
  };

  const captureAndSendFrame = (ws: WebSocket) => {
    if (!videoRef.current) return;
    
    try {
      const canvas = document.createElement('canvas');
      const video = videoRef.current;
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      
      const ctx = canvas.getContext('2d');
      if (!ctx) return;
      
      ctx.drawImage(video, 0, 0);
      const frameData = canvas.toDataURL('image/jpeg', 0.8);
      
      ws.send(JSON.stringify({
        type: 'video_frame',
        data: frameData,
        timestamp: Date.now()
      }));
    } catch (error) {
      console.error('Error capturing frame:', error);
    }
  };

  const startDemoAnalysis = () => {
    setRealTimeMetrics(prev => ({ ...prev, analysisType: 'Demo Mode - Simulated' }));
    
    analysisIntervalRef.current = setInterval(() => {
      setRealTimeMetrics(prev => ({
        ...prev,
        eyeContact: Math.random() * 100,
        speechClarity: Math.random() * 100,
        confidence: Math.random() * 100
      }));
    }, 1000);
  };

  const performComprehensiveAnalysis = async () => {
    setIsAnalyzing(true);
    
    try {
      if (mlConnected && recordedChunksRef.current.length > 0) {
        // Use real ML analysis
        await performRealMLAnalysis();
      } else {
        // Use demo analysis
        await performDemoAnalysis();
      }
    } catch (error) {
      console.error('Analysis error:', error);
      await performDemoAnalysis();
    } finally {
      setIsAnalyzing(false);
    }
  };

  const performRealMLAnalysis = async () => {
    try {
      // Create blobs from recorded data
      const videoBlob = new Blob(recordedChunksRef.current, { type: 'video/webm' });
      const audioBlob = new Blob(recordedChunksRef.current, { type: 'audio/webm' });
      
      // Send to ML analysis endpoint
      const formData = new FormData();
      formData.append('video', videoBlob);
      formData.append('audio', audioBlob);
      formData.append('sessionId', `session_${Date.now()}`);
      
      const response = await fetch('http://localhost:8000/api/v1/ml/analyze/complete', {
        method: 'POST',
        body: formData
      });
      
      if (!response.ok) {
        throw new Error('ML analysis failed');
      }
      
      const data = await response.json();
      
      if (data.success) {
        const result: AnalysisResult = {
          bodyLanguage: {
            eyeContact: data.data.body_language.eye_contact,
            posture: data.data.body_language.posture,
            handGestures: data.data.body_language.hand_gestures,
            facialExpressions: data.data.body_language.facial_expressions,
            overall: data.data.body_language.overall
          },
          speech: {
            clarity: data.data.speech.clarity,
            pace: data.data.speech.pace,
            volume: data.data.speech.volume,
            fillerWords: data.data.speech.filler_words,
            confidence: data.data.speech.confidence,
            overall: data.data.speech.overall
          },
          recommendations: data.data.recommendations,
          strengths: data.data.strengths,
          areasForImprovement: data.data.areas_for_improvement,
          analysisType: 'Real ML Analysis'
        };
        
        setAnalysisResult(result);
        setShowResults(true);
      } else {
        throw new Error('Analysis failed');
      }
      
    } catch (error) {
      console.error('Real ML analysis failed:', error);
      throw error;
    }
  };

  const performDemoAnalysis = async () => {
    // Simulate analysis time
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    // Generate demo results with some variation
    const baseScores = {
      eyeContact: 75 + Math.random() * 20,
      posture: 80 + Math.random() * 15,
      handGestures: 70 + Math.random() * 25,
      facialExpressions: 78 + Math.random() * 18,
      clarity: 82 + Math.random() * 15,
      pace: 75 + Math.random() * 20,
      volume: 88 + Math.random() * 10,
      fillerWords: 65 + Math.random() * 25,
      confidence: 77 + Math.random() * 18
    };
    
    const result: AnalysisResult = {
      bodyLanguage: {
        eyeContact: Math.round(baseScores.eyeContact),
        posture: Math.round(baseScores.posture),
        handGestures: Math.round(baseScores.handGestures),
        facialExpressions: Math.round(baseScores.facialExpressions),
        overall: Math.round((baseScores.eyeContact + baseScores.posture + baseScores.handGestures + baseScores.facialExpressions) / 4)
      },
      speech: {
        clarity: Math.round(baseScores.clarity),
        pace: Math.round(baseScores.pace),
        volume: Math.round(baseScores.volume),
        fillerWords: Math.round(baseScores.fillerWords),
        confidence: Math.round(baseScores.confidence),
        overall: Math.round((baseScores.clarity + baseScores.pace + baseScores.volume + baseScores.fillerWords + baseScores.confidence) / 5)
      },
      recommendations: [
        "Maintain more consistent eye contact with the camera",
        "Reduce the use of filler words like 'um' and 'uh'",
        "Speak slightly slower for better clarity",
        "Use more purposeful hand gestures to emphasize points",
        "Practice confident posture - sit up straight and lean slightly forward"
      ],
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
      analysisType: 'Demo Mode'
    };
    
    setAnalysisResult(result);
    setShowResults(true);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-600';
    if (score >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getScoreBg = (score: number) => {
    if (score >= 80) return 'bg-green-100';
    if (score >= 60) return 'bg-yellow-100';
    return 'bg-red-100';
  };

  if (showResults && analysisResult) {
    return (
      <Modal isOpen={true} onClose={onCancel} title="Interview Analysis Results" size="xl">
        <div className="space-y-6">
          {/* Analysis Type Indicator */}
          <div className="flex items-center justify-center space-x-2 p-3 bg-gray-50 rounded-lg">
            {analysisResult.analysisType === 'Real ML Analysis' ? (
              <>
                <Wifi className="h-5 w-5 text-green-600" />
                <span className="text-sm font-medium text-green-800">Real ML Analysis Results</span>
              </>
            ) : (
              <>
                <WifiOff className="h-5 w-5 text-orange-600" />
                <span className="text-sm font-medium text-orange-800">Demo Mode Results</span>
              </>
            )}
          </div>

          {/* Overall Scores */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <div className="text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Eye className="h-8 w-8 text-blue-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Body Language</h3>
                <div className={`text-3xl font-bold mb-2 ${getScoreColor(analysisResult.bodyLanguage.overall)}`}>
                  {analysisResult.bodyLanguage.overall}%
                </div>
                <ProgressBar progress={analysisResult.bodyLanguage.overall} color="blue" />
              </div>
            </Card>

            <Card>
              <div className="text-center">
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Volume2 className="h-8 w-8 text-purple-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Speech Analysis</h3>
                <div className={`text-3xl font-bold mb-2 ${getScoreColor(analysisResult.speech.overall)}`}>
                  {analysisResult.speech.overall}%
                </div>
                <ProgressBar progress={analysisResult.speech.overall} color="purple" />
              </div>
            </Card>
          </div>

          {/* Detailed Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <h4 className="text-lg font-semibold text-gray-900 mb-4">Body Language Breakdown</h4>
              <div className="space-y-3">
                {Object.entries(analysisResult.bodyLanguage).map(([key, value]) => {
                  if (key === 'overall') return null;
                  return (
                    <div key={key} className="flex items-center justify-between">
                      <span className="text-sm text-gray-700 capitalize">
                        {key.replace(/([A-Z])/g, ' $1').trim()}
                      </span>
                      <div className="flex items-center space-x-2">
                        <div className="w-20">
                          <ProgressBar progress={value} size="sm" />
                        </div>
                        <span className={`text-sm font-medium ${getScoreColor(value)}`}>
                          {value}%
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </Card>

            <Card>
              <h4 className="text-lg font-semibold text-gray-900 mb-4">Speech Analysis Breakdown</h4>
              <div className="space-y-3">
                {Object.entries(analysisResult.speech).map(([key, value]) => {
                  if (key === 'overall') return null;
                  return (
                    <div key={key} className="flex items-center justify-between">
                      <span className="text-sm text-gray-700 capitalize">
                        {key.replace(/([A-Z])/g, ' $1').trim()}
                      </span>
                      <div className="flex items-center space-x-2">
                        <div className="w-20">
                          <ProgressBar progress={value} size="sm" />
                        </div>
                        <span className={`text-sm font-medium ${getScoreColor(value)}`}>
                          {value}%
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </Card>
          </div>

          {/* Strengths and Improvements */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <h4 className="text-lg font-semibold text-green-900 mb-4 flex items-center">
                <CheckCircle className="h-5 w-5 mr-2 text-green-600" />
                Strengths
              </h4>
              <ul className="space-y-2">
                {analysisResult.strengths.map((strength, index) => (
                  <li key={index} className="flex items-start">
                    <div className="w-2 h-2 bg-green-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                    <span className="text-sm text-gray-700">{strength}</span>
                  </li>
                ))}
              </ul>
            </Card>

            <Card>
              <h4 className="text-lg font-semibold text-orange-900 mb-4 flex items-center">
                <TrendingUp className="h-5 w-5 mr-2 text-orange-600" />
                Areas for Improvement
              </h4>
              <ul className="space-y-2">
                {analysisResult.areasForImprovement.map((area, index) => (
                  <li key={index} className="flex items-start">
                    <div className="w-2 h-2 bg-orange-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                    <span className="text-sm text-gray-700">{area}</span>
                  </li>
                ))}
              </ul>
            </Card>
          </div>

          {/* Recommendations */}
          <Card>
            <h4 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
              <Brain className="h-5 w-5 mr-2 text-blue-600" />
              {analysisResult.analysisType === 'Real ML Analysis' ? 'AI' : 'Demo'} Recommendations
            </h4>
            <div className="space-y-3">
              {analysisResult.recommendations.map((recommendation, index) => (
                <div key={index} className="flex items-start p-3 bg-blue-50 rounded-lg">
                  <Zap className="h-4 w-4 text-blue-600 mt-0.5 mr-3 flex-shrink-0" />
                  <span className="text-sm text-blue-900">{recommendation}</span>
                </div>
              ))}
            </div>
          </Card>

          {/* Action Buttons */}
          <div className="flex space-x-4">
            <Button onClick={() => onComplete(analysisResult)} className="flex-1">
              Save Results
            </Button>
            <Button variant="outline" onClick={onCancel} className="flex-1">
              Try Again
            </Button>
          </div>
        </div>
      </Modal>
    );
  }

  return (
    <div className="space-y-6">
      {/* ML Status Indicator */}
      <Card>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            {mlConnected ? (
              <>
                <Wifi className="h-5 w-5 text-green-600" />
                <span className="text-sm font-medium text-green-800">Real ML Analysis Ready</span>
              </>
            ) : (
              <>
                <WifiOff className="h-5 w-5 text-orange-600" />
                <span className="text-sm font-medium text-orange-800">Demo Mode (ML Backend Unavailable)</span>
              </>
            )}
          </div>
          <Button variant="outline" size="sm" onClick={checkMLStatus}>
            Refresh Status
          </Button>
        </div>
      </Card>

      {/* Question Display */}
      <Card>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Interview Question</h3>
        <p className="text-gray-700 text-lg leading-relaxed">{question}</p>
      </Card>

      {/* Video Preview */}
      <Card>
        <div className="relative">
          <video
            ref={videoRef}
            autoPlay
            muted
            className="w-full h-64 bg-gray-900 rounded-lg object-cover"
          />
          
          {/* Recording Indicator */}
          {isRecording && (
            <div className="absolute top-4 left-4 flex items-center space-x-2 bg-red-600 text-white px-3 py-1 rounded-full">
              <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
              <span className="text-sm font-medium">REC {formatTime(recordingTime)}</span>
            </div>
          )}

          {/* Real-time Metrics Overlay */}
          {isRecording && (
            <div className="absolute top-4 right-4 bg-black bg-opacity-75 text-white p-3 rounded-lg">
              <div className="text-xs space-y-1">
                <div className="font-medium text-green-400">{realTimeMetrics.analysisType}</div>
                <div>Eye Contact: {Math.round(realTimeMetrics.eyeContact)}%</div>
                <div>Speech Clarity: {Math.round(realTimeMetrics.speechClarity)}%</div>
                <div>Confidence: {Math.round(realTimeMetrics.confidence)}%</div>
              </div>
            </div>
          )}

          {/* Camera/Mic Controls */}
          <div className="absolute bottom-4 left-4 flex space-x-2">
            <button
              onClick={() => setCameraEnabled(!cameraEnabled)}
              className={`p-2 rounded-full ${cameraEnabled ? 'bg-gray-700' : 'bg-red-600'} text-white`}
            >
              {cameraEnabled ? <Camera className="h-4 w-4" /> : <VideoOff className="h-4 w-4" />}
            </button>
            <button
              onClick={() => setMicEnabled(!micEnabled)}
              className={`p-2 rounded-full ${micEnabled ? 'bg-gray-700' : 'bg-red-600'} text-white`}
            >
              {micEnabled ? <Mic className="h-4 w-4" /> : <MicOff className="h-4 w-4" />}
            </button>
          </div>
        </div>
      </Card>

      {/* Analysis Status */}
      {isAnalyzing && (
        <Card>
          <div className="text-center py-8">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Brain className="h-8 w-8 text-blue-600 animate-pulse" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              {mlConnected ? 'Analyzing Your Performance with Real ML' : 'Generating Demo Analysis'}
            </h3>
            <p className="text-gray-600 mb-4">
              {mlConnected 
                ? 'Our AI is analyzing your body language and speech patterns...'
                : 'Generating simulated analysis results for demonstration...'
              }
            </p>
            <div className="max-w-xs mx-auto">
              <ProgressBar progress={66} animated />
            </div>
            <div className="mt-4 text-sm text-gray-500">
              This may take a few moments
            </div>
          </div>
        </Card>
      )}

      {/* Controls */}
      <div className="flex justify-center space-x-4">
        {!isRecording ? (
          <Button onClick={startRecording} size="lg" className="px-8">
            <Play className="h-5 w-5 mr-2" />
            Start Recording
          </Button>
        ) : (
          <Button onClick={stopRecording} size="lg" className="px-8" variant="destructive">
            <Square className="h-5 w-5 mr-2" />
            Stop & Analyze
          </Button>
        )}
        
        <Button onClick={onCancel} variant="outline" size="lg">
          Cancel
        </Button>
      </div>

      {/* Tips */}
      <Card>
        <h4 className="text-lg font-semibold text-gray-900 mb-4">Tips for Best Results</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex items-start space-x-3">
            <Camera className="h-5 w-5 text-blue-600 mt-0.5" />
            <div>
              <p className="text-sm font-medium text-gray-900">Camera Position</p>
              <p className="text-xs text-gray-600">Position camera at eye level for best analysis</p>
            </div>
          </div>
          <div className="flex items-start space-x-3">
            <Eye className="h-5 w-5 text-green-600 mt-0.5" />
            <div>
              <p className="text-sm font-medium text-gray-900">Eye Contact</p>
              <p className="text-xs text-gray-600">Look directly at the camera lens</p>
            </div>
          </div>
          <div className="flex items-start space-x-3">
            <Volume2 className="h-5 w-5 text-purple-600 mt-0.5" />
            <div>
              <p className="text-sm font-medium text-gray-900">Audio Quality</p>
              <p className="text-xs text-gray-600">Speak clearly in a quiet environment</p>
            </div>
          </div>
          <div className="flex items-start space-x-3">
            <TrendingUp className="h-5 w-5 text-orange-600 mt-0.5" />
            <div>
              <p className="text-sm font-medium text-gray-900">Body Language</p>
              <p className="text-xs text-gray-600">Sit up straight and use natural gestures</p>
            </div>
          </div>
        </div>
        
        {!mlConnected && (
          <div className="mt-4 p-3 bg-orange-50 rounded-lg border border-orange-200">
            <p className="text-sm text-orange-800">
              <strong>Note:</strong> ML backend is not available, so this will run in demo mode with simulated results. 
              To enable real ML analysis, ensure your backend server is running with ML dependencies installed.
            </p>
          </div>
        )}
      </Card>
    </div>
  );
};

export default MLInterviewAnalysis;