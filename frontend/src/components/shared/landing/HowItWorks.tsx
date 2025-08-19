import React from 'react';
import { Target, MessageCircle, Map } from 'lucide-react';

const HowItWorks: React.FC = () => {
  const steps = [
    {
      number: '1',
      icon: <Target className="h-8 w-8 text-primary-600" />,
      title: 'Choose Your Goal',
      description: 'Select your career stage and define what you\'re looking to achieve.'
    },
    {
      number: '2',
      icon: <MessageCircle className="h-8 w-8 text-primary-600" />,
      title: 'Chat with Our AI',
      description: 'Engage with our AI assistant to discuss your background, skills, and aspirations.'
    },
    {
      number: '3',
      icon: <Map className="h-8 w-8 text-primary-600" />,
      title: 'Get Personalized Roadmap',
      description: 'Receive a customized action plan with practical steps to achieve your career goals.'
    }
  ];

  return (
    <section id="how-it-works" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            How CareerWise Works
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Our AI-powered platform simplifies career guidance into three easy steps
          </p>
        </div>

        {/* Steps */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {steps.map((step, index) => (
            <div key={index} className="text-center relative">
              {/* Step Number */}
              <div className="relative mb-6">
                <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4 relative z-10">
                  <span className="text-2xl font-bold text-primary-600">{step.number}</span>
                </div>

                {/* Connecting line (hidden on last item) */}
                {index < steps.length - 1 && (
                  <div className="hidden md:block absolute top-8 left-1/2 w-full h-0.5 bg-gray-200 transform translate-x-8 z-0"></div>
                )}
              </div>

              {/* Icon */}
              <div className="w-12 h-12 bg-primary-50 rounded-lg flex items-center justify-center mx-auto mb-4">
                {step.icon}
              </div>

              {/* Content */}
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                {step.title}
              </h3>
              <p className="text-gray-600 leading-relaxed max-w-sm mx-auto">
                {step.description}
              </p>
            </div>
          ))}
        </div>

        {/* Bottom Image Section */}
        <div className="relative">
          <div className="aspect-w-16 aspect-h-8 rounded-2xl overflow-hidden">
            <div className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 h-80 flex items-center justify-center relative">
              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-pink-500/20"></div>

              {/* Content to simulate collaborative workspace */}
              <div className="relative z-10 text-center text-white">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                  {/* Simulated interface elements */}
                  <div className="w-16 h-16 bg-white bg-opacity-20 rounded-lg flex items-center justify-center backdrop-blur-sm">
                    <div className="w-8 h-8 bg-white bg-opacity-30 rounded-full"></div>
                  </div>
                  <div className="w-16 h-16 bg-white bg-opacity-20 rounded-lg flex items-center justify-center backdrop-blur-sm">
                    <div className="w-8 h-1 bg-white bg-opacity-50 rounded-full mb-1"></div>
                    <div className="w-6 h-1 bg-white bg-opacity-30 rounded-full"></div>
                  </div>
                  <div className="w-16 h-16 bg-white bg-opacity-20 rounded-lg flex items-center justify-center backdrop-blur-sm">
                    <div className="w-6 h-6 bg-white bg-opacity-40 rounded border-2 border-white border-opacity-30"></div>
                  </div>
                  <div className="w-16 h-16 bg-white bg-opacity-20 rounded-lg flex items-center justify-center backdrop-blur-sm">
                    <div className="w-8 h-8 bg-gradient-to-br from-white/40 to-white/20 rounded-full"></div>
                  </div>
                </div>
                <h3 className="text-2xl font-semibold mb-2">AI-Powered Career Intelligence</h3>
                <p className="text-lg opacity-90 max-w-2xl mx-auto">
                  Experience the future of career guidance with our advanced AI technology
                </p>
              </div>

              {/* Floating particles */}
              <div className="absolute top-16 left-16 w-2 h-2 bg-white bg-opacity-40 rounded-full animate-float"></div>
              <div className="absolute top-24 right-20 w-3 h-3 bg-white bg-opacity-30 rounded-full animate-float" style={{ animationDelay: '1s' }}></div>
              <div className="absolute bottom-20 left-24 w-2 h-2 bg-white bg-opacity-50 rounded-full animate-float" style={{ animationDelay: '2s' }}></div>
              <div className="absolute bottom-16 right-16 w-3 h-3 bg-white bg-opacity-25 rounded-full animate-float" style={{ animationDelay: '0.5s' }}></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;