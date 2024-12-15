import React, { useState, useEffect } from 'react';
import { 
  Car, 
  ChevronRight, 
  Filter, 
  Search, 
  MapPin,
  Calendar,
} from 'lucide-react';
import CarCard from '../components/CarCard';

const Dashboard = () => {
  const [searchParams, setSearchParams] = useState({
    location: '',
    pickupDate: '',
    dropoffDate: ''
  });
  const [currentLocation, setCurrentLocation] = useState('your location...');
  const [cars, setCars] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch user's location using the Geolocation API
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`)
            .then((response) => response.json())
            .then((data) => {
              const location = data.display_name || 'Unknown Location';
              setCurrentLocation(location);
            })
            .catch(() => {
              setCurrentLocation('Unable to fetch location.');
            });
        },
        () => {
          setCurrentLocation('Location access denied.');
        }
      );
    } else {
      setCurrentLocation('Geolocation is not supported in this browser.');
    }

    // Fetch cars from API
    const fetchCars = async () => {
      try {
        setIsLoading(true);
        const response = await fetch('https://localhost:7273/api/Car/get-all-cars', {
          method: 'GET',
          headers: {
            'accept': 'text/plain'
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

    fetchCars();
  }, []);

  const carCategories = [
    { icon: <Car className="w-8 h-8 text-blue-500" />, name: 'All Cars' },
    { icon: <Car className="w-8 h-8 text-green-500" />, name: 'Available' },
    { icon: <Car className="w-8 h-8 text-yellow-500" />, name: 'Sedan' },
    { icon: <Car className="w-8 h-8 text-red-500" />, name: 'SUV' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 relative overflow-hidden">
      {/* Background Decorative Elements */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden">
        <div className="absolute top-10 -left-20 w-96 h-96 bg-blue-100/20 dark:bg-blue-900/10 rounded-full blur-3xl animate-float"></div>
        <div className="absolute bottom-20 -right-20 w-96 h-96 bg-indigo-100/20 dark:bg-indigo-900/10 rounded-full blur-3xl animate-float-delayed"></div>
        
        <div 
          className="absolute inset-0 opacity-5 dark:opacity-5 pointer-events-none"
          style={{
            backgroundImage: 'linear-gradient(to right, rgba(0,0,0,0.03) 1px, transparent 1px), linear-gradient(to bottom, rgba(0,0,0,0.03) 1px, transparent 1px)',
            backgroundSize: '30px 30px'
          }}
        ></div>
      </div>

      {/* Main Content */}
      <div className="mt-14 relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header Section */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400 mb-2 animate-slide-in-left">
              Welcome, User
            </h1>
            <p className="text-gray-600 dark:text-gray-300 text-lg animate-slide-in-left">
              Find your perfect ride for the next adventure at {currentLocation}
            </p>
          </div>
          
          {/* Action Buttons */}
          <div className="flex space-x-4 animate-slide-in-left">
            <button className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-full p-3 shadow-sm hover:shadow-md transition-all">
              <Filter className="w-6 h-6 text-gray-600 dark:text-gray-300" />
            </button>
            <button className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-full px-6 py-3 flex items-center space-x-2 shadow-lg hover:shadow-xl transition-all">
              <Search className="w-5 h-5" />
              <span>Find a Car</span>
            </button>
          </div>
        </div>

        {/* Search Section */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 mb-8 animate-slide-in-up">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="flex items-center space-x-3 bg-gray-50 dark:bg-gray-700 p-3 rounded-xl">
              <MapPin className="w-6 h-6 text-blue-500" />
              <input 
                type="text" 
                placeholder="Pick-up Location" 
                className="bg-transparent w-full focus:outline-none text-gray-700 dark:text-gray-200 animate-slide-in-up"
                value={searchParams.location}
                onChange={(e) => setSearchParams({...searchParams, location: e.target.value})}
              />
            </div>
            <div className="flex items-center space-x-3 bg-gray-50 dark:bg-gray-700 p-3 rounded-xl">
              <Calendar className="w-6 h-6 text-green-500" />
              <input 
                type="date" 
                placeholder="Pick-up Date" 
                className="bg-transparent w-full focus:outline-none text-gray-700 dark:text-gray-200 animate-slide-in-up"
                value={searchParams.pickupDate}
                onChange={(e) => setSearchParams({...searchParams, pickupDate: e.target.value})}
              />
            </div>
            <button className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-xl px-6 py-3 flex items-center justify-center space-x-2 shadow-lg hover:shadow-xl transition-all  animate-slide-in-up">
              <Search className="w-5 h-5" />
              <span>Search</span>
            </button>
          </div>
        </div>

        {/* Car Categories */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-6 animate-slide-in-up">
            <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-200">
              Car Categories
            </h2>
          </div>
          <div className="grid grid-cols-4 gap-4">
            {carCategories.map((category, index) => (
              <div 
                key={index} 
                className="bg-white dark:bg-gray-800 rounded-2xl p-4 text-center shadow-md hover:shadow-lg transition-all cursor-pointer hover:scale-105  animate-slide-in-up"
              >
                {category.icon}
                <p className="mt-2 font-medium text-gray-700 dark:text-gray-300">{category.name}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Featured Cars Section */}
        <div>
          <div className="flex justify-between items-center mb-6 animate-slide-in-up">
            <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-200 flex items-center">
              <Car className="mr-3 text-blue-600 dark:text-blue-400" />
              Featured Cars
            </h2>
            <button className="text-blue-600 dark:text-blue-400 flex items-center hover:underline">
              View All <ChevronRight className="ml-2" />
            </button>
          </div>
          
          {isLoading ? (
            <div className="text-center py-8">
              <p className="text-gray-600 dark:text-gray-300">Loading cars...</p>
            </div>
          ) : error ? (
            <div className="text-center py-8">
              <p className="text-red-600 dark:text-red-400">Error: {error}</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 animate-slide-in-right">
              {cars.map(car => (
                <div 
                  key={car.licensePlate} 
                  className="bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all"
                >
                  <img 
                    src={car.imageUrl} 
                    alt={`${car.make} ${car.model}`} 
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-4">
                    <h3 className="text-xl font-bold text-gray-800 dark:text-gray-200">
                      {car.make} {car.model}
                    </h3>
                    <div className="flex justify-between items-center mt-2">
                      <span className="text-gray-600 dark:text-gray-300">
                        {car.year} | {car.colour}
                      </span>
                      <span className="text-blue-600 dark:text-blue-400 font-semibold">
                        ₹{car.pricePerDay}/day
                      </span>
                    </div>
                    <div className="mt-4 grid grid-cols-3 gap-2 text-sm text-gray-600 dark:text-gray-300">
                      <div className="text-center">
                        <p>Seats</p>
                        <p className="font-bold">{car.totalSeats}</p>
                      </div>
                      <div className="text-center">
                        <p>City</p>
                        <p className="font-bold">{car.city}</p>
                      </div>
                      <div className="text-center">
                        <p>Status</p>
                        <p className={`font-bold ${car.availableStatus ? 'text-green-600' : 'text-red-600'}`}>
                          {car.availableStatus ? 'Available' : 'Booked'}
                        </p>
                      </div>
                    </div>
                  </div>
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