// ResourceBookmarks.tsx
import React from "react";
import { Bookmark, Star, ExternalLink } from "lucide-react";
import Card from "../../shared/ui/Card";
import Button from "../../shared/ui/Button";

const ResourceBookmarks: React.FC = () => {
  return (
    <div className="p-6 max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Resource Bookmarks
        </h1>
        <p className="text-gray-600">
          Save and organize your favorite resources
        </p>
      </div>
      <Card className="text-center" padding="lg">
        <Bookmark className="h-16 w-16 text-blue-600 mx-auto mb-4" />
        <h2 className="text-xl font-semibold text-gray-900 mb-2">
          Bookmark Management
        </h2>
        <p className="text-gray-600 mb-4">
          Resource bookmarking system coming soon!
        </p>
        <Button>Manage Bookmarks</Button>
      </Card>
    </div>
  );
};

export default ResourceBookmarks;
