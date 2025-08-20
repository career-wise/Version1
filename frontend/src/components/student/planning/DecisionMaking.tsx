// DecisionMaking.tsx
import React from "react";
import { Brain } from "lucide-react";
import Card from "../../shared/ui/Card";

const DecisionMaking: React.FC = () => {
  return (
    <div className="p-6 max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Decision Making
        </h1>
        <p className="text-gray-600">
          Learn frameworks for making important decisions
        </p>
      </div>
      <Card className="text-center" padding="lg">
        <Brain className="h-16 w-16 text-purple-600 mx-auto mb-4" />
        <h2 className="text-xl font-semibold text-gray-900 mb-2">
          Decision-Making Frameworks
        </h2>
        <p className="text-gray-600">
          Decision-making tools and exercises coming soon!
        </p>
      </Card>
    </div>
  );
};

export default DecisionMaking;
