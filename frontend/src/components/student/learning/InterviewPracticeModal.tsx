import React, { useState, useRef, useEffect } from 'react';
import { 
  X, 
  GraduationCap, 
  Briefcase, 
  Play, 
  Pause, 
  Square, 
  Video, 
  Mic, 
  Settings,
  Clock,
  BarChart3,
  Eye,
  Volume2,
  MessageSquare,
  Download,
  RotateCcw,
  Shield,
  AlertCircle,
  CheckCircle,
  ChevronRight,
  Zap,
  Target,
  TrendingUp,
  FileText
} from 'lucide-react';
import Button from '../../shared/ui/Button';
import Card from '../../shared/ui/Card';

interface InterviewPracticeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

type InterviewType = 'college' | 'job' | null;
type PracticeMode = 'quick' | 'mock' | 'custom' | 'review';
type SessionStep = 'selection' | 'mode' | 'consent' | 'practice' | 'report';

interface Question {
  id: string;
  text: string;
  category: string;
  difficulty: 'easy' | 'medium' | 'hard';
  timeLimit: number; // in seconds
}

interface LiveMetrics {
  eyeContact: number;
  posture: number;
  voiceClarity: number;
  pace: number;
  fillerWords: number;
  confidence: number;
}

interface SessionReport {
  overallScore: number;
  bodyLanguageScore: number;
  vocalScore: number;
  contentScore: number;
  transcript: string;
  timeStampedFlags: Array<{
    timestamp: number;
    type: 'positive' | 'warning' | 'improvement';
    message: string;
  }>;
  suggestions: string[];
  duration: number;
}

const InterviewPracticeModal: React.FC<InterviewPracticeModalProps> = ({ isOpen, onClose }) => {
  const [currentStep, setCurrentStep] = useState<SessionStep>('selection');
  const [interviewType, setInterviewType] = useState<InterviewType>(null);
  const [practiceMode, setPracticeMode] = useState<PracticeMode>('mock');
  const [customQuestionCount, setCustomQuestionCount] = useState(5);
  const [consentGiven, setConsentGiven] = useState(false);
  const [recordingConsent, setRecordingConsent] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [sessionStartTime, setSessionStartTime] = useState<Date | null>(null);
  const [liveMetrics, setLiveMetrics] = useState<LiveMetrics>({
    eyeContact: 75,
    posture: 80,
    voiceClarity: 70,
    pace: 85,
    fillerWords: 3,
    confidence: 78
  });
  const [liveTipsEnabled, setLiveTipsEnabled] = useState(true);
  const [tipIntensity, setTipIntensity] = useState<'low' | 'medium' | 'high'>('medium');
  const [currentTip, setCurrentTip] = useState<string | null>(null);
  const [sessionReport, setSessionReport] = useState<SessionReport | null>(null);
  
  const videoRef = useRef<HTMLVideoElement>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const streamRef = useRef<MediaStream | null>(null);

  const collegeQuestions: Question[] = [
    {
      id: 'c1',
      text: 'Why do you want to attend this college?',
      category: 'Motivation',
      difficulty: 'medium',
      timeLimit: 120
    },
    {
      id: 'c2',
      text: 'Tell me about a challenge you overcame in high school.',
      category: 'Personal Growth',
      difficulty: 'medium',
      timeLimit: 150
    },
    {
      id: 'c3',
      text: 'What do you hope to contribute to our campus community?',
      category: 'Community',
      difficulty: 'medium',
      timeLimit: 120
    },
    {
      id: 'c4',
      text: 'Describe your academic interests and career goals.',
      category: 'Academic',
      difficulty: 'easy',
      timeLimit: 180
    },
    {
      id: 'c5',
      text: 'How do you handle stress and pressure?',
      category: 'Personal Skills',
      difficulty: 'hard',
      timeLimit: 120
    }
  ];

  const jobQuestions: Question[] = [
    {
      id: 'j1',
      text: 'Tell me about yourself.',
      category: 'Introduction',
      difficulty: 'easy',
      timeLimit: 120
    },
    {
      id: 'j2',
      text: 'Why are you interested in this position?',
      category: 'Motivation',
      difficulty: 'medium',
      timeLimit: 120
    },
    {
      id: 'j3',
      text: 'Describe a time when you worked as part of a team.',
      category: 'Teamwork',
      difficulty: 'medium',
      timeLimit: 150
    },
    {
      id: 'j4',
      text: 'What are your greatest strengths and weaknesses?',
      category: 'Self-Assessment',
      difficulty: 'hard',
      timeLimit: 180
    },
    {
      id: 'j5',
      text: 'Where do you see yourself in five years?',
      category: 'Career Goals',
      difficulty: 'medium',
      timeLimit: 120
    }
  ];

  const getQuestions = (): Question[] => {
    const questions = interviewType === 'college' ? collegeQuestions : jobQuestions;
    
    switch (practiceMode) {
      case 'quick':
        return [questions[0]];
      case 'mock':
        return questions.slice(0, 3);
      case 'custom':
        return questions.slice(0, Math.min(customQuestionCount, questions.length));
      default:
        return questions.slice(0, 3);
    }
  };

  const currentQuestions = getQuestions();
  const currentQuestion = currentQuestions[currentQuestionIndex];

  useEffect(() => {
    if (currentStep === 'practice' && isRecording) {
      // Simulate live metrics updates
      const interval = setInterval(() => {
        setLiveMetrics(prev => ({
          eyeContact: Math.max(0, Math.min(100, prev.eyeContact + (Math.random() - 0.5) * 10)),
          posture: Math.max(0, Math.min(100, prev.posture + (Math.random() - 0.5) * 8)),
          voiceClarity: Math.max(0, Math.min(100, prev.voiceClarity + (Math.random() - 0.5) * 12)),
          pace: Math.max(0, Math.min(100, prev.pace + (Math.random() - 0.5) * 15)),
          fillerWords: Math.max(0, prev.fillerWords + (Math.random() > 0.8 ? 1 : 0)),
          confidence: Math.max(0, Math.min(100, prev.confidence + (Math.random() - 0.5) * 6))
        }));
      }, 2000);

      return () => clearInterval(interval);
    }
  }, [currentStep, isRecording]);

  useEffect(() => {
    if (currentStep === 'practice' && isRecording && liveTipsEnabled) {
      // Simulate live tips
      const tipInterval = setInterval(() => {
        const tips = [
          "Great eye contact! Keep it up.",
          "Try to slow down your pace slightly.",
          "Excellent posture - you look confident.",
          "Consider pausing before answering.",
          "Your voice is clear and engaging.",
          "Try to minimize filler words like 'um'."
        ];
        
        if (Math.random() > 0.7) {
          setCurrentTip(tips[Math.floor(Math.random() * tips.length)]);
          setTimeout(() => setCurrentTip(null), 3000);
        }
      }, tipIntensity === 'high' ? 4000 : tipIntensity === 'medium' ? 6000 : 8000);

      return () => clearInterval(tipInterval);
    }
  }, [currentStep, isRecording, liveTipsEnabled, tipIntensity]);

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ 
        video: true, 
        audio: true 
      });
      
      streamRef.current = stream;
      
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }

      if (recordingConsent) {
        const mediaRecorder = new MediaRecorder(stream);
        mediaRecorderRef.current = mediaRecorder;
      }
      
      return true;
    } catch (error) {
      console.error('Error accessing camera/microphone:', error);
      return false;
    }
  };

  const stopCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
      streamRef.current = null;
    }
    
    if (mediaRecorderRef.current) {
      mediaRecorderRef.current.stop();
      mediaRecorderRef.current = null;
    }
  };

  const startPracticeSession = async () => {
    const cameraStarted = await startCamera();
    if (cameraStarted) {
      setCurrentStep('practice');
      setSessionStartTime(new Date());
      setIsRecording(true);
      setCurrentQuestionIndex(0);
    }
  };

  const nextQuestion = () => {
    if (currentQuestionIndex < currentQuestions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    } else {
      endSession();
    }
  };

  const endSession = () => {
    setIsRecording(false);
    stopCamera();
    
    // Generate mock report
    const report: SessionReport = {
      overallScore: Math.floor(Math.random() * 20) + 75,
      bodyLanguageScore: Math.floor(Math.random() * 20) + 70,
      vocalScore: Math.floor(Math.random() * 20) + 75,
      contentScore: Math.floor(Math.random() * 20) + 80,
      transcript: "This is a sample transcript of your interview responses. In a real implementation, this would contain the actual transcribed speech from your session.",
      timeStampedFlags: [
        { timestamp: 15, type: 'positive', message: 'Excellent eye contact established' },
        { timestamp: 45, type: 'warning', message: 'Speaking pace increased - try to slow down' },
        { timestamp: 78, type: 'improvement', message: 'Good use of specific examples' },
        { timestamp: 120, type: 'positive', message: 'Confident body language maintained' }
      ],
      suggestions: [
        'Practice maintaining consistent eye contact throughout longer responses',
        'Work on reducing filler words - try pausing instead of saying "um"',
        'Your content was strong - continue using specific examples',
        'Consider practicing breathing techniques to manage pace'
      ],
      duration: sessionStartTime ? (Date.now() - sessionStartTime.getTime()) / 1000 : 0
    };
    
    setSessionReport(report);
    setCurrentStep('report');
  };

  const downloadReport = () => {
    if (!sessionReport) return;
    
    const reportContent = `
Interview Practice Report
========================

Overall Score: ${sessionReport.overallScore}/100

Sub-Scores:
- Body Language: ${sessionReport.bodyLanguageScore}/100
- Vocal Delivery: ${sessionReport.vocalScore}/100
- Content Quality: ${sessionReport.contentScore}/100

Duration: ${Math.floor(sessionReport.duration / 60)}:${Math.floor(sessionReport.duration % 60).toString().padStart(2, '0')}

Suggestions for Improvement:
${sessionReport.suggestions.map(s => `• ${s}`).join('\n')}

Transcript:
${sessionReport.transcript}
    `;
    
    const blob = new Blob([reportContent], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `interview-report-${new Date().toISOString().split('T')[0]}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const resetSession = () => {
    setCurrentStep('selection');
    setInterviewType(null);
    setPracticeMode('mock');
    setConsentGiven(false);
    setRecordingConsent(false);
    setIsRecording(false);
    setCurrentQuestionIndex(0);
    setSessionStartTime(null);
    setSessionReport(null);
    setCurrentTip(null);
    stopCamera();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-purple-600 rounded-xl flex items-center justify-center">
              <Video className="h-5 w-5 text-white" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-900">AI Interview Practice</h2>
              <p className="text-sm text-gray-600">Real-time coaching and feedback</p>
            </div>
          </div>
          <Button variant="ghost" onClick={onClose}>
            <X className="h-5 w-5" />
          </Button>
        </div>

        {/* Content */}
        <div className="p-6">
          {currentStep === 'selection' && (
            <div className="space-y-6">
              <div className="text-center">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">Choose Interview Type</h3>
                <p className="text-gray-600">Select the type of interview you'd like to practice</p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card 
                  className={`cursor-pointer transition-all duration-200 hover:shadow-lg ${
                    interviewType === 'college' ? 'ring-2 ring-purple-500 bg-purple-50' : ''
                  }`}
                  onClick={() => setInterviewType('college')}
                >
                  <div className="text-center p-6">
                    <GraduationCap className="h-16 w-16 text-blue-600 mx-auto mb-4" />
                    <h4 className="text-xl font-bold text-gray-900 mb-2">College Interview</h4>
                    <p className="text-gray-600 mb-4">Practice for college admissions interviews</p>
                    <div className="text-sm text-gray-500">
                      • Personal motivation questions
                      • Academic interest discussions
                      • Community involvement topics
                    </div>
                  </div>
                </Card>

                <Card 
                  className={`cursor-pointer transition-all duration-200 hover:shadow-lg ${
                    interviewType === 'job' ? 'ring-2 ring-purple-500 bg-purple-50' : ''
                  }`}
                  onClick={() => setInterviewType('job')}
                >
                  <div className="text-center p-6">
                    <Briefcase className="h-16 w-16 text-green-600 mx-auto mb-4" />
                    <h4 className="text-xl font-bold text-gray-900 mb-2">Job Interview</h4>
                    <p className="text-gray-600 mb-4">Practice for internship and job interviews</p>
                    <div className="text-sm text-gray-500">
                      • Behavioral questions
                      • Skills and experience
                      • Career goals discussion
                    </div>
                  </div>
                </Card>
              </div>

              <div className="flex justify-center">
                <Button 
                  onClick={() => setCurrentStep('mode')}
                  disabled={!interviewType}
                  size="lg"
                >
                  Continue
                  <ChevronRight className="h-4 w-4 ml-2" />
                </Button>
              </div>
            </div>
          )}

          {currentStep === 'mode' && (
            <div className="space-y-6">
              <div className="text-center">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">Choose Practice Mode</h3>
                <p className="text-gray-600">Select how you'd like to practice</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <Card 
                  className={`cursor-pointer transition-all duration-200 hover:shadow-lg ${
                    practiceMode === 'quick' ? 'ring-2 ring-purple-500 bg-purple-50' : ''
                  }`}
                  onClick={() => setPracticeMode('quick')}
                >
                  <div className="text-center p-4">
                    <Zap className="h-8 w-8 text-yellow-600 mx-auto mb-2" />
                    <h4 className="font-bold text-gray-900 mb-1">Quick Practice</h4>
                    <p className="text-sm text-gray-600 mb-2">1 question</p>
                    <p className="text-xs text-gray-500">~2 minutes</p>
                  </div>
                </Card>

                <Card 
                  className={`cursor-pointer transition-all duration-200 hover:shadow-lg ${
                    practiceMode === 'mock' ? 'ring-2 ring-purple-500 bg-purple-50' : ''
                  }`}
                  onClick={() => setPracticeMode('mock')}
                >
                  <div className="text-center p-4">
                    <Target className="h-8 w-8 text-blue-600 mx-auto mb-2" />
                    <h4 className="font-bold text-gray-900 mb-1">Mock Interview</h4>
                    <p className="text-sm text-gray-600 mb-2">3 questions</p>
                    <p className="text-xs text-gray-500">~8 minutes</p>
                  </div>
                </Card>

                <Card 
                  className={`cursor-pointer transition-all duration-200 hover:shadow-lg ${
                    practiceMode === 'custom' ? 'ring-2 ring-purple-500 bg-purple-50' : ''
                  }`}
                  onClick={() => setPracticeMode('custom')}
                >
                  <div className="text-center p-4">
                    <Settings className="h-8 w-8 text-green-600 mx-auto mb-2" />
                    <h4 className="font-bold text-gray-900 mb-1">Custom</h4>
                    <p className="text-sm text-gray-600 mb-2">Choose count</p>
                    <p className="text-xs text-gray-500">Variable time</p>
                  </div>
                </Card>

                <Card 
                  className={`cursor-pointer transition-all duration-200 hover:shadow-lg ${
                    practiceMode === 'review' ? 'ring-2 ring-purple-500 bg-purple-50' : ''
                  }`}
                  onClick={() => setPracticeMode('review')}
                >
                  <div className="text-center p-4">
                    <FileText className="h-8 w-8 text-purple-600 mx-auto mb-2" />
                    <h4 className="font-bold text-gray-900 mb-1">Review</h4>
                    <p className="text-sm text-gray-600 mb-2">Past sessions</p>
                    <p className="text-xs text-gray-500">Analysis</p>
                  </div>
                </Card>
              </div>

              {practiceMode === 'custom' && (
                <Card className="bg-gray-50">
                  <div className="p-4">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Number of questions (1-5):
                    </label>
                    <input
                      type="range"
                      min="1"
                      max="5"
                      value={customQuestionCount}
                      onChange={(e) => setCustomQuestionCount(parseInt(e.target.value))}
                      className="w-full"
                    />
                    <div className="text-center mt-2">
                      <span className="text-lg font-bold text-purple-600">{customQuestionCount}</span>
                      <span className="text-sm text-gray-600 ml-2">questions</span>
                    </div>
                  </div>
                </Card>
              )}

              <div className="flex justify-center space-x-4">
                <Button variant="outline" onClick={() => setCurrentStep('selection')}>
                  Back
                </Button>
                <Button 
                  onClick={() => setCurrentStep('consent')}
                  size="lg"
                  disabled={practiceMode === 'review'}
                >
                  Continue
                  <ChevronRight className="h-4 w-4 ml-2" />
                </Button>
              </div>
            </div>
          )}

          {currentStep === 'consent' && (
            <div className="space-y-6">
              <div className="text-center">
                <Shield className="h-16 w-16 text-blue-600 mx-auto mb-4" />
                <h3 className="text-2xl font-bold text-gray-900 mb-2">Privacy & Permissions</h3>
                <p className="text-gray-600">We need access to your camera and microphone for the practice session</p>
              </div>

              <Card className="bg-blue-50 border-blue-200">
                <div className="p-6">
                  <h4 className="font-bold text-gray-900 mb-4">What we'll use:</h4>
                  <div className="space-y-3">
                    <div className="flex items-center space-x-3">
                      <Video className="h-5 w-5 text-blue-600" />
                      <span className="text-gray-700">Camera for body language analysis</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Mic className="h-5 w-5 text-blue-600" />
                      <span className="text-gray-700">Microphone for speech analysis</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <BarChart3 className="h-5 w-5 text-blue-600" />
                      <span className="text-gray-700">Real-time feedback and scoring</span>
                    </div>
                  </div>
                </div>
              </Card>

              <Card className="bg-yellow-50 border-yellow-200">
                <div className="p-6">
                  <div className="flex items-start space-x-3">
                    <AlertCircle className="h-5 w-5 text-yellow-600 mt-0.5" />
                    <div>
                      <h4 className="font-bold text-gray-900 mb-2">Data Handling</h4>
                      <p className="text-sm text-gray-700 mb-4">
                        By default, we only process your audio and video in real-time for feedback. 
                        No recordings are saved unless you explicitly opt-in below.
                      </p>
                      
                      <div className="space-y-3">
                        <label className="flex items-start space-x-3">
                          <input
                            type="checkbox"
                            checked={consentGiven}
                            onChange={(e) => setConsentGiven(e.target.checked)}
                            className="mt-1"
                          />
                          <span className="text-sm text-gray-700">
                            I consent to camera and microphone access for real-time analysis
                          </span>
                        </label>
                        
                        <label className="flex items-start space-x-3">
                          <input
                            type="checkbox"
                            checked={recordingConsent}
                            onChange={(e) => setRecordingConsent(e.target.checked)}
                            className="mt-1"
                          />
                          <span className="text-sm text-gray-700">
                            <strong>Optional:</strong> Save my session recording for detailed review 
                            (recordings are stored locally and can be deleted anytime)
                          </span>
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>

              <div className="flex justify-center space-x-4">
                <Button variant="outline" onClick={() => setCurrentStep('mode')}>
                  Back
                </Button>
                <Button 
                  onClick={startPracticeSession}
                  disabled={!consentGiven}
                  size="lg"
                >
                  Start Practice
                  <Play className="h-4 w-4 ml-2" />
                </Button>
              </div>
            </div>
          )}

          {currentStep === 'practice' && (
            <div className="space-y-6">
              {/* Practice Header */}
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-xl font-bold text-gray-900">
                    Question {currentQuestionIndex + 1} of {currentQuestions.length}
                  </h3>
                  <p className="text-sm text-gray-600">
                    {interviewType === 'college' ? 'College Interview' : 'Job Interview'} • {currentQuestion?.category}
                  </p>
                </div>
                <div className="flex items-center space-x-4">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setLiveTipsEnabled(!liveTipsEnabled)}
                  >
                    <Zap className={`h-4 w-4 mr-2 ${liveTipsEnabled ? 'text-yellow-500' : 'text-gray-400'}`} />
                    Tips {liveTipsEnabled ? 'On' : 'Off'}
                  </Button>
                  <Button variant="outline" onClick={endSession}>
                    End Session
                  </Button>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Video Feed */}
                <div className="lg:col-span-2">
                  <Card className="relative">
                    <video
                      ref={videoRef}
                      autoPlay
                      muted
                      className="w-full h-64 lg:h-80 object-cover rounded-lg bg-gray-900"
                    />
                    
                    {/* Recording Indicator */}
                    {isRecording && (
                      <div className="absolute top-4 left-4 flex items-center space-x-2 bg-red-600 text-white px-3 py-1 rounded-full">
                        <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
                        <span className="text-sm font-medium">Recording</span>
                      </div>
                    )}

                    {/* Live Tip Overlay */}
                    {currentTip && liveTipsEnabled && (
                      <div className="absolute bottom-4 left-4 right-4 bg-black bg-opacity-80 text-white p-3 rounded-lg">
                        <div className="flex items-center space-x-2">
                          <Zap className="h-4 w-4 text-yellow-400" />
                          <span className="text-sm">{currentTip}</span>
                        </div>
                      </div>
                    )}
                  </Card>

                  {/* Question Card */}
                  <Card className="mt-4 bg-gradient-to-r from-purple-50 to-indigo-50 border-purple-200">
                    <div className="p-6">
                      <div className="flex items-center justify-between mb-4">
                        <h4 className="text-lg font-bold text-gray-900">Current Question</h4>
                        <div className="flex items-center space-x-2 text-sm text-gray-600">
                          <Clock className="h-4 w-4" />
                          <span>{currentQuestion?.timeLimit}s suggested</span>
                        </div>
                      </div>
                      <p className="text-xl text-gray-800 leading-relaxed">
                        {currentQuestion?.text}
                      </p>
                      <div className="mt-4 flex justify-between items-center">
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                          currentQuestion?.difficulty === 'easy' ? 'bg-green-100 text-green-800' :
                          currentQuestion?.difficulty === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                          'bg-red-100 text-red-800'
                        }`}>
                          {currentQuestion?.difficulty}
                        </span>
                        <Button onClick={nextQuestion}>
                          {currentQuestionIndex < currentQuestions.length - 1 ? 'Next Question' : 'Finish'}
                          <ChevronRight className="h-4 w-4 ml-2" />
                        </Button>
                      </div>
                    </div>
                  </Card>
                </div>

                {/* Live Metrics */}
                <div className="space-y-4">
                  <Card>
                    <div className="p-4">
                      <h4 className="font-bold text-gray-900 mb-4 flex items-center">
                        <BarChart3 className="h-4 w-4 mr-2" />
                        Live Metrics
                      </h4>
                      
                      <div className="space-y-3">
                        <div>
                          <div className="flex justify-between text-sm mb-1">
                            <span className="flex items-center">
                              <Eye className="h-3 w-3 mr-1" />
                              Eye Contact
                            </span>
                            <span>{Math.round(liveMetrics.eyeContact)}%</span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div 
                              className="bg-blue-600 h-2 rounded-full transition-all duration-500"
                              style={{ width: `${liveMetrics.eyeContact}%` }}
                            ></div>
                          </div>
                        </div>

                        <div>
                          <div className="flex justify-between text-sm mb-1">
                            <span>Posture</span>
                            <span>{Math.round(liveMetrics.posture)}%</span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div 
                              className="bg-green-600 h-2 rounded-full transition-all duration-500"
                              style={{ width: `${liveMetrics.posture}%` }}
                            ></div>
                          </div>
                        </div>

                        <div>
                          <div className="flex justify-between text-sm mb-1">
                            <span className="flex items-center">
                              <Volume2 className="h-3 w-3 mr-1" />
                              Voice Clarity
                            </span>
                            <span>{Math.round(liveMetrics.voiceClarity)}%</span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div 
                              className="bg-purple-600 h-2 rounded-full transition-all duration-500"
                              style={{ width: `${liveMetrics.voiceClarity}%` }}
                            ></div>
                          </div>
                        </div>

                        <div>
                          <div className="flex justify-between text-sm mb-1">
                            <span>Speaking Pace</span>
                            <span>{Math.round(liveMetrics.pace)}%</span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div 
                              className="bg-orange-600 h-2 rounded-full transition-all duration-500"
                              style={{ width: `${liveMetrics.pace}%` }}
                            ></div>
                          </div>
                        </div>

                        <div>
                          <div className="flex justify-between text-sm mb-1">
                            <span>Confidence</span>
                            <span>{Math.round(liveMetrics.confidence)}%</span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div 
                              className="bg-indigo-600 h-2 rounded-full transition-all duration-500"
                              style={{ width: `${liveMetrics.confidence}%` }}
                            ></div>
                          </div>
                        </div>

                        <div className="pt-2 border-t border-gray-200">
                          <div className="flex justify-between text-sm">
                            <span>Filler Words</span>
                            <span className="font-medium">{liveMetrics.fillerWords}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Card>

                  <Card>
                    <div className="p-4">
                      <h4 className="font-bold text-gray-900 mb-3">Settings</h4>
                      <div className="space-y-3">
                        <div>
                          <label className="text-sm font-medium text-gray-700">Tip Intensity</label>
                          <select
                            value={tipIntensity}
                            onChange={(e) => setTipIntensity(e.target.value as 'low' | 'medium' | 'high')}
                            className="w-full mt-1 text-sm border border-gray-300 rounded px-2 py-1"
                          >
                            <option value="low">Low (every 8s)</option>
                            <option value="medium">Medium (every 6s)</option>
                            <option value="high">High (every 4s)</option>
                          </select>
                        </div>
                      </div>
                    </div>
                  </Card>
                </div>
              </div>
            </div>
          )}

          {currentStep === 'report' && sessionReport && (
            <div className="space-y-6">
              <div className="text-center">
                <CheckCircle className="h-16 w-16 text-green-600 mx-auto mb-4" />
                <h3 className="text-2xl font-bold text-gray-900 mb-2">Session Complete!</h3>
                <p className="text-gray-600">Here's your detailed performance report</p>
              </div>

              {/* Overall Score */}
              <Card className="bg-gradient-to-r from-green-50 to-emerald-50 border-green-200">
                <div className="p-6 text-center">
                  <div className="text-4xl font-bold text-green-600 mb-2">
                    {sessionReport.overallScore}/100
                  </div>
                  <p className="text-lg font-medium text-gray-900">Overall Score</p>
                  <p className="text-sm text-gray-600 mt-2">
                    Duration: {Math.floor(sessionReport.duration / 60)}:{Math.floor(sessionReport.duration % 60).toString().padStart(2, '0')}
                  </p>
                </div>
              </Card>

              {/* Sub-scores */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card>
                  <div className="p-4 text-center">
                    <Eye className="h-8 w-8 text-blue-600 mx-auto mb-2" />
                    <div className="text-2xl font-bold text-gray-900">{sessionReport.bodyLanguageScore}</div>
                    <p className="text-sm text-gray-600">Body Language</p>
                  </div>
                </Card>
                <Card>
                  <div className="p-4 text-center">
                    <Volume2 className="h-8 w-8 text-purple-600 mx-auto mb-2" />
                    <div className="text-2xl font-bold text-gray-900">{sessionReport.vocalScore}</div>
                    <p className="text-sm text-gray-600">Vocal Delivery</p>
                  </div>
                </Card>
                <Card>
                  <div className="p-4 text-center">
                    <MessageSquare className="h-8 w-8 text-green-600 mx-auto mb-2" />
                    <div className="text-2xl font-bold text-gray-900">{sessionReport.contentScore}</div>
                    <p className="text-sm text-gray-600">Content Quality</p>
                  </div>
                </Card>
              </div>

              {/* Timestamped Flags */}
              <Card>
                <div className="p-6">
                  <h4 className="font-bold text-gray-900 mb-4">Key Moments</h4>
                  <div className="space-y-3">
                    {sessionReport.timeStampedFlags.map((flag, index) => (
                      <div key={index} className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg">
                        <div className={`w-2 h-2 rounded-full mt-2 ${
                          flag.type === 'positive' ? 'bg-green-500' :
                          flag.type === 'warning' ? 'bg-yellow-500' : 'bg-blue-500'
                        }`}></div>
                        <div className="flex-1">
                          <div className="flex items-center space-x-2 mb-1">
                            <span className="text-sm font-medium text-gray-900">
                              {Math.floor(flag.timestamp / 60)}:{(flag.timestamp % 60).toString().padStart(2, '0')}
                            </span>
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                              flag.type === 'positive' ? 'bg-green-100 text-green-800' :
                              flag.type === 'warning' ? 'bg-yellow-100 text-yellow-800' :
                              'bg-blue-100 text-blue-800'
                            }`}>
                              {flag.type}
                            </span>
                          </div>
                          <p className="text-sm text-gray-700">{flag.message}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </Card>

              {/* Suggestions */}
              <Card>
                <div className="p-6">
                  <h4 className="font-bold text-gray-900 mb-4">Suggestions for Improvement</h4>
                  <div className="space-y-2">
                    {sessionReport.suggestions.map((suggestion, index) => (
                      <div key={index} className="flex items-start space-x-2">
                        <TrendingUp className="h-4 w-4 text-blue-600 mt-0.5 flex-shrink-0" />
                        <p className="text-sm text-gray-700">{suggestion}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </Card>

              {/* Transcript */}
              <Card>
                <div className="p-6">
                  <h4 className="font-bold text-gray-900 mb-4">Session Transcript</h4>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <p className="text-sm text-gray-700 leading-relaxed">
                      {sessionReport.transcript}
                    </p>
                  </div>
                </div>
              </Card>

              {/* Actions */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button onClick={downloadReport}>
                  <Download className="h-4 w-4 mr-2" />
                  Download Report
                </Button>
                <Button variant="outline" onClick={resetSession}>
                  <RotateCcw className="h-4 w-4 mr-2" />
                  Practice Again
                </Button>
                <Button variant="outline" onClick={onClose}>
                  Close
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default InterviewPracticeModal;