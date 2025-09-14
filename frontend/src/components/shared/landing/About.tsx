import React from "react";
import { Users, Clock, TrendingUp, Heart, Award, Globe, Zap } from "lucide-react";
import Button from "../ui/Button";

const About: React.FC = () => {
  const stats = [
    {
      icon: <Users className="h-8 w-8 text-primary-600" />,
      number: "50,000+",
      label: "Users Helped",
      bgGradient: "from-primary-50 to-blue-50",
      color: "primary",
    },
    {
      icon: <Globe className="h-8 w-8 text-green-600" />,
      number: "250+",
      label: "Career Paths",
      bgGradient: "from-green-50 to-emerald-50",
      color: "green",
    },
    {
      icon: <TrendingUp className="h-8 w-8 text-blue-600" />,
      number: "85%",
      label: "Success Rate",
      bgGradient: "from-blue-50 to-cyan-50", 
      color: "blue",
    },
    {
      icon: <Heart className="h-8 w-8 text-red-500" />,
      number: "4.8/5",
      label: "User Satisfaction",
      bgGradient: "from-red-50 to-pink-50",
      color: "red",
    },
  ];

  return (
    <section id="about" className="py-32 bg-gradient-to-b from-white to-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Enhanced Stats Section */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-32">
          {stats.map((stat, index) => (
            <div key={index} className={`text-center group hover:scale-105 transition-all duration-500`}>
              <div className={`w-20 h-20 bg-gradient-to-br ${stat.bgGradient} rounded-3xl shadow-lg flex items-center justify-center mx-auto mb-6 group-hover:shadow-xl group-hover:rotate-3 transition-all duration-500 border border-white/50`}>
                {stat.icon}
              </div>
              <div className="text-4xl font-extrabold text-gray-900 mb-3 group-hover:text-primary-600 transition-colors">
                {stat.number}
              </div>
              <div className="text-gray-600 font-semibold text-lg group-hover:text-gray-800 transition-colors">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Enhanced Main About Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Enhanced Content */}
          <div className="space-y-8">
            <div className="space-y-6">
              <div className="inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-r from-primary-100 to-secondary-100 border border-primary-200/50 mb-6">
                <Award className="h-4 w-4 text-primary-600 mr-2" />
                <span className="text-sm font-semibold text-primary-800">About CareerWise</span>
              </div>
              
              <h2 className="text-4xl sm:text-5xl font-extrabold text-gray-900 leading-tight">
                Democratizing{" "}
                <span className="bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent">
                  Career Success
                </span>
              </h2>
              <p className="text-xl text-gray-600 leading-relaxed font-medium">
                Our mission is to democratize career guidance through innovative AI technology and human expertise
              </p>
            </div>

            <div className="space-y-6">
              <p className="text-gray-700 leading-relaxed text-lg">
                CareerWise was founded with a simple yet powerful vision: to make personalized career guidance accessible to everyone, regardless of their background or resources. We combine cutting-edge artificial intelligence with human expertise to provide accurate, actionable career advice.
              </p>

              <p className="text-gray-700 leading-relaxed text-lg">
                Our team includes career counselors, data scientists, and industry professionals who work together to ensure our AI recommendations are grounded in real-world insights and opportunities.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-6">
              <Button variant="primary" size="lg" className="shadow-lg hover:shadow-xl">
                <Users className="h-5 w-5 mr-3" />
                Meet Our Team
              </Button>
              <Button variant="outline" size="lg" className="border-2 hover:border-primary-300">
                <Zap className="h-5 w-5 mr-3" />
                Our Methodology
              </Button>
            </div>
          </div>

          {/* Enhanced Image with Premium Team Visualization */}
          <div className="relative">
            <div className="aspect-w-4 aspect-h-3 rounded-3xl overflow-hidden shadow-2xl">
              <div className="bg-gradient-to-br from-primary-500 via-purple-600 to-secondary-500 h-96 flex items-center justify-center relative">
                {/* Enhanced overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-black/15 via-transparent to-black/25"></div>

                {/* Premium Team Collaboration Visualization */}
                <div className="relative z-10 text-center text-white p-8">
                  <div className="mb-8">
                    {/* Team collaboration network */}
                    <svg viewBox="0 0 200 120" className="w-full h-32 mx-auto">
                      {/* Connection lines */}
                      <g stroke="white" strokeWidth="1.5" opacity="0.6">
                        <line x1="50" y1="40" x2="100" y2="60" className="animate-pulse"/>
                        <line x1="100" y1="60" x2="150" y2="40" className="animate-pulse" style={{animationDelay: '0.5s'}}/>
                        <line x1="50" y1="40" x2="75" y2="80" className="animate-pulse" style={{animationDelay: '1s'}}/>
                        <line x1="150" y1="40" x2="125" y2="80" className="animate-pulse" style={{animationDelay: '1.5s'}}/>
                      </g>
                      
                      {/* Team member avatars */}
                      <g>
                        <circle cx="50" cy="40" r="12" fill="white" fillOpacity="0.9" className="animate-pulse">
                          <animate attributeName="fill-opacity" values="0.9;1;0.9" dur="2s" repeatCount="indefinite"/>
                        </circle>
                        <circle cx="100" cy="60" r="14" fill="white" fillOpacity="0.9" className="animate-pulse" style={{animationDelay: '0.5s'}}>
                          <animate attributeName="fill-opacity" values="0.9;1;0.9" dur="2s" repeatCount="indefinite"/>
                        </circle>
                        <circle cx="150" cy="40" r="12" fill="white" fillOpacity="0.9" className="animate-pulse" style={{animationDelay: '1s'}}>
                          <animate attributeName="fill-opacity" values="0.9;1;0.9" dur="2s" repeatCount="indefinite"/>
                        </circle>
                        <circle cx="75" cy="80" r="11" fill="white" fillOpacity="0.9" className="animate-pulse" style={{animationDelay: '1.5s'}}>
                          <animate attributeName="fill-opacity" values="0.9;1;0.9" dur="2s" repeatCount="indefinite"/>
                        </circle>
                        <circle cx="125" cy="80" r="11" fill="white" fillOpacity="0.9" className="animate-pulse" style={{animationDelay: '2s'}}>
                          <animate attributeName="fill-opacity" values="0.9;1;0.9" dur="2s" repeatCount="indefinite"/>
                        </circle>
                      </g>
                      
                      {/* Professional expertise indicators */}
                      <g fill="#10b981" className="animate-bounce">
                        <circle cx="100" cy="30" r="2"/>
                        <circle cx="170" cy="60" r="2"/>
                        <circle cx="30" cy="70" r="2"/>
                      </g>
                    </svg>
                  </div>
                  
                  <h3 className="text-3xl font-bold mb-4 leading-tight">
                    Driven by Passion for
                    <br />
                    <span className="text-primary-100">Student Success</span>
                  </h3>
                  <p className="text-xl opacity-90 max-w-lg mx-auto leading-relaxed">
                    Our diverse team combines expertise in career counseling, technology, and data science to create innovative solutions that truly work.
                  </p>
                </div>

                {/* Enhanced decorative elements */}
                <div className="absolute top-8 left-8 w-6 h-6 bg-white bg-opacity-20 rounded-full flex items-center justify-center animate-pulse">
                  <div className="w-3 h-3 bg-white bg-opacity-60 rounded-full"></div>
                </div>
                <div className="absolute top-16 right-16 w-8 h-8 bg-gradient-to-br from-yellow-300/40 to-orange-300/30 rounded-full flex items-center justify-center animate-float">
                  <div className="w-4 h-4 bg-white bg-opacity-50 rounded-full"></div>
                </div>
                <div className="absolute bottom-16 left-16 w-10 h-10 bg-gradient-to-br from-green-300/30 to-emerald-300/40 rounded-full flex items-center justify-center animate-float" style={{animationDelay: '1s'}}>
                  <div className="w-5 h-5 bg-white bg-opacity-40 rounded-full"></div>
                </div>
                <div className="absolute bottom-12 right-12 w-7 h-7 bg-gradient-to-br from-pink-300/30 to-purple-300/40 rounded-full flex items-center justify-center animate-pulse" style={{animationDelay: '0.5s'}}>
                  <div className="w-3 h-3 bg-white bg-opacity-50 rounded-full"></div>
                </div>
                
                {/* Additional corner decorations */}
                <div className="absolute top-4 right-4 w-3 h-3 bg-white bg-opacity-30 rounded-full animate-pulse"></div>
                <div className="absolute bottom-4 left-4 w-4 h-4 bg-white bg-opacity-25 rounded-full animate-float"></div>
              </div>
            </div>
            
            {/* Surrounding decorative elements */}
            <div className="absolute -top-8 -left-8 w-16 h-16 bg-gradient-to-br from-primary-200/40 to-secondary-200/30 rounded-full animate-pulse"></div>
            <div className="absolute -bottom-8 -right-8 w-20 h-20 bg-gradient-to-br from-secondary-200/30 to-primary-200/40 rounded-full animate-pulse" style={{animationDelay: '1s'}}></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
