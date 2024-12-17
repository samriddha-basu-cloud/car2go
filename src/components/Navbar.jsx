import React, { useContext, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Moon, Sun, Settings, Menu, X } from 'lucide-react';
import { ThemeContext } from '../context/ThemeContext';

const Navbar = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Check if token exists in localStorage
  const token = localStorage.getItem('token');
  
  // Get user roles from localStorage
  const roles = JSON.parse(localStorage.getItem('role') || '[]');
  
  // Determine if user is an Admin or Agent
  const isAdminOrAgent = roles.some(role => ['Admin', 'Agent'].includes(role));
  const navLinks = isAdminOrAgent 
    ? [{ name: 'Settings', path: '/settings', icon: Settings }] 
    : [
        { name: 'Home', path: '/' },
        { name: 'Dashboard', path: '/dashboard' },
        { name: 'Make Reservation', path: '/make-reservation' },
        { name: 'Manage Reservations', path: '/manage-reservation' },
        { name: 'Settings', path: '/settings' },
      ];

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const renderNavLink = (link) => (
    <div
      key={link.name}
      className="relative group"
    >
      <Link
        to={token ? link.path : '#'}
        className={`
          w-full px-4 py-3 rounded-lg text-sm font-medium transition-all duration-300 
          ${location.pathname === link.path
            ? 'bg-blue-500 text-white shadow-md'
            : 'text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-white'}
          ${!token && 'opacity-50 pointer-events-none'}
          flex items-center justify-center
        `}
        onClick={() => setIsMobileMenuOpen(false)}
      >
        {link.icon ? (
          <link.icon className="w-5 h-5" />
        ) : (
          link.name
        )}
      </Link>
      {!token && (
        <span
          className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 text-xs bg-gray-700 text-white px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity"
        >
          Login first
        </span>
      )}
    </div>
  );

  return (
    <nav className="fixed top-0 left-0 w-full z-50 backdrop-blur-md bg-white/80 dark:bg-gray-900/80 shadow-sm">
      <div className="container mx-auto px-4 py-3">
        {/* Desktop and Mobile Header */}
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link
            to="/"
            className="flex items-center space-x-2 group"
          >
            <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center transition-transform group-hover:rotate-12">
              <span className="text-white font-bold text-lg">C2</span>
            </div>
            <span className="text-2xl font-bold text-gray-800 dark:text-gray-100 tracking-tight hidden sm:block">
              Car2Go
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            <div className="flex space-x-1 bg-gray-100 dark:bg-gray-800 rounded-full p-1">
              {navLinks.map(renderNavLink)}
            </div>
            <button
              onClick={toggleTheme}
              className="
                p-2 rounded-full 
                bg-gray-200 dark:bg-gray-700 
                text-gray-800 dark:text-gray-200
                hover:bg-gray-300 dark:hover:bg-gray-600
                transition-all duration-300
                flex items-center justify-center
              "
              aria-label="Toggle theme"
            >
              {theme === 'light' ? (
                <Moon className="w-5 h-5" />
              ) : (
                <Sun className="w-5 h-5" />
              )}
            </button>
          </div>

          {/* Mobile Menu Toggle */}
          <div className="md:hidden flex items-center space-x-4">
            {/* Theme Toggle for Mobile */}
            <button
              onClick={toggleTheme}
              className="
                p-2 rounded-full 
                bg-gray-200 dark:bg-gray-700 
                text-gray-800 dark:text-gray-200
                hover:bg-gray-300 dark:hover:bg-gray-600
                transition-all duration-300
                flex items-center justify-center
              "
              aria-label="Toggle theme"
            >
              {theme === 'light' ? (
                <Moon className="w-5 h-5" />
              ) : (
                <Sun className="w-5 h-5" />
              )}
            </button>

            {/* Hamburger Menu */}
            <button 
              onClick={toggleMobileMenu}
              className="
                p-2 rounded-full 
                bg-gray-200 dark:bg-gray-700 
                text-gray-800 dark:text-gray-200
                hover:bg-gray-300 dark:hover:bg-gray-600
                transition-all duration-300
              "
              aria-label="Toggle mobile menu"
            >
              {isMobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden absolute left-0 right-0 top-full bg-white dark:bg-gray-900 shadow-lg">
            <div className="flex flex-col space-y-2 p-4">
              {navLinks.map(renderNavLink)}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;