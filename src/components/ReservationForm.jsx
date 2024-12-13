import React, { useState } from 'react';

const ReservationForm = () => {
  const [formData, setFormData] = useState({
    model: '',
    make: '',
    color: '',
    timePeriod: '',
    location: '',
  });

  // Predefined options for dropdowns
  const options = {
    make: ['Toyota', 'Honda', 'Ford', 'Tesla', 'BMW', 'Mercedes'],
    model: ['Sedan', 'SUV', 'Truck', 'Coupe', 'Convertible', 'Hatchback'],
    color: ['Red', 'Blue', 'Black', 'White', 'Silver', 'Gray'],
    timePeriod: ['1 Day', '3 Days', '1 Week', '2 Weeks', '1 Month'],
    location: ['New York', 'Los Angeles', 'Chicago', 'Houston', 'Phoenix']
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Reservation made successfully!');
    console.log(formData);
  };

  return (
    <div className="bg-white dark:bg-gray-800 shadow-2xl rounded-2xl overflow-hidden transform transition-all duration-300 hover:scale-[1.01]">
      <div className="bg-gradient-to-r from-blue-600 to-indigo-700 p-6">
        <h2 className="text-3xl font-bold text-center text-white tracking-wider animate-fade-in">
          Vehicle Reservation
        </h2>
      </div>
      
      <form onSubmit={handleSubmit} className="p-8 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[
            { name: 'make', label: 'Vehicle Make', options: options.make },
            { name: 'model', label: 'Vehicle Model', options: options.model }
          ].map(({ name, label, options }) => (
            <div key={name} className="relative animate-slide-in-right">
              <label 
                htmlFor={name} 
                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
              >
                {label}
              </label>
              <select
                name={name}
                id={name}
                value={formData[name]}
                onChange={handleChange}
                required
                className="
                  w-full px-4 py-3 
                  border border-gray-300 dark:border-gray-600 
                  rounded-lg 
                  text-gray-900 dark:text-gray-100 
                  bg-white dark:bg-gray-700
                  focus:ring-2 focus:ring-blue-500 focus:border-blue-500
                  transition-all duration-300
                "
              >
                <option value="">Select {label}</option>
                {options.map(option => (
                  <option key={option} value={option}>{option}</option>
                ))}
              </select>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[
            { name: 'color', label: 'Vehicle Color', options: options.color },
            { name: 'timePeriod', label: 'Reservation Duration', options: options.timePeriod }
          ].map(({ name, label, options }) => (
            <div key={name} className="relative animate-slide-in-left">
              <label 
                htmlFor={name} 
                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
              >
                {label}
              </label>
              <select
                name={name}
                id={name}
                value={formData[name]}
                onChange={handleChange}
                required
                className="
                  w-full px-4 py-3 
                  border border-gray-300 dark:border-gray-600 
                  rounded-lg 
                  text-gray-900 dark:text-gray-100 
                  bg-white dark:bg-gray-700
                  focus:ring-2 focus:ring-blue-500 focus:border-blue-500
                  transition-all duration-300
                "
              >
                <option value="">Select {label}</option>
                {options.map(option => (
                  <option key={option} value={option}>{option}</option>
                ))}
              </select>
            </div>
          ))}
        </div>

        <div className="relative animate-slide-in-up">
          <label 
            htmlFor="location" 
            className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
          >
            Pickup Location
          </label>
          <select
            name="location"
            id="location"
            value={formData.location}
            onChange={handleChange}
            required
            className="
              w-full px-4 py-3 
              border border-gray-300 dark:border-gray-600 
              rounded-lg 
              text-gray-900 dark:text-gray-100 
              bg-white dark:bg-gray-700
              focus:ring-2 focus:ring-blue-500 focus:border-blue-500
            "
          >
            <option value="">Select Location</option>
            {options.location.map(location => (
              <option key={location} value={location}>{location}</option>
            ))}
          </select>
        </div>

        <button 
          type="submit" 
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
            animate-bounce-in
          "
        >
          Complete Reservation
        </button>
      </form>
    </div>
  );
};

export default ReservationForm;