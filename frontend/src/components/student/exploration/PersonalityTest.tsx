// PersonalityTest.tsx
import React, { useState } from "react";
import { Brain, Users, Eye, Lightbulb } from "lucide-react";
import Card from "../../shared/ui/Card";
import Button from "../../shared/ui/Button";

const PersonalityTest: React.FC = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [scores, setScores] = useState({
    E: 0,
    I: 0, // Extraversion vs Introversion
    S: 0,
    N: 0, // Sensing vs Intuition
    T: 0,
    F: 0, // Thinking vs Feeling
    J: 0,
    P: 0, // Judging vs Perceiving
  });
  const [showResults, setShowResults] = useState(false);

  const questions = [
    {
      text: "At a party, you are more likely to:",
      options: [
        { text: "Interact with many people", type: "E", points: 2 },
        { text: "Have deep conversations with a few", type: "I", points: 2 },
      ],
    },
    {
      text: "When learning something new, you prefer:",
      options: [
        { text: "Step-by-step instructions", type: "S", points: 2 },
        { text: "Understanding the big picture first", type: "N", points: 2 },
      ],
    },
    {
      text: "When making decisions, you rely more on:",
      options: [
        { text: "Logic and analysis", type: "T", points: 2 },
        { text: "Values and feelings", type: "F", points: 2 },
      ],
    },
    {
      text: "You prefer to:",
      options: [
        { text: "Plan things in advance", type: "J", points: 2 },
        { text: "Keep options open", type: "P", points: 2 },
      ],
    },
    {
      text: "You gain energy from:",
      options: [
        { text: "Being around people", type: "E", points: 1 },
        { text: "Spending time alone", type: "I", points: 1 },
      ],
    },
  ];

  const personalityTypes = {
    ENTJ: {
      name: "The Commander",
      description: "Natural leaders who are strategic and decisive",
    },
    ENTP: {
      name: "The Debater",
      description: "Innovative and clever, love intellectual challenges",
    },
    ENFJ: {
      name: "The Protagonist",
      description: "Inspiring leaders who care about helping others",
    },
    ENFP: {
      name: "The Campaigner",
      description: "Enthusiastic and creative, see life full of possibilities",
    },
    ESTJ: {
      name: "The Executive",
      description: "Efficient organizers who get things done",
    },
    ESTP: {
      name: "The Entrepreneur",
      description: "Bold and practical, masters of tools and techniques",
    },
    ESFJ: {
      name: "The Consul",
      description: "Caring and social, always ready to help",
    },
    ESFP: {
      name: "The Entertainer",
      description: "Spontaneous and enthusiastic, love life and people",
    },
    INTJ: {
      name: "The Architect",
      description: "Strategic thinkers with a plan for everything",
    },
    INTP: {
      name: "The Thinker",
      description: "Quiet and analytical, love theoretical concepts",
    },
    INFJ: {
      name: "The Advocate",
      description: "Creative and insightful, inspired and independent",
    },
    INFP: {
      name: "The Mediator",
      description: "Poetic and kind, always looking to help",
    },
    ISTJ: {
      name: "The Logistician",
      description: "Practical and reliable, get things done efficiently",
    },
    ISTP: {
      name: "The Virtuoso",
      description: "Bold and practical, masters of tools and techniques",
    },
    ISFJ: {
      name: "The Protector",
      description: "Warm and conscientious, always ready to protect loved ones",
    },
    ISFP: {
      name: "The Adventurer",
      description:
        "Flexible and charming, always ready to explore new possibilities",
    },
  };

  const handleAnswer = (type, points) => {
    setScores((prev) => ({
      ...prev,
      [type]: prev[type] + points,
    }));

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setShowResults(true);
    }
  };

  const getPersonalityType = () => {
    const type =
      (scores.E > scores.I ? "E" : "I") +
      (scores.S > scores.N ? "S" : "N") +
      (scores.T > scores.F ? "T" : "F") +
      (scores.J > scores.P ? "J" : "P");
    return type;
  };

  if (showResults) {
    const personalityType = getPersonalityType();
    const typeInfo = personalityTypes[personalityType];

    return (
      <div className="p-6 max-w-4xl mx-auto">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Your Personality Type
          </h1>
          <p className="text-gray-600">
            Based on Myers-Briggs Type Indicator principles
          </p>
        </div>

        <Card className="mb-8">
          <div className="text-center mb-6">
            <div className="text-6xl mb-4">🧠</div>
            <h2 className="text-3xl font-bold text-gray-900 mb-2">
              {personalityType}
            </h2>
            <h3 className="text-xl text-blue-600 mb-4">{typeInfo.name}</h3>
            <p className="text-gray-600">{typeInfo.description}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Your Preferences
              </h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span>Energy:</span>
                  <span className="font-medium">
                    {scores.E > scores.I ? "Extraversion" : "Introversion"}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span>Information:</span>
                  <span className="font-medium">
                    {scores.S > scores.N ? "Sensing" : "Intuition"}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span>Decisions:</span>
                  <span className="font-medium">
                    {scores.T > scores.F ? "Thinking" : "Feeling"}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span>Structure:</span>
                  <span className="font-medium">
                    {scores.J > scores.P ? "Judging" : "Perceiving"}
                  </span>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Career Suggestions
              </h3>
              <div className="space-y-2">
                <div className="p-3 bg-blue-50 rounded-lg">
                  <div className="font-medium text-blue-900">
                    Leadership Roles
                  </div>
                  <div className="text-sm text-blue-700">
                    Manager, Director, Team Lead
                  </div>
                </div>
                <div className="p-3 bg-green-50 rounded-lg">
                  <div className="font-medium text-green-900">
                    Analytical Roles
                  </div>
                  <div className="text-sm text-green-700">
                    Analyst, Researcher, Consultant
                  </div>
                </div>
                <div className="p-3 bg-purple-50 rounded-lg">
                  <div className="font-medium text-purple-900">
                    Creative Roles
                  </div>
                  <div className="text-sm text-purple-700">
                    Designer, Writer, Artist
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-8 text-center space-y-4">
            <Button
              onClick={() => {
                setShowResults(false);
                setCurrentQuestion(0);
                setScores({ E: 0, I: 0, S: 0, N: 0, T: 0, F: 0, J: 0, P: 0 });
              }}
            >
              Retake Test
            </Button>
            <Button variant="outline">Learn More About Your Type</Button>
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Personality Test
        </h1>
        <p className="text-gray-600">
          Discover your personality type and how it relates to your career
          choices
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
                onClick={() => handleAnswer(option.type, option.points)}
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

export default PersonalityTest;
