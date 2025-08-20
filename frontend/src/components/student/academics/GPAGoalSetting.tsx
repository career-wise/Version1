// GPAGoalSetting.tsx
import React, { useState } from "react";
import { Target, TrendingUp, Calendar, Book, Award } from "lucide-react";
import Card from "../../shared/ui/Card";
import Button from "../../shared/ui/Button";

const GPAGoalSetting: React.FC = () => {
  const [currentGPA, setCurrentGPA] = useState(3.6);
  const [targetGPA, setTargetGPA] = useState(3.8);

  const semesters = [
    { name: "Fall 2023", gpa: 3.4, credits: 15, completed: true },
    { name: "Spring 2024", gpa: 3.8, credits: 16, completed: true },
    { name: "Fall 2024", gpa: 0, credits: 15, completed: false, target: 3.9 },
  ];

  const courses = [
    { name: "AP Chemistry", grade: "A-", credits: 4, gpa: 3.7 },
    { name: "AP Calculus BC", grade: "A", credits: 4, gpa: 4.0 },
    { name: "English Literature", grade: "B+", credits: 3, gpa: 3.3 },
    { name: "World History", grade: "A-", credits: 3, gpa: 3.7 },
    { name: "Physics", grade: "B", credits: 4, gpa: 3.0 },
  ];

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          GPA Goal Setting
        </h1>
        <p className="text-gray-600">
          Track your academic progress and set realistic GPA goals
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          {/* Current Progress */}
          <Card>
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              Current Academic Standing
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-600 mb-1">
                  {currentGPA}
                </div>
                <div className="text-sm text-gray-600">Current GPA</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-green-600 mb-1">
                  {targetGPA}
                </div>
                <div className="text-sm text-gray-600">Target GPA</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-purple-600 mb-1">
                  31
                </div>
                <div className="text-sm text-gray-600">Credits Completed</div>
              </div>
            </div>
          </Card>

          {/* Semester Progress */}
          <Card>
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              Semester Progress
            </h2>
            <div className="space-y-4">
              {semesters.map((semester, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
                >
                  <div>
                    <h3 className="font-medium text-gray-900">
                      {semester.name}
                    </h3>
                    <p className="text-sm text-gray-600">
                      {semester.credits} credits
                    </p>
                  </div>
                  <div className="text-right">
                    {semester.completed ? (
                      <div className="text-lg font-semibold text-blue-600">
                        {semester.gpa}
                      </div>
                    ) : (
                      <div className="text-lg font-semibold text-green-600">
                        Target: {semester.target}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </Card>

          {/* Current Courses */}
          <Card>
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              Current Courses
            </h2>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-2">Course</th>
                    <th className="text-left py-2">Grade</th>
                    <th className="text-left py-2">Credits</th>
                    <th className="text-left py-2">GPA Points</th>
                  </tr>
                </thead>
                <tbody>
                  {courses.map((course, index) => (
                    <tr key={index} className="border-b border-gray-100">
                      <td className="py-3 font-medium">{course.name}</td>
                      <td className="py-3">{course.grade}</td>
                      <td className="py-3">{course.credits}</td>
                      <td className="py-3">{course.gpa}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        </div>

        <div className="space-y-6">
          {/* GPA Calculator */}
          <Card>
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              GPA Calculator
            </h2>
            <div className="space-y-4">
              <Button className="w-full">Calculate Required Grades</Button>
              <Button variant="outline" className="w-full">
                What-If Scenarios
              </Button>
              <Button variant="outline" className="w-full">
                Grade Improvement Plan
              </Button>
            </div>
          </Card>

          {/* Tips */}
          <Card>
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              Study Tips
            </h2>
            <div className="space-y-3">
              <div className="flex items-start space-x-3">
                <Book className="h-5 w-5 text-blue-600 mt-0.5" />
                <div>
                  <h3 className="font-medium text-gray-900">Stay Motivated</h3>
                  <p className="text-sm text-gray-600">
                    Celebrate your achievements and progress
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

export default GPAGoalSetting;
