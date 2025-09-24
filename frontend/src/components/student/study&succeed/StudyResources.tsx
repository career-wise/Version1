import React, { useState } from "react";
import {
  BookOpen,
  Search,
  Filter,
  Star,
  TrendingUp,
  Users,
  Clock,
  ExternalLink,
} from "lucide-react";
import Card from "../../shared/ui/Card";
import Button from "../../shared/ui/Button";
import Input from "../../shared/ui/Input";

const StudyResources: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  const subjects = [
    {
      id: 1,
      name: "Computer Science",
      category: "STEM",
      description: "Learn programming, algorithms, and software development",
      difficulty: "Intermediate",
      popularity: 95,
      averageTime: "4-6 hours/week",
      careers: [
        "Software Engineer",
        "Data Scientist",
        "Web Developer",
        "AI Researcher",
      ],
      skills: ["Programming", "Problem Solving", "Logic", "Mathematics"],
      growth: "+15%",
      salary: "$75,000 - $150,000",
      image: "💻",
      rating: 4.8,
    },
    {
      id: 2,
      name: "Biology",
      category: "Science",
      description: "Study living organisms and life processes",
      difficulty: "Intermediate",
      popularity: 78,
      averageTime: "5-7 hours/week",
      careers: [
        "Doctor",
        "Research Scientist",
        "Biotechnologist",
        "Environmental Scientist",
      ],
      skills: [
        "Scientific Method",
        "Analysis",
        "Research",
        "Critical Thinking",
      ],
      growth: "+8%",
      salary: "$50,000 - $120,000",
      image: "🧬",
      rating: 4.5,
    },
    {
      id: 3,
      name: "Psychology",
      category: "Social Science",
      description: "Understand human behavior and mental processes",
      difficulty: "Beginner",
      popularity: 82,
      averageTime: "4-5 hours/week",
      careers: ["Psychologist", "Counselor", "HR Specialist", "Social Worker"],
      skills: ["Empathy", "Communication", "Analysis", "Research"],
      growth: "+3%",
      salary: "$45,000 - $90,000",
      image: "🧠",
      rating: 4.6,
    },
    {
      id: 4,
      name: "Mathematics",
      category: "STEM",
      description: "Master numbers, equations, and mathematical concepts",
      difficulty: "Advanced",
      popularity: 65,
      averageTime: "6-8 hours/week",
      careers: ["Data Analyst", "Actuary", "Engineer", "Finance Analyst"],
      skills: ["Logical Thinking", "Problem Solving", "Analysis", "Precision"],
      growth: "+5%",
      salary: "$60,000 - $130,000",
      image: "📊",
      rating: 4.3,
    },
    {
      id: 5,
      name: "English Literature",
      category: "Humanities",
      description: "Explore literature, writing, and communication",
      difficulty: "Intermediate",
      popularity: 70,
      averageTime: "4-6 hours/week",
      careers: ["Writer", "Teacher", "Editor", "Content Creator"],
      skills: ["Writing", "Critical Analysis", "Communication", "Creativity"],
      growth: "+2%",
      salary: "$40,000 - $75,000",
      image: "📚",
      rating: 4.4,
    },
    {
      id: 6,
      name: "Economics",
      category: "Social Science",
      description: "Study markets, finance, and economic systems",
      difficulty: "Intermediate",
      popularity: 73,
      averageTime: "5-6 hours/week",
      careers: [
        "Economist",
        "Financial Analyst",
        "Business Consultant",
        "Policy Analyst",
      ],
      skills: ["Analysis", "Mathematics", "Critical Thinking", "Research"],
      growth: "+6%",
      salary: "$55,000 - $110,000",
      image: "📈",
      rating: 4.2,
    },
  ];

  const categories = [
    "all",
    "STEM",
    "Science",
    "Social Science",
    "Humanities",
    "Arts",
  ];

  const filteredSubjects = subjects.filter((subject) => {
    const matchesSearch =
      subject.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      subject.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory =
      selectedCategory === "all" || subject.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Beginner":
        return "text-green-600 bg-green-100";
      case "Intermediate":
        return "text-yellow-600 bg-yellow-100";
      case "Advanced":
        return "text-red-600 bg-red-100";
      default:
        return "text-gray-600 bg-gray-100";
    }
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Subject Explorer
        </h1>
        <p className="text-gray-600">
          Discover academic subjects and their career connections
        </p>
      </div>

      {/* Search and Filter */}
      <div className="flex flex-col md:flex-row gap-4 mb-8">
        <div className="flex-1">
          <Input
            placeholder="Search subjects..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            leftIcon={<Search className="h-4 w-4 text-gray-400" />}
          />
        </div>
        <div className="flex items-center space-x-2">
          <Filter className="h-4 w-4 text-gray-500" />
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
          >
            {categories.map((category) => (
              <option key={category} value={category}>
                {category === "all" ? "All Categories" : category}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card className="text-center" padding="lg">
          <BookOpen className="h-8 w-8 text-blue-600 mx-auto mb-3" />
          <div className="text-2xl font-bold text-gray-900 mb-1">
            {subjects.length}
          </div>
          <div className="text-sm text-gray-600">Available Subjects</div>
        </Card>
        <Card className="text-center" padding="lg">
          <TrendingUp className="h-8 w-8 text-green-600 mx-auto mb-3" />
          <div className="text-2xl font-bold text-gray-900 mb-1">200+</div>
          <div className="text-sm text-gray-600">Career Paths</div>
        </Card>
        <Card className="text-center" padding="lg">
          <Users className="h-8 w-8 text-purple-600 mx-auto mb-3" />
          <div className="text-2xl font-bold text-gray-900 mb-1">15k+</div>
          <div className="text-sm text-gray-600">Students Guided</div>
        </Card>
      </div>

      {/* Subjects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredSubjects.map((subject) => (
          <Card
            key={subject.id}
            className="hover:shadow-lg transition-all duration-200 cursor-pointer"
          >
            <div className="mb-4">
              <div className="flex items-center justify-between mb-3">
                <div className="text-3xl">{subject.image}</div>
                <div className="flex items-center">
                  <Star className="h-4 w-4 text-yellow-500 fill-current" />
                  <span className="text-sm text-gray-600 ml-1">
                    {subject.rating}
                  </span>
                </div>
              </div>

              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                {subject.name}
              </h3>
              <p className="text-gray-600 text-sm mb-4">
                {subject.description}
              </p>

              <div className="flex items-center justify-between mb-4">
                <span
                  className={`px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(
                    subject.difficulty
                  )}`}
                >
                  {subject.difficulty}
                </span>
                <span className="text-xs text-gray-500">
                  {subject.category}
                </span>
              </div>

              <div className="space-y-3 mb-4">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">Time Commitment:</span>
                  <span className="font-medium">{subject.averageTime}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">Job Growth:</span>
                  <span className="font-medium text-green-600">
                    {subject.growth}
                  </span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">Avg Salary:</span>
                  <span className="font-medium">{subject.salary}</span>
                </div>
              </div>

              <div className="mb-4">
                <h4 className="text-sm font-medium text-gray-900 mb-2">
                  Top Career Paths:
                </h4>
                <div className="flex flex-wrap gap-1">
                  {subject.careers.slice(0, 3).map((career, index) => (
                    <span
                      key={index}
                      className="px-2 py-1 bg-blue-100 text-blue-800 rounded text-xs"
                    >
                      {career}
                    </span>
                  ))}
                  {subject.careers.length > 3 && (
                    <span className="px-2 py-1 bg-gray-100 text-gray-600 rounded text-xs">
                      +{subject.careers.length - 3} more
                    </span>
                  )}
                </div>
              </div>

              <div className="mb-6">
                <h4 className="text-sm font-medium text-gray-900 mb-2">
                  Key Skills:
                </h4>
                <div className="flex flex-wrap gap-1">
                  {subject.skills.map((skill, index) => (
                    <span
                      key={index}
                      className="px-2 py-1 bg-green-100 text-green-800 rounded text-xs"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex space-x-2">
                <Button variant="primary" size="sm" className="flex-1">
                  Explore Career Paths
                </Button>
                <Button variant="outline" size="sm">
                  <ExternalLink className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* No Results */}
      {filteredSubjects.length === 0 && (
        <Card className="text-center" padding="lg">
          <BookOpen className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            No subjects found
          </h3>
          <p className="text-gray-600">
            Try adjusting your search or filter criteria
          </p>
        </Card>
      )}
    </div>
  );
};


export default StudyResources;
