import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useNavigate,
} from "react-router-dom";
import Header from "./components/shared/layout/Header";
import Hero from "./components/shared/landing/Hero";
import UserTypes from "./components/shared/landing/UserTypes";
import HowItWorks from "./components/shared/landing/HowItWorks";
import Features from "./components/shared/landing/Features";
import Testimonials from "./components/shared/landing/Testimonials";
import About from "./components/shared/landing/About";
import Footer from "./components/shared/layout/Footer";
import ChatPage from "./pages/ChatPage";
import AuthPage from "./components/shared/auth/AuthPage";
import DashboardLayout from "./components/shared/layout/DashboardLayout";
import OnboardingFlow from "./components/shared/onboarding/OnboardingFlow";
import FloatingChatButton from "./components/shared/chat/FloatingChatButton";
import { ToastContainer } from "./components/shared/ui/Toast";
import StudentDashboard from "./components/student/dashboard/StudentDashboard";
import { useToast } from "./hooks/useToast";
import {
  useKeyboardShortcuts,
  commonShortcuts,
} from "./hooks/useKeyboardShortcuts";
import { authService } from "./lib/auth";
import { UserProvider } from "./contexts/UserContext";

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
      console.log("🎉 Onboarding completed with data:", data);

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
        onboarding_completed: true,
      });

      localStorage.setItem("careerwise_onboarding_completed", "true");
      localStorage.removeItem("careerwise_needs_onboarding");
      localStorage.setItem("careerwise_user_profile", JSON.stringify(data));

      success(
        "Welcome to Careerist!",
        "Your profile has been set up successfully."
      );
      navigate("/student-dashboard");
    } catch (error) {
      console.error("Error saving onboarding data:", error);
      localStorage.setItem("careerwise_onboarding_completed", "true");
      localStorage.removeItem("careerwise_needs_onboarding");
      success("Welcome to CareerWise!", "Your profile has been set up.");
      navigate("/student-dashboard");
    }
  };

  const handleOnboardingSkip = () => {
    console.log("⏭️ Onboarding skipped");
    localStorage.setItem("careerwise_onboarding_completed", "true");
    localStorage.removeItem("careerwise_needs_onboarding");
    navigate("/student-dashboard");
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
        const event = new CustomEvent("openGlobalSearch");
        window.dispatchEvent(event);
      },
    },
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
            <Route path="/student-dashboard/*" element={<StudentDashboard />} />
            <Route path="/dashboard/*" element={<DashboardLayout />} />
          </Routes>
          <ToastContainer toasts={toasts} onRemove={removeToast} />
        </div>
      </Router>
    </UserProvider>
  );
}

export default App;
