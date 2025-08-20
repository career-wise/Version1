// StudySkillsTrainer.tsx
import React, { useState } from "react";
import {
  Brain,
  Clock,
  BookOpen,
  CheckCircle,
  Play,
  Pause,
  RotateCcw,
} from "lucide-react";
import Card from "../../shared/ui/Card";
import Button from "../../shared/ui/Button";

const StudySkillsTrainer: React.FC = () => {
  const [activeTimer, setActiveTimer] = useState(null);
  const [timeLeft, setTimeLeft] = useState(25 * 60); // 25 minutes in seconds

  const studyTechniques = [
    {
      name: "Pomodoro Technique",
      description: "Study for 25 minutes, then take a 5-minute break",
      duration: "25 min",
      icon: "🍅",
      difficulty: "Beginner",
      effectiveness: 90,
    },
    {
      name: "Active Recall",
      description: "Test yourself on material without looking at notes",
      duration: "Variable",
      icon: "🧠",
      difficulty: "Intermediate",
      effectiveness: 95,
    },
    {
      name: "Spaced Repetition",
      description: "Review material at increasing intervals",
      duration: "Ongoing",
      icon: "📅",
      difficulty: "Advanced",
      effectiveness: 88,
    },
    {
      name: "Cornell Notes",
      description: "Structured note-taking system with cues and summary",
      duration: "During class",
      icon: "📝",
      difficulty: "Beginner",
      effectiveness: 85,
    },
  ];

  const studyHabits = [
    { habit: "Set specific study goals", completed: true },
    { habit: "Create a dedicated study space", completed: true },
    { habit: "Use active learning techniques", completed: false },
    { habit: "Take regular breaks", completed: true },
    { habit: "Review material regularly", completed: false },
    { habit: "Get adequate sleep", completed: true },
  ];

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs
      .toString()
      .padStart(2, "0")}`;
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Study Skills Trainer
        </h1>
        <p className="text-gray-600">
          Master effective study techniques and build better habits
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          {/* Pomodoro Timer */}
          <Card>
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              Pomodoro Timer
            </h2>
            <div className="text-center">
              <div className="text-6xl font-bold text-blue-600 mb-4">
                {formatTime(timeLeft)}
              </div>
              <div className="flex justify-center space-x-4">
                <Button>
                  <Play className="h-4 w-4 mr-2" />
                  Start
                </Button>
                <Button variant="outline">
                  <Pause className="h-4 w-4 mr-2" />
                  Pause
                </Button>
                <Button variant="outline">
                  <RotateCcw className="h-4 w-4 mr-2" />
                  Reset
                </Button>
              </div>
            </div>
          </Card>

          {/* Study Techniques */}
          <Card>
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              Study Techniques
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {studyTechniques.map((technique, index) => (
                <div key={index} className="p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center justify-between mb-3">
                    <div className="text-2xl">{technique.icon}</div>
                    <span className="text-sm text-gray-600">
                      {technique.difficulty}
                    </span>
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2">
                    {technique.name}
                  </h3>
                  <p className="text-sm text-gray-600 mb-3">
                    {technique.description}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-500">
                      {technique.duration}
                    </span>
                    <div className="flex items-center">
                      <span className="text-sm text-green-600 font-medium">
                        {technique.effectiveness}%
                      </span>
                      <span className="text-xs text-gray-500 ml-1">
                        effective
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          {/* Progress Tracking */}
          <Card>
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              This Week's Progress
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600 mb-1">18</div>
                <div className="text-sm text-gray-600">Study Sessions</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600 mb-1">
                  12h
                </div>
                <div className="text-sm text-gray-600">Total Time</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-600 mb-1">
                  85%
                </div>
                <div className="text-sm text-gray-600">Goal Achievement</div>
              </div>
            </div>
          </Card>
        </div>

        <div className="space-y-6">
          {/* Study Habits Checklist */}
          <Card>
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              Study Habits
            </h2>
            <div className="space-y-3">
              {studyHabits.map((item, index) => (
                <div key={index} className="flex items-center space-x-3">
                  <CheckCircle
                    className={`h-5 w-5 ${
                      item.completed ? "text-green-600" : "text-gray-300"
                    }`}
                  />
                  <span
                    className={`text-sm ${
                      item.completed ? "text-gray-900" : "text-gray-500"
                    }`}
                  >
                    {item.habit}
                  </span>
                </div>
              ))}
            </div>
          </Card>

          {/* Quick Tips */}
          <Card>
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              Today's Tip
            </h2>
            <div className="bg-blue-50 p-4 rounded-lg">
              <Brain className="h-6 w-6 text-blue-600 mb-2" />
              <h3 className="font-medium text-gray-900 mb-2">
                Use the Feynman Technique
              </h3>
              <p className="text-sm text-gray-600">
                Explain concepts in simple terms as if teaching someone else.
                This reveals gaps in understanding.
              </p>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default StudySkillsTrainer;
