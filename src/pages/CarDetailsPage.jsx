import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import { 
  ChevronLeft, 
  MapPin, 
  Users, 
  DollarSign, 
  CalendarIcon, 
  PaletteIcon, 
  CheckCircle2, 
  XCircle, 
  CarIcon, 
  TagIcon, 
  InfoIcon, 
  LocateIcon, 
  FlagIcon 
} from 'lucide-react';

const CarDetailsPage = () => {
  const location = useLocation();
  const { carDetails } = location.state || {};

  if (!carDetails) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
        <p className="text-gray-600 dark:text-gray-300">No car details available.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-8 mt-14">
      <div className="max-w-5xl mx-auto bg-white dark:bg-gray-800 rounded-2xl shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="p-6 bg-gradient-to-r from-blue-600 to-indigo-700 text-white">
          <Link to="/" className="flex items-center mb-4 hover:text-gray-200 transition-colors">
            <ChevronLeft className="w-5 h-5 mr-2" /> Back to Dashboard
          </Link>
          <div className="flex items-center justify-between">
            <h2 className="text-4xl font-extrabold">
              {carDetails.make} {carDetails.model}
            </h2>
            <div className="bg-white/20 px-4 py-2 rounded-lg">
              <span className="text-xl font-semibold">Year {carDetails.year}</span>
            </div>
          </div>
        </div>

        {/* Car Image and Details Container */}
        <div className="grid md:grid-cols-2 gap-8 p-8">
          {/* Car Image */}
          <div className="rounded-2xl overflow-hidden shadow-lg">
            <div
              className="h-96 bg-cover bg-center transform transition-transform duration-300 hover:scale-105"
              style={{
                backgroundImage: `url(${carDetails.imageUrl || '/default-car-image.jpg'})`,
              }}
            ></div>
          </div>

          {/* Detailed Information */}
          <div className="space-y-6">
            <div className="bg-gray-100 dark:bg-gray-700 p-6 rounded-2xl shadow-md">
              <h3 className="text-2xl font-bold mb-4 flex items-center">
                <InfoIcon className="w-6 h-6 mr-3 text-blue-600" />
                Car Details
              </h3>
              <div className="grid grid-cols-2 gap-4">
                {/* Make and Model */}
                <div className="flex items-center">
                  <CarIcon className="w-5 h-5 mr-2 text-blue-500" />
                  <span className="font-medium">Make: {carDetails.make}</span>
                </div>
                <div className="flex items-center">
                  <TagIcon className="w-5 h-5 mr-2 text-purple-500" />
                  <span className="font-medium">Model: {carDetails.model}</span>
                </div>

                {/* Color */}
                <div className="flex items-center">
                  <PaletteIcon className="w-5 h-5 mr-2 text-blue-500" />
                  <span className="font-medium">Color: {carDetails.colour}</span>
                </div>

                {/* Seats */}
                <div className="flex items-center">
                  <Users className="w-5 h-5 mr-2 text-purple-500" />
                  <span className="font-medium">Seats: {carDetails.totalSeats}</span>
                </div>

                {/* License Plate */}
                <div className="flex items-center">
                  <CalendarIcon className="w-5 h-5 mr-2 text-blue-500" />
                  <span className="font-medium">License Plate: {carDetails.licensePlate}</span>
                </div>

                {/* Price */}
                <div className="flex items-center">
                  <DollarSign className="w-5 h-5 mr-2 text-green-500" />
                  <span className="font-medium">Price: ₹{carDetails.pricePerDay}/day</span>
                </div>
              </div>
            </div>

            {/* Availability and Location */}
            <div className="bg-gray-100 dark:bg-gray-700 p-6 rounded-2xl shadow-md">
              <h3 className="text-2xl font-bold mb-4 flex items-center">
                <LocateIcon className="w-6 h-6 mr-3 text-green-600" />
                Availability & Location
              </h3>
              <div className="grid grid-cols-2 gap-4">
                {/* Available Status */}
                <div className="flex items-center">
                  {carDetails.availableStatus ? (
                    <>
                      <CheckCircle2 className="w-5 h-5 mr-2 text-green-500" />
                      <span className="font-medium">Available from: {carDetails.availableDate}</span>
                    </>
                  ) : (
                    <>
                      <XCircle className="w-5 h-5 mr-2 text-red-500" />
                      <span className="font-medium">Currently Booked</span>
                    </>
                  )}
                </div>

                {/* Location */}
                <div className="flex items-center">
                  <MapPin className="w-5 h-5 mr-2 text-green-500" />
                  <span className="font-medium">{carDetails.city}, {carDetails.state}</span>
                </div>

                {/* Country */}
                <div className="flex items-center">
                  <FlagIcon className="w-5 h-5 mr-2 text-blue-500" />
                  <span className="font-medium">Country: {carDetails.country}</span>
                </div>

                {/* Zip Code */}
                <div className="flex items-center">
                  <LocateIcon className="w-5 h-5 mr-2 text-purple-500" />
                  <span className="font-medium">Zip Code: {carDetails.zipCode}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Description */}
        {carDetails.description && (
          <div className="p-8 bg-gray-100 dark:bg-gray-700">
            <h3 className="text-2xl font-bold mb-4 flex items-center">
              <InfoIcon className="w-6 h-6 mr-3 text-blue-600" />
              Car Description
            </h3>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              {carDetails.description}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default CarDetailsPage;