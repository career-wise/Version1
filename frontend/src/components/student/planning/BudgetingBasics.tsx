// BudgetingBasics.tsx
import React from "react";
import { DollarSign } from "lucide-react";
import Card from "../../shared/ui/Card";

const BudgetingBasics: React.FC = () => {
  return (
    <div className="p-6 max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Budgeting Basics
        </h1>
        <p className="text-gray-600">
          Learn essential financial management skills
        </p>
      </div>
      <Card className="text-center" padding="lg">
        <DollarSign className="h-16 w-16 text-green-600 mx-auto mb-4" />
        <h2 className="text-xl font-semibold text-gray-900 mb-2">
          Financial Literacy for Students
        </h2>
        <p className="text-gray-600">
          Budgeting tools and lessons coming soon!
        </p>
      </Card>
    </div>
  );
};

export default BudgetingBasics;
