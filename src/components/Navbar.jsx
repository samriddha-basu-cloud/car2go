import React, { useContext } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Moon, Sun } from 'lucide-react';
import { ThemeContext } from '../context/ThemeContext';

const Navbar = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);
  const location = useLocation();

  // Check if token exists in localStorage
  const token = localStorage.getItem('token');

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Dashboard', path: '/dashboard' },
    { name: 'Make Reservation', path: '/make-reservation' },
    { name: 'Manage Reservations', path: '/manage-reservation' },
    { name: 'Settings', path: '/settings' },
  ];

  return (
    <nav className="fixed top-0 left-0 w-full z-50 backdrop-blur-md bg-white/80 dark:bg-gray-900/80 shadow-sm">
      <div className="container mx-auto flex justify-between items-center px-4 py-3">
        <div className="flex items-center">
          <Link
            to="/"
            className="flex items-center space-x-2 group"
          >
            <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center transition-transform group-hover:rotate-12">
              <span className="text-white font-bold text-lg">C2</span>
            </div>
            <span className="text-2xl font-bold text-gray-800 dark:text-gray-100 tracking-tight">
              Car2Go
            </span>
          </Link>
        </div>

        <div className="flex items-center space-x-6">
          <div className="flex space-x-1 bg-gray-100 dark:bg-gray-800 rounded-full p-1">
            {navLinks.map((link) => (
              <div
                key={link.name}
                className="relative group"
              >
                <Link
                  to={token ? link.path : '#'}
                  className={`
                    px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 
                    ${location.pathname === link.path
                      ? 'bg-blue-500 text-white shadow-md'
                      : 'text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-white'}
                    ${!token && 'opacity-50 pointer-events-none'}
                  `}
                >
                  {link.name}
                </Link>
                {!token && (
                  <span
                    className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 text-xs bg-gray-700 text-white px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    Please log in to access
                  </span>
                )}
              </div>
            ))}
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
      </div>
    </nav>
  );
};

export default Navbar;