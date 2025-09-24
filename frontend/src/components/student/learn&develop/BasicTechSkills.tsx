// BasicTechSkills.tsx
import React from "react";
import { Monitor, Code, Database, Globe } from "lucide-react";
import Card from "../../shared/ui/Card";
import Button from "../../shared/ui/Button";

const BasicTechSkills: React.FC = () => {
  const techSkills = [
    {
      name: "Computer Basics",
      description:
        "File management, operating systems, and basic troubleshooting",
      icon: <Monitor className="h-8 w-8 text-blue-600" />,
      level: "Beginner",
      lessons: [
        "File Organization",
        "Software Installation",
        "System Maintenance",
      ],
    },
    {
      name: "Programming Fundamentals",
      description: "Introduction to coding concepts and basic programming",
      icon: <Code className="h-8 w-8 text-green-600" />,
      level: "Beginner",
      lessons: [
        "Variables & Data Types",
        "Loops & Conditions",
        "Functions & Methods",
      ],
    },
    {
      name: "Web Development",
      description: "HTML, CSS, and basic web technologies",
      icon: <Globe className="h-8 w-8 text-purple-600" />,
      level: "Intermediate",
      lessons: ["HTML Structure", "CSS Styling", "JavaScript Basics"],
    },
    {
      name: "Data & Spreadsheets",
      description: "Excel, Google Sheets, and data analysis basics",
      icon: <Database className="h-8 w-8 text-orange-600" />,
      level: "Beginner",
      lessons: ["Formulas & Functions", "Charts & Graphs", "Data Filtering"],
    },
  ];

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Basic Tech Skills
        </h1>
        <p className="text-gray-600">
          Build essential digital literacy skills for the modern world
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {techSkills.map((skill, index) => (
          <Card
            key={index}
            className="hover:shadow-lg transition-all duration-200"
          >
            <div className="flex items-start space-x-4 mb-4">
              {skill.icon}
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {skill.name}
                </h3>
                <p className="text-gray-600 mb-3">{skill.description}</p>
                <span className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-sm">
                  {skill.level}
                </span>
              </div>
            </div>

            <div className="mb-4">
              <h4 className="font-medium text-gray-900 mb-2">
                What you'll learn:
              </h4>
              <ul className="space-y-1">
                {skill.lessons.map((lesson, lessonIndex) => (
                  <li
                    key={lessonIndex}
                    className="text-sm text-gray-600 flex items-center"
                  >
                    <div className="w-1 h-1 bg-gray-400 rounded-full mr-2"></div>
                    {lesson}
                  </li>
                ))}
              </ul>
            </div>

            <Button className="w-full" size="sm">
              Start Learning
            </Button>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default BasicTechSkills;
