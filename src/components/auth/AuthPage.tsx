import React, { useState } from 'react';
import { Eye, EyeOff, Briefcase, ArrowLeft, AlertCircle, Zap } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import Button from '../ui/Button';
import Input from '../ui/Input';
import { authService } from '../../lib/auth';
import { useToast } from '../../hooks/useToast';

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
    
    // Simulate authentication delay
    setTimeout(() => {
      // Set up mock user data in localStorage
      const mockUser = {
        id: 'demo-user-123',
        email: formData.email || 'demo@example.com',
        full_name: formData.fullName || 'Demo User',
        created_at: new Date().toISOString(),
        is_demo: true,
        onboarding_completed: false // This is key!
      };

      // Store mock auth data
      localStorage.setItem('careerwise_token', 'demo-token-' + Date.now());
      localStorage.setItem('careerwise_user', JSON.stringify(mockUser));
      localStorage.setItem('careerwise_needs_onboarding', 'true');

      success('Demo Access Granted!', 'You are now signed in with demo mode');
      setLoading(false);

      // Navigate to onboarding for demo users
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
        console.log('🔄 Attempting sign up...');
        const response = await authService.signUp(formData.email, formData.password, formData.fullName);
        success('Account created successfully!', 'Welcome to CareerWise');

        console.log('✅ Sign up successful, user:', response.user);

        // Check if user needs onboarding
        const needsOnboarding = !response.user.onboarding_completed;

        if (needsOnboarding) {
          console.log('📝 User needs onboarding, redirecting...');
          localStorage.setItem('careerwise_needs_onboarding', 'true');
          navigate('/onboarding');
        } else {
          console.log('✅ User already onboarded, going to dashboard');
          navigate('/dashboard');
        }
      } else {
        console.log('🔄 Attempting sign in...');
        const response = await authService.signIn(formData.email, formData.password);
        success('Welcome back!', 'You have been signed in successfully');
        console.log('✅ Sign in successful, user:', response.user);

        // Check if user needs onboarding
        const needsOnboarding = !response.user.onboarding_completed;

        if (needsOnboarding) {
          console.log('📝 User needs onboarding, redirecting...');
          localStorage.setItem('careerwise_needs_onboarding', 'true');
          navigate('/onboarding');
        } else {
          console.log('✅ User already onboarded, going to dashboard');
          navigate('/dashboard');
        }
      }
    } catch (err) {
      console.error('❌ Auth error:', err);
      const errorMessage = err instanceof Error ? err.message : 'Authentication failed';
      showError('Authentication Error', errorMessage);
      
      // Show bypass option when auth fails
      setBypassMode(true);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
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
        <Link to="/" className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-colors">
          <ArrowLeft className="h-5 w-5" />
          <span>Back to Home</span>
        </Link>
        <Link to="/" className="flex items-center space-x-2">
          <Briefcase className="h-8 w-8 text-primary-600" />
          <span className="text-xl font-bold text-dark-900">
            Career<span className="text-primary-600">Wise</span>
          </span>
        </Link>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex items-center justify-center px-4 py-12">
        <div className="max-w-md w-full">
          {/* Card */}
          <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
            {/* Header */}
            <div className="px-8 pt-8 pb-6 text-center">
              <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Briefcase className="h-8 w-8 text-primary-600" />
              </div>
              <h1 className="text-2xl font-bold text-gray-900 mb-2">
                {isSignUp ? 'Create your account' : 'Welcome back'}
              </h1>
              <p className="text-gray-600">
                {isSignUp 
                  ? 'Start your career journey with AI-powered guidance' 
                  : 'Sign in to continue your career journey'
                }
              </p>
            </div>

            {/* Bypass Mode Alert */}
            {bypassMode && (
              <div className="mx-8 mb-6 p-4 bg-orange-50 border border-orange-200 rounded-lg">
                <div className="flex items-start">
                  <AlertCircle className="h-5 w-5 text-orange-600 mt-0.5 flex-shrink-0" />
                  <div className="ml-3 flex-1">
                    <h3 className="text-sm font-medium text-orange-800">Database Connection Issue</h3>
                    <p className="mt-1 text-sm text-orange-700">
                      Unable to connect to the authentication service. You can continue with demo mode below.
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
                    placeholder="John Doe"
                    error={errors.fullName}
                    required
                  />
                )}

                <Input
                  label="Email Address"
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  placeholder="john@example.com"
                  error={errors.email}
                  required
                />

                <Input
                  label="Password"
                  type={showPassword ? 'text' : 'password'}
                  value={formData.password}
                  onChange={(e) => handleInputChange('password', e.target.value)}
                  placeholder="Enter your password"
                  error={errors.password}
                  required
                  rightIcon={
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="text-gray-400 hover:text-gray-600"
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
                    <a href="#" className="text-sm text-primary-600 hover:text-primary-700">
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

                  {/* Bypass Button - Always visible for development */}
                  <Button
                    type="button"
                    variant="secondary"
                    onClick={handleBypassAuth}
                    loading={loading}
                    className="w-full"
                    size="lg"
                  >
                    <Zap className="h-4 w-4 mr-2" />
                    Continue with Demo Mode
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
                    className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-lg shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 transition-colors"
                    onClick={() => showError('Not Available', 'Social login will be available soon')}
                  >
                    <svg className="h-5 w-5" viewBox="0 0 24 24">
                      <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                      <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                      <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                      <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                    </svg>
                    <span className="ml-2">Google</span>
                  </button>

                  <button 
                    type="button"
                    className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-lg shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 transition-colors"
                    onClick={() => showError('Not Available', 'Social login will be available soon')}
                  >
                    <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M22.46 6c-.77.35-1.6.58-2.46.69.88-.53 1.56-1.37 1.88-2.38-.83.5-1.75.85-2.72 1.05C18.37 4.5 17.26 4 16 4c-2.35 0-4.27 1.92-4.27 4.29 0 .34.04.67.11.98C8.28 9.09 5.11 7.38 3 4.79c-.37.63-.58 1.37-.58 2.15 0 1.49.75 2.81 1.91 3.56-.71 0-1.37-.2-1.95-.5v.03c0 2.08 1.48 3.82 3.44 4.21a4.22 4.22 0 0 1-1.93.07 4.28 4.28 0 0 0 4 2.98 8.521 8.521 0 0 1-5.33 1.84c-.34 0-.68-.02-1.02-.06C3.44 20.29 5.7 21 8.12 21 16 21 20.33 14.46 20.33 8.79c0-.19 0-.37-.01-.56.84-.6 1.56-1.36 2.14-2.23z"/>
                    </svg>
                    <span className="ml-2">Twitter</span>
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
                    className="font-medium text-primary-600 hover:text-primary-700"
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
              <a href="#" className="text-primary-600 hover:text-primary-700">Terms of Service</a>
              {' '}and{' '}
              <a href="#" className="text-primary-600 hover:text-primary-700">Privacy Policy</a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;