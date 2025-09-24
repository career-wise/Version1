// MajorExplorer.tsx
import React, { useState } from "react";
import { BookOpen, TrendingUp, DollarSign, Clock } from "lucide-react";
import Card from "../../shared/ui/Card";
import Button from "../../shared/ui/Button";

const MajorExplorer: React.FC = () => {
  const majors = [
    {
      name: "Computer Science",
      category: "STEM",
      description: "Study algorithms, programming, and computational systems",
      averageSalary: "$85,000",
      jobGrowth: "+22%",
      difficulty: "High",
      careers: [
        "Software Engineer",
        "Data Scientist",
        "Product Manager",
        "Research Scientist",
      ],
      requiredCourses: ["Calculus", "Physics", "Statistics", "Programming"],
      icon: "💻",
    },
    {
      name: "Psychology",
      category: "Social Sciences",
      description: "Understand human behavior and mental processes",
      averageSalary: "$60,000",
      jobGrowth: "+3%",
      difficulty: "Medium",
      careers: [
        "Psychologist",
        "Counselor",
        "HR Specialist",
        "Research Analyst",
      ],
      requiredCourses: [
        "Statistics",
        "Biology",
        "Research Methods",
        "Social Psychology",
      ],
      icon: "🧠",
    },
    {
      name: "Business Administration",
      category: "Business",
      description: "Learn management, finance, and organizational skills",
      averageSalary: "$70,000",
      jobGrowth: "+5%",
      difficulty: "Medium",
      careers: ["Manager", "Consultant", "Analyst", "Entrepreneur"],
      requiredCourses: ["Accounting", "Economics", "Marketing", "Finance"],
      icon: "📊",
    },
  ];

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Major Explorer
        </h1>
        <p className="text-gray-600">
          Explore academic majors and their career outcomes
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {majors.map((major, index) => (
          <Card
            key={index}
            className="hover:shadow-lg transition-all duration-200"
          >
            <div className="text-3xl mb-3">{major.icon}</div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              {major.name}
            </h3>
            <p className="text-gray-600 mb-4">{major.description}</p>

            <div className="space-y-2 mb-4">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Avg Salary:</span>
                <span className="font-medium">{major.averageSalary}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Job Growth:</span>
                <span className="font-medium text-green-600">
                  {major.jobGrowth}
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Difficulty:</span>
                <span className="font-medium">{major.difficulty}</span>
              </div>
            </div>

            <div className="mb-4">
              <h4 className="text-sm font-medium text-gray-900 mb-2">
                Career Options:
              </h4>
              <div className="flex flex-wrap gap-1">
                {major.careers.map((career, idx) => (
                  <span
                    key={idx}
                    className="px-2 py-1 bg-green-100 text-green-800 rounded text-xs"
                  >
                    {career}
                  </span>
                ))}
              </div>
            </div>

            <Button className="w-full" size="sm">
              Explore Major
            </Button>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default MajorExplorer;
