import React from 'react';
import { Link } from 'react-router-dom';
import {
  Car,
  Gauge,
  Fuel,
  Users,
  ArrowRight,
  Snowflake
} from 'lucide-react';

const CarCard = ({
  id,
  name,
  imageUrl,
  pricePerDay,
  transmission,
  seats,
  type,
  fuelType
}) => {
  return (
    <div className="w-full max-w-md mx-auto transform transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl rounded-2xl overflow-hidden bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 shadow-lg">
      {/* Image Section with Gradient Overlay */}
      <div className="relative h-64">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/40 z-10 pointer-events-none"></div>
        <img
          src={imageUrl}
          alt={name}
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute top-4 right-4 z-20 bg-white/80 dark:bg-gray-900/80 rounded-full px-3 py-1 text-xs font-medium text-gray-700 dark:text-gray-200 shadow-md">
          {type}
        </div>
      </div>

      {/* Card Content */}
      <div className="p-6 space-y-4">
        {/* Title and Rating */}
        <div className="flex justify-between items-center">
          <h3 className="text-2xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400">
            {name}
          </h3>
          <div className="flex items-center space-x-1 text-yellow-500">
            {[...Array(5)].map((_, i) => (
              <svg
                key={i} 
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className={`w-5 h-5 ${i < 4 ? 'text-yellow-500' : 'text-gray-300'}`}
              >
                <path
                  fillRule="evenodd"
                  d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.007z" 
                  clipRule="evenodd"
                />
              </svg>
            ))}
            <span className="text-gray-600 dark:text-gray-400 ml-2 text-sm">(4.0)</span>
          </div>
        </div>

        {/* Car Details Grid */}
        <div className="grid grid-cols-2 gap-4 text-gray-600 dark:text-gray-300 bg-gray-50 dark:bg-gray-800 p-4 rounded-xl">
          <div className="flex items-center space-x-3">
            <Gauge className="w-6 h-6 text-blue-500 flex-shrink-0" />
            <div>
              <span className="text-sm font-medium block">Transmission</span>
              <span className="text-xs text-gray-500">{transmission}</span>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <Users className="w-6 h-6 text-blue-500 flex-shrink-0" />
            <div>
              <span className="text-sm font-medium block">Capacity</span>
              <span className="text-xs text-gray-500">{seats} Seats</span>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <Fuel className="w-6 h-6 text-blue-500 flex-shrink-0" />
            <div>
              <span className="text-sm font-medium block">Fuel Type</span>
              <span className="text-xs text-gray-500">{fuelType}</span>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <Snowflake className="w-6 h-6 text-blue-500 flex-shrink-0" />
            <div>
              <span className="text-sm font-medium block">Climate</span>
              <span className="text-xs text-gray-500">Air Conditioned</span>
            </div>
          </div>
        </div>

        {/* Pricing and CTA */}
        <div className="flex justify-between items-center pt-4 border-t border-gray-200 dark:border-gray-700">
          <div>
            <div className="text-3xl font-bold text-gray-900 dark:text-gray-100">
              ${pricePerDay}
              <span className="text-sm text-gray-600 dark:text-gray-400 ml-1">/ day</span>
            </div>
            <div className="text-xs text-green-600 dark:text-green-400 mt-1">
              Free cancellation
            </div>
          </div>
          <Link
            to={`/car/${id}`}
            className="group/link flex items-center space-x-2 px-6 py-3.5 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-full shadow-lg hover:shadow-xl transition-all hover:scale-105 active:scale-95"
          >
            <span className="font-semibold">Rent Now</span>
            <ArrowRight className="w-5 h-5 transform transition-transform group-hover/link:translate-x-1" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CarCard;