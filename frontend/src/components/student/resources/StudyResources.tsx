// StudyResources.tsx
import React from "react";
import { BookOpen, Download, ExternalLink } from "lucide-react";
import Card from "../../shared/ui/Card";
import Button from "../../shared/ui/Button";

const StudyResources: React.FC = () => {
  const resources = [
    {
      title: "Study Techniques Handbook",
      type: "PDF Guide",
      size: "2.5 MB",
      description: "Comprehensive guide to effective study methods",
      category: "Study Skills",
    },
    {
      title: "Time Management Templates",
      type: "Templates",
      size: "1.2 MB",
      description: "Printable planners and scheduling templates",
      category: "Organization",
    },
    {
      title: "Note-Taking Strategies",
      type: "Video Course",
      size: "Online",
      description: "Learn Cornell notes and other methods",
      category: "Study Skills",
    },
  ];

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Study Resources
        </h1>
        <p className="text-gray-600">
          Tools and materials to enhance your learning
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {resources.map((resource, index) => (
          <Card
            key={index}
            className="hover:shadow-lg transition-all duration-200"
          >
            <div className="mb-4">
              <BookOpen className="h-8 w-8 text-blue-600 mb-3" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                {resource.title}
              </h3>
              <p className="text-gray-600 mb-3">{resource.description}</p>

              <div className="flex items-center justify-between mb-4">
                <span className="px-2 py-1 bg-green-100 text-green-800 rounded text-xs">
                  {resource.category}
                </span>
                <span className="text-sm text-gray-500">{resource.size}</span>
              </div>

              <Button className="w-full" size="sm">
                <Download className="h-4 w-4 mr-2" />
                Access Resource
              </Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default StudyResources;
