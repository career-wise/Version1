// TimeManagement.tsx
import React, { useState } from "react";
import { Clock, Calendar, AlertCircle, CheckCircle, Plus } from "lucide-react";
import Card from "../../shared/ui/Card";
import Button from "../../shared/ui/Button";

const TimeManagement: React.FC = () => {
  const [tasks, setTasks] = useState([
    {
      id: 1,
      title: "Math homework",
      subject: "Mathematics",
      due: "2024-01-15",
      priority: "high",
      completed: false,
      estimatedTime: 120,
    },
    {
      id: 2,
      title: "History essay",
      subject: "History",
      due: "2024-01-16",
      priority: "medium",
      completed: false,
      estimatedTime: 180,
    },
    {
      id: 3,
      title: "Science lab report",
      subject: "Biology",
      due: "2024-01-18",
      priority: "high",
      completed: true,
      estimatedTime: 90,
    },
    {
      id: 4,
      title: "English reading",
      subject: "English",
      due: "2024-01-20",
      priority: "low",
      completed: false,
      estimatedTime: 60,
    },
  ]);

  const schedule = [
    { time: "8:00 AM", activity: "Mathematics", type: "class", duration: 50 },
    {
      time: "9:00 AM",
      activity: "English Literature",
      type: "class",
      duration: 50,
    },
    { time: "10:00 AM", activity: "Break", type: "break", duration: 15 },
    { time: "10:15 AM", activity: "Biology", type: "class", duration: 50 },
    { time: "11:15 AM", activity: "History", type: "class", duration: 50 },
    { time: "12:15 PM", activity: "Lunch", type: "break", duration: 45 },
    { time: "1:00 PM", activity: "Study Hall", type: "study", duration: 50 },
    { time: "2:00 PM", activity: "Chemistry", type: "class", duration: 50 },
  ];

  const getPriorityColor = (priority) => {
    switch (priority) {
      case "high":
        return "text-red-600 bg-red-100";
      case "medium":
        return "text-yellow-600 bg-yellow-100";
      case "low":
        return "text-green-600 bg-green-100";
      default:
        return "text-gray-600 bg-gray-100";
    }
  };

  const getActivityTypeColor = (type) => {
    switch (type) {
      case "class":
        return "bg-blue-100 text-blue-800";
      case "study":
        return "bg-green-100 text-green-800";
      case "break":
        return "bg-gray-100 text-gray-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Time Management
        </h1>
        <p className="text-gray-600">
          Organize your schedule and manage tasks effectively
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          {/* Today's Schedule */}
          <Card>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold text-gray-900">
                Today's Schedule
              </h2>
              <Button variant="outline" size="sm">
                <Plus className="h-4 w-4 mr-2" />
                Add Event
              </Button>
            </div>
            <div className="space-y-2">
              {schedule.map((item, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                >
                  <div className="flex items-center space-x-3">
                    <div className="text-sm font-medium text-gray-600 w-20">
                      {item.time}
                    </div>
                    <div>
                      <div className="font-medium text-gray-900">
                        {item.activity}
                      </div>
                      <div className="text-sm text-gray-500">
                        {item.duration} minutes
                      </div>
                    </div>
                  </div>
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-medium ${getActivityTypeColor(
                      item.type
                    )}`}
                  >
                    {item.type}
                  </span>
                </div>
              ))}
            </div>
          </Card>

          {/* Task List */}
          <Card>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold text-gray-900">
                Upcoming Tasks
              </h2>
              <Button variant="outline" size="sm">
                <Plus className="h-4 w-4 mr-2" />
                Add Task
              </Button>
            </div>
            <div className="space-y-3">
              {tasks.map((task) => (
                <div
                  key={task.id}
                  className={`p-4 border rounded-lg ${
                    task.completed
                      ? "bg-green-50 border-green-200"
                      : "bg-white border-gray-200"
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-start space-x-3">
                      <CheckCircle
                        className={`h-5 w-5 mt-0.5 ${
                          task.completed ? "text-green-600" : "text-gray-300"
                        }`}
                      />
                      <div>
                        <h3
                          className={`font-medium ${
                            task.completed
                              ? "text-gray-500 line-through"
                              : "text-gray-900"
                          }`}
                        >
                          {task.title}
                        </h3>
                        <div className="flex items-center space-x-4 mt-1">
                          <span className="text-sm text-gray-500">
                            {task.subject}
                          </span>
                          <span className="text-sm text-gray-500">
                            ~{task.estimatedTime} min
                          </span>
                          <span className="text-sm text-gray-500">
                            Due: {new Date(task.due).toLocaleDateString()}
                          </span>
                        </div>
                      </div>
                    </div>
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(
                        task.priority
                      )}`}
                    >
                      {task.priority}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>

        <div className="space-y-6">
          {/* Time Stats */}
          <Card>
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              This Week
            </h2>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Study Time</span>
                <span className="font-semibold">24h 30m</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Tasks Completed</span>
                <span className="font-semibold">12/15</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-600">On-time Submissions</span>
                <span className="font-semibold">95%</span>
              </div>
            </div>
          </Card>

          {/* Time Management Tips */}
          <Card>
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              Quick Tips
            </h2>
            <div className="space-y-3">
              <div className="flex items-start space-x-3">
                <Clock className="h-5 w-5 text-blue-600 mt-0.5" />
                <div>
                  <h3 className="font-medium text-gray-900">Time Blocking</h3>
                  <p className="text-sm text-gray-600">
                    Dedicate specific time slots to different subjects
                  </p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <AlertCircle className="h-5 w-5 text-orange-600 mt-0.5" />
                <div>
                  <h3 className="font-medium text-gray-900">Buffer Time</h3>
                  <p className="text-sm text-gray-600">
                    Add extra time between tasks for transitions
                  </p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <Calendar className="h-5 w-5 text-green-600 mt-0.5" />
                <div>
                  <h3 className="font-medium text-gray-900">Weekly Review</h3>
                  <p className="text-sm text-gray-600">
                    Assess your schedule effectiveness each week
                  </p>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default TimeManagement;
