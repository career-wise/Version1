// CommunityEvents.tsx
import React from "react";
import { Calendar, MapPin, Users } from "lucide-react";
import Card from "../../shared/ui/Card";
import Button from "../../shared/ui/Button";

const CommunityEvents: React.FC = () => {
  return (
    <div className="p-6 max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Community Events
        </h1>
        <p className="text-gray-600">
          Discover local educational and career events
        </p>
      </div>
      <Card className="text-center" padding="lg">
        <Calendar className="h-16 w-16 text-purple-600 mx-auto mb-4" />
        <h2 className="text-xl font-semibold text-gray-900 mb-2">
          Local Educational Events
        </h2>
        <p className="text-gray-600 mb-4">
          Event discovery and registration coming soon!
        </p>
        <Button>Browse Events</Button>
      </Card>
    </div>
  );
};

export default CommunityEvents;
