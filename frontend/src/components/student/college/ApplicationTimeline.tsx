// ApplicationTimeline.tsx
import React from "react";
import { Calendar, Clock, AlertCircle } from "lucide-react";
import Card from "../../shared/ui/Card";

const ApplicationTimeline: React.FC = () => {
  const deadlines = [
    { date: "August", task: "Finalize college list", status: "completed" },
    { date: "September", task: "Request transcripts", status: "completed" },
    {
      date: "October",
      task: "Submit early applications",
      status: "in-progress",
    },
    { date: "November", task: "Complete interviews", status: "upcoming" },
    {
      date: "December",
      task: "Submit regular applications",
      status: "upcoming",
    },
    { date: "January", task: "Submit FAFSA", status: "upcoming" },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "text-green-600 bg-green-100";
      case "in-progress":
        return "text-blue-600 bg-blue-100";
      case "upcoming":
        return "text-orange-600 bg-orange-100";
      default:
        return "text-gray-600 bg-gray-100";
    }
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Application Timeline
        </h1>
        <p className="text-gray-600">
          Stay on track with important college application deadlines
        </p>
      </div>

      <div className="space-y-4">
        {deadlines.map((item, index) => (
          <Card key={index} className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="text-center min-w-[80px]">
                <Calendar className="h-5 w-5 text-gray-500 mx-auto mb-1" />
                <div className="text-sm font-medium text-gray-900">
                  {item.date}
                </div>
              </div>
              <div>
                <h3 className="font-medium text-gray-900">{item.task}</h3>
              </div>
            </div>
            <span
              className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(
                item.status
              )}`}
            >
              {item.status.replace("-", " ")}
            </span>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default ApplicationTimeline;
