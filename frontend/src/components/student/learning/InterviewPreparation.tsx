import React, { useState } from "react";
import { 
  Briefcase, 
  FileText, 
  Users, 
  Target, 
  Play, 
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
  ChevronDown,
  ChevronUp,
  ExternalLink
} from "lucide-react";
import Card from "../../shared/ui/Card";
import Button from "../../shared/ui/Button";
import InterviewPracticeModal from "./InterviewPracticeModal";

const InterviewPreparation: React.FC = () => {
  const [showPracticeModal, setShowPracticeModal] = useState(false);
  const [completedSteps, setCompletedSteps] = useState<string[]>([]);
  const [expandedStep, setExpandedStep] = useState<string | null>(null);

  const prepSteps = [
    {
      id: "research",
      title: "Research Opportunities",
      description: "Find internships and jobs that align with your interests and career goals",
      icon: <Target className="h-8 w-8 text-blue-600" />,
      tasks: [
        { task: "Identify target companies", completed: false },
        { task: "Research application requirements", completed: false },
        { task: "Network with professionals", completed: false },
      ],
      resources: [
        "LinkedIn Job Search",
        "Company Career Pages",
        "Industry Reports",
        "Professional Networking Events"
      ]
    },
    {
      id: "materials",
      title: "Prepare Application Materials",
      description: "Create compelling resumes and cover letters",
      icon: <FileText className="h-8 w-8 text-green-600" />,
      tasks: [
        { task: "Update your resume", completed: false },
        { task: "Write tailored cover letters", completed: false },
        { task: "Gather references", completed: false },
      ],
      resources: [
        "Resume Templates",
        "Cover Letter Examples",
        "Reference Request Templates",
        "ATS Optimization Guide"
      ]
    },
    {
      id: "interview-skills",
      title: "Practice Interview Skills",
      description: "Get ready for the interview process with AI-powered practice",
      icon: <Users className="h-8 w-8 text-purple-600" />,
      tasks: [
        { task: "Practice common questions", completed: false },
        { task: "Improve body language", completed: false },
        { task: "Work on presentation skills", completed: false },
      ],
      resources: [
        "Common Interview Questions",
        "STAR Method Guide",
        "Body Language Tips",
        "Presentation Skills Training"
      ],
      isInteractive: true,
    },
    {
      id: "professional-dev",
      title: "Professional Development",
      description: "Build skills that employers value",
      icon: <Briefcase className="h-8 w-8 text-orange-600" />,
      tasks: [
        { task: "Develop technical skills", completed: false },
        { task: "Improve communication", completed: false },
        { task: "Learn about workplace etiquette", completed: false },
      ],
      resources: [
        "Online Skill Courses",
        "Communication Workshops",
        "Professional Etiquette Guide",
        "Industry Certifications"
      ]
    },
  ];

  const [steps, setSteps] = useState(prepSteps);

  const toggleStepExpansion = (stepId: string) => {
    setExpandedStep(expandedStep === stepId ? null : stepId);
  };

  const toggleTaskCompletion = (stepId: string, taskIndex: number) => {
    setSteps(prevSteps => 
      prevSteps.map(step => 
        step.id === stepId 
          ? {
              ...step,
              tasks: step.tasks.map((task, index) => 
                index === taskIndex 
                  ? { ...task, completed: !task.completed }
                  : task
              )
            }
          : step
      )
    );
  };

  const markStepComplete = (stepId: string) => {
    setCompletedSteps(prev => 
      prev.includes(stepId) 
        ? prev.filter(id => id !== stepId)
        : [...prev, stepId]
    );
  };

  const getStepProgress = (step: any) => {
    const completedTasks = step.tasks.filter((task: any) => task.completed).length;
    return Math.round((completedTasks / step.tasks.length) * 100);
  };

  const handlePracticeClick = () => {
    setShowPracticeModal(true);
  };

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Interview Preparation
        </h1>
        <p className="text-gray-600">
          Get ready for your first professional interview experience with AI-powered practice
        </p>
      </div>

      {/* Featured Practice Section */}
      <Card className="mb-8 bg-gradient-to-br from-purple-50 to-indigo-100 border-purple-200">
        <div className="flex items-center justify-between">
          <div className="flex-1">
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 bg-purple-600 rounded-xl flex items-center justify-center mr-4">
                <Video className="h-6 w-6 text-white" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-900">AI Interview Practice</h2>
                <p className="text-purple-700">Real-time coaching with instant feedback</p>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <div className="flex items-center space-x-2">
                <Eye className="h-5 w-5 text-purple-600" />
                <span className="text-sm text-gray-700">Body Language Analysis</span>
              </div>
              <div className="flex items-center space-x-2">
                <Volume2 className="h-5 w-5 text-purple-600" />
                <span className="text-sm text-gray-700">Voice Coaching</span>
              </div>
              <div className="flex items-center space-x-2">
                <MessageSquare className="h-5 w-5 text-purple-600" />
                <span className="text-sm text-gray-700">Content Feedback</span>
              </div>
            </div>
          </div>
          
          <div className="ml-6">
            <Button 
              size="lg" 
              onClick={handlePracticeClick}
              className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700"
            >
              <Play className="h-5 w-5 mr-2" />
              Start Practice
            </Button>
          </div>
        </div>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {steps.map((step, index) => {
          const isCompleted = completedSteps.includes(step.id);
          const isExpanded = expandedStep === step.id;
          const progress = getStepProgress(step);
          
          return (
            <Card
              key={step.id}
              className={`hover:shadow-lg transition-all duration-200 ${
                isCompleted ? 'border-green-200 bg-green-50' : 'border-gray-200'
              }`}
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-start space-x-4 flex-1">
                  <div className={`p-2 rounded-xl ${isCompleted ? 'bg-green-100' : 'bg-gray-100'}`}>
                    {step.icon}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="text-lg font-semibold text-gray-900">
                        {step.title}
                      </h3>
                      <div className="flex items-center space-x-2">
                        {isCompleted && (
                          <CheckCircle className="h-5 w-5 text-green-600" />
                        )}
                        <button
                          onClick={() => toggleStepExpansion(step.id)}
                          className="p-1 hover:bg-gray-100 rounded transition-colors"
                        >
                          {isExpanded ? (
                            <ChevronUp className="h-4 w-4 text-gray-500" />
                          ) : (
                            <ChevronDown className="h-4 w-4 text-gray-500" />
                          )}
                        </button>
                      </div>
                    </div>
                    <p className="text-gray-600 mb-4">{step.description}</p>
                    
                    {/* Progress Bar */}
                    <div className="mb-4">
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-gray-600">Progress</span>
                        <span className="font-medium">{progress}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className={`h-2 rounded-full transition-all duration-300 ${
                            progress === 100 ? 'bg-green-500' : 'bg-blue-500'
                          }`}
                          style={{ width: `${progress}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Expanded Content */}
              {isExpanded && (
                <div className="space-y-6 pt-4 border-t border-gray-200">
                  {/* Tasks Checklist */}
                  <div>
                    <h4 className="font-medium text-gray-900 mb-3">Action Items:</h4>
                    <div className="space-y-2">
                      {step.tasks.map((taskItem, taskIndex) => (
                        <div
                          key={taskIndex}
                          className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                        >
                          <button
                            onClick={() => toggleTaskCompletion(step.id, taskIndex)}
                            className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-colors ${
                              taskItem.completed
                                ? 'bg-green-500 border-green-500'
                                : 'border-gray-300 hover:border-green-400'
                            }`}
                          >
                            {taskItem.completed && (
                              <CheckCircle className="h-3 w-3 text-white" />
                            )}
                          </button>
                          <span className={`text-sm flex-1 ${
                            taskItem.completed ? 'text-gray-500 line-through' : 'text-gray-700'
                          }`}>
                            {taskItem.task}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Resources */}
                  <div>
                    <h4 className="font-medium text-gray-900 mb-3">Helpful Resources:</h4>
                    <div className="grid grid-cols-1 gap-2">
                      {step.resources.map((resource, resourceIndex) => (
                        <div
                          key={resourceIndex}
                          className="flex items-center space-x-2 text-sm text-blue-600 hover:text-blue-700 cursor-pointer"
                        >
                          <ExternalLink className="h-3 w-3" />
                          <span>{resource}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex space-x-3 mt-4">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => toggleStepExpansion(step.id)}
                  className="flex-1"
                >
                  {isExpanded ? 'Collapse' : 'View Details'}
                </Button>
                
                {step.isInteractive ? (
                  <Button 
                    size="sm"
                    onClick={handlePracticeClick}
                    className="flex-1"
                  >
                    <Play className="h-4 w-4 mr-2" />
                    Start Practice
                  </Button>
                ) : (
                  <Button
                    variant={isCompleted ? "secondary" : "primary"}
                    size="sm"
                    onClick={() => markStepComplete(step.id)}
                    className="flex-1"
                  >
                    {isCompleted ? (
                      <>
                        <CheckCircle className="h-4 w-4 mr-2" />
                        Completed
                      </>
                    ) : (
                      "Mark Complete"
                    )}
                  </Button>
                )}
              </div>
            </Card>
          );
        })}
      </div>

      {/* Practice Modal */}
      <InterviewPracticeModal
        isOpen={showPracticeModal}
        onClose={() => setShowPracticeModal(false)}
      />
    </div>
  );
};

export default InterviewPreparation;