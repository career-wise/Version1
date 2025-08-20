// NetworkingBasics.tsx
import React from "react";
import { Handshake, Users, MessageSquare } from "lucide-react";
import Card from "../../shared/ui/Card";
import Button from "../../shared/ui/Button";

const NetworkingBasics: React.FC = () => {
  return (
    <div className="p-6 max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Networking Basics
        </h1>
        <p className="text-gray-600">
          Learn how to build professional relationships appropriately
        </p>
      </div>
      <Card className="text-center" padding="lg">
        <Handshake className="h-16 w-16 text-green-600 mx-auto mb-4" />
        <h2 className="text-xl font-semibold text-gray-900 mb-2">
          Professional Networking Skills
        </h2>
        <p className="text-gray-600 mb-4">
          Networking training and tools coming soon!
        </p>
        <Button>Learn Networking</Button>
      </Card>
    </div>
  );
};

export default NetworkingBasics;
