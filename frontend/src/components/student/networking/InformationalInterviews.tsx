// InformationalInterviews.tsx
import React from "react";
import { MessageCircle, Users, Calendar } from "lucide-react";
import Card from "../../shared/ui/Card";
import Button from "../../shared/ui/Button";

const InformationalInterviews: React.FC = () => {
  return (
    <div className="p-6 max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Informational Interviews
        </h1>
        <p className="text-gray-600">
          Learn how to conduct informational interviews with professionals
        </p>
      </div>
      <Card className="text-center" padding="lg">
        <MessageCircle className="h-16 w-16 text-blue-600 mx-auto mb-4" />
        <h2 className="text-xl font-semibold text-gray-900 mb-2">
          Professional Interview Practice
        </h2>
        <p className="text-gray-600 mb-4">
          Interview guidance and practice tools coming soon!
        </p>
        <Button>Practice Interviews</Button>
      </Card>
    </div>
  );
};

export default InformationalInterviews;
