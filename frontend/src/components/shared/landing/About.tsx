import React from 'react';
import { Users, Clock, TrendingUp, Heart } from 'lucide-react';
import Button from '../ui/Button';

const About: React.FC = () => {
  const stats = [
    {
      icon: <Users className="h-8 w-8 text-primary-600" />,
      number: '50,000+',
      label: 'Users Helped'
    },
    {
      icon: <Clock className="h-8 w-8 text-green-600" />,
      number: '250+',
      label: 'Career Paths'
    },
    {
      icon: <TrendingUp className="h-8 w-8 text-blue-600" />,
      number: '85%',
      label: 'Success Rate'
    },
    {
      icon: <Heart className="h-8 w-8 text-red-500" />,
      number: '4.8/5',
      label: 'User Satisfaction'
    }
  ];

  return (
    <section id="about" className="py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Stats Section */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-24">
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <div className="w-16 h-16 bg-white rounded-2xl shadow-sm flex items-center justify-center mx-auto mb-4">
                {stat.icon}
              </div>
              <div className="text-3xl font-bold text-gray-900 mb-2">
                {stat.number}
              </div>
              <div className="text-gray-600 font-medium">
                {stat.label}
              </div>
            </div>
          ))}
        </div>

        {/* Main About Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className="space-y-6">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">
              About CareerWise
            </h2>
            <p className="text-lg text-gray-600 leading-relaxed">
              Our mission is to democratize career guidance through innovative AI technology
            </p>

            <div className="space-y-4">
              <p className="text-gray-700 leading-relaxed">
                CareerWise was founded with a simple yet powerful vision: to make personalized career guidance accessible to everyone, regardless of their background or resources. We combine cutting-edge artificial intelligence with human expertise to provide accurate, actionable career advice.
              </p>

              <p className="text-gray-700 leading-relaxed">
                Our team includes career counselors, data scientists, and industry professionals who work together to ensure our AI recommendations are grounded in real-world insights and opportunities.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button variant="primary" size="lg">
                Learn more about our team
              </Button>
              <Button variant="outline" size="lg">
                Our methodology
              </Button>
            </div>
          </div>

          {/* Image */}
          <div className="relative">
            <div className="aspect-w-4 aspect-h-3 rounded-2xl overflow-hidden">
              <div className="bg-gradient-to-br from-amber-400 via-orange-400 to-red-400 h-96 flex items-center justify-center relative">
                {/* Overlay */}
                <div className="absolute inset-0 bg-black bg-opacity-10"></div>

                {/* Simulated team/office environment */}
                <div className="relative z-10 text-center text-white">
                  <div className="mb-6">
                    <div className="w-20 h-20 bg-white bg-opacity-20 rounded-full mx-auto flex items-center justify-center mb-4">
                      <div className="w-12 h-12 bg-white bg-opacity-30 rounded-full flex items-center justify-center">
                        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                        </svg>
                      </div>
                    </div>
                  </div>
                  <h3 className="text-2xl font-bold mb-4">Driven by a passion for helping others succeed</h3>
                  <p className="text-lg opacity-90 max-w-sm mx-auto">
                    Our diverse team combines expertise in career counseling, technology, and data science to create innovative solutions.
                  </p>
                </div>

                {/* Decorative team elements */}
                <div className="absolute top-12 left-12 w-8 h-8 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
                  <div className="w-4 h-4 bg-white bg-opacity-40 rounded-full"></div>
                </div>
                <div className="absolute top-16 right-16 w-6 h-6 bg-white bg-opacity-15 rounded-full flex items-center justify-center">
                  <div className="w-3 h-3 bg-white bg-opacity-50 rounded-full"></div>
                </div>
                <div className="absolute bottom-16 left-16 w-10 h-10 bg-white bg-opacity-15 rounded-full flex items-center justify-center">
                  <div className="w-5 h-5 bg-white bg-opacity-40 rounded-full"></div>
                </div>
                <div className="absolute bottom-12 right-12 w-7 h-7 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
                  <div className="w-3 h-3 bg-white bg-opacity-50 rounded-full"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;