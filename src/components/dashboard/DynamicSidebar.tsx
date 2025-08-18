// src/components/dashboard/DynamicSidebar.tsx - FIXED VERSION
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Briefcase } from 'lucide-react';
import { useUser } from '../../contexts/UserContext';
import { getPersonaConfig } from '../../config/personaConfigs';

const DynamicSidebar: React.FC = () => {
  const { userType } = useUser();
  const location = useLocation();

  // Default navigation when no persona is set
  const defaultNavigation = [
    { id: 'dashboard', label: 'Dashboard', icon: '📊', route: '/dashboard', enabled: true },
    { id: 'resume', label: 'Resume Builder', icon: '📄', route: '/dashboard/resume', enabled: true },
    { id: 'assessments', label: 'Assessments', icon: '🎯', route: '/dashboard/assessments', enabled: true },
    { id: 'interview', label: 'Interview Prep', icon: '🗣️', route: '/dashboard/interview', enabled: true },
    { id: 'learning', label: 'Learning Paths', icon: '🧠', route: '/dashboard/learning', enabled: true },
    { id: 'goals', label: 'Career Goals', icon: '🎯', route: '/dashboard/goals', enabled: true },
    { id: 'analytics', label: 'Analytics', icon: '📈', route: '/dashboard/analytics', enabled: true },
  ];

  // Get navigation based on user type
  const navigation = userType ? getPersonaConfig(userType).navigation : defaultNavigation;
  const colors = userType ? getPersonaConfig(userType).colors : { primary: '#6366f1' };

  return (
    <div className="w-64 bg-white border-r border-gray-200 flex flex-col h-full">
      {/* Logo Section */}
      <div className="p-6 border-b border-gray-200">
        <Link to="/" className="flex items-center space-x-3">
          <Briefcase className="h-8 w-8 text-primary-600" />
          <div>
            <span className="text-xl font-bold text-gray-900">
              Career<span className="text-primary-600">Wise</span>
            </span>
            {userType && (
              <div
                className="text-xs font-medium text-white px-2 py-1 rounded-full mt-1"
                style={{ backgroundColor: colors.primary }}
              >
                {userType.charAt(0).toUpperCase() + userType.slice(1)} Mode
              </div>
            )}
          </div>
        </Link>
      </div>

      {/* Navigation Links */}
      <nav className="flex-1 p-4 space-y-1">
        {navigation
          .filter(item => item.enabled)
          .map((item) => {
            const isActive = location.pathname === item.route;
            return (
              <Link
                key={item.id}
                to={item.route}
                className={`flex items-center px-3 py-3 text-sm font-medium rounded-lg transition-all duration-200 ${
                  isActive
                    ? 'text-white shadow-sm'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                }`}
                style={isActive ? { backgroundColor: colors.primary } : {}}
              >
                <span className="mr-3 text-lg">{item.icon}</span>
                {item.label}
                {isActive && (
                  <div className="ml-auto w-2 h-2 bg-white rounded-full"></div>
                )}
              </Link>
            );
          })}
      </nav>

      {/* Profile Setup Section */}
      {!userType && (
        <div className="p-4 border-t border-gray-200 bg-primary-50">
          <div className="text-center">
            <div className="text-2xl mb-2">⚡</div>
            <h4 className="text-sm font-semibold text-gray-900 mb-2">
              Unlock Full Experience
            </h4>
            <p className="text-xs text-gray-600 mb-3">
              Complete setup for personalized features
            </p>
            <Link
              to="/onboarding"
              className="block w-full px-3 py-2 text-xs font-medium text-white bg-primary-600 hover:bg-primary-700 rounded-lg transition-colors"
            >
              Complete Setup
            </Link>
          </div>
        </div>
      )}

      {/* Quick Actions */}
      <div className="p-4 border-t border-gray-200">
        <h4 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">
          Quick Actions
        </h4>
        <div className="space-y-1">
          <Link
            to="/chat"
            className="flex items-center px-3 py-2 text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <span className="mr-3 text-lg">🤖</span>
            AI Assistant
          </Link>
          <Link
            to="/dashboard/profile"
            className="flex items-center px-3 py-2 text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <span className="mr-3 text-lg">⚙️</span>
            Settings
          </Link>
        </div>
      </div>
    </div>
  );
};

export default DynamicSidebar;