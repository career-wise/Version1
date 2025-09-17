import React from "react";
import { Users, Heart, Handshake, MessageSquare, Brain, Mic } from "lucide-react";
import Card from "../../shared/ui/Card";
import Button from "../../shared/ui/Button";

const SoftSkills: React.FC = () => {
  const softSkillsAreas = [
    {
      name: "Communication Skills",
      description: "Master essential communication for academic and career success",
      icon: <MessageSquare className="h-8 w-8 text-blue-600" />,
      skills: [
        "Public speaking",
        "Written communication",
        "Active listening",
        "Digital communication",
      ],
    },
    {
      name: "Teamwork & Collaboration",
      description: "Learn to work effectively in groups and teams",
      icon: <Users className="h-8 w-8 text-green-600" />,
      skills: [
        "Group dynamics",
        "Compromise",
        "Shared responsibility",
        "Conflict resolution",
      ],
    },
    {
      name: "Social & Interpersonal Skills",
      description: "Build strong relationships and social connections",
      icon: <Heart className="h-8 w-8 text-red-600" />,
      skills: [
        "Empathy",
        "Cultural sensitivity",
        "Networking",
        "Social etiquette",
      ],
    },
    {
      name: "Critical Thinking & Analysis",
      description: "Develop analytical and problem-solving abilities",
      icon: <Brain className="h-8 w-8 text-purple-600" />,
      skills: [
        "Logical reasoning",
        "Problem solving",
        "Evidence evaluation",
        "Decision making",
      ],
    },
    {
      name: "Leadership & Influence",
      description: "Build skills to guide and inspire others",
      icon: <Handshake className="h-8 w-8 text-orange-600" />,
      skills: [
        "Motivation",
        "Delegation",
        "Team building",
        "Emotional intelligence",
      ],
    },
    {
      name: "Presentation & Public Speaking",
      description: "Build confidence in presenting and speaking to groups",
      icon: <Mic className="h-8 w-8 text-indigo-600" />,
      skills: [
        "Voice projection",
        "Body language",
        "Audience engagement",
        "Overcoming anxiety",
      ],
    },
  ];

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Soft Skills</h1>
        <p className="text-gray-600">
          Develop essential interpersonal and communication skills for personal and professional success
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {softSkillsAreas.map((area, index) => (
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

export default SoftSkills;