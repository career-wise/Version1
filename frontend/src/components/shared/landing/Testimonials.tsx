import React from "react";
import { Star, Quote, ArrowLeft, ArrowRight } from "lucide-react";

const Testimonials: React.FC = () => {
  const testimonials = [
    {
      id: 1,
      name: "Alex Johnson",
      role: "Software Engineer at Google",
      previousRole: "High School Senior",
      rating: 5,
      content: "Careerist helped me navigate from being completely lost about my future to landing my dream job at Google. The AI recommendations were spot-on and the career roadmap was incredibly detailed.",
      image: "👨‍💻",
      outcome: "Landed dream job",
      timeframe: "6 months",
      salaryIncrease: null,
    },
    {
      id: 2,
      name: "Maria Rodriguez",
      role: "Marketing Director",
      previousRole: "Marketing Coordinator",
      rating: 5,
      content: "The career transition guidance was phenomenal. I went from a coordinator role to director level in just 18 months. The interview prep and skill development recommendations were game-changers.",
      image: "👩‍💼",
      outcome: "Promoted to Director",
      timeframe: "18 months",
      salaryIncrease: "+65%",
    },
    {
      id: 3,
      name: "David Chen",
      role: "Startup Founder",
      previousRole: "Corporate Consultant",
      rating: 5,
      content: "Transitioning from corporate to entrepreneurship felt impossible until I found Careerist. The business planning tools and market analysis helped me build a successful startup.",
      image: "🚀",
      outcome: "Founded successful startup",
      timeframe: "12 months",
      salaryIncrease: "+200%",
    },
    {
      id: 4,
      name: "Sarah Williams",
      role: "Data Scientist at Netflix",
      previousRole: "Recent Graduate",
      rating: 5,
      content: "As a recent graduate, I was overwhelmed by career options. Careerist's AI matched me with data science, provided a learning path, and I landed at Netflix within 4 months of graduation.",
      image: "📊",
      outcome: "Hired at Netflix",
      timeframe: "4 months",
      salaryIncrease: null,
    },
  ];

  const featuredTestimonial = {
    name: "Jennifer Park",
    role: "VP of Engineering at Stripe",
    previousRole: "Senior Developer",
    content: "Careerist didn't just help me find a new job – it helped me discover my leadership potential. The personalized development plan and executive coaching recommendations transformed my career trajectory. I went from senior developer to VP of Engineering in 2 years.",
    rating: 5,
    image: "👩‍💻",
    outcome: "Promoted to VP",
    timeframe: "2 years",
    salaryIncrease: "+180%",
    company: "Stripe"
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
    <section id="testimonials" className="py-24 bg-gradient-to-br from-gray-50 to-white relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-64 h-64 bg-gradient-to-r from-primary-100 to-secondary-100 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-float"></div>
        <div className="absolute bottom-20 right-10 w-64 h-64 bg-gradient-to-r from-purple-100 to-pink-100 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-float" style={{ animationDelay: '3s' }}></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-20">
          <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-yellow-50 to-orange-50 border border-yellow-200 rounded-full text-sm font-medium text-yellow-800 mb-6">
            <Star className="h-4 w-4 mr-2" />
            Success Stories
          </div>
          <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6">
            Real People,
            <br />
            <span className="bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent">
              Real Results
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Join thousands who have transformed their careers with our AI-powered guidance
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
          {testimonials.map((testimonial) => (
            <div
              key={testimonial.id}
              className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border border-gray-100 p-6 relative overflow-hidden"
            >
              {/* Quote icon */}
              <div className="absolute top-4 right-4 opacity-10 group-hover:opacity-20 transition-opacity duration-300">
                <Quote className="h-8 w-8 text-primary-600" />
              </div>

              {/* Rating */}
              <div className="flex items-center mb-4">
                {renderStars(testimonial.rating)}
              </div>

              {/* Content */}
              <blockquote className="text-gray-700 mb-6 italic leading-relaxed text-sm">
                "{testimonial.content}"
              </blockquote>

              {/* Author */}
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-primary-400 to-secondary-400 rounded-full flex items-center justify-center text-2xl mr-3">
                  {testimonial.image}
                </div>
                <div>
                  <div className="font-semibold text-gray-900 text-sm">
                    {testimonial.name}
                  </div>
                  <div className="text-xs text-gray-600">
                    {testimonial.role}
                  </div>
                </div>
              </div>

              {/* Outcome metrics */}
              <div className="border-t border-gray-100 pt-4">
                <div className="flex items-center justify-between text-xs">
                  <div>
                    <div className="font-medium text-gray-900">{testimonial.outcome}</div>
                    <div className="text-gray-500">in {testimonial.timeframe}</div>
                  </div>
                  {testimonial.salaryIncrease && (
                    <div className="text-right">
                      <div className="font-medium text-green-600">{testimonial.salaryIncrease}</div>
                      <div className="text-gray-500">salary increase</div>
                    </div>
                  )}
                </div>
              </div>

              {/* Hover effect overlay */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary-50/50 to-secondary-50/50 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
            </div>
          ))}
        </div>

        {/* Featured Testimonial */}
        <div className="relative">
          <div className="bg-gradient-to-br from-primary-600 via-purple-600 to-secondary-600 rounded-3xl overflow-hidden shadow-2xl">
            <div className="absolute inset-0 bg-black bg-opacity-10"></div>
            
            {/* Decorative elements */}
            <div className="absolute top-8 left-8 w-20 h-20 bg-white bg-opacity-10 rounded-full"></div>
            <div className="absolute bottom-8 right-8 w-32 h-32 bg-white bg-opacity-5 rounded-full"></div>
            <div className="absolute top-1/2 right-16 w-16 h-16 bg-white bg-opacity-10 rounded-full"></div>

            <div className="relative px-8 py-12 md:px-16 md:py-16">
              <div className="max-w-4xl mx-auto text-center">
                {/* Quote icon */}
                <div className="w-16 h-16 bg-white bg-opacity-20 rounded-full flex items-center justify-center mx-auto mb-8">
                  <Quote className="h-8 w-8 text-white" />
                </div>

                {/* Rating */}
                <div className="flex justify-center items-center mb-8">
                  {renderStars(featuredTestimonial.rating)}
                </div>

                {/* Quote */}
                <blockquote className="text-xl md:text-2xl font-medium mb-8 leading-relaxed text-white max-w-3xl mx-auto">
                  "{featuredTestimonial.content}"
                </blockquote>

                {/* Author and metrics */}
                <div className="flex flex-col md:flex-row items-center justify-center space-y-6 md:space-y-0 md:space-x-12">
                  {/* Author */}
                  <div className="flex items-center">
                    <div className="w-16 h-16 bg-white bg-opacity-20 rounded-full flex items-center justify-center text-2xl mr-4">
                      {featuredTestimonial.image}
                    </div>
                    <div className="text-left">
                      <div className="font-semibold text-lg text-white">
                        {featuredTestimonial.name}
                      </div>
                      <div className="text-primary-100">
                        {featuredTestimonial.role}
                      </div>
                      <div className="text-primary-200 text-sm">
                        Previously: {featuredTestimonial.previousRole}
                      </div>
                    </div>
                  </div>

                  {/* Metrics */}
                  <div className="flex space-x-8 text-center">
                    <div>
                      <div className="text-2xl font-bold text-white">{featuredTestimonial.salaryIncrease}</div>
                      <div className="text-primary-200 text-sm">Salary Increase</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-white">{featuredTestimonial.timeframe}</div>
                      <div className="text-primary-200 text-sm">Timeline</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-white">VP</div>
                      <div className="text-primary-200 text-sm">Level Achieved</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Navigation hint */}
        <div className="text-center mt-12">
          <div className="inline-flex items-center space-x-4 text-gray-500">
            <ArrowLeft className="h-5 w-5" />
            <span className="text-sm">More success stories</span>
            <ArrowRight className="h-5 w-5" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;