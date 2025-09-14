import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Sparkles, Zap, TrendingUp, Target, Brain } from "lucide-react";
import Button from "../ui/Button";

const Hero: React.FC = () => {
  const features = [
    {
      icon: <TrendingUp className="h-6 w-6" />,
      label: "Resume Builder",
      bgColor: "bg-gradient-to-br from-blue-50 to-blue-100",
      iconColor: "text-blue-600",
      hoverColor: "hover:from-blue-100 hover:to-blue-200",
    },
    {
      icon: <Target className="h-6 w-6" />,
      label: "Assessments", 
      bgColor: "bg-gradient-to-br from-pink-50 to-pink-100",
      iconColor: "text-pink-600",
      hoverColor: "hover:from-pink-100 hover:to-pink-200",
    },
    {
      icon: <Zap className="h-6 w-6" />,
      label: "Interview Prep",
      bgColor: "bg-gradient-to-br from-purple-50 to-purple-100",
      iconColor: "text-purple-600",
      hoverColor: "hover:from-purple-100 hover:to-purple-200",
    },
    {
      icon: <Brain className="h-6 w-6" />,
      label: "AI Learning",
      bgColor: "bg-gradient-to-br from-green-50 to-green-100",
      iconColor: "text-green-600",
      hoverColor: "hover:from-green-100 hover:to-green-200",
    },
  ];

  return (
    <section className="relative bg-white overflow-hidden">
      {/* Enhanced Background with animated gradients */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-primary-50/80 via-white to-secondary-50/60"></div>
        <div className="absolute top-0 left-0 w-96 h-96 bg-gradient-to-br from-primary-200/30 to-transparent rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-gradient-to-tl from-secondary-200/30 to-transparent rounded-full blur-3xl animate-pulse" style={{animationDelay: '2s'}}></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="pt-20 pb-16 sm:pt-28 sm:pb-24 lg:pt-36 lg:pb-28">
          {/* Main content with enhanced typography */}
          <div className="text-center">
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-r from-primary-100 to-secondary-100 border border-primary-200/50 mb-8 animate-fade-in">
              <Sparkles className="h-4 w-4 text-primary-600 mr-2" />
              <span className="text-sm font-medium text-primary-800">Powered by Advanced AI Technology</span>
            </div>
            
            <h1 className="text-4xl sm:text-5xl lg:text-7xl font-extrabold text-gray-900 leading-tight tracking-tight">
              Revolutionizing{" "}
              <span className="relative">
                <span className="bg-gradient-to-r from-primary-600 via-blue-600 to-secondary-600 bg-clip-text text-transparent">
                  Career Guidance
                </span>
                {/* Decorative underline */}
                <div className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-primary-400 to-secondary-400 opacity-30 rounded-full"></div>
              </span>
              {" "}with AI
            </h1>

            <div className="mt-8 max-w-4xl mx-auto space-y-4">
              <p className="text-xl sm:text-2xl text-gray-700 leading-relaxed font-medium">
                Personalized insights. Smart career decisions.
              </p>
              <p className="text-xl sm:text-2xl text-gray-600 font-light">
                No overwhelm, just clarity.
              </p>
            </div>

            {/* Enhanced CTA Buttons */}
            <div className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-6">
              <Link to="/chat">
                <Button size="lg" className="w-full sm:w-auto min-w-[200px] text-lg py-4 px-8 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-300">
                  <Sparkles className="h-5 w-5 mr-3" />
                  Try AI Chat
                  <ArrowRight className="h-5 w-5 ml-3 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>

              <Link to="/auth">
                <Button
                  variant="outline"
                  size="lg"
                  className="w-full sm:w-auto min-w-[160px] text-lg py-4 px-8 border-2 hover:border-primary-300 hover:bg-primary-50/50 transition-all duration-300"
                >
                  <Zap className="h-4 w-4 mr-3" />
                  Get Started
                </Button>
              </Link>
            </div>

            {/* Enhanced Feature Cards */}
            <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-6 max-w-6xl mx-auto">
              {features.map((feature, index) => (
                <div
                  key={index}
                  className={`${feature.bgColor} ${feature.hoverColor} rounded-3xl p-8 shadow-sm border border-white/60 hover:shadow-lg hover:scale-105 transition-all duration-500 group cursor-pointer backdrop-blur-sm`}
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="text-center">
                    <div className="w-16 h-16 bg-white/70 backdrop-blur-sm rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 group-hover:rotate-3 transition-all duration-500 shadow-sm">
                      <div className={feature.iconColor}>
                        {feature.icon}
                      </div>
                    </div>
                    <h3 className="text-base font-bold text-gray-900 group-hover:text-gray-800 transition-colors">
                      {feature.label}
                    </h3>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Enhanced Hero Image Section with Premium SVG Illustration */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        <div className="relative">
          <div className="aspect-w-16 aspect-h-9 rounded-3xl overflow-hidden shadow-2xl bg-gradient-to-br from-primary-600 via-blue-600 to-secondary-600">
            {/* Enhanced gradient background */}
            <div className="relative h-96 flex items-center justify-center">
              {/* Overlay pattern with improved opacity */}
              <div className="absolute inset-0 bg-gradient-to-br from-black/20 via-transparent to-black/30"></div>
              
              {/* Premium SVG Illustration - Career Growth Visualization */}
              <div className="relative z-10 flex items-center justify-center w-full h-full">
                <div className="text-center text-white px-8">
                  {/* Custom SVG Career Growth Icon */}
                  <div className="w-32 h-32 mx-auto mb-8 relative">
                    <svg viewBox="0 0 120 120" className="w-full h-full drop-shadow-lg">
                      {/* Background circle with pulse animation */}
                      <circle cx="60" cy="60" r="50" fill="white" fillOpacity="0.1" className="animate-pulse"/>
                      <circle cx="60" cy="60" r="40" fill="white" fillOpacity="0.15"/>
                      
                      {/* Career growth path */}
                      <path d="M30 80 Q45 60 60 70 Q75 50 90 40" stroke="white" strokeWidth="3" fill="none" strokeLinecap="round" className="animate-pulse" style={{animationDelay: '1s'}}/>
                      
                      {/* Achievement points */}
                      <circle cx="30" cy="80" r="4" fill="#60a5fa"/>
                      <circle cx="60" cy="70" r="5" fill="#3b82f6"/>  
                      <circle cx="90" cy="40" r="6" fill="#1d4ed8"/>
                      
                      {/* Brain/AI symbol */}
                      <g transform="translate(45,45)">
                        <path d="M15 5 Q20 0 25 5 Q30 10 25 15 Q20 20 15 15 Q10 10 15 5 Z" fill="white" fillOpacity="0.9"/>
                        <circle cx="18" cy="10" r="1.5" fill="#3b82f6"/>
                        <circle cx="22" cy="10" r="1.5" fill="#3b82f6"/>
                        <path d="M17 13 Q20 15 23 13" stroke="#3b82f6" strokeWidth="1" fill="none"/>
                      </g>
                      
                      {/* Success indicators */}
                      <g className="animate-float">
                        <circle cx="75" cy="25" r="3" fill="white" fillOpacity="0.8"/>
                        <path d="M73 25 L75 27 L78 23" stroke="#10b981" strokeWidth="1.5" fill="none"/>
                      </g>
                      
                      <g className="animate-float" style={{animationDelay: '0.5s'}}>
                        <circle cx="85" cy="75" r="3" fill="white" fillOpacity="0.8"/>
                        <path d="M83 75 L85 77 L88 73" stroke="#10b981" strokeWidth="1.5" fill="none"/>
                      </g>
                    </svg>
                  </div>
                  
                  <h3 className="text-3xl font-bold mb-4 leading-tight">
                    AI-Powered Career Intelligence
                  </h3>
                  <p className="text-xl opacity-90 max-w-2xl mx-auto leading-relaxed">
                    Transforming how people navigate their professional journey with cutting-edge technology and personalized insights
                  </p>
                </div>
              </div>

              {/* Enhanced Floating elements with better animations */}
              <div className="absolute top-12 left-12 w-5 h-5 bg-white bg-opacity-30 rounded-full animate-float shadow-lg"></div>
              <div
                className="absolute top-24 right-20 w-7 h-7 bg-white bg-opacity-20 rounded-full animate-float shadow-md"
                style={{ animationDelay: "1s" }}
              ></div>
              <div
                className="absolute bottom-20 left-20 w-4 h-4 bg-white bg-opacity-40 rounded-full animate-float shadow-md"
                style={{ animationDelay: "2s" }}
              ></div>
              <div
                className="absolute bottom-16 right-16 w-6 h-6 bg-white bg-opacity-25 rounded-full animate-float shadow-lg"
                style={{ animationDelay: "0.5s" }}
              ></div>
              
              {/* New decorative elements */}
              <div
                className="absolute top-32 left-32 w-3 h-3 bg-yellow-300 bg-opacity-60 rounded-full animate-float shadow-sm"
                style={{ animationDelay: "1.5s" }}
              ></div>
              <div
                className="absolute bottom-32 right-32 w-4 h-4 bg-green-300 bg-opacity-50 rounded-full animate-float shadow-sm"
                style={{ animationDelay: "2.5s" }}
              ></div>
            </div>
          </div>
          
          {/* Additional decorative background elements */}
          <div className="absolute -top-4 -left-4 w-16 h-16 bg-gradient-to-br from-primary-200 to-secondary-200 rounded-full opacity-20 animate-pulse"></div>
          <div className="absolute -bottom-4 -right-4 w-12 h-12 bg-gradient-to-br from-secondary-200 to-primary-200 rounded-full opacity-30 animate-pulse" style={{animationDelay: '1s'}}></div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
