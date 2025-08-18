import React, { useState, useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { Briefcase, Search, Bell, User, Menu, X } from 'lucide-react';
import { authService } from '../../lib/auth';
import { useUser } from '../../contexts/UserContext';

const DashboardLayout: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();
  const { userProfile, loading } = useUser();

  // Check authentication on mount ONLY
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const isAuthenticated = authService.isAuthenticated();
        if (!isAuthenticated) {
          navigate('/auth');
          return;
        }
      } catch (error) {
        console.error('Auth check failed:', error);
        navigate('/auth');
      }
    };

    checkAuth();
  }, [navigate]);

  // Global search handler
  useEffect(() => {
    const handleGlobalSearch = () => {
      const searchInput = document.getElementById('global-search');
      if (searchInput) {
        searchInput.focus();
      }
    };

    window.addEventListener('openGlobalSearch', handleGlobalSearch);
    return () => window.removeEventListener('openGlobalSearch', handleGlobalSearch);
  }, []);

  const handleSignOut = async () => {
    try {
      await authService.signOut();
      navigate('/');
    } catch (error) {
      console.error('Sign out error:', error);
      navigate('/');
    }
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      console.log('Searching for:', searchQuery);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600"></div>
        <span className="ml-3 text-gray-600">Loading...</span>
      </div>
    );
  }

  return (
    <div className="h-screen flex bg-gray-50 overflow-hidden">
      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-40 lg:hidden">
          <div className="fixed inset-0 bg-gray-600 bg-opacity-75" onClick={() => setSidebarOpen(false)} />
        </div>
      )}

      {/* Sidebar - Fixed position, full height */}
      <div className={`fixed inset-y-0 left-0 z-50 w-64 bg-white border-r border-gray-200 transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0 ${
        sidebarOpen ? 'translate-x-0' : '-translate-x-full'
      }`}>
        {/* Logo Section */}
        <div className="flex items-center justify-between h-16 px-6 border-b border-gray-200">
          <div className="flex items-center space-x-3">
            <Briefcase className="h-8 w-8 text-primary-600" />
            <div>
              <span className="text-xl font-bold text-gray-900">
                Career<span className="text-primary-600">Wise</span>
              </span>
            </div>
          </div>

          {/* Mobile close button */}
          <button
            onClick={() => setSidebarOpen(false)}
            className="lg:hidden p-2 rounded-md text-gray-400 hover:text-gray-600"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Navigation - Scrollable content */}
        <div className="flex flex-col h-full">
          <nav className="flex-1 px-4 py-6 space-y-2 overflow-y-auto">
            {/* Core Navigation Items */}
            <a
              href="/dashboard"
              className="flex items-center px-3 py-2 text-sm font-medium text-white bg-primary-600 rounded-lg"
            >
              <span className="mr-3">📊</span>
              Dashboard
            </a>
            <a
              href="/dashboard/resume"
              className="flex items-center px-3 py-2 text-sm font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <span className="mr-3">📄</span>
              Resume Builder
            </a>
            <a
              href="/dashboard/assessments"
              className="flex items-center px-3 py-2 text-sm font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <span className="mr-3">🎯</span>
              Assessments
            </a>
            <a
              href="/dashboard/interview"
              className="flex items-center px-3 py-2 text-sm font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <span className="mr-3">🗣️</span>
              Interview Prep
            </a>
            <a
              href="/dashboard/learning"
              className="flex items-center px-3 py-2 text-sm font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <span className="mr-3">🧠</span>
              Learning Paths
            </a>
            <a
              href="/dashboard/goals"
              className="flex items-center px-3 py-2 text-sm font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <span className="mr-3">🎯</span>
              Career Goals
            </a>
            <a
              href="/dashboard/analytics"
              className="flex items-center px-3 py-2 text-sm font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <span className="mr-3">📈</span>
              Analytics
            </a>
          </nav>

          {/* Quick Actions at bottom */}
          <div className="p-4 border-t border-gray-200">
            <h4 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">
              Quick Actions
            </h4>
            <div className="space-y-1">
              <a
                href="/chat"
                className="flex items-center px-3 py-2 text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <span className="mr-3">🤖</span>
                AI Assistant
              </a>
              <a
                href="/dashboard/settings"
                className="flex items-center px-3 py-2 text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <span className="mr-3">⚙️</span>
                Settings
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Main content area */}
      <div className="flex-1 flex flex-col overflow-hidden lg:ml-0">
        {/* Top Header - Fixed */}
        <header className="bg-white shadow-sm border-b border-gray-200 h-16 flex-shrink-0">
          <div className="h-full px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-full">
              {/* Left side */}
              <div className="flex items-center">
                {/* Mobile menu button */}
                <button
                  onClick={() => setSidebarOpen(true)}
                  className="lg:hidden p-2 rounded-md text-gray-400 hover:text-gray-600 hover:bg-gray-100"
                >
                  <Menu className="h-6 w-6" />
                </button>

                {/* Mobile logo */}
                <div className="flex items-center lg:hidden ml-2">
                  <Briefcase className="h-8 w-8 text-primary-600" />
                  <span className="ml-2 text-xl font-bold text-gray-900">
                    Career<span className="text-primary-600">Wise</span>
                  </span>
                </div>

                {/* Search bar */}
                <form onSubmit={handleSearch} className="hidden lg:flex items-center ml-6">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <input
                      id="global-search"
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="Search anything... (⌘K)"
                      className="pl-10 pr-4 py-2 w-80 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    />
                  </div>
                </form>
              </div>

              {/* Right side */}
              <div className="flex items-center space-x-4">
                {/* Notifications */}
                <button className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg">
                  <Bell className="h-5 w-5" />
                </button>

                {/* User menu */}
                <div className="relative">
                  <button
                    onClick={handleSignOut}
                    className="flex items-center space-x-3 p-2 text-gray-700 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
                  >
                    <div className="w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center">
                      <User className="h-4 w-4 text-primary-600" />
                    </div>
                    <div className="hidden lg:block text-left">
                      <div className="text-sm font-medium text-gray-900">
                        {userProfile?.full_name || 'User'}
                      </div>
                      <div className="text-xs text-gray-500">
                        {userProfile?.user_type || 'Professional'}
                      </div>
                    </div>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Main content - Scrollable */}
        <main className="flex-1 overflow-y-auto bg-gray-50">
          <div className="py-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;