// OnlineCourses.tsx
import React from "react";
import { Play, Clock, Star, Users } from "lucide-react";
import Card from "../../shared/ui/Card";
import Button from "../../shared/ui/Button";

const OnlineCourses: React.FC = () => {
  const courses = [
    {
      title: "Introduction to Computer Science",
      provider: "Khan Academy",
      rating: 4.8,
      duration: "12 weeks",
      students: "45,000+",
      level: "Beginner",
      description: "Learn programming fundamentals and computational thinking",
      topics: [
        "Programming Basics",
        "Algorithms",
        "Data Structures",
        "Problem Solving",
      ],
      price: "Free",
    },
    {
      title: "AP Biology Prep Course",
      provider: "Coursera",
      rating: 4.6,
      duration: "16 weeks",
      students: "23,000+",
      level: "Advanced",
      description: "Comprehensive preparation for the AP Biology exam",
      topics: ["Cell Biology", "Genetics", "Ecology", "Evolution"],
      price: "$39/month",
    },
    {
      title: "Financial Literacy for Teens",
      provider: "edX",
      rating: 4.7,
      duration: "6 weeks",
      students: "18,000+",
      level: "Beginner",
      description: "Essential financial skills for young adults",
      topics: ["Budgeting", "Saving", "Investing", "Credit"],
      price: "Free",
    },
    {
      title: "Creative Writing Workshop",
      provider: "MasterClass",
      rating: 4.9,
      duration: "8 weeks",
      students: "12,000+",
      level: "Intermediate",
      description: "Develop your storytelling and writing skills",
      topics: [
        "Narrative Structure",
        "Character Development",
        "Dialogue",
        "Editing",
      ],
      price: "$15/month",
    },
  ];

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Online Courses
        </h1>
        <p className="text-gray-600">
          Explore high-quality online courses to supplement your education
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {courses.map((course, index) => (
          <Card
            key={index}
            className="hover:shadow-lg transition-all duration-200"
          >
            <div className="mb-4">
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-gray-900 mb-1">
                    {course.title}
                  </h3>
                  <p className="text-sm text-gray-600 mb-2">
                    by {course.provider}
                  </p>
                  <p className="text-gray-600 text-sm">{course.description}</p>
                </div>
                <div className="text-right ml-4">
                  <div className="text-lg font-bold text-green-600">
                    {course.price}
                  </div>
                </div>
              </div>

              <div className="flex items-center space-x-4 mb-4">
                <div className="flex items-center">
                  <Star className="h-4 w-4 text-yellow-500 fill-current mr-1" />
                  <span className="text-sm text-gray-600">{course.rating}</span>
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <Clock className="h-4 w-4 mr-1" />
                  {course.duration}
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <Users className="h-4 w-4 mr-1" />
                  {course.students}
                </div>
                <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded text-xs">
                  {course.level}
                </span>
              </div>

              <div className="mb-6">
                <h4 className="font-medium text-gray-900 mb-2">
                  Course Topics:
                </h4>
                <div className="flex flex-wrap gap-1">
                  {course.topics.map((topic, topicIndex) => (
                    <span
                      key={topicIndex}
                      className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-xs"
                    >
                      {topic}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex space-x-2">
                <Button className="flex-1">
                  <Play className="h-4 w-4 mr-2" />
                  Start Course
                </Button>
                <Button variant="outline" size="sm">
                  Preview
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default OnlineCourses;
