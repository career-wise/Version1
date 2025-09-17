import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Sparkles, Play, Star, Users, TrendingUp } from "lucide-react";
import Button from "../ui/Button";

const Hero: React.FC = () => {
  const features = [
    {
      icon: "🎯",
      label: "AI Career Matching",
      bgColor: "bg-gradient-to-br from-blue-50 to-indigo-100",
      iconColor: "text-blue-600",
      description: "Smart recommendations"
    },
    {
      icon: "📊",
      label: "Skills Assessment",
      bgColor: "bg-gradient-to-br from-pink-50 to-rose-100",
      iconColor: "text-pink-600",
      description: "Identify strengths"
    },
    {
      icon: "🎤",
      label: "Interview Prep",
      bgColor: "bg-gradient-to-br from-purple-50 to-violet-100",
      iconColor: "text-purple-600",
      description: "Practice & improve"
    },
    {
      icon: "📚",
      label: "Learning Paths",
      bgColor: "bg-gradient-to-br from-green-50 to-emerald-100",
      iconColor: "text-green-600",
      description: "Skill development"
    },
  ];

  const stats = [
    { number: "50K+", label: "Students Guided", icon: Users },
    { number: "95%", label: "Success Rate", icon: TrendingUp },
    { number: "4.9/5", label: "User Rating", icon: Star },
  ];

  return (
    <section className="relative bg-white overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-72 h-72 bg-gradient-to-r from-primary-100 to-secondary-100 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-float"></div>
        <div className="absolute top-40 right-10 w-72 h-72 bg-gradient-to-r from-purple-100 to-pink-100 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-float" style={{ animationDelay: '2s' }}></div>
        <div className="absolute -bottom-8 left-20 w-72 h-72 bg-gradient-to-r from-yellow-100 to-orange-100 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-float" style={{ animationDelay: '4s' }}></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="pt-20 pb-16 sm:pt-24 sm:pb-20 lg:pt-32 lg:pb-24">
          {/* Trust Indicators */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-full text-sm font-medium text-green-800 mb-6">
              <div className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse"></div>
              Trusted by 50,000+ students worldwide
            </div>
          </div>

          {/* Main content */}
          <div className="text-center">
            <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold text-gray-900 leading-tight mb-8">
              Your AI-Powered
              <br />
              <span className="bg-gradient-to-r from-indigo-600 via-purple-600 to-blue-600 bg-clip-text text-transparent animate-pulse">
                Career Navigator
              </span>
            </h1>

            <div className="max-w-4xl mx-auto mb-12">
              <p className="text-xl sm:text-2xl text-gray-600 leading-relaxed mb-6">
                Transform uncertainty into clarity with personalized AI guidance.
              </p>
              <p className="text-lg text-gray-500">
                From high school to executive level - we've got your career journey covered.
              </p>
            </div>

            {/* Social Proof */}
            <div className="flex items-center justify-center space-x-8 mb-12">
              {stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="flex items-center justify-center mb-2">
                    <stat.icon className="h-5 w-5 text-primary-600 mr-2" />
                    <span className="text-2xl font-bold text-gray-900">{stat.number}</span>
                  </div>
                  <span className="text-sm text-gray-600">{stat.label}</span>
                </div>
              ))}
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
              <Link to="/auth">
                <Button size="lg" className="w-full sm:w-auto min-w-[200px] h-14 text-lg font-semibold shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300">
                  <Sparkles className="h-5 w-5 mr-2" />
                  Start Your Journey
                  <ArrowRight className="h-5 w-5 ml-2" />
                </Button>
              </Link>

              <Link to="/chat">
                <Button
                  variant="outline"
                  size="lg"
                  className="w-full sm:w-auto min-w-[180px] h-14 text-lg font-semibold border-2 hover:bg-gray-50 group"
                >
                  <Play className="h-5 w-5 mr-2 group-hover:text-primary-600 transition-colors" />
                  Try AI Chat
                </Button>
              </Link>
            </div>

            {/* Feature Cards */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-6xl mx-auto">
              {features.map((feature, index) => (
                <div
                  key={index}
                  className="group relative bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border border-gray-100"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-white to-gray-50 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <div className="relative">
                    <div
                      className={`w-16 h-16 ${feature.bgColor} rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg`}
                    >
                      <span className="text-3xl">{feature.icon}</span>
                    </div>
                    <h3 className="text-sm font-bold text-gray-900 mb-2">
                      {feature.label}
                    </h3>
                    <p className="text-xs text-gray-600">
                      {feature.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Hero Visual Section */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <div className="relative">
          <div className="aspect-w-16 aspect-h-9 rounded-3xl overflow-hidden shadow-2xl">
            <div className="bg-gradient-to-br from-indigo-600 via-purple-600 to-blue-600 h-96 flex items-center justify-center relative">
              {/* Overlay pattern */}
              <div className="absolute inset-0 bg-black bg-opacity-20"></div>
              
              {/* Grid Pattern Overlay */}
              <div className="absolute inset-0 opacity-10">
                <div className="grid grid-cols-12 gap-4 h-full p-8">
                  {Array.from({ length: 48 }).map((_, i) => (
                    <div key={i} className="bg-white rounded-lg animate-pulse" style={{ animationDelay: `${i * 0.1}s` }}></div>
                  ))}
                </div>
              </div>

              {/* Dashboard Preview */}
              <div className="relative z-10 w-full max-w-4xl mx-auto p-8">
                <div className="bg-white bg-opacity-95 backdrop-blur-sm rounded-2xl shadow-2xl p-6">
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-full"></div>
                      <div>
                        <div className="h-3 bg-gray-300 rounded w-24 mb-1"></div>
                        <div className="h-2 bg-gray-200 rounded w-16"></div>
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      <div className="w-3 h-3 bg-red-400 rounded-full"></div>
                      <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
                      <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-3 gap-4 mb-4">
                    <div className="bg-gradient-to-br from-blue-50 to-indigo-100 rounded-lg p-4">
                      <div className="h-2 bg-blue-300 rounded w-3/4 mb-2"></div>
                      <div className="h-6 bg-blue-400 rounded w-1/2"></div>
                    </div>
                    <div className="bg-gradient-to-br from-green-50 to-emerald-100 rounded-lg p-4">
                      <div className="h-2 bg-green-300 rounded w-2/3 mb-2"></div>
                      <div className="h-6 bg-green-400 rounded w-3/5"></div>
                    </div>
                    <div className="bg-gradient-to-br from-purple-50 to-violet-100 rounded-lg p-4">
                      <div className="h-2 bg-purple-300 rounded w-4/5 mb-2"></div>
                      <div className="h-6 bg-purple-400 rounded w-2/3"></div>
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-gradient-to-br from-pink-400 to-rose-500 rounded-full"></div>
                      <div className="flex-1">
                        <div className="h-3 bg-gray-300 rounded w-3/4 mb-1"></div>
                        <div className="h-2 bg-gray-200 rounded w-1/2"></div>
                      </div>
                      <div className="w-16 h-6 bg-primary-500 rounded"></div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-full"></div>
                      <div className="flex-1">
                        <div className="h-3 bg-gray-300 rounded w-2/3 mb-1"></div>
                        <div className="h-2 bg-gray-200 rounded w-3/5"></div>
                      </div>
                      <div className="w-16 h-6 bg-green-500 rounded"></div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Floating elements */}
              <div className="absolute top-10 left-10 w-4 h-4 bg-white bg-opacity-40 rounded-full animate-float"></div>
              <div
                className="absolute top-20 right-16 w-6 h-6 bg-white bg-opacity-30 rounded-full animate-float"
                style={{ animationDelay: "1s" }}
              ></div>
              <div
                className="absolute bottom-16 left-16 w-3 h-3 bg-white bg-opacity-50 rounded-full animate-float"
                style={{ animationDelay: "2s" }}
              ></div>
              <div
                className="absolute bottom-20 right-10 w-5 h-5 bg-white bg-opacity-35 rounded-full animate-float"
                style={{ animationDelay: "0.5s" }}
              ></div>
            </div>
          </div>
          
          {/* Decorative elements around the hero image */}
          <div className="absolute -top-4 -left-4 w-8 h-8 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full shadow-lg animate-bounce"></div>
          <div className="absolute -top-2 -right-6 w-6 h-6 bg-gradient-to-br from-pink-400 to-rose-500 rounded-full shadow-lg animate-bounce" style={{ animationDelay: '1s' }}></div>
          <div className="absolute -bottom-4 -left-6 w-10 h-10 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full shadow-lg animate-bounce" style={{ animationDelay: '2s' }}></div>
          <div className="absolute -bottom-2 -right-4 w-7 h-7 bg-gradient-to-br from-blue-400 to-cyan-500 rounded-full shadow-lg animate-bounce" style={{ animationDelay: '0.5s' }}></div>
        </div>
      </div>
    </section>
  );
};

export default Hero;