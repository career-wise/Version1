// CollegeComparisonTool.tsx
import React, { useState } from "react";
import { Plus, X, Check } from "lucide-react";
import Card from "../../shared/ui/Card";
import Button from "../../shared/ui/Button";

const CollegeComparisonTool: React.FC = () => {
  const [selectedColleges] = useState([
    {
      name: "Stanford University",
      tuition: "$56,169",
      acceptance: "4%",
      ranking: 6,
      satRange: "1470-1570",
      location: "Stanford, CA",
      enrollment: "17,249",
    },
    {
      name: "UC Berkeley",
      tuition: "$14,253",
      acceptance: "17%",
      ranking: 22,
      satRange: "1330-1530",
      location: "Berkeley, CA",
      enrollment: "45,057",
    },
  ]);

  const criteria = [
    "Tuition & Fees",
    "Acceptance Rate",
    "National Ranking",
    "SAT Range",
    "Location",
    "Total Enrollment",
  ];

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          College Comparison
        </h1>
        <p className="text-gray-600">
          Compare colleges side by side to make informed decisions
        </p>
      </div>

      <Card>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-4 px-4">Criteria</th>
                {selectedColleges.map((college, index) => (
                  <th key={index} className="text-left py-4 px-4 min-w-[200px]">
                    {college.name}
                  </th>
                ))}
                <th className="py-4 px-4">
                  <Button variant="outline" size="sm">
                    <Plus className="h-4 w-4 mr-2" />
                    Add College
                  </Button>
                </th>
              </tr>
            </thead>
            <tbody>
              {criteria.map((criterion, index) => (
                <tr key={index} className="border-b border-gray-100">
                  <td className="py-3 px-4 font-medium text-gray-900">
                    {criterion}
                  </td>
                  {selectedColleges.map((college, collegeIndex) => (
                    <td key={collegeIndex} className="py-3 px-4 text-gray-700">
                      {criterion === "Tuition & Fees" && college.tuition}
                      {criterion === "Acceptance Rate" && college.acceptance}
                      {criterion === "National Ranking" &&
                        `#${college.ranking}`}
                      {criterion === "SAT Range" && college.satRange}
                      {criterion === "Location" && college.location}
                      {criterion === "Total Enrollment" && college.enrollment}
                    </td>
                  ))}
                  <td className="py-3 px-4"></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
};

export default CollegeComparisonTool;
