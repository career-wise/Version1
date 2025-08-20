// DigitalCitizenship.tsx
import React from "react";
import { Shield, Globe, Lock, AlertCircle } from "lucide-react";
import Card from "../../shared/ui/Card";
import Button from "../../shared/ui/Button";

const DigitalCitizenship: React.FC = () => {
  const topics = [
    {
      title: "Online Safety",
      description: "Protect yourself in the digital world",
      icon: <Shield className="h-8 w-8 text-green-600" />,
      concepts: ["Password security", "Phishing awareness", "Safe browsing"],
    },
    {
      title: "Digital Privacy",
      description: "Understand and control your digital footprint",
      icon: <Lock className="h-8 w-8 text-blue-600" />,
      concepts: ["Privacy settings", "Data protection", "Personal information"],
    },
    {
      title: "Online Ethics",
      description: "Responsible behavior in digital spaces",
      icon: <Globe className="h-8 w-8 text-purple-600" />,
      concepts: [
        "Digital respect",
        "Cyberbullying prevention",
        "Content sharing",
      ],
    },
  ];

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Digital Citizenship
        </h1>
        <p className="text-gray-600">
          Learn to be a responsible digital citizen
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {topics.map((topic, index) => (
          <Card
            key={index}
            className="hover:shadow-lg transition-all duration-200"
          >
            <div className="mb-4">
              <div className="mb-4">{topic.icon}</div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                {topic.title}
              </h3>
              <p className="text-gray-600 mb-4">{topic.description}</p>

              <div className="mb-6">
                <h4 className="font-medium text-gray-900 mb-2">
                  Key concepts:
                </h4>
                <ul className="space-y-1">
                  {topic.concepts.map((concept, conceptIndex) => (
                    <li
                      key={conceptIndex}
                      className="text-sm text-gray-600 flex items-center"
                    >
                      <div className="w-1 h-1 bg-gray-400 rounded-full mr-2"></div>
                      {concept}
                    </li>
                  ))}
                </ul>
              </div>

              <Button className="w-full" size="sm">
                Learn More
              </Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default DigitalCitizenship;
