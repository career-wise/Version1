// CommunicationSkills.tsx
import React from "react";
import { MessageCircle, Users, Mic, PenTool } from "lucide-react";
import Card from "../../shared/ui/Card";
import Button from "../../shared/ui/Button";

const CommunicationSkills: React.FC = () => {
  const communicationAreas = [
    {
      name: "Public Speaking",
      description: "Build confidence in presenting and speaking to groups",
      icon: <Mic className="h-8 w-8 text-red-600" />,
      skills: [
        "Voice projection",
        "Body language",
        "Audience engagement",
        "Overcoming anxiety",
      ],
    },
    {
      name: "Written Communication",
      description: "Improve your writing for academic and professional success",
      icon: <PenTool className="h-8 w-8 text-blue-600" />,
      skills: [
        "Essay writing",
        "Email etiquette",
        "Report writing",
        "Proofreading",
      ],
    },
    {
      name: "Interpersonal Skills",
      description: "Enhance one-on-one and small group communication",
      icon: <Users className="h-8 w-8 text-green-600" />,
      skills: [
        "Active listening",
        "Empathy",
        "Conflict resolution",
        "Networking",
      ],
    },
    {
      name: "Digital Communication",
      description: "Navigate modern communication platforms effectively",
      icon: <MessageCircle className="h-8 w-8 text-purple-600" />,
      skills: [
        "Video calls",
        "Social media",
        "Online collaboration",
        "Digital etiquette",
      ],
    },
  ];

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Communication Skills
        </h1>
        <p className="text-gray-600">
          Master essential communication skills for academic and career success
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {communicationAreas.map((area, index) => (
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
              <h4 className="font-medium text-gray-900 mb-3">Key Skills:</h4>
              <div className="grid grid-cols-2 gap-2">
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

export default CommunicationSkills;
