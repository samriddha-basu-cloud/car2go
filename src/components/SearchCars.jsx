import React, { useState } from 'react';
import { 
  Search, 
  Filter, 
  X, 
  ChevronDown 
} from 'lucide-react';

const SearchCars = ({ filters, onInputChange, onSearch }) => {
  const [isAdvancedFilterOpen, setIsAdvancedFilterOpen] = useState(false);

  const toggleAdvancedFilters = () => {
    setIsAdvancedFilterOpen(!isAdvancedFilterOpen);
  };

  const resetFilters = () => {
    // Implement filter reset logic
    Object.keys(filters).forEach(key => {
      onInputChange({
        target: { 
          name: key, 
          value: key === 'availableStatus' ? '' : '' 
        }
      });
    });
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden mb-8">
      <div className="p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white flex items-center">
            <Search className="mr-3 text-blue-500 w-6 h-6" /> 
            Search Cars
          </h2>
          <div className="flex items-center space-x-2">
            <button 
              onClick={toggleAdvancedFilters}
              className="flex items-center text-gray-600 dark:text-gray-300 hover:text-blue-500 transition-colors"
            >
              <Filter className="mr-2 w-5 h-5" />
              {isAdvancedFilterOpen ? 'Hide' : 'Show'} Advanced Filters
              <ChevronDown 
                className={`ml-2 w-5 h-5 transform transition-transform ${isAdvancedFilterOpen ? 'rotate-180' : ''}`} 
              />
            </button>
            <button 
              onClick={resetFilters}
              className="text-red-500 hover:text-red-600 flex items-center"
              title="Reset Filters"
            >
              <X className="w-5 h-5 mr-1" /> Reset
            </button>
          </div>
        </div>

        {/* Basic Filters */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="relative">
            <input
              type="text"
              name="make"
              placeholder="Car Make"
              value={filters.make}
              onChange={onInputChange}
              className="w-full p-3 pl-10 border rounded-lg dark:bg-gray-700 dark:text-gray-200 dark:border-gray-600 focus:ring-2 focus:ring-blue-500 transition-all"
            />
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
              </svg>
            </div>
          </div>
          <div className="relative">
            <input
              type="text"
              name="model"
              placeholder="Car Model"
              value={filters.model}
              onChange={onInputChange}
              className="w-full p-3 pl-10 border rounded-lg dark:bg-gray-700 dark:text-gray-200 dark:border-gray-600 focus:ring-2 focus:ring-blue-500 transition-all"
            />
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
              </svg>
            </div>
          </div>
          <div className="relative">
            <input
              type="text"
              name="city"
              placeholder="City"
              value={filters.city}
              onChange={onInputChange}
              className="w-full p-3 pl-10 border rounded-lg dark:bg-gray-700 dark:text-gray-200 dark:border-gray-600 focus:ring-2 focus:ring-blue-500 transition-all"
            />
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </div>
          </div>
        </div>

        {/* Advanced Filters */}
        {isAdvancedFilterOpen && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4 transition-all duration-300 ease-in-out">
            <input
              type="text"
              name="colour"
              placeholder="Colour"
              value={filters.colour}
              onChange={onInputChange}
              className="p-3 border rounded-lg dark:bg-gray-700 dark:text-gray-200 dark:border-gray-600 focus:ring-2 focus:ring-blue-500 transition-all"
            />
            <input
              type="number"
              name="price"
              placeholder="Price (₹)"
              value={filters.price}
              onChange={onInputChange}
              className="p-3 border rounded-lg dark:bg-gray-700 dark:text-gray-200 dark:border-gray-600 focus:ring-2 focus:ring-blue-500 transition-all"
            />
            <input
              type="number"
              name="seats"
              placeholder="Seats"
              value={filters.seats}
              onChange={onInputChange}
              className="p-3 border rounded-lg dark:bg-gray-700 dark:text-gray-200 dark:border-gray-600 focus:ring-2 focus:ring-blue-500 transition-all"
            />
            <select
              name="availableStatus"
              value={filters.availableStatus}
              onChange={onInputChange}
              className="p-3 border rounded-lg dark:bg-gray-700 dark:text-gray-200 dark:border-gray-600 focus:ring-2 focus:ring-blue-500 transition-all"
            >
              <option value="">Available Status</option>
              <option value="Available">Available</option>
              <option value="Not Available">Not Available</option>
            </select>
            <input
              type="date"
              name="availableDate"
              placeholder="Available Date"
              value={filters.availableDate}
              onChange={onInputChange}
              className="p-3 border rounded-lg dark:bg-gray-700 dark:text-gray-200 dark:border-gray-600 focus:ring-2 focus:ring-blue-500 transition-all"
            />
            <input
              type="text"
              name="state"
              placeholder="State"
              value={filters.state}
              onChange={onInputChange}
              className="p-3 border rounded-lg dark:bg-gray-700 dark:text-gray-200 dark:border-gray-600 focus:ring-2 focus:ring-blue-500 transition-all"
            />
          </div>
        )}

        {/* Search Button */}
        <div className="mt-6 flex justify-center">
          <button
            onClick={onSearch}
            className="bg-blue-500 hover:bg-blue-600 text-white rounded-lg px-8 py-3 flex items-center shadow-md hover:shadow-lg transition-all transform hover:-translate-y-1"
          >
            <Search className="mr-2" /> Search Cars
          </button>
        </div>
      </div>
    </div>
  );
};

export default SearchCars;