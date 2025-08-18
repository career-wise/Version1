import React from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import Header from './components/Header';
import Hero from './components/Hero';
import UserTypes from './components/UserTypes';
import HowItWorks from './components/HowItWorks';
import Features from './components/Features';
import Testimonials from './components/Testimonials';
import About from './components/About';
import Footer from './components/Footer';
import ChatPage from './pages/ChatPage';
import AuthPage from './components/auth/AuthPage';
import DashboardLayout from './components/dashboard/DashboardLayout';
import Dashboard from './components/dashboard/Dashboard';
import DynamicDashboard from './components/dashboard/DynamicDashboard';
import ResumeBuilder from './components/resume/ResumeBuilder';
import AssessmentCenter from './components/assessments/AssessmentCenter';
import InterviewPrep from './components/interview/InterviewPrep';
import LearningPaths from './components/learning/LearningPaths';
import CareerGoals from './components/goals/CareerGoals';
import PersonalAnalytics from './components/analytics/PersonalAnalytics';
import FloatingChatButton from './components/FloatingChatButton';
import OnboardingFlow from './components/onboarding/OnboardingFlow';
import { ToastContainer } from './components/ui/Toast';
import { useToast } from './hooks/useToast';
import { useKeyboardShortcuts, commonShortcuts } from './hooks/useKeyboardShortcuts';
import { authService } from './lib/auth';
import { UserProvider } from './contexts/UserContext';

// Landing Page Component
const LandingPage: React.FC = () => {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <UserTypes />
        <HowItWorks />
        <Features />
        <Testimonials />
        <About />
      </main>
      <Footer />
      <FloatingChatButton />
    </>
  );
};

// Onboarding Page Component
const OnboardingPage: React.FC = () => {
  const navigate = useNavigate();
  const { success } = useToast();

  const handleOnboardingComplete = async (data: any) => {
    try {
      console.log('🎉 Onboarding completed with data:', data);

      // Update the user's profile with onboarding data
      await authService.updateProfile({
        user_type: data.userType,
        career_stage: data.careerStage,
        experience_level: data.experienceLevel,
        primary_goals: data.primaryGoals,
        industry_interests: data.industryInterests,
        skills: data.skills || [],
        linkedin_url: data.linkedinUrl || null,
        portfolio_url: data.portfolioUrl || null,
        bio: data.bio || null,
        location: data.location || null,
        onboarding_completed: true  // Mark onboarding as completed
      });

      // Update local storage
      localStorage.setItem('careerwise_onboarding_completed', 'true');
      localStorage.removeItem('careerwise_needs_onboarding');
      localStorage.setItem('careerwise_user_profile', JSON.stringify(data));

      success('Welcome to CareerWise!', 'Your profile has been set up successfully.');

      // Navigate to dashboard
      navigate('/dashboard');
    } catch (error) {
      console.error('Error saving onboarding data:', error);
      // Still proceed to dashboard even if save fails
      localStorage.setItem('careerwise_onboarding_completed', 'true');
      localStorage.removeItem('careerwise_needs_onboarding');
      success('Welcome to CareerWise!', 'Your profile has been set up.');
      navigate('/dashboard');
    }
  };

  const handleOnboardingSkip = () => {
    console.log('⏭️ Onboarding skipped');
    localStorage.setItem('careerwise_onboarding_completed', 'true');
    localStorage.removeItem('careerwise_needs_onboarding');
    navigate('/dashboard');
  };

  return (
    <OnboardingFlow
      onComplete={handleOnboardingComplete}
      onSkip={handleOnboardingSkip}
    />
  );
};

function App() {
  const { toasts, removeToast } = useToast();

  // Global keyboard shortcuts
  useKeyboardShortcuts([
    {
      ...commonShortcuts.search,
      callback: () => {
        // This will be handled by the DashboardLayout component
        const event = new CustomEvent('openGlobalSearch');
        window.dispatchEvent(event);
      }
    }
  ]);

  return (
    <UserProvider>
      <Router>
        <div className="min-h-screen bg-white font-sans">
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/chat" element={<ChatPage />} />
            <Route path="/auth" element={<AuthPage />} />
            <Route path="/onboarding" element={<OnboardingPage />} />
            <Route path="/dashboard" element={<DashboardLayout />}>
              <Route index element={<DynamicDashboard />} />
              <Route path="resume" element={<ResumeBuilder />} />
              <Route path="assessments" element={<AssessmentCenter />} />
              <Route path="interview" element={<InterviewPrep />} />
              <Route path="learning" element={<LearningPaths />} />
              <Route path="goals" element={<CareerGoals />} />
              <Route path="analytics" element={<PersonalAnalytics />} />
              <Route path="profile" element={<div>Profile - Coming Soon</div>} />
              <Route path="settings" element={<div>Settings - Coming Soon</div>} />
            </Route>
          </Routes>
          <ToastContainer toasts={toasts} onRemove={removeToast} />
        </div>
      </Router>
    </UserProvider>
  );
}

export default App;