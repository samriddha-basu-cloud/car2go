import React, { useState, useEffect } from 'react';
import { 
  Car, 
  ChevronRight, 
  Filter, 
  Search, 
  SlidersHorizontal,
  MapPin,
  Calendar,
  CreditCard,
  Star,
  Zap
} from 'lucide-react';
import CarCard from '../components/CarCard';

const Dashboard = () => {
  const [searchParams, setSearchParams] = useState({
    location: '',
    pickupDate: '',
    dropoffDate: ''
  });
  const [currentLocation, setCurrentLocation] = useState('your location...');

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
  }, []);

  const featuredCars = [
       { id: 1, name: 'Tesla Model S', imageUrl: 'tesla.jpg', pricePerDay: 100, type: 'Electric', transmission: 'Automatic', seats: 5, fuelType: 'Electric' },
    { id: 2, name: 'BMW X5', imageUrl: 'bmw.jpg', pricePerDay: 90, type: 'SUV', transmission: 'Semi-Automatic', seats: 7, fuelType: 'Diesel' },
    { id: 3, name: 'Mercedes C-Class', imageUrl: 'mercedes.jpg', pricePerDay: 85, type: 'Luxury', transmission: 'Automatic', seats: 5, fuelType: 'Hybrid' },
    { id: 4, name: 'Audi A4', imageUrl: 'audi.jpg', pricePerDay: 80, type: 'Sedan', transmission: 'Manual', seats: 4, fuelType: 'Petrol' },
    { id: 5, name: 'Ford Mustang', imageUrl: 'ford.jpg', pricePerDay: 95, type: 'Sports', transmission: 'Manual', seats: 4, fuelType: 'Petrol' },
    { id: 6, name: 'Chevrolet Camaro', imageUrl: 'chevrolet.jpg', pricePerDay: 75, type: 'Sports', transmission: 'Automatic', seats: 4, fuelType: 'Petrol' },
    { id: 7, name: 'Honda Civic', imageUrl: 'honda.jpg', pricePerDay: 70, type: 'Compact', transmission: 'CVT', seats: 5, fuelType: 'Petrol' },
    { id: 8, name: 'Toyota Corolla', imageUrl: 'toyota.jpg', pricePerDay: 65, type: 'Sedan', transmission: 'Automatic', seats: 5, fuelType: 'Hybrid' },
    { id: 9, name: 'Nissan Altima', imageUrl: 'nissan.jpg', pricePerDay: 60, type: 'Sedan', transmission: 'CVT', seats: 5, fuelType: 'Petrol' },
    { id: 10, name: 'Volkswagen Passat', imageUrl: 'volkswagen.jpg', pricePerDay: 55, type: 'Midsize', transmission: 'Manual', seats: 5, fuelType: 'Diesel' },
    { id: 11, name: 'Porsche 911', imageUrl: 'porsche.jpg', pricePerDay: 150, type: 'Sports', transmission: 'Automatic', seats: 2, fuelType: 'Petrol' },
    { id: 12, name: 'Lexus RX', imageUrl: 'lexus.jpg', pricePerDay: 110, type: 'SUV', transmission: 'Automatic', seats: 5, fuelType: 'Hybrid' },
    { id: 13, name: 'Jaguar XF', imageUrl: 'jaguar.jpg', pricePerDay: 120, type: 'Luxury', transmission: 'Automatic', seats: 5, fuelType: 'Diesel' },
    { id: 14, name: 'Mazda CX-5', imageUrl: 'mazda.jpg', pricePerDay: 85, type: 'SUV', transmission: 'Automatic', seats: 5, fuelType: 'Petrol' },
    { id: 15, name: 'Subaru Outback', imageUrl: 'subaru.jpg', pricePerDay: 75, type: 'Crossover', transmission: 'CVT', seats: 5, fuelType: 'Petrol' },
    { id: 16, name: 'Kia Sorento', imageUrl: 'kia.jpg', pricePerDay: 70, type: 'SUV', transmission: 'Automatic', seats: 7, fuelType: 'Petrol' },
    { id: 17, name: 'Hyundai Elantra', imageUrl: 'hyundai.jpg', pricePerDay: 60, type: 'Sedan', transmission: 'Automatic', seats: 5, fuelType: 'Petrol' },
    { id: 18, name: 'Volvo XC90', imageUrl: 'volvo.jpg', pricePerDay: 130, type: 'SUV', transmission: 'Automatic', seats: 7, fuelType: 'Hybrid' },
    { id: 19, name: 'Jeep Wrangler', imageUrl: 'jeep.jpg', pricePerDay: 90, type: 'SUV', transmission: 'Manual', seats: 5, fuelType: 'Petrol' },
    { id: 20, name: 'Ferrari F8', imageUrl: 'ferrari.jpg', pricePerDay: 200, type: 'Sports', transmission: 'Automatic', seats: 2, fuelType: 'Petrol' },
  ];

  const carCategories = [
    { icon: <Zap className="w-8 h-8 text-yellow-500" />, name: 'Electric' },
    { icon: <Car className="w-8 h-8 text-blue-500" />, name: 'Sedan' },
    { icon: <CreditCard className="w-8 h-8 text-green-500" />, name: 'Budget' },
    { icon: <Star className="w-8 h-8 text-purple-500" />, name: 'Luxury' }
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
            {/* <p className="text-gray-500 dark:text-gray-400 text-sm animate-slide-in-left">
              Current Location: {currentLocation}
            </p> */}
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
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 animate-slide-in-right">
            {featuredCars.map(car => (
              <CarCard key={car.id} {...car} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;