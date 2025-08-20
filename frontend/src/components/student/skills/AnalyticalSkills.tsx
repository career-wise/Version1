// AnalyticalSkills.tsx
import React from "react";
import { BarChart, Calculator, Brain, TrendingUp } from "lucide-react";
import Card from "../../shared/ui/Card";
import Button from "../../shared/ui/Button";

const AnalyticalSkills: React.FC = () => {
  const analyticalAreas = [
    {
      name: "Data Analysis",
      description: "Learn to interpret and analyze data effectively",
      icon: <BarChart className="h-8 w-8 text-blue-600" />,
      skills: [
        "Statistics basics",
        "Chart interpretation",
        "Trend analysis",
        "Data visualization",
      ],
    },
    {
      name: "Mathematical Thinking",
      description: "Develop logical and mathematical problem-solving",
      icon: <Calculator className="h-8 w-8 text-green-600" />,
      skills: [
        "Logic puzzles",
        "Pattern recognition",
        "Quantitative reasoning",
        "Mathematical modeling",
      ],
    },
    {
      name: "Critical Thinking",
      description: "Enhance reasoning and evaluation skills",
      icon: <Brain className="h-8 w-8 text-purple-600" />,
      skills: [
        "Argument analysis",
        "Evidence evaluation",
        "Logical reasoning",
        "Bias recognition",
      ],
    },
    {
      name: "Research Methods",
      description: "Learn systematic investigation techniques",
      icon: <TrendingUp className="h-8 w-8 text-orange-600" />,
      skills: [
        "Source evaluation",
        "Hypothesis testing",
        "Data collection",
        "Report writing",
      ],
    },
  ];

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Analytical Skills
        </h1>
        <p className="text-gray-600">
          Strengthen your ability to think critically and solve complex problems
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {analyticalAreas.map((area, index) => (
          <Card
            key={index}
            className="hover:shadow-lg transition-all duration-200"
          >
            <div className="flex items-start space-x-4 mb-4">
              {area.icon}
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {area.name}
                </h3>
                <p className="text-gray-600 mb-4">{area.description}</p>
              </div>
            </div>

            <div className="mb-6">
              <h4 className="font-medium text-gray-900 mb-3">
                Development Areas:
              </h4>
              <div className="space-y-2">
                {area.skills.map((skill, skillIndex) => (
                  <div key={skillIndex} className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    <span className="text-sm text-gray-700">{skill}</span>
                  </div>
                ))}
              </div>
            </div>

            <Button className="w-full" size="sm">
              Practice Skills
            </Button>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default AnalyticalSkills;
