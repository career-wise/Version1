// PeerGroups.tsx
import React from "react";
import { Users } from "lucide-react";
import Card from "../../shared/ui/Card";

const PeerGroups: React.FC = () => {
  return (
    <div className="p-6 max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Peer Groups</h1>
        <p className="text-gray-600">Connect with like-minded peers</p>
      </div>
      <Card className="text-center" padding="lg">
        <Users className="h-16 w-16 text-green-600 mx-auto mb-4" />
        <h2 className="text-xl font-semibold text-gray-900 mb-2">
          Study Groups & Peer Networks
        </h2>
        <p className="text-gray-600">Peer connection features coming soon!</p>
      </Card>
    </div>
  );
};

export default PeerGroups;
