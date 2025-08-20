import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Sparkles } from "lucide-react";
import Button from "../ui/Button";

const Hero: React.FC = () => {
  const features = [
    {
      icon: "CV",
      label: "Resume Builder",
      bgColor: "bg-blue-50",
      iconColor: "text-blue-600",
    },
    {
      icon: "🎯",
      label: "Assessments",
      bgColor: "bg-pink-50",
      iconColor: "text-pink-600",
    },
    {
      icon: "🗣️",
      label: "Interview Prep",
      bgColor: "bg-purple-50",
      iconColor: "text-purple-600",
    },
    {
      icon: "🧠",
      label: "Learning",
      bgColor: "bg-green-50",
      iconColor: "text-green-600",
    },
  ];

  return (
    <section className="relative bg-white overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary-50 via-white to-secondary-50"></div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="pt-20 pb-16 sm:pt-24 sm:pb-20 lg:pt-32 lg:pb-24">
          {/* Main content */}
          <div className="text-center">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
              Revolutionizing Career{" "}
              <span className="bg-gradient-to-r from-indigo-600 to-blue-600 bg-clip-text text-transparent">
                Guidance with AI
              </span>
            </h1>

            <div className="mt-6 max-w-3xl mx-auto">
              <p className="text-xl text-gray-600 leading-relaxed">
                Personalized insights. Smart career decisions.
              </p>
              <p className="text-xl text-gray-600">No overwhelm.</p>
            </div>

            {/* CTA Buttons */}
            <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link to="/chat">
                <Button size="lg" className="w-full sm:w-auto min-w-[180px]">
                  <Sparkles className="h-5 w-5 mr-2" />
                  Try AI Chat
                  <ArrowRight className="h-5 w-5 ml-2" />
                </Button>
              </Link>

              <Link to="/auth">
                <Button
                  variant="outline"
                  size="lg"
                  className="w-full sm:w-auto min-w-[140px]"
                >
                  <Sparkles className="h-4 w-4 mr-2" />
                  Sign In
                </Button>
              </Link>
            </div>

            {/* Feature Cards */}
            <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-5xl mx-auto">
              {features.map((feature, index) => (
                <div
                  key={index}
                  className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-all duration-300 group cursor-pointer"
                >
                  <div className="text-center">
                    <div
                      className={`w-14 h-14 ${feature.bgColor} rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300`}
                    >
                      {feature.icon === "CV" ? (
                        <span
                          className={`text-lg font-bold ${feature.iconColor}`}
                        >
                          CV
                        </span>
                      ) : (
                        <span className="text-2xl">{feature.icon}</span>
                      )}
                    </div>
                    <h3 className="text-sm font-semibold text-gray-900">
                      {feature.label}
                    </h3>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Hero Image Section */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <div className="relative">
          <div className="aspect-w-16 aspect-h-9 rounded-2xl overflow-hidden shadow-2xl">
            <div className="bg-gradient-to-r from-indigo-600 via-purple-600 to-teal-500 h-96 flex items-center justify-center relative">
              {/* Overlay pattern */}
              <div className="absolute inset-0 bg-black bg-opacity-30"></div>

              {/* Professional working image simulation */}
              <div className="relative z-10 flex items-center justify-center w-full h-full">
                <div className="text-center text-white">
                  <div className="w-24 h-24 bg-white bg-opacity-20 rounded-full mx-auto mb-4 flex items-center justify-center">
                    <svg
                      className="w-12 h-12"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                  <h3 className="text-2xl font-semibold mb-2">
                    AI-Powered Career Intelligence
                  </h3>
                  <p className="text-lg opacity-90">
                    Transforming how people navigate their professional journey
                  </p>
                </div>
              </div>

              {/* Floating elements */}
              <div className="absolute top-10 left-10 w-4 h-4 bg-white bg-opacity-30 rounded-full animate-float"></div>
              <div
                className="absolute top-20 right-16 w-6 h-6 bg-white bg-opacity-20 rounded-full animate-float"
                style={{ animationDelay: "1s" }}
              ></div>
              <div
                className="absolute bottom-16 left-16 w-3 h-3 bg-white bg-opacity-40 rounded-full animate-float"
                style={{ animationDelay: "2s" }}
              ></div>
              <div
                className="absolute bottom-20 right-10 w-5 h-5 bg-white bg-opacity-25 rounded-full animate-float"
                style={{ animationDelay: "0.5s" }}
              ></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
