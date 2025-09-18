import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  Home,
  Compass,
  BookOpen,
  GraduationCap,
  Zap,
  Target,
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
    "explore",
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
      id: "explore",
      title: "Explore & Discover",
      icon: <Compass className="h-5 w-5" />,
      basePath: "/student-dashboard/exploration",
      description: "Career exploration and discovery tools",
      items: [
        {
          path: "/student-dashboard/college/explorer",
          label: "College Explorer",
          icon: "🏫",
          description: "Find colleges that fit your goals"
        },
        {
          path: "/student-dashboard/college/majors",
          label: "Major Explorer",
          icon: "🎓",
          description: "Explore academic majors and career outcomes"
        },
      ],
    },
    {
      id: "learn",
      title: "Learn & Develop",
      icon: <Zap className="h-5 w-5" />,
      basePath: "/student-dashboard/skills",
      description: "Skill development and learning resources",
      items: [
        {
          path: "/student-dashboard/skills/tech",
          label: "Tech Skills",
          icon: "💻",
          description: "Build essential digital literacy skills"
        },
        {
          path: "/student-dashboard/skills/soft",
          label: "Soft Skills",
          icon: "🤝",
          description: "Develop interpersonal and communication skills"
        },
        {
          path: "/student-dashboard/skills/creative",
          label: "Creative Skills",
          icon: "🎨",
          description: "Develop artistic abilities and creative expression"
        },
        {
          path: "/student-dashboard/learning/courses",
          label: "Online Courses",
          icon: "🎥",
          description: "High-quality online courses to supplement education"
        },
        {
          path: "/student-dashboard/learning/projects",
          label: "Project Ideas",
          icon: "💡",
          description: "Creative projects to build skills and portfolio"
        },
      ],
    },
    {
      id: "succeed",
      title: "Study & Succeed",
      icon: <BookOpen className="h-5 w-5" />,
      basePath: "/student-dashboard/academics",
      description: "Academic success and study tools",
      items: [
        {
          path: "/student-dashboard/academics/study-resources",
          label: "Study Resources",
          icon: "📖",
          description: "Tools and materials to enhance learning"
        },
        {
          path: "/student-dashboard/academics/study-skills",
          label: "Study Skills Trainer",
          icon: "📝",
          badge: "New",
          description: "Master effective study techniques"
        },
        {
          path: "/student-dashboard/academics/test-prep",
          label: "Test Prep Strategies",
          icon: "📊",
          description: "Prepare for standardized tests"
        },
        {
          path: "/student-dashboard/planning/goals",
          label: "Goal Setting",
          icon: "🎯",
          description: "Set and track your objectives"
        },
      ],
    },
    {
      id: "prepare",
      title: "Prepare for Future",
      icon: <Target className="h-5 w-5" />,
      basePath: "/student-dashboard/learning",
      description: "Future preparation and career readiness",
      items: [
        {
          path: "/student-dashboard/learning/interview-prep",
          label: "Interview Preparation",
          icon: "🎤",
          description: "AI-powered interview practice and coaching"
        },
        {
          path: "/student-dashboard/planning/career-path",
          label: "Career Path Planner",
          icon: "🗺️",
          description: "Plan your educational and career journey"
        },
      ],
    },
    {
      id: "resources",
      title: "Resources",
      icon: <Library className="h-5 w-5" />,
      basePath: "/student-dashboard/resources",
      description: "Document management and resources",
      items: [],
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

        {/* AI Chat */}
        <Link
          to="/chat"
          className="flex items-center px-6 py-3 text-sm font-medium transition-all duration-300 group relative text-gray-700 hover:text-primary-600 hover:bg-gray-50"
        >
          <div className="w-5 h-5 mr-3 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
            <span className="text-white text-xs">AI</span>
          </div>
          AI Career Chat
          <div className="w-2 h-2 bg-green-500 rounded-full ml-auto animate-pulse"></div>
        </Link>

        {/* Menu Sections */}
        {menuSections.map((section) => (
          <div key={section.id} className="mb-2">
            {/* Handle Resources as a direct button */}
            {section.id === "resources" ? (
              <Link
                to="/student-dashboard/resources/document-manager"
                className={`w-full flex items-center px-6 py-4 text-sm font-medium transition-all duration-300 group hover:bg-gray-50 ${
                  location.pathname.startsWith("/student-dashboard/resources")
                    ? "text-primary-600 bg-gradient-to-r from-primary-50 to-transparent border-r-2 border-primary-600"
                    : "text-gray-700 hover:text-primary-600"
                }`}
              >
                <div className="mr-3 group-hover:scale-110 transition-transform duration-300">
                  {section.icon}
                </div>
                <div className="text-left">
                  <div className="font-semibold">{section.title}</div>
                  <div className="text-xs text-gray-500 font-normal">
                    {section.description}
                  </div>
                </div>
                {location.pathname.startsWith("/student-dashboard/resources") && (
                  <div className="absolute right-0 top-1/2 transform -translate-y-1/2 w-1 h-8 bg-primary-600 rounded-l-full"></div>
                )}
              </Link>
            ) : (
            <button
              onClick={() => toggleSection(section.id)}
              className={`w-full flex items-center justify-between px-6 py-4 text-sm font-medium transition-all duration-300 group hover:bg-gray-50 ${
                isSectionActive(section.basePath)
                  ? "text-primary-600 bg-gradient-to-r from-primary-50 to-transparent"
                  : "text-gray-700 hover:text-primary-600"
              }`}
            >
              <div className="flex items-center">
                <div className="mr-3 group-hover:scale-110 transition-transform duration-300">
                  {section.icon}
                </div>
                <div className="text-left">
                  <div className="font-semibold">{section.title}</div>
                  <div className="text-xs text-gray-500 font-normal">
                    {section.description}
                  </div>
                </div>
              </div>
              <div className="transition-transform duration-300 ml-2">
                {expandedSections.includes(section.id) ? (
                  <ChevronDown className="h-4 w-4" />
                ) : (
                  <ChevronRight className="h-4 w-4" />
                )}
              </div>
            </button>
            )}

            {expandedSections.includes(section.id) && (
              <div className="bg-gradient-to-r from-gray-50 to-transparent">
                {section.items.map((item) => (
                  <Link
                    key={item.path}
                    to={item.path}
                    className={`flex items-start px-12 py-3 text-sm transition-all duration-300 group relative hover:bg-gray-100 ${
                      isActive(item.path)
                        ? "text-primary-600 bg-gradient-to-r from-primary-100 to-transparent border-r-2 border-primary-600 font-medium"
                        : "text-gray-600 hover:text-primary-600"
                    }`}
                  >
                    <span className="mr-3 text-base group-hover:scale-110 transition-transform duration-300 flex-shrink-0 mt-0.5">
                      {item.icon}
                    </span>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center">
                        <span className="font-medium">{item.label}</span>
                        {item.badge && (
                          <span className={`ml-2 px-2 py-0.5 text-xs rounded-full font-medium ${
                            item.badge === "New" 
                              ? "bg-green-100 text-green-700" 
                              : "bg-blue-100 text-blue-700"
                          }`}>
                            {item.badge}
                          </span>
                        )}
                      </div>
                      <div className="text-xs text-gray-500 mt-0.5 leading-tight">
                        {item.description}
                      </div>
                    </div>
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