import React from 'react';
import { useUser } from '../../contexts/UserContext';
import { getPersonaConfig } from '../../config/personaConfigs';
import { Link } from 'react-router-dom';
import Card from '../ui/Card';
import ProgressBar from '../ui/ProgressBar';

const Dashboard: React.FC = () => {
  const { userType, userProfile, loading } = useUser();

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600"></div>
        <span className="ml-3 text-gray-600">Loading your dashboard...</span>
      </div>
    );
  }

  // Get persona config if user has completed onboarding
  const personaConfig = userType ? getPersonaConfig(userType) : null;
  const isOnboarded = userProfile?.onboarding_completed;

  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-primary-50 via-white to-secondary-50 rounded-xl p-8 border border-gray-100">
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center space-x-4 mb-2">
              <h1 className="text-3xl font-bold text-gray-900">
                {personaConfig ? personaConfig.title : 'Welcome to CareerWise!'}
              </h1>
              {userType && (
                <span
                  className="px-3 py-1 rounded-full text-sm font-medium text-white"
                  style={{ backgroundColor: personaConfig?.colors.primary || '#6366f1' }}
                >
                  {userType.charAt(0).toUpperCase() + userType.slice(1)} Mode
                </span>
              )}
            </div>
            <p className="text-xl text-gray-600 mb-2">
              {personaConfig ? personaConfig.subtitle : 'Your AI-powered career development platform'}
            </p>
            {userProfile?.full_name && (
              <p className="text-gray-500">
                Welcome back, <span className="font-medium">{userProfile.full_name}</span>!
              </p>
            )}
          </div>

          {!isOnboarded && (
            <Link
              to="/onboarding"
              className="px-6 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors font-medium"
            >
              Complete Setup
            </Link>
          )}
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="p-6 text-center">
          <div className="text-3xl font-bold text-primary-600 mb-2">
            {userProfile?.primary_goals?.length || 0}
          </div>
          <p className="text-sm text-gray-600">Active Goals</p>
          <div className="mt-3">
            <ProgressBar progress={75} className="h-2" />
          </div>
        </Card>

        <Card className="p-6 text-center">
          <div className="text-3xl font-bold text-green-600 mb-2">
            {userProfile?.skills?.length || 0}
          </div>
          <p className="text-sm text-gray-600">Skills Tracked</p>
          <div className="mt-3">
            <ProgressBar progress={60} className="h-2" />
          </div>
        </Card>

        <Card className="p-6 text-center">
          <div className="text-3xl font-bold text-blue-600 mb-2">
            {userProfile?.industry_interests?.length || 2}
          </div>
          <p className="text-sm text-gray-600">Industries</p>
          <div className="mt-3">
            <ProgressBar progress={85} className="h-2" />
          </div>
        </Card>

        <Card className="p-6 text-center">
          <div className="text-3xl font-bold text-purple-600 mb-2">
            {isOnboarded ? '100%' : '85%'}
          </div>
          <p className="text-sm text-gray-600">Profile Complete</p>
          <div className="mt-3">
            <ProgressBar progress={isOnboarded ? 100 : 85} className="h-2" />
          </div>
        </Card>
      </div>

      {/* Main Features Grid */}
      <div>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-900">
            {personaConfig ? 'Recommended for You' : 'Explore CareerWise'}
          </h2>
          {personaConfig && (
            <span className="text-sm text-gray-500">
              Personalized for {userType}s
            </span>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Resume Builder */}
          <Link to="/dashboard/resume" className="group">
            <Card className="p-6 hover:shadow-lg transition-all duration-200 group-hover:border-primary-300 h-full">
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 bg-blue-100 rounded-lg">
                  <span className="text-2xl">📄</span>
                </div>
                <div className="opacity-0 group-hover:opacity-100 transition-opacity">
                  <svg className="w-5 h-5 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </div>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Resume Builder</h3>
              <p className="text-gray-600 text-sm">
                {personaConfig ?
                  personaConfig.primaryActions.find(a => a.id.includes('resume'))?.description || 'Create an ATS-friendly resume that gets noticed' :
                  'Create an ATS-friendly resume that gets noticed'
                }
              </p>
            </Card>
          </Link>

          {/* Assessments */}
          <Link to="/dashboard/assessments" className="group">
            <Card className="p-6 hover:shadow-lg transition-all duration-200 group-hover:border-primary-300 h-full">
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 bg-green-100 rounded-lg">
                  <span className="text-2xl">🎯</span>
                </div>
                <div className="opacity-0 group-hover:opacity-100 transition-opacity">
                  <svg className="w-5 h-5 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </div>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Assessments</h3>
              <p className="text-gray-600 text-sm">Discover your strengths, interests, and ideal career paths</p>
            </Card>
          </Link>

          {/* Interview Prep */}
          <Link to="/dashboard/interview" className="group">
            <Card className="p-6 hover:shadow-lg transition-all duration-200 group-hover:border-primary-300 h-full">
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 bg-purple-100 rounded-lg">
                  <span className="text-2xl">🗣️</span>
                </div>
                <div className="opacity-0 group-hover:opacity-100 transition-opacity">
                  <svg className="w-5 h-5 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </div>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Interview Prep</h3>
              <p className="text-gray-600 text-sm">Practice with AI-powered mock interviews and real-time feedback</p>
            </Card>
          </Link>

          {/* Learning Paths */}
          <Link to="/dashboard/learning" className="group">
            <Card className="p-6 hover:shadow-lg transition-all duration-200 group-hover:border-primary-300 h-full">
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 bg-orange-100 rounded-lg">
                  <span className="text-2xl">🧠</span>
                </div>
                <div className="opacity-0 group-hover:opacity-100 transition-opacity">
                  <svg className="w-5 h-5 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </div>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Learning Paths</h3>
              <p className="text-gray-600 text-sm">Personalized courses and skill development recommendations</p>
            </Card>
          </Link>

          {/* Persona-specific additional features */}
          {personaConfig && personaConfig.primaryActions
            .filter(action => action.priority === 'high')
            .slice(0, 2)
            .map((action) => (
              <Link key={action.id} to={action.route} className="group">
                <Card className="p-6 hover:shadow-lg transition-all duration-200 group-hover:border-primary-300 h-full">
                  <div className="flex items-center justify-between mb-4">
                    <div className="p-3 bg-indigo-100 rounded-lg">
                      <span className="text-2xl">{action.icon}</span>
                    </div>
                    <div className="opacity-0 group-hover:opacity-100 transition-opacity">
                      <svg className="w-5 h-5 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                      </svg>
                    </div>
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">{action.label}</h3>
                  <p className="text-gray-600 text-sm">{action.description}</p>
                </Card>
              </Link>
            ))}

          {/* Career Goals */}
          <Link to="/dashboard/goals" className="group">
            <Card className="p-6 hover:shadow-lg transition-all duration-200 group-hover:border-primary-300 h-full">
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 bg-pink-100 rounded-lg">
                  <span className="text-2xl">🎯</span>
                </div>
                <div className="opacity-0 group-hover:opacity-100 transition-opacity">
                  <svg className="w-5 h-5 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </div>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Career Goals</h3>
              <p className="text-gray-600 text-sm">Set, track, and achieve your professional milestones</p>
            </Card>
          </Link>

          {/* Analytics */}
          <Link to="/dashboard/analytics" className="group">
            <Card className="p-6 hover:shadow-lg transition-all duration-200 group-hover:border-primary-300 h-full">
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 bg-cyan-100 rounded-lg">
                  <span className="text-2xl">📊</span>
                </div>
                <div className="opacity-0 group-hover:opacity-100 transition-opacity">
                  <svg className="w-5 h-5 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </div>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Analytics</h3>
              <p className="text-gray-600 text-sm">Track your progress and career development insights</p>
            </Card>
          </Link>
        </div>
      </div>

      {/* AI Assistant Section */}
      <Card className="p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-3">
            <div className="p-3 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-lg">
              <span className="text-2xl text-white">🤖</span>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900">AI Career Assistant</h3>
              <p className="text-gray-600">Get personalized career guidance</p>
            </div>
          </div>
          <Link
            to="/chat"
            className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
          >
            Start Chat
          </Link>
        </div>

        {personaConfig && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {personaConfig.chatPrompts.slice(0, 4).map((prompt, index) => (
              <button
                key={index}
                onClick={() => {
                  window.location.href = `/chat?prompt=${encodeURIComponent(prompt)}`;
                }}
                className="text-left p-4 bg-gray-50 rounded-lg hover:bg-primary-50 hover:border-primary-200 border border-gray-200 transition-all duration-200"
              >
                <p className="text-sm text-gray-700">"{prompt}"</p>
              </button>
            ))}
          </div>
        )}
      </Card>
    </div>
  );
};

export default Dashboard;