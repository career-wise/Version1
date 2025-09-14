import React from "react";
import { Link } from "react-router-dom";
import {
  TrendingUp,
  Target,
  BookOpen,
  Users,
  Calendar,
  Award,
  Clock,
  ArrowRight,
  Sparkles,
  Brain,
  GraduationCap,
  Zap,
  Star,
  Activity,
} from "lucide-react";
import Card from "../../shared/ui/Card";
import Button from "../../shared/ui/Button";

const StudentDashboardHome: React.FC = () => {
  const quickActions = [
    {
      title: "Take Career Assessment",
      description: "Discover careers that match your interests",
      icon: <Brain className="h-7 w-7 text-blue-600" />,
      path: "/student-dashboard/exploration/interest-assessment",
      bgGradient: "from-blue-50 to-blue-100",
      hoverGradient: "hover:from-blue-100 hover:to-blue-200",
      iconBg: "bg-gradient-to-br from-blue-100 to-blue-50",
      accentColor: "blue",
    },
    {
      title: "Explore Colleges",
      description: "Find colleges that fit your goals",
      icon: <GraduationCap className="h-7 w-7 text-purple-600" />,
      path: "/student-dashboard/college/explorer",
      bgGradient: "from-purple-50 to-purple-100",
      hoverGradient: "hover:from-purple-100 hover:to-purple-200",
      iconBg: "bg-gradient-to-br from-purple-100 to-purple-50",
      accentColor: "purple",
    },
    {
      title: "Build Study Plan",
      description: "Organize your academic schedule",
      icon: <Calendar className="h-7 w-7 text-green-600" />,
      path: "/student-dashboard/tools/study-planner",
      bgGradient: "from-green-50 to-green-100",
      hoverGradient: "hover:from-green-100 hover:to-green-200",
      iconBg: "bg-gradient-to-br from-green-100 to-green-50",
      accentColor: "green",
    },
    {
      title: "Set Goals",
      description: "Define your academic and career objectives",
      icon: <Target className="h-7 w-7 text-orange-600" />,
      path: "/student-dashboard/planning/goals",
      bgGradient: "from-orange-50 to-orange-100",
      hoverGradient: "hover:from-orange-100 hover:to-orange-200",
      iconBg: "bg-gradient-to-br from-orange-100 to-orange-50",
      accentColor: "orange",
    },
  ];

  const recentActivities = [
    {
      activity: "Completed Interest Assessment",
      time: "2 hours ago",
      icon: <Award className="h-5 w-5 text-green-600" />,
      status: "completed",
      bgColor: "bg-green-50",
    },
    {
      activity: "Explored Computer Science careers",
      time: "1 day ago",
      icon: <Brain className="h-5 w-5 text-blue-600" />,
      status: "viewed",
      bgColor: "bg-blue-50",
    },
    {
      activity: "Added 3 colleges to watchlist",
      time: "2 days ago",
      icon: <GraduationCap className="h-5 w-5 text-purple-600" />,
      status: "saved",
      bgColor: "bg-purple-50",
    },
    { 
      activity: "Set GPA goal for semester", 
      time: "3 days ago", 
      icon: <Target className="h-5 w-5 text-orange-600" />,
      status: "goal",
      bgColor: "bg-orange-50",
    },
  ];

  const upcomingTasks = [
    { 
      task: "Complete Personality Test", 
      due: "Today", 
      priority: "high",
      icon: <Brain className="h-4 w-4 text-red-600" />,
      progress: 0,
    },
    {
      task: "Research scholarship opportunities",
      due: "Tomorrow",
      priority: "medium",
      icon: <Sparkles className="h-4 w-4 text-yellow-600" />,
      progress: 30,
    },
    {
      task: "Schedule informational interview",
      due: "This week",
      priority: "medium",
      icon: <Users className="h-4 w-4 text-blue-600" />,
      progress: 60,
    },
    { 
      task: "Update study schedule", 
      due: "Next week", 
      priority: "low",
      icon: <Calendar className="h-4 w-4 text-green-600" />,
      progress: 80,
    },
  ];

  const stats = [
    {
      label: "Assessments Completed",
      value: "3/6",
      icon: <Award className="h-6 w-6 text-blue-600" />,
      bgGradient: "from-blue-50 to-blue-100",
      iconBg: "bg-gradient-to-br from-blue-100 to-blue-50",
      trend: "+1 this week",
      trendUp: true,
    },
    {
      label: "Career Paths Explored",
      value: "12",
      icon: <TrendingUp className="h-6 w-6 text-green-600" />,
      bgGradient: "from-green-50 to-green-100", 
      iconBg: "bg-gradient-to-br from-green-100 to-green-50",
      trend: "+3 this month",
      trendUp: true,
    },
    {
      label: "Study Hours This Week",
      value: "24",
      icon: <Clock className="h-6 w-6 text-purple-600" />,
      bgGradient: "from-purple-50 to-purple-100",
      iconBg: "bg-gradient-to-br from-purple-100 to-purple-50",
      trend: "2hrs daily avg",
      trendUp: true,
    },
    {
      label: "Goals Achieved",
      value: "5/8",
      icon: <Target className="h-6 w-6 text-orange-600" />,
      bgGradient: "from-orange-50 to-orange-100",
      iconBg: "bg-gradient-to-br from-orange-100 to-orange-50", 
      trend: "62% complete",
      trendUp: true,
    },
  ];

  return (
    <div className="p-8 max-w-7xl mx-auto bg-gradient-to-br from-gray-50/50 to-white min-h-screen">
      {/* Enhanced Welcome Header */}
      <div className="mb-12">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-extrabold text-gray-900 mb-3 flex items-center">
              Welcome back, Demo Student! 
              <span className="ml-3 text-3xl animate-bounce" style={{animationDelay: '0.5s'}}>👋</span>
            </h1>
            <p className="text-xl text-gray-600 leading-relaxed max-w-2xl">
              Ready to explore your future? Let's continue your career journey with new insights and opportunities.
            </p>
          </div>
          <div className="hidden lg:block">
            <div className="w-32 h-32 bg-gradient-to-br from-primary-100 via-blue-100 to-secondary-100 rounded-3xl flex items-center justify-center shadow-lg animate-pulse">
              <Activity className="h-16 w-16 text-primary-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Enhanced Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
        {stats.map((stat, index) => (
          <div 
            key={index} 
            className={`bg-gradient-to-br ${stat.bgGradient} rounded-3xl p-8 hover:scale-105 hover:shadow-xl transition-all duration-500 border border-white/50 backdrop-blur-sm group relative`}
          >
            {/* Icon with enhanced styling */}
            <div className={`w-16 h-16 ${stat.iconBg} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 group-hover:rotate-3 transition-all duration-500 shadow-lg`}>
              {stat.icon}
            </div>
            
            <div className="space-y-2">
              <div className="text-3xl font-extrabold text-gray-900 group-hover:text-gray-800 transition-colors">
                {stat.value}
              </div>
              <div className="text-gray-600 font-semibold group-hover:text-gray-700 transition-colors">
                {stat.label}
              </div>
              <div className={`text-sm ${stat.trendUp ? 'text-green-600' : 'text-red-500'} font-medium flex items-center`}>
                {stat.trendUp ? (
                  <TrendingUp className="h-4 w-4 mr-1" />
                ) : (
                  <TrendingUp className="h-4 w-4 mr-1 rotate-180" />
                )}
                {stat.trend}
              </div>
            </div>
            
            {/* Decorative accent */}
            <div className="absolute top-4 right-4 w-4 h-4 bg-white/40 rounded-full group-hover:scale-150 transition-all duration-500"></div>
            
            {/* Pulse animation ring for active stats */}
            <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-primary-200/20 to-secondary-200/20 animate-pulse opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          </div>
        ))}
      </div>

      {/* Enhanced Quick Actions */}
      <div className="mb-12">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-bold text-gray-900">
            Quick Actions
          </h2>
          <div className="flex items-center space-x-2 text-sm text-gray-500">
            <Zap className="h-4 w-4" />
            <span>Boost your progress</span>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {quickActions.map((action, index) => (
            <Link key={index} to={action.path}>
              <div
                className={`bg-gradient-to-br ${action.bgGradient} ${action.hoverGradient} rounded-3xl p-8 transition-all duration-500 hover:scale-105 hover:shadow-xl border border-white/50 group relative backdrop-blur-sm`}
              >
                {/* Enhanced Icon */}
                <div className={`w-16 h-16 ${action.iconBg} rounded-2xl flex items-center justify-center mb-6 shadow-lg group-hover:scale-110 group-hover:rotate-3 transition-all duration-500`}>
                  {action.icon}
                </div>
                
                <div className="flex items-start justify-between mb-4">
                  <h3 className="font-bold text-gray-900 text-lg group-hover:text-gray-800 transition-colors leading-tight">
                    {action.title}
                  </h3>
                  <ArrowRight className="h-5 w-5 text-gray-400 group-hover:text-gray-600 group-hover:translate-x-1 transition-all flex-shrink-0 ml-2" />
                </div>
                
                <p className="text-gray-600 group-hover:text-gray-700 transition-colors leading-relaxed">
                  {action.description}
                </p>
                
                {/* Decorative elements */}
                <div className="absolute top-4 right-4 w-3 h-3 bg-white/40 rounded-full group-hover:scale-150 transition-all duration-500"></div>
                <div className="absolute bottom-4 left-4 w-2 h-2 bg-white/30 rounded-full group-hover:bg-white/50 transition-all duration-500"></div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Enhanced Recent Activity */}
        <div className="bg-white rounded-3xl shadow-sm border border-gray-100/50 p-8 hover:shadow-lg transition-all duration-300">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold text-gray-900 flex items-center">
              <Activity className="h-6 w-6 text-primary-600 mr-3" />
              Recent Activity
            </h2>
            <Button variant="ghost" size="sm" className="hover:bg-primary-50">
              View All
            </Button>
          </div>
          <div className="space-y-4">
            {recentActivities.map((item, index) => (
              <div
                key={index}
                className={`flex items-center space-x-4 p-4 ${item.bgColor} rounded-2xl hover:scale-105 transition-all duration-300 group`}
              >
                <div className="w-12 h-12 bg-white/80 rounded-xl flex items-center justify-center shadow-sm group-hover:scale-110 transition-all duration-300">
                  {item.icon}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-gray-900 group-hover:text-gray-800 transition-colors">
                    {item.activity}
                  </p>
                  <p className="text-sm text-gray-500 font-medium">{item.time}</p>
                </div>
                <div className={`px-3 py-1 rounded-full text-xs font-medium ${
                  item.status === 'completed' ? 'bg-green-100 text-green-800' :
                  item.status === 'viewed' ? 'bg-blue-100 text-blue-800' :
                  item.status === 'saved' ? 'bg-purple-100 text-purple-800' :
                  'bg-orange-100 text-orange-800'
                }`}>
                  {item.status}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Enhanced Upcoming Tasks */}
        <div className="bg-white rounded-3xl shadow-sm border border-gray-100/50 p-8 hover:shadow-lg transition-all duration-300">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold text-gray-900 flex items-center">
              <Target className="h-6 w-6 text-orange-600 mr-3" />
              Upcoming Tasks
            </h2>
            <Button variant="ghost" size="sm" className="hover:bg-orange-50">
              Manage
            </Button>
          </div>
          <div className="space-y-4">
            {upcomingTasks.map((task, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-4 bg-gray-50 rounded-2xl hover:bg-gray-100 hover:scale-105 transition-all duration-300 group"
              >
                <div className="flex items-center space-x-4 flex-1 min-w-0">
                  <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center shadow-sm group-hover:scale-110 transition-all duration-300">
                    {task.icon}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-gray-900 group-hover:text-gray-800 transition-colors">
                      {task.task}
                    </p>
                    <div className="flex items-center space-x-2 mt-1">
                      <p className="text-sm text-gray-500 font-medium">Due: {task.due}</p>
                      {task.progress > 0 && (
                        <div className="flex items-center space-x-2">
                          <div className="w-16 h-1.5 bg-gray-200 rounded-full overflow-hidden">
                            <div 
                              className="h-full bg-gradient-to-r from-primary-400 to-primary-600 rounded-full transition-all duration-500"
                              style={{width: `${task.progress}%`}}
                            ></div>
                          </div>
                          <span className="text-xs text-gray-400 font-medium">{task.progress}%</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <span
                    className={`px-3 py-1.5 text-xs font-bold rounded-full ${
                      task.priority === "high"
                        ? "bg-red-100 text-red-800 border border-red-200"
                        : task.priority === "medium"
                        ? "bg-yellow-100 text-yellow-800 border border-yellow-200"
                        : "bg-green-100 text-green-800 border border-green-200"
                    }`}
                  >
                    {task.priority.toUpperCase()}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Enhanced Featured Resources */}
      <div className="mt-12">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-bold text-gray-900 flex items-center">
            <Star className="h-6 w-6 text-yellow-600 mr-3" />
            Featured Resources
          </h2>
          <div className="flex items-center space-x-2 text-sm text-gray-500">
            <Sparkles className="h-4 w-4" />
            <span>Curated for you</span>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-3xl p-8 hover:shadow-xl hover:scale-105 transition-all duration-500 border border-white/50 group relative">
            <div className="w-16 h-16 bg-gradient-to-br from-blue-100 to-blue-50 rounded-2xl flex items-center justify-center mb-6 shadow-lg group-hover:scale-110 group-hover:rotate-3 transition-all duration-500">
              <BookOpen className="h-8 w-8 text-blue-600" />
            </div>
            <h3 className="font-bold text-gray-900 text-xl mb-3 group-hover:text-gray-800 transition-colors">
              Study Skills Guide
            </h3>
            <p className="text-gray-600 mb-6 leading-relaxed group-hover:text-gray-700 transition-colors">
              Master effective study techniques and time management strategies.
            </p>
            <Link to="/student-dashboard/academics/study-skills">
              <Button variant="outline" size="sm" className="w-full border-2 hover:border-blue-300 hover:bg-blue-50">
                <Zap className="h-4 w-4 mr-2" />
                Learn More
              </Button>
            </Link>
            {/* Decorative elements */}
            <div className="absolute top-4 right-4 w-4 h-4 bg-white/40 rounded-full group-hover:scale-150 transition-all duration-500"></div>
          </div>

          <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-3xl p-8 hover:shadow-xl hover:scale-105 transition-all duration-500 border border-white/50 group relative">
            <div className="w-16 h-16 bg-gradient-to-br from-green-100 to-green-50 rounded-2xl flex items-center justify-center mb-6 shadow-lg group-hover:scale-110 group-hover:rotate-3 transition-all duration-500">
              <Users className="h-8 w-8 text-green-600" />
            </div>
            <h3 className="font-bold text-gray-900 text-xl mb-3 group-hover:text-gray-800 transition-colors">
              Networking Basics
            </h3>
            <p className="text-gray-600 mb-6 leading-relaxed group-hover:text-gray-700 transition-colors">
              Learn how to build professional relationships early in your career.
            </p>
            <Link to="/student-dashboard/networking/basics">
              <Button variant="outline" size="sm" className="w-full border-2 hover:border-green-300 hover:bg-green-50">
                <Users className="h-4 w-4 mr-2" />
                Get Started
              </Button>
            </Link>
            {/* Decorative elements */}
            <div className="absolute top-4 right-4 w-4 h-4 bg-white/40 rounded-full group-hover:scale-150 transition-all duration-500"></div>
          </div>

          <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-3xl p-8 hover:shadow-xl hover:scale-105 transition-all duration-500 border border-white/50 group relative">
            <div className="w-16 h-16 bg-gradient-to-br from-purple-100 to-purple-50 rounded-2xl flex items-center justify-center mb-6 shadow-lg group-hover:scale-110 group-hover:rotate-3 transition-all duration-500">
              <Sparkles className="h-8 w-8 text-purple-600" />
            </div>
            <h3 className="font-bold text-gray-900 text-xl mb-3 group-hover:text-gray-800 transition-colors">
              AI Career Chat
            </h3>
            <p className="text-gray-600 mb-6 leading-relaxed group-hover:text-gray-700 transition-colors">
              Get personalized career advice from our AI assistant.
            </p>
            <Link to="/chat">
              <Button variant="outline" size="sm" className="w-full border-2 hover:border-purple-300 hover:bg-purple-50">
                <Brain className="h-4 w-4 mr-2" />
                Start Chat
              </Button>
            </Link>
            {/* Decorative elements */}
            <div className="absolute top-4 right-4 w-4 h-4 bg-white/40 rounded-full group-hover:scale-150 transition-all duration-500"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentDashboardHome;
