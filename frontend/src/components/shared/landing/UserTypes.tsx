import React from "react";
import { GraduationCap, Users, Briefcase, Lightbulb } from "lucide-react";

const UserTypes: React.FC = () => {
  const userTypes = [
    {
      icon: <GraduationCap className="h-8 w-8 text-primary-600" />,
      title: "High School Student",
      description:
        "Explore potential career paths and educational requirements to prepare for your future.",
    },
    {
      icon: <Users className="h-8 w-8 text-green-600" />,
      title: "Graduating Student",
      description:
        "Navigate the transition from education to employment with confidence and clarity.",
    },
    {
      icon: <Briefcase className="h-8 w-8 text-purple-600" />,
      title: "Working Professional",
      description:
        "Advance your career, change paths, or find new opportunities that match your skills.",
    },
    {
      icon: <Lightbulb className="h-8 w-8 text-orange-600" />,
      title: "Aspiring Entrepreneur",
      description:
        "Turn your ideas into reality with guidance on starting and growing your business.",
    },
  ];

  return (
    <section id="user-types" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Tailored Guidance for Every Career Stage
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Personalized support whether you're just starting out or looking to
            advance
          </p>
        </div>

        {/* User Type Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
          {userTypes.map((type, index) => (
            <div key={index} className="text-center group">
              <div className="w-16 h-16 bg-primary-50 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                {type.icon}
              </div>

              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                {type.title}
              </h3>

              <p className="text-gray-600 leading-relaxed">
                {type.description}
              </p>
            </div>
          ))}
        </div>

        {/* Professional Team Image Section */}
        <div className="relative">
          <div className="aspect-w-16 aspect-h-6 rounded-2xl overflow-hidden">
            <div className="bg-gradient-to-r from-indigo-500 via-purple-500 to-teal-400 h-64 flex items-center justify-center relative">
              {/* Overlay */}
              <div className="absolute inset-0 bg-black bg-opacity-20"></div>

              {/* Content overlay to simulate professional team meeting */}
              <div className="relative z-10 text-center text-white">
                <div className="flex justify-center space-x-6 mb-6">
                  {/* Professional team avatars simulation */}
                  <div className="flex items-center space-x-4">
                    <div className="w-16 h-16 bg-white bg-opacity-30 rounded-full flex items-center justify-center">
                      <svg
                        className="w-8 h-8"
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
                    <div className="w-16 h-16 bg-white bg-opacity-30 rounded-full flex items-center justify-center">
                      <svg
                        className="w-8 h-8"
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
                    <div className="w-16 h-16 bg-white bg-opacity-30 rounded-full flex items-center justify-center">
                      <svg
                        className="w-8 h-8"
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
                    <div className="w-16 h-16 bg-white bg-opacity-30 rounded-full flex items-center justify-center">
                      <svg
                        className="w-8 h-8"
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
                  </div>
                </div>
                <p className="text-lg font-medium opacity-90">
                  Join thousands of professionals advancing their careers with
                  AI guidance
                </p>
              </div>

              {/* Decorative elements */}
              <div className="absolute top-8 left-8 w-2 h-2 bg-white bg-opacity-40 rounded-full"></div>
              <div className="absolute top-12 right-12 w-3 h-3 bg-white bg-opacity-30 rounded-full"></div>
              <div className="absolute bottom-8 left-12 w-2 h-2 bg-white bg-opacity-50 rounded-full"></div>
              <div className="absolute bottom-12 right-8 w-2 h-2 bg-white bg-opacity-40 rounded-full"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default UserTypes;
