import React, { useState } from 'react';
import axios from 'axios';

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
    error: null
  });

  const [popupMessage, setPopupMessage] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitStatus({ loading: true, success: false, error: null });

    try {
      const response = await axios.post(
        'https://localhost:7273/api/Reservation/reserve-car', 
        formData,
        {
          headers: {
            'accept': '*/*',
            'Content-Type': 'application/json'
          }
        }
      );

      if (response.data.message === "Car not available") {
        setPopupMessage("Car not available. Please choose a different car or date.");
      } else if (response.data.message === "Reservation created successfully.") {
        setPopupMessage("Reservation created successfully!");
        // Optional: Reset form after successful submission
        setFormData({
          email: '',
          licensePlate: '',
          pickUpDate: '',
          dropOffDate: ''
        });
      }

      setSubmitStatus({ 
        loading: false, 
        success: response.data.message === "Reservation created successfully.", 
        error: null 
      });
    } catch (error) {
      setPopupMessage(error.response?.data?.message || 'Reservation failed. Please try again.');
      setSubmitStatus({
        loading: false,
        success: false,
        error: error.response?.data?.message || 'Reservation failed. Please try again.'
      });
    }
  };

  const closePopup = () => {
    setPopupMessage(null);
  };

  return (
    <div className="bg-white dark:bg-gray-800 shadow-2xl rounded-2xl overflow-hidden transform transition-all duration-300 hover:scale-[1.01] max-w-md mx-auto">
      <div className="bg-gradient-to-r from-blue-600 to-indigo-700 p-6">
        <h2 className="text-3xl font-bold text-center text-white tracking-wider">
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
              placeholder: 'Enter your email'
            },
            { 
              name: 'licensePlate', 
              label: 'License Plate', 
              type: 'text', 
              placeholder: 'Enter license plate number'
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
          ].map(({ name, label, type, placeholder }) => (
            <div key={name} className="relative">
              <label 
                htmlFor={name} 
                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
              >
                {label}
              </label>
              <input
                type={type}
                name={name}
                id={name}
                value={formData[name]}
                onChange={handleChange}
                required
                placeholder={placeholder}
                className="
                  w-full px-4 py-3 
                  border border-gray-300 dark:border-gray-600 
                  rounded-lg 
                  text-gray-900 dark:text-gray-100 
                  bg-white dark:bg-gray-700
                  focus:ring-2 focus:ring-blue-500 focus:border-blue-500
                  transition-all duration-300
                "
              />
            </div>
          ))}
        </div>

        {submitStatus.error && (
          <div className="text-red-500 text-sm text-center mb-4">
            {submitStatus.error}
          </div>
        )}

        <button 
          type="submit" 
          disabled={submitStatus.loading}
          className="
            w-full py-4 
            bg-gradient-to-r from-blue-600 to-indigo-700 
            text-white font-bold 
            rounded-lg 
            hover:from-blue-700 hover:to-indigo-800 
            transition-all duration-300 
            transform hover:scale-[1.02] 
            focus:outline-none 
            focus:ring-2 
            focus:ring-blue-500 
            focus:ring-opacity-50
            disabled:opacity-50
            disabled:cursor-not-allowed
          "
        >
          {submitStatus.loading ? 'Submitting...' : 'Complete Reservation'}
        </button>
      </form>

      {/* Popup */}
      {popupMessage && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 space-y-4 max-w-sm mx-auto">
            <p className="text-center text-gray-800 dark:text-gray-200">
              {popupMessage}
            </p>
            <button 
              onClick={closePopup}
              className="w-full py-2 px-4 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700 transition-all duration-300"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ReservationForm;