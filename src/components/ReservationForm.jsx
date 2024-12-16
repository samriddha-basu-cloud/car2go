import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, X, Car, AlertTriangle } from 'lucide-react';

const ReservationForm = () => {
  const [formData, setFormData] = useState({
    email: '',
    licensePlate: '',
    pickUpDate: '',
    dropOffDate: ''
  });

  const [submitStatus, setSubmitStatus] = useState({
    loading: false,
    success: false,
    error: null,
    carAvailable: null
  });

  const modalRef = useRef(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitStatus({ 
      loading: true, 
      success: false, 
      error: null,
      carAvailable: null 
    });

    try {
      // First, check car availability
      const availabilityResponse = await axios.post(
        'https://localhost:7273/api/Reservation/check-availability', 
        {
          licensePlate: formData.licensePlate,
          pickUpDate: formData.pickUpDate,
          dropOffDate: formData.dropOffDate
        },
        {
          headers: {
            'accept': '*/*',
            'Content-Type': 'application/json'
          }
        }
      );

      // If car is available, proceed with reservation
      if (availabilityResponse.data.isAvailable) {
        const reservationResponse = await axios.post(
          'https://localhost:7273/api/Reservation/reserve-car', 
          formData,
          {
            headers: {
              'accept': '*/*',
              'Content-Type': 'application/json'
            }
          }
        );

        setSubmitStatus({ 
          loading: false, 
          success: true, 
          error: null,
          carAvailable: true
        });

        // Reset form after successful submission
        setFormData({
          email: '',
          licensePlate: '',
          pickUpDate: '',
          dropOffDate: ''
        });
      } else {
        setSubmitStatus({
          loading: false,
          success: false,
          error: 'Unfortunately, the selected car is not available for the chosen dates.',
          carAvailable: false
        });
      }
    } catch (error) {
      setSubmitStatus({
        loading: false,
        success: false,
        error: error.response?.data?.message || 'Reservation failed. Please try again.',
        carAvailable: null
      });
    }
  };

  // Close modal when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        setSubmitStatus(prev => ({ ...prev, success: false }));
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
        <div className="max-h-screen bg-gradient-to-br from-blue-100 to-indigo-100 dark:from-slate-900 dark:to-slate-800 flex items-center justify-center p-6">
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md bg-white dark:bg-slate-800 shadow-2xl rounded-2xl overflow-hidden"
      >
        <div className="bg-gradient-to-r from-blue-600 to-indigo-700 p-6">
          <h2 className="text-3xl font-extrabold text-center text-white tracking-wider">
            Vehicle Reservation
          </h2>
        </div>
        
                <form onSubmit={handleSubmit} className="p-8 space-y-6">
          <div className="space-y-4">
            {[
              { 
                name: 'email', 
                label: 'Email', 
                type: 'email', 
                placeholder: 'you@example.com',
                icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                  <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                </svg>
              },
              { 
                name: 'licensePlate', 
                label: 'License Plate', 
                type: 'text', 
                placeholder: 'MP09CP7235',
                icon: <Car className="h-5 w-5 text-gray-400" />
              },
              { 
                name: 'pickUpDate', 
                label: 'Pick-up Date', 
                type: 'date'
              },
              { 
                name: 'dropOffDate', 
                label: 'Drop-off Date', 
                type: 'date'
              }
            ].map(({ name, label, type, placeholder, icon }) => (
              <div key={name} className="relative">
                <label 
                  htmlFor={name} 
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                >
                  {label}
                </label>
                <div className="relative">
                  {icon && (
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      {icon}
                    </div>
                  )}
                  <input
                    type={type}
                    name={name}
                    id={name}
                    value={formData[name]}
                    onChange={handleChange}
                    required
                    placeholder={placeholder}
                    className={`
                      w-full px-4 py-3 
                      ${icon ? 'pl-10' : ''}
                      border border-gray-300 dark:border-gray-700
                      rounded-lg 
                      text-gray-900 dark:text-gray-100
                      bg-white dark:bg-gray-800
                      focus:ring-2 focus:ring-blue-500 focus:border-blue-500
                      transition-all duration-300
                    `}
                  />
                </div>
              </div>
            ))}
          </div>
        
          {submitStatus.error && (
            <motion.div 
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-center space-x-2 text-red-500 text-sm bg-red-50 dark:bg-red-900 p-3 rounded-lg"
            >
              <AlertTriangle className="h-5 w-5" />
              <span>{submitStatus.error}</span>
            </motion.div>
          )}
        
          <motion.button 
            type="submit" 
            disabled={submitStatus.loading}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="
              w-full py-4 
              bg-gradient-to-r from-blue-600 to-indigo-700 
              text-white font-bold 
              rounded-lg 
              hover:from-blue-700 hover:to-indigo-800 
              transition-all duration-300 
              disabled:opacity-50
              disabled:cursor-not-allowed
              flex items-center justify-center
              space-x-2
            "
          >
            {submitStatus.loading ? (
              <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
            ) : (
              'Complete Reservation'
            )}
          </motion.button>
        </form>
      </motion.div>

      <AnimatePresence>
        {submitStatus.success && (
          <motion.div 
            ref={modalRef}
            initial={{ opacity: 0, scale: 0.7 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.7 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
          >
            <motion.div
              className="bg-white rounded-2xl p-8 max-w-md w-full text-center shadow-2xl"
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              <div className="flex justify-center mb-6">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: [0, 1.2, 1] }}
                  transition={{ duration: 0.5 }}
                  className="bg-green-100 p-4 rounded-full"
                >
                  <Check className="h-12 w-12 text-green-600" />
                </motion.div>
              </div>
              <h2 className="text-2xl font-bold text-gray-800 mb-4">
                Reservation Confirmed!
              </h2>
              <p className="text-gray-600 mb-6">
                Your vehicle has been successfully reserved. We look forward to serving you.
              </p>
              <button
                onClick={() => setSubmitStatus(prev => ({ ...prev, success: false }))}
                className="
                  w-full py-3 
                  bg-blue-600 
                  text-white 
                  rounded-lg 
                  hover:bg-blue-700 
                  transition-colors
                "
              >
                Close
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ReservationForm;