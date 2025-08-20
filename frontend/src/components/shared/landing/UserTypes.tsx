import React from 'react';
import { GraduationCap, Users, Briefcase, Lightbulb } from 'lucide-react';
import Card from '../ui/Card';

const UserTypes: React.FC = () => {
  const userTypes = [
    {
      icon: <GraduationCap className="h-8 w-8 text-primary-600" />,
      title: 'High School Student',
      description: 'Explore potential career paths and educational requirements to prepare for your future.',
      bgColor: 'bg-blue-50',
      iconBg: 'bg-blue-100'
    },
    {
      icon: <Users className="h-8 w-8 text-green-600" />,
      title: 'Graduating Student',
      description: 'Navigate the transition from education to employment with confidence and clarity.',
      bgColor: 'bg-green-50',
      iconBg: 'bg-green-100'
    },
    {
      icon: <Briefcase className="h-8 w-8 text-purple-600" />,
      title: 'Working Professional',
      description: 'Advance your career, change paths, or find new opportunities that match your skills.',
      bgColor: 'bg-purple-50',
      iconBg: 'bg-purple-100'
    },
    {
      icon: <Lightbulb className="h-8 w-8 text-orange-600" />,
      title: 'Aspiring Entrepreneur',
      description: 'Turn your ideas into reality with guidance on starting and growing your business.',
      bgColor: 'bg-orange-50',
      iconBg: 'bg-orange-100'
    }
  ];

  return (
    <section id="user-types" className="py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Tailored Guidance for Every Career Stage
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Personalized support whether you're just starting out or looking to advance
          </p>
        </div>

        {/* User Type Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {userTypes.map((type, index) => (
            <Card
              key={index}
              className="text-center hover:shadow-lg transition-all duration-300 group cursor-pointer border-2 border-transparent hover:border-primary-200"
              padding="lg"
            >
              <div className={`w-16 h-16 ${type.iconBg} rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300`}>
                {type.icon}
              </div>

              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                {type.title}
              </h3>

              <p className="text-gray-600 leading-relaxed">
                {type.description}
              </p>

              {/* Hover indicator */}
              <div className="mt-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="w-8 h-1 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-full mx-auto"></div>
              </div>
            </Card>
          ))}
        </div>

        {/* Professional Image Section */}
        <div className="mt-20">
          <div className="relative">
            <div className="aspect-w-16 aspect-h-6 rounded-2xl overflow-hidden">
              <div className="bg-gradient-to-r from-indigo-500 via-purple-500 to-teal-400 h-64 flex items-center justify-center relative">
                {/* Overlay */}
                <div className="absolute inset-0 bg-black bg-opacity-20"></div>

                {/* Content overlay to simulate professional team image */}
                <div className="relative z-10 text-center text-white">
                  <div className="flex justify-center space-x-4 mb-4">
                    {/* Professional avatars simulation */}
                    <div className="w-12 h-12 bg-white bg-opacity-30 rounded-full flex items-center justify-center">
                      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <div className="w-12 h-12 bg-white bg-opacity-30 rounded-full flex items-center justify-center">
                      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <div className="w-12 h-12 bg-white bg-opacity-30 rounded-full flex items-center justify-center">
                      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                      </svg>
                    </div>
                  </div>
                  <p className="text-lg font-medium opacity-90">
                    Join thousands of professionals advancing their careers with AI guidance
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
      </div>
    </section>
  );
};

export default UserTypes;