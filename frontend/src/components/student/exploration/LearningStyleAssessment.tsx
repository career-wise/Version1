// LearningStyleAssessment.tsx
import React, { useState } from "react";
import { Eye, Ear, Users, BookOpen, Brain, Lightbulb } from "lucide-react";
import Card from "../../shared/ui/Card";
import Button from "../../shared/ui/Button";

const LearningStyleAssessment: React.FC = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [scores, setScores] = useState({
    visual: 0,
    auditory: 0,
    kinesthetic: 0,
    reading: 0,
  });
  const [showResults, setShowResults] = useState(false);

  const questions = [
    {
      question: "When learning something new, I prefer to:",
      options: [
        { text: "See diagrams and charts", style: "visual", points: 3 },
        { text: "Listen to explanations", style: "auditory", points: 3 },
        { text: "Practice hands-on", style: "kinesthetic", points: 3 },
        { text: "Read detailed instructions", style: "reading", points: 3 },
      ],
    },
    {
      question: "I remember information best when:",
      options: [
        { text: "I can visualize it", style: "visual", points: 2 },
        { text: "I hear it repeatedly", style: "auditory", points: 2 },
        { text: "I write it down", style: "reading", points: 2 },
        { text: "I use it practically", style: "kinesthetic", points: 2 },
      ],
    },
    {
      question: "During a presentation, I focus most on:",
      options: [
        { text: "Visual aids and slides", style: "visual", points: 3 },
        { text: "The speaker's voice", style: "auditory", points: 3 },
        { text: "Taking detailed notes", style: "reading", points: 3 },
        { text: "Interactive demonstrations", style: "kinesthetic", points: 3 },
      ],
    },
    {
      question: "When studying, I like to:",
      options: [
        { text: "Use highlighters and colors", style: "visual", points: 2 },
        { text: "Read aloud or discuss", style: "auditory", points: 2 },
        { text: "Take breaks to move around", style: "kinesthetic", points: 2 },
        { text: "Make detailed outlines", style: "reading", points: 2 },
      ],
    },
    {
      question: "I learn best in environments that are:",
      options: [
        { text: "Visually organized", style: "visual", points: 1 },
        { text: "Quiet for listening", style: "auditory", points: 1 },
        { text: "Allow movement", style: "kinesthetic", points: 1 },
        { text: "Have good reading materials", style: "reading", points: 1 },
      ],
    },
  ];

  const learningStyles = {
    visual: {
      name: "Visual Learner",
      icon: <Eye className="h-8 w-8 text-blue-600" />,
      description: "You learn best through seeing and visualizing information",
      strategies: [
        "Use mind maps and diagrams",
        "Highlight key information with colors",
        "Watch educational videos",
        "Create visual study guides",
      ],
      careers: [
        "Graphic Designer",
        "Architect",
        "Art Director",
        "Web Developer",
      ],
    },
    auditory: {
      name: "Auditory Learner",
      icon: <Ear className="h-8 w-8 text-green-600" />,
      description: "You learn best through listening and verbal instruction",
      strategies: [
        "Record and replay lectures",
        "Study with background music",
        "Join study groups for discussion",
        "Read materials aloud",
      ],
      careers: ["Teacher", "Musician", "Radio Host", "Counselor"],
    },
    kinesthetic: {
      name: "Kinesthetic Learner",
      icon: <Users className="h-8 w-8 text-purple-600" />,
      description: "You learn best through hands-on experience and movement",
      strategies: [
        "Use hands-on activities",
        "Take frequent study breaks",
        "Build models or prototypes",
        "Study while walking",
      ],
      careers: ["Engineer", "Chef", "Physical Therapist", "Mechanic"],
    },
    reading: {
      name: "Reading/Writing Learner",
      icon: <BookOpen className="h-8 w-8 text-orange-600" />,
      description: "You learn best through reading and writing activities",
      strategies: [
        "Take detailed notes",
        "Create written summaries",
        "Use lists and outlines",
        "Read multiple sources",
      ],
      careers: ["Writer", "Lawyer", "Researcher", "Editor"],
    },
  };

  const handleAnswer = (style, points) => {
    setScores((prev) => ({
      ...prev,
      [style]: prev[style] + points,
    }));

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setShowResults(true);
    }
  };

  const getPrimaryStyle = () => {
    return Object.entries(scores).reduce((a, b) =>
      scores[a[0]] > scores[b[0]] ? a : b
    )[0];
  };

  if (showResults) {
    const primaryStyle = getPrimaryStyle();
    const styleInfo = learningStyles[primaryStyle];

    return (
      <div className="p-6 max-w-4xl mx-auto">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Your Learning Style
          </h1>
          <p className="text-gray-600">
            Discover how you learn best and optimize your study methods
          </p>
        </div>

        <Card className="mb-8">
          <div className="text-center mb-6">
            <div className="mb-4">{styleInfo.icon}</div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              {styleInfo.name}
            </h2>
            <p className="text-gray-600">{styleInfo.description}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Study Strategies
              </h3>
              <ul className="space-y-2">
                {styleInfo.strategies.map((strategy, index) => (
                  <li key={index} className="flex items-center space-x-2">
                    <Lightbulb className="h-4 w-4 text-yellow-500" />
                    <span className="text-gray-700">{strategy}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Career Matches
              </h3>
              <div className="flex flex-wrap gap-2">
                {styleInfo.careers.map((career, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm"
                  >
                    {career}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-8 text-center space-y-4">
            <Button
              onClick={() => {
                setShowResults(false);
                setCurrentQuestion(0);
                setScores({
                  visual: 0,
                  auditory: 0,
                  kinesthetic: 0,
                  reading: 0,
                });
              }}
            >
              Retake Assessment
            </Button>
            <Button variant="outline">Create Study Plan</Button>
          </div>
        </Card>

        {/* All Scores */}
        <Card>
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Complete Results
          </h3>
          <div className="space-y-4">
            {Object.entries(scores).map(([style, score]) => (
              <div key={style}>
                <div className="flex justify-between mb-1">
                  <span className="text-sm font-medium text-gray-700">
                    {learningStyles[style].name}
                  </span>
                  <span className="text-sm text-gray-600">{score} points</span>
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
            ))}
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Learning Style Assessment
        </h1>
        <p className="text-gray-600">
          Discover your preferred learning style to optimize your study methods
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
            {questions[currentQuestion].question}
          </h2>

          <div className="space-y-3">
            {questions[currentQuestion].options.map((option, index) => (
              <button
                key={index}
                onClick={() => handleAnswer(option.style, option.points)}
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

export default LearningStyleAssessment;
