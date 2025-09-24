import React, { useState, useEffect, useRef } from "react";
import {
  X,
  Video,
  Mic,
  Settings,
  Play,
  Pause,
  Square,
  Eye,
  Volume2,
  MessageSquare,
  BarChart3,
  Clock,
  CheckCircle,
  AlertCircle,
  TrendingUp,
  Download,
  RotateCcw,
  Camera,
  MicOff,
  VideoOff,
  Shield,
  Sparkles,
  GraduationCap,
  Briefcase,
  ArrowRight,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import Button from "../../shared/ui/Button";
import Card from "../../shared/ui/Card";
import { interviewService, LiveMetrics, SessionReport } from "../../../services/interviewService";
import { interviewQuestions, getRandomQuestions } from "../../../data/interviewQuestions";

interface InterviewPracticeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

type InterviewType = 'college' | 'job' | null;
type SessionStep = 'selection' | 'setup' | 'practice' | 'results';

const InterviewPracticeModal: React.FC<InterviewPracticeModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [currentStep, setCurrentStep] = useState<SessionStep>('selection');
  const [selectedType, setSelectedType] = useState<InterviewType>(null);
  const [isRecording, setIsRecording] = useState(false);
  const [sessionActive, setSessionActive] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [sessionQuestions, setSessionQuestions] = useState<any[]>([]);
  const [sessionReport, setSessionReport] = useState<SessionReport | null>(null);
  const [liveMetrics, setLiveMetrics] = useState<LiveMetrics | null>(null);
  const [sessionDuration, setSessionDuration] = useState(0);
  const [deviceSettings, setDeviceSettings] = useState({
    camera: '',
    microphone: '',
    enableRecording: false,
  });
  const [availableDevices, setAvailableDevices] = useState({
    cameras: [],
    microphones: [],
  });

  const videoRef = useRef<HTMLVideoElement>(null);
  const sessionTimerRef = useRef<NodeJS.Timeout | null>(null);

  // Load available devices
  useEffect(() => {
    if (currentStep === 'setup') {
      loadDevices();
    }
  }, [currentStep]);

  // Session timer
  useEffect(() => {
    if (sessionActive) {
      sessionTimerRef.current = setInterval(() => {
        setSessionDuration(prev => prev + 1);
        
        // Update live metrics
        const metrics = interviewService.getCurrentMetrics();
        setLiveMetrics(metrics);
      }, 1000);
    } else {
      if (sessionTimerRef.current) {
        clearInterval(sessionTimerRef.current);
        sessionTimerRef.current = null;
      }
    }

    return () => {
      if (sessionTimerRef.current) {
        clearInterval(sessionTimerRef.current);
      }
    };
  }, [sessionActive]);

  // Cleanup on close
  useEffect(() => {
    if (!isOpen) {
      handleEndSession();
      resetModal();
    }
  }, [isOpen]);

  const loadDevices = async () => {
    try {
      const devices = await interviewService.getAvailableDevices();
      setAvailableDevices(devices);
      
      // Set default devices
      if (devices.cameras.length > 0) {
        setDeviceSettings(prev => ({ ...prev, camera: devices.cameras[0].deviceId }));
      }
      if (devices.microphones.length > 0) {
        setDeviceSettings(prev => ({ ...prev, microphone: devices.microphones[0].deviceId }));
      }
    } catch (error) {
      console.error('Error loading devices:', error);
    }
  };

  const resetModal = () => {
    setCurrentStep('selection');
    setSelectedType(null);
    setIsRecording(false);
    setSessionActive(false);
    setCurrentQuestionIndex(0);
    setSessionQuestions([]);
    setSessionReport(null);
    setLiveMetrics(null);
    setSessionDuration(0);
  };

  const handleTypeSelection = (type: InterviewType) => {
    setSelectedType(type);
  };

  const handleContinueFromSelection = () => {
    if (selectedType) {
      setCurrentStep('setup');
      // Generate questions for the selected type
      const questions = getRandomQuestions(selectedType, 3);
      setSessionQuestions(questions);
    }
  };

  const handleStartSession = async () => {
    try {
      const result = await interviewService.startSession({
        videoDeviceId: deviceSettings.camera,
        audioDeviceId: deviceSettings.microphone,
        enableRecording: deviceSettings.enableRecording,
        tipIntensity: 'medium',
      });

      if (result.success && result.stream) {
        if (videoRef.current) {
          videoRef.current.srcObject = result.stream;
        }
        setSessionActive(true);
        setCurrentStep('practice');
        setSessionDuration(0);
      } else {
        console.error('Failed to start session:', result.error);
      }
    } catch (error) {
      console.error('Error starting session:', error);
    }
  };

  const handleEndSession = async () => {
    if (sessionActive) {
      try {
        const report = await interviewService.endSession();
        setSessionReport(report);
        setSessionActive(false);
        setCurrentStep('results');
      } catch (error) {
        console.error('Error ending session:', error);
      }
    }
    
    interviewService.cleanup();
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < sessionQuestions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    } else {
      handleEndSession();
    }
  };

  const handlePreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(prev => prev - 1);
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const currentQuestion = sessionQuestions[currentQuestionIndex];

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-6xl w-full max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200 bg-gradient-to-r from-purple-50 to-indigo-50">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-xl flex items-center justify-center">
              <Video className="h-5 w-5 text-white" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-900">AI Interview Practice</h2>
              <p className="text-sm text-gray-600">Real-time coaching and feedback</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X className="h-5 w-5 text-gray-500" />
          </button>
        </div>

        <div className="overflow-y-auto max-h-[calc(90vh-80px)]">
          {/* Step 1: Interview Type Selection */}
          {currentStep === 'selection' && (
            <div className="p-8">
              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">Choose Interview Type</h3>
                <p className="text-gray-600">Select the type of interview you'd like to practice</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                {/* College Interview Option */}
                <div
                  onClick={() => handleTypeSelection('college')}
                  className={`cursor-pointer transition-all duration-300 transform hover:scale-105 ${
                    selectedType === 'college'
                      ? 'ring-4 ring-blue-200 shadow-xl'
                      : 'hover:shadow-lg'
                  }`}
                >
                  <Card className={`text-center h-full ${
                    selectedType === 'college' 
                      ? 'border-blue-500 bg-blue-50' 
                      : 'border-gray-200 hover:border-blue-300'
                  }`}>
                    <div className={`w-20 h-20 mx-auto mb-6 rounded-2xl flex items-center justify-center ${
                      selectedType === 'college' 
                        ? 'bg-blue-500' 
                        : 'bg-blue-100'
                    }`}>
                      <GraduationCap className={`h-10 w-10 ${
                        selectedType === 'college' ? 'text-white' : 'text-blue-600'
                      }`} />
                    </div>
                    
                    <h4 className="text-xl font-bold text-gray-900 mb-3">College Interview</h4>
                    <p className="text-gray-600 mb-6">Practice for college admissions interviews</p>
                    
                    <div className="space-y-2 text-sm text-gray-600 mb-6">
                      <div className="flex items-center justify-center space-x-2">
                        <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                        <span>Personal motivation questions</span>
                      </div>
                      <div className="flex items-center justify-center space-x-2">
                        <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                        <span>Academic interest discussions</span>
                      </div>
                      <div className="flex items-center justify-center space-x-2">
                        <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                        <span>Community involvement topics</span>
                      </div>
                    </div>

                    {selectedType === 'college' && (
                      <div className="flex items-center justify-center text-blue-600 font-medium">
                        <CheckCircle className="h-5 w-5 mr-2" />
                        Selected
                      </div>
                    )}
                  </Card>
                </div>

                {/* Job Interview Option */}
                <div
                  onClick={() => handleTypeSelection('job')}
                  className={`cursor-pointer transition-all duration-300 transform hover:scale-105 ${
                    selectedType === 'job'
                      ? 'ring-4 ring-green-200 shadow-xl'
                      : 'hover:shadow-lg'
                  }`}
                >
                  <Card className={`text-center h-full ${
                    selectedType === 'job' 
                      ? 'border-green-500 bg-green-50' 
                      : 'border-gray-200 hover:border-green-300'
                  }`}>
                    <div className={`w-20 h-20 mx-auto mb-6 rounded-2xl flex items-center justify-center ${
                      selectedType === 'job' 
                        ? 'bg-green-500' 
                        : 'bg-green-100'
                    }`}>
                      <Briefcase className={`h-10 w-10 ${
                        selectedType === 'job' ? 'text-white' : 'text-green-600'
                      }`} />
                    </div>
                    
                    <h4 className="text-xl font-bold text-gray-900 mb-3">Job Interview</h4>
                    <p className="text-gray-600 mb-6">Practice for internship and job interviews</p>
                    
                    <div className="space-y-2 text-sm text-gray-600 mb-6">
                      <div className="flex items-center justify-center space-x-2">
                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                        <span>Behavioral questions</span>
                      </div>
                      <div className="flex items-center justify-center space-x-2">
                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                        <span>Skills and experience</span>
                      </div>
                      <div className="flex items-center justify-center space-x-2">
                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                        <span>Career goals discussion</span>
                      </div>
                    </div>

                    {selectedType === 'job' && (
                      <div className="flex items-center justify-center text-green-600 font-medium">
                        <CheckCircle className="h-5 w-5 mr-2" />
                        Selected
                      </div>
                    )}
                  </Card>
                </div>
              </div>

              <div className="flex justify-center mt-8">
                <Button
                  onClick={handleContinueFromSelection}
                  disabled={!selectedType}
                  size="lg"
                  className="min-w-[200px]"
                >
                  Continue
                  <ArrowRight className="h-5 w-5 ml-2" />
                </Button>
              </div>
            </div>
          )}

          {/* Step 2: Setup */}
          {currentStep === 'setup' && (
            <div className="p-8">
              <div className="max-w-4xl mx-auto">
                <div className="text-center mb-8">
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">Setup Your Session</h3>
                  <p className="text-gray-600">Configure your camera and microphone for the best experience</p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  {/* Camera Preview */}
                  <Card>
                    <h4 className="text-lg font-semibold text-gray-900 mb-4">Camera Preview</h4>
                    <div className="aspect-video bg-gray-900 rounded-lg mb-4 relative overflow-hidden">
                      <video
                        ref={videoRef}
                        autoPlay
                        muted
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute bottom-4 left-4 bg-black bg-opacity-50 text-white px-3 py-1 rounded-full text-sm">
                        Preview
                      </div>
                    </div>
                    
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Camera
                        </label>
                        <select
                          value={deviceSettings.camera}
                          onChange={(e) => setDeviceSettings(prev => ({ ...prev, camera: e.target.value }))}
                          className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                        >
                          {availableDevices.cameras.map((camera) => (
                            <option key={camera.deviceId} value={camera.deviceId}>
                              {camera.label}
                            </option>
                          ))}
                        </select>
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Microphone
                        </label>
                        <select
                          value={deviceSettings.microphone}
                          onChange={(e) => setDeviceSettings(prev => ({ ...prev, microphone: e.target.value }))}
                          className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                        >
                          {availableDevices.microphones.map((mic) => (
                            <option key={mic.deviceId} value={mic.deviceId}>
                              {mic.label}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                  </Card>

                  {/* Session Settings */}
                  <Card>
                    <h4 className="text-lg font-semibold text-gray-900 mb-4">Session Settings</h4>
                    
                    <div className="space-y-6">
                      <div className="bg-gradient-to-r from-purple-50 to-indigo-50 p-4 rounded-lg border border-purple-200">
                        <h5 className="font-semibold text-gray-900 mb-2">
                          {selectedType === 'college' ? 'College Interview' : 'Job Interview'} Practice
                        </h5>
                        <p className="text-sm text-gray-600 mb-3">
                          {selectedType === 'college' 
                            ? 'Practice for college admissions interviews with personalized questions'
                            : 'Practice for internship and job interviews with behavioral questions'
                          }
                        </p>
                        <div className="text-sm text-gray-700">
                          <strong>Questions:</strong> {sessionQuestions.length} questions prepared
                        </div>
                      </div>

                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <label className="text-sm font-medium text-gray-900">Enable Recording</label>
                            <p className="text-xs text-gray-500">Record your session for later review</p>
                          </div>
                          <label className="relative inline-flex items-center cursor-pointer">
                            <input
                              type="checkbox"
                              checked={deviceSettings.enableRecording}
                              onChange={(e) => setDeviceSettings(prev => ({ ...prev, enableRecording: e.target.checked }))}
                              className="sr-only peer"
                            />
                            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
                          </label>
                        </div>

                        <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                          <div className="flex items-start space-x-3">
                            <Shield className="h-5 w-5 text-blue-600 mt-0.5" />
                            <div>
                              <h6 className="font-medium text-blue-900 mb-1">Privacy Notice</h6>
                              <p className="text-sm text-blue-700">
                                All recordings are stored locally on your device and never uploaded to our servers.
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Card>
                </div>

                <div className="flex justify-between mt-8">
                  <Button
                    variant="outline"
                    onClick={() => setCurrentStep('selection')}
                  >
                    <ChevronLeft className="h-4 w-4 mr-2" />
                    Back
                  </Button>
                  <Button
                    onClick={handleStartSession}
                    size="lg"
                    className="min-w-[200px]"
                  >
                    Start Practice Session
                    <Play className="h-5 w-5 ml-2" />
                  </Button>
                </div>
              </div>
            </div>
          )}

          {/* Step 3: Practice Session */}
          {currentStep === 'practice' && (
            <div className="p-6">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Video Feed */}
                <div className="lg:col-span-2">
                  <Card>
                    <div className="aspect-video bg-gray-900 rounded-lg mb-4 relative overflow-hidden">
                      <video
                        ref={videoRef}
                        autoPlay
                        muted
                        className="w-full h-full object-cover"
                      />
                      
                      {/* Live Metrics Overlay */}
                      {liveMetrics && (
                        <div className="absolute top-4 left-4 space-y-2">
                          <div className="bg-black bg-opacity-50 text-white px-3 py-1 rounded-full text-sm flex items-center">
                            <Eye className="h-4 w-4 mr-2" />
                            Eye Contact: {Math.round(liveMetrics.eyeContact)}%
                          </div>
                          <div className="bg-black bg-opacity-50 text-white px-3 py-1 rounded-full text-sm flex items-center">
                            <Volume2 className="h-4 w-4 mr-2" />
                            Voice: {Math.round(liveMetrics.voiceClarity)}%
                          </div>
                        </div>
                      )}

                      {/* Recording Indicator */}
                      {isRecording && (
                        <div className="absolute top-4 right-4 bg-red-500 text-white px-3 py-1 rounded-full text-sm flex items-center animate-pulse">
                          <div className="w-2 h-2 bg-white rounded-full mr-2"></div>
                          Recording
                        </div>
                      )}

                      {/* Session Timer */}
                      <div className="absolute bottom-4 right-4 bg-black bg-opacity-50 text-white px-3 py-1 rounded-full text-sm">
                        {formatTime(sessionDuration)}
                      </div>
                    </div>

                    {/* Question Display */}
                    {currentQuestion && (
                      <div className="bg-gradient-to-r from-purple-50 to-indigo-50 p-6 rounded-lg border border-purple-200">
                        <div className="flex items-center justify-between mb-4">
                          <div className="flex items-center space-x-2">
                            <span className="bg-purple-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                              Question {currentQuestionIndex + 1} of {sessionQuestions.length}
                            </span>
                            <span className="text-sm text-gray-600">
                              {currentQuestion.category}
                            </span>
                          </div>
                          <div className="text-sm text-gray-600">
                            <Clock className="h-4 w-4 inline mr-1" />
                            {Math.floor(currentQuestion.timeLimit / 60)}:{(currentQuestion.timeLimit % 60).toString().padStart(2, '0')} suggested
                          </div>
                        </div>
                        
                        <h4 className="text-lg font-semibold text-gray-900 mb-4">
                          {currentQuestion.text}
                        </h4>
                        
                        {currentQuestion.tips && currentQuestion.tips.length > 0 && (
                          <div className="bg-white p-4 rounded-lg">
                            <h5 className="font-medium text-gray-900 mb-2">💡 Tips:</h5>
                            <ul className="text-sm text-gray-600 space-y-1">
                              {currentQuestion.tips.map((tip: string, index: number) => (
                                <li key={index} className="flex items-start space-x-2">
                                  <div className="w-1 h-1 bg-gray-400 rounded-full mt-2 flex-shrink-0"></div>
                                  <span>{tip}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}
                      </div>
                    )}

                    {/* Controls */}
                    <div className="flex justify-between items-center mt-6">
                      <Button
                        variant="outline"
                        onClick={handlePreviousQuestion}
                        disabled={currentQuestionIndex === 0}
                      >
                        <ChevronLeft className="h-4 w-4 mr-2" />
                        Previous
                      </Button>

                      <div className="flex items-center space-x-3">
                        <Button variant="outline" onClick={handleEndSession}>
                          <Square className="h-4 w-4 mr-2" />
                          End Session
                        </Button>
                      </div>

                      <Button
                        onClick={handleNextQuestion}
                        disabled={currentQuestionIndex === sessionQuestions.length - 1}
                      >
                        {currentQuestionIndex === sessionQuestions.length - 1 ? 'Finish' : 'Next'}
                        <ChevronRight className="h-4 w-4 ml-2" />
                      </Button>
                    </div>
                  </Card>
                </div>

                {/* Live Feedback Panel */}
                <div className="space-y-6">
                  {/* Live Metrics */}
                  {liveMetrics && (
                    <Card>
                      <h4 className="text-lg font-semibold text-gray-900 mb-4">Live Feedback</h4>
                      <div className="space-y-4">
                        <div>
                          <div className="flex justify-between text-sm mb-1">
                            <span>Eye Contact</span>
                            <span>{Math.round(liveMetrics.eyeContact)}%</span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div
                              className="bg-blue-500 h-2 rounded-full transition-all duration-300"
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
                              className="bg-green-500 h-2 rounded-full transition-all duration-300"
                              style={{ width: `${liveMetrics.posture}%` }}
                            ></div>
                          </div>
                        </div>
                        
                        <div>
                          <div className="flex justify-between text-sm mb-1">
                            <span>Voice Clarity</span>
                            <span>{Math.round(liveMetrics.voiceClarity)}%</span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div
                              className="bg-purple-500 h-2 rounded-full transition-all duration-300"
                              style={{ width: `${liveMetrics.voiceClarity}%` }}
                            ></div>
                          </div>
                        </div>

                        <div>
                          <div className="flex justify-between text-sm mb-1">
                            <span>Speaking Pace</span>
                            <span>{Math.round(liveMetrics.speakingPace)} WPM</span>
                          </div>
                          <div className="text-xs text-gray-500">
                            Ideal: 140-160 WPM
                          </div>
                        </div>
                      </div>
                    </Card>
                  )}

                  {/* Session Info */}
                  <Card>
                    <h4 className="text-lg font-semibold text-gray-900 mb-4">Session Info</h4>
                    <div className="space-y-3">
                      <div className="flex justify-between text-sm">
                        <span>Interview Type:</span>
                        <span className="font-medium capitalize">{selectedType}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>Questions:</span>
                        <span className="font-medium">{sessionQuestions.length}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>Duration:</span>
                        <span className="font-medium">{formatTime(sessionDuration)}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>Recording:</span>
                        <span className={`font-medium ${deviceSettings.enableRecording ? 'text-green-600' : 'text-gray-500'}`}>
                          {deviceSettings.enableRecording ? 'Enabled' : 'Disabled'}
                        </span>
                      </div>
                    </div>
                  </Card>

                  {/* Tips */}
                  <Card className="bg-gradient-to-br from-yellow-50 to-orange-50 border-yellow-200">
                    <h4 className="text-lg font-semibold text-gray-900 mb-4">💡 Quick Tips</h4>
                    <div className="space-y-2 text-sm text-gray-700">
                      <div className="flex items-start space-x-2">
                        <CheckCircle className="h-4 w-4 text-green-600 mt-0.5" />
                        <span>Look directly at the camera for eye contact</span>
                      </div>
                      <div className="flex items-start space-x-2">
                        <CheckCircle className="h-4 w-4 text-green-600 mt-0.5" />
                        <span>Sit up straight and maintain good posture</span>
                      </div>
                      <div className="flex items-start space-x-2">
                        <CheckCircle className="h-4 w-4 text-green-600 mt-0.5" />
                        <span>Speak clearly and at a moderate pace</span>
                      </div>
                      <div className="flex items-start space-x-2">
                        <CheckCircle className="h-4 w-4 text-green-600 mt-0.5" />
                        <span>Take a moment to think before answering</span>
                      </div>
                    </div>
                  </Card>
                </div>
              </div>

              <div className="flex justify-between mt-8">
                <Button
                  variant="outline"
                  onClick={() => setCurrentStep('selection')}
                >
                  <ChevronLeft className="h-4 w-4 mr-2" />
                  Back
                </Button>
                <Button
                  onClick={handleStartSession}
                  size="lg"
                  className="min-w-[200px]"
                >
                  Start Interview
                  <Play className="h-5 w-5 ml-2" />
                </Button>
              </div>
            </div>
          )}

          {/* Step 4: Results */}
          {currentStep === 'results' && sessionReport && (
            <div className="p-8">
              <div className="max-w-4xl mx-auto">
                <div className="text-center mb-8">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <CheckCircle className="h-8 w-8 text-green-600" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">Session Complete!</h3>
                  <p className="text-gray-600">Here's your detailed performance analysis</p>
                </div>

                {/* Overall Score */}
                <Card className="mb-8 bg-gradient-to-br from-blue-50 to-indigo-100 border-blue-200">
                  <div className="text-center">
                    <div className="text-4xl font-bold text-blue-600 mb-2">
                      {sessionReport.overallScore}/100
                    </div>
                    <div className="text-lg font-semibold text-gray-900 mb-4">Overall Performance</div>
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                      <div className="text-center">
                        <div className="text-xl font-bold text-gray-900">{sessionReport.subScores.bodyLanguage}</div>
                        <div className="text-sm text-gray-600">Body Language</div>
                      </div>
                      <div className="text-center">
                        <div className="text-xl font-bold text-gray-900">{sessionReport.subScores.vocalDelivery}</div>
                        <div className="text-sm text-gray-600">Vocal Delivery</div>
                      </div>
                      <div className="text-center">
                        <div className="text-xl font-bold text-gray-900">{sessionReport.subScores.contentQuality}</div>
                        <div className="text-sm text-gray-600">Content Quality</div>
                      </div>
                      <div className="text-center">
                        <div className="text-xl font-bold text-gray-900">{sessionReport.subScores.confidence}</div>
                        <div className="text-sm text-gray-600">Confidence</div>
                      </div>
                    </div>
                  </div>
                </Card>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  {/* Strengths */}
                  <Card>
                    <h4 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                      <TrendingUp className="h-5 w-5 text-green-600 mr-2" />
                      Strengths
                    </h4>
                    <div className="space-y-3">
                      {sessionReport.strengths.map((strength, index) => (
                        <div key={index} className="flex items-start space-x-3">
                          <CheckCircle className="h-5 w-5 text-green-600 mt-0.5" />
                          <span className="text-sm text-gray-700">{strength}</span>
                        </div>
                      ))}
                    </div>
                  </Card>

                  {/* Areas for Improvement */}
                  <Card>
                    <h4 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                      <AlertCircle className="h-5 w-5 text-orange-600 mr-2" />
                      Areas for Improvement
                    </h4>
                    <div className="space-y-3">
                      {sessionReport.areasForImprovement.map((area, index) => (
                        <div key={index} className="flex items-start space-x-3">
                          <div className="w-5 h-5 bg-orange-100 rounded-full flex items-center justify-center mt-0.5">
                            <div className="w-2 h-2 bg-orange-600 rounded-full"></div>
                          </div>
                          <span className="text-sm text-gray-700">{area}</span>
                        </div>
                      ))}
                    </div>
                  </Card>
                </div>

                {/* Suggestions */}
                <Card className="mt-8">
                  <h4 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                    <Sparkles className="h-5 w-5 text-purple-600 mr-2" />
                    Personalized Suggestions
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {sessionReport.suggestions.map((suggestion, index) => (
                      <div key={index} className="bg-purple-50 p-4 rounded-lg border border-purple-200">
                        <p className="text-sm text-gray-700">{suggestion}</p>
                      </div>
                    ))}
                  </div>
                </Card>

                {/* Actions */}
                <div className="flex justify-center space-x-4 mt-8">
                  <Button
                    variant="outline"
                    onClick={() => {
                      resetModal();
                      setCurrentStep('selection');
                    }}
                  >
                    <RotateCcw className="h-4 w-4 mr-2" />
                    Practice Again
                  </Button>
                  <Button onClick={onClose}>
                    Done
                  </Button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default InterviewPracticeModal;