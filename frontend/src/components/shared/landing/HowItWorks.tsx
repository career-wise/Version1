import React from "react";
import { Target, MessageCircle, Map, ArrowRight, CheckCircle, Sparkles } from "lucide-react";

const HowItWorks: React.FC = () => {
  const steps = [
    {
      number: "1",
      icon: <Target className="h-10 w-10 text-primary-600" />,
      title: "Define Your Goals",
      description: "Tell us about your career aspirations, current situation, and what success looks like to you.",
      details: ["Complete our comprehensive assessment", "Share your interests and values", "Set your timeline and priorities"],
      gradient: "from-blue-500 to-indigo-600",
      bgGradient: "from-blue-50 to-indigo-100",
    },
    {
      number: "2",
      icon: <MessageCircle className="h-10 w-10 text-green-600" />,
      title: "AI-Powered Analysis",
      description: "Our advanced AI analyzes your profile against thousands of career paths and market trends.",
      details: ["Skills and personality matching", "Market demand analysis", "Personalized recommendations"],
      gradient: "from-green-500 to-emerald-600",
      bgGradient: "from-green-50 to-emerald-100",
    },
    {
      number: "3",
      icon: <Map className="h-10 w-10 text-purple-600" />,
      title: "Get Your Roadmap",
      description: "Receive a detailed, actionable plan with specific steps to achieve your career goals.",
      details: ["Step-by-step action plan", "Resource recommendations", "Progress tracking tools"],
      gradient: "from-purple-500 to-violet-600",
      bgGradient: "from-purple-50 to-violet-100",
    },
  ];

  return (
    <section id="how-it-works" className="py-24 bg-gradient-to-br from-gray-50 to-white relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-64 h-64 bg-gradient-to-r from-primary-100 to-secondary-100 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-float"></div>
        <div className="absolute bottom-20 right-10 w-64 h-64 bg-gradient-to-r from-purple-100 to-pink-100 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-float" style={{ animationDelay: '3s' }}></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-20">
          <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-primary-50 to-secondary-50 border border-primary-200 rounded-full text-sm font-medium text-primary-800 mb-6">
            <Sparkles className="h-4 w-4 mr-2" />
            Simple Process
          </div>
          <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6">
            Your Career Journey
            <br />
            <span className="bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent">
              Made Simple
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Our streamlined process transforms career confusion into clear, actionable steps
          </p>
        </div>

        {/* Steps */}
        <div className="relative">
          {/* Connection lines */}
          <div className="hidden lg:block absolute top-24 left-1/2 transform -translate-x-1/2 w-full max-w-4xl">
            <div className="flex justify-between items-center">
              <div className="w-1/3 h-0.5 bg-gradient-to-r from-blue-300 to-green-300"></div>
              <div className="w-1/3 h-0.5 bg-gradient-to-r from-green-300 to-purple-300"></div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
            {steps.map((step, index) => (
              <div key={index} className="relative group">
                {/* Step number badge */}
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 z-10">
                  <div className={`w-12 h-12 bg-gradient-to-br ${step.bgGradient} border-4 border-white rounded-full flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                    <span className="text-lg font-bold text-gray-700">{step.number}</span>
                  </div>
                </div>

                <div className="bg-white rounded-2xl p-8 pt-12 shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border border-gray-100 group-hover:border-transparent h-full">
                  {/* Icon */}
                  <div className={`w-16 h-16 bg-gradient-to-br ${step.bgGradient} rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                    {step.icon}
                  </div>

                  {/* Content */}
                  <h3 className="text-2xl font-bold text-gray-900 mb-4 text-center group-hover:text-primary-600 transition-colors duration-300">
                    {step.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed text-center mb-6">
                    {step.description}
                  </p>

                  {/* Details */}
                  <div className="space-y-3">
                    {step.details.map((detail, detailIndex) => (
                      <div key={detailIndex} className="flex items-start space-x-3">
                        <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                        <span className="text-sm text-gray-600">{detail}</span>
                      </div>
                    ))}
                  </div>

                  {/* Hover effect overlay */}
                  <div className="absolute inset-0 bg-gradient-to-br from-white/50 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Interactive Demo Section */}
        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden border border-gray-100">
          <div className="grid grid-cols-1 lg:grid-cols-2">
            {/* Content */}
            <div className="p-8 md:p-12 flex items-center">
              <div>
                <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-primary-50 to-secondary-50 border border-primary-200 rounded-full text-sm font-medium text-primary-800 mb-6">
                  <MessageCircle className="h-4 w-4 mr-2" />
                  See It In Action
                </div>
                <h3 className="text-3xl font-bold text-gray-900 mb-6">
                  Experience the Power of
                  <span className="bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent"> AI Guidance</span>
                </h3>
                <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                  Watch how our AI transforms your career questions into personalized, actionable insights in real-time.
                </p>
                
                <div className="space-y-4 mb-8">
                  <div className="flex items-center space-x-3">
                    <div className="w-6 h-6 bg-gradient-to-br from-green-100 to-emerald-200 rounded-full flex items-center justify-center">
                      <CheckCircle className="h-4 w-4 text-green-600" />
                    </div>
                    <span className="text-gray-700">Instant career matching</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-6 h-6 bg-gradient-to-br from-blue-100 to-indigo-200 rounded-full flex items-center justify-center">
                      <CheckCircle className="h-4 w-4 text-blue-600" />
                    </div>
                    <span className="text-gray-700">Personalized learning paths</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-6 h-6 bg-gradient-to-br from-purple-100 to-violet-200 rounded-full flex items-center justify-center">
                      <CheckCircle className="h-4 w-4 text-purple-600" />
                    </div>
                    <span className="text-gray-700">Market-driven recommendations</span>
                  </div>
                </div>

                <button className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-primary-500 to-secondary-500 text-white font-semibold rounded-xl hover:from-primary-600 hover:to-secondary-600 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl">
                  Try Interactive Demo
                  <ArrowRight className="h-5 w-5 ml-2" />
                </button>
              </div>
            </div>

            {/* Visual */}
            <div className="bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 p-8 md:p-12 flex items-center justify-center relative">
              {/* Overlay */}
              <div className="absolute inset-0 bg-black bg-opacity-10"></div>

              {/* Interactive demo visualization */}
              <div className="relative z-10 w-full max-w-sm">
                <div className="bg-white bg-opacity-95 backdrop-blur-sm rounded-2xl shadow-2xl p-6">
                  {/* Chat interface mockup */}
                  <div className="flex items-center space-x-3 mb-6">
                    <div className="w-10 h-10 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-full flex items-center justify-center">
                      <MessageCircle className="h-5 w-5 text-white" />
                    </div>
                    <div>
                      <div className="font-semibold text-gray-900">AI Career Assistant</div>
                      <div className="text-xs text-green-600 flex items-center">
                        <div className="w-2 h-2 bg-green-500 rounded-full mr-1"></div>
                        Online
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="bg-gray-100 rounded-lg p-3">
                      <div className="text-sm text-gray-700">"I'm interested in tech but not sure which path to take..."</div>
                    </div>
                    <div className="bg-gradient-to-r from-primary-50 to-secondary-50 rounded-lg p-3">
                      <div className="text-sm text-gray-700">Based on your interests, I recommend exploring:</div>
                      <div className="mt-2 space-y-1">
                        <div className="text-xs bg-white rounded px-2 py-1 inline-block mr-1">Software Engineering</div>
                        <div className="text-xs bg-white rounded px-2 py-1 inline-block mr-1">Data Science</div>
                        <div className="text-xs bg-white rounded px-2 py-1 inline-block">UX Design</div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-4 flex items-center justify-center">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-primary-400 rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-primary-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                      <div className="w-2 h-2 bg-primary-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Floating elements */}
              <div className="absolute top-8 left-8 w-3 h-3 bg-white bg-opacity-40 rounded-full animate-pulse"></div>
              <div className="absolute top-12 right-8 w-2 h-2 bg-white bg-opacity-50 rounded-full animate-pulse" style={{ animationDelay: '1s' }}></div>
              <div className="absolute bottom-12 left-8 w-4 h-4 bg-white bg-opacity-30 rounded-full animate-pulse" style={{ animationDelay: '2s' }}></div>
              <div className="absolute bottom-8 right-12 w-2 h-2 bg-white bg-opacity-60 rounded-full animate-pulse" style={{ animationDelay: '0.5s' }}></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;