import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, MessageCircle } from 'lucide-react';
import Button from '../components/shared/ui/Button';

export const ChatPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link
              to="/"
              className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-colors"
            >
              <ArrowLeft className="h-5 w-5" />
              <span>Back to Home</span>
            </Link>
            <h1 className="text-xl font-semibold text-gray-900">AI Chat Assistant</h1>
            <div></div>
          </div>
        </div>
      </header>

      <main className="flex-1 flex items-center justify-center p-8">
        <div className="text-center max-w-md">
          <div className="w-20 h-20 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <MessageCircle className="h-10 w-10 text-primary-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            AI Chat Assistant
          </h2>
          <p className="text-gray-600 mb-8">
            This feature is coming soon! Get personalized career guidance through our intelligent AI assistant.
          </p>
          <Link to="/">
            <Button variant="primary">
              Return to Home
            </Button>
          </Link>
        </div>
      </main>
    </div>
  );
};

// Placeholder components that will be built later
export const OnboardingFlow: React.FC<any> = ({ onComplete, onSkip }) => {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-8">
      <div className="text-center max-w-md">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          Onboarding Flow
        </h2>
        <p className="text-gray-600 mb-8">
          This will be implemented next. For now, let's skip to the dashboard.
        </p>
        <Button onClick={onSkip} variant="primary">
          Skip to Dashboard
        </Button>
      </div>
    </div>
  );
};

export const DashboardLayout: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-8">
      <div className="text-center max-w-md">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          Dashboard Coming Soon
        </h2>
        <p className="text-gray-600 mb-8">
          The student dashboard will be our next focus after the landing page is complete.
        </p>
        <Link to="/">
          <Button variant="primary">
            Back to Landing Page
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default ChatPage;