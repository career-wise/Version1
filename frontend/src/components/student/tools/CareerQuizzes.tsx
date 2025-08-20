// CareerQuizzes.tsx
import React from "react";
import { HelpCircle, Star, Brain } from "lucide-react";
import Card from "../../shared/ui/Card";
import Button from "../../shared/ui/Button";

const CareerQuizzes: React.FC = () => {
  return (
    <div className="p-6 max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Career Quizzes
        </h1>
        <p className="text-gray-600">
          Fun and engaging career exploration quizzes
        </p>
      </div>
      <Card className="text-center" padding="lg">
        <HelpCircle className="h-16 w-16 text-yellow-600 mx-auto mb-4" />
        <h2 className="text-xl font-semibold text-gray-900 mb-2">
          Interactive Career Quizzes
        </h2>
        <p className="text-gray-600 mb-4">
          Fun career exploration activities coming soon!
        </p>
        <Button>Take Quiz</Button>
      </Card>
    </div>
  );
};

export default CareerQuizzes;
