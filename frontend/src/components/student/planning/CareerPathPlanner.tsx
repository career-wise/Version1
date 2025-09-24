import React, { useState } from "react";
import { 
  Map, 
  Target, 
  TrendingUp, 
  Calendar, 
  CheckCircle, 
  ArrowRight,
  Lightbulb,
  BookOpen,
  Briefcase,
  GraduationCap,
  Star,
  Clock,
  Users
} from "lucide-react";
import Card from "../../shared/ui/Card";
import Button from "../../shared/ui/Button";

const CareerPathPlanner: React.FC = () => {
  const [selectedPath, setSelectedPath] = useState<string | null>(null);
  const [currentStep, setCurrentStep] = useState(0);

  const careerPaths = [
    {
      id: "tech",
      title: "Technology Career Path",
      description: "Software development, data science, and tech innovation",
      icon: "💻",
      color: "from-blue-500 to-indigo-600",
      bgColor: "from-blue-50 to-indigo-100",
      timeline: "4-6 years",
      difficulty: "Medium-High",
      demand: "Very High",
      steps: [
        {
          phase: "High School (Years 1-2)",
          focus: "Foundation Building",
          tasks: [
            "Take computer science or programming classes",
            "Learn basic programming languages (Python, JavaScript)",
            "Join coding clubs or competitions",
            "Build simple projects and portfolio"
          ]
        },
        {
          phase: "High School (Years 3-4)",
          focus: "Skill Development",
          tasks: [
            "Advanced programming courses",
            "Internships or part-time tech work",
            "Contribute to open source projects",
            "Prepare for computer science college programs"
          ]
        },
        {
          phase: "College (Years 1-2)",
          focus: "Core Knowledge",
          tasks: [
            "Computer science fundamentals",
            "Data structures and algorithms",
            "Software engineering principles",
            "First internship applications"
          ]
        },
        {
          phase: "College (Years 3-4)",
          focus: "Specialization",
          tasks: [
            "Choose specialization (web dev, AI, cybersecurity)",
            "Advanced internships",
            "Capstone projects",
            "Job search preparation"
          ]
        }
      ]
    },
    {
      id: "healthcare",
      title: "Healthcare Career Path",
      description: "Medicine, nursing, and healthcare innovation",
      icon: "🏥",
      color: "from-green-500 to-emerald-600",
      bgColor: "from-green-50 to-emerald-100",
      timeline: "6-8 years",
      difficulty: "High",
      demand: "High",
      steps: [
        {
          phase: "High School (Years 1-2)",
          focus: "Science Foundation",
          tasks: [
            "Excel in biology, chemistry, and physics",
            "Volunteer at hospitals or clinics",
            "Join health-related clubs",
            "Maintain high GPA (3.7+)"
          ]
        },
        {
          phase: "High School (Years 3-4)",
          focus: "Pre-Med Preparation",
          tasks: [
            "Advanced science courses (AP Biology, Chemistry)",
            "Healthcare shadowing experiences",
            "Leadership roles in health organizations",
            "Research college pre-med programs"
          ]
        },
        {
          phase: "College (Years 1-2)",
          focus: "Pre-Med Requirements",
          tasks: [
            "Complete pre-med coursework",
            "Research experience",
            "Clinical volunteering",
            "MCAT preparation"
          ]
        },
        {
          phase: "College (Years 3-4)",
          focus: "Medical School Prep",
          tasks: [
            "Take MCAT exam",
            "Medical school applications",
            "Clinical experience",
            "Research publications"
          ]
        }
      ]
    },
    {
      id: "business",
      title: "Business & Entrepreneurship",
      description: "Business management, finance, and startup ventures",
      icon: "📊",
      color: "from-purple-500 to-violet-600",
      bgColor: "from-purple-50 to-violet-100",
      timeline: "4-5 years",
      difficulty: "Medium",
      demand: "High",
      steps: [
        {
          phase: "High School (Years 1-2)",
          focus: "Business Basics",
          tasks: [
            "Take economics and business classes",
            "Start a small business or side project",
            "Join DECA or business clubs",
            "Learn basic financial literacy"
          ]
        },
        {
          phase: "High School (Years 3-4)",
          focus: "Leadership Development",
          tasks: [
            "Leadership roles in organizations",
            "Business plan competitions",
            "Internships at local businesses",
            "College business program research"
          ]
        },
        {
          phase: "College (Years 1-2)",
          focus: "Core Business Knowledge",
          tasks: [
            "Business fundamentals courses",
            "Accounting and finance basics",
            "Marketing and management principles",
            "First business internship"
          ]
        },
        {
          phase: "College (Years 3-4)",
          focus: "Specialization & Experience",
          tasks: [
            "Choose business specialization",
            "Advanced internships",
            "Case study competitions",
            "Network with professionals"
          ]
        }
      ]
    }
  ];

  const milestones = [
    { milestone: "Complete interest assessment", completed: true, date: "Jan 15" },
    { milestone: "Research 3 career paths", completed: true, date: "Jan 20" },
    { milestone: "Create 4-year plan", completed: false, date: "Feb 1" },
    { milestone: "Set semester goals", completed: false, date: "Feb 15" },
    { milestone: "Find mentor", completed: false, date: "Mar 1" },
  ];

  const selectedPathData = careerPaths.find(path => path.id === selectedPath);

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Career Path Planner
        </h1>
        <p className="text-gray-600">
          Plan your educational and career journey with step-by-step guidance
        </p>
      </div>

      {/* Progress Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <Card className="text-center">
          <Target className="h-8 w-8 text-blue-600 mx-auto mb-3" />
          <div className="text-2xl font-bold text-gray-900 mb-1">3</div>
          <div className="text-sm text-gray-600">Paths Explored</div>
        </Card>
        <Card className="text-center">
          <Calendar className="h-8 w-8 text-green-600 mx-auto mb-3" />
          <div className="text-2xl font-bold text-gray-900 mb-1">2</div>
          <div className="text-sm text-gray-600">Milestones Complete</div>
        </Card>
        <Card className="text-center">
          <Clock className="h-8 w-8 text-purple-600 mx-auto mb-3" />
          <div className="text-2xl font-bold text-gray-900 mb-1">4</div>
          <div className="text-sm text-gray-600">Years to Goal</div>
        </Card>
        <Card className="text-center">
          <TrendingUp className="h-8 w-8 text-orange-600 mx-auto mb-3" />
          <div className="text-2xl font-bold text-gray-900 mb-1">85%</div>
          <div className="text-sm text-gray-600">Plan Completion</div>
        </Card>
      </div>

      {!selectedPath ? (
        <>
          {/* Career Path Selection */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Choose Your Career Path</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {careerPaths.map((path) => (
                <div
                  key={path.id}
                  onClick={() => setSelectedPath(path.id)}
                  className="cursor-pointer transition-all duration-300 transform hover:scale-105 hover:shadow-xl"
                >
                  <Card className={`h-full bg-gradient-to-br ${path.bgColor} border-0 shadow-lg`}>
                    <div className="text-center">
                      <div className="text-4xl mb-4">{path.icon}</div>
                      <h3 className="text-xl font-bold text-gray-900 mb-3">{path.title}</h3>
                      <p className="text-gray-600 mb-6">{path.description}</p>
                      
                      <div className="space-y-2 mb-6">
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-600">Timeline:</span>
                          <span className="font-medium">{path.timeline}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-600">Difficulty:</span>
                          <span className="font-medium">{path.difficulty}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-600">Job Demand:</span>
                          <span className="font-medium text-green-600">{path.demand}</span>
                        </div>
                      </div>

                      <Button className="w-full">
                        Explore Path
                        <ArrowRight className="h-4 w-4 ml-2" />
                      </Button>
                    </div>
                  </Card>
                </div>
              ))}
            </div>
          </div>

          {/* Current Milestones */}
          <Card>
            <h2 className="text-xl font-semibold text-gray-900 mb-6 flex items-center">
              <Star className="h-6 w-6 text-yellow-500 mr-2" />
              Current Milestones
            </h2>
            <div className="space-y-4">
              {milestones.map((milestone, index) => (
                <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <CheckCircle
                      className={`h-5 w-5 ${
                        milestone.completed ? "text-green-600" : "text-gray-300"
                      }`}
                    />
                    <span className={`font-medium ${
                      milestone.completed ? "text-gray-900" : "text-gray-600"
                    }`}>
                      {milestone.milestone}
                    </span>
                  </div>
                  <span className="text-sm text-gray-500">{milestone.date}</span>
                </div>
              ))}
            </div>
          </Card>
        </>
      ) : (
        <>
          {/* Selected Path Details */}
          <div className="mb-6">
            <Button variant="outline" onClick={() => setSelectedPath(null)}>
              ← Back to Path Selection
            </Button>
          </div>

          {selectedPathData && (
            <>
              <Card className={`mb-8 bg-gradient-to-br ${selectedPathData.bgColor} border-0 shadow-lg`}>
                <div className="flex items-center space-x-4 mb-6">
                  <div className="text-4xl">{selectedPathData.icon}</div>
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900">{selectedPathData.title}</h2>
                    <p className="text-gray-600">{selectedPathData.description}</p>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="bg-white bg-opacity-50 p-4 rounded-lg">
                    <div className="font-semibold text-gray-900">Timeline</div>
                    <div className="text-gray-600">{selectedPathData.timeline}</div>
                  </div>
                  <div className="bg-white bg-opacity-50 p-4 rounded-lg">
                    <div className="font-semibold text-gray-900">Difficulty</div>
                    <div className="text-gray-600">{selectedPathData.difficulty}</div>
                  </div>
                  <div className="bg-white bg-opacity-50 p-4 rounded-lg">
                    <div className="font-semibold text-gray-900">Job Demand</div>
                    <div className="text-green-600 font-medium">{selectedPathData.demand}</div>
                  </div>
                </div>
              </Card>

              {/* Timeline Steps */}
              <div className="space-y-6">
                {selectedPathData.steps.map((step, index) => (
                  <Card key={index} className={`${
                    index <= currentStep ? 'border-primary-200 bg-primary-50' : 'border-gray-200'
                  }`}>
                    <div className="flex items-start space-x-4">
                      <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                        index <= currentStep 
                          ? 'bg-primary-500 text-white' 
                          : 'bg-gray-200 text-gray-500'
                      }`}>
                        {index <= currentStep ? (
                          <CheckCircle className="h-6 w-6" />
                        ) : (
                          <span className="font-bold">{index + 1}</span>
                        )}
                      </div>
                      
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-2">
                          <h3 className="text-lg font-semibold text-gray-900">{step.phase}</h3>
                          <span className="text-sm text-primary-600 font-medium">{step.focus}</span>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                          {step.tasks.map((task, taskIndex) => (
                            <div key={taskIndex} className="flex items-start space-x-2">
                              <div className="w-2 h-2 bg-primary-500 rounded-full mt-2 flex-shrink-0"></div>
                              <span className="text-sm text-gray-700">{task}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>

              {/* Action Buttons */}
              <div className="flex justify-center space-x-4 mt-8">
                <Button variant="outline">
                  <BookOpen className="h-4 w-4 mr-2" />
                  Download Plan
                </Button>
                <Button>
                  <Target className="h-4 w-4 mr-2" />
                  Set Goals
                </Button>
                <Button variant="outline">
                  <Users className="h-4 w-4 mr-2" />
                  Find Mentor
                </Button>
              </div>
            </>
          )}
        </>
      )}
    </div>
  );
};

export default CareerPathPlanner;