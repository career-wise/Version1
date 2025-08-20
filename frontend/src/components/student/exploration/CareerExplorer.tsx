import React, { useState } from "react";
import {
  Search,
  Filter,
  Star,
  TrendingUp,
  DollarSign,
  Clock,
} from "lucide-react";
import Card from "../../shared/ui/Card";
import Button from "../../shared/ui/Button";
import Input from "../../shared/ui/Input";

const CareerExplorer: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  const categories = [
    { id: "all", name: "All Careers" },
    { id: "technology", name: "Technology" },
    { id: "healthcare", name: "Healthcare" },
    { id: "business", name: "Business" },
    { id: "creative", name: "Creative Arts" },
    { id: "education", name: "Education" },
    { id: "science", name: "Science" },
  ];

  const careers = [
    {
      id: 1,
      title: "Software Developer",
      category: "technology",
      description: "Design and build computer programs and applications",
      salary: "$70,000 - $120,000",
      growth: "+22%",
      education: "Bachelor's degree",
      skills: ["Programming", "Problem Solving", "Teamwork"],
      trending: true,
    },
    {
      id: 2,
      title: "Registered Nurse",
      category: "healthcare",
      description: "Provide patient care and support in healthcare settings",
      salary: "$60,000 - $85,000",
      growth: "+7%",
      education: "Bachelor's degree in Nursing",
      skills: ["Patient Care", "Communication", "Critical Thinking"],
      trending: false,
    },
    {
      id: 3,
      title: "Marketing Manager",
      category: "business",
      description: "Develop and execute marketing strategies for products",
      salary: "$65,000 - $100,000",
      growth: "+10%",
      education: "Bachelor's degree in Marketing",
      skills: ["Strategy", "Communication", "Analytics"],
      trending: true,
    },
    {
      id: 4,
      title: "Graphic Designer",
      category: "creative",
      description: "Create visual concepts for digital and print media",
      salary: "$40,000 - $65,000",
      growth: "+3%",
      education: "Bachelor's degree in Design",
      skills: ["Creativity", "Design Software", "Visual Communication"],
      trending: false,
    },
    {
      id: 5,
      title: "Data Scientist",
      category: "technology",
      description: "Analyze complex data to help organizations make decisions",
      salary: "$80,000 - $140,000",
      growth: "+31%",
      education: "Master's degree preferred",
      skills: ["Statistics", "Programming", "Machine Learning"],
      trending: true,
    },
    {
      id: 6,
      title: "High School Teacher",
      category: "education",
      description: "Educate and inspire students in specific subject areas",
      salary: "$45,000 - $70,000",
      growth: "+4%",
      education: "Bachelor's degree + Teaching License",
      skills: ["Teaching", "Communication", "Patience"],
      trending: false,
    },
  ];

  const filteredCareers = careers.filter((career) => {
    const matchesSearch =
      career.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      career.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory =
      selectedCategory === "all" || career.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="p-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Career Explorer
        </h1>
        <p className="text-lg text-gray-600">
          Discover exciting career paths and learn what it takes to succeed in
          different fields.
        </p>
      </div>

      {/* Search and Filters */}
      <div className="mb-8">
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="flex-1">
            <Input
              placeholder="Search careers..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              leftIcon={<Search className="h-4 w-4 text-gray-400" />}
            />
          </div>
          <div className="flex items-center space-x-2">
            <Filter className="h-5 w-5 text-gray-400" />
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
            >
              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Career Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCareers.map((career) => (
          <Card
            key={career.id}
            className="hover:shadow-lg transition-all duration-200"
            padding="lg"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <div className="flex items-center mb-2">
                  <h3 className="text-lg font-semibold text-gray-900">
                    {career.title}
                  </h3>
                  {career.trending && (
                    <span className="ml-2 px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full flex items-center">
                      <TrendingUp className="h-3 w-3 mr-1" />
                      Trending
                    </span>
                  )}
                </div>
                <p className="text-sm text-gray-600 mb-4">
                  {career.description}
                </p>
              </div>
              <button className="text-gray-400 hover:text-yellow-500 transition-colors">
                <Star className="h-5 w-5" />
              </button>
            </div>

            <div className="space-y-3 mb-4">
              <div className="flex items-center text-sm">
                <DollarSign className="h-4 w-4 text-green-600 mr-2" />
                <span className="text-gray-700">{career.salary}</span>
              </div>
              <div className="flex items-center text-sm">
                <TrendingUp className="h-4 w-4 text-blue-600 mr-2" />
                <span className="text-gray-700">Growth: {career.growth}</span>
              </div>
              <div className="flex items-center text-sm">
                <Clock className="h-4 w-4 text-purple-600 mr-2" />
                <span className="text-gray-700">{career.education}</span>
              </div>
            </div>

            <div className="mb-4">
              <p className="text-sm font-medium text-gray-900 mb-2">
                Key Skills:
              </p>
              <div className="flex flex-wrap gap-2">
                {career.skills.map((skill, index) => (
                  <span
                    key={index}
                    className="px-2 py-1 bg-primary-100 text-primary-800 text-xs rounded-full"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            <Button variant="outline" size="sm" className="w-full">
              Learn More
            </Button>
          </Card>
        ))}
      </div>

      {filteredCareers.length === 0 && (
        <div className="text-center py-12">
          <div className="text-gray-400 mb-4">
            <Search className="h-12 w-12 mx-auto" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            No careers found
          </h3>
          <p className="text-gray-600">
            Try adjusting your search terms or filters.
          </p>
        </div>
      )}

      {/* Career Insights */}
      <div className="mt-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">
          Career Insights
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="text-center" padding="lg">
            <div className="text-3xl mb-4">📈</div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Fastest Growing
            </h3>
            <p className="text-sm text-gray-600">
              Technology and healthcare careers are experiencing the highest
              growth rates.
            </p>
          </Card>

          <Card className="text-center" padding="lg">
            <div className="text-3xl mb-4">💰</div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Highest Paying
            </h3>
            <p className="text-sm text-gray-600">
              STEM fields typically offer the highest starting salaries for new
              graduates.
            </p>
          </Card>

          <Card className="text-center" padding="lg">
            <div className="text-3xl mb-4">🎯</div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              In-Demand Skills
            </h3>
            <p className="text-sm text-gray-600">
              Problem-solving, communication, and digital literacy are valued
              across all fields.
            </p>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default CareerExplorer;
