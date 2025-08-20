// FinancialLiteracy.tsx
import React from "react";
import { DollarSign, PiggyBank, CreditCard, TrendingUp } from "lucide-react";
import Card from "../../shared/ui/Card";
import Button from "../../shared/ui/Button";

const FinancialLiteracy: React.FC = () => {
  const topics = [
    {
      title: "Budgeting Basics",
      description: "Learn to create and manage a personal budget",
      icon: <PiggyBank className="h-8 w-8 text-green-600" />,
      lessons: ["Creating a budget", "Tracking expenses", "Saving strategies"],
    },
    {
      title: "Understanding Credit",
      description: "Build good credit habits early",
      icon: <CreditCard className="h-8 w-8 text-blue-600" />,
      lessons: ["Credit scores", "Credit cards", "Building credit"],
    },
    {
      title: "Investing Fundamentals",
      description: "Introduction to investing and growing wealth",
      icon: <TrendingUp className="h-8 w-8 text-purple-600" />,
      lessons: ["Investment basics", "Risk vs return", "Long-term planning"],
    },
  ];

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Financial Literacy
        </h1>
        <p className="text-gray-600">
          Essential money management skills for students
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {topics.map((topic, index) => (
          <Card
            key={index}
            className="hover:shadow-lg transition-all duration-200"
          >
            <div className="mb-4">
              <div className="mb-4">{topic.icon}</div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                {topic.title}
              </h3>
              <p className="text-gray-600 mb-4">{topic.description}</p>

              <div className="mb-6">
                <h4 className="font-medium text-gray-900 mb-2">
                  Topics covered:
                </h4>
                <ul className="space-y-1">
                  {topic.lessons.map((lesson, lessonIndex) => (
                    <li
                      key={lessonIndex}
                      className="text-sm text-gray-600 flex items-center"
                    >
                      <div className="w-1 h-1 bg-gray-400 rounded-full mr-2"></div>
                      {lesson}
                    </li>
                  ))}
                </ul>
              </div>

              <Button className="w-full" size="sm">
                Start Learning
              </Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default FinancialLiteracy;
