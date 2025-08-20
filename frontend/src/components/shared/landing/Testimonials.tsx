import React from "react";
import { Star } from "lucide-react";

const Testimonials: React.FC = () => {
  const testimonials = [
    {
      id: 1,
      name: "Alex Johnson",
      role: "High School Senior",
      rating: 5,
      content:
        "CareerWise helped me decide which college majors aligned with my interests and future career goals. The AI provided personalized recommendations that I hadn't even considered!",
    },
    {
      id: 2,
      name: "Mia Rodriguez",
      role: "Recent Graduate",
      rating: 4,
      content:
        "After graduation, I was overwhelmed with job options. CareerWise analyzed my skills and helped me find roles that were perfect for my background in marketing and design.",
    },
    {
      id: 3,
      name: "David Chen",
      role: "Software Engineer",
      rating: 5,
      content:
        "The resume guidance was a game-changer. After implementing CareerWise's suggestions, I started getting callbacks for interviews within a week!",
    },
  ];

  const featuredTestimonial = {
    name: "Sarah Williams",
    role: "Founder, Williams Consulting",
    content:
      "As an entrepreneur, I needed guidance on how to transition from my corporate job to starting my own business. CareerWise provided a step-by-step roadmap that made the process much easier to navigate. The AI insights were incredibly valuable for understanding market opportunities and building my business plan.",
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
    <section id="testimonials" className="py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Success Stories
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            See how CareerWise has helped people navigate their career journeys
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {testimonials.map((testimonial) => (
            <div
              key={testimonial.id}
              className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-lg transition-all duration-300"
            >
              {/* Rating */}
              <div className="flex items-center mb-4">
                {renderStars(testimonial.rating)}
              </div>

              {/* Content */}
              <blockquote className="text-gray-700 mb-6 italic leading-relaxed">
                "{testimonial.content}"
              </blockquote>

              {/* Author */}
              <div className="flex items-center">
                <div className="w-10 h-10 bg-gradient-to-br from-primary-400 to-secondary-400 rounded-full flex items-center justify-center text-white font-semibold text-sm mr-3">
                  {testimonial.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </div>
                <div>
                  <div className="font-semibold text-gray-900">
                    {testimonial.name}
                  </div>
                  <div className="text-sm text-gray-600">
                    {testimonial.role}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Featured Testimonial */}
        <div className="relative">
          <div className="bg-gradient-to-r from-primary-600 to-secondary-600 rounded-2xl overflow-hidden">
            <div className="relative px-8 py-12 md:px-16 md:py-16">
              {/* Background image overlay */}
              <div className="absolute inset-0 bg-black bg-opacity-20"></div>

              {/* Content */}
              <div className="relative z-10 text-center text-white">
                {/* Rating */}
                <div className="flex justify-center items-center mb-6">
                  {renderStars(featuredTestimonial.rating)}
                </div>

                {/* Quote */}
                <blockquote className="text-xl md:text-2xl font-medium mb-8 leading-relaxed italic max-w-4xl mx-auto">
                  "{featuredTestimonial.content}"
                </blockquote>

                {/* Author */}
                <div className="flex items-center justify-center">
                  <div className="w-12 h-12 bg-white bg-opacity-20 rounded-full flex items-center justify-center text-white font-semibold mr-4">
                    SW
                  </div>
                  <div className="text-left">
                    <div className="font-semibold text-lg">
                      {featuredTestimonial.name}
                    </div>
                    <div className="text-primary-100">
                      {featuredTestimonial.role}
                    </div>
                  </div>
                </div>
              </div>

              {/* Decorative elements */}
              <div className="absolute top-8 left-8 w-2 h-2 bg-white bg-opacity-30 rounded-full"></div>
              <div className="absolute top-12 right-12 w-3 h-3 bg-white bg-opacity-20 rounded-full"></div>
              <div className="absolute bottom-8 left-12 w-2 h-2 bg-white bg-opacity-40 rounded-full"></div>
              <div className="absolute bottom-12 right-8 w-2 h-2 bg-white bg-opacity-30 rounded-full"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
