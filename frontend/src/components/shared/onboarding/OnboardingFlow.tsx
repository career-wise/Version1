import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, UserPlus } from 'lucide-react';
import Button from '../ui/Button';
import Card from '../ui/Card';

interface OnboardingFlowProps {
  onComplete: (data: any) => void;
  onSkip: () => void;
}

// Placeholder component for onboarding - we'll build this when we work on student features
const OnboardingFlow: React.FC<OnboardingFlowProps> = ({ onComplete, onSkip }) => {
  const handleComplete = () => {
    // Mock onboarding data
    const mockData = {
      userType: 'student',
      careerStage: 'high-school',
      experienceLevel: 'beginner',
      primaryGoals: ['explore-careers', 'college-prep'],
      industryInterests: ['technology', 'healthcare'],
      skills: ['communication', 'problem-solving'],
      linkedinUrl: null,
      portfolioUrl: null,
      bio: null,
      location: 'Student, High School'
    };

    onComplete(mockData);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link
              to="/"
              className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-colors"
            >
              <ArrowLeft className="h-5 w-5" />
              <span>Back to Home</span>
            </Link>

            <div className="flex items-center space-x-2">
              <UserPlus className="h-6 w-6 text-primary-600" />
              <span className="text-lg font-semibold text-gray-900">Setup Your Profile</span>
            </div>

            <button
              onClick={onSkip}
              className="text-gray-600 hover:text-gray-900 transition-colors"
            >
              Skip for now
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <Card className="text-center" padding="lg">
          <div className="space-y-6">
            <div className="w-20 h-20 bg-primary-100 rounded-full flex items-center justify-center mx-auto">
              <UserPlus className="h-10 w-10 text-primary-600" />
            </div>

            <h1 className="text-3xl font-bold text-gray-900">
              Welcome to Careerist!
            </h1>

            <p className="text-xl text-gray-600">
              Let's set up your personalized career guidance experience.
              This quick setup will help us provide better recommendations.
            </p>

            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900">What we'll cover:</h3>
              <div className="space-y-3 text-left">
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-primary-500 rounded-full"></div>
                  <span className="text-gray-700">Your career stage and goals</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-primary-500 rounded-full"></div>
                  <span className="text-gray-700">Areas of interest and skills</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-primary-500 rounded-full"></div>
                  <span className="text-gray-700">Educational background</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-primary-500 rounded-full"></div>
                  <span className="text-gray-700">Future aspirations</span>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" onClick={handleComplete}>
                Quick Setup (Demo)
              </Button>
              <Button variant="outline" size="lg" onClick={onSkip}>
                Skip for Now
              </Button>
            </div>

            <p className="text-sm text-gray-500">
              Full onboarding flow coming soon! For now, you can use the quick demo setup.
            </p>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default OnboardingFlow;