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
      items: [
        {
          path: "/student-dashboard/exploration/career-explorer",
          label: "Career Explorer",
          icon: "🔍",
        },
      ],
    },
    {
      id: "academics",
      title: "Academic Planning",
      icon: <BookOpen className="h-5 w-5" />,
      basePath: "/student-dashboard/academics",
      items: [
        {
          path: "/student-dashboard/academics/subject-explorer",
          label: "Subject Explorer",
          icon: "📖",
        },
        {
          path: "/student-dashboard/academics/study-skills",
          label: "Study Skills Trainer",
          icon: "📝",
        },

        {
          path: "/student-dashboard/academics/test-prep",
          label: "Test Prep Strategies",
          icon: "📊",
        },
        {
          path: "/student-dashboard/academics/goal-tracker",
          label: "Academic Goal Tracker",
          icon: "✅",
        },
      ],
    },
    {
      id: "college",
      title: "College Planning",
      icon: <GraduationCap className="h-5 w-5" />,
      basePath: "/student-dashboard/college",
      items: [
        {
          path: "/student-dashboard/college/explorer",
          label: "College Explorer",
          icon: "🏫",
        },
        {
          path: "/student-dashboard/college/majors",
          label: "Major Explorer",
          icon: "🎓",
        },
      ],
    },
    {
      id: "skills",
      title: "Skill Development",
      icon: <Zap className="h-5 w-5" />,
      basePath: "/student-dashboard/skills",
      items: [
        {
          path: "/student-dashboard/skills/discovery",
          label: "Skill Discovery",
          icon: "🔍",
        },
        {
          path: "/student-dashboard/skills/tech",
          label: "Basic Tech Skills",
          icon: "💻",
        },
        {
          path: "/student-dashboard/skills/communication",
          label: "Communication Skills",
          icon: "🗣️",
        },
        {
          path: "/student-dashboard/skills/creative",
          label: "Creative Skills",
          icon: "🎨",
        },
        {
          path: "/student-dashboard/skills/analytical",
          label: "Analytical Skills",
          icon: "🧮",
        },
        {
          path: "/student-dashboard/skills/social",
          label: "Social Skills",
          icon: "👥",
        },
      ],
    },
    {
      id: "learning",
      title: "Learning Resources",
      icon: <Brain className="h-5 w-5" />,
      basePath: "/student-dashboard/learning",
      items: [
        {
          path: "/student-dashboard/learning/courses",
          label: "Online Courses",
          icon: "🎥",
        },
        {
          path: "/student-dashboard/learning/projects",
          label: "Project Ideas",
          icon: "💡",
        },

        {
          path: "/student-dashboard/learning/internship-prep",
          label: "Internship Prep",
          icon: "👔",
        },
      ],
    },
    {
      id: "planning",
      title: "Future Planning",
      icon: <Calendar className="h-5 w-5" />,
      basePath: "/student-dashboard/planning",
      items: [
        {
          path: "/student-dashboard/planning/career-path",
          label: "Career Path Planner",
          icon: "🗺️",
        },
        {
          path: "/student-dashboard/planning/goals",
          label: "Goal Setting",
          icon: "🎯",
        },
      ],
    },
  
    {
      id: "resources",
      title: "Resources",
      icon: <Library className="h-5 w-5" />,
      basePath: "/student-dashboard/resources",
      items: [
        {
          path: "/student-dashboard/resources/career-library",
          label: "Career Library",
          icon: "📚",
        },
        {
          path: "/student-dashboard/resources/study",
          label: "Study Resources",
          icon: "📖",
        },
        {
          path: "/student-dashboard/resources/financial",
          label: "Financial Literacy",
          icon: "💰",
        },
        {
          path: "/student-dashboard/resources/digital",
          label: "Digital Citizenship",
          icon: "🌐",
        },
        {
          path: "/student-dashboard/resources/college",
          label: "College Resource Center",
          icon: "🏛️",
        },
      ],
    },
,
  ];

  return (
    <div className="w-64 bg-white shadow-lg h-full flex flex-col">
      {/* Header */}
      <div className="p-6 border-b border-gray-200">
        <Link to="/" className="flex items-center space-x-2">
          <Briefcase className="h-8 w-8 text-primary-600" />
          <span className="text-xl font-bold text-gray-900">
            Career<span className="text-primary-600">Wise</span>
          </span>
        </Link>
        <p className="text-sm text-gray-600 mt-2">Student Dashboard</p>
      </div>

      {/* Navigation */}
      <div className="flex-1 overflow-y-auto py-4">
        {/* Dashboard Home */}
        <Link
          to="/student-dashboard"
          className={`flex items-center px-6 py-3 text-sm font-medium transition-colors ${
            isActive("/student-dashboard")
              ? "text-primary-600 bg-primary-50 border-r-2 border-primary-600"
              : "text-gray-700 hover:text-gray-900 hover:bg-gray-50"
          }`}
        >
          <Home className="h-5 w-5 mr-3" />
          Dashboard Home
        </Link>

        {/* Menu Sections */}
        {menuSections.map((section) => (
          <div key={section.id} className="mb-2">
            <button
              onClick={() => toggleSection(section.id)}
              className={`w-full flex items-center justify-between px-6 py-3 text-sm font-medium transition-colors ${
                isSectionActive(section.basePath)
                  ? "text-primary-600 bg-primary-50"
                  : "text-gray-700 hover:text-gray-900 hover:bg-gray-50"
              }`}
            >
              <div className="flex items-center">
                {section.icon}
                <span className="ml-3">{section.title}</span>
              </div>
              {expandedSections.includes(section.id) ? (
                <ChevronDown className="h-4 w-4" />
              ) : (
                <ChevronRight className="h-4 w-4" />
              )}
            </button>

            {expandedSections.includes(section.id) && (
              <div className="bg-gray-50">
                {section.items.map((item) => (
                  <Link
                    key={item.path}
                    to={item.path}
                    className={`flex items-center px-12 py-2 text-sm transition-colors ${
                      isActive(item.path)
                        ? "text-primary-600 bg-primary-100 border-r-2 border-primary-600"
                        : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
                    }`}
                  >
                    <span className="mr-3">{item.icon}</span>
                    {item.label}
                  </Link>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* User Profile Section */}
      <div className="border-t border-gray-200 p-4">
        <div className="flex items-center space-x-3 mb-3">
          <div className="w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center">
            <User className="h-4 w-4 text-primary-600" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-gray-900 truncate">
              Demo Student
            </p>
            <p className="text-xs text-gray-500 truncate">High School Senior</p>
          </div>
        </div>

        <div className="flex space-x-2">
          <button className="flex-1 flex items-center justify-center px-3 py-2 text-xs text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-md transition-colors">
            <Settings className="h-4 w-4 mr-1" />
            Settings
          </button>
          <Link
            to="/"
            className="flex-1 flex items-center justify-center px-3 py-2 text-xs text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-md transition-colors"
          >
            <LogOut className="h-4 w-4 mr-1" />
            Sign Out
          </Link>
        </div>
      </div>
    </div>
  );
};

export default StudentSidebar;
