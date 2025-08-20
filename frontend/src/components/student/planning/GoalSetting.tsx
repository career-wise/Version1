// GoalSetting.tsx
import React from "react";
import { Target } from "lucide-react";
import Card from "../../shared/ui/Card";

const GoalSetting: React.FC = () => {
  return (
    <div className="p-6 max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Goal Setting</h1>
        <p className="text-gray-600">
          Set and track your academic and personal goals
        </p>
      </div>
      <Card className="text-center" padding="lg">
        <Target className="h-16 w-16 text-green-600 mx-auto mb-4" />
        <h2 className="text-xl font-semibold text-gray-900 mb-2">
          SMART Goals Framework
        </h2>
        <p className="text-gray-600">
          Goal setting tools and tracking coming soon!
        </p>
      </Card>
    </div>
  );
};

export default GoalSetting;
