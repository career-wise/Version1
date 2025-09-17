import React from "react";
import { GraduationCap, Users, Briefcase, Lightbulb, ArrowRight, Star } from "lucide-react";

const UserTypes: React.FC = () => {
  const userTypes = [
    {
      icon: <GraduationCap className="h-10 w-10 text-primary-600" />,
      title: "High School Students",
      description: "Discover your potential and plan your educational journey with confidence.",
      features: ["Career exploration", "College planning", "Skill development"],
      gradient: "from-blue-500 to-indigo-600",
      bgGradient: "from-blue-50 to-indigo-100",
      userCount: "25K+",
      satisfaction: "4.9",
    },
    {
      icon: <Users className="h-10 w-10 text-green-600" />,
      title: "College Students",
      description: "Navigate your transition from education to career with expert guidance.",
      features: ["Job search prep", "Interview training", "Network building"],
      gradient: "from-green-500 to-emerald-600",
      bgGradient: "from-green-50 to-emerald-100",
      userCount: "18K+",
      satisfaction: "4.8",
    },
    {
      icon: <Briefcase className="h-10 w-10 text-purple-600" />,
      title: "Working Professionals",
      description: "Advance your career, pivot to new opportunities, or climb the corporate ladder.",
      features: ["Career advancement", "Skill upgrading", "Leadership development"],
      gradient: "from-purple-500 to-violet-600",
      bgGradient: "from-purple-50 to-violet-100",
      userCount: "15K+",
      satisfaction: "4.9",
    },
    {
      icon: <Lightbulb className="h-10 w-10 text-orange-600" />,
      title: "Aspiring Entrepreneurs",
      description: "Transform your innovative ideas into successful business ventures.",
      features: ["Business planning", "Market analysis", "Funding guidance"],
      gradient: "from-orange-500 to-red-600",
      bgGradient: "from-orange-50 to-red-100",
      userCount: "8K+",
      satisfaction: "4.7",
    },
  ];

  return (
    <section id="user-types" className="py-24 bg-white relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute inset-0">
        <div className="absolute top-20 right-10 w-72 h-72 bg-gradient-to-r from-primary-100 to-secondary-100 rounded-full mix-blend-multiply filter blur-xl opacity-40 animate-float"></div>
        <div className="absolute bottom-20 left-10 w-72 h-72 bg-gradient-to-r from-purple-100 to-pink-100 rounded-full mix-blend-multiply filter blur-xl opacity-40 animate-float" style={{ animationDelay: '2s' }}></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-20">
          <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-primary-50 to-secondary-50 border border-primary-200 rounded-full text-sm font-medium text-primary-800 mb-6">
            <Users className="h-4 w-4 mr-2" />
            For Every Career Stage
          </div>
          <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6">
            Tailored Guidance for
            <br />
            <span className="bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent">
              Every Journey
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Whether you're just starting out or looking to make your next big move, we have the tools and insights you need
          </p>
        </div>

        {/* User Type Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
          {userTypes.map((type, index) => (
            <div key={index} className="group relative">
              {/* Hover glow effect */}
              <div className="absolute inset-0 bg-gradient-to-r opacity-0 group-hover:opacity-20 transition-opacity duration-300 rounded-2xl blur-xl" 
                   style={{ background: `linear-gradient(135deg, var(--tw-gradient-stops))` }}></div>
              
              <div className="relative bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-3 border border-gray-100 group-hover:border-transparent h-full">
                {/* Icon and stats */}
                <div className="flex items-center justify-between mb-6">
                  <div className={`w-16 h-16 bg-gradient-to-br ${type.bgGradient} rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                    {type.icon}
                  </div>
                  <div className="text-right">
                    <div className="flex items-center text-sm text-gray-600 mb-1">
                      <Star className="h-3 w-3 text-yellow-500 mr-1" />
                      {type.satisfaction}
                    </div>
                    <div className="text-xs text-gray-500">{type.userCount} users</div>
                  </div>
                </div>

                <h3 className="text-xl font-bold text-gray-900 mb-4 group-hover:text-primary-600 transition-colors duration-300">
                  {type.title}
                </h3>

                <p className="text-gray-600 leading-relaxed mb-6">
                  {type.description}
                </p>

                {/* Features */}
                <div className="space-y-2 mb-8">
                  {type.features.map((feature, featureIndex) => (
                    <div key={featureIndex} className="flex items-center text-sm text-gray-600">
                      <div className="w-1.5 h-1.5 bg-primary-500 rounded-full mr-3"></div>
                      {feature}
                    </div>
                  ))}
                </div>

                {/* CTA */}
                <div className="flex items-center text-primary-600 font-medium group-hover:text-primary-700 transition-colors duration-300 cursor-pointer">
                  <span className="mr-2">Get Started</span>
                  <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform duration-300" />
                </div>

                {/* Hover effect overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-white/50 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
              </div>
            </div>
          ))}
        </div>

        {/* Success Stories Section */}
        <div className="bg-gradient-to-br from-gray-50 to-white rounded-3xl shadow-xl p-8 md:p-12 border border-gray-100">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Content */}
            <div>
              <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-full text-sm font-medium text-green-800 mb-6">
                <Star className="h-4 w-4 mr-2" />
                Success Stories
              </div>
              <h3 className="text-3xl font-bold text-gray-900 mb-6">
                Join Thousands of
                <span className="bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent"> Success Stories</span>
              </h3>
              <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                Our community spans across industries, career stages, and backgrounds. What unites them? The drive to grow and the success they've achieved with our platform.
              </p>
              
              <div className="grid grid-cols-2 gap-6">
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary-600 mb-2">94%</div>
                  <div className="text-sm text-gray-600">Career Advancement</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-green-600 mb-2">87%</div>
                  <div className="text-sm text-gray-600">Salary Increase</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-purple-600 mb-2">92%</div>
                  <div className="text-sm text-gray-600">Job Satisfaction</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-orange-600 mb-2">89%</div>
                  <div className="text-sm text-gray-600">Skill Development</div>
                </div>
              </div>
            </div>

            {/* Visual */}
            <div className="relative">
              <div className="aspect-square rounded-2xl overflow-hidden shadow-2xl">
                <div className="bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 h-full flex items-center justify-center relative">
                  {/* Overlay */}
                  <div className="absolute inset-0 bg-black bg-opacity-10"></div>

                  {/* Community visualization */}
                  <div className="relative z-10 w-full h-full p-8">
                    <div className="grid grid-cols-4 gap-4 h-full">
                      {/* User avatars simulation */}
                      {Array.from({ length: 16 }).map((_, i) => (
                        <div
                          key={i}
                          className="bg-white bg-opacity-20 rounded-full flex items-center justify-center backdrop-blur-sm animate-pulse"
                          style={{ animationDelay: `${i * 0.2}s` }}
                        >
                          <div className="w-6 h-6 bg-white bg-opacity-40 rounded-full"></div>
                        </div>
                      ))}
                    </div>
                    
                    {/* Central success indicator */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="bg-white bg-opacity-95 backdrop-blur-sm rounded-2xl p-6 shadow-2xl text-center">
                        <div className="text-2xl font-bold text-gray-900 mb-1">50K+</div>
                        <div className="text-sm text-gray-600">Success Stories</div>
                      </div>
                    </div>
                  </div>

                  {/* Floating success indicators */}
                  <div className="absolute top-8 left-8 bg-green-500 text-white text-xs px-2 py-1 rounded-full animate-bounce">+25% Salary</div>
                  <div className="absolute top-12 right-8 bg-blue-500 text-white text-xs px-2 py-1 rounded-full animate-bounce" style={{ animationDelay: '1s' }}>New Role</div>
                  <div className="absolute bottom-12 left-8 bg-purple-500 text-white text-xs px-2 py-1 rounded-full animate-bounce" style={{ animationDelay: '2s' }}>Promoted</div>
                  <div className="absolute bottom-8 right-8 bg-orange-500 text-white text-xs px-2 py-1 rounded-full animate-bounce" style={{ animationDelay: '0.5s' }}>Dream Job</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default UserTypes;