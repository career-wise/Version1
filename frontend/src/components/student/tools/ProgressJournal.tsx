// ProgressJournal.tsx
import React from "react";
import { BookOpen, PenTool, TrendingUp } from "lucide-react";
import Card from "../../shared/ui/Card";
import Button from "../../shared/ui/Button";

const ProgressJournal: React.FC = () => {
  return (
    <div className="p-6 max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Progress Journal
        </h1>
        <p className="text-gray-600">
          Reflect on your learning journey and track growth
        </p>
      </div>
      <Card className="text-center" padding="lg">
        <BookOpen className="h-16 w-16 text-purple-600 mx-auto mb-4" />
        <h2 className="text-xl font-semibold text-gray-900 mb-2">
          Reflection & Growth Tracking
        </h2>
        <p className="text-gray-600 mb-4">
          Digital journaling tools coming soon!
        </p>
        <Button>Start Journaling</Button>
      </Card>
    </div>
  );
};

export default ProgressJournal;
