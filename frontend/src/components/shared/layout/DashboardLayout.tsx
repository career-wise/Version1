import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Construction } from 'lucide-react';
import Button from '../ui/Button';
import Card from '../ui/Card';

// Placeholder component for dashboard - we'll build this next
const DashboardLayout: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link
              to="/"
              className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-colors"
            >
              <ArrowLeft className="h-5 w-5" />
              <span>Back to Home</span>
            </Link>

            <div className="flex items-center space-x-2">
              <span className="text-lg font-semibold text-gray-900">CareerWise Dashboard</span>
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
        <Card className="text-center" padding="lg">
          <div className="space-y-6">
            <div className="w-20 h-20 bg-yellow-100 rounded-full flex items-center justify-center mx-auto">
              <Construction className="h-10 w-10 text-yellow-600" />
            </div>

            <h1 className="text-3xl font-bold text-gray-900">
              Dashboard Coming Soon!
            </h1>

            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              We're building an amazing personalized dashboard experience.
              This will be where you'll access all your career tools and insights.
            </p>

            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900">What to expect:</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-left">
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-primary-500 rounded-full"></div>
                  <span className="text-gray-700">Student-specific career guidance</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-primary-500 rounded-full"></div>
                  <span className="text-gray-700">Resume builder and optimizer</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-primary-500 rounded-full"></div>
                  <span className="text-gray-700">Interview preparation tools</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-primary-500 rounded-full"></div>
                  <span className="text-gray-700">Personalized learning paths</span>
                </div>
              </div>
            </div>

            <Link to="/">
              <Button size="lg">
                Back to Home
              </Button>
            </Link>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default DashboardLayout;