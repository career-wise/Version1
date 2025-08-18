// src/components/dashboard/DynamicDashboard.tsx - PROPER VERSION
import React from 'react';
import { useUser } from '../../contexts/UserContext';
import { getPersonaConfig } from '../../config/personaConfigs';
import { Link } from 'react-router-dom';
import Card from '../ui/Card';

const DynamicDashboard: React.FC = () => {
  const { userType, userProfile, loading } = useUser();

  // Show loading state
  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600"></div>
        <span className="ml-3 text-gray-600">Loading your dashboard...</span>
      </div>
    );
  }

  // If we have a userType, show persona-specific dashboard
  if (userType) {
    const config = getPersonaConfig(userType);

    return (
      <div className="space-y-8">
        {/* Persona-Specific Welcome Header */}
        <div className="bg-gradient-to-r from-primary-50 to-secondary-50 rounded-xl p-8 border border-primary-100">
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center space-x-4 mb-4">
                <h1 className="text-3xl font-bold text-gray-900">
                  {config.title}
                </h1>
                <span
                  className="px-3 py-1 rounded-full text-sm font-medium text-white"
                  style={{ backgroundColor: config.colors.primary }}
                >
                  {userType.charAt(0).toUpperCase() + userType.slice(1)} Mode
                </span>
              </div>
              <p className="text-gray-600 text-lg mb-2">
                {config.subtitle}
              </p>
              {userProfile?.full_name && (
                <p className="text-gray-500">
                  Welcome back, <span className="font-medium">{userProfile.full_name}</span>!
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card className="p-6 text-center">
            <div className="text-3xl font-bold text-primary-600 mb-2">
              {userProfile?.primary_goals?.length || 0}
            </div>
            <p className="text-sm text-gray-600">Active Goals</p>
          </Card>
          <Card className="p-6 text-center">
            <div className="text-3xl font-bold text-secondary-600 mb-2">
              {userProfile?.skills?.length || 0}
            </div>
            <p className="text-sm text-gray-600">Skills</p>
          </Card>
          <Card className="p-6 text-center">
            <div className="text-3xl font-bold text-green-600 mb-2">
              {userProfile?.industry_interests?.length || 0}
            </div>
            <p className="text-sm text-gray-600">Industries</p>
          </Card>
          <Card className="p-6 text-center">
            <div className="text-3xl font-bold text-purple-600 mb-2">
              85%
            </div>
            <p className="text-sm text-gray-600">Profile Complete</p>
          </Card>
        </div>

        {/* Recommended Actions for this Persona */}
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Recommended for You</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {config.primaryActions
              .filter(action => action.priority === 'high')
              .slice(0, 6)
              .map((action) => (
                <Link key={action.id} to={action.route} className="group">
                  <Card className="p-6 hover:shadow-lg transition-all duration-200 group-hover:border-primary-300 h-full">
                    <div className="flex items-start justify-between mb-4">
                      <div className="text-4xl">{action.icon}</div>
                      <div className="opacity-0 group-hover:opacity-100 transition-opacity">
                        <svg className="w-5 h-5 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                        </svg>
                      </div>
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">{action.label}</h3>
                    <p className="text-gray-600">{action.description}</p>
                  </Card>
                </Link>
              ))}
          </div>
        </div>

        {/* AI Assistant Quick Actions */}
        <Card className="p-6">
          <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
            <span className="text-2xl mr-3">🤖</span>
            Ask AI Assistant
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {config.chatPrompts.slice(0, 4).map((prompt, index) => (
              <button
                key={index}
                onClick={() => {
                  window.location.href = `/chat?prompt=${encodeURIComponent(prompt)}`;
                }}
                className="text-left p-4 bg-gray-50 rounded-lg hover:bg-primary-50 hover:border-primary-200 border border-gray-200 transition-all duration-200"
              >
                <p className="text-sm text-gray-700 font-medium">"{prompt}"</p>
              </button>
            ))}
          </div>
        </Card>

        {/* Recent Activity / Progress */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <Card className="p-6">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Recent Activity</h3>
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span className="text-gray-600">Profile setup completed</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                <span className="text-gray-600">Joined CareerWise</span>
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Next Steps</h3>
            <div className="space-y-3">
              {config.primaryActions
                .filter(action => action.priority === 'medium')
                .slice(0, 3)
                .map((action, index) => (
                  <Link
                    key={action.id}
                    to={action.route}
                    className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    <span className="text-lg">{action.icon}</span>
                    <span className="text-gray-700 hover:text-primary-600">{action.label}</span>
                  </Link>
                ))}
            </div>
          </Card>
        </div>
      </div>
    );
  }

  // Fallback: Show regular dashboard with setup prompt (but keep sidebar)
  return (
    <div className="space-y-8">
      {/* Setup Prompt */}
      <Card className="p-8 text-center bg-gradient-to-r from-primary-50 to-secondary-50 border border-primary-100">
        <div className="max-w-md mx-auto">
          <div className="text-6xl mb-4">🚀</div>
          <h1 className="text-2xl font-bold text-gray-900 mb-4">
            Complete Your Profile Setup
          </h1>
          <p className="text-gray-600 mb-6">
            Get a personalized CareerWise experience tailored to your career goals and stage.
          </p>
          <Link
            to="/onboarding"
            className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-lg text-white bg-primary-600 hover:bg-primary-700 transition-colors"
          >
            Complete Setup
          </Link>
        </div>
      </Card>

      {/* Default Feature Grid */}
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Explore CareerWise</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Link to="/dashboard/resume" className="group">
            <Card className="p-6 hover:shadow-lg transition-all duration-200 group-hover:border-primary-300 text-center h-full">
              <div className="text-4xl mb-4">📄</div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Resume Builder</h3>
              <p className="text-gray-600">Create an ATS-friendly resume that gets noticed</p>
            </Card>
          </Link>

          <Link to="/dashboard/assessments" className="group">
            <Card className="p-6 hover:shadow-lg transition-all duration-200 group-hover:border-primary-300 text-center h-full">
              <div className="text-4xl mb-4">🎯</div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Assessments</h3>
              <p className="text-gray-600">Discover your strengths and career fit</p>
            </Card>
          </Link>

          <Link to="/dashboard/interview" className="group">
            <Card className="p-6 hover:shadow-lg transition-all duration-200 group-hover:border-primary-300 text-center h-full">
              <div className="text-4xl mb-4">🗣️</div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Interview Prep</h3>
              <p className="text-gray-600">Practice with AI-powered interview coaching</p>
            </Card>
          </Link>

          <Link to="/dashboard/learning" className="group">
            <Card className="p-6 hover:shadow-lg transition-all duration-200 group-hover:border-primary-300 text-center h-full">
              <div className="text-4xl mb-4">🧠</div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Learning Paths</h3>
              <p className="text-gray-600">Develop skills with personalized courses</p>
            </Card>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default DynamicDashboard;