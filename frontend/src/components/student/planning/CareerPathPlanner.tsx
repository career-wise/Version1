// CareerPathPlanner.tsx
import React from "react";
import { Map, Target } from "lucide-react";
import Card from "../../shared/ui/Card";

const CareerPathPlanner: React.FC = () => {
  return (
    <div className="p-6 max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Career Path Planner
        </h1>
        <p className="text-gray-600">
          Plan your educational and career journey
        </p>
      </div>
      <Card className="text-center" padding="lg">
        <Map className="h-16 w-16 text-blue-600 mx-auto mb-4" />
        <h2 className="text-xl font-semibold text-gray-900 mb-2">
          Career Planning Tools
        </h2>
        <p className="text-gray-600">
          Interactive career planning tools coming soon!
        </p>
      </Card>
    </div>
  );
};

export default CareerPathPlanner;
