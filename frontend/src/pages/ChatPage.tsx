import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, MessageCircle, Sparkles } from 'lucide-react';
import Button from '../components/shared/ui/Button';
import Card from '../components/shared/ui/Card';

const ChatPage: React.FC = () => {
  const samplePrompts = [
    "What career paths are best for someone with my background?",
    "How can I improve my resume for tech jobs?",
    "What skills should I learn for my next promotion?",
    "Help me prepare for a job interview",
    "What are the best ways to network in my industry?",
    "How do I transition to a new career field?"
  ];

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
              <MessageCircle className="h-6 w-6 text-primary-600" />
              <span className="text-lg font-semibold text-gray-900">AI Career Assistant</span>
            </div>

            <Link to="/auth">
              <Button variant="outline" size="sm">
                Sign In
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <div className="w-20 h-20 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <Sparkles className="h-10 w-10 text-primary-600" />
          </div>

          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            AI Career Assistant
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Get personalized career guidance powered by artificial intelligence.
            Ask questions about your career path, resume, interviews, and more.
          </p>
        </div>

        {/* Coming Soon Notice */}
        <Card className="text-center mb-12" padding="lg">
          <div className="space-y-4">
            <div className="text-4xl">🚀</div>
            <h2 className="text-2xl font-bold text-gray-900">Coming Soon!</h2>
            <p className="text-gray-600">
              Our AI chat feature is currently in development. Sign up to be notified when it's ready!
            </p>
            <Link to="/auth">
              <Button size="lg">
                Get Early Access
              </Button>
            </Link>
          </div>
        </Card>

        {/* Sample Prompts */}
        <div className="space-y-6">
          <h3 className="text-xl font-semibold text-gray-900 text-center">
            What you'll be able to ask:
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {samplePrompts.map((prompt, index) => (
              <Card
                key={index}
                className="p-4 hover:shadow-md transition-all duration-200 cursor-pointer border-2 border-transparent hover:border-primary-200"
              >
                <div className="flex items-start space-x-3">
                  <MessageCircle className="h-5 w-5 text-primary-600 mt-0.5 flex-shrink-0" />
                  <p className="text-gray-700 text-sm">"{prompt}"</p>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Features Preview */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">🎯</span>
            </div>
            <h4 className="font-semibold text-gray-900 mb-2">Personalized Advice</h4>
            <p className="text-sm text-gray-600">Get recommendations tailored to your background and goals</p>
          </div>

          <div className="text-center">
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">⚡</span>
            </div>
            <h4 className="font-semibold text-gray-900 mb-2">Instant Responses</h4>
            <p className="text-sm text-gray-600">Get immediate answers to your career questions 24/7</p>
          </div>

          <div className="text-center">
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">📈</span>
            </div>
            <h4 className="font-semibold text-gray-900 mb-2">Actionable Insights</h4>
            <p className="text-sm text-gray-600">Receive step-by-step guidance you can implement today</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatPage;