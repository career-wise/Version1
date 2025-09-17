import React from "react";
import { Link } from "react-router-dom";
import {
  Briefcase,
  Mail,
  Linkedin,
  Twitter,
  Facebook,
  Instagram,
  ArrowRight,
  Heart,
  Globe,
  Shield,
  Zap,
} from "lucide-react";
import Button from "../ui/Button";

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { name: "Features", href: "#features" },
    { name: "How It Works", href: "#how-it-works" },
    { name: "Success Stories", href: "#testimonials" },
    { name: "About Us", href: "#about" },
    { name: "AI Chat", href: "/chat" },
  ];

  const resources = [
    { name: "Career Blog", href: "#", badge: "New" },
    { name: "Industry Reports", href: "#", badge: "Popular" },
    { name: "Salary Guide", href: "#" },
    { name: "Interview Tips", href: "#" },
    { name: "Resume Templates", href: "#" },
  ];

  const company = [
    { name: "About", href: "#about" },
    { name: "Careers", href: "#", badge: "We're hiring!" },
    { name: "Press", href: "#" },
    { name: "Partners", href: "#" },
    { name: "Contact", href: "#" },
  ];

  const socialLinks = [
    { 
      icon: <Linkedin className="h-5 w-5" />, 
      href: "#", 
      label: "LinkedIn",
      color: "hover:bg-blue-600"
    },
    { 
      icon: <Twitter className="h-5 w-5" />, 
      href: "#", 
      label: "Twitter",
      color: "hover:bg-sky-500"
    },
    { 
      icon: <Facebook className="h-5 w-5" />, 
      href: "#", 
      label: "Facebook",
      color: "hover:bg-blue-700"
    },
    { 
      icon: <Instagram className="h-5 w-5" />, 
      href: "#", 
      label: "Instagram",
      color: "hover:bg-pink-600"
    },
  ];

  const legalLinks = [
    { name: "Privacy Policy", href: "#" },
    { name: "Terms of Service", href: "#" },
    { name: "Cookie Policy", href: "#" },
    { name: "GDPR Compliance", href: "#" },
  ];

  const trustIndicators = [
    { icon: <Shield className="h-5 w-5" />, text: "SOC 2 Compliant" },
    { icon: <Globe className="h-5 w-5" />, text: "Global Reach" },
    { icon: <Zap className="h-5 w-5" />, text: "99.9% Uptime" },
  ];

  return (
    <footer className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-full h-full opacity-5">
          <div className="absolute top-20 left-20 w-64 h-64 bg-primary-500 rounded-full filter blur-3xl"></div>
          <div className="absolute bottom-20 right-20 w-64 h-64 bg-secondary-500 rounded-full filter blur-3xl"></div>
        </div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Newsletter Section */}
        <div className="py-12 border-b border-gray-700">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-2xl font-bold mb-4">
                Stay Ahead in Your Career Journey
              </h3>
              <p className="text-gray-300 text-lg">
                Get weekly insights, career tips, and exclusive resources delivered to your inbox.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1">
                <input
                  type="email"
                  placeholder="Enter your email address"
                  className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-300"
                />
              </div>
              <Button className="group shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300">
                Subscribe
                <ArrowRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
              </Button>
            </div>
          </div>
        </div>

        {/* Main Footer Content */}
        <div className="py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
            {/* Company Info */}
            <div className="lg:col-span-2 space-y-6">
              <Link to="/" className="flex items-center space-x-3 group">
                <div className="w-12 h-12 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg">
                  <Briefcase className="h-7 w-7 text-white" />
                </div>
                <div>
                  <span className="text-2xl font-bold group-hover:text-primary-400 transition-colors duration-300">
                    Careerist
                  </span>
                  <div className="text-sm text-gray-400 -mt-1">AI Career Guidance</div>
                </div>
              </Link>

              <p className="text-gray-300 leading-relaxed max-w-md">
                Empowering careers through AI-driven insights and personalized guidance. 
                Join thousands who have transformed their professional lives with our platform.
              </p>

              {/* Social Links */}
              <div className="flex space-x-3">
                {socialLinks.map((social, index) => (
                  <a
                    key={index}
                    href={social.href}
                    className={`w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center text-gray-400 hover:text-white ${social.color} transition-all duration-300 transform hover:scale-110 hover:shadow-lg`}
                    aria-label={social.label}
                  >
                    {social.icon}
                  </a>
                ))}
              </div>

              {/* Trust Indicators */}
              <div className="flex flex-wrap gap-4 pt-4">
                {trustIndicators.map((indicator, index) => (
                  <div key={index} className="flex items-center space-x-2 text-sm text-gray-400">
                    {indicator.icon}
                    <span>{indicator.text}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="text-lg font-semibold mb-6 text-white">
                Quick Links
              </h3>
              <ul className="space-y-3">
                {quickLinks.map((link, index) => (
                  <li key={index}>
                    <a
                      href={link.href}
                      className="text-gray-300 hover:text-primary-400 transition-colors duration-200 flex items-center group"
                    >
                      <span>{link.name}</span>
                      <ArrowRight className="h-3 w-3 ml-1 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-300" />
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Resources */}
            <div>
              <h3 className="text-lg font-semibold mb-6 text-white">
                Resources
              </h3>
              <ul className="space-y-3">
                {resources.map((resource, index) => (
                  <li key={index}>
                    <a
                      href={resource.href}
                      className="text-gray-300 hover:text-primary-400 transition-colors duration-200 flex items-center group"
                    >
                      <span>{resource.name}</span>
                      {resource.badge && (
                        <span className="ml-2 px-2 py-0.5 bg-primary-600 text-white text-xs rounded-full">
                          {resource.badge}
                        </span>
                      )}
                      <ArrowRight className="h-3 w-3 ml-1 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-300" />
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Company */}
            <div>
              <h3 className="text-lg font-semibold mb-6 text-white">
                Company
              </h3>
              <ul className="space-y-3">
                {company.map((item, index) => (
                  <li key={index}>
                    <a
                      href={item.href}
                      className="text-gray-300 hover:text-primary-400 transition-colors duration-200 flex items-center group"
                    >
                      <span>{item.name}</span>
                      {item.badge && (
                        <span className="ml-2 px-2 py-0.5 bg-green-600 text-white text-xs rounded-full animate-pulse">
                          {item.badge}
                        </span>
                      )}
                      <ArrowRight className="h-3 w-3 ml-1 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-300" />
                    </a>
                  </li>
                ))}
              </ul>

              {/* Contact Info */}
              <div className="mt-8 space-y-3">
                <div className="flex items-center space-x-3 text-gray-300">
                  <Mail className="h-5 w-5 text-primary-400" />
                  <a
                    href="mailto:hello@careerist.ai"
                    className="hover:text-primary-400 transition-colors duration-200"
                  >
                    hello@careerist.ai
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-700 py-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="flex items-center text-gray-400 text-sm">
              <span>© {currentYear} Careerist AI. Made with</span>
              <Heart className="h-4 w-4 text-red-500 mx-1 animate-pulse" />
              <span>for your career success.</span>
            </div>

            <div className="flex items-center space-x-6">
              {legalLinks.map((link, index) => (
                <a
                  key={index}
                  href={link.href}
                  className="text-gray-400 hover:text-primary-400 text-sm transition-colors duration-200"
                >
                  {link.name}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;