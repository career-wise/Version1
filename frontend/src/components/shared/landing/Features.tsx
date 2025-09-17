import React from "react";
import { Sparkles, BookOpen, Target, Shield, Zap, Brain, Users, TrendingUp } from "lucide-react";

const Features: React.FC = () => {
  const mainFeatures = [
    {
      icon: <Sparkles className="h-8 w-8 text-primary-600" />,
      title: "AI-Powered Insights",
      description: "Get personalized career recommendations based on your unique profile, skills, and aspirations.",
      gradient: "from-blue-500 to-indigo-600",
      bgGradient: "from-blue-50 to-indigo-100",
    },
    {
      icon: <BookOpen className="h-8 w-8 text-green-600" />,
      title: "Smart Matching",
      description: "Find educational programs and opportunities that perfectly align with your career goals.",
      gradient: "from-green-500 to-emerald-600",
      bgGradient: "from-green-50 to-emerald-100",
    },
    {
      icon: <Target className="h-8 w-8 text-purple-600" />,
      title: "Profile Optimization",
      description: "Enhance your resume and LinkedIn profile with AI-driven suggestions and industry insights.",
      gradient: "from-purple-500 to-violet-600",
      bgGradient: "from-purple-50 to-violet-100",
    },
    {
      icon: <Shield className="h-8 w-8 text-orange-600" />,
      title: "Trusted Guidance",
      description: "Receive ethical, research-backed career advice from our advanced AI system.",
      gradient: "from-orange-500 to-red-600",
      bgGradient: "from-orange-50 to-red-100",
    },
  ];

  const additionalFeatures = [
    { icon: <Brain className="h-6 w-6" />, title: "Skill Assessment", description: "Identify strengths and gaps" },
    { icon: <Users className="h-6 w-6" />, title: "Peer Network", description: "Connect with like-minded professionals" },
    { icon: <TrendingUp className="h-6 w-6" />, title: "Market Trends", description: "Stay ahead of industry changes" },
    { icon: <Zap className="h-6 w-6" />, title: "Quick Actions", description: "Fast-track your career moves" },
  ];

  return (
    <section id="features" className="py-24 bg-gradient-to-br from-gray-50 to-white relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute top-0 left-0 w-full h-full">
        <div className="absolute top-20 left-10 w-64 h-64 bg-gradient-to-r from-primary-100 to-secondary-100 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-float"></div>
        <div className="absolute bottom-20 right-10 w-64 h-64 bg-gradient-to-r from-purple-100 to-pink-100 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-float" style={{ animationDelay: '3s' }}></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-20">
          <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-primary-50 to-secondary-50 border border-primary-200 rounded-full text-sm font-medium text-primary-800 mb-6">
            <Sparkles className="h-4 w-4 mr-2" />
            Powerful Features
          </div>
          <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6">
            Everything You Need to
            <br />
            <span className="bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent">
              Accelerate Your Career
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Our comprehensive platform combines cutting-edge AI with proven career development strategies
          </p>
        </div>

        {/* Main Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
          {mainFeatures.map((feature, index) => (
            <div key={index} className="group relative">
              <div className="absolute inset-0 bg-gradient-to-r opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl blur-xl" 
                   style={{ background: `linear-gradient(135deg, var(--tw-gradient-stops))` }}></div>
              <div className={`relative bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border border-gray-100 group-hover:border-transparent`}>
                <div className={`w-16 h-16 bg-gradient-to-br ${feature.bgGradient} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                  {feature.icon}
                </div>

                <h3 className="text-2xl font-bold text-gray-900 mb-4 group-hover:text-primary-600 transition-colors duration-300">
                  {feature.title}
                </h3>

                <p className="text-gray-600 leading-relaxed text-lg">
                  {feature.description}
                </p>

                {/* Hover effect overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-white/50 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
              </div>
            </div>
          ))}
        </div>

        {/* Additional Features */}
        <div className="bg-white rounded-3xl shadow-xl p-8 md:p-12 border border-gray-100">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-gray-900 mb-4">Plus Much More</h3>
            <p className="text-lg text-gray-600">Additional tools and features to support your journey</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {additionalFeatures.map((feature, index) => (
              <div key={index} className="text-center group">
                <div className="w-12 h-12 bg-gradient-to-br from-gray-100 to-gray-200 rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:from-primary-100 group-hover:to-secondary-100 transition-all duration-300 group-hover:scale-110">
                  <div className="text-gray-600 group-hover:text-primary-600 transition-colors duration-300">
                    {feature.icon}
                  </div>
                </div>
                <h4 className="font-semibold text-gray-900 mb-2 group-hover:text-primary-600 transition-colors duration-300">
                  {feature.title}
                </h4>
                <p className="text-sm text-gray-600">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Feature Showcase Section */}
        <div className="mt-24 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Content */}
          <div className="space-y-8">
            <div>
              <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-full text-sm font-medium text-green-800 mb-6">
                <Brain className="h-4 w-4 mr-2" />
                AI-Powered Intelligence
              </div>
              <h3 className="text-4xl font-bold text-gray-900 mb-6">
                Smarter Career Decisions with
                <span className="bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent"> Advanced AI</span>
              </h3>
              <p className="text-xl text-gray-600 leading-relaxed mb-8">
                Our platform analyzes thousands of career patterns, market trends, and success stories to provide you with personalized recommendations that actually work.
              </p>
            </div>

            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <div className="w-8 h-8 bg-gradient-to-br from-green-100 to-emerald-200 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">Personalized Career Mapping</h4>
                  <p className="text-gray-600">Get customized career paths based on your unique skills, interests, and market opportunities.</p>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <div className="w-8 h-8 bg-gradient-to-br from-blue-100 to-indigo-200 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">Real-Time Market Insights</h4>
                  <p className="text-gray-600">Stay ahead with up-to-date industry trends, salary data, and job market analysis.</p>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <div className="w-8 h-8 bg-gradient-to-br from-purple-100 to-violet-200 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">Continuous Learning Recommendations</h4>
                  <p className="text-gray-600">Discover skills to develop and courses to take for maximum career impact.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Visual */}
          <div className="relative">
            <div className="aspect-square rounded-3xl overflow-hidden shadow-2xl">
              <div className="bg-gradient-to-br from-green-400 via-blue-500 to-purple-600 h-full flex items-center justify-center relative">
                {/* Overlay */}
                <div className="absolute inset-0 bg-black bg-opacity-10"></div>

                {/* AI Visualization */}
                <div className="relative z-10 w-full h-full flex items-center justify-center p-8">
                  <div className="bg-white bg-opacity-95 backdrop-blur-sm rounded-2xl shadow-2xl p-6 w-full max-w-sm">
                    <div className="text-center mb-6">
                      <div className="w-16 h-16 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-full mx-auto mb-4 flex items-center justify-center">
                        <Brain className="h-8 w-8 text-white" />
                      </div>
                      <h4 className="font-bold text-gray-900">AI Analysis</h4>
                    </div>
                    
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-600">Career Match</span>
                        <div className="flex items-center">
                          <div className="w-16 h-2 bg-gray-200 rounded-full mr-2">
                            <div className="w-14 h-2 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full"></div>
                          </div>
                          <span className="text-sm font-semibold text-green-600">94%</span>
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-600">Skill Alignment</span>
                        <div className="flex items-center">
                          <div className="w-16 h-2 bg-gray-200 rounded-full mr-2">
                            <div className="w-12 h-2 bg-gradient-to-r from-blue-400 to-indigo-500 rounded-full"></div>
                          </div>
                          <span className="text-sm font-semibold text-blue-600">87%</span>
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-600">Market Demand</span>
                        <div className="flex items-center">
                          <div className="w-16 h-2 bg-gray-200 rounded-full mr-2">
                            <div className="w-15 h-2 bg-gradient-to-r from-purple-400 to-violet-500 rounded-full"></div>
                          </div>
                          <span className="text-sm font-semibold text-purple-600">91%</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Floating AI elements */}
                <div className="absolute top-8 left-8 w-3 h-3 bg-white bg-opacity-40 rounded-full animate-pulse"></div>
                <div className="absolute top-12 right-12 w-2 h-2 bg-white bg-opacity-50 rounded-full animate-pulse" style={{ animationDelay: '1s' }}></div>
                <div className="absolute bottom-12 left-12 w-4 h-4 bg-white bg-opacity-30 rounded-full animate-pulse" style={{ animationDelay: '2s' }}></div>
                <div className="absolute bottom-8 right-8 w-2 h-2 bg-white bg-opacity-60 rounded-full animate-pulse" style={{ animationDelay: '0.5s' }}></div>
              </div>
            </div>
            
            {/* Decorative elements */}
            <div className="absolute -top-4 -right-4 w-8 h-8 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full shadow-lg animate-bounce"></div>
            <div className="absolute -bottom-4 -left-4 w-6 h-6 bg-gradient-to-br from-pink-400 to-rose-500 rounded-full shadow-lg animate-bounce" style={{ animationDelay: '1s' }}></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;