import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { ArrowLeft, Car, MapPin, PaletteIcon, DollarSign, Users, CheckCircle2, XCircle, CalendarIcon } from 'lucide-react';

const CarDetailsPage = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // Access car details passed via state
  const { carDetails } = location.state || {};
  
  // If carDetails is missing, redirect back to dashboard
  if (!carDetails) {
    navigate('/');
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-200">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-500 to-indigo-600 py-4 px-6 flex items-center text-white">
        <button onClick={() => navigate(-1)} className="flex items-center hover:opacity-80">
          <ArrowLeft className="w-6 h-6 mr-2" />
          Back
        </button>
        <h1 className="text-2xl font-bold mx-auto">{carDetails.make} {carDetails.model} - {carDetails.year}</h1>
      </div>

      {/* Main Car Details */}
      <div className="max-w-4xl mx-auto mt-8 bg-white dark:bg-gray-800 shadow-lg rounded-lg overflow-hidden">
        {/* Car Image */}
        <div 
          className="h-64 bg-cover bg-center" 
          style={{ backgroundImage: `url(${carDetails.imageUrl || '/default-car-image.jpg'})` }} 
        />

        {/* Car Information */}
        <div className="p-6">
          <div className="space-y-4">
            {/* Basic Info */}
            <h2 className="text-2xl font-bold">{carDetails.make} {carDetails.model} ({carDetails.year})</h2>
            <p className="text-gray-600 dark:text-gray-400">License Plate: {carDetails.licensePlate}</p>

            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-center">
                <PaletteIcon className="w-5 h-5 mr-2 text-blue-500" />
                <span>Colour: {carDetails.colour}</span>
              </div>
              <div className="flex items-center">
                <Users className="w-5 h-5 mr-2 text-purple-500" />
                <span>Seats: {carDetails.totalSeats}</span>
              </div>
              <div className="flex items-center">
                <DollarSign className="w-5 h-5 mr-2 text-green-500" />
                <span>Price Per Day: ₹{carDetails.pricePerDay}</span>
              </div>
              <div className="flex items-center">
                <MapPin className="w-5 h-5 mr-2 text-green-500" />
                <span>Location: {carDetails.city}, {carDetails.state}</span>
              </div>
              <div className="flex items-center">
                <CalendarIcon className="w-5 h-5 mr-2 text-indigo-500" />
                <span>Available Date: {carDetails.availableDate}</span>
              </div>
              <div className="flex items-center">
                {carDetails.availableStatus ? (
                  <>
                    <CheckCircle2 className="w-5 h-5 mr-2 text-green-500" />
                    <span className="text-green-600">Available</span>
                  </>
                ) : (
                  <>
                    <XCircle className="w-5 h-5 mr-2 text-red-500" />
                    <span className="text-red-600">Not Available</span>
                  </>
                )}
              </div>
            </div>

            {/* Description */}
            <p className="mt-4 text-gray-600 dark:text-gray-400">
              {carDetails.description || "No additional description provided for this car."}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CarDetailsPage;