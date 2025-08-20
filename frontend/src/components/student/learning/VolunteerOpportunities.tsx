// VolunteerOpportunities.tsx
import React from "react";
import { Heart, Users, MapPin, Clock } from "lucide-react";
import Card from "../../shared/ui/Card";
import Button from "../../shared/ui/Button";

const VolunteerOpportunities: React.FC = () => {
  const opportunities = [
    {
      title: "Local Animal Shelter Helper",
      organization: "City Animal Rescue",
      location: "Downtown",
      timeCommitment: "3-4 hours/week",
      description: "Help care for animals and assist with adoption events",
      skills: ["Animal Care", "Customer Service", "Teamwork"],
      icon: "🐕",
    },
    {
      title: "Elementary School Tutor",
      organization: "Community Learning Center",
      location: "Various Schools",
      timeCommitment: "2-3 hours/week",
      description: "Provide academic support to elementary students",
      skills: ["Teaching", "Patience", "Communication"],
      icon: "📚",
    },
    {
      title: "Environmental Cleanup Volunteer",
      organization: "Green Earth Initiative",
      location: "Local Parks",
      timeCommitment: "Weekend Events",
      description: "Participate in community cleanup and conservation efforts",
      skills: ["Environmental Awareness", "Teamwork", "Physical Activity"],
      icon: "🌱",
    },
  ];

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Volunteer Opportunities
        </h1>
        <p className="text-gray-600">
          Give back to your community while building valuable skills
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {opportunities.map((opportunity, index) => (
          <Card
            key={index}
            className="hover:shadow-lg transition-all duration-200"
          >
            <div className="mb-4">
              <div className="text-3xl mb-3">{opportunity.icon}</div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                {opportunity.title}
              </h3>
              <p className="text-gray-600 mb-4">{opportunity.description}</p>

              <div className="space-y-2 mb-4">
                <div className="flex items-center text-sm text-gray-600">
                  <Users className="h-4 w-4 mr-2" />
                  {opportunity.organization}
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <MapPin className="h-4 w-4 mr-2" />
                  {opportunity.location}
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <Clock className="h-4 w-4 mr-2" />
                  {opportunity.timeCommitment}
                </div>
              </div>

              <div className="mb-6">
                <h4 className="font-medium text-gray-900 mb-2">
                  Skills You'll Gain:
                </h4>
                <div className="flex flex-wrap gap-1">
                  {opportunity.skills.map((skill, skillIndex) => (
                    <span
                      key={skillIndex}
                      className="px-2 py-1 bg-green-100 text-green-800 rounded text-xs"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              <Button className="w-full" size="sm">
                Apply to Volunteer
              </Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default VolunteerOpportunities;
