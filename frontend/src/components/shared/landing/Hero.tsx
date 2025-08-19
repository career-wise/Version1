import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles } from 'lucide-react';
import Button from '../ui/Button';

const Hero: React.FC = () => {
  const features = [
    {
      icon: '📄',
      label: 'Resume Builder',
      description: 'AI-powered resume optimization'
    },
    {
      icon: '🎯',
      label: 'Assessments',
      description: 'Discover your career strengths'
    },
    {
      icon: '🗣️',
      label: 'Interview Prep',
      description: 'Practice with real-time feedback'
    },
    {
      icon: '🧠',
      label: 'Learning',
      description: 'Personalized skill development'
    }
  ];

  return (
    <section className="relative bg-white overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary-50 via-white to-secondary-50"></div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="pt-16 pb-20 sm:pt-24 sm:pb-32 lg:pt-32 lg:pb-40">
          {/* Main content */}
          <div className="text-center">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
              Revolutionizing Career{' '}
              <span className="text-gradient bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent">
                Guidance with AI
              </span>
            </h1>

            <p className="mt-6 max-w-2xl mx-auto text-xl text-gray-600 leading-relaxed">
              Personalized insights. Smart career decisions.
            </p>
            <p className="max-w-2xl mx-auto text-xl text-gray-600">
              No overwhelm.
            </p>

            {/* CTA Buttons */}
            <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link to="/chat">
                <Button size="lg" className="w-full sm:w-auto">
                  <Sparkles className="h-5 w-5 mr-2" />
                  Try AI Chat
                  <ArrowRight className="h-5 w-5 ml-2" />
                </Button>
              </Link>

              <Link to="/auth">
                <Button variant="outline" size="lg" className="w-full sm:w-auto">
                  <Sparkles className="h-5 w-5 mr-2" />
                  Sign In
                </Button>
              </Link>
            </div>

            {/* Feature Icons */}
            <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
              {features.map((feature, index) => (
                <div
                  key={index}
                  className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-all duration-300 group cursor-pointer"
                >
                  <div className="text-center">
                    <div className="text-3xl mb-3 group-hover:scale-110 transition-transform duration-300">
                      {feature.icon}
                    </div>
                    <h3 className="text-sm font-semibold text-gray-900 mb-2">
                      {feature.label}
                    </h3>
                    <p className="text-xs text-gray-600 leading-relaxed">
                      {feature.description}
                    </p>
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
                    <svg className="w-12 h-12" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <h3 className="text-2xl font-semibold mb-2">AI-Powered Career Intelligence</h3>
                  <p className="text-lg opacity-90">Transforming how people navigate their professional journey</p>
                </div>
              </div>

              {/* Floating elements to simulate the professional atmosphere */}
              <div className="absolute top-10 left-10 w-4 h-4 bg-white bg-opacity-30 rounded-full animate-float"></div>
              <div className="absolute top-20 right-16 w-6 h-6 bg-white bg-opacity-20 rounded-full animate-float" style={{ animationDelay: '1s' }}></div>
              <div className="absolute bottom-16 left-16 w-3 h-3 bg-white bg-opacity-40 rounded-full animate-float" style={{ animationDelay: '2s' }}></div>
              <div className="absolute bottom-20 right-10 w-5 h-5 bg-white bg-opacity-25 rounded-full animate-float" style={{ animationDelay: '0.5s' }}></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;