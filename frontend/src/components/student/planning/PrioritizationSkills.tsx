// PrioritizationSkills.tsx
import React from "react";
import { List } from "lucide-react";
import Card from "../../shared/ui/Card";

const PrioritizationSkills: React.FC = () => {
  return (
    <div className="p-6 max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Prioritization Skills
        </h1>
        <p className="text-gray-600">
          Learn to prioritize tasks and manage your time effectively
        </p>
      </div>
      <Card className="text-center" padding="lg">
        <List className="h-16 w-16 text-orange-600 mx-auto mb-4" />
        <h2 className="text-xl font-semibold text-gray-900 mb-2">
          Priority Management Tools
        </h2>
        <p className="text-gray-600">
          Prioritization techniques and tools coming soon!
        </p>
      </Card>
    </div>
  );
};

export default PrioritizationSkills;
