import React from "react";
import { Sparkles, BookOpen, Target, Shield, Zap, TrendingUp, Users, Award } from "lucide-react";

const Features: React.FC = () => {
  const features = [
    {
      icon: <Sparkles className="h-7 w-7 text-primary-600" />,
      title: "Real-Time AI Insights",
      description:
        "Access up-to-date career information and personalized recommendations based on current market trends.",
      bgGradient: "from-primary-50 to-blue-50",
      iconBg: "bg-gradient-to-br from-primary-100 to-primary-50",
    },
    {
      icon: <BookOpen className="h-7 w-7 text-green-600" />,
      title: "College and Job Fit",
      description:
        "Find educational programs and job opportunities that align with your skills, interests, and career goals.",
      bgGradient: "from-green-50 to-emerald-50", 
      iconBg: "bg-gradient-to-br from-green-100 to-green-50",
    },
    {
      icon: <Target className="h-7 w-7 text-blue-600" />,
      title: "Resume + LinkedIn Guidance",
      description:
        "Optimize your professional profiles with targeted advice to stand out to recruiters and hiring managers.",
      bgGradient: "from-blue-50 to-cyan-50",
      iconBg: "bg-gradient-to-br from-blue-100 to-blue-50",
    },
    {
      icon: <Shield className="h-7 w-7 text-purple-600" />,
      title: "Safe & Trusted Suggestions",
      description:
        "Receive ethical, unbiased career guidance backed by research and industry expertise.",
      bgGradient: "from-purple-50 to-violet-50",
      iconBg: "bg-gradient-to-br from-purple-100 to-purple-50",
    },
  ];

  return (
    <section id="features" className="py-32 bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Enhanced Section Header */}
        <div className="text-center mb-20">
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-r from-primary-100 to-secondary-100 border border-primary-200/50 mb-6">
            <Zap className="h-4 w-4 text-primary-600 mr-2" />
            <span className="text-sm font-semibold text-primary-800">Advanced Features</span>
          </div>
          <h2 className="text-4xl sm:text-5xl font-extrabold text-gray-900 mb-6 leading-tight">
            Powerful Features for{" "}
            <span className="bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent">
              Career Success
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
            Advanced AI technology designed to provide actionable career guidance and accelerate your professional growth
          </p>
        </div>

        {/* Enhanced Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-24">
          {features.map((feature, index) => (
            <div key={index} className={`group relative bg-gradient-to-br ${feature.bgGradient} rounded-3xl p-8 hover:shadow-xl hover:scale-105 transition-all duration-500 border border-white/50 backdrop-blur-sm`}>
              {/* Icon with enhanced styling */}
              <div className={`w-20 h-20 ${feature.iconBg} rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 group-hover:rotate-3 transition-all duration-500 shadow-lg`}>
                {feature.icon}
              </div>

              <h3 className="text-xl font-bold text-gray-900 mb-4 group-hover:text-gray-800 transition-colors text-center">
                {feature.title}
              </h3>

              <p className="text-gray-600 leading-relaxed text-center group-hover:text-gray-700 transition-colors">
                {feature.description}
              </p>
              
              {/* Decorative corner accent */}
              <div className="absolute top-3 right-3 w-3 h-3 bg-white/40 rounded-full group-hover:scale-150 transition-all duration-500"></div>
            </div>
          ))}
        </div>

        {/* Enhanced Feature Showcase Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Premium SVG Illustration */}
          <div className="relative order-2 lg:order-1">
            <div className="aspect-w-4 aspect-h-3 rounded-3xl overflow-hidden shadow-2xl">
              <div className="bg-gradient-to-br from-emerald-400 via-blue-500 to-purple-600 h-96 flex items-center justify-center relative">
                {/* Enhanced overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-black/10 via-transparent to-black/20"></div>

                {/* Premium Career Network Visualization */}
                <div className="relative z-10 w-full h-full flex items-center justify-center p-8">
                  <svg viewBox="0 0 300 200" className="w-full h-full max-w-sm">
                    {/* Background network lines */}
                    <defs>
                      <radialGradient id="nodeGradient" cx="50%" cy="50%" r="50%">
                        <stop offset="0%" stopColor="white" stopOpacity="0.9"/>
                        <stop offset="100%" stopColor="white" stopOpacity="0.6"/>
                      </radialGradient>
                    </defs>
                    
                    {/* Connection lines */}
                    <g stroke="white" strokeWidth="2" opacity="0.6">
                      <line x1="60" y1="60" x2="120" y2="80" className="animate-pulse" style={{animationDelay: '0.5s'}}/>
                      <line x1="120" y1="80" x2="180" y2="60" className="animate-pulse" style={{animationDelay: '1s'}}/>
                      <line x1="180" y1="60" x2="240" y2="100" className="animate-pulse" style={{animationDelay: '1.5s'}}/>
                      <line x1="120" y1="80" x2="150" y2="140" className="animate-pulse" style={{animationDelay: '2s'}}/>
                      <line x1="60" y1="60" x2="80" y2="120" className="animate-pulse"/>
                    </g>
                    
                    {/* Career milestone nodes */}
                    <circle cx="60" cy="60" r="12" fill="url(#nodeGradient)" className="animate-pulse">
                      <animate attributeName="r" values="12;15;12" dur="3s" repeatCount="indefinite"/>
                    </circle>
                    <circle cx="120" cy="80" r="15" fill="url(#nodeGradient)" className="animate-pulse" style={{animationDelay: '1s'}}>
                      <animate attributeName="r" values="15;18;15" dur="3s" repeatCount="indefinite"/>
                    </circle>
                    <circle cx="180" cy="60" r="13" fill="url(#nodeGradient)" className="animate-pulse" style={{animationDelay: '0.5s'}}>
                      <animate attributeName="r" values="13;16;13" dur="3s" repeatCount="indefinite"/>
                    </circle>
                    <circle cx="240" cy="100" r="14" fill="url(#nodeGradient)" className="animate-pulse" style={{animationDelay: '1.5s'}}>
                      <animate attributeName="r" values="14;17;14" dur="3s" repeatCount="indefinite"/>
                    </circle>
                    <circle cx="150" cy="140" r="11" fill="url(#nodeGradient)" className="animate-pulse" style={{animationDelay: '2s'}}>
                      <animate attributeName="r" values="11;14;11" dur="3s" repeatCount="indefinite"/>
                    </circle>
                    <circle cx="80" cy="120" r="10" fill="url(#nodeGradient)" className="animate-pulse" style={{animationDelay: '0.3s'}}>
                      <animate attributeName="r" values="10;13;10" dur="3s" repeatCount="indefinite"/>
                    </circle>
                    
                    {/* Success indicators */}
                    <g fill="#10b981">
                      <circle cx="240" cy="100" r="3" className="animate-bounce"/>
                      <path d="M238 100 L240 102 L243 98" stroke="#10b981" strokeWidth="1" fill="none"/>
                    </g>
                    
                    {/* Text labels */}
                    <text x="150" y="30" textAnchor="middle" fill="white" fontSize="16" fontWeight="bold" className="animate-fade-in">
                      Global Career Network
                    </text>
                    <text x="150" y="180" textAnchor="middle" fill="white" fontSize="12" opacity="0.9">
                      Connected Opportunities
                    </text>
                  </svg>
                </div>

                {/* Enhanced decorative floating elements */}
                <div className="absolute top-8 left-8 w-4 h-4 bg-white bg-opacity-40 rounded-full animate-float shadow-lg"></div>
                <div className="absolute top-16 right-12 w-3 h-3 bg-yellow-300 bg-opacity-60 rounded-full animate-float shadow-md" style={{ animationDelay: "1s" }}></div>
                <div className="absolute bottom-12 left-16 w-5 h-5 bg-green-300 bg-opacity-50 rounded-full animate-float shadow-lg" style={{ animationDelay: "2s" }}></div>
                <div className="absolute bottom-8 right-8 w-4 h-4 bg-pink-300 bg-opacity-40 rounded-full animate-float shadow-md" style={{ animationDelay: "0.5s" }}></div>
              </div>
            </div>
            
            {/* Additional decorative elements around the image */}
            <div className="absolute -top-6 -left-6 w-12 h-12 bg-gradient-to-br from-primary-200 to-secondary-200 rounded-full opacity-30 animate-pulse"></div>
            <div className="absolute -bottom-6 -right-6 w-16 h-16 bg-gradient-to-br from-secondary-200 to-primary-200 rounded-full opacity-20 animate-pulse" style={{animationDelay: '1s'}}></div>
          </div>

          {/* Enhanced Content */}
          <div className="space-y-8 order-1 lg:order-2">
            <div className="space-y-6">
              <h3 className="text-4xl font-bold text-gray-900 leading-tight">
                Powered by{" "}
                <span className="bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent">
                  Advanced AI
                </span>
              </h3>
              <p className="text-xl text-gray-600 leading-relaxed">
                Our platform utilizes cutting-edge machine learning to analyze career patterns and provide personalized recommendations based on your unique profile and goals.
              </p>
            </div>

            {/* Enhanced feature list */}
            <div className="space-y-6">
              {[
                { icon: <TrendingUp className="h-6 w-6 text-emerald-600" />, text: "Customized career path recommendations" },
                { icon: <Award className="h-6 w-6 text-blue-600" />, text: "Skill gap analysis and learning resources" },
                { icon: <Users className="h-6 w-6 text-purple-600" />, text: "Industry-specific insights and trends" }
              ].map((item, index) => (
                <div key={index} className="flex items-start space-x-4 group hover:bg-gray-50 rounded-xl p-4 transition-all duration-300">
                  <div className="w-12 h-12 bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    {item.icon}
                  </div>
                  <div className="flex-1">
                    <p className="text-gray-700 font-medium text-lg group-hover:text-gray-900 transition-colors">
                      {item.text}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;
