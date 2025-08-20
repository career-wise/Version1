// TimelineBuilder.tsx
import React from "react";
import { Calendar } from "lucide-react";
import Card from "../../shared/ui/Card";

const TimelineBuilder: React.FC = () => {
  return (
    <div className="p-6 max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Timeline Builder
        </h1>
        <p className="text-gray-600">
          Create timelines for your academic and career goals
        </p>
      </div>
      <Card className="text-center" padding="lg">
        <Calendar className="h-16 w-16 text-blue-600 mx-auto mb-4" />
        <h2 className="text-xl font-semibold text-gray-900 mb-2">
          Interactive Timeline Creator
        </h2>
        <p className="text-gray-600">Timeline building tools coming soon!</p>
      </Card>
    </div>
  );
};

export default TimelineBuilder;
