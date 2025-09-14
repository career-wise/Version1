import React from "react";
import { Target, MessageCircle, Map, CheckCircle } from "lucide-react";

const HowItWorks: React.FC = () => {
  const steps = [
    {
      number: "1",
      icon: <Target className="h-8 w-8 text-primary-600" />,
      title: "Choose Your Goal",
      description:
        "Select your career stage and define what you're looking to achieve.",
      bgGradient: "from-primary-50 to-blue-50",
      iconBg: "bg-gradient-to-br from-primary-100 to-primary-50",
    },
    {
      number: "2",
      icon: <MessageCircle className="h-8 w-8 text-green-600" />,
      title: "Chat with Our AI",
      description:
        "Engage with our AI assistant to discuss your background, skills, and aspirations.",
      bgGradient: "from-green-50 to-emerald-50",
      iconBg: "bg-gradient-to-br from-green-100 to-green-50",
    },
    {
      number: "3",
      icon: <Map className="h-8 w-8 text-purple-600" />,
      title: "Get Personalized Roadmap",
      description:
        "Receive a customized action plan with practical steps to achieve your career goals.",
      bgGradient: "from-purple-50 to-violet-50",
      iconBg: "bg-gradient-to-br from-purple-100 to-purple-50",
    },
  ];

  return (
    <section id="how-it-works" className="py-32 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Enhanced Section Header */}
        <div className="text-center mb-20">
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-r from-primary-100 to-secondary-100 border border-primary-200/50 mb-6">
            <CheckCircle className="h-4 w-4 text-primary-600 mr-2" />
            <span className="text-sm font-semibold text-primary-800">How It Works</span>
          </div>
          <h2 className="text-4xl sm:text-5xl font-extrabold text-gray-900 mb-6 leading-tight">
            How{" "}
            <span className="bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent">
              CareerWise
            </span>
            {" "}Works
          </h2>
          <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
            Our AI-powered platform simplifies career guidance into three easy steps that deliver personalized results
          </p>
        </div>

        {/* Enhanced Steps */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-24">
          {steps.map((step, index) => (
            <div key={index} className={`relative group bg-gradient-to-br ${step.bgGradient} rounded-3xl p-8 hover:scale-105 transition-all duration-500 border border-white/50`}>
              {/* Enhanced Step Number */}
              <div className="relative mb-8">
                <div className="w-20 h-20 bg-white/80 backdrop-blur-sm rounded-2xl flex items-center justify-center mx-auto mb-6 relative z-10 shadow-lg group-hover:scale-110 group-hover:rotate-3 transition-all duration-500">
                  <span className="text-2xl font-extrabold text-gray-800">
                    {step.number}
                  </span>
                </div>

                {/* Enhanced connecting line */}
                {index < steps.length - 1 && (
                  <div className="hidden md:block absolute top-10 left-1/2 w-full h-0.5 bg-gradient-to-r from-primary-300 to-secondary-300 transform translate-x-8 z-0">
                    <div className="absolute inset-0 bg-gradient-to-r from-primary-400 to-secondary-400 animate-pulse"></div>
                  </div>
                )}
              </div>

              {/* Enhanced Icon */}
              <div className={`w-16 h-16 ${step.iconBg} rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg group-hover:shadow-xl group-hover:scale-110 transition-all duration-500`}>
                {step.icon}
              </div>

              {/* Enhanced Content */}
              <h3 className="text-2xl font-bold text-gray-900 mb-4 text-center group-hover:text-gray-800 transition-colors">
                {step.title}
              </h3>
              <p className="text-gray-600 leading-relaxed text-center max-w-sm mx-auto group-hover:text-gray-700 transition-colors text-lg">
                {step.description}
              </p>
              
              {/* Decorative accent */}
              <div className="absolute top-4 right-4 w-4 h-4 bg-white/40 rounded-full group-hover:scale-150 transition-all duration-500"></div>
            </div>
          ))}
        </div>

        {/* Enhanced Bottom Image Section */}
        <div className="relative">
          <div className="aspect-w-16 aspect-h-8 rounded-3xl overflow-hidden shadow-2xl">
            <div className="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 h-80 flex items-center justify-center relative">
              {/* Enhanced overlay */}
              <div className="absolute inset-0 bg-gradient-to-br from-black/10 via-transparent to-black/20"></div>

              {/* Premium AI Interface Visualization */}
              <div className="relative z-10 text-center text-white">
                <div className="flex justify-center items-center mb-8">
                  <svg viewBox="0 0 400 160" className="w-full h-32 max-w-2xl">
                    {/* AI Brain Network */}
                    <defs>
                      <radialGradient id="brainGradient" cx="50%" cy="50%" r="50%">
                        <stop offset="0%" stopColor="white" stopOpacity="0.9"/>
                        <stop offset="100%" stopColor="white" stopOpacity="0.3"/>
                      </radialGradient>
                    </defs>
                    
                    {/* Neural network connections */}
                    <g stroke="white" strokeWidth="1.5" opacity="0.6">
                      {/* Main network paths */}
                      <path d="M50 80 Q100 40 150 80 Q200 120 250 80 Q300 40 350 80" fill="none" className="animate-pulse"/>
                      <path d="M50 80 Q100 120 150 80 Q200 40 250 80 Q300 120 350 80" fill="none" className="animate-pulse" style={{animationDelay: '1s'}}/>
                    </g>
                    
                    {/* AI processing nodes */}
                    <g>
                      {[
                        {x: 50, y: 80, delay: '0s'},
                        {x: 150, y: 80, delay: '0.5s'},
                        {x: 250, y: 80, delay: '1s'},
                        {x: 350, y: 80, delay: '1.5s'},
                        {x: 100, y: 60, delay: '0.3s'},
                        {x: 200, y: 100, delay: '0.8s'},
                        {x: 300, y: 60, delay: '1.3s'}
                      ].map((node, i) => (
                        <circle 
                          key={i}
                          cx={node.x} 
                          cy={node.y} 
                          r="8" 
                          fill="url(#brainGradient)" 
                          className="animate-pulse" 
                          style={{animationDelay: node.delay}}
                        >
                          <animate attributeName="r" values="8;12;8" dur="2s" repeatCount="indefinite" begin={node.delay}/>
                        </circle>
                      ))}
                    </g>
                    
                    {/* Data flow indicators */}
                    <g fill="#10b981" className="animate-bounce">
                      <circle cx="125" cy="50" r="2"/>
                      <circle cx="275" cy="110" r="2"/>
                      <circle cx="175" cy="70" r="2"/>
                    </g>
                    
                    {/* Success checkmarks */}
                    <g stroke="#10b981" strokeWidth="2" fill="none">
                      <path d="M340 70 L345 75 L355 65" className="animate-bounce" style={{animationDelay: '2s'}}/>
                      <path d="M240 90 L245 95 L255 85" className="animate-bounce" style={{animationDelay: '2.5s'}}/>
                    </g>
                  </svg>
                </div>
                
                <h3 className="text-3xl font-bold mb-4 leading-tight">
                  AI-Powered Career Intelligence
                </h3>
                <p className="text-xl opacity-90 max-w-3xl mx-auto leading-relaxed">
                  Experience the future of career guidance with our advanced AI technology that learns and adapts to your unique journey
                </p>
              </div>

              {/* Enhanced floating particles */}
              <div className="absolute top-12 left-12 w-3 h-3 bg-white bg-opacity-50 rounded-full animate-float"></div>
              <div
                className="absolute top-20 right-16 w-4 h-4 bg-yellow-300 bg-opacity-60 rounded-full animate-float"
                style={{ animationDelay: "1s" }}
              ></div>
              <div
                className="absolute bottom-16 left-20 w-3 h-3 bg-green-300 bg-opacity-50 rounded-full animate-float"
                style={{ animationDelay: "2s" }}
              ></div>
              <div
                className="absolute bottom-12 right-12 w-4 h-4 bg-pink-300 bg-opacity-40 rounded-full animate-float"
                style={{ animationDelay: "0.5s" }}
              ></div>
              <div
                className="absolute top-1/2 left-8 w-2 h-2 bg-blue-300 bg-opacity-60 rounded-full animate-bounce"
                style={{ animationDelay: "1.5s" }}
              ></div>
              <div
                className="absolute top-1/3 right-8 w-3 h-3 bg-purple-300 bg-opacity-50 rounded-full animate-pulse"
                style={{ animationDelay: "2.5s" }}
              ></div>
            </div>
          </div>
          
          {/* Additional surrounding decorations */}
          <div className="absolute -top-6 -left-6 w-12 h-12 bg-gradient-to-br from-primary-200/40 to-secondary-200/30 rounded-full animate-pulse"></div>
          <div className="absolute -bottom-6 -right-6 w-16 h-16 bg-gradient-to-br from-secondary-200/30 to-primary-200/40 rounded-full animate-pulse" style={{animationDelay: '1s'}}></div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
