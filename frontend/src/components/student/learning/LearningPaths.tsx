// LearningPaths.tsx
import React from "react";
import { BookOpen, Clock, Award, TrendingUp } from "lucide-react";
import Card from "../../shared/ui/Card";
import Button from "../../shared/ui/Button";

const LearningPaths: React.FC = () => {
  const learningPaths = [
    {
      title: "STEM Foundations",
      description:
        "Build strong foundations in science, technology, engineering, and math",
      duration: "6 months",
      difficulty: "Intermediate",
      modules: [
        "Advanced Mathematics",
        "Scientific Method",
        "Programming Basics",
        "Engineering Principles",
      ],
      careers: [
        "Engineer",
        "Data Scientist",
        "Research Scientist",
        "Software Developer",
      ],
      icon: "🔬",
    },
    {
      title: "Business & Entrepreneurship",
      description: "Learn business fundamentals and entrepreneurial thinking",
      duration: "4 months",
      difficulty: "Beginner",
      modules: [
        "Business Basics",
        "Marketing Fundamentals",
        "Financial Literacy",
        "Leadership Skills",
      ],
      careers: [
        "Business Manager",
        "Entrepreneur",
        "Marketing Specialist",
        "Financial Analyst",
      ],
      icon: "💼",
    },
    {
      title: "Creative Arts",
      description: "Explore various forms of artistic and creative expression",
      duration: "5 months",
      difficulty: "Beginner",
      modules: [
        "Visual Arts",
        "Digital Design",
        "Creative Writing",
        "Music & Audio",
      ],
      careers: ["Graphic Designer", "Writer", "Artist", "Content Creator"],
      icon: "🎨",
    },
    {
      title: "Health & Medicine",
      description: "Introduction to healthcare and medical sciences",
      duration: "8 months",
      difficulty: "Advanced",
      modules: [
        "Human Biology",
        "Health Sciences",
        "Medical Ethics",
        "Patient Care",
      ],
      careers: [
        "Doctor",
        "Nurse",
        "Medical Researcher",
        "Healthcare Administrator",
      ],
      icon: "🏥",
    },
  ];

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Learning Paths
        </h1>
        <p className="text-gray-600">
          Structured learning journeys to help you reach your academic and
          career goals
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {learningPaths.map((path, index) => (
          <Card
            key={index}
            className="hover:shadow-lg transition-all duration-200"
          >
            <div className="mb-4">
              <div className="flex items-center space-x-3 mb-3">
                <div className="text-3xl">{path.icon}</div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900">
                    {path.title}
                  </h3>
                  <p className="text-gray-600">{path.description}</p>
                </div>
              </div>

              <div className="flex items-center space-x-4 mb-4">
                <div className="flex items-center text-sm text-gray-600">
                  <Clock className="h-4 w-4 mr-1" />
                  {path.duration}
                </div>
                <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded text-xs">
                  {path.difficulty}
                </span>
              </div>

              <div className="mb-4">
                <h4 className="font-medium text-gray-900 mb-2">
                  Learning Modules:
                </h4>
                <div className="grid grid-cols-2 gap-1">
                  {path.modules.map((module, moduleIndex) => (
                    <div
                      key={moduleIndex}
                      className="text-sm text-gray-600 flex items-center"
                    >
                      <div className="w-1 h-1 bg-gray-400 rounded-full mr-2"></div>
                      {module}
                    </div>
                  ))}
                </div>
              </div>

              <div className="mb-6">
                <h4 className="font-medium text-gray-900 mb-2">
                  Career Opportunities:
                </h4>
                <div className="flex flex-wrap gap-1">
                  {path.careers.map((career, careerIndex) => (
                    <span
                      key={careerIndex}
                      className="px-2 py-1 bg-green-100 text-green-800 rounded text-xs"
                    >
                      {career}
                    </span>
                  ))}
                </div>
              </div>

              <Button className="w-full">Start Learning Path</Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default LearningPaths;
