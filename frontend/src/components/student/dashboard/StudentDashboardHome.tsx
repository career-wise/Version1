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
  ChevronRight,
} from "lucide-react";
import Card from "../../shared/ui/Card";
import Button from "../../shared/ui/Button";

const StudentDashboardHome: React.FC = () => {
  const quickActions = [
    {
      title: "Take Career Assessment",
      description: "Discover careers that match your interests",
      icon: <Brain className="h-8 w-8 text-blue-600" />,
      path: "/student-dashboard/exploration/career-explorer",
      color: "bg-gradient-to-br from-blue-50 to-indigo-100",
      hoverColor: "hover:from-blue-100 hover:to-indigo-200",
      progress: 0,
    },
    {
      title: "AI Career Chat",
      description: "Get personalized career advice instantly",
      icon: <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-full flex items-center justify-center">
        <span className="text-white text-sm font-bold">AI</span>
      </div>,
      path: "/chat",
      color: "bg-gradient-to-br from-purple-50 to-violet-100",
      hoverColor: "hover:from-purple-100 hover:to-violet-200",
      progress: 0,
    },
    {
      title: "Develop Skills",
      description: "Build essential tech and soft skills",
      icon: <Calendar className="h-8 w-8 text-green-600" />,
      path: "/student-dashboard/skills/tech",
      color: "bg-gradient-to-br from-green-50 to-emerald-100",
      hoverColor: "hover:from-green-100 hover:to-emerald-200",
      progress: 60,
    },
    {
      title: "Plan Your Future",
      description: "Set goals and plan your career path",
      icon: <Target className="h-8 w-8 text-orange-600" />,
      path: "/student-dashboard/planning/goals",
      color: "bg-gradient-to-br from-orange-50 to-red-100",
      hoverColor: "hover:from-orange-100 hover:to-red-200",
      progress: 40,
    },
  ];

  const recentActivities = [
    {
      activity: "Completed Interest Assessment",
      time: "2 hours ago",
      icon: "✅",
      type: "achievement",
    },
    {
      activity: "Explored Computer Science careers",
      time: "1 day ago",
      icon: "🔍",
      type: "exploration",
    },
    {
      activity: "Added 3 colleges to watchlist",
      time: "2 days ago",
      icon: "🏫",
      type: "planning",
    },
    { 
      activity: "Set GPA goal for semester", 
      time: "3 days ago", 
      icon: "🎯",
      type: "goal",
    },
  ];

  const upcomingTasks = [
    { task: "Complete Personality Test", due: "Today", priority: "high", progress: 0 },
    {
      task: "Research scholarship opportunities",
      due: "Tomorrow",
      priority: "medium",
      progress: 30,
    },
    {
      task: "Schedule informational interview",
      due: "This week",
      priority: "medium",
      progress: 0,
    },
    { 
      task: "Update study schedule", 
      due: "Next week", 
      priority: "low",
      progress: 75,
    },
  ];

  const stats = [
    {
      label: "Assessments Completed",
      value: "3",
      total: "6",
      icon: <Award className="h-6 w-6 text-blue-600" />,
      progress: 50,
      color: "text-blue-600",
      bgColor: "bg-blue-50",
    },
    {
      label: "Career Paths Explored",
      value: "12",
      total: "∞",
      icon: <TrendingUp className="h-6 w-6 text-green-600" />,
      progress: 75,
      color: "text-green-600",
      bgColor: "bg-green-50",
    },
    {
      label: "Study Hours This Week",
      value: "24",
      total: "30",
      icon: <Clock className="h-6 w-6 text-purple-600" />,
      progress: 80,
      color: "text-purple-600",
      bgColor: "bg-purple-50",
    },
    {
      label: "Goals Achieved",
      value: "5",
      total: "8",
      icon: <Target className="h-6 w-6 text-orange-600" />,
      progress: 62,
      color: "text-orange-600",
      bgColor: "bg-orange-50",
    },
  ];

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "bg-red-100 text-red-800 border-red-200";
      case "medium":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "low":
        return "bg-green-100 text-green-800 border-green-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const getActivityTypeColor = (type: string) => {
    switch (type) {
      case "achievement":
        return "bg-green-100 text-green-800";
      case "exploration":
        return "bg-blue-100 text-blue-800";
      case "planning":
        return "bg-purple-100 text-purple-800";
      case "goal":
        return "bg-orange-100 text-orange-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-8">
      {/* Welcome Header */}
      <div className="relative overflow-hidden bg-gradient-to-br from-primary-500 via-purple-600 to-secondary-500 rounded-3xl p-8 text-white">
        <div className="absolute inset-0 bg-black bg-opacity-10"></div>
        <div className="absolute top-0 right-0 w-64 h-64 bg-white bg-opacity-10 rounded-full -translate-y-32 translate-x-32"></div>
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-white bg-opacity-5 rounded-full translate-y-24 -translate-x-24"></div>
        
        <div className="relative z-10">
          <div className="flex items-center space-x-3 mb-4">
            <div className="w-12 h-12 bg-white bg-opacity-20 rounded-xl flex items-center justify-center">
              <Sparkles className="h-7 w-7 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold">Welcome back, Demo Student! 👋</h1>
              <p className="text-primary-100 text-lg">Ready to accelerate your career journey?</p>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
            <div className="bg-white bg-opacity-10 backdrop-blur-sm rounded-xl p-4">
              <div className="flex items-center space-x-3">
                <Star className="h-6 w-6 text-yellow-300" />
                <div>
                  <div className="text-2xl font-bold">4.9/5</div>
                  <div className="text-sm text-primary-100">Your Progress Rating</div>
                </div>
              </div>
            </div>
            <div className="bg-white bg-opacity-10 backdrop-blur-sm rounded-xl p-4">
              <div className="flex items-center space-x-3">
                <Zap className="h-6 w-6 text-yellow-300" />
                <div>
                  <div className="text-2xl font-bold">7</div>
                  <div className="text-sm text-primary-100">Days Streak</div>
                </div>
              </div>
            </div>
            <div className="bg-white bg-opacity-10 backdrop-blur-sm rounded-xl p-4">
              <div className="flex items-center space-x-3">
                <TrendingUp className="h-6 w-6 text-green-300" />
                <div>
                  <div className="text-2xl font-bold">+15%</div>
                  <div className="text-sm text-primary-100">This Week's Growth</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <Card key={index} className="hover-lift border-0 shadow-lg">
            <div className="flex items-center justify-between mb-4">
              <div className={`w-12 h-12 ${stat.bgColor} rounded-xl flex items-center justify-center`}>
                {stat.icon}
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
                <div className="text-sm text-gray-500">of {stat.total}</div>
              </div>
            </div>
            <div className="mb-3">
              <div className="flex justify-between items-center mb-1">
                <span className="text-sm font-medium text-gray-700">{stat.label}</span>
                <span className={`text-sm font-semibold ${stat.color}`}>{stat.progress}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className={`h-2 rounded-full bg-gradient-to-r ${stat.color.replace('text-', 'from-').replace('-600', '-400')} ${stat.color.replace('text-', 'to-').replace('-600', '-600')}`}
                  style={{ width: `${stat.progress}%` }}
                ></div>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Quick Actions */}
      <div>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-900">Quick Actions</h2>
          <Button variant="ghost" size="sm" className="group">
            View All
            <ChevronRight className="h-4 w-4 ml-1 group-hover:translate-x-1 transition-transform duration-300" />
          </Button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {quickActions.map((action, index) => (
            <Link key={index} to={action.path}>
              <Card className={`${action.color} ${action.hoverColor} transition-all duration-500 cursor-pointer border-0 shadow-lg hover:shadow-2xl transform hover:-translate-y-2 group relative overflow-hidden`}>
                <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="relative z-10">
                  <div className="flex items-center justify-between mb-4">
                    <div className="p-3 bg-white rounded-xl shadow-sm group-hover:scale-110 transition-transform duration-300">
                      {action.icon}
                    </div>
                    <ArrowRight className="h-5 w-5 text-gray-400 group-hover:text-gray-600 group-hover:translate-x-1 transition-all duration-300" />
                  </div>
                  <h3 className="font-bold text-gray-900 mb-2 group-hover:text-primary-700 transition-colors duration-300">
                    {action.title}
                  </h3>
                  <p className="text-sm text-gray-600 mb-4">{action.description}</p>
                  
                  {action.progress > 0 && (
                    <div className="space-y-1">
                      <div className="flex justify-between items-center">
                        <span className="text-xs text-gray-500">Progress</span>
                        <span className="text-xs font-semibold text-gray-700">{action.progress}%</span>
                      </div>
                      <div className="w-full bg-white bg-opacity-50 rounded-full h-1.5">
                        <div 
                          className="h-1.5 rounded-full bg-gradient-to-r from-primary-400 to-primary-600"
                          style={{ width: `${action.progress}%` }}
                        ></div>
                      </div>
                    </div>
                  )}
                </div>
              </Card>
            </Link>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Recent Activity */}
        <Card className="shadow-lg border-0">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-gray-900">Recent Activity</h2>
            <Button variant="ghost" size="sm" className="group">
              View All
              <ChevronRight className="h-4 w-4 ml-1 group-hover:translate-x-1 transition-transform duration-300" />
            </Button>
          </div>
          <div className="space-y-4">
            {recentActivities.map((item, index) => (
              <div
                key={index}
                className="flex items-center space-x-4 p-4 bg-gradient-to-r from-gray-50 to-white rounded-xl hover:from-gray-100 hover:to-gray-50 transition-all duration-300 group cursor-pointer"
              >
                <div className="w-10 h-10 bg-gradient-to-br from-primary-100 to-secondary-100 rounded-xl flex items-center justify-center text-lg group-hover:scale-110 transition-transform duration-300">
                  {item.icon}
                </div>
                <div className="flex-1">
                  <p className="text-sm font-semibold text-gray-900 group-hover:text-primary-600 transition-colors duration-300">
                    {item.activity}
                  </p>
                  <p className="text-xs text-gray-500">{item.time}</p>
                </div>
                <div className={`px-2 py-1 rounded-full text-xs font-medium ${getActivityTypeColor(item.type)}`}>
                  {item.type}
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Upcoming Tasks */}
        <Card className="shadow-lg border-0">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-gray-900">Upcoming Tasks</h2>
            <Button variant="ghost" size="sm" className="group">
              Manage
              <ChevronRight className="h-4 w-4 ml-1 group-hover:translate-x-1 transition-transform duration-300" />
            </Button>
          </div>
          <div className="space-y-4">
            {upcomingTasks.map((task, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-4 bg-gradient-to-r from-gray-50 to-white rounded-xl hover:from-gray-100 hover:to-gray-50 transition-all duration-300 group cursor-pointer"
              >
                <div className="flex-1">
                  <p className="text-sm font-semibold text-gray-900 group-hover:text-primary-600 transition-colors duration-300">
                    {task.task}
                  </p>
                  <p className="text-xs text-gray-500 mb-2">Due: {task.due}</p>
                  {task.progress > 0 && (
                    <div className="space-y-1">
                      <div className="w-full bg-gray-200 rounded-full h-1.5">
                        <div 
                          className="h-1.5 rounded-full bg-gradient-to-r from-green-400 to-green-600"
                          style={{ width: `${task.progress}%` }}
                        ></div>
                      </div>
                      <span className="text-xs text-gray-500">{task.progress}% complete</span>
                    </div>
                  )}
                </div>
                <span className={`px-3 py-1 text-xs rounded-full font-medium border ${getPriorityColor(task.priority)}`}>
                  {task.priority}
                </span>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Featured Resources */}
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Featured Resources</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="hover-lift shadow-lg border-0 bg-gradient-to-br from-blue-50 to-indigo-100 group">
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 bg-blue-500 rounded-xl flex items-center justify-center mr-4 group-hover:scale-110 transition-transform duration-300">
                <BookOpen className="h-6 w-6 text-white" />
              </div>
              <h3 className="font-bold text-gray-900 group-hover:text-blue-600 transition-colors duration-300">
                Study Skills Guide
              </h3>
            </div>
            <p className="text-sm text-gray-600 mb-4">
              Master effective study techniques and time management strategies.
            </p>
            <Link to="/student-dashboard/academics/study-skills">
              <Button variant="outline" size="sm" className="w-full group-hover:border-blue-400 group-hover:text-blue-600">
                Learn More
              </Button>
            </Link>
          </Card>

          <Card className="hover-lift shadow-lg border-0 bg-gradient-to-br from-green-50 to-emerald-100 group">
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 bg-green-500 rounded-xl flex items-center justify-center mr-4 group-hover:scale-110 transition-transform duration-300">
                <Users className="h-6 w-6 text-white" />
              </div>
              <h3 className="font-bold text-gray-900 group-hover:text-green-600 transition-colors duration-300">
                Career Explorer
              </h3>
            </div>
            <p className="text-sm text-gray-600 mb-4">
              Discover exciting career paths that match your interests and skills.
            </p>
            <Link to="/student-dashboard/exploration/career-explorer">
              <Button variant="outline" size="sm" className="w-full group-hover:border-green-400 group-hover:text-green-600">
                Explore Careers
              </Button>
            </Link>
          </Card>

          <Card className="hover-lift shadow-lg border-0 bg-gradient-to-br from-purple-50 to-violet-100 group">
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 bg-purple-500 rounded-xl flex items-center justify-center mr-4 group-hover:scale-110 transition-transform duration-300">
                <Sparkles className="h-6 w-6 text-white" />
              </div>
              <h3 className="font-bold text-gray-900 group-hover:text-purple-600 transition-colors duration-300">
                AI Career Chat
              </h3>
            </div>
            <p className="text-sm text-gray-600 mb-4">
              Get personalized career advice from our AI assistant.
            </p>
            <Link to="/chat">
              <Button variant="outline" size="sm" className="w-full group-hover:border-purple-400 group-hover:text-purple-600">
                Start Chat
              </Button>
            </Link>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default StudentDashboardHome;