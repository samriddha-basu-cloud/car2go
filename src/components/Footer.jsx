import React from 'react';

const Footer = () => {
  return (
    <footer className="w-full p-4 bg-gray-100 dark:bg-gray-800 text-center">
      <p className="text-gray-700 dark:text-gray-400">
        &copy; {new Date().getFullYear()} Car Rental. All rights reserved.
      </p>
    </footer>
  );
};

export default Footer;