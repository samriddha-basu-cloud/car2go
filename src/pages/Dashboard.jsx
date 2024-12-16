import React, { useState, useEffect } from 'react';
import { 
  Car, 
  ChevronRight, 
  Search
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
  const [featuredCars, setFeaturedCars] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [dropdownData, setDropdownData] = useState({});
  const [activeFilters, setActiveFilters] = useState([]);
  const token = localStorage.getItem('token');

  // Fetch dropdown data and featured cars
  useEffect(() => {
    const fetchDropdownAndFeaturedCars = async () => {
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

        // Filter featured cars (e.g., based on availability)
        const featured = data.filter(car => car.availableStatus === true);
        setFeaturedCars(featured.slice(0, 6)); // Display top 6 featured cars
      } catch (err) {
        setError(err.message);
      }
    };

    fetchDropdownAndFeaturedCars();
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
            {/* Dropdown Fields */}
            {Object.keys(filters).map((field, index) => (
              <select
                key={index}
                disabled={isFieldDisabled(field)}
                value={filters[field]}
                onChange={(e) => handleFilterChange(field, e.target.value)}
                className={`bg-gray-50 dark:bg-gray-700 p-3 rounded-xl focus:outline-none ${isFieldDisabled(field) && 'cursor-not-allowed opacity-50'}`}
              >
                <option value="">{`Select ${field.charAt(0).toUpperCase() + field.slice(1)}`}</option>
                {dropdownData[field]?.map((option, index) => (
                  <option key={index} value={option}>{option}</option>
                ))}
              </select>
            ))}
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

        {/* Featured Cars */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-200 flex items-center">
            <Car className="mr-3 text-blue-600 dark:text-blue-400" />
            Featured Cars
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
            {featuredCars.map(car => (
              <div key={car.licensePlate} className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-lg transition-all">
                <h3 className="text-lg font-bold">{car.make} {car.model}</h3>
                <p>Colour: {car.colour}</p>
                <p>₹{car.pricePerDay}/day</p>
                <p>Seats: {car.totalSeats}</p>
                <p className={`text-sm ${car.availableStatus ? 'text-green-600' : 'text-red-600'}`}>
                  {car.availableStatus ? 'Available' : 'Booked'}
                </p>
                <Link 
                  to={`/car/${car.licensePlate}`} 
                  className="mt-4 inline-block px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-all"
                >
                  View Details
                </Link>
              </div>
            ))}
          </div>
        </div>

        {/* Search Results */}
        <div>
          <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-200 flex items-center">
            <Car className="mr-3 text-blue-600 dark:text-blue-400" />
            Search Results
          </h2>
          {isLoading ? (
            <div className="text-center py-8">
              <p>Loading cars...</p>
            </div>
          ) : error ? (
            <div className="text-center py-8">
              <p className="text-red-600">Error: {error}</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
              {cars.map(car => (
                <div key={car.licensePlate} className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow-md">
                  <h3 className="text-lg font-bold">{car.make} {car.model}</h3>
                  <p>Colour: {car.colour}</p>
                  <p>₹{car.pricePerDay}/day</p>
                  <p>Seats: {car.totalSeats}</p>
                  <p className={`text-sm ${car.availableStatus ? 'text-green-600' : 'text-red-600'}`}>
                    {car.availableStatus ? 'Available' : 'Booked'}
                  </p>
                  <Link 
                    to={`/car/${car.licensePlate}`} 
                    className="mt-4 inline-block px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-all"
                  >
                    View Details
                  </Link>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;