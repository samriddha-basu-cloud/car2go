import React, { useState, useEffect } from 'react';
import { Trash2, Edit2, Car, MapPin, Palette, CheckCircle, Clock, XCircle } from 'lucide-react';

const FloatingCircle = ({ size, top, left, delay, duration, color }) => {
  return (
    <div 
      className="absolute opacity-20 rounded-full blur-md animate-float"
      style={{
        width: `${size}px`,
        height: `${size}px`,
        top: `${top}%`, 
        left: `${left}%`,
        backgroundColor: color,
        animationDelay: `${delay}ms`,
        animationDuration: `${duration}ms`
      }}
    />
  );
};

const ManageReservation = () => {
  const [reservations, setReservations] = useState([]);
  const [deleteConfirmation, setDeleteConfirmation] = useState(null); // Stores reservation to be confirmed for deletion
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  // Fetch reservations on component mount
  useEffect(() => {
    const fetchReservations = async () => {
      try {
        const userEmail = localStorage.getItem('email'); // Fetch email from localStorage
        if (!userEmail) {
          throw new Error('User email not found in localStorage');
        }

        const response = await fetch(
          `https://localhost:7273/api/Reservation/get-reservation-history-of-user?email=${encodeURIComponent(userEmail)}`,
          {
            method: 'GET',
            headers: {
              accept: 'text/plain',
            },
          }
        );

        if (!response.ok) {
          throw new Error('Failed to fetch reservations');
        }

        const data = await response.json();
        setReservations(data); // Set reservations to state
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false); // Set loading to false
      }
    };

    fetchReservations();
  }, []);

  const handleDelete = async (licensePlate) => {
    const userEmail = localStorage.getItem('email'); // Fetch email from localStorage
    if (!userEmail) {
      console.error('User email not found in localStorage');
      return;
    }

    try {
      // Call the Cancel API
      const response = await fetch(
        `https://localhost:7273/api/Reservation/Cancel?email=${encodeURIComponent(userEmail)}&licensePlate=${encodeURIComponent(licensePlate)}`,
        {
          method: 'POST',
          headers: {
            accept: '*/*',
          },
          body: '', // The body is empty as specified
        }
      );

      if (!response.ok) {
        throw new Error('Failed to cancel the reservation');
      }

      // Update the reservation status in the UI
      setReservations((prevReservations) =>
        prevReservations.map((reservation) =>
          reservation.carNumber === licensePlate
            ? { ...reservation, reservationStatus: 'Cancelled' }
            : reservation
        )
      );

      setDeleteConfirmation(null); // Close the delete confirmation dialog
    } catch (error) {
      console.error('Error canceling the reservation:', error);
    }
  };

  const filteredReservations = reservations.filter(reservation => 
    reservation.carMake.toLowerCase().includes(searchTerm.toLowerCase()) ||
    reservation.carModel.toLowerCase().includes(searchTerm.toLowerCase()) ||
    reservation.city.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusDisplay = (status) => {
    switch(status) {
      case 'Confirmed':
        return {
          icon: <CheckCircle className="mr-2" size={24} />,
          text: 'Confirmed',
          className: 'text-green-600 dark:text-green-400',
        };
      case 'Cancelled':
        return {
          icon: <XCircle className="mr-2" size={24} />,
          text: 'Cancelled',
          className: 'text-red-600 dark:text-red-400',
        };
      default:
        return null;
    }
  };

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 overflow-hidden">
      {/* Floating Circles Background */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Floating circles */}
      </div>

      <div className="mt-14 relative z-10 container mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400 mb-4">
            Your Reservations
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            View, update, and manage your vehicle reservations with ease.
          </p>
        </div>

        {/* Loading State */}
        {isLoading ? (
          <div className="text-center text-gray-500">Loading reservations...</div>
        ) : (
          <>
            {/* Search Input */}
            <div className="mb-8 max-w-xl mx-auto">
              <div className="relative">
                <input 
                  type="text" 
                  placeholder="Search reservations..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="
                    w-full px-4 py-3 pl-10 
                    border border-gray-300 dark:border-gray-600 
                    rounded-full 
                    bg-white dark:bg-gray-800 
                    text-gray-900 dark:text-gray-100
                    focus:ring-2 focus:ring-blue-500 
                    transition-all duration-300
                  "
                />
              </div>
            </div>

            {/* Reservations Container */}
            <div className="space-y-6">
              {filteredReservations.length === 0 ? (
                <div className="bg-white dark:bg-gray-800 shadow-lg rounded-2xl p-8 text-center">
                  <p className="text-gray-600 dark:text-gray-300 mb-4">
                    No reservations found matching your search.
                  </p>
                </div>
              ) : (
                filteredReservations.map((reservation) => {
                  const statusDisplay = getStatusDisplay(reservation.reservationStatus);
                  return (
                    <div 
                      key={reservation.carNumber}
                      className="
                        bg-white dark:bg-gray-800 
                        shadow-lg rounded-2xl 
                        overflow-hidden 
                        transform transition-all 
                        duration-300 hover:scale-[1.02]
                        relative animate-slide-in-left
                      "
                    >
                      {statusDisplay && (
                        <div className={`absolute top-4 right-4 flex items-center ${statusDisplay.className}`}>
                          {statusDisplay.icon}
                          <span className="font-semibold">{statusDisplay.text}</span>
                        </div>
                      )}
                      <div className="p-6 flex flex-col md:flex-row justify-between items-center">
                        <div className="flex items-center space-x-6 mb-4 md:mb-0">
                          <div className="bg-blue-100 dark:bg-blue-900 p-4 rounded-full">
                            <Car className="text-blue-600 dark:text-blue-400" size={32} />
                          </div>
                          <div>
                            <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100 flex items-center">
                              {reservation.carMake} {reservation.carModel}
                            </h2>
                            <div className="mt-2 space-y-1">
                              <div className="flex items-center text-gray-600 dark:text-gray-400">
                                <Palette className="mr-2 text-blue-500" size={16} />
                                Color: {reservation.colour}
                              </div>
                              <div className="flex items-center text-gray-600 dark:text-gray-400">
                                <MapPin className="mr-2 text-blue-500" size={16} />
                                Location: {reservation.city}, {reservation.state}
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="flex space-x-4">
                          {/* <button
                            onClick={() => alert(`Update reservation with ID: ${reservation.carNumber}`)}
                            className="
                              flex items-center 
                              px-4 py-2 
                              bg-yellow-500 hover:bg-yellow-600 
                              text-white 
                              rounded-full 
                              transition-all duration-300 
                              transform hover:scale-105
                            "
                          >
                            <Edit2 className="mr-2" size={16} />
                            Update
                          </button> */}
                          <button
                            onClick={() => setDeleteConfirmation(reservation)}
                            className="
                              flex items-center 
                              px-4 py-2 
                              bg-red-500 hover:bg-red-600 
                              text-white 
                              rounded-full 
                              transition-all duration-300 
                              transform hover:scale-105
                            "
                          >
                            <Trash2 className="mr-2" size={16} />
                            Cancel
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          </>
        )}

        {/* Delete Confirmation Dialog */}
        {deleteConfirmation && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg text-center">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-4">
                Are you sure you want to cancel this reservation?
              </h3>
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                {deleteConfirmation.carMake} {deleteConfirmation.carModel}, License Plate: {deleteConfirmation.carNumber}
              </p>
              <div className="flex justify-center space-x-4">
                <button
                  onClick={() => handleDelete(deleteConfirmation.carNumber)}
                  className="
                    px-4 py-2 
                    bg-red-500 hover:bg-red-600 
                    text-white rounded-full 
                    transition-all duration-300 
                    transform hover:scale-105
                  "
                >
                  Confirm
                </button>
                <button
                  onClick={() => setDeleteConfirmation(null)}
                  className="
                    px-4 py-2 
                    bg-gray-500 hover:bg-gray-600 
                    text-white rounded-full 
                    transition-all duration-300 
                    transform hover:scale-105
                  "
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ManageReservation;