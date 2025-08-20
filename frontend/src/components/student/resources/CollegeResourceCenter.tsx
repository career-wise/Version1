// CollegeResourceCenter.tsx
import React from "react";
import { GraduationCap, FileText, DollarSign, Calendar } from "lucide-react";
import Card from "../../shared/ui/Card";
import Button from "../../shared/ui/Button";

const CollegeResourceCenter: React.FC = () => {
  const resourceCategories = [
    {
      title: "Application Resources",
      description: "Everything you need for college applications",
      icon: <FileText className="h-8 w-8 text-blue-600" />,
      resources: ["Application checklists", "Essay guides", "Letter templates"],
    },
    {
      title: "Financial Aid",
      description: "Navigate college funding options",
      icon: <DollarSign className="h-8 w-8 text-green-600" />,
      resources: ["FAFSA guide", "Scholarship databases", "Aid calculators"],
    },
    {
      title: "Timeline & Planning",
      description: "Stay organized throughout the process",
      icon: <Calendar className="h-8 w-8 text-orange-600" />,
      resources: [
        "Application timelines",
        "Deadline trackers",
        "Planning worksheets",
      ],
    },
  ];

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          College Resource Center
        </h1>
        <p className="text-gray-600">
          Your one-stop shop for college planning resources
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {resourceCategories.map((category, index) => (
          <Card
            key={index}
            className="hover:shadow-lg transition-all duration-200"
          >
            <div className="mb-4">
              <div className="mb-4">{category.icon}</div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                {category.title}
              </h3>
              <p className="text-gray-600 mb-4">{category.description}</p>

              <div className="mb-6">
                <h4 className="font-medium text-gray-900 mb-2">
                  Available resources:
                </h4>
                <ul className="space-y-1">
                  {category.resources.map((resource, resourceIndex) => (
                    <li
                      key={resourceIndex}
                      className="text-sm text-gray-600 flex items-center"
                    >
                      <div className="w-1 h-1 bg-gray-400 rounded-full mr-2"></div>
                      {resource}
                    </li>
                  ))}
                </ul>
              </div>

              <Button className="w-full" size="sm">
                Browse Resources
              </Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default CollegeResourceCenter;
