import React, { useState, useEffect } from 'react';
import { 
  BookOpen, 
  Calendar, 
  Car, 
  MapPin, 
  Edit2, 
  Trash2 
} from 'lucide-react';
import axios from 'axios';

const ReservationsList = () => {
  const [reservations, setReservations] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchReservations = async () => {
      try {
        // Get token from local storage
        const token = localStorage.getItem('token');
        
        if (!token) {
          throw new Error('No authorization token found');
        }

        const response = await axios.get('https://localhost:7273/api/Reservation/get-all-reservation-details', {
          headers: {
            'accept': 'text/plain',
            'Authorization': `Bearer ${token}`
          }
        });

        setReservations(response.data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchReservations();
  }, []);

  const filteredReservations = reservations.filter((reservation) =>
    Object.values(reservation)
      .some((value) =>
        String(value).toLowerCase().includes(searchQuery.toLowerCase())
      )
  );

  const getStatusStyles = (status) => {
    switch (status) {
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

  const handleEditReservation = (reservationDetails) => {
    alert(`Edit Reservation for: ${reservationDetails.firstName} ${reservationDetails.lastName}`);
  };

  const handleDeleteReservation = (reservationDetails) => {
    alert(`Delete Reservation for: ${reservationDetails.firstName} ${reservationDetails.lastName}`);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-full">
        <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
        {error}
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 mb-8">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800 dark:text-white flex items-center">
          <BookOpen className="mr-3 text-blue-500 w-6 h-6" /> 
          Reservation Management
        </h2>
        <div className="flex items-center space-x-2">
          <span className="text-gray-600 dark:text-gray-300">
            Total Reservations: {reservations.length}
          </span>
        </div>
      </div>

      {/* Search Bar */}
      <div className="mb-6">
        <input
          type="text"
          placeholder="Search reservations by name, car, status..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full p-3 rounded-lg border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
        />
      </div>

      {/* Reservation Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredReservations.map((reservation, index) => (
          <div 
            key={`${reservation.userEmail}-${index}`} 
            className="bg-gray-50 dark:bg-gray-700 rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 overflow-hidden"
          >
            <div className="relative p-6">
              {/* Status Badge */}
              <div className={`absolute top-4 right-4 px-3 py-1 rounded-full text-xs font-semibold ${getStatusStyles(reservation.reservationStatus)}`}>
                {reservation.reservationStatus}
              </div>

              {/* Car Image */}
              <div className="mb-4 h-48 overflow-hidden rounded-lg">
                <img 
                  src={reservation.imageUrl || '/api/placeholder/400/300'} 
                  alt={`${reservation.carMake} ${reservation.carModel}`} 
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Reservation Details */}
              <div className="space-y-3 mb-4 text-gray-700 dark:text-gray-300">
                <div className="flex items-center">
                  <Car className="mr-3 text-blue-500 w-5 h-5" />
                  <span className="font-semibold">{reservation.carMake} {reservation.carModel}</span>
                </div>
                <div className="flex items-center">
                  <Calendar className="mr-3 text-green-500 w-5 h-5" />
                  <span>
                    {reservation.pickUpDate} to {reservation.dropOffDate}
                  </span>
                </div>
                <div className="flex items-center">
                  <MapPin className="mr-3 text-red-500 w-5 h-5" />
                  <span>{reservation.city}, {reservation.state}</span>
                </div>
              </div>

              {/* User Info */}
              <div className="mb-4">
                <h3 className="text-xl font-bold text-gray-800 dark:text-white">
                  {reservation.firstName} {reservation.lastName}
                </h3>
                <p className="text-gray-600 dark:text-gray-400">{reservation.userEmail}</p>
              </div>

              {/* Additional Details */}
              <div className="mb-4 text-sm text-gray-600 dark:text-gray-400">
                <p>Car Number: {reservation.carNumber}</p>
                <p>Total Amount: ₹{reservation.totalAmount}</p>
              </div>

              {/* Action Buttons */}
              <div className="flex space-x-3">
                <button
                  onClick={() => handleEditReservation(reservation)}
                  className="flex-1 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center justify-center transition-colors"
                >
                  <Edit2 className="mr-2 w-5 h-5" /> Edit
                </button>
                <button
                  onClick={() => handleDeleteReservation(reservation)}
                  className="flex-1 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg flex items-center justify-center transition-colors"
                >
                  <Trash2 className="mr-2 w-5 h-5" /> Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ReservationsList;