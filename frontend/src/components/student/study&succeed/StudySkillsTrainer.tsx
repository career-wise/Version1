import React, { useState } from "react";
import {
  Brain,
  Clock,
  BookOpen,
  CheckCircle,
  Play,
  Pause,
  RotateCcw,
  Target,
  TrendingUp,
  Award,
  Calendar,
  Star,
  Lightbulb,
  Timer,
  Coffee,
  Focus,
} from "lucide-react";
import Card from "../../shared/ui/Card";
import Button from "../../shared/ui/Button";

const StudySkillsTrainer: React.FC = () => {
  const [activeTimer, setActiveTimer] = useState<string | null>(null);
  const [timeLeft, setTimeLeft] = useState(25 * 60); // 25 minutes in seconds
  const [isRunning, setIsRunning] = useState(false);
  const [selectedTechnique, setSelectedTechnique] = useState<string | null>(null);

  const studyTechniques = [
    {
      id: "pomodoro",
      name: "Pomodoro Technique",
      description: "Study for 25 minutes, then take a 5-minute break",
      duration: "25 min",
      icon: "🍅",
      difficulty: "Beginner",
      effectiveness: 90,
      steps: [
        "Set timer for 25 minutes",
        "Focus on one task completely",
        "Take a 5-minute break",
        "Repeat 3-4 times, then longer break"
      ]
    },
    {
      id: "active-recall",
      name: "Active Recall",
      description: "Test yourself on material without looking at notes",
      duration: "Variable",
      icon: "🧠",
      difficulty: "Intermediate",
      effectiveness: 95,
      steps: [
        "Read material once",
        "Close your notes",
        "Write down everything you remember",
        "Check and fill gaps"
      ]
    },
    {
      id: "spaced-repetition",
      name: "Spaced Repetition",
      description: "Review material at increasing intervals",
      duration: "Ongoing",
      icon: "📅",
      difficulty: "Advanced",
      effectiveness: 88,
      steps: [
        "Review material today",
        "Review again in 3 days",
        "Review again in 1 week",
        "Review again in 2 weeks"
      ]
    },
    {
      id: "cornell-notes",
      name: "Cornell Notes",
      description: "Structured note-taking system with cues and summary",
      duration: "During class",
      icon: "📝",
      difficulty: "Beginner",
      effectiveness: 85,
      steps: [
        "Divide page into 3 sections",
        "Take notes in main area",
        "Add cues in left margin",
        "Summarize at bottom"
      ]
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

  const weeklyStats = [
    { label: "Study Sessions", value: 18, target: 20, icon: Target },
    { label: "Total Hours", value: 12, target: 15, icon: Clock },
    { label: "Techniques Used", value: 3, target: 4, icon: Brain },
    { label: "Goal Achievement", value: 85, target: 90, icon: TrendingUp },
  ];

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs
      .toString()
      .padStart(2, "0")}`;
  };

  const startTimer = () => {
    setIsRunning(true);
    // In a real app, you'd implement the actual timer logic here
  };

  const pauseTimer = () => {
    setIsRunning(false);
  };

  const resetTimer = () => {
    setIsRunning(false);
    setTimeLeft(25 * 60);
  };

  const selectTechnique = (techniqueId: string) => {
    setSelectedTechnique(selectedTechnique === techniqueId ? null : techniqueId);
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

      {/* Weekly Progress */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        {weeklyStats.map((stat, index) => (
          <Card key={index} className="text-center">
            <div className="flex items-center justify-center mb-3">
              <stat.icon className="h-8 w-8 text-primary-600" />
            </div>
            <div className="text-2xl font-bold text-gray-900 mb-1">
              {stat.value}{typeof stat.value === 'number' && stat.label === 'Goal Achievement' ? '%' : ''}
            </div>
            <div className="text-sm text-gray-600 mb-2">{stat.label}</div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-primary-500 h-2 rounded-full transition-all duration-300"
                style={{ width: `${(stat.value / stat.target) * 100}%` }}
              ></div>
            </div>
            <div className="text-xs text-gray-500 mt-1">
              Target: {stat.target}{typeof stat.target === 'number' && stat.label === 'Goal Achievement' ? '%' : ''}
            </div>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          {/* Pomodoro Timer */}
          <Card>
            <h2 className="text-xl font-semibold text-gray-900 mb-6 flex items-center">
              <Timer className="h-6 w-6 text-red-500 mr-2" />
              Pomodoro Timer
            </h2>
            <div className="text-center">
              <div className="relative inline-block mb-6">
                <div className="w-48 h-48 bg-gradient-to-br from-red-100 to-orange-100 rounded-full flex items-center justify-center mx-auto shadow-lg">
                  <div className="text-6xl font-bold text-red-600">
                    {formatTime(timeLeft)}
                  </div>
                </div>
                {isRunning && (
                  <div className="absolute inset-0 border-4 border-red-500 rounded-full animate-pulse"></div>
                )}
              </div>
              
              <div className="flex justify-center space-x-4 mb-4">
                <Button onClick={startTimer} disabled={isRunning}>
                  <Play className="h-4 w-4 mr-2" />
                  Start
                </Button>
                <Button variant="outline" onClick={pauseTimer} disabled={!isRunning}>
                  <Pause className="h-4 w-4 mr-2" />
                  Pause
                </Button>
                <Button variant="outline" onClick={resetTimer}>
                  <RotateCcw className="h-4 w-4 mr-2" />
                  Reset
                </Button>
              </div>

              <div className="bg-red-50 p-4 rounded-lg border border-red-200">
                <h4 className="font-semibold text-red-800 mb-2">How it works:</h4>
                <div className="text-sm text-red-700 space-y-1">
                  <div>• Work for 25 minutes with full focus</div>
                  <div>• Take a 5-minute break</div>
                  <div>• After 4 cycles, take a 15-30 minute break</div>
                </div>
              </div>
            </div>
          </Card>

          {/* Study Techniques */}
          <Card>
            <h2 className="text-xl font-semibold text-gray-900 mb-6 flex items-center">
              <Lightbulb className="h-6 w-6 text-yellow-500 mr-2" />
              Study Techniques
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {studyTechniques.map((technique, index) => (
                <div 
                  key={index} 
                  className={`p-4 rounded-lg cursor-pointer transition-all duration-300 ${
                    selectedTechnique === technique.id 
                      ? 'bg-primary-50 border-2 border-primary-200' 
                      : 'bg-gray-50 hover:bg-gray-100 border-2 border-transparent'
                  }`}
                  onClick={() => selectTechnique(technique.id)}
                >
                  <div className="flex items-center justify-between mb-3">
                    <div className="text-2xl">{technique.icon}</div>
                    <div className="flex items-center space-x-2">
                      <span className="text-xs px-2 py-1 bg-white rounded-full text-gray-600">
                        {technique.difficulty}
                      </span>
                      <div className="flex items-center">
                        <Star className="h-3 w-3 text-yellow-500 fill-current" />
                        <span className="text-xs text-gray-600 ml-1">
                          {technique.effectiveness}%
                        </span>
                      </div>
                    </div>
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2">
                    {technique.name}
                  </h3>
                  <p className="text-sm text-gray-600 mb-3">
                    {technique.description}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-500">
                      Duration: {technique.duration}
                    </span>
                  </div>

                  {selectedTechnique === technique.id && (
                    <div className="mt-4 pt-4 border-t border-primary-200">
                      <h4 className="font-medium text-gray-900 mb-2">Steps:</h4>
                      <ol className="text-sm text-gray-600 space-y-1">
                        {technique.steps.map((step, stepIndex) => (
                          <li key={stepIndex} className="flex items-start space-x-2">
                            <span className="font-medium text-primary-600">{stepIndex + 1}.</span>
                            <span>{step}</span>
                          </li>
                        ))}
                      </ol>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </Card>

          {/* Study Tips */}
          <Card>
            <h2 className="text-xl font-semibold text-gray-900 mb-6">Daily Study Tips</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                <Brain className="h-6 w-6 text-blue-600 mb-2" />
                <h3 className="font-medium text-gray-900 mb-2">
                  Use the Feynman Technique
                </h3>
                <p className="text-sm text-gray-600">
                  Explain concepts in simple terms as if teaching someone else.
                  This reveals gaps in understanding.
                </p>
              </div>
              
              <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                <Focus className="h-6 w-6 text-green-600 mb-2" />
                <h3 className="font-medium text-gray-900 mb-2">
                  Eliminate Distractions
                </h3>
                <p className="text-sm text-gray-600">
                  Put your phone in another room and use website blockers during study time.
                </p>
              </div>

              <div className="bg-purple-50 p-4 rounded-lg border border-purple-200">
                <Coffee className="h-6 w-6 text-purple-600 mb-2" />
                <h3 className="font-medium text-gray-900 mb-2">
                  Take Strategic Breaks
                </h3>
                <p className="text-sm text-gray-600">
                  Short breaks every 25-30 minutes help maintain focus and prevent burnout.
                </p>
              </div>

              <div className="bg-orange-50 p-4 rounded-lg border border-orange-200">
                <Calendar className="h-6 w-6 text-orange-600 mb-2" />
                <h3 className="font-medium text-gray-900 mb-2">
                  Review Regularly
                </h3>
                <p className="text-sm text-gray-600">
                  Review material within 24 hours, then again in 3 days, then weekly.
                </p>
              </div>
            </div>
          </Card>
        </div>

        <div className="space-y-6">
          {/* Study Habits Checklist */}
          <Card>
            <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
              <CheckCircle className="h-6 w-6 text-green-600 mr-2" />
              Study Habits
            </h2>
            <div className="space-y-3">
              {studyHabits.map((item, index) => (
                <div key={index} className="flex items-center space-x-3 p-2 hover:bg-gray-50 rounded-lg transition-colors">
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
            <Button variant="outline" size="sm" className="w-full mt-4">
              Update Habits
            </Button>
          </Card>

          {/* Progress This Week */}
          <Card>
            <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
              <TrendingUp className="h-6 w-6 text-blue-600 mr-2" />
              This Week's Progress
            </h2>
            <div className="space-y-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600 mb-1">18</div>
                <div className="text-sm text-gray-600">Study Sessions</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600 mb-1">12h</div>
                <div className="text-sm text-gray-600">Total Time</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-600 mb-1">85%</div>
                <div className="text-sm text-gray-600">Goal Achievement</div>
              </div>
            </div>
            
            <div className="mt-4 pt-4 border-t border-gray-200">
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600">Weekly Goal Progress</span>
                <span className="font-medium text-gray-900">85%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                <div className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full" style={{ width: '85%' }}></div>
              </div>
            </div>
          </Card>

          {/* Quick Actions */}
          <Card>
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Quick Actions</h2>
            <div className="space-y-3">
              <Button className="w-full justify-start" variant="outline">
                <BookOpen className="h-4 w-4 mr-2" />
                Create Study Plan
              </Button>
              <Button className="w-full justify-start" variant="outline">
                <Award className="h-4 w-4 mr-2" />
                Track Study Goals
              </Button>
              <Button className="w-full justify-start" variant="outline">
                <Calendar className="h-4 w-4 mr-2" />
                Schedule Study Time
              </Button>
              <Button className="w-full justify-start" variant="outline">
                <Brain className="h-4 w-4 mr-2" />
                Take Focus Quiz
              </Button>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default StudySkillsTrainer;