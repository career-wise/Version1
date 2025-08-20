// ScholarshipFinder.tsx
import React from "react";
import { DollarSign, Calendar, Users, Award } from "lucide-react";
import Card from "../../shared/ui/Card";
import Button from "../../shared/ui/Button";

const ScholarshipFinder: React.FC = () => {
  const scholarships = [
    {
      name: "Merit-Based Academic Scholarship",
      amount: "$5,000",
      deadline: "March 15, 2024",
      requirements: ["3.5+ GPA", "Leadership experience", "Community service"],
      type: "Academic",
    },
    {
      name: "STEM Innovation Grant",
      amount: "$2,500",
      deadline: "April 1, 2024",
      requirements: [
        "STEM major",
        "Research project",
        "Teacher recommendation",
      ],
      type: "STEM",
    },
    {
      name: "Community Service Award",
      amount: "$1,000",
      deadline: "February 28, 2024",
      requirements: [
        "100+ volunteer hours",
        "Essay submission",
        "Reference letter",
      ],
      type: "Service",
    },
  ];

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Scholarship Finder
        </h1>
        <p className="text-gray-600">
          Discover financial aid opportunities to fund your education
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {scholarships.map((scholarship, index) => (
          <Card
            key={index}
            className="hover:shadow-lg transition-all duration-200"
          >
            <div className="mb-4">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                {scholarship.name}
              </h3>
              <div className="flex items-center space-x-4 mb-3">
                <div className="flex items-center text-green-600">
                  <DollarSign className="h-4 w-4 mr-1" />
                  <span className="font-bold">{scholarship.amount}</span>
                </div>
                <div className="flex items-center text-gray-600">
                  <Calendar className="h-4 w-4 mr-1" />
                  <span className="text-sm">{scholarship.deadline}</span>
                </div>
              </div>

              <div className="mb-4">
                <h4 className="text-sm font-medium text-gray-900 mb-2">
                  Requirements:
                </h4>
                <ul className="space-y-1">
                  {scholarship.requirements.map((req, idx) => (
                    <li
                      key={idx}
                      className="text-sm text-gray-600 flex items-center"
                    >
                      <div className="w-1 h-1 bg-gray-400 rounded-full mr-2"></div>
                      {req}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="flex items-center justify-between">
                <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded text-xs font-medium">
                  {scholarship.type}
                </span>
                <Button size="sm">Apply Now</Button>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default ScholarshipFinder;
