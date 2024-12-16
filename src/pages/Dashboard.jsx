import React, { useState, useEffect } from 'react';
import { 
  Car, 
  ChevronRight, 
  Filter, 
  Search, 
  MapPin,
  Calendar
} from 'lucide-react';
import { Link } from 'react-router-dom';

const Dashboard = () => {
  const [filters, setFilters] = useState({
    make: '',
    model: '',
    colour: '',
    price: '',
    seats: '',
    availableStatus: '',
    availableDate: ''
  });
  const [cars, setCars] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [dropdownData, setDropdownData] = useState({});
  const [activeFilters, setActiveFilters] = useState([]);
  const token = localStorage.getItem('token');

  // Fetch dropdown data
  useEffect(() => {
    const fetchDropdownData = async () => {
      try {
        const response = await fetch('https://localhost:7273/api/Car/get-all-cars', {
          method: 'GET',
          headers: {
            accept: 'text/plain',
            Authorization: `Bearer ${token}`
          }
        });

        if (!response.ok) {
          throw new Error('Failed to fetch dropdown data');
        }

        const data = await response.json();
        const uniqueValues = (key) => [...new Set(data.map(car => car[key]))];

        setDropdownData({
          make: uniqueValues('make'),
          model: uniqueValues('model'),
          colour: uniqueValues('colour'),
          price: uniqueValues('pricePerDay'),
          seats: uniqueValues('totalSeats'),
          availableStatus: ['Available', 'Not Available'],
          availableDate: uniqueValues('availableDate')
        });
      } catch (err) {
        setError(err.message);
      }
    };

    fetchDropdownData();
  }, [token]);

  // Handle form submission
  const findCars = async () => {
    if (activeFilters.length !== 2) return;

    const [field1, field2] = activeFilters;
    const url = `https://localhost:7273/api/CarFilter/get-cars-by-${field1}-and-${field2}?${field1}=${filters[field1]}&${field2}=${filters[field2]}`;

    try {
      setIsLoading(true);
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          accept: 'text/plain',
          Authorization: `Bearer ${token}`
        }
      });

      if (!response.ok) {
        throw new Error('Failed to fetch cars');
      }

      const data = await response.json();
      setCars(data);
      setIsLoading(false);
    } catch (err) {
      setError(err.message);
      setIsLoading(false);
    }
  };

  const handleFilterChange = (field, value) => {
    setFilters(prev => ({ ...prev, [field]: value }));

    if (!activeFilters.includes(field)) {
      if (activeFilters.length < 2) {
        setActiveFilters([...activeFilters, field]);
      }
    }
  };

  const isFieldDisabled = (field) => !activeFilters.includes(field) && activeFilters.length >= 2;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 relative overflow-hidden">
      {/* Main Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Search Filters */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Make Dropdown */}
            <select
              disabled={isFieldDisabled('make')}
              value={filters.make}
              onChange={(e) => handleFilterChange('make', e.target.value)}
              className={`bg-gray-50 dark:bg-gray-700 p-3 rounded-xl focus:outline-none ${isFieldDisabled('make') && 'cursor-not-allowed opacity-50'}`}
            >
              <option value="">Select Make</option>
              {dropdownData.make?.map((make, index) => (
                <option key={index} value={make}>{make}</option>
              ))}
            </select>

            {/* Model Dropdown */}
            <select
              disabled={isFieldDisabled('model')}
              value={filters.model}
              onChange={(e) => handleFilterChange('model', e.target.value)}
              className={`bg-gray-50 dark:bg-gray-700 p-3 rounded-xl focus:outline-none ${isFieldDisabled('model') && 'cursor-not-allowed opacity-50'}`}
            >
              <option value="">Select Model</option>
              {dropdownData.model?.map((model, index) => (
                <option key={index} value={model}>{model}</option>
              ))}
            </select>

            {/* Colour Dropdown */}
            <select
              disabled={isFieldDisabled('colour')}
              value={filters.colour}
              onChange={(e) => handleFilterChange('colour', e.target.value)}
              className={`bg-gray-50 dark:bg-gray-700 p-3 rounded-xl focus:outline-none ${isFieldDisabled('colour') && 'cursor-not-allowed opacity-50'}`}
            >
              <option value="">Select Colour</option>
              {dropdownData.colour?.map((colour, index) => (
                <option key={index} value={colour}>{colour}</option>
              ))}
            </select>

            {/* Price Dropdown */}
            <select
              disabled={isFieldDisabled('price')}
              value={filters.price}
              onChange={(e) => handleFilterChange('price', e.target.value)}
              className={`bg-gray-50 dark:bg-gray-700 p-3 rounded-xl focus:outline-none ${isFieldDisabled('price') && 'cursor-not-allowed opacity-50'}`}
            >
              <option value="">Select Price</option>
              {dropdownData.price?.map((price, index) => (
                <option key={index} value={price}>{price}</option>
              ))}
            </select>

            {/* Seats Dropdown */}
            <select
              disabled={isFieldDisabled('seats')}
              value={filters.seats}
              onChange={(e) => handleFilterChange('seats', e.target.value)}
              className={`bg-gray-50 dark:bg-gray-700 p-3 rounded-xl focus:outline-none ${isFieldDisabled('seats') && 'cursor-not-allowed opacity-50'}`}
            >
              <option value="">Select Seats</option>
              {dropdownData.seats?.map((seats, index) => (
                <option key={index} value={seats}>{seats}</option>
              ))}
            </select>

            {/* Availability Dropdown */}
            <select
              disabled={isFieldDisabled('availableStatus')}
              value={filters.availableStatus}
              onChange={(e) => handleFilterChange('availableStatus', e.target.value)}
              className={`bg-gray-50 dark:bg-gray-700 p-3 rounded-xl focus:outline-none ${isFieldDisabled('availableStatus') && 'cursor-not-allowed opacity-50'}`}
            >
              <option value="">Select Availability</option>
              {dropdownData.availableStatus?.map((status, index) => (
                <option key={index} value={status}>{status}</option>
              ))}
            </select>

            {/* Available Date Dropdown */}
            <select
              disabled={isFieldDisabled('availableDate')}
              value={filters.availableDate}
              onChange={(e) => handleFilterChange('availableDate', e.target.value)}
              className={`bg-gray-50 dark:bg-gray-700 p-3 rounded-xl focus:outline-none ${isFieldDisabled('availableDate') && 'cursor-not-allowed opacity-50'}`}
            >
              <option value="">Select Available Date</option>
              {dropdownData.availableDate?.map((date, index) => (
                <option key={index} value={date}>{date}</option>
              ))}
            </select>
          </div>

          <div className="text-center mt-6">
            <button
              onClick={findCars}
              disabled={activeFilters.length !== 2}
              className={`px-6 py-3 rounded-xl text-white shadow-lg hover:shadow-xl transition-all ${activeFilters.length === 2 ? 'bg-gradient-to-r from-blue-500 to-indigo-600' : 'bg-gray-300 cursor-not-allowed'}`}
            >
              Find Cars
            </button>
          </div>
        </div>

        {/* Results Section */}
        {isLoading ? (
          <div className="text-center py-8">
            <p>Loading cars...</p>
          </div>
        ) : error ? (
          <div className="text-center py-8">
            <p className="text-red-600">Error: {error}</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {cars.map(car => (
              <div key={car.licensePlate} className="p-4 bg-white rounded-lg shadow-md">
                <h3>{car.make} {car.model}</h3>
                <p>{car.colour}</p>
                <p>₹{car.pricePerDay}/day</p>
                <p>{car.availableStatus ? 'Available' : 'Booked'}</p>
                <Link to={`/car/${car.licensePlate}`}>Details</Link>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;