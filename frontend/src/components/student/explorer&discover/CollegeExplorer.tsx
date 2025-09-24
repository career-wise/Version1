// CollegeExplorer.tsx
import React, { useState } from "react";
import {
  Search,
  MapPin,
  Users,
  DollarSign,
  Star,
  GraduationCap,
} from "lucide-react";
import Card from "../../shared/ui/Card";
import Button from "../../shared/ui/Button";
import Input from "../../shared/ui/Input";

const CollegeExplorer: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const colleges = [
    {
      id: 1,
      name: "Stanford University",
      location: "Stanford, CA",
      type: "Private",
      ranking: 6,
      acceptance: "4%",
      tuition: "$56,169",
      enrollment: "17,249",
      satRange: "1470-1570",
      programs: ["Computer Science", "Engineering", "Business", "Medicine"],
      image: "🏛️",
    },
    {
      id: 2,
      name: "University of California, Berkeley",
      location: "Berkeley, CA",
      type: "Public",
      ranking: 22,
      acceptance: "17%",
      tuition: "$14,253 (in-state)",
      enrollment: "45,057",
      satRange: "1330-1530",
      programs: ["Engineering", "Computer Science", "Business", "Liberal Arts"],
      image: "🐻",
    },
    {
      id: 3,
      name: "Massachusetts Institute of Technology",
      location: "Cambridge, MA",
      type: "Private",
      ranking: 2,
      acceptance: "7%",
      tuition: "$53,790",
      enrollment: "11,934",
      satRange: "1510-1570",
      programs: ["Engineering", "Computer Science", "Physics", "Mathematics"],
      image: "🔬",
    },
  ];

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          College Explorer
        </h1>
        <p className="text-gray-600">
          Discover colleges that match your academic goals and preferences
        </p>
      </div>

      <div className="mb-6">
        <Input
          placeholder="Search colleges..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          leftIcon={<Search className="h-4 w-4 text-gray-400" />}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {colleges.map((college) => (
          <Card
            key={college.id}
            className="hover:shadow-lg transition-all duration-200"
          >
            <div className="mb-4">
              <div className="flex items-center justify-between mb-3">
                <div className="text-3xl">{college.image}</div>
                <div className="text-right">
                  <div className="text-sm text-gray-600">Ranking</div>
                  <div className="font-bold text-blue-600">
                    #{college.ranking}
                  </div>
                </div>
              </div>

              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                {college.name}
              </h3>

              <div className="space-y-2 mb-4">
                <div className="flex items-center text-sm text-gray-600">
                  <MapPin className="h-4 w-4 mr-2" />
                  {college.location} • {college.type}
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <Users className="h-4 w-4 mr-2" />
                  {college.enrollment} students
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <DollarSign className="h-4 w-4 mr-2" />
                  {college.tuition}
                </div>
              </div>

              <div className="mb-4">
                <div className="text-sm text-gray-600 mb-1">
                  Acceptance Rate: {college.acceptance}
                </div>
                <div className="text-sm text-gray-600 mb-1">
                  SAT Range: {college.satRange}
                </div>
              </div>

              <div className="mb-4">
                <h4 className="text-sm font-medium text-gray-900 mb-2">
                  Popular Programs:
                </h4>
                <div className="flex flex-wrap gap-1">
                  {college.programs.slice(0, 3).map((program, index) => (
                    <span
                      key={index}
                      className="px-2 py-1 bg-blue-100 text-blue-800 rounded text-xs"
                    >
                      {program}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex space-x-2">
                <Button variant="primary" size="sm" className="flex-1">
                  Learn More
                </Button>
                <Button variant="outline" size="sm">
                  <Star className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default CollegeExplorer;
