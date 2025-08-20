import React from "react";
import { Sparkles, BookOpen, Target, Shield } from "lucide-react";

const Features: React.FC = () => {
  const features = [
    {
      icon: <Sparkles className="h-6 w-6 text-primary-600" />,
      title: "Real-Time AI Insights",
      description:
        "Access up-to-date career information and personalized recommendations based on current market trends.",
    },
    {
      icon: <BookOpen className="h-6 w-6 text-green-600" />,
      title: "College and Job Fit",
      description:
        "Find educational programs and job opportunities that align with your skills, interests, and career goals.",
    },
    {
      icon: <Target className="h-6 w-6 text-blue-600" />,
      title: "Resume + LinkedIn Guidance",
      description:
        "Optimize your professional profiles with targeted advice to stand out to recruiters and hiring managers.",
    },
    {
      icon: <Shield className="h-6 w-6 text-purple-600" />,
      title: "Safe & Trusted Suggestions",
      description:
        "Receive ethical, unbiased career guidance backed by research and industry expertise.",
    },
  ];

  return (
    <section id="features" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Powerful Features
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Advanced AI technology designed to provide actionable career
            guidance
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
          {features.map((feature, index) => (
            <div key={index} className="text-center group">
              <div className="w-16 h-16 bg-primary-50 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                {feature.icon}
              </div>

              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                {feature.title}
              </h3>

              <p className="text-gray-600 leading-relaxed text-sm">
                {feature.description}
              </p>
            </div>
          ))}
        </div>

        {/* Feature Showcase Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Image */}
          <div className="relative order-2 lg:order-1">
            <div className="aspect-w-4 aspect-h-3 rounded-2xl overflow-hidden">
              <div className="bg-gradient-to-br from-green-400 to-blue-500 h-96 flex items-center justify-center relative">
                {/* Overlay */}
                <div className="absolute inset-0 bg-black bg-opacity-10"></div>

                {/* Simulated city/landscape view */}
                <div className="relative z-10 w-full h-full flex items-center justify-center">
                  <div className="text-center text-white">
                    <div className="grid grid-cols-6 gap-1 mb-6 mx-auto max-w-xs">
                      {/* Simulated cityscape - buildings of different heights */}
                      {[16, 20, 14, 24, 18, 12, 22, 16, 20, 14, 26, 18].map(
                        (height, i) => (
                          <div
                            key={i}
                            className="bg-white bg-opacity-30 rounded-t-sm"
                            style={{ height: `${height * 2}px`, width: "16px" }}
                          ></div>
                        )
                      )}
                    </div>
                    <p className="text-lg font-medium opacity-90">
                      Global Career Opportunities
                    </p>
                  </div>
                </div>

                {/* Decorative elements */}
                <div className="absolute top-10 left-10 w-3 h-3 bg-white bg-opacity-30 rounded-full animate-float"></div>
                <div
                  className="absolute top-16 right-12 w-2 h-2 bg-white bg-opacity-40 rounded-full animate-float"
                  style={{ animationDelay: "1s" }}
                ></div>
                <div
                  className="absolute bottom-12 left-16 w-4 h-4 bg-white bg-opacity-25 rounded-full animate-float"
                  style={{ animationDelay: "2s" }}
                ></div>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="space-y-6 order-1 lg:order-2">
            <h3 className="text-3xl font-bold text-gray-900">
              Powered by Advanced AI
            </h3>
            <p className="text-lg text-gray-600 leading-relaxed">
              Our platform utilizes cutting-edge machine learning to analyze
              career patterns and provide personalized recommendations based on
              your unique profile and goals.
            </p>

            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                <p className="text-gray-700">
                  Customized career path recommendations
                </p>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                <p className="text-gray-700">
                  Skill gap analysis and learning resources
                </p>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                <p className="text-gray-700">
                  Industry-specific insights and trends
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;
