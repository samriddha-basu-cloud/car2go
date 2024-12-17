import React, { useState, useEffect } from 'react';
import { useParams, Link, useLocation } from 'react-router-dom';
import { 
  Calendar, 
  MapPin, 
  Palette, 
  Car, 
  DollarSign, 
  ChevronLeft, 
  ShieldCheck,
  Clock,
  Star,
  ArrowRight
} from 'lucide-react';

const CarDetailsPage = () => {
  const { carId } = useParams();
  const location = useLocation();
  const [carDetails, setCarDetails] = useState(null);
  const [selectedDates, setSelectedDates] = useState({
    pickupDate: '',
    dropoffDate: ''
  });
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    // Check if car details are passed through navigation state
    if (location.state && location.state.carDetails) {
      setCarDetails(location.state.carDetails);
    } else {
      // Fallback to fetching car details if no state is passed
      const fetchCarDetails = async () => {
        try {
          const response = await fetch(`https://localhost:7273/api/Car/get-car-by-license-plate?licensePlate=${carId}`, {
            method: 'GET',
            headers: {
              'accept': 'text/plain',
              'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
          });

          if (!response.ok) {
            throw new Error('Failed to fetch car details');
          }

          const data = await response.json();
          setCarDetails(data);
        } catch (error) {
          console.error('Error fetching car details:', error);
        }
      };

      fetchCarDetails();
    }
  }, [carId, location.state]);

  // Calculate total price based on selected dates
  useEffect(() => {
    if (selectedDates.pickupDate && selectedDates.dropoffDate) {
      const pickupDate = new Date(selectedDates.pickupDate);
      const dropoffDate = new Date(selectedDates.dropoffDate);
      const days = Math.ceil((dropoffDate - pickupDate) / (1000 * 60 * 60 * 24));
      setTotalPrice(days * carDetails.pricePerDay);
    }
  }, [selectedDates, carDetails]);

  if (!carDetails) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900">
        <div className="text-center">
          <div className="animate-spin w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-300">Loading car details...</p>
        </div>
      </div>
    );
  }

  return (
  <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 py-12 px-4">
    <div className="max-w-6xl mx-auto">
      {/* Navigation */}
      <Link 
        to="/dashboard" 
        className="inline-flex items-center text-gray-600 dark:text-gray-300 hover:text-blue-600 mb-6"
      >
        <ChevronLeft className="mr-2" /> Back to Dashboard
      </Link>

      {carDetails ? (
        <>
          <div className="grid md:grid-cols-2 gap-8 bg-white dark:bg-gray-800 rounded-2xl shadow-2xl overflow-hidden">
            {/* Car Image Section */}
            <div className="relative">
              <img
                src={carDetails.imageUrl || '/default-car-image.jpg'}
                alt={`${carDetails.make} ${carDetails.model}`}
                className="w-full h-full object-cover"
              />
              <div className="absolute top-4 right-4 bg-white/80 dark:bg-gray-900/80 rounded-full px-4 py-2 text-sm font-medium">
                {carDetails.year} Model
              </div>
            </div>

            {/* Car Details Section */}
            <div className="p-8 space-y-6">
              <div className="flex justify-between items-center">
                <h1 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400">
                  {carDetails.make} {carDetails.model}
                </h1>
                <div className="flex items-center space-x-1 text-yellow-500">
                  {[...Array(5)].map((_, i) => (
                    <Star 
                      key={i} 
                      className={`w-6 h-6 ${i < 4 ? 'text-yellow-500' : 'text-gray-300'}`} 
                    />
                  ))}
                  <span className="text-gray-600 dark:text-gray-400 ml-2 text-sm">(4.5)</span>
                </div>
              </div>

              {/* Description placeholder - you might want to add this to your car object */}
              <p className="text-gray-600 dark:text-gray-300">
                {carDetails.description || `Explore the ${carDetails.make} ${carDetails.model}, a remarkable vehicle designed for comfort and performance.`}
              </p>

              {/* Car Specifications */}
              <div className="grid grid-cols-2 gap-4 bg-gray-50 dark:bg-gray-700 p-4 rounded-xl">
                <div className="flex items-center space-x-3">
                  <Car className="w-6 h-6 text-blue-500" />
                  <div>
                    <span className="block text-sm font-medium">Model</span>
                    <span className="text-xs text-gray-500">{carDetails.model}</span>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <Palette className="w-6 h-6 text-blue-500" />
                  <div>
                    <span className="block text-sm font-medium">Color</span>
                    <span className="text-xs text-gray-500">{carDetails.colour}</span>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <MapPin className="w-6 h-6 text-blue-500" />
                  <div>
                    <span className="block text-sm font-medium">Location</span>
                    <span className="text-xs text-gray-500">{carDetails.city}, {carDetails.state}</span>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <DollarSign className="w-6 h-6 text-blue-500" />
                  <div>
                    <span className="block text-sm font-medium">Price</span>
                    <span className="text-xs text-gray-500">₹{carDetails.pricePerDay}/day</span>
                  </div>
                </div>
              </div>

              {/* Booking Section */}
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex items-center space-x-3 bg-gray-50 dark:bg-gray-700 p-3 rounded-xl">
                    <Calendar className="w-6 h-6 text-green-500" />
                    <input 
                      type="date" 
                      placeholder="Pick-up Date" 
                      className="bg-transparent w-full focus:outline-none text-gray-700 dark:text-gray-200"
                      value={selectedDates.pickupDate}
                      onChange={(e) => setSelectedDates({...selectedDates, pickupDate: e.target.value})}
                    />
                  </div>
                  <div className="flex items-center space-x-3 bg-gray-50 dark:bg-gray-700 p-3 rounded-xl">
                    <Calendar className="w-6 h-6 text-red-500" />
                    <input 
                      type="date" 
                      placeholder="Drop-off Date" 
                      className="bg-transparent w-full focus:outline-none text-gray-700 dark:text-gray-200"
                      value={selectedDates.dropoffDate}
                      onChange={(e) => setSelectedDates({...selectedDates, dropoffDate: e.target.value})}
                    />
                  </div>
                </div>

                {totalPrice > 0 && (
                  <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-xl flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <ShieldCheck className="w-8 h-8 text-green-600" />
                      <div>
                        <span className="block font-semibold text-green-800 dark:text-green-300">
                          Total Reservation Cost
                        </span>
                        <span className="text-sm text-green-700 dark:text-green-400">
                          {selectedDates.pickupDate} to {selectedDates.dropoffDate}
                        </span>
                      </div>
                    </div>
                    <div className="text-2xl font-bold text-green-800 dark:text-green-300">
                      ₹{totalPrice}
                    </div>
                  </div>
                )}

                <button className="w-full flex items-center justify-center space-x-2 px-6 py-4 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-full shadow-lg hover:shadow-xl transition-all">
                  <span>Book Now</span>
                  <ArrowRight className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>

          {/* Additional Sections */}
          <div className="mt-12 grid md:grid-cols-2 gap-8">
            {/* Features */}
            <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-md">
              <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-gray-200">
                Vehicle Details
              </h2>
              <ul className="space-y-2">
                {[
                  `License Plate: ${carDetails.licensePlate}`,
                  `Total Seats: ${carDetails.totalSeats}`,
                  `Available Status: ${carDetails.availableStatus ? 'Available' : 'Not Available'}`,
                  `Available Date: ${carDetails.availableDate}`
                ].map((detail, index) => (
                  <li 
                    key={index} 
                    className="flex items-center space-x-3 text-gray-600 dark:text-gray-300"
                  >
                    <ShieldCheck className="w-5 h-5 text-blue-500" />
                    <span>{detail}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Specifications */}
            <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-md">
              <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-gray-200">
                Additional Information
              </h2>
              <div className="grid grid-cols-2 gap-4">
                {[
                  { label: 'Make', value: carDetails.make },
                  { label: 'Model', value: carDetails.model },
                  { label: 'Year', value: carDetails.year },
                  { label: 'Color', value: carDetails.colour }
                ].map((item, index) => (
                  <div key={index} className="bg-gray-50 dark:bg-gray-700 p-3 rounded-xl">
                    <span className="block text-xs font-medium text-gray-500 capitalize">
                      {item.label}
                    </span>
                    <span className="text-sm font-semibold text-gray-800 dark:text-gray-200">
                      {item.value}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Reviews Section - You might want to add a reviews API or mock reviews */}
          <div className="mt-12 bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-md">
            <h2 className="text-2xl font-bold mb-6 text-gray-800 dark:text-gray-200">
              Customer Reviews
            </h2>
            <div className="text-center text-gray-600 dark:text-gray-300">
              No reviews available for this vehicle.
            </div>
          </div>
        </>
      ) : (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900">
          <div className="text-center">
            <div className="animate-spin w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full mx-auto mb-4"></div>
            <p className="text-gray-600 dark:text-gray-300">Loading car details...</p>
          </div>
        </div>
      )}
    </div>
  </div>
);
};

export default CarDetailsPage;