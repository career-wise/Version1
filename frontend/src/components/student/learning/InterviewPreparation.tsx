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
  CheckCircle
} from "lucide-react";
import Card from "../../shared/ui/Card";
import Button from "../../shared/ui/Button";
import InterviewPracticeModal from "./InterviewPracticeModal";

const InterviewPreparation: React.FC = () => {
  const [showPracticeModal, setShowPracticeModal] = useState(false);

  const prepSteps = [
    {
      title: "Research Opportunities",
      description: "Find internships and jobs that align with your interests and career goals",
      icon: <Target className="h-8 w-8 text-blue-600" />,
      tasks: [
        "Identify target companies",
        "Research application requirements",
        "Network with professionals",
      ],
    },
    {
      title: "Prepare Application Materials",
      description: "Create compelling resumes and cover letters",
      icon: <FileText className="h-8 w-8 text-green-600" />,
      tasks: [
        "Update your resume",
        "Write tailored cover letters",
        "Gather references",
      ],
    },
    {
      title: "Practice Interview Skills",
      description: "Get ready for the interview process with AI-powered practice",
      icon: <Users className="h-8 w-8 text-purple-600" />,
      tasks: [
        "Practice common questions",
        "Improve body language",
        "Work on presentation skills",
      ],
      isInteractive: true,
    },
    {
      title: "Professional Development",
      description: "Build skills that employers value",
      icon: <Briefcase className="h-8 w-8 text-orange-600" />,
      tasks: [
        "Develop technical skills",
        "Improve communication",
        "Learn about workplace etiquette",
      ],
    },
  ];

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
        {prepSteps.map((step, index) => (
          <Card
            key={index}
            className="hover:shadow-lg transition-all duration-200"
          >
            <div className="flex items-start space-x-4 mb-4">
              {step.icon}
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {step.title}
                </h3>
                <p className="text-gray-600 mb-4">{step.description}</p>
              </div>
            </div>

            <div className="mb-6">
              <h4 className="font-medium text-gray-900 mb-3">Action Items:</h4>
              <ul className="space-y-2">
                {step.tasks.map((task, taskIndex) => (
                  <li
                    key={taskIndex}
                    className="text-sm text-gray-600 flex items-center"
                  >
                    <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
                    {task}
                  </li>
                ))}
              </ul>
            </div>

            <Button 
              className="w-full" 
              size="sm"
              onClick={step.isInteractive ? handlePracticeClick : undefined}
              variant={step.isInteractive ? "primary" : "outline"}
            >
              {step.isInteractive ? (
                <>
                  <Play className="h-4 w-4 mr-2" />
                  Start Practice
                </>
              ) : (
                "Get Started"
              )}
            </Button>
          </Card>
        ))}
      </div>

      {/* Practice Modal */}
      {showPracticeModal && (
        <InterviewPracticeModal
          isOpen={showPracticeModal}
          onClose={() => setShowPracticeModal(false)}
        />
      )}
    </div>
  );
};

export default InterviewPreparation;