import React, { useState, useEffect } from 'react';
import { 
  Car, 
  ChevronRight, 
  Search,
  MapPin,
  PaletteIcon,
  DollarSign,
  Users,
  CheckCircle2,
  XCircle,
  CalendarIcon,
  TagIcon,
  MapIcon,
  BuildingIcon,
  FlagIcon
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
  const [heroStats, setHeroStats] = useState({
  totalCars: 0,
  citiesServed: 0,
  activeRentals: 0
});



  // Fetch dropdown data and featured cars
  // Fetch dropdown data, featured cars, and update hero stats
useEffect(() => {
  const fetchDropdownAndHeroStats = async () => {
    try {
      const response = await fetch('https://localhost:7273/api/Car/get-all-cars', {
        method: 'GET',
        headers: {
          accept: 'text/plain',
          Authorization: `Bearer ${token}`
        }
      });

      if (!response.ok) {
        throw new Error('Failed to fetch car data');
      }

      const data = await response.json();

      const uniqueValues = (key) => [...new Set(data.map(car => car[key]))];

      // Set dropdown data
      setDropdownData({
        make: uniqueValues('make'),
        model: uniqueValues('model'),
        colour: uniqueValues('colour'),
        price: uniqueValues('pricePerDay'),
        seats: uniqueValues('totalSeats'),
        availableStatus: ['Available', 'Not Available'],
        availableDate: uniqueValues('availableDate')
      });

      // Calculate hero stats
      const totalCars = data.length;
      const citiesServed = uniqueValues('city').length;
      const activeRentals = data.filter(car => car.availableStatus === false).length;

      setHeroStats({
        totalCars,
        citiesServed,
        activeRentals
      });

      // Set featured cars (e.g., based on availability)
      const featured = data.filter(car => car.availableStatus === true);
      setFeaturedCars(featured.slice(0, 6)); // Display top 6 featured cars
    } catch (err) {
      setError(err.message);
    }
  };

  fetchDropdownAndHeroStats();
}, [token]);

  // Handle form submission
const findCars = async () => {
  try {
    setIsLoading(true);
    let url;

    // Check the number of active filters
    if (activeFilters.length === 1) {
      const field = activeFilters[0];
      url = `https://localhost:7273/api/CarSearch/get-cars-by-${field}?${field}=${filters[field]}`;
    } else if (activeFilters.length === 2) {
      const [field1, field2] = activeFilters;
      url = `https://localhost:7273/api/CarFilter/get-cars-by-${field1}-and-${field2}?${field1}=${filters[field1]}&${field2}=${filters[field2]}`;
    } else {
      throw new Error('Please select at least one filter');
    }

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

  const CarCard = ({ car, featured = false }) => (
    <div className={`
      transform transition-all duration-300 
      ${featured ? 'hover:scale-105' : 'hover:scale-102'}
      bg-white dark:bg-gray-800 
      rounded-2xl 
      overflow-hidden 
      shadow-lg 
      hover:shadow-2xl 
      border border-gray-100 
      dark:border-gray-700
    `}>
      {/* Car Image */}
      <div 
        className="h-52 bg-cover bg-center"
        style={{ 
          backgroundImage: `url(${car.imageUrl || '/default-car-image.jpg'})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
      />

      <div className="p-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-bold text-gray-800 dark:text-gray-200">
            {car.make} {car.model} {car.year}
          </h3>
          {featured && (
            <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded-full dark:bg-blue-900 dark:text-blue-300">
              Featured
            </span>
          )}
        </div>

        <div className="space-y-3">
          <div className="grid grid-cols-2 gap-2">
            <div className="flex items-center text-gray-600 dark:text-gray-400">
              <PaletteIcon className="mr-2 w-5 h-5 text-blue-500" />
              <span>{car.colour}</span>
            </div>
            <div className="flex items-center text-gray-600 dark:text-gray-400">
              <Users className="mr-2 w-5 h-5 text-purple-500" />
              <span>{car.totalSeats} Seats</span>
            </div>
            <div className="flex items-center text-gray-600 dark:text-gray-400">
              <MapPin className="mr-2 w-5 h-5 text-green-500" />
              <span>{car.city}, {car.state}</span>
            </div>
            <div className="flex items-center text-gray-600 dark:text-gray-400">
              <DollarSign className="mr-2 w-5 h-5 text-green-500" />
              <span>₹{car.pricePerDay}/day</span>
            </div>
          </div>
          
          <div className="flex items-center mt-2">
            {car.availableStatus ? (
              <>
                <CheckCircle2 className="mr-2 w-5 h-5 text-green-500" />
                <span className="text-green-600">Available from {car.availableDate}</span>
              </>
            ) : (
              <>
                <XCircle className="mr-2 w-5 h-5 text-red-500" />
                <span className="text-red-600">Currently Booked</span>
              </>
            )}
          </div>
        </div>

        <Link 
          to={`/car/${car.licensePlate}`} 
          className="
            mt-6 
            w-full 
            inline-flex 
            items-center 
            justify-center 
            px-4 
            py-2 
            bg-gradient-to-r 
            from-blue-500 
            to-indigo-600 
            text-white 
            rounded-lg 
            hover:from-blue-600 
            hover:to-indigo-700 
            transition-all 
            focus:outline-none 
            focus:ring-2 
            focus:ring-blue-500 
            focus:ring-offset-2
          "
        >
          View Details
          <ChevronRight className="ml-2 w-5 h-5" />
        </Link>
      </div>
    </div>
  );


  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 relative overflow-hidden">
      {/* Hero Section */}
      <div className="relative overflow-hidden before:absolute before:top-0 before:left-1/2 before:bg-[url('https://preline.co/assets/svg/examples/polygon-bg-element.svg')] before:bg-no-repeat before:bg-top before:bg-cover before:w-full before:h-full before:-z-[1] before:transform before:-translate-x-1/2 dark:before:bg-[url('https://preline.co/assets/svg/examples/polygon-bg-element-dark.svg')]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-10">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-800 dark:text-white sm:text-5xl md:text-6xl">
              Find Your Perfect Ride
            </h1>
            <p className="mt-4 text-xl text-gray-600 dark:text-gray-300">
              Explore our extensive fleet of cars across India
            </p>

            <div className="mt-8 flex justify-center items-center space-x-4">
              <div className="flex flex-col items-center">
                <div className="text-3xl font-bold text-blue-600 dark:text-blue-400">
                  {heroStats.totalCars}
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-300">
                  Total Cars
                </div>
              </div>
              <div className="flex flex-col items-center">
                <div className="text-3xl font-bold text-green-600 dark:text-green-400">
                  {heroStats.citiesServed}
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-300">
                  Cities
                </div>
              </div>
              <div className="flex flex-col items-center">
                <div className="text-3xl font-bold text-purple-600 dark:text-purple-400">
                  {heroStats.activeRentals}
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-300">
                  Active Rentals
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Search Filters */}
        <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-xl p-8 mb-12">
          <h2 className="text-2xl font-bold text-center text-gray-800 dark:text-gray-200 mb-6 flex justify-center items-center">
            <Search className="mr-3 text-blue-600 dark:text-blue-400" />
            Find Your Perfect Car
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {Object.keys(filters).map((field, index) => (
              <div key={index} className="relative">
                <label 
                  htmlFor={field} 
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                >
                  {field.charAt(0).toUpperCase() + field.slice(1)}
                </label>
                <select
                  id={field}
                  disabled={isFieldDisabled(field)}
                  value={filters[field]}
                  onChange={(e) => handleFilterChange(field, e.target.value)}
                  className={`
                    w-full 
                    bg-gray-50 
                    dark:bg-gray-700 
                    border 
                    border-gray-300 
                    dark:border-gray-600 
                    rounded-xl 
                    p-3 
                    focus:ring-2 
                    focus:ring-blue-500 
                    transition-all 
                    ${isFieldDisabled(field) && 'cursor-not-allowed opacity-50'}
                  `}
                >
                  <option value="">{`Select ${field.charAt(0).toUpperCase() + field.slice(1)}`}</option>
                  {dropdownData[field]?.map((option, index) => (
                    <option key={index} value={option}>{option}</option>
                  ))}
                </select>
              </div>
            ))}
          </div>

          <div className="text-center mt-8">
            <button
              onClick={findCars}
              disabled={activeFilters.length === 0}
              className={`
                px-8 
                py-3 
                rounded-xl 
                text-white 
                text-lg 
                font-semibold 
                shadow-lg 
                hover:shadow-xl 
                transition-all 
                ${activeFilters.length > 0 
                  ? 'bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700' 
                  : 'bg-gray-300 cursor-not-allowed'}
              `}
            >
              Find Cars
            </button>
          </div>
        </div>

        {/* Search Results */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-200 flex items-center mb-6">
            <Car className="mr-3 text-blue-600 dark:text-blue-400" />
            Search Results
          </h2>
          {isLoading ? (
            <div className="text-center py-8">
              <p className="text-gray-600 dark:text-gray-300">Loading cars...</p>
            </div>
          ) : error ? (
            <div className="text-center py-8">
              <p className="text-red-600">Error: {error}</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {cars.map(car => <CarCard key={car.licensePlate} car={car} />)}
            </div>
          )}
        </div>

        {/* Featured Cars */}
        <div>
          <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-200 flex items-center mb-6">
            <Car className="mr-3 text-blue-600 dark:text-blue-400" />
            Featured Cars
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {featuredCars.map(car => <CarCard key={car.licensePlate} car={car} featured={true} />)}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;