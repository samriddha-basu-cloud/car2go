import React, { useState, useEffect } from 'react';
import { Trash2, Edit2, Car, MapPin, Palette, CheckCircle, Clock, XCircle } from 'lucide-react';
import axios from 'axios'; // Make sure to install axios: npm install axios

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
  const [deleteConfirmation, setDeleteConfirmation] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Floating circles configuration
  const floatingCircles = [
    { size: 100, top: 10, left: 5, delay: 0, duration: 15000, color: 'rgba(59, 130, 246, 0.2)' },
    { size: 150, top: 30, left: 80, delay: 1000, duration: 18000, color: 'rgba(79, 70, 229, 0.2)' },
    { size: 200, top: 60, left: 20, delay: 500, duration: 20000, color: 'rgba(99, 102, 241, 0.2)' },
    { size: 120, top: 80, left: 70, delay: 1500, duration: 16000, color: 'rgba(79, 130, 246, 0.2)' },
  ];

  useEffect(() => {
    // Fetch user email from local storage
    const userEmail = localStorage.getItem('userEmail');
    
    if (!userEmail) {
      setError('No user email found. Please log in.');
      setIsLoading(false);
      return;
    }

    // Fetch reservations from API
    const fetchReservations = async () => {
      try {
        const response = await axios.get(
          `https://localhost:7273/api/Reservation/get-reservation-history-of-user?email=${encodeURIComponent(userEmail)}`,
          {
            headers: {
              'accept': 'text/plain'
            }
          }
        );
        
        // Transform API response to match existing component structure
        const transformedReservations = response.data.map((reservation, index) => ({
          id: index + 1,
          make: reservation.carMake,
          model: reservation.carModel,
          color: reservation.colour,
          location: reservation.city,
          date: reservation.pickUpDate,
          status: reservation.reservationStatus.toLowerCase(),
          carNumber: reservation.carNumber,
          totalAmount: reservation.totalAmount,
          imageUrl: reservation.imageUrl
        }));

        setReservations(transformedReservations);
        setIsLoading(false);
      } catch (err) {
        console.error('Error fetching reservations:', err);
        setError('Failed to fetch reservations. Please try again later.');
        setIsLoading(false);
      }
    };

    fetchReservations();
  }, []);

  const handleUpdate = (id) => {
    alert(`Update reservation with ID: ${id}`);
    // Implement actual update logic
  };

  const handleDelete = async (id) => {
    try {
      // You would typically call a delete API endpoint here
      // For now, we'll just filter out the reservation locally
      setReservations(reservations.filter((reservation) => reservation.id !== id));
      setDeleteConfirmation(null);
    } catch (error) {
      console.error('Error deleting reservation:', error);
      alert('Failed to delete reservation');
    }
  };

  const filteredReservations = reservations.filter(reservation => 
    reservation.model.toLowerCase().includes(searchTerm.toLowerCase()) ||
    reservation.make.toLowerCase().includes(searchTerm.toLowerCase()) ||
    reservation.location.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusDisplay = (status) => {
    switch(status) {
      case 'completed':
        return {
          icon: <CheckCircle className="mr-2" size={24} />,
          text: 'Completed',
          className: 'text-green-600 dark:text-green-400'
        };
      case 'confirmed':
        return {
          icon: <Car className="mr-2" size={24} />,
          text: 'Confirmed',
          className: 'text-blue-600 dark:text-blue-400'
        };
      case 'pending':
        return {
          icon: <Clock className="mr-2" size={24} />,
          text: 'Pending',
          className: 'text-yellow-600 dark:text-yellow-400'
        };
      case 'cancelled':
        return {
          icon: <XCircle className="mr-2" size={24} />,
          text: 'Cancelled',
          className: 'text-red-600 dark:text-red-400'
        };
      default:
        return null;
    }
  };

  // Render loading state
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
        <div className="text-center">
          <div className="animate-spin w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-300">Loading reservations...</p>
        </div>
      </div>
    );
  }

  // Render error state
  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
        <div className="text-center bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-lg">
          <XCircle className="mx-auto mb-4 text-red-500" size={48} />
          <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4">Error</h2>
          <p className="text-gray-600 dark:text-gray-300">{error}</p>
        </div>
      </div>
    );
  }


  return (
    <div className="relative min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 overflow-hidden">
      {/* Floating Circles Background */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {floatingCircles.map((circle, index) => (
          <FloatingCircle 
            key={index}
            size={circle.size}
            top={circle.top}
            left={circle.left}
            delay={circle.delay}
            duration={circle.duration}
            color={circle.color}
          />
        ))}
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
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" 
              width="24" 
              height="24" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="2" 
              strokeLinecap="round" 
              strokeLinejoin="round"
            >
              <circle cx="11" cy="11" r="8"></circle>
              <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
            </svg>
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
              const statusDisplay = getStatusDisplay(reservation.status);
              return (
                <div 
                  key={reservation.id}
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
                          <span className="ml-2 text-sm bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-400 px-2 py-1 rounded-full mr-2">
                            {reservation.make}
                          </span>
                          {reservation.model}
                        </h2>
                        <div className="mt-2 space-y-1">
                          <div className="flex items-center text-gray-600 dark:text-gray-400">
                            <Palette className="mr-2 text-blue-500" size={16} />
                            Color: {reservation.color}
                          </div>
                          <div className="flex items-center text-gray-600 dark:text-gray-400">
                            <MapPin className="mr-2 text-blue-500" size={16} />
                            Location: {reservation.location}
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="flex space-x-4">
                      {reservation.status !== 'completed' && reservation.status !== 'cancelled' && (
                        <>
                          <button
                            onClick={() => handleUpdate(reservation.id)}
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
                          </button>
                          <button
                            onClick={() => setDeleteConfirmation(reservation.id)}
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
                            Delete
                          </button>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              )
            })
          )}
        </div>

        {/* Delete Confirmation Modal */}
        {deleteConfirmation !== null && (
          <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 max-w-md w-full">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4">
                Confirm Deletion
              </h2>
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                Are you sure you want to delete this reservation? This action cannot be undone.
              </p>
              <div className="flex justify-end space-x-4">
                <button
                  onClick={() => setDeleteConfirmation(null)}
                  className="
                    px-4 py-2 
                    bg-gray-200 dark:bg-gray-700 
                    text-gray-700 dark:text-gray-300 
                    rounded-full 
                    hover:bg-gray-300 dark:hover:bg-gray-600
                  "
                >
                  Cancel
                </button>
                <button
                  onClick={() => handleDelete(deleteConfirmation)}
                  className="
                    px-4 py-2 
                    bg-red-500 hover:bg-red-600 
                    text-white 
                    rounded-full
                  "
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Custom Animation Styles */}
      <style jsx>{`
        @keyframes float {
          0% { transform: translateY(0px); }
          50% { transform: translateY(20px); }
          100% { transform: translateY(0px); }
        }
        
        .animate-float {
          animation-name: float;
          animation-timing-function: ease-in-out;
          animation-iteration-count: infinite;
        }
      `}</style>
    </div>
  );
};

export default ManageReservation;