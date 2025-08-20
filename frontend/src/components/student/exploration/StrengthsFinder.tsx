// StrengthsFinder.tsx
import React, { useState } from "react";
import { Star, Zap, Heart, Users, Target } from "lucide-react";
import Card from "../../shared/ui/Card";
import Button from "../../shared/ui/Button";

const StrengthsFinder: React.FC = () => {
  const [selectedStrengths, setSelectedStrengths] = useState([]);
  const [showResults, setShowResults] = useState(false);

  const strengthCategories = {
    Executing: {
      color: "bg-blue-100 text-blue-800",
      icon: <Target className="h-5 w-5" />,
      strengths: [
        {
          name: "Achiever",
          description: "You work hard and possess great stamina",
        },
        {
          name: "Arranger",
          description: "You organize and coordinate resources effectively",
        },
        {
          name: "Belief",
          description: "You have core values that are enduring and unchanging",
        },
        {
          name: "Consistency",
          description: "You treat people fairly with clear rules",
        },
        {
          name: "Deliberative",
          description: "You make careful choices and decisions",
        },
        {
          name: "Discipline",
          description: "You structure your world to be predictable",
        },
        {
          name: "Focus",
          description: "You prioritize and follow through on goals",
        },
        {
          name: "Responsibility",
          description: "You take ownership of what you say you will do",
        },
        {
          name: "Restorative",
          description: "You solve problems and bring things back to life",
        },
      ],
    },
    Influencing: {
      color: "bg-orange-100 text-orange-800",
      icon: <Zap className="h-5 w-5" />,
      strengths: [
        { name: "Activator", description: "You turn thoughts into action" },
        { name: "Command", description: "You take charge and make decisions" },
        {
          name: "Communication",
          description: "You express yourself well and engage others",
        },
        {
          name: "Competition",
          description: "You measure success against others",
        },
        {
          name: "Maximizer",
          description: "You focus on excellence, not just achievement",
        },
        {
          name: "Self-Assurance",
          description: "You have confidence in your abilities",
        },
        {
          name: "Significance",
          description: "You want to make an important impact",
        },
        { name: "Woo", description: "You win others over and build networks" },
      ],
    },
    "Relationship Building": {
      color: "bg-green-100 text-green-800",
      icon: <Heart className="h-5 w-5" />,
      strengths: [
        {
          name: "Adaptability",
          description: "You live in the moment and adjust easily",
        },
        {
          name: "Developer",
          description: "You see potential in others and help them grow",
        },
        {
          name: "Connectedness",
          description: "You see links and connections between things",
        },
        { name: "Empathy", description: "You understand others' emotions" },
        { name: "Harmony", description: "You seek areas of agreement" },
        { name: "Includer", description: "You bring others into the group" },
        {
          name: "Individualization",
          description: "You see each person's unique qualities",
        },
        {
          name: "Positivity",
          description: "You have enthusiasm that is contagious",
        },
        {
          name: "Relator",
          description: "You build close relationships with others",
        },
      ],
    },
    "Strategic Thinking": {
      color: "bg-purple-100 text-purple-800",
      icon: <Users className="h-5 w-5" />,
      strengths: [
        {
          name: "Analytical",
          description: "You search for reasons and causes",
        },
        {
          name: "Context",
          description: "You look to the past to understand the present",
        },
        {
          name: "Futuristic",
          description: "You see and inspire others with your vision",
        },
        {
          name: "Ideation",
          description: "You are fascinated by ideas and connections",
        },
        { name: "Input", description: "You collect information and resources" },
        {
          name: "Intellection",
          description: "You enjoy thinking and mental activity",
        },
        {
          name: "Learner",
          description: "You love to learn and continuously improve",
        },
        {
          name: "Strategic",
          description: "You create alternative ways to proceed",
        },
      ],
    },
  };

  const handleStrengthToggle = (categoryName, strength) => {
    const strengthId = `${categoryName}-${strength.name}`;

    if (selectedStrengths.find((s) => s.id === strengthId)) {
      setSelectedStrengths(
        selectedStrengths.filter((s) => s.id !== strengthId)
      );
    } else if (selectedStrengths.length < 5) {
      setSelectedStrengths([
        ...selectedStrengths,
        {
          id: strengthId,
          category: categoryName,
          ...strength,
        },
      ]);
    }
  };

  const isSelected = (categoryName, strengthName) => {
    return selectedStrengths.some(
      (s) => s.id === `${categoryName}-${strengthName}`
    );
  };

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Strengths Finder
        </h1>
        <p className="text-gray-600">
          Identify your top strengths to understand how you can best contribute
          to teams and achieve success
        </p>
      </div>

      {!showResults ? (
        <>
          <Card className="mb-6">
            <div className="text-center mb-6">
              <Star className="h-12 w-12 text-yellow-500 mx-auto mb-4" />
              <h2 className="text-xl font-semibold text-gray-900 mb-2">
                Select Your Top 5 Strengths
              </h2>
              <p className="text-gray-600">
                Choose the strengths that best describe you. Selected:{" "}
                {selectedStrengths.length}/5
              </p>
            </div>
          </Card>

          <div className="space-y-8">
            {Object.entries(strengthCategories).map(
              ([categoryName, category]) => (
                <Card key={categoryName}>
                  <div className="flex items-center space-x-3 mb-4">
                    <div className={`p-2 rounded-lg ${category.color}`}>
                      {category.icon}
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900">
                      {categoryName}
                    </h3>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                    {category.strengths.map((strength) => (
                      <button
                        key={strength.name}
                        onClick={() =>
                          handleStrengthToggle(categoryName, strength)
                        }
                        disabled={
                          !isSelected(categoryName, strength.name) &&
                          selectedStrengths.length >= 5
                        }
                        className={`p-4 text-left border-2 rounded-lg transition-all duration-200 ${
                          isSelected(categoryName, strength.name)
                            ? "border-blue-500 bg-blue-50"
                            : "border-gray-200 hover:border-gray-300"
                        } ${
                          !isSelected(categoryName, strength.name) &&
                          selectedStrengths.length >= 5
                            ? "opacity-50 cursor-not-allowed"
                            : "cursor-pointer"
                        }`}
                      >
                        <div className="flex items-start justify-between">
                          <div>
                            <h4 className="font-medium text-gray-900 mb-1">
                              {strength.name}
                            </h4>
                            <p className="text-sm text-gray-600">
                              {strength.description}
                            </p>
                          </div>
                          {isSelected(categoryName, strength.name) && (
                            <Star className="h-5 w-5 text-blue-500 fill-current" />
                          )}
                        </div>
                      </button>
                    ))}
                  </div>
                </Card>
              )
            )}
          </div>

          <div className="mt-8 text-center">
            <Button
              onClick={() => setShowResults(true)}
              disabled={selectedStrengths.length === 0}
              size="lg"
            >
              View My Strengths Profile ({selectedStrengths.length}/5)
            </Button>
          </div>
        </>
      ) : (
        <div className="space-y-6">
          <Card>
            <div className="text-center mb-6">
              <div className="text-6xl mb-4">💪</div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                Your Top Strengths
              </h2>
              <p className="text-gray-600">
                These are your key areas of natural talent
              </p>
            </div>

            <div className="space-y-4">
              {selectedStrengths.map((strength, index) => (
                <div key={strength.id} className="p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-start space-x-4">
                    <div className="text-2xl font-bold text-blue-600 w-8">
                      {index + 1}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <h3 className="text-lg font-semibold text-gray-900">
                          {strength.name}
                        </h3>
                        <span
                          className={`px-2 py-1 rounded-full text-xs font-medium ${
                            strengthCategories[strength.category].color
                          }`}
                        >
                          {strength.category}
                        </span>
                      </div>
                      <p className="text-gray-600">{strength.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8 text-center space-y-4">
              <Button
                onClick={() => {
                  setShowResults(false);
                  setSelectedStrengths([]);
                }}
              >
                Retake Assessment
              </Button>
              <Button variant="outline">Find Career Matches</Button>
            </div>
          </Card>

          <Card>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              How to Use Your Strengths
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-medium text-gray-900 mb-3">
                  In Academics:
                </h4>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li>• Focus on subjects that align with your strengths</li>
                  <li>• Use your natural talents in group projects</li>
                  <li>• Seek leadership roles that leverage your abilities</li>
                  <li>• Find study methods that work with your strengths</li>
                </ul>
              </div>
              <div>
                <h4 className="font-medium text-gray-900 mb-3">
                  In Future Careers:
                </h4>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li>• Look for roles that utilize your top strengths</li>
                  <li>• Consider team positions that complement others</li>
                  <li>• Develop your strengths further through practice</li>
                  <li>• Share your strengths profile with mentors</li>
                </ul>
              </div>
            </div>
          </Card>
        </div>
      )}
    </div>
  );
};

export default StrengthsFinder;
