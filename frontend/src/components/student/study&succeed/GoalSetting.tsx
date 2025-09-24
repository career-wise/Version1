import React, { useState } from "react";
import { 
  Target, 
  Plus, 
  Calendar, 
  CheckCircle, 
  Clock, 
  TrendingUp, 
  Edit, 
  Trash2,
  Star,
  Flag,
  Award,
  BookOpen,
  Users,
  Zap,
  Lightbulb
} from "lucide-react";
import Card from "../../shared/ui/Card";
import Button from "../../shared/ui/Button";

export const GoalSetting: React.FC = () => {
  const [showAddGoal, setShowAddGoal] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("all");

  const [goals, setGoals] = useState([
    {
      id: 1,
      title: "Maintain 3.8 GPA",
      description: "Keep my cumulative GPA above 3.8 for college applications",
      category: "academic",
      targetDate: "2024-06-15",
      progress: 85,
      status: "in-progress",
      priority: "high",
      milestones: [
        { task: "Complete midterm exams", completed: true },
        { task: "Submit research paper", completed: true },
        { task: "Prepare for finals", completed: false },
      ]
    },
    {
      id: 2,
      title: "Learn Python Programming",
      description: "Complete online Python course and build 3 projects",
      category: "skill",
      targetDate: "2024-04-30",
      progress: 60,
      status: "in-progress",
      priority: "medium",
      milestones: [
        { task: "Complete basic syntax", completed: true },
        { task: "Build calculator app", completed: true },
        { task: "Create web scraper", completed: false },
        { task: "Build portfolio website", completed: false },
      ]
    },
    {
      id: 3,
      title: "Complete 50 Volunteer Hours",
      description: "Volunteer at local animal shelter and community center",
      category: "personal",
      targetDate: "2024-05-15",
      progress: 70,
      status: "in-progress",
      priority: "medium",
      milestones: [
        { task: "Register with organizations", completed: true },
        { task: "Complete 25 hours", completed: true },
        { task: "Complete 40 hours", completed: false },
        { task: "Get recommendation letter", completed: false },
      ]
    },
    {
      id: 4,
      title: "SAT Score 1450+",
      description: "Achieve target SAT score for college applications",
      category: "academic",
      targetDate: "2024-03-15",
      progress: 100,
      status: "completed",
      priority: "high",
      milestones: [
        { task: "Take diagnostic test", completed: true },
        { task: "Complete prep course", completed: true },
        { task: "Take practice tests", completed: true },
        { task: "Take official SAT", completed: true },
      ]
    },
  ]);

  const categories = [
    { id: "all", name: "All Goals", icon: Target, color: "text-gray-600" },
    { id: "academic", name: "Academic", icon: BookOpen, color: "text-blue-600" },
    { id: "skill", name: "Skills", icon: Zap, color: "text-purple-600" },
    { id: "personal", name: "Personal", icon: Users, color: "text-green-600" },
    { id: "career", name: "Career", icon: Award, color: "text-orange-600" },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "text-green-600 bg-green-100 border-green-200";
      case "in-progress":
        return "text-blue-600 bg-blue-100 border-blue-200";
      case "overdue":
        return "text-red-600 bg-red-100 border-red-200";
      default:
        return "text-gray-600 bg-gray-100 border-gray-200";
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "border-l-red-500 bg-red-50";
      case "medium":
        return "border-l-yellow-500 bg-yellow-50";
      case "low":
        return "border-l-green-500 bg-green-50";
      default:
        return "border-l-gray-500 bg-gray-50";
    }
  };

  const filteredGoals = selectedCategory === "all" 
    ? goals 
    : goals.filter(goal => goal.category === selectedCategory);

  const stats = [
    {
      label: "Total Goals",
      value: goals.length,
      icon: Target,
      color: "text-blue-600",
      bgColor: "bg-blue-50"
    },
    {
      label: "Completed",
      value: goals.filter(g => g.status === "completed").length,
      icon: CheckCircle,
      color: "text-green-600",
      bgColor: "bg-green-50"
    },
    {
      label: "In Progress",
      value: goals.filter(g => g.status === "in-progress").length,
      icon: Clock,
      color: "text-orange-600",
      bgColor: "bg-orange-50"
    },
    {
      label: "Average Progress",
      value: `${Math.round(goals.reduce((acc, g) => acc + g.progress, 0) / goals.length)}%`,
      icon: TrendingUp,
      color: "text-purple-600",
      bgColor: "bg-purple-50"
    },
  ];

  return (
    <div className="p-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Goal Setting</h1>
          <p className="text-gray-600">
            Set, track, and achieve your academic and personal goals
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
          <Card key={index} className="text-center">
            <div className={`w-12 h-12 ${stat.bgColor} rounded-xl flex items-center justify-center mx-auto mb-3`}>
              <stat.icon className={`h-6 w-6 ${stat.color}`} />
            </div>
            <div className="text-2xl font-bold text-gray-900 mb-1">{stat.value}</div>
            <div className="text-sm text-gray-600">{stat.label}</div>
          </Card>
        ))}
      </div>

      {/* Category Filter */}
      <div className="flex flex-wrap gap-2 mb-6">
        {categories.map((category) => (
          <Button
            key={category.id}
            variant={selectedCategory === category.id ? "primary" : "outline"}
            size="sm"
            onClick={() => setSelectedCategory(category.id)}
            className="flex items-center space-x-2"
          >
            <category.icon className="h-4 w-4" />
            <span>{category.name}</span>
          </Button>
        ))}
      </div>

      {/* Goals List */}
      <div className="space-y-4 mb-8">
        {filteredGoals.map((goal) => (
          <Card
            key={goal.id}
            className={`border-l-4 ${getPriorityColor(goal.priority)} hover:shadow-lg transition-all duration-200`}
          >
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center space-x-3 mb-2">
                  <h3 className="text-lg font-semibold text-gray-900">{goal.title}</h3>
                  <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(goal.status)}`}>
                    {goal.status.replace("-", " ")}
                  </span>
                  <span className="px-2 py-1 bg-gray-100 text-gray-700 rounded-full text-xs capitalize">
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
                  <div className="flex items-center">
                    <Flag className={`h-4 w-4 mr-1 ${
                      goal.priority === 'high' ? 'text-red-500' :
                      goal.priority === 'medium' ? 'text-yellow-500' : 'text-green-500'
                    }`} />
                    {goal.priority} priority
                  </div>
                </div>

                {/* Progress Bar */}
                <div className="w-full bg-gray-200 rounded-full h-3 mb-4">
                  <div
                    className={`h-3 rounded-full transition-all duration-500 ${
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

                {/* Milestones */}
                <div className="bg-white p-4 rounded-lg border border-gray-200">
                  <h4 className="font-medium text-gray-900 mb-3">Milestones:</h4>
                  <div className="space-y-2">
                    {goal.milestones.map((milestone, index) => (
                      <div key={index} className="flex items-center space-x-2">
                        <CheckCircle className={`h-4 w-4 ${
                          milestone.completed ? 'text-green-600' : 'text-gray-300'
                        }`} />
                        <span className={`text-sm ${
                          milestone.completed ? 'text-gray-900 line-through' : 'text-gray-700'
                        }`}>
                          {milestone.task}
                        </span>
                      </div>
                    ))}
                  </div>
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

      {/* SMART Goals Framework */}
      <Card className="bg-gradient-to-br from-blue-50 to-indigo-100 border-blue-200">
        <h2 className="text-xl font-semibold text-gray-900 mb-6 flex items-center">
          <Lightbulb className="h-6 w-6 text-yellow-500 mr-2" />
          SMART Goals Framework
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-6">
          <div className="text-center">
            <div className="w-12 h-12 bg-blue-500 text-white rounded-full flex items-center justify-center mx-auto mb-2">
              <span className="font-bold">S</span>
            </div>
            <h3 className="font-semibold text-gray-900 mb-1">Specific</h3>
            <p className="text-xs text-gray-600">Clear and well-defined</p>
          </div>
          <div className="text-center">
            <div className="w-12 h-12 bg-green-500 text-white rounded-full flex items-center justify-center mx-auto mb-2">
              <span className="font-bold">M</span>
            </div>
            <h3 className="font-semibold text-gray-900 mb-1">Measurable</h3>
            <p className="text-xs text-gray-600">Track your progress</p>
          </div>
          <div className="text-center">
            <div className="w-12 h-12 bg-purple-500 text-white rounded-full flex items-center justify-center mx-auto mb-2">
              <span className="font-bold">A</span>
            </div>
            <h3 className="font-semibold text-gray-900 mb-1">Achievable</h3>
            <p className="text-xs text-gray-600">Realistic and attainable</p>
          </div>
          <div className="text-center">
            <div className="w-12 h-12 bg-orange-500 text-white rounded-full flex items-center justify-center mx-auto mb-2">
              <span className="font-bold">R</span>
            </div>
            <h3 className="font-semibold text-gray-900 mb-1">Relevant</h3>
            <p className="text-xs text-gray-600">Aligned with your values</p>
          </div>
          <div className="text-center">
            <div className="w-12 h-12 bg-red-500 text-white rounded-full flex items-center justify-center mx-auto mb-2">
              <span className="font-bold">T</span>
            </div>
            <h3 className="font-semibold text-gray-900 mb-1">Time-bound</h3>
            <p className="text-xs text-gray-600">Has a deadline</p>
          </div>
        </div>

        <div className="bg-white p-4 rounded-lg">
          <h4 className="font-semibold text-gray-900 mb-2">Example SMART Goal:</h4>
          <p className="text-sm text-gray-700">
            "I will <strong>improve my math grade from B to A</strong> (Specific & Measurable) 
            by <strong>studying 1 hour daily and getting tutoring</strong> (Achievable & Relevant) 
            <strong>by the end of this semester</strong> (Time-bound)."
          </p>
        </div>
      </Card>

      {/* Goal Templates */}
      <Card className="mt-8">
        <h2 className="text-xl font-semibold text-gray-900 mb-6">Goal Templates</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {[
            {
              title: "Academic Excellence",
              description: "Improve GPA and academic performance",
              icon: "📚",
              color: "bg-blue-50 border-blue-200"
            },
            {
              title: "Skill Development",
              description: "Learn new technical or soft skills",
              icon: "⚡",
              color: "bg-purple-50 border-purple-200"
            },
            {
              title: "College Preparation",
              description: "Get ready for college applications",
              icon: "🎓",
              color: "bg-green-50 border-green-200"
            },
            {
              title: "Leadership Growth",
              description: "Develop leadership and teamwork skills",
              icon: "👥",
              color: "bg-orange-50 border-orange-200"
            },
            {
              title: "Health & Wellness",
              description: "Maintain physical and mental health",
              icon: "💪",
              color: "bg-pink-50 border-pink-200"
            },
            {
              title: "Creative Projects",
              description: "Complete artistic or creative endeavors",
              icon: "🎨",
              color: "bg-indigo-50 border-indigo-200"
            },
          ].map((template, index) => (
            <div
              key={index}
              className={`p-4 rounded-lg border-2 cursor-pointer hover:shadow-md transition-all duration-200 ${template.color}`}
              onClick={() => setShowAddGoal(true)}
            >
              <div className="text-2xl mb-2">{template.icon}</div>
              <h3 className="font-semibold text-gray-900 mb-1">{template.title}</h3>
              <p className="text-sm text-gray-600">{template.description}</p>
            </div>
          ))}
        </div>
      </Card>

      {/* Motivational Section */}
      <Card className="mt-8 bg-gradient-to-r from-primary-50 to-secondary-50 border-primary-200">
        <div className="text-center">
          <Award className="h-12 w-12 text-primary-600 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-gray-900 mb-2">
            You're Making Great Progress! 🎯
          </h3>
          <p className="text-gray-600 mb-6">
            {goals.filter(g => g.status === "completed").length} goals completed this year. 
            Keep up the excellent work!
          </p>
          <div className="flex justify-center space-x-4">
            <Button variant="outline" size="sm">
              <TrendingUp className="h-4 w-4 mr-2" />
              View Progress Report
            </Button>
            <Button variant="outline" size="sm">
              <Star className="h-4 w-4 mr-2" />
              Share Achievement
            </Button>
          </div>
        </div>
      </Card>

      {/* Add Goal Modal Placeholder */}
      {showAddGoal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <Card className="max-w-md w-full">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Add New Goal</h3>
              <button
                onClick={() => setShowAddGoal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                ×
              </button>
            </div>
            <p className="text-gray-600 mb-4">
              Goal creation form will be implemented here. For now, you can explore the existing goals and templates.
            </p>
            <Button onClick={() => setShowAddGoal(false)} className="w-full">
              Close
            </Button>
          </Card>
        </div>
      )}
    </div>
  );
};

export default GoalSetting;