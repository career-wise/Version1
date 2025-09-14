import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  Home,
  Compass,
  BookOpen,
  GraduationCap,
  Zap,
  Brain,
  Calendar,
  Users,
  Library,
  Wrench,
  ChevronDown,
  ChevronRight,
  User,
  Settings,
  LogOut,
  Briefcase,
  Award,
  TrendingUp,
  Sparkles,
} from "lucide-react";

const StudentSidebar: React.FC = () => {
  const location = useLocation();
  const [expandedSections, setExpandedSections] = useState<string[]>([
    "exploration",
  ]);

  const toggleSection = (section: string) => {
    setExpandedSections((prev) =>
      prev.includes(section)
        ? prev.filter((s) => s !== section)
        : [...prev, section]
    );
  };

  const isActive = (path: string) => location.pathname === path;
  const isSectionActive = (basePath: string) =>
    location.pathname.startsWith(basePath);

  const menuSections = [
    {
      id: "exploration",
      title: "Career Exploration",
      icon: <Compass className="h-5 w-5" />,
      basePath: "/student-dashboard/exploration",
      color: "text-blue-600",
      bgColor: "bg-blue-50 hover:bg-blue-100",
      items: [
        {
          path: "/student-dashboard/exploration/career-explorer",
          label: "Career Explorer",
          icon: <TrendingUp className="h-4 w-4 text-blue-600" />,
          description: "Discover new career paths",
        },
      ],
    },
    {
      id: "academics",
      title: "Academic Planning",
      icon: <BookOpen className="h-5 w-5" />,
      basePath: "/student-dashboard/academics",
      color: "text-green-600",
      bgColor: "bg-green-50 hover:bg-green-100",
      items: [
        {
          path: "/student-dashboard/academics/subject-explorer",
          label: "Subject Explorer",
          icon: <BookOpen className="h-4 w-4 text-green-600" />,
          description: "Explore academic subjects",
        },
        {
          path: "/student-dashboard/academics/study-skills",
          label: "Study Skills Trainer",
          icon: <Brain className="h-4 w-4 text-green-600" />,
          description: "Improve study techniques",
        },
        {
          path: "/student-dashboard/academics/test-prep",
          label: "Test Prep Strategies",
          icon: <Award className="h-4 w-4 text-green-600" />,
          description: "Ace your exams",
        },
        {
          path: "/student-dashboard/academics/goal-tracker",
          label: "Academic Goal Tracker",
          icon: <Zap className="h-4 w-4 text-green-600" />,
          description: "Track your progress",
        },
      ],
    },
    {
      id: "college",
      title: "College Planning",
      icon: <GraduationCap className="h-5 w-5" />,
      basePath: "/student-dashboard/college",
      color: "text-purple-600",
      bgColor: "bg-purple-50 hover:bg-purple-100",
      items: [
        {
          path: "/student-dashboard/college/explorer",
          label: "College Explorer",
          icon: <GraduationCap className="h-4 w-4 text-purple-600" />,
          description: "Find your ideal college",
        },
        {
          path: "/student-dashboard/college/majors",
          label: "Major Explorer",
          icon: <Sparkles className="h-4 w-4 text-purple-600" />,
          description: "Discover academic majors",
        },
      ],
    },
    {
      id: "skills",
      title: "Skill Development",
      icon: <Zap className="h-5 w-5" />,
      basePath: "/student-dashboard/skills",
      color: "text-orange-600",
      bgColor: "bg-orange-50 hover:bg-orange-100",
      items: [
        {
          path: "/student-dashboard/skills/discovery",
          label: "Skill Discovery",
          icon: <Compass className="h-4 w-4 text-orange-600" />,
          description: "Find your strengths",
        },
        {
          path: "/student-dashboard/skills/tech",
          label: "Basic Tech Skills",
          icon: <Wrench className="h-4 w-4 text-orange-600" />,
          description: "Learn essential tech",
        },
        {
          path: "/student-dashboard/skills/communication",
          label: "Communication Skills",
          icon: <Users className="h-4 w-4 text-orange-600" />,
          description: "Improve communication",
        },
        {
          path: "/student-dashboard/skills/creative",
          label: "Creative Skills",
          icon: <Sparkles className="h-4 w-4 text-orange-600" />,
          description: "Unleash creativity",
        },
        {
          path: "/student-dashboard/skills/analytical",
          label: "Analytical Skills",
          icon: <TrendingUp className="h-4 w-4 text-orange-600" />,
          description: "Think analytically",
        },
        {
          path: "/student-dashboard/skills/social",
          label: "Social Skills",
          icon: <Users className="h-4 w-4 text-orange-600" />,
          description: "Build relationships",
        },
      ],
    },
    {
      id: "learning",
      title: "Learning Resources",
      icon: <Brain className="h-5 w-5" />,
      basePath: "/student-dashboard/learning",
      color: "text-indigo-600",
      bgColor: "bg-indigo-50 hover:bg-indigo-100",
      items: [
        {
          path: "/student-dashboard/learning/courses",
          label: "Online Courses",
          icon: <BookOpen className="h-4 w-4 text-indigo-600" />,
          description: "Expand your knowledge",
        },
        {
          path: "/student-dashboard/learning/projects",
          label: "Project Ideas",
          icon: <Sparkles className="h-4 w-4 text-indigo-600" />,
          description: "Build your portfolio",
        },
        {
          path: "/student-dashboard/learning/internship-prep",
          label: "Internship Prep",
          icon: <Award className="h-4 w-4 text-indigo-600" />,
          description: "Get internship ready",
        },
      ],
    },
    {
      id: "planning",
      title: "Future Planning",
      icon: <Calendar className="h-5 w-5" />,
      basePath: "/student-dashboard/planning",
      color: "text-pink-600",
      bgColor: "bg-pink-50 hover:bg-pink-100",
      items: [
        {
          path: "/student-dashboard/planning/career-path",
          label: "Career Path Planner",
          icon: <TrendingUp className="h-4 w-4 text-pink-600" />,
          description: "Plan your journey",
        },
        {
          path: "/student-dashboard/planning/goals",
          label: "Goal Setting",
          icon: <Zap className="h-4 w-4 text-pink-600" />,
          description: "Set and achieve goals",
        },
      ],
    },
    {
      id: "resources",
      title: "Resources",
      icon: <Library className="h-5 w-5" />,
      basePath: "/student-dashboard/resources",
      color: "text-teal-600",
      bgColor: "bg-teal-50 hover:bg-teal-100",
      items: [
        {
          path: "/student-dashboard/resources/career-library",
          label: "Career Library",
          icon: <Library className="h-4 w-4 text-teal-600" />,
          description: "Research careers",
        },
        {
          path: "/student-dashboard/resources/study",
          label: "Study Resources",
          icon: <BookOpen className="h-4 w-4 text-teal-600" />,
          description: "Study materials",
        },
        {
          path: "/student-dashboard/resources/financial",
          label: "Financial Literacy",
          icon: <TrendingUp className="h-4 w-4 text-teal-600" />,
          description: "Manage your finances",
        },
        {
          path: "/student-dashboard/resources/digital",
          label: "Digital Citizenship",
          icon: <Sparkles className="h-4 w-4 text-teal-600" />,
          description: "Online safety tips",
        },
        {
          path: "/student-dashboard/resources/college",
          label: "College Resource Center",
          icon: <GraduationCap className="h-4 w-4 text-teal-600" />,
          description: "College planning help",
        },
      ],
    },
  ];

  return (
    <div className="w-72 bg-gradient-to-b from-white to-gray-50/50 shadow-xl h-full flex flex-col border-r border-gray-100">
      {/* Enhanced Header */}
      <div className="p-8 border-b border-gray-100">
        <Link to="/" className="flex items-center space-x-3 group">
          <div className="w-12 h-12 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-all duration-300">
            <Briefcase className="h-7 w-7 text-white" />
          </div>
          <div>
            <span className="text-2xl font-extrabold text-gray-900 group-hover:text-primary-600 transition-colors">
              Career<span className="text-primary-600">Wise</span>
            </span>
            <p className="text-sm text-gray-500 font-semibold">Student Dashboard</p>
          </div>
        </Link>
      </div>

      {/* Enhanced Navigation */}
      <div className="flex-1 overflow-y-auto py-6 px-4">
        {/* Enhanced Dashboard Home */}
        <Link
          to="/student-dashboard"
          className={`flex items-center px-6 py-4 text-base font-bold transition-all duration-300 rounded-2xl mb-4 group ${
            isActive("/student-dashboard")
              ? "text-primary-600 bg-gradient-to-r from-primary-50 to-primary-100 border-r-4 border-primary-600 shadow-lg"
              : "text-gray-700 hover:text-primary-600 hover:bg-gradient-to-r hover:from-gray-50 hover:to-gray-100"
          }`}
        >
          <div className={`w-10 h-10 rounded-xl flex items-center justify-center mr-4 transition-all duration-300 ${
            isActive("/student-dashboard")
              ? "bg-primary-200 scale-110"
              : "bg-gray-100 group-hover:bg-primary-100 group-hover:scale-105"
          }`}>
            <Home className="h-5 w-5" />
          </div>
          Dashboard Home
        </Link>

        {/* Enhanced Menu Sections */}
        {menuSections.map((section) => (
          <div key={section.id} className="mb-4">
            <button
              onClick={() => toggleSection(section.id)}
              className={`w-full flex items-center justify-between px-6 py-4 text-base font-bold transition-all duration-300 rounded-2xl group ${
                isSectionActive(section.basePath)
                  ? `${section.color} ${section.bgColor} shadow-lg`
                  : "text-gray-700 hover:text-gray-900 hover:bg-gradient-to-r hover:from-gray-50 hover:to-gray-100"
              }`}
            >
              <div className="flex items-center">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center mr-4 transition-all duration-300 ${
                  isSectionActive(section.basePath)
                    ? "bg-white/70 scale-110"
                    : "bg-gray-100 group-hover:bg-white/50 group-hover:scale-105"
                }`}>
                  {section.icon}
                </div>
                <span>{section.title}</span>
              </div>
              {expandedSections.includes(section.id) ? (
                <ChevronDown className="h-5 w-5 transition-transform duration-300" />
              ) : (
                <ChevronRight className="h-5 w-5 transition-transform duration-300" />
              )}
            </button>

            {expandedSections.includes(section.id) && (
              <div className="mt-2 ml-4 space-y-2">
                {section.items.map((item) => (
                  <Link
                    key={item.path}
                    to={item.path}
                    className={`flex items-center px-6 py-3 text-sm transition-all duration-300 rounded-xl group ${
                      isActive(item.path)
                        ? `${section.color} ${section.bgColor} border-r-4 ${section.color.replace('text-', 'border-')} shadow-md font-semibold`
                        : "text-gray-600 hover:text-gray-800 hover:bg-gray-50"
                    }`}
                    title={item.description}
                  >
                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center mr-3 transition-all duration-300 ${
                      isActive(item.path)
                        ? "bg-white/80 scale-110"
                        : "bg-transparent group-hover:bg-white/50 group-hover:scale-105"
                    }`}>
                      {item.icon}
                    </div>
                    <div>
                      <div className="font-medium">{item.label}</div>
                      <div className="text-xs text-gray-400 mt-0.5 group-hover:text-gray-600">{item.description}</div>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Enhanced User Profile Section */}
      <div className="border-t border-gray-100 p-6 bg-gradient-to-r from-gray-50 to-white">
        <div className="flex items-center space-x-4 mb-6">
          <div className="w-12 h-12 bg-gradient-to-br from-primary-400 to-secondary-400 rounded-2xl flex items-center justify-center shadow-lg">
            <User className="h-6 w-6 text-white" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-base font-bold text-gray-900 truncate">
              Demo Student
            </p>
            <p className="text-sm text-gray-500 font-medium truncate">High School Senior</p>
            <div className="flex items-center space-x-1 mt-1">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              <span className="text-xs text-green-600 font-semibold">Active</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <button className="flex items-center justify-center px-4 py-3 text-sm text-gray-600 hover:text-primary-600 hover:bg-primary-50 rounded-xl transition-all duration-300 group border border-gray-200 hover:border-primary-200">
            <Settings className="h-4 w-4 mr-2 group-hover:rotate-90 transition-transform duration-300" />
            Settings
          </button>
          <Link
            to="/"
            className="flex items-center justify-center px-4 py-3 text-sm text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-xl transition-all duration-300 group border border-gray-200 hover:border-red-200"
          >
            <LogOut className="h-4 w-4 mr-2 group-hover:translate-x-1 transition-transform duration-300" />
            Sign Out
          </Link>
        </div>
      </div>
    </div>
  );
};

export default StudentSidebar;
