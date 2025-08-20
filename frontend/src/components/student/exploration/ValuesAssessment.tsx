// ValuesAssessment.tsx
import React, { useState } from "react";
import {
  Heart,
  Star,
  Users,
  Lightbulb,
  Shield,
  TrendingUp,
} from "lucide-react";
import Card from "../../shared/ui/Card";
import Button from "../../shared/ui/Button";

const ValuesAssessment: React.FC = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState({});
  const [showResults, setShowResults] = useState(false);

  const values = [
    {
      name: "Achievement",
      icon: "🏆",
      description: "Accomplishing goals and being successful",
    },
    {
      name: "Autonomy",
      icon: "🗽",
      description: "Having independence and freedom in work",
    },
    {
      name: "Creativity",
      icon: "🎨",
      description: "Being innovative and thinking outside the box",
    },
    {
      name: "Security",
      icon: "🛡️",
      description: "Having stability and predictability",
    },
    {
      name: "Service",
      icon: "🤝",
      description: "Helping others and making a difference",
    },
    {
      name: "Leadership",
      icon: "👑",
      description: "Guiding and influencing others",
    },
    {
      name: "Learning",
      icon: "📚",
      description: "Continuous growth and education",
    },
    {
      name: "Balance",
      icon: "⚖️",
      description: "Work-life harmony and well-being",
    },
  ];

  const questions = [
    {
      id: 1,
      text: "What motivates you most in your daily activities?",
      options: [
        { text: "Achieving personal goals", value: "achievement" },
        { text: "Helping others succeed", value: "service" },
        { text: "Learning new things", value: "learning" },
        { text: "Having creative freedom", value: "creativity" },
      ],
    },
    {
      id: 2,
      text: "In a perfect work environment, you would:",
      options: [
        { text: "Lead a team toward success", value: "leadership" },
        { text: "Work independently on projects", value: "autonomy" },
        { text: "Collaborate to solve problems", value: "service" },
        { text: "Have predictable routines", value: "security" },
      ],
    },
    {
      id: 3,
      text: "What brings you the most satisfaction?",
      options: [
        { text: "Mastering new skills", value: "learning" },
        { text: "Making a positive impact", value: "service" },
        { text: "Reaching ambitious targets", value: "achievement" },
        { text: "Maintaining work-life balance", value: "balance" },
      ],
    },
    {
      id: 4,
      text: "When facing a challenge, you prefer to:",
      options: [
        { text: "Find innovative solutions", value: "creativity" },
        { text: "Follow proven methods", value: "security" },
        { text: "Rally others to help", value: "leadership" },
        { text: "Take time to research", value: "learning" },
      ],
    },
    {
      id: 5,
      text: "Your ideal recognition would be:",
      options: [
        { text: "Public acknowledgment of achievements", value: "achievement" },
        { text: "Appreciation for helping others", value: "service" },
        { text: "Freedom to pursue interests", value: "autonomy" },
        { text: "Respect for creative contributions", value: "creativity" },
      ],
    },
  ];

  const handleAnswer = (value) => {
    setAnswers({ ...answers, [currentQuestion]: value });
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      calculateResults();
    }
  };

  const calculateResults = () => {
    setShowResults(true);
  };

  const getTopValues = () => {
    const valueCounts = {};
    Object.values(answers).forEach((value) => {
      valueCounts[value] = (valueCounts[value] || 0) + 1;
    });

    return Object.entries(valueCounts)
      .sort(([, a], [, b]) => b - a)
      .slice(0, 3)
      .map(([value]) => values.find((v) => v.name.toLowerCase() === value));
  };

  if (showResults) {
    const topValues = getTopValues();

    return (
      <div className="p-6 max-w-4xl mx-auto">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Your Core Values
          </h1>
          <p className="text-gray-600">
            Understanding what drives and motivates you
          </p>
        </div>

        <Card className="mb-8">
          <div className="text-center mb-6">
            <div className="text-6xl mb-4">🎯</div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              Assessment Complete!
            </h2>
            <p className="text-gray-600">Here are your top core values:</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {topValues.map((value, index) => (
              <Card
                key={index}
                className="text-center border-2 border-blue-200"
              >
                <div className="text-4xl mb-3">{value.icon}</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {value.name}
                </h3>
                <p className="text-gray-600">{value.description}</p>
              </Card>
            ))}
          </div>

          <div className="text-center space-y-4">
            <Button
              onClick={() => {
                setShowResults(false);
                setCurrentQuestion(0);
                setAnswers({});
              }}
            >
              Retake Assessment
            </Button>
            <Button variant="outline">Explore Career Matches</Button>
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Values Assessment
        </h1>
        <p className="text-gray-600">
          Discover what matters most to you in your career and life
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
                onClick={() => handleAnswer(option.value)}
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

export default ValuesAssessment;
