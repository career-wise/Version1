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
  ChevronDown,
  ChevronRight,
  User,
  Settings,
  LogOut,
  Briefcase,
  Star,
  Bell,
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
          badge: "Popular",
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
          badge: "New",
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
  ];

  return (
    <div className="w-64 bg-white shadow-xl h-full flex flex-col border-r border-gray-100">
      {/* Header */}
      <div className="p-6 border-b border-gray-100 bg-gradient-to-r from-primary-50 to-secondary-50">
        <Link to="/" className="flex items-center space-x-3 group">
          <div className="w-10 h-10 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg">
            <Briefcase className="h-6 w-6 text-white" />
          </div>
          <div>
            <span className="text-xl font-bold text-gray-900 group-hover:text-primary-600 transition-colors duration-300">
              Careerist
            </span>
            <p className="text-sm text-gray-600 -mt-1">Student Dashboard</p>
          </div>
        </Link>
      </div>

      {/* Navigation */}
      <div className="flex-1 overflow-y-auto py-4 custom-scrollbar">
        {/* Dashboard Home */}
        <Link
          to="/student-dashboard"
          className={`flex items-center px-6 py-3 text-sm font-medium transition-all duration-300 group relative ${
            isActive("/student-dashboard")
              ? "text-primary-600 bg-gradient-to-r from-primary-50 to-transparent border-r-2 border-primary-600"
              : "text-gray-700 hover:text-primary-600 hover:bg-gray-50"
          }`}
        >
          <Home className="h-5 w-5 mr-3 group-hover:scale-110 transition-transform duration-300" />
          Dashboard Home
          {isActive("/student-dashboard") && (
            <div className="absolute right-0 top-1/2 transform -translate-y-1/2 w-1 h-8 bg-primary-600 rounded-l-full"></div>
          )}
        </Link>

        {/* Menu Sections */}
        {menuSections.map((section) => (
          <div key={section.id} className="mb-2">
            <button
              onClick={() => toggleSection(section.id)}
              className={`w-full flex items-center justify-between px-6 py-3 text-sm font-medium transition-all duration-300 group ${
                isSectionActive(section.basePath)
                  ? "text-primary-600 bg-gradient-to-r from-primary-50 to-transparent"
                  : "text-gray-700 hover:text-primary-600 hover:bg-gray-50"
              }`}
            >
              <div className="flex items-center">
                <div className="mr-3 group-hover:scale-110 transition-transform duration-300">
                  {section.icon}
                </div>
                <span>{section.title}</span>
              </div>
              <div className="transition-transform duration-300">
                {expandedSections.includes(section.id) ? (
                  <ChevronDown className="h-4 w-4" />
                ) : (
                  <ChevronRight className="h-4 w-4" />
                )}
              </div>
            </button>

            {expandedSections.includes(section.id) && (
              <div className="bg-gradient-to-r from-gray-50 to-transparent">
                {section.items.map((item) => (
                  <Link
                    key={item.path}
                    to={item.path}
                    className={`flex items-center px-12 py-2.5 text-sm transition-all duration-300 group relative ${
                      isActive(item.path)
                        ? "text-primary-600 bg-gradient-to-r from-primary-100 to-transparent border-r-2 border-primary-600 font-medium"
                        : "text-gray-600 hover:text-primary-600 hover:bg-gray-100"
                    }`}
                  >
                    <span className="mr-3 text-base group-hover:scale-110 transition-transform duration-300">
                      {item.icon}
                    </span>
                    <span className="flex-1">{item.label}</span>
                    {item.badge && (
                      <span className={`px-2 py-0.5 text-xs rounded-full font-medium ${
                        item.badge === "New" 
                          ? "bg-green-100 text-green-700" 
                          : "bg-blue-100 text-blue-700"
                      }`}>
                        {item.badge}
                      </span>
                    )}
                    {isActive(item.path) && (
                      <div className="absolute right-0 top-1/2 transform -translate-y-1/2 w-1 h-6 bg-primary-600 rounded-l-full"></div>
                    )}
                  </Link>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* User Profile Section */}
      <div className="border-t border-gray-100 p-4 bg-gradient-to-r from-gray-50 to-white">
        <div className="flex items-center space-x-3 mb-4 p-3 bg-white rounded-xl shadow-sm border border-gray-100">
          <div className="w-10 h-10 bg-gradient-to-br from-primary-100 to-secondary-100 rounded-xl flex items-center justify-center">
            <User className="h-5 w-5 text-primary-600" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-semibold text-gray-900 truncate">
              Demo Student
            </p>
            <p className="text-xs text-gray-500 truncate">High School Senior</p>
            <div className="flex items-center mt-1">
              <Star className="h-3 w-3 text-yellow-500 mr-1" />
              <span className="text-xs text-gray-500">Level 3</span>
            </div>
          </div>
          <Bell className="h-4 w-4 text-gray-400 hover:text-primary-600 cursor-pointer transition-colors duration-300" />
        </div>

        <div className="grid grid-cols-2 gap-2">
          <button className="flex items-center justify-center px-3 py-2 text-xs text-gray-600 hover:text-primary-600 hover:bg-white rounded-lg transition-all duration-300 group">
            <Settings className="h-4 w-4 mr-1 group-hover:rotate-90 transition-transform duration-300" />
            Settings
          </button>
          <Link
            to="/"
            className="flex items-center justify-center px-3 py-2 text-xs text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all duration-300 group"
          >
            <LogOut className="h-4 w-4 mr-1 group-hover:translate-x-1 transition-transform duration-300" />
            Sign Out
          </Link>
        </div>
      </div>
    </div>
  );
};

export default StudentSidebar;