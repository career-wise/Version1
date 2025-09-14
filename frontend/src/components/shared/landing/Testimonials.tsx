import React from "react";
import { Star, Quote, Award } from "lucide-react";

const Testimonials: React.FC = () => {
  const testimonials = [
    {
      id: 1,
      name: "Alex Johnson",
      role: "High School Senior",
      rating: 5,
      content:
        "Careerist helped me decide which college majors aligned with my interests and future career goals. The AI provided personalized recommendations that I hadn't even considered!",
    },
    {
      id: 2,
      name: "Mia Rodriguez",
      role: "Recent Graduate",
      rating: 4,
      content:
        "After graduation, I was overwhelmed with job options. Careerist analyzed my skills and helped me find roles that were perfect for my background in marketing and design.",
    },
    {
      id: 3,
      name: "David Chen",
      role: "Software Engineer",
      rating: 5,
      content:
        "The resume guidance was a game-changer. After implementing Careerist's suggestions, I started getting callbacks for interviews within a week!",
    },
  ];

  const featuredTestimonial = {
    name: "Sarah Williams",
    role: "Founder, Williams Consulting",
    content:
      "As an entrepreneur, I needed guidance on how to transition from my corporate job to starting my own business. Careerist provided a step-by-step roadmap that made the process much easier to navigate. The AI insights were incredibly valuable for understanding market opportunities and building my business plan.",
    rating: 5,
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, index) => (
      <Star
        key={index}
        className={`h-4 w-4 ${
          index < rating ? "text-yellow-400 fill-current" : "text-gray-300"
        }`}
      />
    ));
  };

  return (
    <section id="testimonials" className="py-32 bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Enhanced Section Header */}
        <div className="text-center mb-20">
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-r from-primary-100 to-secondary-100 border border-primary-200/50 mb-6">
            <Award className="h-4 w-4 text-primary-600 mr-2" />
            <span className="text-sm font-semibold text-primary-800">Success Stories</span>
          </div>
          <h2 className="text-4xl sm:text-5xl font-extrabold text-gray-900 mb-6 leading-tight">
            Real{" "}
            <span className="bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent">
              Success Stories
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
            See how CareerWise has helped people navigate their career journeys and achieve their professional goals
          </p>
        </div>

        {/* Enhanced Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
          {testimonials.map((testimonial) => (
            <div
              key={testimonial.id}
              className="bg-white rounded-3xl shadow-sm border border-gray-100/50 p-8 hover:shadow-xl hover:scale-105 transition-all duration-500 group relative backdrop-blur-sm"
            >
              {/* Quote icon */}
              <div className="absolute top-6 right-6 w-8 h-8 bg-gradient-to-br from-primary-100 to-secondary-100 rounded-full flex items-center justify-center opacity-20 group-hover:opacity-40 transition-opacity">
                <Quote className="h-4 w-4 text-primary-600" />
              </div>
              
              {/* Enhanced Rating */}
              <div className="flex items-center mb-6">
                {renderStars(testimonial.rating)}
                <span className="ml-2 text-sm text-gray-500 font-medium">({testimonial.rating}.0)</span>
              </div>

              {/* Enhanced Content */}
              <blockquote className="text-gray-700 mb-8 italic leading-relaxed text-lg group-hover:text-gray-800 transition-colors">
                "{testimonial.content}"
              </blockquote>

              {/* Enhanced Author */}
              <div className="flex items-center">
                <div className="w-12 h-12 bg-gradient-to-br from-primary-400 to-secondary-400 rounded-2xl flex items-center justify-center text-white font-bold text-base mr-4 shadow-md group-hover:shadow-lg group-hover:scale-110 transition-all duration-300">
                  {testimonial.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </div>
                <div>
                  <div className="font-bold text-gray-900 text-lg group-hover:text-primary-600 transition-colors">
                    {testimonial.name}
                  </div>
                  <div className="text-gray-600 font-medium">
                    {testimonial.role}
                  </div>
                </div>
              </div>
              
              {/* Decorative corner accent */}
              <div className="absolute bottom-4 right-4 w-3 h-3 bg-gradient-to-br from-primary-200 to-secondary-200 rounded-full opacity-30 group-hover:opacity-60 group-hover:scale-150 transition-all duration-500"></div>
            </div>
          ))}
        </div>

        {/* Enhanced Featured Testimonial */}
        <div className="relative">
          <div className="bg-gradient-to-r from-primary-600 via-blue-600 to-secondary-600 rounded-3xl overflow-hidden shadow-2xl">
            <div className="relative px-8 py-16 md:px-16 md:py-20">
              {/* Enhanced background image overlay */}
              <div className="absolute inset-0 bg-gradient-to-br from-black/15 via-transparent to-black/25"></div>

              {/* Enhanced Content */}
              <div className="relative z-10 text-center text-white">
                {/* Large quote icon */}
                <div className="w-16 h-16 bg-white/20 rounded-3xl flex items-center justify-center mx-auto mb-8 backdrop-blur-sm">
                  <Quote className="h-8 w-8 text-white" />
                </div>
                
                {/* Enhanced Rating */}
                <div className="flex justify-center items-center mb-8">
                  <div className="flex items-center space-x-1 bg-white/10 rounded-full px-4 py-2 backdrop-blur-sm">
                    {renderStars(featuredTestimonial.rating)}
                    <span className="ml-2 text-sm font-medium text-white/80">Perfect Rating</span>
                  </div>
                </div>

                {/* Enhanced Quote */}
                <blockquote className="text-2xl md:text-3xl font-medium mb-10 leading-relaxed italic max-w-5xl mx-auto text-white/95">
                  "{featuredTestimonial.content}"
                </blockquote>

                {/* Enhanced Author */}
                <div className="flex items-center justify-center">
                  <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center text-white font-bold text-xl mr-6 backdrop-blur-sm shadow-lg">
                    SW
                  </div>
                  <div className="text-left">
                    <div className="font-bold text-2xl mb-1">
                      {featuredTestimonial.name}
                    </div>
                    <div className="text-primary-100 text-lg font-medium">
                      {featuredTestimonial.role}
                    </div>
                  </div>
                </div>
              </div>

              {/* Enhanced decorative elements */}
              <div className="absolute top-8 left-8 w-4 h-4 bg-white bg-opacity-30 rounded-full animate-pulse"></div>
              <div className="absolute top-16 right-16 w-5 h-5 bg-yellow-300 bg-opacity-40 rounded-full animate-float" style={{animationDelay: '1s'}}></div>
              <div className="absolute bottom-12 left-16 w-3 h-3 bg-green-300 bg-opacity-50 rounded-full animate-bounce" style={{animationDelay: '2s'}}></div>
              <div className="absolute bottom-8 right-8 w-4 h-4 bg-pink-300 bg-opacity-40 rounded-full animate-pulse" style={{animationDelay: '0.5s'}}></div>
              
              {/* Corner decorations */}
              <div className="absolute top-4 right-4 w-6 h-6 bg-white/10 rounded-full animate-pulse"></div>
              <div className="absolute bottom-4 left-4 w-5 h-5 bg-white/15 rounded-full animate-float"></div>
            </div>
          </div>
          
          {/* Additional surrounding decorations */}
          <div className="absolute -top-8 -left-8 w-20 h-20 bg-gradient-to-br from-primary-200/30 to-secondary-200/20 rounded-full animate-pulse"></div>
          <div className="absolute -bottom-8 -right-8 w-24 h-24 bg-gradient-to-br from-secondary-200/20 to-primary-200/30 rounded-full animate-pulse" style={{animationDelay: '1s'}}></div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
