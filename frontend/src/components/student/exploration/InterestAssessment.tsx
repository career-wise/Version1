// InterestAssessment.tsx
import React, { useState } from "react";
import { Heart, Zap, Users, Cog, Lightbulb, Shield } from "lucide-react";
import Card from "../../shared/ui/Card";
import Button from "../../shared/ui/Button";

const InterestAssessment: React.FC = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [scores, setScores] = useState({
    realistic: 0,
    investigative: 0,
    artistic: 0,
    social: 0,
    enterprising: 0,
    conventional: 0,
  });
  const [showResults, setShowResults] = useState(false);

  const questions = [
    {
      text: "Which activity sounds most appealing to you?",
      options: [
        {
          text: "Building or fixing things with your hands",
          type: "realistic",
          points: 3,
        },
        {
          text: "Conducting scientific experiments",
          type: "investigative",
          points: 3,
        },
        {
          text: "Creating art or writing stories",
          type: "artistic",
          points: 3,
        },
        { text: "Teaching or helping others", type: "social", points: 3 },
        { text: "Leading a team project", type: "enterprising", points: 3 },
        { text: "Organizing data and files", type: "conventional", points: 3 },
      ],
    },
    {
      text: "In your free time, you prefer to:",
      options: [
        { text: "Work on DIY projects", type: "realistic", points: 2 },
        { text: "Read science articles", type: "investigative", points: 2 },
        { text: "Visit museums or galleries", type: "artistic", points: 2 },
        { text: "Volunteer in your community", type: "social", points: 2 },
        { text: "Start new ventures", type: "enterprising", points: 2 },
        { text: "Plan and organize events", type: "conventional", points: 2 },
      ],
    },
    {
      text: "Your ideal work environment would be:",
      options: [
        { text: "Outdoors or in a workshop", type: "realistic", points: 2 },
        {
          text: "A laboratory or research facility",
          type: "investigative",
          points: 2,
        },
        { text: "A creative studio", type: "artistic", points: 2 },
        { text: "A school or community center", type: "social", points: 2 },
        { text: "A business office", type: "enterprising", points: 2 },
        {
          text: "A structured office setting",
          type: "conventional",
          points: 2,
        },
      ],
    },
    {
      text: "When solving problems, you tend to:",
      options: [
        {
          text: "Use practical, hands-on approaches",
          type: "realistic",
          points: 1,
        },
        {
          text: "Research and analyze thoroughly",
          type: "investigative",
          points: 1,
        },
        {
          text: "Think creatively and innovatively",
          type: "artistic",
          points: 1,
        },
        { text: "Consider the impact on people", type: "social", points: 1 },
        {
          text: "Focus on efficiency and results",
          type: "enterprising",
          points: 1,
        },
        {
          text: "Follow established procedures",
          type: "conventional",
          points: 1,
        },
      ],
    },
    {
      text: "Which subject did you enjoy most in school?",
      options: [
        { text: "Shop class or PE", type: "realistic", points: 2 },
        { text: "Science or Math", type: "investigative", points: 2 },
        { text: "Art or English", type: "artistic", points: 2 },
        { text: "Psychology or History", type: "social", points: 2 },
        { text: "Business or Economics", type: "enterprising", points: 2 },
        {
          text: "Accounting or Computer Science",
          type: "conventional",
          points: 2,
        },
      ],
    },
  ];

  const interestTypes = {
    realistic: {
      name: "Realistic (Doer)",
      icon: <Cog className="h-8 w-8 text-green-600" />,
      description: "You enjoy hands-on work and practical problem-solving",
      careers: ["Engineer", "Mechanic", "Carpenter", "Pilot"],
      traits: ["Practical", "Hands-on", "Problem-solver", "Independent"],
    },
    investigative: {
      name: "Investigative (Thinker)",
      icon: <Lightbulb className="h-8 w-8 text-blue-600" />,
      description: "You love to research, analyze, and solve complex problems",
      careers: ["Scientist", "Doctor", "Researcher", "Analyst"],
      traits: ["Analytical", "Curious", "Logical", "Detail-oriented"],
    },
    artistic: {
      name: "Artistic (Creator)",
      icon: <Heart className="h-8 w-8 text-purple-600" />,
      description: "You thrive in creative and expressive environments",
      careers: ["Artist", "Writer", "Designer", "Musician"],
      traits: ["Creative", "Expressive", "Original", "Intuitive"],
    },
    social: {
      name: "Social (Helper)",
      icon: <Users className="h-8 w-8 text-orange-600" />,
      description: "You enjoy helping and working with people",
      careers: ["Teacher", "Counselor", "Social Worker", "Nurse"],
      traits: ["Helpful", "Empathetic", "Cooperative", "Understanding"],
    },
    enterprising: {
      name: "Enterprising (Persuader)",
      icon: <Zap className="h-8 w-8 text-red-600" />,
      description: "You like to lead, manage, and influence others",
      careers: ["Manager", "Entrepreneur", "Lawyer", "Sales Rep"],
      traits: ["Leadership", "Ambitious", "Competitive", "Confident"],
    },
    conventional: {
      name: "Conventional (Organizer)",
      icon: <Shield className="h-8 w-8 text-indigo-600" />,
      description: "You prefer structured work and attention to detail",
      careers: ["Accountant", "Administrator", "Banker", "Secretary"],
      traits: ["Organized", "Detailed", "Reliable", "Systematic"],
    },
  };

  const handleAnswer = (option) => {
    setScores((prev) => ({
      ...prev,
      [option.type]: prev[option.type] + option.points,
    }));

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setShowResults(true);
    }
  };

  const getTopInterests = () => {
    return Object.entries(scores)
      .sort(([, a], [, b]) => b - a)
      .slice(0, 3)
      .map(([type]) => type);
  };

  if (showResults) {
    const topInterests = getTopInterests();

    return (
      <div className="p-6 max-w-6xl mx-auto">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Your Interest Profile
          </h1>
          <p className="text-gray-600">
            Based on Holland's Career Interest Theory
          </p>
        </div>

        <Card className="mb-8">
          <div className="text-center mb-6">
            <div className="text-6xl mb-4">🎯</div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              Assessment Complete!
            </h2>
            <p className="text-gray-600">Here are your top interest areas:</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {topInterests.map((type, index) => {
              const interest = interestTypes[type];
              return (
                <Card
                  key={type}
                  className="text-center border-2 border-blue-200"
                >
                  <div className="mb-4">{interest.icon}</div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    {interest.name}
                  </h3>
                  <p className="text-gray-600 mb-4">{interest.description}</p>

                  <div className="mb-4">
                    <h4 className="font-medium text-gray-900 mb-2">
                      Sample Careers:
                    </h4>
                    <div className="flex flex-wrap justify-center gap-1">
                      {interest.careers.map((career, idx) => (
                        <span
                          key={idx}
                          className="px-2 py-1 bg-blue-100 text-blue-800 rounded text-xs"
                        >
                          {career}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h4 className="font-medium text-gray-900 mb-2">
                      Key Traits:
                    </h4>
                    <div className="flex flex-wrap justify-center gap-1">
                      {interest.traits.map((trait, idx) => (
                        <span
                          key={idx}
                          className="px-2 py-1 bg-green-100 text-green-800 rounded text-xs"
                        >
                          {trait}
                        </span>
                      ))}
                    </div>
                  </div>
                </Card>
              );
            })}
          </div>

          <div className="text-center space-y-4">
            <Button
              onClick={() => {
                setShowResults(false);
                setCurrentQuestion(0);
                setScores({
                  realistic: 0,
                  investigative: 0,
                  artistic: 0,
                  social: 0,
                  enterprising: 0,
                  conventional: 0,
                });
              }}
            >
              Retake Assessment
            </Button>
            <Button variant="outline">Explore Career Matches</Button>
          </div>
        </Card>

        {/* Complete Results */}
        <Card>
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Complete Interest Profile
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {Object.entries(scores).map(([type, score]) => {
              const interest = interestTypes[type];
              return (
                <div key={type} className="p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center space-x-3 mb-2">
                    {interest.icon}
                    <div>
                      <h4 className="font-medium text-gray-900">
                        {interest.name}
                      </h4>
                      <div className="text-sm text-gray-600">
                        {score} points
                      </div>
                    </div>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-blue-600 h-2 rounded-full"
                      style={{
                        width: `${
                          (score / Math.max(...Object.values(scores))) * 100
                        }%`,
                      }}
                    ></div>
                  </div>
                </div>
              );
            })}
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Interest Assessment
        </h1>
        <p className="text-gray-600">
          Discover your career interests and find matching career paths
        </p>
      </div>

      <Card>
        <div className="mb-6">
          <div className="flex justify-between items-center mb-4">
            <span className="text-sm text-gray-600">
              Question {currentQuestion + 1} of {questions.length}
            </span>
            <div className="w-32 bg-gray-200 rounded-full h-2">
              <div
                className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                style={{
                  width: `${((currentQuestion + 1) / questions.length) * 100}%`,
                }}
              ></div>
            </div>
          </div>

          <h2 className="text-xl font-semibold text-gray-900 mb-6">
            {questions[currentQuestion].text}
          </h2>

          <div className="space-y-3">
            {questions[currentQuestion].options.map((option, index) => (
              <button
                key={index}
                onClick={() => handleAnswer(option)}
                className="w-full text-left p-4 border-2 border-gray-200 rounded-lg hover:border-blue-300 hover:bg-blue-50 transition-all duration-200"
              >
                {option.text}
              </button>
            ))}
          </div>
        </div>
      </Card>
    </div>
  );
};

export default InterestAssessment;
