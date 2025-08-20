// SkillDiscovery.tsx
import React from "react";
import { Lightbulb, TrendingUp, Star } from "lucide-react";
import Card from "../../shared/ui/Card";
import Button from "../../shared/ui/Button";

const SkillDiscovery: React.FC = () => {
  const skillCategories = [
    {
      name: "Technical Skills",
      skills: [
        "Programming",
        "Data Analysis",
        "Web Development",
        "Graphic Design",
      ],
      icon: "💻",
      color: "bg-blue-100 text-blue-800",
    },
    {
      name: "Soft Skills",
      skills: [
        "Communication",
        "Leadership",
        "Problem Solving",
        "Time Management",
      ],
      icon: "🗣️",
      color: "bg-green-100 text-green-800",
    },
    {
      name: "Creative Skills",
      skills: ["Writing", "Photography", "Video Editing", "Music Production"],
      icon: "🎨",
      color: "bg-purple-100 text-purple-800",
    },
  ];

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Skill Discovery
        </h1>
        <p className="text-gray-600">
          Identify and develop your key skills for academic and career success
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {skillCategories.map((category, index) => (
          <Card
            key={index}
            className="hover:shadow-lg transition-all duration-200"
          >
            <div className="text-center mb-4">
              <div className="text-4xl mb-3">{category.icon}</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                {category.name}
              </h3>
            </div>

            <div className="space-y-2 mb-6">
              {category.skills.map((skill, skillIndex) => (
                <div
                  key={skillIndex}
                  className="flex items-center justify-between p-2 bg-gray-50 rounded"
                >
                  <span className="text-sm text-gray-700">{skill}</span>
                  <Button variant="ghost" size="sm">
                    <Star className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>

            <Button className="w-full" size="sm">
              Assess Skills
            </Button>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default SkillDiscovery;
