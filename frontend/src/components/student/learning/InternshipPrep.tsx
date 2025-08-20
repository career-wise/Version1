// InternshipPrep.tsx
import React from "react";
import { Briefcase, FileText, Users, Target } from "lucide-react";
import Card from "../../shared/ui/Card";
import Button from "../../shared/ui/Button";

const InternshipPrep: React.FC = () => {
  const prepSteps = [
    {
      title: "Research Opportunities",
      description:
        "Find internships that align with your interests and career goals",
      icon: <Target className="h-8 w-8 text-blue-600" />,
      tasks: [
        "Identify target companies",
        "Research application requirements",
        "Network with professionals",
      ],
    },
    {
      title: "Prepare Application Materials",
      description: "Create compelling resumes and cover letters",
      icon: <FileText className="h-8 w-8 text-green-600" />,
      tasks: [
        "Update your resume",
        "Write tailored cover letters",
        "Gather references",
      ],
    },
    {
      title: "Practice Interview Skills",
      description: "Get ready for the interview process",
      icon: <Users className="h-8 w-8 text-purple-600" />,
      tasks: [
        "Practice common questions",
        "Prepare your own questions",
        "Work on presentation skills",
      ],
    },
    {
      title: "Professional Development",
      description: "Build skills that employers value",
      icon: <Briefcase className="h-8 w-8 text-orange-600" />,
      tasks: [
        "Develop technical skills",
        "Improve communication",
        "Learn about workplace etiquette",
      ],
    },
  ];

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Internship Preparation
        </h1>
        <p className="text-gray-600">
          Get ready for your first professional internship experience
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {prepSteps.map((step, index) => (
          <Card
            key={index}
            className="hover:shadow-lg transition-all duration-200"
          >
            <div className="flex items-start space-x-4 mb-4">
              {step.icon}
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {step.title}
                </h3>
                <p className="text-gray-600 mb-4">{step.description}</p>
              </div>
            </div>

            <div className="mb-6">
              <h4 className="font-medium text-gray-900 mb-3">Action Items:</h4>
              <ul className="space-y-2">
                {step.tasks.map((task, taskIndex) => (
                  <li
                    key={taskIndex}
                    className="text-sm text-gray-600 flex items-center"
                  >
                    <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
                    {task}
                  </li>
                ))}
              </ul>
            </div>

            <Button className="w-full" size="sm">
              Get Started
            </Button>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default InternshipPrep;
