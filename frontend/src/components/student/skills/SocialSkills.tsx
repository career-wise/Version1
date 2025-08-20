// SocialSkills.tsx
import React from "react";
import { Users, Heart, Handshake, MessageSquare } from "lucide-react";
import Card from "../../shared/ui/Card";
import Button from "../../shared/ui/Button";

const SocialSkills: React.FC = () => {
  const socialAreas = [
    {
      name: "Teamwork",
      description: "Learn to collaborate effectively in groups",
      icon: <Users className="h-8 w-8 text-blue-600" />,
      skills: [
        "Collaboration",
        "Compromise",
        "Shared responsibility",
        "Group dynamics",
      ],
    },
    {
      name: "Empathy & Understanding",
      description: "Develop emotional intelligence and compassion",
      icon: <Heart className="h-8 w-8 text-red-600" />,
      skills: [
        "Active listening",
        "Perspective taking",
        "Emotional awareness",
        "Cultural sensitivity",
      ],
    },
    {
      name: "Leadership",
      description: "Build skills to guide and inspire others",
      icon: <Handshake className="h-8 w-8 text-green-600" />,
      skills: [
        "Motivation",
        "Decision making",
        "Delegation",
        "Conflict resolution",
      ],
    },
    {
      name: "Social Communication",
      description: "Master interpersonal interaction skills",
      icon: <MessageSquare className="h-8 w-8 text-purple-600" />,
      skills: [
        "Conversation skills",
        "Non-verbal communication",
        "Social etiquette",
        "Networking",
      ],
    },
  ];

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Social Skills</h1>
        <p className="text-gray-600">
          Build strong interpersonal skills for personal and professional
          success
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {socialAreas.map((area, index) => (
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
              <h4 className="font-medium text-gray-900 mb-3">Key Abilities:</h4>
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
              Develop Skills
            </Button>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default SocialSkills;
