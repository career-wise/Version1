// CollegePrep.tsx
import React from "react";
import { CheckCircle, Calendar, BookOpen, Users } from "lucide-react";
import Card from "../../shared/ui/Card";
import Button from "../../shared/ui/Button";

const CollegePrep: React.FC = () => {
  const timeline = [
    {
      grade: "Freshman Year",
      tasks: [
        "Focus on getting good grades",
        "Explore extracurricular activities",
        "Take challenging courses",
        "Start building relationships with teachers",
      ],
    },
    {
      grade: "Sophomore Year",
      tasks: [
        "Take PSAT for practice",
        "Continue strong academic performance",
        "Develop leadership roles",
        "Begin researching colleges",
      ],
    },
    {
      grade: "Junior Year",
      tasks: [
        "Take SAT/ACT tests",
        "Visit colleges",
        "Meet with guidance counselor",
        "Start scholarship research",
      ],
    },
    {
      grade: "Senior Year",
      tasks: [
        "Complete college applications",
        "Apply for financial aid",
        "Make final college decision",
        "Prepare for transition",
      ],
    },
  ];

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          College Preparation
        </h1>
        <p className="text-gray-600">Your roadmap to college readiness</p>
      </div>

      <div className="space-y-6">
        {timeline.map((year, index) => (
          <Card key={index}>
            <h3 className="text-xl font-semibold text-gray-900 mb-4">
              {year.grade}
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {year.tasks.map((task, taskIndex) => (
                <div key={taskIndex} className="flex items-center space-x-3">
                  <CheckCircle className="h-5 w-5 text-green-600" />
                  <span className="text-gray-700">{task}</span>
                </div>
              ))}
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default CollegePrep;
