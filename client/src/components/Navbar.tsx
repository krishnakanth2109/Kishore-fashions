import { Link, useLocation } from "react-router-dom"; // MODIFIED: Imported useLocation
import { Scissors, Menu, X, Search, ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  // ADDED: From old code to track the current page
  const location = useLocation(); 

  // ADDED: Navigation items from your old code
  const navItems = [
    { name: "Home", path: "/" },
    { name: "About", path: "/about" },
    { name: "Products", path: "/products" },
    { name: "Portfolio", path: "/portfolio" },
    { name: "Contact", path: "/contact" },
    { name: "Services", path: "/services" },

  ];

  // ADDED: Function to check if a link is active
  const isActive = (path) => location.pathname === path;

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-500 backdrop-blur-xl ${
      isScrolled 
        ? 'bg-white/95 shadow-2xl border-b border-white/20' 
        : 'bg-pink-600'
    }`}>
      <div className="container mx-auto ">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 group">
         <img src="https://image2url.com/images/1761394505496-0c9ac8ba-6578-4232-a256-e60d5620f3b9.png" width={100} alt="" />
            <span className={`text-2xl font-serif font-bold transition-all duration-300 ${
              isScrolled ? 'text-gray-800' : 'text-white'
            } group-hover:scale-105`}>
              Kishore Fashions
            </span>
          </Link>

          {/* MODIFIED: Desktop Menu now uses navItems from your old code */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`font-semibold transition-all duration-300 hover:scale-105 relative group ${
                  isScrolled 
                    ? 'text-gray-700 hover:text-amber-600' 
                    : 'text-white/90 hover:text-white'
                } ${
                  // Apply active styles
                  isActive(item.path) ? (isScrolled ? 'text-amber-600' : 'text-white') : ''
                }`}
              >
                {item.name}
                <span className={`absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-amber-500 to-pink-500 transition-all duration-300 group-hover:w-full ${
                    // Make underline visible if active
                    isActive(item.path) ? 'w-full' : 'w-0'
                }`}></span>
              </Link>
            ))}
          </div>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center space-x-4">
    
            <Button className="bg-gradient-to-r from-amber-500 to-pink-500 hover:from-amber-600 hover:to-pink-600 text-white shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 hover:shadow-amber-500/25">
              Book Consultation
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden p-2 transform transition-transform duration-300 hover:scale-110"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? (
              <X className={`w-6 h-6 ${isScrolled ? 'text-gray-800' : 'text-white'}`} />
            ) : (
              <Menu className={`w-6 h-6 ${isScrolled ? 'text-gray-800' : 'text-white'}`} />
            )} 
          </button>
        </div>

        {/* MODIFIED: Mobile Menu now uses navItems */}
        {isMobileMenuOpen && (
          <div className="md:hidden absolute top-full left-0 w-full bg-white/95 backdrop-blur-xl border-t border-white/20 shadow-2xl animate-in slide-in-from-top duration-300">
            <div className="container mx-auto px-4 py-6 space-y-4">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`block py-3 font-semibold transition-all duration-300 border-b border-gray-100 hover:translate-x-2 ${
                    isActive(item.path) 
                    ? 'text-amber-600' 
                    : 'text-gray-800 hover:text-amber-600'
                  }`}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
              <div className="pt-4 space-y-3">
                <Button className="w-full bg-gradient-to-r from-amber-500 to-pink-500 hover:from-amber-600 hover:to-pink-600 text-white transform hover:scale-105 transition-all duration-300">
                  Book Consultation
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;