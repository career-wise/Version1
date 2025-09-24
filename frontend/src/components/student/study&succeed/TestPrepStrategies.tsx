import React, { useState } from "react";
import {
  FileText,
  Clock,
  Target,
  TrendingUp,
  BookOpen,
  CheckCircle,
  AlertCircle,
  Star,
} from "lucide-react";
import Card from "../../shared/ui/Card";
import Button from "../../shared/ui/Button";

const TestPrepStrategies: React.FC = () => {
  const [selectedTest, setSelectedTest] = useState("SAT");

  const testTypes = [
    {
      name: "SAT",
      description: "College admission test",
      duration: "3 hours",
      sections: 4,
    },
    {
      name: "ACT",
      description: "Alternative college admission test",
      duration: "2h 55m",
      sections: 4,
    },
    {
      name: "AP Exams",
      description: "Advanced Placement tests",
      duration: "3 hours",
      sections: 2,
    },
    {
      name: "PSAT",
      description: "Practice SAT",
      duration: "2h 45m",
      sections: 3,
    },
  ];

  const strategies = [
    {
      title: "Know the Format",
      description: "Familiarize yourself with test structure and timing",
      icon: <FileText className="h-6 w-6 text-blue-600" />,
      tips: [
        "Review section breakdown and time limits",
        "Understand question types and formats",
        "Practice with official test materials",
      ],
    },
    {
      title: "Time Management",
      description: "Develop effective pacing strategies",
      icon: <Clock className="h-6 w-6 text-green-600" />,
      tips: [
        "Practice with timed sections",
        "Learn when to skip difficult questions",
        "Allocate time for review at the end",
      ],
    },
    {
      title: "Content Review",
      description: "Master the subject matter",
      icon: <BookOpen className="h-6 w-6 text-purple-600" />,
      tips: [
        "Identify knowledge gaps early",
        "Use multiple study resources",
        "Focus on high-yield topics",
      ],
    },
    {
      title: "Practice Tests",
      description: "Simulate real testing conditions",
      icon: <Target className="h-6 w-6 text-orange-600" />,
      tips: [
        "Take full-length practice tests",
        "Analyze mistakes and patterns",
        "Track improvement over time",
      ],
    },
  ];

  const satSections = [
    {
      section: "Reading",
      duration: "65 minutes",
      questions: 52,
      description: "Reading comprehension passages",
      tips: [
        "Read passages actively",
        "Look for main ideas",
        "Use process of elimination",
      ],
      score: 720,
    },
    {
      section: "Writing & Language",
      duration: "35 minutes",
      questions: 44,
      description: "Grammar and editing skills",
      tips: [
        "Know common grammar rules",
        "Read for context",
        "Check for clarity",
      ],
      score: 680,
    },
    {
      section: "Math (No Calculator)",
      duration: "25 minutes",
      questions: 20,
      description: "Basic math concepts",
      tips: ["Memorize key formulas", "Practice mental math", "Show all work"],
      score: 650,
    },
    {
      section: "Math (Calculator)",
      duration: "55 minutes",
      questions: 38,
      description: "Advanced math problems",
      tips: [
        "Use calculator efficiently",
        "Check reasonableness",
        "Graph when helpful",
      ],
      score: 700,
    },
  ];

  const studyPlan = [
    {
      week: "Week 1-2",
      focus: "Diagnostic & Planning",
      tasks: [
        "Take practice test",
        "Identify weak areas",
        "Create study schedule",
      ],
    },
    {
      week: "Week 3-6",
      focus: "Content Review",
      tasks: [
        "Review math concepts",
        "Practice reading strategies",
        "Grammar rules study",
      ],
    },
    {
      week: "Week 7-10",
      focus: "Practice & Strategy",
      tasks: [
        "Timed section practice",
        "Full practice tests",
        "Strategy refinement",
      ],
    },
    {
      week: "Week 11-12",
      focus: "Final Prep",
      tasks: ["Review mistakes", "Light practice", "Test day preparation"],
    },
  ];

  const getScoreColor = (score) => {
    if (score >= 700) return "text-green-600";
    if (score >= 600) return "text-yellow-600";
    return "text-red-600";
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Test Prep Strategies
        </h1>
        <p className="text-gray-600">
          Master standardized tests with proven preparation techniques
        </p>
      </div>

      {/* Test Selection */}
      <div className="flex flex-wrap gap-2 mb-8">
        {testTypes.map((test) => (
          <Button
            key={test.name}
            variant={selectedTest === test.name ? "primary" : "outline"}
            size="sm"
            onClick={() => setSelectedTest(test.name)}
          >
            {test.name}
          </Button>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          {/* Test Overview */}
          <Card>
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              {selectedTest} Overview
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <div className="text-center">
                <Clock className="h-8 w-8 text-blue-600 mx-auto mb-2" />
                <div className="font-semibold text-gray-900">Duration</div>
                <div className="text-sm text-gray-600">3 hours</div>
              </div>
              <div className="text-center">
                <FileText className="h-8 w-8 text-green-600 mx-auto mb-2" />
                <div className="font-semibold text-gray-900">Sections</div>
                <div className="text-sm text-gray-600">4 sections</div>
              </div>
              <div className="text-center">
                <Star className="h-8 w-8 text-yellow-600 mx-auto mb-2" />
                <div className="font-semibold text-gray-900">Max Score</div>
                <div className="text-sm text-gray-600">1600</div>
              </div>
            </div>
          </Card>

          {/* Section Breakdown */}
          {selectedTest === "SAT" && (
            <Card>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                Section Breakdown
              </h2>
              <div className="space-y-4">
                {satSections.map((section, index) => (
                  <div key={index} className="p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="font-semibold text-gray-900">
                        {section.section}
                      </h3>
                      <span
                        className={`font-bold ${getScoreColor(section.score)}`}
                      >
                        Current: {section.score}
                      </span>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-3">
                      <div className="text-sm">
                        <span className="text-gray-600">Time: </span>
                        <span className="font-medium">{section.duration}</span>
                      </div>
                      <div className="text-sm">
                        <span className="text-gray-600">Questions: </span>
                        <span className="font-medium">{section.questions}</span>
                      </div>
                      <div className="text-sm">
                        <span className="text-gray-600">Type: </span>
                        <span className="font-medium">
                          {section.description}
                        </span>
                      </div>
                    </div>
                    <div>
                      <h4 className="text-sm font-medium text-gray-900 mb-2">
                        Key Tips:
                      </h4>
                      <ul className="text-sm text-gray-600 space-y-1">
                        {section.tips.map((tip, tipIndex) => (
                          <li
                            key={tipIndex}
                            className="flex items-start space-x-2"
                          >
                            <CheckCircle className="h-3 w-3 text-green-600 mt-1 flex-shrink-0" />
                            <span>{tip}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          )}

          {/* Study Strategies */}
          <Card>
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              Study Strategies
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {strategies.map((strategy, index) => (
                <div key={index} className="p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center space-x-3 mb-3">
                    {strategy.icon}
                    <h3 className="font-semibold text-gray-900">
                      {strategy.title}
                    </h3>
                  </div>
                  <p className="text-sm text-gray-600 mb-3">
                    {strategy.description}
                  </p>
                  <ul className="text-sm text-gray-600 space-y-1">
                    {strategy.tips.map((tip, tipIndex) => (
                      <li key={tipIndex} className="flex items-start space-x-2">
                        <div className="w-1 h-1 bg-gray-400 rounded-full mt-2 flex-shrink-0"></div>
                        <span>{tip}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </Card>

          {/* 12-Week Study Plan */}
          <Card>
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              12-Week Study Plan
            </h2>
            <div className="space-y-4">
              {studyPlan.map((phase, index) => (
                <div
                  key={index}
                  className="flex items-start space-x-4 p-4 bg-gray-50 rounded-lg"
                >
                  <div className="flex-shrink-0">
                    <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold">
                      {index + 1}
                    </div>
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900 mb-1">
                      {phase.week}
                    </h3>
                    <h4 className="text-blue-600 font-medium mb-2">
                      {phase.focus}
                    </h4>
                    <ul className="text-sm text-gray-600 space-y-1">
                      {phase.tasks.map((task, taskIndex) => (
                        <li
                          key={taskIndex}
                          className="flex items-start space-x-2"
                        >
                          <CheckCircle className="h-3 w-3 text-green-600 mt-1 flex-shrink-0" />
                          <span>{task}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>

        <div className="space-y-6">
          {/* Progress Tracker */}
          <Card>
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              Progress Tracker
            </h2>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span>Practice Tests Taken</span>
                  <span>6/10</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-blue-600 h-2 rounded-full"
                    style={{ width: "60%" }}
                  ></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span>Study Hours</span>
                  <span>45/60</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-green-600 h-2 rounded-full"
                    style={{ width: "75%" }}
                  ></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span>Target Score Progress</span>
                  <span>1420/1500</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-yellow-600 h-2 rounded-full"
                    style={{ width: "85%" }}
                  ></div>
                </div>
              </div>
            </div>
          </Card>

          {/* Quick Actions */}
          <Card>
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              Quick Actions
            </h2>
            <div className="space-y-3">
              <Button className="w-full">Take Practice Test</Button>
              <Button variant="outline" className="w-full">
                Review Mistakes
              </Button>
              <Button variant="outline" className="w-full">
                Study Flashcards
              </Button>
              <Button variant="outline" className="w-full">
                Time Management Tips
              </Button>
            </div>
          </Card>

          {/* Test Day Tips */}
          <Card>
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              Test Day Tips
            </h2>
            <div className="space-y-3">
              <div className="flex items-start space-x-3">
                <AlertCircle className="h-5 w-5 text-orange-600 mt-0.5" />
                <div>
                  <h3 className="font-medium text-gray-900">Night Before</h3>
                  <p className="text-sm text-gray-600">
                    Get plenty of sleep and prepare materials
                  </p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <Clock className="h-5 w-5 text-blue-600 mt-0.5" />
                <div>
                  <h3 className="font-medium text-gray-900">Arrive Early</h3>
                  <p className="text-sm text-gray-600">
                    Get to the test center 30 minutes early
                  </p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <Target className="h-5 w-5 text-green-600 mt-0.5" />
                <div>
                  <h3 className="font-medium text-gray-900">Stay Calm</h3>
                  <p className="text-sm text-gray-600">
                    Use breathing techniques to manage anxiety
                  </p>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default TestPrepStrategies;
