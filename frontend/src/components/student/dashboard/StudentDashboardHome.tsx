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
} from "lucide-react";
import Card from "../../shared/ui/Card";
import Button from "../../shared/ui/Button";

const StudentDashboardHome: React.FC = () => {
  const quickActions = [
    {
      title: "Take Career Assessment",
      description: "Discover careers that match your interests",
      icon: <Brain className="h-6 w-6 text-blue-600" />,
      path: "/student-dashboard/exploration/interest-assessment",
      color: "bg-blue-50 hover:bg-blue-100",
    },
    {
      title: "Explore Colleges",
      description: "Find colleges that fit your goals",
      icon: <GraduationCap className="h-6 w-6 text-purple-600" />,
      path: "/student-dashboard/college/explorer",
      color: "bg-purple-50 hover:bg-purple-100",
    },
    {
      title: "Build Study Plan",
      description: "Organize your academic schedule",
      icon: <Calendar className="h-6 w-6 text-green-600" />,
      path: "/student-dashboard/tools/study-planner",
      color: "bg-green-50 hover:bg-green-100",
    },
    {
      title: "Set Goals",
      description: "Define your academic and career objectives",
      icon: <Target className="h-6 w-6 text-orange-600" />,
      path: "/student-dashboard/planning/goals",
      color: "bg-orange-50 hover:bg-orange-100",
    },
  ];

  const recentActivities = [
    {
      activity: "Completed Interest Assessment",
      time: "2 hours ago",
      icon: "✅",
    },
    {
      activity: "Explored Computer Science careers",
      time: "1 day ago",
      icon: "🔍",
    },
    {
      activity: "Added 3 colleges to watchlist",
      time: "2 days ago",
      icon: "🏫",
    },
    { activity: "Set GPA goal for semester", time: "3 days ago", icon: "🎯" },
  ];

  const upcomingTasks = [
    { task: "Complete Personality Test", due: "Today", priority: "high" },
    {
      task: "Research scholarship opportunities",
      due: "Tomorrow",
      priority: "medium",
    },
    {
      task: "Schedule informational interview",
      due: "This week",
      priority: "medium",
    },
    { task: "Update study schedule", due: "Next week", priority: "low" },
  ];

  const stats = [
    {
      label: "Assessments Completed",
      value: "3/6",
      icon: <Award className="h-5 w-5 text-blue-600" />,
    },
    {
      label: "Career Paths Explored",
      value: "12",
      icon: <TrendingUp className="h-5 w-5 text-green-600" />,
    },
    {
      label: "Study Hours This Week",
      value: "24",
      icon: <Clock className="h-5 w-5 text-purple-600" />,
    },
    {
      label: "Goals Achieved",
      value: "5/8",
      icon: <Target className="h-5 w-5 text-orange-600" />,
    },
  ];

  return (
    <div className="p-6 max-w-7xl mx-auto">
      {/* Welcome Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Welcome back, Demo Student! 👋
        </h1>
        <p className="text-lg text-gray-600">
          Ready to explore your future? Let's continue your career journey.
        </p>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => (
          <Card key={index} className="text-center" padding="lg">
            <div className="flex items-center justify-center mb-3">
              {stat.icon}
            </div>
            <div className="text-2xl font-bold text-gray-900 mb-1">
              {stat.value}
            </div>
            <div className="text-sm text-gray-600">{stat.label}</div>
          </Card>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">
          Quick Actions
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {quickActions.map((action, index) => (
            <Link key={index} to={action.path}>
              <Card
                className={`${action.color} transition-all duration-200 cursor-pointer border-2 border-transparent hover:border-primary-200`}
                padding="lg"
              >
                <div className="flex items-center mb-3">
                  {action.icon}
                  <ArrowRight className="h-4 w-4 text-gray-400 ml-auto" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">
                  {action.title}
                </h3>
                <p className="text-sm text-gray-600">{action.description}</p>
              </Card>
            </Link>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Recent Activity */}
        <Card>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-gray-900">
              Recent Activity
            </h2>
            <Button variant="ghost" size="sm">
              View All
            </Button>
          </div>
          <div className="space-y-4">
            {recentActivities.map((item, index) => (
              <div
                key={index}
                className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg"
              >
                <span className="text-lg">{item.icon}</span>
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-900">
                    {item.activity}
                  </p>
                  <p className="text-xs text-gray-500">{item.time}</p>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Upcoming Tasks */}
        <Card>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-gray-900">
              Upcoming Tasks
            </h2>
            <Button variant="ghost" size="sm">
              Manage
            </Button>
          </div>
          <div className="space-y-3">
            {upcomingTasks.map((task, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
              >
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-900">
                    {task.task}
                  </p>
                  <p className="text-xs text-gray-500">Due: {task.due}</p>
                </div>
                <span
                  className={`px-2 py-1 text-xs rounded-full ${
                    task.priority === "high"
                      ? "bg-red-100 text-red-800"
                      : task.priority === "medium"
                      ? "bg-yellow-100 text-yellow-800"
                      : "bg-green-100 text-green-800"
                  }`}
                >
                  {task.priority}
                </span>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Featured Resources */}
      <div className="mt-8">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">
          Featured Resources
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="hover:shadow-lg transition-all duration-200">
            <div className="flex items-center mb-3">
              <BookOpen className="h-6 w-6 text-blue-600 mr-3" />
              <h3 className="font-semibold text-gray-900">
                Study Skills Guide
              </h3>
            </div>
            <p className="text-sm text-gray-600 mb-4">
              Master effective study techniques and time management strategies.
            </p>
            <Link to="/student-dashboard/academics/study-skills">
              <Button variant="outline" size="sm" className="w-full">
                Learn More
              </Button>
            </Link>
          </Card>

          <Card className="hover:shadow-lg transition-all duration-200">
            <div className="flex items-center mb-3">
              <Users className="h-6 w-6 text-green-600 mr-3" />
              <h3 className="font-semibold text-gray-900">Networking Basics</h3>
            </div>
            <p className="text-sm text-gray-600 mb-4">
              Learn how to build professional relationships early in your
              career.
            </p>
            <Link to="/student-dashboard/networking/basics">
              <Button variant="outline" size="sm" className="w-full">
                Get Started
              </Button>
            </Link>
          </Card>

          <Card className="hover:shadow-lg transition-all duration-200">
            <div className="flex items-center mb-3">
              <Sparkles className="h-6 w-6 text-purple-600 mr-3" />
              <h3 className="font-semibold text-gray-900">AI Career Chat</h3>
            </div>
            <p className="text-sm text-gray-600 mb-4">
              Get personalized career advice from our AI assistant.
            </p>
            <Link to="/chat">
              <Button variant="outline" size="sm" className="w-full">
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
