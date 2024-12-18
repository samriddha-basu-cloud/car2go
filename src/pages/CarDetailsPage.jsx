import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import { ChevronLeft, MapPin, Users, DollarSign, CalendarIcon, PaletteIcon, CheckCircle2, XCircle } from 'lucide-react';

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
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-8">
      <div className="max-w-4xl mx-auto bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden">
        {/* Header */}
        <div className="p-6 bg-gradient-to-r from-blue-500 to-indigo-600 text-white">
          <Link to="/" className="flex items-center mb-4 hover:underline">
            <ChevronLeft className="w-5 h-5 mr-2" /> Back to Dashboard
          </Link>
          <h2 className="text-3xl font-bold">
            {carDetails.make} {carDetails.model} ({carDetails.year})
          </h2>
        </div>

        {/* Car Image */}
        <div
          className="h-64 bg-cover bg-center"
          style={{
            backgroundImage: `url(${carDetails.imageUrl || '/default-car-image.jpg'})`,
          }}
        ></div>

        {/* Car Details */}
        <div className="p-6 space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Color */}
            <div className="flex items-center">
              <PaletteIcon className="w-5 h-5 mr-2 text-blue-500" />
              <span>Color: {carDetails.colour}</span>
            </div>

            {/* Seats */}
            <div className="flex items-center">
              <Users className="w-5 h-5 mr-2 text-purple-500" />
              <span>Seats: {carDetails.totalSeats}</span>
            </div>

            {/* Location */}
            <div className="flex items-center">
              <MapPin className="w-5 h-5 mr-2 text-green-500" />
              <span>Location: {carDetails.city}, {carDetails.state}</span>
            </div>

            {/* Price */}
            <div className="flex items-center">
              <DollarSign className="w-5 h-5 mr-2 text-green-500" />
              <span>Price: ₹{carDetails.pricePerDay}/day</span>
            </div>

            {/* Available Status */}
            <div className="flex items-center">
              {carDetails.availableStatus ? (
                <>
                  <CheckCircle2 className="w-5 h-5 mr-2 text-green-500" />
                  <span>Available from: {carDetails.availableDate}</span>
                </>
              ) : (
                <>
                  <XCircle className="w-5 h-5 mr-2 text-red-500" />
                  <span>Currently Booked</span>
                </>
              )}
            </div>

            {/* License Plate */}
            <div className="flex items-center">
              <CalendarIcon className="w-5 h-5 mr-2 text-blue-500" />
              <span>License Plate: {carDetails.licensePlate}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CarDetailsPage;