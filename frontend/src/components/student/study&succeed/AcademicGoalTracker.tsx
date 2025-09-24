import React, { useState } from "react";
import {
  Target,
  Plus,
  CheckCircle,
  Clock,
  TrendingUp,
  Calendar,
  Edit,
  Trash2,
} from "lucide-react";
import Card from "../../shared/ui/Card";
import Button from "../../shared/ui/Button";

const AcademicGoalTracker: React.FC = () => {
  const [goals, setGoals] = useState([
    {
      id: 1,
      title: "Maintain 3.8 GPA",
      description: "Keep my cumulative GPA above 3.8 for college applications",
      category: "GPA",
      targetDate: "2024-06-15",
      progress: 85,
      status: "in-progress",
      priority: "high",
    },
    {
      id: 2,
      title: "Complete AP Chemistry",
      description: "Finish AP Chemistry with a grade of A- or better",
      category: "Course",
      targetDate: "2024-05-30",
      progress: 70,
      status: "in-progress",
      priority: "high",
    },
    {
      id: 3,
      title: "SAT Score 1450+",
      description: "Achieve a SAT score of 1450 or higher",
      category: "Test Prep",
      targetDate: "2024-03-15",
      progress: 100,
      status: "completed",
      priority: "high",
    },
    {
      id: 4,
      title: "Complete 40 Community Service Hours",
      description: "Volunteer at local animal shelter and food bank",
      category: "Extracurricular",
      targetDate: "2024-04-30",
      progress: 60,
      status: "in-progress",
      priority: "medium",
    },
    {
      id: 5,
      title: "Join National Honor Society",
      description: "Meet requirements and apply for NHS membership",
      category: "Achievement",
      targetDate: "2024-02-28",
      progress: 90,
      status: "in-progress",
      priority: "medium",
    },
  ]);

  const [showAddGoal, setShowAddGoal] = useState(false);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "text-green-600 bg-green-100";
      case "in-progress":
        return "text-blue-600 bg-blue-100";
      case "overdue":
        return "text-red-600 bg-red-100";
      default:
        return "text-gray-600 bg-gray-100";
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "border-l-red-500";
      case "medium":
        return "border-l-yellow-500";
      case "low":
        return "border-l-green-500";
      default:
        return "border-l-gray-500";
    }
  };

  const stats = [
    { label: "Total Goals", value: goals.length, icon: Target },
    {
      label: "Completed",
      value: goals.filter((g) => g.status === "completed").length,
      icon: CheckCircle,
    },
    {
      label: "In Progress",
      value: goals.filter((g) => g.status === "in-progress").length,
      icon: Clock,
    },
    {
      label: "Average Progress",
      value: `${Math.round(
        goals.reduce((acc, g) => acc + g.progress, 0) / goals.length
      )}%`,
      icon: TrendingUp,
    },
  ];

  return (
    <div className="p-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Academic Goal Tracker
          </h1>
          <p className="text-gray-600">
            Track your academic progress and stay on top of your goals
          </p>
        </div>
        <Button onClick={() => setShowAddGoal(true)}>
          <Plus className="h-4 w-4 mr-2" />
          Add Goal
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => (
          <Card key={index} className="text-center" padding="lg">
            <div className="flex items-center justify-center mb-3">
              <stat.icon className="h-8 w-8 text-primary-600" />
            </div>
            <div className="text-2xl font-bold text-gray-900 mb-1">
              {stat.value}
            </div>
            <div className="text-sm text-gray-600">{stat.label}</div>
          </Card>
        ))}
      </div>

      {/* Goals Filter */}
      <div className="flex items-center space-x-4 mb-6">
        <Button variant="outline" size="sm">
          All Goals
        </Button>
        <Button variant="ghost" size="sm">
          In Progress
        </Button>
        <Button variant="ghost" size="sm">
          Completed
        </Button>
        <Button variant="ghost" size="sm">
          High Priority
        </Button>
      </div>

      {/* Goals List */}
      <div className="space-y-4">
        {goals.map((goal) => (
          <Card
            key={goal.id}
            className={`border-l-4 ${getPriorityColor(
              goal.priority
            )} hover:shadow-lg transition-all duration-200`}
          >
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center space-x-3 mb-2">
                  <h3 className="text-lg font-semibold text-gray-900">
                    {goal.title}
                  </h3>
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(
                      goal.status
                    )}`}
                  >
                    {goal.status.replace("-", " ")}
                  </span>
                  <span className="px-2 py-1 bg-gray-100 text-gray-700 rounded-full text-xs">
                    {goal.category}
                  </span>
                </div>

                <p className="text-gray-600 mb-4">{goal.description}</p>

                <div className="flex items-center space-x-6 text-sm text-gray-500 mb-4">
                  <div className="flex items-center">
                    <Calendar className="h-4 w-4 mr-1" />
                    Target: {new Date(goal.targetDate).toLocaleDateString()}
                  </div>
                  <div className="flex items-center">
                    <TrendingUp className="h-4 w-4 mr-1" />
                    Progress: {goal.progress}%
                  </div>
                </div>

                {/* Progress Bar */}
                <div className="w-full bg-gray-200 rounded-full h-2 mb-4">
                  <div
                    className={`h-2 rounded-full ${
                      goal.status === "completed"
                        ? "bg-green-500"
                        : goal.progress >= 75
                        ? "bg-blue-500"
                        : goal.progress >= 50
                        ? "bg-yellow-500"
                        : "bg-red-500"
                    }`}
                    style={{ width: `${goal.progress}%` }}
                  ></div>
                </div>
              </div>

              <div className="flex items-center space-x-2 ml-4">
                <Button variant="ghost" size="sm">
                  <Edit className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="sm">
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Motivational Section */}
      <Card className="mt-8 bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200">
        <div className="text-center">
          <h3 className="text-xl font-semibold text-gray-900 mb-2">
            Keep Going! 🎯
          </h3>
          <p className="text-gray-600 mb-4">
            You're making great progress on your academic goals. Stay focused
            and keep pushing forward!
          </p>
          <div className="flex justify-center space-x-4">
            <Button variant="outline" size="sm">
              View Study Tips
            </Button>
            <Button variant="outline" size="sm">
              Time Management Guide
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default AcademicGoalTracker;
