// MentorFinder.tsx
import React from "react";
import { Users } from "lucide-react";
import Card from "../../shared/ui/Card";

const MentorFinder: React.FC = () => {
  return (
    <div className="p-6 max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Mentor Finder</h1>
        <p className="text-gray-600">
          Connect with mentors in your areas of interest
        </p>
      </div>
      <Card className="text-center" padding="lg">
        <Users className="h-16 w-16 text-blue-600 mx-auto mb-4" />
        <h2 className="text-xl font-semibold text-gray-900 mb-2">
          Find Your Mentor
        </h2>
        <p className="text-gray-600">Mentor matching platform coming soon!</p>
      </Card>
    </div>
  );
};

export default MentorFinder;
