import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Briefcase, Menu, X, ChevronDown } from "lucide-react";
import Button from "../ui/Button";

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  const navigation = [
    { 
      name: "Features", 
      href: "#features",
      dropdown: [
        { name: "AI Career Matching", href: "#features" },
        { name: "Skill Assessment", href: "#features" },
        { name: "Interview Prep", href: "#features" },
        { name: "Resume Builder", href: "#features" },
      ]
    },
    { name: "How It Works", href: "#how-it-works" },
    { 
      name: "Success Stories", 
      href: "#testimonials",
      dropdown: [
        { name: "Student Success", href: "#testimonials" },
        { name: "Professional Growth", href: "#testimonials" },
        { name: "Career Transitions", href: "#testimonials" },
      ]
    },
    { name: "About", href: "#about" },
  ];

  return (
    <header className="bg-white/95 backdrop-blur-md shadow-sm sticky top-0 z-50 border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3 group">
            <div className="w-10 h-10 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg">
              <Briefcase className="h-6 w-6 text-white" />
            </div>
            <div>
              <span className="text-xl font-bold text-gray-900 group-hover:text-primary-600 transition-colors duration-300">
                Careerist
              </span>
              <div className="text-xs text-gray-500 -mt-1">AI Career Guidance</div>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-1">
            {navigation.map((item) => (
              <div
                key={item.name}
                className="relative group"
                onMouseEnter={() => setActiveDropdown(item.name)}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                <a
                  href={item.href}
                  className="flex items-center px-4 py-2 text-sm font-medium text-gray-700 hover:text-primary-600 transition-colors duration-200 rounded-lg hover:bg-gray-50 group"
                >
                  {item.name}
                  {item.dropdown && (
                    <ChevronDown className="h-4 w-4 ml-1 group-hover:rotate-180 transition-transform duration-300" />
                  )}
                  <span className="absolute inset-x-0 bottom-0 h-0.5 bg-primary-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-200"></span>
                </a>

                {/* Dropdown Menu */}
                {item.dropdown && activeDropdown === item.name && (
                  <div className="absolute top-full left-0 mt-2 w-56 bg-white rounded-xl shadow-lg border border-gray-100 py-2 z-50">
                    {item.dropdown.map((dropdownItem) => (
                      <a
                        key={dropdownItem.name}
                        href={dropdownItem.href}
                        className="block px-4 py-2 text-sm text-gray-700 hover:text-primary-600 hover:bg-gray-50 transition-colors duration-200"
                      >
                        {dropdownItem.name}
                      </a>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </nav>

          {/* CTA Buttons */}
          <div className="hidden md:flex items-center space-x-3">
            <Link to="/chat">
              <Button variant="ghost" size="sm" className="group">
                Try AI Chat
                <div className="w-2 h-2 bg-green-500 rounded-full ml-2 animate-pulse"></div>
              </Button>
            </Link>
            <Link to="/auth">
              <Button variant="primary" size="sm" className="shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300">
                Get Started
              </Button>
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 rounded-lg text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary-500 transition-colors duration-200"
            >
              {isMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 bg-white border-t border-gray-200 rounded-b-xl shadow-lg">
              {navigation.map((item) => (
                <div key={item.name}>
                  <a
                    href={item.href}
                    className="text-gray-700 hover:text-primary-600 block px-3 py-2 text-base font-medium transition-colors duration-200 hover:bg-gray-50 rounded-lg"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item.name}
                  </a>
                  {item.dropdown && (
                    <div className="pl-6 space-y-1">
                      {item.dropdown.map((dropdownItem) => (
                        <a
                          key={dropdownItem.name}
                          href={dropdownItem.href}
                          className="text-gray-600 hover:text-primary-600 block px-3 py-1 text-sm transition-colors duration-200"
                          onClick={() => setIsMenuOpen(false)}
                        >
                          {dropdownItem.name}
                        </a>
                      ))}
                    </div>
                  )}
                </div>
              ))}
              <div className="pt-4 px-3 space-y-3">
                <Link to="/chat" onClick={() => setIsMenuOpen(false)}>
                  <Button variant="outline" size="sm" className="w-full">
                    Try AI Chat
                  </Button>
                </Link>
                <Link to="/auth" onClick={() => setIsMenuOpen(false)}>
                  <Button variant="primary" size="sm" className="w-full">
                    Get Started
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;