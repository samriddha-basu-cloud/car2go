import React from 'react';
import { useLocation, useParams, Link } from 'react-router-dom';
import { 
  Car, 
  PaletteIcon, 
  Users, 
  MapPin, 
  DollarSign, 
  CheckCircle2, 
  XCircle, 
  CalendarIcon, 
  TagIcon, 
  MapIcon, 
  BuildingIcon, 
  FlagIcon 
} from 'lucide-react';

const CarDetailsPage = () => {
  const location = useLocation();
  const { licensePlate } = useParams();

  // Try to get car details from location state, fallback to placeholder
  const carDetails = location.state?.carDetails || {
    licensePlate: licensePlate,
    make: 'Unknown',
    model: 'Unknown',
    year: 'N/A',
    colour: 'N/A',
    totalSeats: 'N/A',
    pricePerDay: 'N/A',
    city: 'N/A',
    state: 'N/A',
    availableStatus: false,
    availableDate: 'N/A',
    imageUrl: '/default-car-image.jpg',
    description: 'No description available.',
    fuelType: 'N/A',
    transmission: 'N/A',
    mileage: 'N/A'
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto bg-white dark:bg-gray-800 rounded-3xl shadow-2xl overflow-hidden">
        {/* Car Image Section */}
        <div 
          className="h-96 bg-cover bg-center relative"
          style={{ 
            backgroundImage: `url(${carDetails.imageUrl})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center'
          }}
        >
          {carDetails.availableStatus ? (
            <span className="absolute top-4 right-4 bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded-full dark:bg-green-900 dark:text-green-300">
              Available
            </span>
          ) : (
            <span className="absolute top-4 right-4 bg-red-100 text-red-800 text-xs font-medium px-2.5 py-0.5 rounded-full dark:bg-red-900 dark:text-red-300">
              Not Available
            </span>
          )}
        </div>

        {/* Car Details Section */}
        <div className="p-8">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-200">
              {carDetails.make} {carDetails.model} {carDetails.year}
            </h1>
            <div className="text-2xl font-bold text-green-600 dark:text-green-400">
              ₹{carDetails.pricePerDay}/day
            </div>
          </div>

          {/* Detailed Info Grid */}
          <div className="grid md:grid-cols-3 gap-6 mb-8">
            <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-xl">
              <div className="flex items-center mb-2">
                <PaletteIcon className="mr-2 w-5 h-5 text-blue-500" />
                <span className="font-medium text-gray-600 dark:text-gray-300">Color</span>
              </div>
              <p className="text-lg font-bold text-gray-800 dark:text-gray-200">{carDetails.colour}</p>
            </div>

            <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-xl">
              <div className="flex items-center mb-2">
                <Users className="mr-2 w-5 h-5 text-purple-500" />
                <span className="font-medium text-gray-600 dark:text-gray-300">Capacity</span>
              </div>
              <p className="text-lg font-bold text-gray-800 dark:text-gray-200">{carDetails.totalSeats} Seats</p>
            </div>

            <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-xl">
              <div className="flex items-center mb-2">
                <MapPin className="mr-2 w-5 h-5 text-green-500" />
                <span className="font-medium text-gray-600 dark:text-gray-300">Location</span>
              </div>
              <p className="text-lg font-bold text-gray-800 dark:text-gray-200">{carDetails.city}, {carDetails.state}</p>
            </div>
          </div>

          {/* Additional Details */}
          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <div>
              <h3 className="text-xl font-semibold text-gray-700 dark:text-gray-300 mb-4">Vehicle Information</h3>
              <div className="space-y-3">
                <div className="flex items-center">
                  <TagIcon className="mr-2 w-5 h-5 text-blue-500" />
                  <span className="text-gray-600 dark:text-gray-400">
                    License Plate: {carDetails.licensePlate}
                  </span>
                </div>
                <div className="flex items-center">
                  <BuildingIcon className="mr-2 w-5 h-5 text-purple-500" />
                  <span className="text-gray-600 dark:text-gray-400">
                    Transmission: {carDetails.transmission || 'N/A'}
                  </span>
                </div>
                <div className="flex items-center">
                  <FlagIcon className="mr-2 w-5 h-5 text-green-500" />
                  <span className="text-gray-600 dark:text-gray-400">
                    Fuel Type: {carDetails.fuelType || 'N/A'}
                  </span>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-gray-700 dark:text-gray-300 mb-4">Availability</h3>
              <div className="space-y-3">
                <div className="flex items-center">
                  {carDetails.availableStatus ? (
                    <CheckCircle2 className="mr-2 w-5 h-5 text-green-500" />
                  ) : (
                    <XCircle className="mr-2 w-5 h-5 text-red-500" />
                  )}
                  <span className={`
                    ${carDetails.availableStatus ? 'text-green-600' : 'text-red-600'}
                  `}>
                    {carDetails.availableStatus ? 'Available' : 'Currently Booked'}
                  </span>
                </div>
                <div className="flex items-center">
                  <CalendarIcon className="mr-2 w-5 h-5 text-blue-500" />
                  <span className="text-gray-600 dark:text-gray-400">
                    Available From: {carDetails.availableDate}
                  </span>
                </div>
                <div className="flex items-center">
                  <MapIcon className="mr-2 w-5 h-5 text-purple-500" />
                  <span className="text-gray-600 dark:text-gray-400">
                    Mileage: {carDetails.mileage || 'N/A'}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Description */}
          <div className="bg-gray-50 dark:bg-gray-700 p-6 rounded-xl mb-8">
            <h3 className="text-xl font-semibold text-gray-700 dark:text-gray-300 mb-4">About this Car</h3>
            <p className="text-gray-600 dark:text-gray-400">
              {carDetails.description || 'No description available for this vehicle.'}
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex space-x-4">
            <button className="
              w-full 
              bg-gradient-to-r 
              from-blue-500 
              to-indigo-600 
              text-white 
              py-3 
              rounded-xl 
              hover:from-blue-600 
              hover:to-indigo-700 
              transition-all
            ">
              Book Now
            </button>
            <Link 
              to="/dashboard" 
              className="
                w-full 
                text-center 
                bg-gray-200 
                dark:bg-gray-700 
                text-gray-700 
                dark:text-gray-300 
                py-3 
                rounded-xl 
                hover:bg-gray-300 
                dark:hover:bg-gray-600 
                transition-all
              "
            >
              Back to Dashboard
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CarDetailsPage;