import React from "react";
import { Target, TrendingUp, Award } from "lucide-react";
import Card from "../../shared/ui/Card";
import Button from "../../shared/ui/Button";

const SkillBuilding: React.FC = () => {
  return (
    <div className="p-6 max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Skill Building
        </h1>
        <p className="text-gray-600">
          Practical skill development for academic and career success
        </p>
      </div>
      <Card className="text-center" padding="lg">
        <TrendingUp className="h-16 w-16 text-blue-600 mx-auto mb-4" />
        <h2 className="text-xl font-semibold text-gray-900 mb-2">
          Skill Building Hub
        </h2>
        <p className="text-gray-600 mb-4">
          Interactive skill-building exercises and tutorials coming soon!
        </p>
        <Button>Explore Skills</Button>
      </Card>
    </div>
  );
};

export default SkillBuilding;
