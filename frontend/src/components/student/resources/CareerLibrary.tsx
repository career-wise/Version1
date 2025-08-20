import React from "react";
import { BookOpen, Search, Filter, Star } from "lucide-react";
import Card from "../../shared/ui/Card";
import Button from "../../shared/ui/Button";

const CareerLibrary: React.FC = () => {
  const careerResources = [
    {
      title: "Software Engineer Career Guide",
      category: "Technology",
      description: "Complete guide to becoming a software engineer",
      rating: 4.8,
      readTime: "15 min",
      type: "Guide",
    },
    {
      title: "Healthcare Career Paths",
      category: "Healthcare",
      description: "Explore various healthcare professions",
      rating: 4.7,
      readTime: "20 min",
      type: "Overview",
    },
    {
      title: "Business Leadership Skills",
      category: "Business",
      description: "Essential skills for business leaders",
      rating: 4.6,
      readTime: "12 min",
      type: "Skills",
    },
  ];

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Career Library
        </h1>
        <p className="text-gray-600">
          Comprehensive career resources and guides
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {careerResources.map((resource, index) => (
          <Card
            key={index}
            className="hover:shadow-lg transition-all duration-200"
          >
            <div className="mb-4">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                {resource.title}
              </h3>
              <p className="text-gray-600 mb-3">{resource.description}</p>

              <div className="flex items-center justify-between mb-3">
                <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded text-xs">
                  {resource.category}
                </span>
                <div className="flex items-center">
                  <Star className="h-4 w-4 text-yellow-500 fill-current mr-1" />
                  <span className="text-sm text-gray-600">
                    {resource.rating}
                  </span>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-500">
                  {resource.readTime} read
                </span>
                <Button size="sm">Read Now</Button>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default CareerLibrary;
