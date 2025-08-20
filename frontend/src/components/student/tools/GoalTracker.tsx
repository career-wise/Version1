// GoalTracker.tsx
import React from "react";
import { Target, CheckCircle, TrendingUp } from "lucide-react";
import Card from "../../shared/ui/Card";
import Button from "../../shared/ui/Button";

const GoalTracker: React.FC = () => {
  return (
    <div className="p-6 max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Goal Tracker</h1>
        <p className="text-gray-600">Track your personal and academic goals</p>
      </div>
      <Card className="text-center" padding="lg">
        <Target className="h-16 w-16 text-green-600 mx-auto mb-4" />
        <h2 className="text-xl font-semibold text-gray-900 mb-2">
          Personal Goal Tracking
        </h2>
        <p className="text-gray-600 mb-4">Goal tracking tools coming soon!</p>
        <Button>Track Goals</Button>
      </Card>
    </div>
  );
};

export default GoalTracker;
