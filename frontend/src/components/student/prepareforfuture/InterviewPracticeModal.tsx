import React, { useState } from "react";
import {
  X,
  Video,
  Play,
  CheckCircle,
  ArrowRight,
  ChevronLeft,
  GraduationCap,
  Briefcase,
} from "lucide-react";
import Button from "../../shared/ui/Button";
import Card from "../../shared/ui/Card";

interface InterviewPracticeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const InterviewPracticeModal: React.FC<InterviewPracticeModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [selectedType, setSelectedType] = useState<'college' | 'job' | null>(null);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden">
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

        <div className="p-8">
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-2">Choose Interview Type</h3>
            <p className="text-gray-600">Select the type of interview you'd like to practice</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {/* College Interview Option */}
            <div
              onClick={() => setSelectedType('college')}
              className={`cursor-pointer transition-all duration-300 transform hover:scale-105 ${
                selectedType === 'college'
                  ? 'ring-4 ring-blue-200 shadow-xl'
                  : 'hover:shadow-lg'
              }`}
            >
              <Card className={`h-full ${
                selectedType === 'college' 
                  ? 'border-blue-500 bg-blue-50' 
                  : 'border-gray-200 hover:border-blue-300'
              }`}>
                <div className="text-center">
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
                </div>
              </Card>
            </div>

            {/* Job Interview Option */}
            <div
              onClick={() => setSelectedType('job')}
              className={`cursor-pointer transition-all duration-300 transform hover:scale-105 ${
                selectedType === 'job'
                  ? 'ring-4 ring-green-200 shadow-xl'
                  : 'hover:shadow-lg'
              }`}
            >
              <Card className={`h-full ${
                selectedType === 'job' 
                  ? 'border-green-500 bg-green-50' 
                  : 'border-gray-200 hover:border-green-300'
              }`}>
                <div className="text-center">
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
                </div>
              </Card>
            </div>
          </div>

          <div className="flex justify-center mt-8">
            <Button
              onClick={() => {
                // For demo, just show a message
                alert(`Starting ${selectedType} interview practice! This feature will be fully implemented soon.`);
                onClose();
              }}
              disabled={!selectedType}
              size="lg"
              className="min-w-[200px]"
            >
              Continue
              <ArrowRight className="h-5 w-5 ml-2" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InterviewPracticeModal;