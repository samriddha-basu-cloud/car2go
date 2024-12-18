import React, { useState } from 'react';
import {
  MapPin,
  DollarSign,
  Users,
  CalendarIcon,
  TagIcon,
  CheckCircle2,
  XCircle,
  Edit2,
  Trash2,
  MoreVertical
} from 'lucide-react';

const CarList = ({ cars, onEditCar, onDeleteCar }) => {
  const [expandedCard, setExpandedCard] = useState(null);

  const getStatusStyles = (status) => {
    switch(status) {
      case 'Confirmed':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300';
      case 'Cancelled':
        return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300';
      case 'Pending':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300';
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {cars.map((car, index) => (
        <div 
          key={index} 
          className="relative bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 overflow-hidden"
        >
          {/* Image Section */}
          <div className="relative">
            <img
              src={car.imageUrl}
              alt={`${car.make} ${car.carModel}`}
              className="w-full h-56 object-cover transition-transform duration-300 hover:scale-105"
            />
            <div className={`absolute top-4 right-4 px-3 py-1 rounded-full text-xs font-semibold ${getStatusStyles(car.reservationStatus)}`}>
              {car.reservationStatus}
            </div>
          </div>

          {/* Car Details Section */}
          <div className="p-6">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-2xl font-bold text-gray-800 dark:text-white">
                  {car.make} {car.carModel}
                </h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {car.model} Model
                </p>
              </div>
              <div className="text-gray-500 dark:text-gray-400">
                <p className="text-sm">Car Number</p>
                <strong>{car.licensePlate}</strong>
              </div>
            </div>

            {/* Detailed Information Grid */}
            <div className="grid grid-cols-2 gap-3 mb-4 text-gray-700 dark:text-gray-300">
              <div className="flex items-center">
                <MapPin className="mr-2 text-blue-500 w-5 h-5" />
                <span>{car.city}, {car.state}</span>
              </div>
              <div className="flex items-center">
                <TagIcon className="mr-2 text-yellow-500 w-5 h-5" />
                <span>{car.colour}</span>
              </div>
              <div className="flex items-center">
                <Users className="mr-2 text-purple-500 w-5 h-5" />
                <span>{car.totalSeats} Seats</span>
              </div>
              <div className="flex items-center">
                <DollarSign className="mr-2 text-green-500 w-5 h-5" />
                <span>₹{car.pricePerDay}</span>
              </div>
              <div className="flex items-center">
                <CalendarIcon className="mr-2 text-indigo-500 w-5 h-5" />
                <span>Pickup: {car.pickUpDate}</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex space-x-3">
              <button
                onClick={() => onEditCar(car.carNumber)}
                className="flex-1 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center justify-center transition-colors"
              >
                <Edit2 className="mr-2 w-5 h-5" /> Edit
              </button>
              <button
                onClick={() => onDeleteCar(car.carNumber)}
                className="flex-1 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg flex items-center justify-center transition-colors"
              >
                <Trash2 className="mr-2 w-5 h-5" /> Delete
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CarList;