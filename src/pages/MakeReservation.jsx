import React from 'react';
import ReservationForm from '../components/ReservationForm';

const MakeReservation = () => {
  return (
    <div className="relative min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 overflow-hidden">
      {/* Background Decorative Elements */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
        {/* Floating Circles */}
        <div className="absolute top-10 left-10 w-48 h-48 bg-blue-200/30 dark:bg-blue-900/20 rounded-full blur-2xl animate-float"></div>
        <div className="absolute bottom-20 right-20 w-64 h-64 bg-indigo-200/30 dark:bg-indigo-900/20 rounded-full blur-2xl animate-float-delayed"></div>
        
        {/* Subtle Grid Pattern */}
        <div className="absolute inset-0 bg-gradient-to-br from-transparent to-transparent 
          dark:from-transparent dark:to-transparent 
          opacity-10 dark:opacity-5"
          style={{
            backgroundImage: 'linear-gradient(to right, rgba(0,0,0,0.05) 1px, transparent 1px), linear-gradient(to bottom, rgba(0,0,0,0.05) 1px, transparent 1px)',
            backgroundSize: '30px 30px'
          }}
        ></div>
        
        {/* Diagonal Lines */}
        <div className="absolute inset-0 opacity-5 dark:opacity-10 pointer-events-none">
          <div className="absolute inset-0 transform -skew-x-12 bg-gradient-to-r from-blue-100 to-indigo-100 dark:from-gray-800 dark:to-gray-900"></div>
        </div>
      </div>

      {/* Content Container */}
      <div className="relative z-10 flex items-center justify-center min-h-screen px-4 py-12">
        <div className="w-full max-w-4xl">
          <div className="text-center mb-12">
            <h1 className="text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400 mb-4">
                 Make the perfect choice for your destination!

            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Select your perfect vehicle for your upcoming journey. Choose from our wide range of models, colors, and rental periods.
            </p>
          </div>
          <ReservationForm />
        </div>
      </div>
    </div>
  );
};

export default MakeReservation;