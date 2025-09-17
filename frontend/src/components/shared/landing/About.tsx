import React from "react";
import { Users, Clock, TrendingUp, Heart, Award, Globe, Zap, Shield } from "lucide-react";
import Button from "../ui/Button";

const About: React.FC = () => {
  const stats = [
    {
      icon: <Users className="h-10 w-10 text-primary-600" />,
      number: "50,000+",
      label: "Lives Transformed",
      description: "Students and professionals guided to success"
    },
    {
      icon: <Clock className="h-10 w-10 text-green-600" />,
      number: "500+",
      label: "Career Paths",
      description: "Comprehensive coverage across all industries"
    },
    {
      icon: <TrendingUp className="h-10 w-10 text-blue-600" />,
      number: "94%",
      label: "Success Rate",
      description: "Users achieve their career goals within 12 months"
    },
    {
      icon: <Heart className="h-10 w-10 text-red-500" />,
      number: "4.9/5",
      label: "User Satisfaction",
      description: "Consistently rated as life-changing"
    },
  ];

  const values = [
    {
      icon: <Award className="h-8 w-8 text-yellow-600" />,
      title: "Excellence",
      description: "We strive for the highest quality in everything we do, from our AI algorithms to user experience."
    },
    {
      icon: <Globe className="h-8 w-8 text-blue-600" />,
      title: "Accessibility",
      description: "Career guidance should be available to everyone, regardless of background or resources."
    },
    {
      icon: <Zap className="h-8 w-8 text-purple-600" />,
      title: "Innovation",
      description: "We continuously push the boundaries of what's possible with AI and career development."
    },
    {
      icon: <Shield className="h-8 w-8 text-green-600" />,
      title: "Trust",
      description: "We provide ethical, unbiased guidance based on research and real-world data."
    },
  ];

  return (
    <section id="about" className="py-24 bg-white relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute inset-0">
        <div className="absolute top-20 right-10 w-72 h-72 bg-gradient-to-r from-primary-100 to-secondary-100 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-float"></div>
        <div className="absolute bottom-20 left-10 w-72 h-72 bg-gradient-to-r from-purple-100 to-pink-100 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-float" style={{ animationDelay: '2s' }}></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Stats Section */}
        <div className="text-center mb-20">
          <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-primary-50 to-secondary-50 border border-primary-200 rounded-full text-sm font-medium text-primary-800 mb-6">
            <TrendingUp className="h-4 w-4 mr-2" />
            Our Impact
          </div>
          <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6">
            Transforming Careers
            <br />
            <span className="bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent">
              Around the World
            </span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-24">
          {stats.map((stat, index) => (
            <div key={index} className="group text-center">
              <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border border-gray-100 group-hover:border-transparent">
                <div className="w-16 h-16 bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg group-hover:from-primary-50 group-hover:to-secondary-50">
                  {stat.icon}
                </div>
                <div className="text-3xl font-bold text-gray-900 mb-2 group-hover:text-primary-600 transition-colors duration-300">
                  {stat.number}
                </div>
                <div className="font-semibold text-gray-900 mb-2">{stat.label}</div>
                <div className="text-sm text-gray-600">{stat.description}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Main About Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-24">
          {/* Content */}
          <div className="space-y-8">
            <div>
              <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-full text-sm font-medium text-blue-800 mb-6">
                <Heart className="h-4 w-4 mr-2" />
                Our Mission
              </div>
              <h3 className="text-4xl font-bold text-gray-900 mb-6">
                Democratizing Career Success with
                <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent"> AI Innovation</span>
              </h3>
              <p className="text-xl text-gray-600 leading-relaxed mb-8">
                We believe everyone deserves access to world-class career guidance. Our mission is to break down barriers and make personalized career development accessible to all.
              </p>
            </div>

            <div className="space-y-6">
              <p className="text-gray-700 leading-relaxed">
                Founded by a team of career counselors, data scientists, and industry professionals, Careerist combines decades of career development expertise with cutting-edge artificial intelligence.
              </p>

              <p className="text-gray-700 leading-relaxed">
                Our platform analyzes millions of career paths, market trends, and success stories to provide you with insights that were previously only available to those with access to expensive career coaches and industry insiders.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button variant="primary" size="lg" className="group">
                Learn About Our Team
                <Users className="h-5 w-5 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
              </Button>
              <Button variant="outline" size="lg" className="group">
                Our Methodology
                <Zap className="h-5 w-5 ml-2 group-hover:scale-110 transition-transform duration-300" />
              </Button>
            </div>
          </div>

          {/* Visual */}
          <div className="relative">
            <div className="aspect-square rounded-3xl overflow-hidden shadow-2xl">
              <div className="bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 h-full flex items-center justify-center relative">
                {/* Overlay */}
                <div className="absolute inset-0 bg-black bg-opacity-10"></div>

                {/* Team/office environment visualization */}
                <div className="relative z-10 w-full h-full p-8">
                  <div className="bg-white bg-opacity-95 backdrop-blur-sm rounded-2xl shadow-2xl p-6 h-full flex flex-col justify-center">
                    <div className="text-center mb-6">
                      <div className="grid grid-cols-3 gap-4 mb-6">
                        {/* Team member avatars */}
                        <div className="w-16 h-16 bg-gradient-to-br from-blue-400 to-indigo-500 rounded-full flex items-center justify-center">
                          <Users className="h-8 w-8 text-white" />
                        </div>
                        <div className="w-16 h-16 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full flex items-center justify-center">
                          <Zap className="h-8 w-8 text-white" />
                        </div>
                        <div className="w-16 h-16 bg-gradient-to-br from-purple-400 to-violet-500 rounded-full flex items-center justify-center">
                          <Award className="h-8 w-8 text-white" />
                        </div>
                        <div className="w-16 h-16 bg-gradient-to-br from-pink-400 to-rose-500 rounded-full flex items-center justify-center">
                          <Globe className="h-8 w-8 text-white" />
                        </div>
                        <div className="w-16 h-16 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center">
                          <Shield className="h-8 w-8 text-white" />
                        </div>
                        <div className="w-16 h-16 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-full flex items-center justify-center">
                          <Heart className="h-8 w-8 text-white" />
                        </div>
                      </div>
                      <h4 className="text-xl font-bold text-gray-900 mb-2">
                        Expert Team
                      </h4>
                      <p className="text-gray-600 text-sm">
                        Career counselors, AI researchers, and industry professionals working together
                      </p>
                    </div>
                  </div>
                </div>

                {/* Floating elements */}
                <div className="absolute top-8 left-8 w-4 h-4 bg-white bg-opacity-40 rounded-full animate-float"></div>
                <div className="absolute top-12 right-12 w-3 h-3 bg-white bg-opacity-50 rounded-full animate-float" style={{ animationDelay: '1s' }}></div>
                <div className="absolute bottom-12 left-12 w-5 h-5 bg-white bg-opacity-30 rounded-full animate-float" style={{ animationDelay: '2s' }}></div>
                <div className="absolute bottom-8 right-8 w-3 h-3 bg-white bg-opacity-60 rounded-full animate-float" style={{ animationDelay: '0.5s' }}></div>
              </div>
            </div>
          </div>
        </div>

        {/* Values Section */}
        <div className="bg-gradient-to-br from-gray-50 to-white rounded-3xl shadow-xl p-8 md:p-12 border border-gray-100">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-gray-900 mb-4">Our Core Values</h3>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              The principles that guide everything we do and every decision we make
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <div key={index} className="text-center group">
                <div className="w-16 h-16 bg-white rounded-2xl shadow-lg flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300 group-hover:shadow-xl">
                  {value.icon}
                </div>
                <h4 className="text-lg font-semibold text-gray-900 mb-3 group-hover:text-primary-600 transition-colors duration-300">
                  {value.title}
                </h4>
                <p className="text-sm text-gray-600 leading-relaxed">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;