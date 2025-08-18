// src/config/personaConfigs.ts
import { UserType } from '../contexts/UserContext';

export interface DashboardConfig {
  title: string;
  subtitle: string;
  primaryActions: Array<{
    id: string;
    label: string;
    icon: string;
    route: string;
    description: string;
    priority: 'high' | 'medium' | 'low';
  }>;
  widgets: Array<{
    id: string;
    component: string;
    size: 'small' | 'medium' | 'large';
    priority: number;
  }>;
  navigation: Array<{
    id: string;
    label: string;
    icon: string;
    route: string;
    enabled: boolean;
  }>;
  chatPrompts: string[];
  colors: {
    primary: string;
    secondary: string;
    accent: string;
  };
}

export const personaConfigs: Record<UserType, DashboardConfig> = {
  student: {
    title: "Your Academic Journey",
    subtitle: "Plan your path from classroom to career",
    primaryActions: [
      {
        id: 'college_prep',
        label: 'College Preparation',
        icon: '🎓',
        route: '/dashboard/college-prep',
        description: 'Get ready for college applications and admissions',
        priority: 'high'
      },
      {
        id: 'career_exploration',
        label: 'Explore Careers',
        icon: '🔍',
        route: '/dashboard/career-explorer',
        description: 'Discover careers that match your interests',
        priority: 'high'
      },
      {
        id: 'skill_building',
        label: 'Build Skills',
        icon: '🛠️',
        route: '/dashboard/learning',
        description: 'Develop skills for your future career',
        priority: 'medium'
      },
      {
        id: 'scholarship_search',
        label: 'Find Scholarships',
        icon: '💰',
        route: '/dashboard/scholarships',
        description: 'Discover funding opportunities',
        priority: 'medium'
      }
    ],
    widgets: [
      { id: 'college_deadlines', component: 'CollegeDeadlines', size: 'medium', priority: 1 },
      { id: 'study_progress', component: 'StudyProgress', size: 'small', priority: 2 },
      { id: 'career_quiz', component: 'CareerQuiz', size: 'medium', priority: 3 },
      { id: 'extracurricular_tracker', component: 'ExtracurricularTracker', size: 'small', priority: 4 }
    ],
    navigation: [
      { id: 'dashboard', label: 'Dashboard', icon: '📊', route: '/dashboard', enabled: true },
      { id: 'career_explorer', label: 'Career Explorer', icon: '🗺️', route: '/dashboard/career-explorer', enabled: true },
      { id: 'college_prep', label: 'College Prep', icon: '🎓', route: '/dashboard/college-prep', enabled: true },
      { id: 'skill_building', label: 'Skill Building', icon: '🧠', route: '/dashboard/learning', enabled: true },
      { id: 'scholarships', label: 'Scholarships', icon: '💰', route: '/dashboard/scholarships', enabled: true },
      { id: 'resume', label: 'Resume Builder', icon: '📄', route: '/dashboard/resume', enabled: false },
      { id: 'interview', label: 'Interview Prep', icon: '🗣️', route: '/dashboard/interview', enabled: false },
      { id: 'goals', label: 'Academic Goals', icon: '🎯', route: '/dashboard/goals', enabled: true },
      { id: 'analytics', label: 'Progress', icon: '📈', route: '/dashboard/analytics', enabled: true }
    ],
    chatPrompts: [
      "What careers match my interests in science and technology?",
      "How do I prepare for college applications?",
      "What skills should I develop in high school?",
      "Help me find scholarships for my intended major",
      "What extracurriculars will strengthen my college application?"
    ],
    colors: {
      primary: '#3B82F6', // Blue - academic, trustworthy
      secondary: '#8B5CF6', // Purple - creative, aspirational
      accent: '#10B981' // Green - growth, potential
    }
  },

  graduate: {
    title: "Launch Your Career",
    subtitle: "Transform your education into professional success",
    primaryActions: [
      {
        id: 'job_search',
        label: 'Job Search Strategy',
        icon: '🔍',
        route: '/dashboard/job-search',
        description: 'Find and apply to your first professional role',
        priority: 'high'
      },
      {
        id: 'resume_optimization',
        label: 'Optimize Resume',
        icon: '📝',
        route: '/dashboard/resume',
        description: 'Create an ATS-friendly resume that gets noticed',
        priority: 'high'
      },
      {
        id: 'interview_mastery',
        label: 'Master Interviews',
        icon: '🎤',
        route: '/dashboard/interview',
        description: 'Practice and perfect your interview skills',
        priority: 'high'
      },
      {
        id: 'networking',
        label: 'Build Network',
        icon: '🤝',
        route: '/dashboard/networking',
        description: 'Connect with professionals in your field',
        priority: 'medium'
      }
    ],
    widgets: [
      { id: 'job_applications', component: 'JobApplicationTracker', size: 'large', priority: 1 },
      { id: 'interview_calendar', component: 'InterviewCalendar', size: 'medium', priority: 2 },
      { id: 'skill_gaps', component: 'SkillGapAnalysis', size: 'medium', priority: 3 },
      { id: 'salary_insights', component: 'SalaryInsights', size: 'small', priority: 4 }
    ],
    navigation: [
      { id: 'dashboard', label: 'Dashboard', icon: '📊', route: '/dashboard', enabled: true },
      { id: 'job_search', label: 'Job Search', icon: '🔍', route: '/dashboard/job-search', enabled: true },
      { id: 'resume', label: 'Resume Builder', icon: '📄', route: '/dashboard/resume', enabled: true },
      { id: 'interview', label: 'Interview Prep', icon: '🗣️', route: '/dashboard/interview', enabled: true },
      { id: 'networking', label: 'Networking', icon: '🤝', route: '/dashboard/networking', enabled: true },
      { id: 'learning', label: 'Skill Development', icon: '🧠', route: '/dashboard/learning', enabled: true },
      { id: 'goals', label: 'Career Goals', icon: '🎯', route: '/dashboard/goals', enabled: true },
      { id: 'analytics', label: 'Progress', icon: '📈', route: '/dashboard/analytics', enabled: true }
    ],
    chatPrompts: [
      "How do I transition from student to professional?",
      "What should I include in my first professional resume?",
      "How do I prepare for technical interviews?",
      "What's a reasonable salary expectation for my field?",
      "How do I build a professional network from scratch?"
    ],
    colors: {
      primary: '#059669', // Green - growth, new beginnings
      secondary: '#DC2626', // Red - energy, action
      accent: '#7C3AED' // Purple - ambition, transformation
    }
  },

  professional: {
    title: "Advance Your Career",
    subtitle: "Strategic growth and leadership development",
    primaryActions: [
      {
        id: 'career_advancement',
        label: 'Career Advancement',
        icon: '📈',
        route: '/dashboard/advancement',
        description: 'Plan your next promotion or role transition',
        priority: 'high'
      },
      {
        id: 'skill_development',
        label: 'Upskill & Reskill',
        icon: '🧠',
        route: '/dashboard/learning',
        description: 'Stay competitive with cutting-edge skills',
        priority: 'high'
      },
      {
        id: 'leadership_growth',
        label: 'Leadership Development',
        icon: '👑',
        route: '/dashboard/leadership',
        description: 'Prepare for management and leadership roles',
        priority: 'medium'
      },
      {
        id: 'salary_negotiation',
        label: 'Salary Optimization',
        icon: '💰',
        route: '/dashboard/compensation',
        description: 'Maximize your earning potential',
        priority: 'medium'
      }
    ],
    widgets: [
      { id: 'performance_metrics', component: 'PerformanceMetrics', size: 'large', priority: 1 },
      { id: 'skill_trends', component: 'SkillTrends', size: 'medium', priority: 2 },
      { id: 'promotion_tracker', component: 'PromotionTracker', size: 'medium', priority: 3 },
      { id: 'market_insights', component: 'MarketInsights', size: 'small', priority: 4 }
    ],
    navigation: [
      { id: 'dashboard', label: 'Dashboard', icon: '📊', route: '/dashboard', enabled: true },
      { id: 'advancement', label: 'Career Advancement', icon: '📈', route: '/dashboard/advancement', enabled: true },
      { id: 'learning', label: 'Professional Development', icon: '🧠', route: '/dashboard/learning', enabled: true },
      { id: 'leadership', label: 'Leadership', icon: '👑', route: '/dashboard/leadership', enabled: true },
      { id: 'compensation', label: 'Compensation', icon: '💰', route: '/dashboard/compensation', enabled: true },
      { id: 'resume', label: 'Executive Resume', icon: '📄', route: '/dashboard/resume', enabled: true },
      { id: 'interview', label: 'Executive Interview', icon: '🗣️', route: '/dashboard/interview', enabled: true },
      { id: 'goals', label: 'Strategic Goals', icon: '🎯', route: '/dashboard/goals', enabled: true },
      { id: 'analytics', label: 'Performance Analytics', icon: '📈', route: '/dashboard/analytics', enabled: true }
    ],
    chatPrompts: [
      "How do I transition to a leadership role?",
      "What skills are most valuable for career advancement?",
      "How do I negotiate a better compensation package?",
      "Should I consider changing companies or industries?",
      "How do I build executive presence and influence?"
    ],
    colors: {
      primary: '#1F2937', // Dark Gray - professional, authoritative
      secondary: '#F59E0B', // Amber - success, achievement
      accent: '#EF4444' // Red - power, confidence
    }
  },

  entrepreneur: {
    title: "Build Your Venture",
    subtitle: "From idea to successful business",
    primaryActions: [
      {
        id: 'business_validation',
        label: 'Validate Business Idea',
        icon: '🔬',
        route: '/dashboard/validation',
        description: 'Test and refine your business concept',
        priority: 'high'
      },
      {
        id: 'business_plan',
        label: 'Business Planning',
        icon: '📋',
        route: '/dashboard/business-plan',
        description: 'Create a comprehensive business strategy',
        priority: 'high'
      },
      {
        id: 'funding_strategy',
        label: 'Secure Funding',
        icon: '💸',
        route: '/dashboard/funding',
        description: 'Explore investment and funding options',
        priority: 'medium'
      },
      {
        id: 'team_building',
        label: 'Build Your Team',
        icon: '👥',
        route: '/dashboard/team',
        description: 'Recruit and manage your founding team',
        priority: 'medium'
      }
    ],
    widgets: [
      { id: 'startup_metrics', component: 'StartupMetrics', size: 'large', priority: 1 },
      { id: 'funding_tracker', component: 'FundingTracker', size: 'medium', priority: 2 },
      { id: 'market_analysis', component: 'MarketAnalysis', size: 'medium', priority: 3 },
      { id: 'competitor_watch', component: 'CompetitorWatch', size: 'small', priority: 4 }
    ],
    navigation: [
      { id: 'dashboard', label: 'Dashboard', icon: '📊', route: '/dashboard', enabled: true },
      { id: 'validation', label: 'Idea Validation', icon: '🔬', route: '/dashboard/validation', enabled: true },
      { id: 'business_plan', label: 'Business Plan', icon: '📋', route: '/dashboard/business-plan', enabled: true },
      { id: 'funding', label: 'Funding', icon: '💸', route: '/dashboard/funding', enabled: true },
      { id: 'team', label: 'Team Building', icon: '👥', route: '/dashboard/team', enabled: true },
      { id: 'learning', label: 'Entrepreneur Skills', icon: '🧠', route: '/dashboard/learning', enabled: true },
      { id: 'goals', label: 'Business Goals', icon: '🎯', route: '/dashboard/goals', enabled: true },
      { id: 'analytics', label: 'Business Analytics', icon: '📈', route: '/dashboard/analytics', enabled: true }
    ],
    chatPrompts: [
      "How do I validate my business idea?",
      "What should I include in my business plan?",
      "How do I find the right co-founder?",
      "What funding options are available for my stage?",
      "How do I build an MVP on a tight budget?"
    ],
    colors: {
      primary: '#7C2D12', // Brown - earthy, grounded
      secondary: '#EA580C', // Orange - energy, innovation
      accent: '#15803D' // Green - growth, opportunity
    }
  }
};

export const getPersonaConfig = (userType: UserType): DashboardConfig => {
  return personaConfigs[userType];
};