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
  FileText,
  Camera,
  MicOff,
  VideoOff,
  ChevronDown,
  Monitor,
  Headphones,
  ArrowLeft
} from 'lucide-react';
import Button from '../../shared/ui/Button';
import Card from '../../shared/ui/Card';
import { InterviewQuestion, getRandomQuestions } from '../../../data/interviewQuestions';
import { interviewService, LiveMetrics, SessionReport, DeviceInfo, LiveTip } from '../../../services/interviewService';

interface InterviewPracticeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

type InterviewType = 'college' | 'job' | null;
type PracticeMode = 'quick' | 'mock' | 'custom';
type SessionStep = 'selection' | 'mode' | 'consent' | 'setup' | 'practice' | 'report';

const InterviewPracticeModal: React.FC<InterviewPracticeModalProps> = ({ isOpen, onClose }) => {
  const [currentStep, setCurrentStep] = useState<SessionStep>('selection');
  const [interviewType, setInterviewType] = useState<InterviewType>(null);
  const [practiceMode, setPracticeMode] = useState<PracticeMode>('mock');
  const [customQuestionCount, setCustomQuestionCount] = useState(3);
  const [consentGiven, setConsentGiven] = useState(false);
  const [recordingConsent, setRecordingConsent] = useState(false);
  const [liveTipsEnabled, setLiveTipsEnabled] = useState(true);
  const [tipIntensity, setTipIntensity] = useState<'low' | 'medium' | 'high'>('medium');
  
  // Device management
  const [availableDevices, setAvailableDevices] = useState<{ cameras: DeviceInfo[], microphones: DeviceInfo[] }>({ cameras: [], microphones: [] });
  const [selectedCamera, setSelectedCamera] = useState<string>('');
  const [selectedMicrophone, setSelectedMicrophone] = useState<string>('');
  const [deviceError, setDeviceError] = useState<string | null>(null);
  const [isTestingDevices, setIsTestingDevices] = useState(false);
  
  // Session state
  const [isRecording, setIsRecording] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [sessionStartTime, setSessionStartTime] = useState<Date | null>(null);
  const [questionStartTime, setQuestionStartTime] = useState<Date | null>(null);
  const [timeRemaining, setTimeRemaining] = useState<number | null>(null);
  const [currentQuestions, setCurrentQuestions] = useState<InterviewQuestion[]>([]);
  
  // Live feedback
  const [liveMetrics, setLiveMetrics] = useState<LiveMetrics>({
    timestamp: 0,
    eyeContact: 75,
    posture: 80,
    voiceClarity: 70,
    speakingPace: 140,
    fillerWordCount: 0,
    confidenceLevel: 78,
    volume: 65
  });
  const [currentTip, setCurrentTip] = useState<string | null>(null);
  
  // Results
  const [sessionReport, setSessionReport] = useState<SessionReport | null>(null);
  const [isGeneratingReport, setIsGeneratingReport] = useState(false);
  
  const videoRef = useRef<HTMLVideoElement>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const currentQuestion = currentQuestions[currentQuestionIndex];

  // Load available devices when setup step is reached
  useEffect(() => {
    if (currentStep === 'setup') {
      loadDevices();
    }
  }, [currentStep]);

  // Handle live tips
  useEffect(() => {
    const handleTip = (event: CustomEvent<LiveTip>) => {
      setCurrentTip(event.detail.message);
      setTimeout(() => setCurrentTip(null), event.detail.duration);
    };

    window.addEventListener('interviewTip', handleTip as EventListener);
    return () => window.removeEventListener('interviewTip', handleTip as EventListener);
  }, []);

  // Update live metrics during practice
  useEffect(() => {
    if (currentStep === 'practice' && isRecording) {
      const interval = setInterval(() => {
        const metrics = interviewService.getCurrentMetrics();
        setLiveMetrics(metrics);
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [currentStep, isRecording]);

  // Question timer
  useEffect(() => {
    if (currentQuestion && questionStartTime && isRecording && currentQuestion.timeLimit > 0) {
      setTimeRemaining(currentQuestion.timeLimit);
      
      timerRef.current = setInterval(() => {
        setTimeRemaining(prev => {
          if (prev === null || prev <= 1) {
            return 0;
          }
          return prev - 1;
        });
      }, 1000);

      return () => {
        if (timerRef.current) {
          clearInterval(timerRef.current);
        }
      };
    }
  }, [currentQuestion, questionStartTime, isRecording]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      } else if (event.key === 'Enter') {
        if (currentStep === 'selection' && interviewType) {
          setCurrentStep('mode');
        } else if (currentStep === 'mode') {
          setCurrentStep('consent');
        }
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown);
      return () => document.removeEventListener('keydown', handleKeyDown);
    }
  }, [isOpen, currentStep, interviewType]);

  const loadDevices = async () => {
    try {
      const devices = await interviewService.getAvailableDevices();
      setAvailableDevices(devices);
      
      // Set defaults
      if (devices.cameras.length > 0 && !selectedCamera) {
        setSelectedCamera(devices.cameras[0].deviceId);
      }
      if (devices.microphones.length > 0 && !selectedMicrophone) {
        setSelectedMicrophone(devices.microphones[0].deviceId);
      }
    } catch (error) {
      setDeviceError('Unable to load available devices');
    }
  };

  const testDevices = async () => {
    setIsTestingDevices(true);
    setDeviceError(null);

    try {
      const result = await interviewService.startSession({
        videoDeviceId: selectedCamera,
        audioDeviceId: selectedMicrophone,
        enableRecording: false
      });

      if (result.success && result.stream && videoRef.current) {
        videoRef.current.srcObject = result.stream;
        
        // Stop test after 3 seconds
        setTimeout(() => {
          if (result.stream) {
            result.stream.getTracks().forEach(track => track.stop());
          }
          if (videoRef.current) {
            videoRef.current.srcObject = null;
          }
          setIsTestingDevices(false);
        }, 3000);
      } else {
        setDeviceError(result.error || 'Device test failed');
        setIsTestingDevices(false);
      }
    } catch (error) {
      setDeviceError('Device test failed');
      setIsTestingDevices(false);
    }
  };

  const generateQuestions = () => {
    if (!interviewType) return;

    let count = 3; // default for mock
    if (practiceMode === 'quick') count = 1;
    else if (practiceMode === 'custom') count = customQuestionCount;

    const questions = getRandomQuestions(interviewType, count);
    setCurrentQuestions(questions);
  };

  const startPracticeSession = async () => {
    setDeviceError(null);
    generateQuestions();

    const result = await interviewService.startSession({
      videoDeviceId: selectedCamera,
      audioDeviceId: selectedMicrophone,
      enableRecording: recordingConsent,
      tipIntensity
    });

    if (result.success && result.stream) {
      if (videoRef.current) {
        videoRef.current.srcObject = result.stream;
      }
      
      setCurrentStep('practice');
      setSessionStartTime(new Date());
      setQuestionStartTime(new Date());
      setIsRecording(true);
      setCurrentQuestionIndex(0);
    } else {
      setDeviceError(result.error || 'Failed to start session');
    }
  };

  const nextQuestion = () => {
    if (currentQuestionIndex < currentQuestions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
      setQuestionStartTime(new Date());
      setTimeRemaining(null);
    } else {
      endSession();
    }
  };

  const endSession = async () => {
    setIsRecording(false);
    setIsGeneratingReport(true);
    
    try {
      const report = await interviewService.endSession();
      setSessionReport(report);
      setCurrentStep('report');
    } catch (error) {
      console.error('Error generating report:', error);
      setDeviceError('Failed to generate report');
    } finally {
      setIsGeneratingReport(false);
    }
  };

  const downloadReport = () => {
    if (!sessionReport) return;
    
    const reportContent = `
AI Interview Practice Report
===========================

Session Date: ${new Date().toLocaleDateString()}
Interview Type: ${interviewType === 'college' ? 'College Interview' : 'Job Interview'}
Practice Mode: ${practiceMode}
Duration: ${Math.floor(sessionReport.duration / 60)}:${Math.floor(sessionReport.duration % 60).toString().padStart(2, '0')}

OVERALL PERFORMANCE
==================
Overall Score: ${sessionReport.overallScore}/100

DETAILED SCORES
==============
• Body Language: ${sessionReport.subScores.bodyLanguage}/100
• Vocal Delivery: ${sessionReport.subScores.vocalDelivery}/100
• Content Quality: ${sessionReport.subScores.contentQuality}/100
• Confidence Level: ${sessionReport.subScores.confidence}/100

PERFORMANCE METRICS
==================
• Average Response Time: ${Math.round(sessionReport.metrics.averageResponseTime)}s
• Total Filler Words: ${sessionReport.metrics.totalFillerWords}
• Average Eye Contact: ${sessionReport.metrics.averageEyeContact}%
• Average Posture: ${sessionReport.metrics.averagePosture}%
• Speaking Pace Consistency: ${sessionReport.metrics.speakingPaceConsistency}%

STRENGTHS
=========
${sessionReport.strengths.map(s => `• ${s}`).join('\n')}

AREAS FOR IMPROVEMENT
====================
${sessionReport.areasForImprovement.map(s => `• ${s}`).join('\n')}

IMPROVEMENT SUGGESTIONS
======================
${sessionReport.suggestions.map(s => `• ${s}`).join('\n')}

NEXT STEPS
==========
${sessionReport.nextSteps.map(s => `• ${s}`).join('\n')}

QUESTIONS PRACTICED
==================
${currentQuestions.map((q, i) => `${i + 1}. ${q.text} (${q.category} - ${q.difficulty})`).join('\n')}

TRANSCRIPT
==========
${sessionReport.transcript}

Generated by Careerist AI Interview Practice
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
    interviewService.cleanup();
    setCurrentStep('selection');
    setInterviewType(null);
    setPracticeMode('mock');
    setCustomQuestionCount(3);
    setConsentGiven(false);
    setRecordingConsent(false);
    setIsRecording(false);
    setCurrentQuestionIndex(0);
    setSessionStartTime(null);
    setQuestionStartTime(null);
    setTimeRemaining(null);
    setCurrentQuestions([]);
    setSessionReport(null);
    setCurrentTip(null);
    setDeviceError(null);
    setIsTestingDevices(false);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handleClose = () => {
    interviewService.cleanup();
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl max-w-6xl w-full max-h-[95vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200 bg-gradient-to-r from-purple-50 to-indigo-50">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-gradient-to-br from-purple-600 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg">
              <Video className="h-6 w-6 text-white" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-900">AI Interview Practice</h2>
              <p className="text-sm text-gray-600">Real-time ML-powered coaching and feedback</p>
            </div>
          </div>
          <Button variant="ghost" onClick={handleClose} className="hover:bg-white">
            <X className="h-5 w-5" />
          </Button>
        </div>

        {/* Content */}
        <div className="p-6">
          {currentStep === 'selection' && (
            <div className="space-y-8">
              <div className="text-center">
                <h3 className="text-3xl font-bold text-gray-900 mb-4">Choose Interview Type</h3>
                <p className="text-lg text-gray-600">Select the type of interview you'd like to practice</p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                <Card 
                  className={`cursor-pointer transition-all duration-300 hover:shadow-xl hover:-translate-y-1 ${
                    interviewType === 'college' ? 'ring-2 ring-purple-500 bg-purple-50 shadow-lg' : 'hover:shadow-lg'
                  }`}
                  onClick={() => setInterviewType('college')}
                >
                  <div className="text-center p-8">
                    <div className="w-20 h-20 bg-gradient-to-br from-blue-100 to-indigo-200 rounded-2xl flex items-center justify-center mx-auto mb-6">
                      <GraduationCap className="h-10 w-10 text-blue-600" />
                    </div>
                    <h4 className="text-2xl font-bold text-gray-900 mb-3">College Interview</h4>
                    <p className="text-gray-600 mb-6">Practice for college admissions interviews</p>
                    <div className="text-sm text-gray-500 space-y-2 text-left">
                      <div className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                        <span>Personal motivation questions</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                        <span>Academic interest discussions</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                        <span>Community involvement topics</span>
                      </div>
                    </div>
                  </div>
                </Card>

                <Card 
                  className={`cursor-pointer transition-all duration-300 hover:shadow-xl hover:-translate-y-1 ${
                    interviewType === 'job' ? 'ring-2 ring-purple-500 bg-purple-50 shadow-lg' : 'hover:shadow-lg'
                  }`}
                  onClick={() => setInterviewType('job')}
                >
                  <div className="text-center p-8">
                    <div className="w-20 h-20 bg-gradient-to-br from-green-100 to-emerald-200 rounded-2xl flex items-center justify-center mx-auto mb-6">
                      <Briefcase className="h-10 w-10 text-green-600" />
                    </div>
                    <h4 className="text-2xl font-bold text-gray-900 mb-3">Job Interview</h4>
                    <p className="text-gray-600 mb-6">Practice for internship and job interviews</p>
                    <div className="text-sm text-gray-500 space-y-2 text-left">
                      <div className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                        <span>Behavioral questions</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                        <span>Skills and experience</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                        <span>Career goals discussion</span>
                      </div>
                    </div>
                  </div>
                </Card>
              </div>

              <div className="flex justify-center">
                <Button 
                  onClick={() => setCurrentStep('mode')}
                  disabled={!interviewType}
                  size="lg"
                  className="px-8"
                >
                  Continue
                  <ChevronRight className="h-5 w-5 ml-2" />
                </Button>
              </div>
            </div>
          )}

          {currentStep === 'mode' && (
            <div className="space-y-8">
              <div className="text-center">
                <h3 className="text-3xl font-bold text-gray-900 mb-4">Choose Practice Mode</h3>
                <p className="text-lg text-gray-600">Select how you'd like to practice</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
                <Card 
                  className={`cursor-pointer transition-all duration-300 hover:shadow-xl hover:-translate-y-1 ${
                    practiceMode === 'quick' ? 'ring-2 ring-purple-500 bg-purple-50 shadow-lg' : ''
                  }`}
                  onClick={() => setPracticeMode('quick')}
                >
                  <div className="text-center p-6">
                    <div className="w-16 h-16 bg-gradient-to-br from-yellow-100 to-orange-200 rounded-2xl flex items-center justify-center mx-auto mb-4">
                      <Zap className="h-8 w-8 text-yellow-600" />
                    </div>
                    <h4 className="text-xl font-bold text-gray-900 mb-2">Quick Practice</h4>
                    <p className="text-sm text-gray-600 mb-2">1 question</p>
                    <p className="text-xs text-gray-500">~3 minutes</p>
                  </div>
                </Card>

                <Card 
                  className={`cursor-pointer transition-all duration-300 hover:shadow-xl hover:-translate-y-1 ${
                    practiceMode === 'mock' ? 'ring-2 ring-purple-500 bg-purple-50 shadow-lg' : ''
                  }`}
                  onClick={() => setPracticeMode('mock')}
                >
                  <div className="text-center p-6">
                    <div className="w-16 h-16 bg-gradient-to-br from-blue-100 to-indigo-200 rounded-2xl flex items-center justify-center mx-auto mb-4">
                      <Target className="h-8 w-8 text-blue-600" />
                    </div>
                    <h4 className="text-xl font-bold text-gray-900 mb-2">Mock Interview</h4>
                    <p className="text-sm text-gray-600 mb-2">3 questions</p>
                    <p className="text-xs text-gray-500">~10 minutes</p>
                  </div>
                </Card>

                <Card 
                  className={`cursor-pointer transition-all duration-300 hover:shadow-xl hover:-translate-y-1 ${
                    practiceMode === 'custom' ? 'ring-2 ring-purple-500 bg-purple-50 shadow-lg' : ''
                  }`}
                  onClick={() => setPracticeMode('custom')}
                >
                  <div className="text-center p-6">
                    <div className="w-16 h-16 bg-gradient-to-br from-green-100 to-emerald-200 rounded-2xl flex items-center justify-center mx-auto mb-4">
                      <Settings className="h-8 w-8 text-green-600" />
                    </div>
                    <h4 className="text-xl font-bold text-gray-900 mb-2">Custom Session</h4>
                    <p className="text-sm text-gray-600 mb-2">Choose count</p>
                    <p className="text-xs text-gray-500">Variable time</p>
                  </div>
                </Card>
              </div>

              {practiceMode === 'custom' && (
                <Card className="bg-gradient-to-r from-gray-50 to-white max-w-md mx-auto">
                  <div className="p-6 text-center">
                    <h4 className="font-bold text-gray-900 mb-4">Customize Your Session</h4>
                    <label className="block text-sm font-medium text-gray-700 mb-3">
                      Number of questions:
                    </label>
                    <div className="flex items-center justify-center space-x-4 mb-4">
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => setCustomQuestionCount(Math.max(1, customQuestionCount - 1))}
                      >
                        -
                      </Button>
                      <span className="text-2xl font-bold text-purple-600 w-12 text-center">
                        {customQuestionCount}
                      </span>
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => setCustomQuestionCount(Math.min(5, customQuestionCount + 1))}
                      >
                        +
                      </Button>
                    </div>
                    <p className="text-sm text-gray-500">
                      Estimated time: ~{customQuestionCount * 3} minutes
                    </p>
                  </div>
                </Card>
              )}

              <div className="flex justify-center space-x-4">
                <Button variant="outline" onClick={() => setCurrentStep('selection')}>
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back
                </Button>
                <Button 
                  onClick={() => setCurrentStep('consent')}
                  size="lg"
                  className="px-8"
                >
                  Continue
                  <ChevronRight className="h-5 w-5 ml-2" />
                </Button>
              </div>
            </div>
          )}

          {currentStep === 'consent' && (
            <div className="space-y-8">
              <div className="text-center">
                <div className="w-20 h-20 bg-gradient-to-br from-blue-100 to-indigo-200 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <Shield className="h-10 w-10 text-blue-600" />
                </div>
                <h3 className="text-3xl font-bold text-gray-900 mb-4">Privacy & Permissions</h3>
                <p className="text-lg text-gray-600">We need access to your camera and microphone for AI analysis</p>
              </div>

              <div className="max-w-2xl mx-auto space-y-6">
                <Card className="bg-blue-50 border-blue-200">
                  <div className="p-6">
                    <h4 className="font-bold text-gray-900 mb-4 flex items-center">
                      <BarChart3 className="h-5 w-5 mr-2 text-blue-600" />
                      What our AI analyzes:
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-3">
                        <div className="flex items-center space-x-3">
                          <Video className="h-5 w-5 text-blue-600" />
                          <span className="text-gray-700">Eye contact patterns</span>
                        </div>
                        <div className="flex items-center space-x-3">
                          <Eye className="h-5 w-5 text-blue-600" />
                          <span className="text-gray-700">Body posture analysis</span>
                        </div>
                        <div className="flex items-center space-x-3">
                          <Target className="h-5 w-5 text-blue-600" />
                          <span className="text-gray-700">Facial expressions</span>
                        </div>
                      </div>
                      <div className="space-y-3">
                        <div className="flex items-center space-x-3">
                          <Mic className="h-5 w-5 text-blue-600" />
                          <span className="text-gray-700">Speech clarity & pace</span>
                        </div>
                        <div className="flex items-center space-x-3">
                          <Volume2 className="h-5 w-5 text-blue-600" />
                          <span className="text-gray-700">Vocal confidence</span>
                        </div>
                        <div className="flex items-center space-x-3">
                          <MessageSquare className="h-5 w-5 text-blue-600" />
                          <span className="text-gray-700">Filler word detection</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </Card>

                <Card className="bg-yellow-50 border-yellow-200">
                  <div className="p-6">
                    <div className="flex items-start space-x-3">
                      <AlertCircle className="h-6 w-6 text-yellow-600 mt-0.5 flex-shrink-0" />
                      <div className="flex-1">
                        <h4 className="font-bold text-gray-900 mb-3">Privacy & Data Handling</h4>
                        <p className="text-sm text-gray-700 mb-4">
                          Your privacy is our priority. All analysis happens in real-time on your device. 
                          No video or audio data is sent to external servers unless you explicitly opt-in for recording.
                        </p>
                        
                        <div className="space-y-4">
                          <label className="flex items-start space-x-3 cursor-pointer">
                            <input
                              type="checkbox"
                              checked={consentGiven}
                              onChange={(e) => setConsentGiven(e.target.checked)}
                              className="mt-1 rounded border-gray-300 text-purple-600 focus:ring-purple-500"
                            />
                            <span className="text-sm text-gray-700">
                              <strong>Required:</strong> I consent to camera and microphone access for real-time AI analysis
                            </span>
                          </label>
                          
                          <label className="flex items-start space-x-3 cursor-pointer">
                            <input
                              type="checkbox"
                              checked={recordingConsent}
                              onChange={(e) => setRecordingConsent(e.target.checked)}
                              className="mt-1 rounded border-gray-300 text-purple-600 focus:ring-purple-500"
                            />
                            <span className="text-sm text-gray-700">
                              <strong>Optional:</strong> Save my session recording for detailed review 
                              (recordings are stored locally on your device and can be deleted anytime)
                            </span>
                          </label>

                          <label className="flex items-start space-x-3 cursor-pointer">
                            <input
                              type="checkbox"
                              checked={liveTipsEnabled}
                              onChange={(e) => setLiveTipsEnabled(e.target.checked)}
                              className="mt-1 rounded border-gray-300 text-purple-600 focus:ring-purple-500"
                            />
                            <span className="text-sm text-gray-700">
                              <strong>Recommended:</strong> Enable live coaching tips during practice
                            </span>
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>
                </Card>

                {liveTipsEnabled && (
                  <Card className="bg-green-50 border-green-200">
                    <div className="p-4">
                      <h4 className="font-medium text-gray-900 mb-3">Tip Settings</h4>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Tip Frequency:
                      </label>
                      <select
                        value={tipIntensity}
                        onChange={(e) => setTipIntensity(e.target.value as 'low' | 'medium' | 'high')}
                        className="w-full text-sm border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                      >
                        <option value="low">Low (every 8 seconds)</option>
                        <option value="medium">Medium (every 6 seconds)</option>
                        <option value="high">High (every 4 seconds)</option>
                      </select>
                    </div>
                  </Card>
                )}
              </div>

              <div className="flex justify-center space-x-4">
                <Button variant="outline" onClick={() => setCurrentStep('mode')}>
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back
                </Button>
                <Button 
                  onClick={() => setCurrentStep('setup')}
                  disabled={!consentGiven}
                  size="lg"
                  className="px-8"
                >
                  Setup Devices
                  <ChevronRight className="h-5 w-5 ml-2" />
                </Button>
              </div>
            </div>
          )}

          {currentStep === 'setup' && (
            <div className="space-y-8">
              <div className="text-center">
                <div className="w-20 h-20 bg-gradient-to-br from-green-100 to-emerald-200 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <Settings className="h-10 w-10 text-green-600" />
                </div>
                <h3 className="text-3xl font-bold text-gray-900 mb-4">Device Setup</h3>
                <p className="text-lg text-gray-600">Test your camera and microphone before starting</p>
              </div>

              <div className="max-w-4xl mx-auto">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  {/* Device Selection */}
                  <div className="space-y-6">
                    <Card>
                      <div className="p-6">
                        <h4 className="font-bold text-gray-900 mb-4 flex items-center">
                          <Monitor className="h-5 w-5 mr-2" />
                          Camera Selection
                        </h4>
                        <select
                          value={selectedCamera}
                          onChange={(e) => setSelectedCamera(e.target.value)}
                          className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                        >
                          {availableDevices.cameras.map(camera => (
                            <option key={camera.deviceId} value={camera.deviceId}>
                              {camera.label}
                            </option>
                          ))}
                        </select>
                      </div>
                    </Card>

                    <Card>
                      <div className="p-6">
                        <h4 className="font-bold text-gray-900 mb-4 flex items-center">
                          <Headphones className="h-5 w-5 mr-2" />
                          Microphone Selection
                        </h4>
                        <select
                          value={selectedMicrophone}
                          onChange={(e) => setSelectedMicrophone(e.target.value)}
                          className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                        >
                          {availableDevices.microphones.map(mic => (
                            <option key={mic.deviceId} value={mic.deviceId}>
                              {mic.label}
                            </option>
                          ))}
                        </select>
                      </div>
                    </Card>

                    <Button 
                      onClick={testDevices}
                      disabled={isTestingDevices || !selectedCamera || !selectedMicrophone}
                      className="w-full"
                      loading={isTestingDevices}
                    >
                      <Play className="h-4 w-4 mr-2" />
                      Test Camera & Microphone
                    </Button>

                    {deviceError && (
                      <Card className="bg-red-50 border-red-200">
                        <div className="p-4">
                          <div className="flex items-center space-x-2 text-red-800">
                            <AlertCircle className="h-5 w-5" />
                            <span className="font-medium">Device Error</span>
                          </div>
                          <p className="text-sm text-red-700 mt-2">{deviceError}</p>
                        </div>
                      </Card>
                    )}
                  </div>

                  {/* Video Preview */}
                  <Card>
                    <div className="p-6">
                      <h4 className="font-bold text-gray-900 mb-4">Camera Preview</h4>
                      <div className="relative bg-gray-900 rounded-xl overflow-hidden">
                        <video
                          ref={videoRef}
                          autoPlay
                          muted
                          className="w-full h-64 object-cover"
                        />
                        {!isTestingDevices && (
                          <div className="absolute inset-0 flex items-center justify-center bg-gray-800 bg-opacity-75">
                            <div className="text-center text-white">
                              <Camera className="h-12 w-12 mx-auto mb-3 opacity-50" />
                              <p className="text-sm">Click "Test Camera" to preview</p>
                            </div>
                          </div>
                        )}
                        {isTestingDevices && (
                          <div className="absolute top-4 left-4 bg-green-600 text-white px-3 py-1 rounded-full text-sm">
                            Testing...
                          </div>
                        )}
                      </div>
                    </div>
                  </Card>
                </div>
              </div>

              <div className="flex justify-center space-x-4">
                <Button variant="outline" onClick={() => setCurrentStep('consent')}>
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back
                </Button>
                <Button 
                  onClick={startPracticeSession}
                  disabled={!selectedCamera || !selectedMicrophone}
                  size="lg"
                  className="px-8"
                >
                  Start Practice Session
                  <Play className="h-5 w-5 ml-2" />
                </Button>
              </div>
            </div>
          )}

          {currentStep === 'practice' && (
            <div className="space-y-6">
              {/* Practice Header */}
              <div className="flex items-center justify-between bg-gradient-to-r from-purple-50 to-indigo-50 p-4 rounded-xl">
                <div>
                  <h3 className="text-xl font-bold text-gray-900">
                    Question {currentQuestionIndex + 1} of {currentQuestions.length}
                  </h3>
                  <p className="text-sm text-gray-600">
                    {interviewType === 'college' ? 'College Interview' : 'Job Interview'} • {currentQuestion?.category}
                  </p>
                </div>
                <div className="flex items-center space-x-4">
                  {timeRemaining !== null && (
                    <div className="flex items-center space-x-2 bg-white px-3 py-1 rounded-full">
                      <Clock className="h-4 w-4 text-gray-600" />
                      <span className={`text-sm font-medium ${timeRemaining <= 30 ? 'text-red-600' : 'text-gray-700'}`}>
                        {formatTime(timeRemaining)}
                      </span>
                    </div>
                  )}
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setLiveTipsEnabled(!liveTipsEnabled)}
                    className="bg-white"
                  >
                    <Zap className={`h-4 w-4 mr-2 ${liveTipsEnabled ? 'text-yellow-500' : 'text-gray-400'}`} />
                    Tips {liveTipsEnabled ? 'On' : 'Off'}
                  </Button>
                  <Button variant="outline" onClick={endSession} className="bg-white">
                    End Session
                  </Button>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Video Feed */}
                <div className="lg:col-span-2">
                  <Card className="relative overflow-hidden">
                    <video
                      ref={videoRef}
                      autoPlay
                      muted
                      className="w-full h-64 lg:h-96 object-cover rounded-lg bg-gray-900"
                    />
                    
                    {/* Recording Indicator */}
                    {isRecording && (
                      <div className="absolute top-4 left-4 flex items-center space-x-2 bg-red-600 text-white px-3 py-2 rounded-full shadow-lg">
                        <div className="w-3 h-3 bg-white rounded-full animate-pulse"></div>
                        <span className="text-sm font-medium">AI Analysis Active</span>
                      </div>
                    )}

                    {/* Live Tip Overlay */}
                    {currentTip && liveTipsEnabled && (
                      <div className="absolute bottom-4 left-4 right-4 bg-gradient-to-r from-purple-600 to-indigo-600 text-white p-4 rounded-xl shadow-lg animate-slide-up">
                        <div className="flex items-center space-x-3">
                          <Zap className="h-5 w-5 text-yellow-300" />
                          <span className="text-sm font-medium">{currentTip}</span>
                        </div>
                      </div>
                    )}

                    {/* Recording status */}
                    {recordingConsent && (
                      <div className="absolute top-4 right-4 bg-black bg-opacity-50 text-white px-3 py-1 rounded-full text-sm">
                        Recording for Review
                      </div>
                    )}
                  </Card>

                  {/* Question Card */}
                  <Card className="mt-4 bg-gradient-to-r from-purple-50 to-indigo-50 border-purple-200">
                    <div className="p-6">
                      <div className="flex items-center justify-between mb-4">
                        <h4 className="text-xl font-bold text-gray-900">Current Question</h4>
                        <div className="flex items-center space-x-2 text-sm text-gray-600">
                          <Clock className="h-4 w-4" />
                          <span>{currentQuestion?.timeLimit}s suggested</span>
                        </div>
                      </div>
                      <p className="text-xl text-gray-800 leading-relaxed mb-6">
                        {currentQuestion?.text}
                      </p>
                      
                      {/* Question Tips */}
                      {currentQuestion?.tips && currentQuestion.tips.length > 0 && (
                        <div className="mb-6 p-4 bg-white bg-opacity-50 rounded-lg">
                          <h5 className="font-medium text-gray-900 mb-2">💡 Tips for this question:</h5>
                          <ul className="text-sm text-gray-700 space-y-1">
                            {currentQuestion.tips.map((tip, index) => (
                              <li key={index} className="flex items-start space-x-2">
                                <div className="w-1 h-1 bg-purple-500 rounded-full mt-2 flex-shrink-0"></div>
                                <span>{tip}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                      
                      <div className="flex justify-between items-center">
                        <div className="flex items-center space-x-3">
                          <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                            currentQuestion?.difficulty === 'easy' ? 'bg-green-100 text-green-800' :
                            currentQuestion?.difficulty === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                            'bg-red-100 text-red-800'
                          }`}>
                            {currentQuestion?.difficulty}
                          </span>
                          <span className="text-sm text-gray-600">{currentQuestion?.category}</span>
                        </div>
                        <Button onClick={nextQuestion} size="lg">
                          {currentQuestionIndex < currentQuestions.length - 1 ? 'Next Question' : 'Finish Session'}
                          <ChevronRight className="h-5 w-5 ml-2" />
                        </Button>
                      </div>
                    </div>
                  </Card>
                </div>

                {/* Live Metrics Panel */}
                <div className="space-y-4">
                  <Card>
                    <div className="p-4">
                      <h4 className="font-bold text-gray-900 mb-4 flex items-center">
                        <BarChart3 className="h-5 w-5 mr-2 text-purple-600" />
                        Live AI Analysis
                      </h4>
                      
                      <div className="space-y-4">
                        <div>
                          <div className="flex justify-between text-sm mb-2">
                            <span className="flex items-center font-medium">
                              <Eye className="h-4 w-4 mr-2 text-blue-600" />
                              Eye Contact
                            </span>
                            <span className="font-bold">{Math.round(liveMetrics.eyeContact)}%</span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div 
                              className="bg-gradient-to-r from-blue-400 to-blue-600 h-2 rounded-full transition-all duration-500"
                              style={{ width: `${liveMetrics.eyeContact}%` }}
                            ></div>
                          </div>
                        </div>

                        <div>
                          <div className="flex justify-between text-sm mb-2">
                            <span className="font-medium">Posture</span>
                            <span className="font-bold">{Math.round(liveMetrics.posture)}%</span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div 
                              className="bg-gradient-to-r from-green-400 to-green-600 h-2 rounded-full transition-all duration-500"
                              style={{ width: `${liveMetrics.posture}%` }}
                            ></div>
                          </div>
                        </div>

                        <div>
                          <div className="flex justify-between text-sm mb-2">
                            <span className="flex items-center font-medium">
                              <Volume2 className="h-4 w-4 mr-2 text-purple-600" />
                              Voice Clarity
                            </span>
                            <span className="font-bold">{Math.round(liveMetrics.voiceClarity)}%</span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div 
                              className="bg-gradient-to-r from-purple-400 to-purple-600 h-2 rounded-full transition-all duration-500"
                              style={{ width: `${liveMetrics.voiceClarity}%` }}
                            ></div>
                          </div>
                        </div>

                        <div>
                          <div className="flex justify-between text-sm mb-2">
                            <span className="font-medium">Speaking Pace</span>
                            <span className="font-bold">{Math.round(liveMetrics.speakingPace)} WPM</span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div 
                              className={`h-2 rounded-full transition-all duration-500 ${
                                liveMetrics.speakingPace >= 120 && liveMetrics.speakingPace <= 160 
                                  ? 'bg-gradient-to-r from-green-400 to-green-600' 
                                  : 'bg-gradient-to-r from-orange-400 to-orange-600'
                              }`}
                              style={{ width: `${Math.min(100, (liveMetrics.speakingPace / 200) * 100)}%` }}
                            ></div>
                          </div>
                          <p className="text-xs text-gray-500 mt-1">Ideal: 120-160 WPM</p>
                        </div>

                        <div>
                          <div className="flex justify-between text-sm mb-2">
                            <span className="font-medium">Confidence</span>
                            <span className="font-bold">{Math.round(liveMetrics.confidenceLevel)}%</span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div 
                              className="bg-gradient-to-r from-indigo-400 to-indigo-600 h-2 rounded-full transition-all duration-500"
                              style={{ width: `${liveMetrics.confidenceLevel}%` }}
                            ></div>
                          </div>
                        </div>

                        <div className="pt-3 border-t border-gray-200">
                          <div className="flex justify-between text-sm">
                            <span className="font-medium">Filler Words</span>
                            <span className={`font-bold ${liveMetrics.fillerWordCount > 5 ? 'text-red-600' : 'text-green-600'}`}>
                              {liveMetrics.fillerWordCount}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Card>

                  {/* Quick Tips */}
                  <Card className="bg-gradient-to-br from-green-50 to-emerald-100 border-green-200">
                    <div className="p-4">
                      <h4 className="font-bold text-gray-900 mb-3">💡 Quick Tips</h4>
                      <div className="space-y-2 text-sm text-gray-700">
                        <p>• Look directly at the camera</p>
                        <p>• Sit up straight and lean slightly forward</p>
                        <p>• Speak clearly and at a moderate pace</p>
                        <p>• Use hand gestures naturally</p>
                        <p>• Take a breath before answering</p>
                      </div>
                    </div>
                  </Card>
                </div>
              </div>
            </div>
          )}

          {currentStep === 'report' && (
            <div className="space-y-8">
              {isGeneratingReport ? (
                <div className="text-center py-12">
                  <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <BarChart3 className="h-8 w-8 text-purple-600 animate-pulse" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Generating Your Report...</h3>
                  <p className="text-gray-600">Our AI is analyzing your performance</p>
                </div>
              ) : sessionReport && (
                <>
                  <div className="text-center">
                    <div className="w-20 h-20 bg-gradient-to-br from-green-100 to-emerald-200 rounded-2xl flex items-center justify-center mx-auto mb-6">
                      <CheckCircle className="h-10 w-10 text-green-600" />
                    </div>
                    <h3 className="text-3xl font-bold text-gray-900 mb-4">Session Complete!</h3>
                    <p className="text-lg text-gray-600">Here's your detailed AI-powered performance analysis</p>
                  </div>

                  {/* Overall Score */}
                  <Card className="bg-gradient-to-r from-green-50 to-emerald-50 border-green-200 max-w-md mx-auto">
                    <div className="p-8 text-center">
                      <div className="text-5xl font-bold text-green-600 mb-3">
                        {sessionReport.overallScore}
                      </div>
                      <div className="text-lg text-gray-500 mb-1">out of 100</div>
                      <p className="text-xl font-medium text-gray-900 mb-4">Overall Performance</p>
                      <div className="flex items-center justify-center space-x-4 text-sm text-gray-600">
                        <div className="flex items-center space-x-1">
                          <Clock className="h-4 w-4" />
                          <span>Duration: {Math.floor(sessionReport.duration / 60)}:{Math.floor(sessionReport.duration % 60).toString().padStart(2, '0')}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <MessageSquare className="h-4 w-4" />
                          <span>{sessionReport.questionsAnswered} questions</span>
                        </div>
                      </div>
                    </div>
                  </Card>

                  {/* Sub-scores */}
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                    <Card className="text-center hover:shadow-lg transition-all duration-300">
                      <div className="p-6">
                        <div className="w-16 h-16 bg-gradient-to-br from-blue-100 to-indigo-200 rounded-2xl flex items-center justify-center mx-auto mb-4">
                          <Eye className="h-8 w-8 text-blue-600" />
                        </div>
                        <div className="text-3xl font-bold text-gray-900 mb-2">{sessionReport.subScores.bodyLanguage}</div>
                        <p className="text-sm text-gray-600 font-medium">Body Language</p>
                        <p className="text-xs text-gray-500 mt-1">Posture, eye contact, gestures</p>
                      </div>
                    </Card>
                    <Card className="text-center hover:shadow-lg transition-all duration-300">
                      <div className="p-6">
                        <div className="w-16 h-16 bg-gradient-to-br from-purple-100 to-violet-200 rounded-2xl flex items-center justify-center mx-auto mb-4">
                          <Volume2 className="h-8 w-8 text-purple-600" />
                        </div>
                        <div className="text-3xl font-bold text-gray-900 mb-2">{sessionReport.subScores.vocalDelivery}</div>
                        <p className="text-sm text-gray-600 font-medium">Vocal Delivery</p>
                        <p className="text-xs text-gray-500 mt-1">Clarity, pace, confidence</p>
                      </div>
                    </Card>
                    <Card className="text-center hover:shadow-lg transition-all duration-300">
                      <div className="p-6">
                        <div className="w-16 h-16 bg-gradient-to-br from-green-100 to-emerald-200 rounded-2xl flex items-center justify-center mx-auto mb-4">
                          <MessageSquare className="h-8 w-8 text-green-600" />
                        </div>
                        <div className="text-3xl font-bold text-gray-900 mb-2">{sessionReport.subScores.contentQuality}</div>
                        <p className="text-sm text-gray-600 font-medium">Content Quality</p>
                        <p className="text-xs text-gray-500 mt-1">Relevance, structure, examples</p>
                      </div>
                    </Card>
                    <Card className="text-center hover:shadow-lg transition-all duration-300">
                      <div className="p-6">
                        <div className="w-16 h-16 bg-gradient-to-br from-orange-100 to-red-200 rounded-2xl flex items-center justify-center mx-auto mb-4">
                          <Target className="h-8 w-8 text-orange-600" />
                        </div>
                        <div className="text-3xl font-bold text-gray-900 mb-2">{sessionReport.subScores.confidence}</div>
                        <p className="text-sm text-gray-600 font-medium">Confidence</p>
                        <p className="text-xs text-gray-500 mt-1">Overall presence</p>
                      </div>
                    </Card>
                  </div>

                  {/* Performance Metrics */}
                  <Card>
                    <div className="p-6">
                      <h4 className="font-bold text-gray-900 mb-4 flex items-center">
                        <BarChart3 className="h-5 w-5 mr-2 text-blue-600" />
                        Detailed Metrics
                      </h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        <div className="text-center">
                          <div className="text-2xl font-bold text-blue-600 mb-1">
                            {Math.round(sessionReport.metrics.averageResponseTime)}s
                          </div>
                          <div className="text-sm text-gray-600">Avg Response Time</div>
                        </div>
                        <div className="text-center">
                          <div className="text-2xl font-bold text-purple-600 mb-1">
                            {sessionReport.metrics.totalFillerWords}
                          </div>
                          <div className="text-sm text-gray-600">Filler Words</div>
                        </div>
                        <div className="text-center">
                          <div className="text-2xl font-bold text-green-600 mb-1">
                            {sessionReport.metrics.averageEyeContact}%
                          </div>
                          <div className="text-sm text-gray-600">Avg Eye Contact</div>
                        </div>
                        <div className="text-center">
                          <div className="text-2xl font-bold text-orange-600 mb-1">
                            {sessionReport.metrics.averagePosture}%
                          </div>
                          <div className="text-sm text-gray-600">Avg Posture</div>
                        </div>
                        <div className="text-center">
                          <div className="text-2xl font-bold text-indigo-600 mb-1">
                            {sessionReport.metrics.speakingPaceConsistency}%
                          </div>
                          <div className="text-sm text-gray-600">Pace Consistency</div>
                        </div>
                      </div>
                    </div>
                  </Card>

                  {/* Strengths and Areas for Improvement */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Card className="bg-green-50 border-green-200">
                      <div className="p-6">
                        <h4 className="font-bold text-gray-900 mb-4 flex items-center">
                          <CheckCircle className="h-5 w-5 mr-2 text-green-600" />
                          Strengths
                        </h4>
                        <div className="space-y-2">
                          {sessionReport.strengths.map((strength, index) => (
                            <div key={index} className="flex items-start space-x-2">
                              <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                              <p className="text-sm text-gray-700">{strength}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                    </Card>

                    <Card className="bg-orange-50 border-orange-200">
                      <div className="p-6">
                        <h4 className="font-bold text-gray-900 mb-4 flex items-center">
                          <TrendingUp className="h-5 w-5 mr-2 text-orange-600" />
                          Areas for Improvement
                        </h4>
                        <div className="space-y-2">
                          {sessionReport.areasForImprovement.map((area, index) => (
                            <div key={index} className="flex items-start space-x-2">
                              <div className="w-2 h-2 bg-orange-500 rounded-full mt-2 flex-shrink-0"></div>
                              <p className="text-sm text-gray-700">{area}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                    </Card>
                  </div>

                  {/* AI Suggestions */}
                  <Card>
                    <div className="p-6">
                      <h4 className="font-bold text-gray-900 mb-4 flex items-center">
                        <Target className="h-5 w-5 mr-2 text-purple-600" />
                        AI-Powered Improvement Suggestions
                      </h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {sessionReport.suggestions.map((suggestion, index) => (
                          <div key={index} className="flex items-start space-x-3 p-4 bg-gradient-to-r from-purple-50 to-indigo-50 rounded-xl">
                            <TrendingUp className="h-5 w-5 text-purple-600 mt-0.5 flex-shrink-0" />
                            <p className="text-sm text-gray-700 leading-relaxed">{suggestion}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </Card>

                  {/* Performance Timeline */}
                  {sessionReport.timestampedFlags.length > 0 && (
                    <Card>
                      <div className="p-6">
                        <h4 className="font-bold text-gray-900 mb-4 flex items-center">
                          <Clock className="h-5 w-5 mr-2 text-blue-600" />
                          Performance Timeline
                        </h4>
                        <div className="space-y-3">
                          {sessionReport.timestampedFlags.map((flag, index) => (
                            <div key={index} className="flex items-start space-x-4 p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors cursor-pointer">
                              <div className="flex-shrink-0 mt-1">
                                <div className={`w-3 h-3 rounded-full ${
                                  flag.type === 'positive' ? 'bg-green-500' :
                                  flag.type === 'warning' ? 'bg-yellow-500' : 'bg-blue-500'
                                }`}></div>
                              </div>
                              <div className="flex-1">
                                <div className="flex items-center space-x-3 mb-1">
                                  <span className="text-sm font-bold text-gray-900">
                                    {Math.floor(flag.timestamp / 60)}:{(flag.timestamp % 60).toString().padStart(2, '0')}
                                  </span>
                                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                                    flag.type === 'positive' ? 'bg-green-100 text-green-800' :
                                    flag.type === 'warning' ? 'bg-yellow-100 text-yellow-800' :
                                    'bg-blue-100 text-blue-800'
                                  }`}>
                                    {flag.type}
                                  </span>
                                  <span className="text-xs text-gray-500">{flag.category}</span>
                                </div>
                                <p className="text-sm text-gray-700">{flag.message}</p>
                                {flag.suggestion && (
                                  <p className="text-xs text-gray-600 mt-1 italic">💡 {flag.suggestion}</p>
                                )}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </Card>
                  )}

                  {/* Next Steps */}
                  <Card>
                    <div className="p-6">
                      <h4 className="font-bold text-gray-900 mb-4 flex items-center">
                        <ChevronRight className="h-5 w-5 mr-2 text-green-600" />
                        Recommended Next Steps
                      </h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {sessionReport.nextSteps.map((step, index) => (
                          <div key={index} className="flex items-start space-x-3 p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl">
                            <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                              <span className="text-xs font-bold text-green-600">{index + 1}</span>
                            </div>
                            <p className="text-sm text-gray-700 leading-relaxed">{step}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </Card>

                  {/* Session Transcript */}
                  <Card>
                    <div className="p-6">
                      <h4 className="font-bold text-gray-900 mb-4 flex items-center">
                        <FileText className="h-5 w-5 mr-2 text-gray-600" />
                        Session Transcript
                      </h4>
                      <div className="bg-gray-50 p-6 rounded-xl border border-gray-200 max-h-64 overflow-y-auto">
                        <p className="text-sm text-gray-700 leading-relaxed whitespace-pre-line">
                          {sessionReport.transcript}
                        </p>
                      </div>
                    </div>
                  </Card>

                  {/* Action Buttons */}
                  <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
                    <Button onClick={downloadReport} size="lg" className="px-8">
                      <Download className="h-5 w-5 mr-2" />
                      Download Full Report
                    </Button>
                    <Button variant="outline" onClick={resetSession} size="lg" className="px-8">
                      <RotateCcw className="h-5 w-5 mr-2" />
                      Practice Again
                    </Button>
                    <Button variant="ghost" onClick={handleClose} size="lg">
                      Close Session
                    </Button>
                  </div>
                </>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default InterviewPracticeModal;