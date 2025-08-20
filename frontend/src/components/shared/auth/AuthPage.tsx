import React, { useState } from 'react';
import { Eye, EyeOff, Briefcase, ArrowLeft, AlertCircle, Zap, Mail, Lock, User, CheckCircle } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import Button from '../ui/Button';
import Input from '../ui/Input';
import { authService } from '../../../lib/auth';
import { useToast } from '../../../hooks/useToast';

const AuthPage: React.FC = () => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [bypassMode, setBypassMode] = useState(false);
  const navigate = useNavigate();
  const { success, error: showError } = useToast();
  
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    fullName: '',
    confirmPassword: ''
  });

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    if (isSignUp) {
      if (!formData.fullName) {
        newErrors.fullName = 'Full name is required';
      }

      if (!formData.confirmPassword) {
        newErrors.confirmPassword = 'Please confirm your password';
      } else if (formData.password !== formData.confirmPassword) {
        newErrors.confirmPassword = 'Passwords do not match';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Bypass authentication function
  const handleBypassAuth = () => {
    setLoading(true);
    
    setTimeout(() => {
      const mockUser = {
        id: 'demo-user-123',
        email: formData.email || 'demo@example.com',
        full_name: formData.fullName || 'Demo User',
        created_at: new Date().toISOString(),
        is_demo: true,
        onboarding_completed: false
      };

      localStorage.setItem('careerwise_token', 'demo-token-' + Date.now());
      localStorage.setItem('careerwise_user', JSON.stringify(mockUser));
      localStorage.setItem('careerwise_needs_onboarding', 'true');

      success('Demo Access Granted!', 'You are now signed in with demo mode');
      setLoading(false);
      navigate('/onboarding');
    }, 1000);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setLoading(true);
    setErrors({});

    try {
      if (isSignUp) {
        const response = await authService.signUp(formData.email, formData.password, formData.fullName);
        success('Account created successfully!', 'Welcome to CareerWise');

        const needsOnboarding = !response.user.onboarding_completed;

        if (needsOnboarding) {
          localStorage.setItem('careerwise_needs_onboarding', 'true');
          navigate('/onboarding');
        } else {
          navigate('/dashboard');
        }
      } else {
        const response = await authService.signIn(formData.email, formData.password);
        success('Welcome back!', 'You have been signed in successfully');

        const needsOnboarding = !response.user.onboarding_completed;

        if (needsOnboarding) {
          localStorage.setItem('careerwise_needs_onboarding', 'true');
          navigate('/onboarding');
        } else {
          navigate('/dashboard');
        }
      }
    } catch (err) {
      console.error('❌ Auth error:', err);
      const errorMessage = err instanceof Error ? err.message : 'Authentication failed';
      showError('Authentication Error', errorMessage);
      setBypassMode(true);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const toggleMode = () => {
    setIsSignUp(!isSignUp);
    setFormData({
      email: '',
      password: '',
      fullName: '',
      confirmPassword: ''
    });
    setErrors({});
    setBypassMode(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-secondary-50 flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between p-6">
        <Link to="/" className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-colors group">
          <ArrowLeft className="h-5 w-5 group-hover:-translate-x-1 transition-transform" />
          <span>Back to Home</span>
        </Link>
        <Link to="/" className="flex items-center space-x-2">
          <Briefcase className="h-8 w-8 text-primary-600" />
          <span className="text-xl font-bold text-gray-900">
            Career<span className="text-primary-600">Wise</span>
          </span>
        </Link>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex items-center justify-center px-4 py-12">
        <div className="max-w-md w-full">
          {/* Card */}
          <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden backdrop-blur-sm">
            {/* Header */}
            <div className="px-8 pt-8 pb-6 text-center relative">
              {/* Background decoration */}
              <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-primary-500 to-secondary-500"></div>
              
              <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4 relative">
                <Briefcase className="h-8 w-8 text-primary-600" />
                <div className="absolute -top-1 -right-1 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                  <CheckCircle className="h-4 w-4 text-white" />
                </div>
              </div>
              
              <h1 className="text-2xl font-bold text-gray-900 mb-2">
                {isSignUp ? 'Join CareerWise' : 'Welcome back'}
              </h1>
              <p className="text-gray-600">
                {isSignUp 
                  ? 'Start your AI-powered career journey today' 
                  : 'Continue your career development journey'
                }
              </p>
            </div>

            {/* Bypass Mode Alert */}
            {bypassMode && (
              <div className="mx-8 mb-6 p-4 bg-orange-50 border border-orange-200 rounded-lg">
                <div className="flex items-start">
                  <AlertCircle className="h-5 w-5 text-orange-600 mt-0.5 flex-shrink-0" />
                  <div className="ml-3 flex-1">
                    <h3 className="text-sm font-medium text-orange-800">Demo Mode Available</h3>
                    <p className="mt-1 text-sm text-orange-700">
                      Try CareerWise instantly with our demo mode - no registration required.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Form */}
            <div className="px-8 pb-8">
              <form onSubmit={handleSubmit} className="space-y-6">
                {isSignUp && (
                  <Input
                    label="Full Name"
                    type="text"
                    value={formData.fullName}
                    onChange={(e) => handleInputChange('fullName', e.target.value)}
                    placeholder="Enter your full name"
                    error={errors.fullName}
                    required
                    leftIcon={<User className="h-4 w-4 text-gray-400" />}
                  />
                )}

                <Input
                  label="Email Address"
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  placeholder="Enter your email"
                  error={errors.email}
                  required
                  leftIcon={<Mail className="h-4 w-4 text-gray-400" />}
                />

                <Input
                  label="Password"
                  type={showPassword ? 'text' : 'password'}
                  value={formData.password}
                  onChange={(e) => handleInputChange('password', e.target.value)}
                  placeholder="Enter your password"
                  error={errors.password}
                  required
                  leftIcon={<Lock className="h-4 w-4 text-gray-400" />}
                  rightIcon={
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="text-gray-400 hover:text-gray-600 transition-colors"
                    >
                      {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  }
                />

                {isSignUp && (
                  <Input
                    label="Confirm Password"
                    type={showPassword ? 'text' : 'password'}
                    value={formData.confirmPassword}
                    onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                    placeholder="Confirm your password"
                    error={errors.confirmPassword}
                    required
                    leftIcon={<Lock className="h-4 w-4 text-gray-400" />}
                  />
                )}

                {!isSignUp && (
                  <div className="flex items-center justify-between">
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        className="rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                      />
                      <span className="ml-2 text-sm text-gray-600">Remember me</span>
                    </label>
                    <a href="#" className="text-sm text-primary-600 hover:text-primary-700 transition-colors">
                      Forgot password?
                    </a>
                  </div>
                )}

                <div className="space-y-3">
                  <Button
                    type="submit"
                    loading={loading}
                    className="w-full"
                    size="lg"
                  >
                    {isSignUp ? 'Create Account' : 'Sign In'}
                  </Button>

                  <Button
                    type="button"
                    variant="secondary"
                    onClick={handleBypassAuth}
                    loading={loading}
                    className="w-full"
                    size="lg"
                  >
                    <Zap className="h-4 w-4 mr-2" />
                    Try Demo Mode
                  </Button>
                </div>
              </form>

              {/* Divider */}
              <div className="mt-6">
                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-gray-300" />
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="px-2 bg-white text-gray-500">Or continue with</span>
                  </div>
                </div>

                {/* Social Login */}
                <div className="mt-6 grid grid-cols-2 gap-3">
                  <button 
                    type="button"
                    className="w-full inline-flex justify-center items-center py-3 px-4 border border-gray-300 rounded-lg shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors group"
                    onClick={() => showError('Coming Soon', 'Google sign-in will be available soon')}
                  >
                    <svg className="h-5 w-5 mr-2" viewBox="0 0 24 24">
                      <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                      <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                      <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                      <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                    </svg>
                    Google
                  </button>

                  <button 
                    type="button"
                    className="w-full inline-flex justify-center items-center py-3 px-4 border border-gray-300 rounded-lg shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors group"
                    onClick={() => showError('Coming Soon', 'GitHub sign-in will be available soon')}
                  >
                    <svg className="h-5 w-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 0C5.374 0 0 5.373 0 12 0 17.302 3.438 21.8 8.207 23.387c.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/>
                    </svg>
                    GitHub
                  </button>
                </div>
              </div>

              {/* Toggle */}
              <div className="mt-6 text-center">
                <p className="text-sm text-gray-600">
                  {isSignUp ? 'Already have an account?' : "Don't have an account?"}{' '}
                  <button
                    type="button"
                    onClick={toggleMode}
                    className="font-medium text-primary-600 hover:text-primary-700 transition-colors"
                  >
                    {isSignUp ? 'Sign in' : 'Sign up'}
                  </button>
                </p>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="mt-8 text-center">
            <p className="text-xs text-gray-500">
              By continuing, you agree to our{' '}
              <a href="#" className="text-primary-600 hover:text-primary-700 transition-colors">Terms of Service</a>
              {' '}and{' '}
              <a href="#" className="text-primary-600 hover:text-primary-700 transition-colors">Privacy Policy</a>
            </p>
          </div>

        </div>
      </div>
    </div>
  );
};

export default AuthPage;