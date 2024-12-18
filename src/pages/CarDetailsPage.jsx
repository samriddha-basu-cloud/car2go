import React, { useState } from 'react';
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
import { toast } from 'sonner';

const CarDetailsPage = () => {
  const location = useLocation();
  const { carDetails } = location.state || {};
  const [isReserving, setIsReserving] = useState(false);
  const [dropOffDate, setDropOffDate] = useState('');
  const [totalPrice, setTotalPrice] = useState(0);

  // Calculate days between two dates
  const calculateDaysBetween = (startDate, endDate) => {
    const start = new Date(startDate);
    const end = new Date(endDate);
    const timeDiff = Math.abs(end.getTime() - start.getTime());
    const dayDiff = Math.ceil(timeDiff / (1000 * 3600 * 24));
    return dayDiff;
  };

  // Handle drop-off date change
  const handleDropOffDateChange = (e) => {
    const selectedDropOffDate = e.target.value;
    setDropOffDate(selectedDropOffDate);

    // Calculate total days and price
    if (carDetails.availableDate && selectedDropOffDate) {
      const days = calculateDaysBetween(carDetails.availableDate, selectedDropOffDate);
      const price = days * carDetails.pricePerDay;
      setTotalPrice(price);
    }
  };

  const handleReserveCar = async () => {
    // Get details from local storage
    const email = localStorage.getItem('email');
    const token = localStorage.getItem('token');

    // Validate local storage items
    if (!email || !token) {
      toast.error('Please log in to reserve a car');
      return;
    }

    // Validate car details and dates
    if (!carDetails || !carDetails.licensePlate) {
      toast.error('Car details are missing');
      return;
    }

    if (!dropOffDate) {
      toast.error('Please select a drop-off date');
      return;
    }

    try {
      setIsReserving(true);
      const response = await fetch('https://localhost:7273/api/Reservation/reserve-car', {
        method: 'POST',
        headers: {
          'accept': '*/*',
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email,
          licensePlate: carDetails.licensePlate,
          pickUpDate: carDetails.availableDate,
          dropOffDate
        })
      });

      if (!response.ok) {
        const errorData = await response.text();
        throw new Error(errorData || 'Failed to reserve car');
      }

      const result = await response.json();
      toast.success('Car reserved successfully!');
    } catch (error) {
      console.error('Reservation error:', error);
      toast.error(error.message || 'An error occurred while reserving the car');
    } finally {
      setIsReserving(false);
    }
  };

  if (!carDetails) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-900 dark:to-black">
        <div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-2xl">
          <p className="text-gray-600 dark:text-gray-300 text-xl font-semibold">
            No car details available.
          </p>
        </div>
      </div>
    );
  }

  // Minimum drop-off date is the available date
  const minDropOffDate = carDetails.availableDate;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-900 dark:to-black p-4 md:p-8">
      <div className="mt-14 max-w-6xl mx-auto bg-white dark:bg-gray-800 rounded-3xl shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="p-6 bg-gradient-to-r from-blue-600 to-indigo-700 text-white">
          <Link 
            to="/dashboard" 
            className="flex items-center mb-4 hover:text-gray-200 transition-all duration-300 ease-in-out transform hover:-translate-x-1"
          >
            <ChevronLeft className="w-5 h-5 mr-2" /> 
            Back to Dashboard
          </Link>
          <div className="flex items-center justify-between">
            <h2 className="text-4xl font-extrabold tracking-tight">
              {carDetails.make} {carDetails.model}
            </h2>
            <div className="bg-white/20 px-4 py-2 rounded-lg backdrop-blur-sm">
              <span className="text-xl font-semibold">Year {carDetails.year}</span>
            </div>
          </div>
        </div>

        {/* Car Image and Details Container */}
        <div className="grid md:grid-cols-2 gap-8 p-8">
          {/* Car Image */}
          <div className="relative">
            <div
              className="h-96 bg-cover bg-center rounded-3xl shadow-2xl transform transition-all duration-500 hover:scale-105 hover:shadow-3xl"
              style={{
                backgroundImage: `url(${carDetails.imageUrl || '/default-car-image.jpg'})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center'
              }}
            >
              <div className="absolute inset-0 bg-black/10 rounded-3xl hover:bg-black/20 transition-all duration-300"></div>
            </div>
          </div>

          {/* Detailed Information */}
          <div className="space-y-6">
            {/* Car Details Card */}
            <div className="bg-gray-100 dark:bg-gray-700/50 p-6 rounded-3xl shadow-xl backdrop-blur-sm">
              <h3 className="text-2xl font-bold mb-4 flex items-center text-blue-800 dark:text-blue-300">
                <InfoIcon className="w-6 h-6 mr-3" />
                Car Details
              </h3>
              <div className="grid grid-cols-2 gap-4">
                {[
                  { icon: CarIcon, color: 'blue', label: 'Make', value: carDetails.make },
                  { icon: TagIcon, color: 'purple', label: 'Model', value: carDetails.model },
                  { icon: PaletteIcon, color: 'blue', label: 'Color', value: carDetails.colour },
                  { icon: Users, color: 'purple', label: 'Seats', value: carDetails.totalSeats },
                  { icon: CalendarIcon, color: 'blue', label: 'License Plate', value: carDetails.licensePlate },
                  { icon: DollarSign, color: 'green', label: 'Price', value: `₹${carDetails.pricePerDay}/day` }
                ].map(({ icon: Icon, color, label, value }) => (
                  <div key={label} className="flex items-center space-x-3">
                    <Icon className={`w-5 h-5 text-${color}-500`} />
                    <div>
                      <span className="text-gray-600 dark:text-gray-300 text-sm">{label}</span>
                      <p className="font-medium text-gray-900 dark:text-white">{value}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Availability and Location Card */}
            <div className="bg-gray-100 dark:bg-gray-700/50 p-6 rounded-3xl shadow-xl backdrop-blur-sm">
              <h3 className="text-2xl font-bold mb-4 flex items-center text-green-800 dark:text-green-300">
                <LocateIcon className="w-6 h-6 mr-3" />
                Availability & Location
              </h3>
              <div className="grid grid-cols-2 gap-4">
                {/* Available Status */}
                <div className="flex items-center space-x-3">
                  {carDetails.availableStatus ? (
                    <>
                      <CheckCircle2 className="w-5 h-5 text-green-500" />
                      <div>
                        <span className="text-gray-600 dark:text-gray-300 text-sm">Status</span>
                        <p className="font-medium text-green-700 dark:text-green-300">
                          Available from: {carDetails.availableDate}
                        </p>
                      </div>
                    </>
                  ) : (
                    <>
                      <XCircle className="w-5 h-5 text-red-500" />
                      <div>
                        <span className="text-gray-600 dark:text-gray-300 text-sm">Status</span>
                        <p className="font-medium text-red-700 dark:text-red-300">
                          Currently Booked
                        </p>
                      </div>
                    </>
                  )}
                </div>

                {/* Location Details */}
                {[
                  { icon: MapPin, color: 'green', label: 'Location', value: `${carDetails.city}, ${carDetails.state}` },
                  { icon: FlagIcon, color: 'blue', label: 'Country', value: carDetails.country },
                  { icon: LocateIcon, color: 'purple', label: 'Zip Code', value: carDetails.zipCode }
                ].map(({ icon: Icon, color, label, value }) => (
                  <div key={label} className="flex items-center space-x-3">
                    <Icon className={`w-5 h-5 text-${color}-500`} />
                    <div>
                      <span className="text-gray-600 dark:text-gray-300 text-sm">{label}</span>
                      <p className="font-medium text-gray-900 dark:text-white">{value}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Reserve Car Button */}
            {carDetails.availableStatus && (
              <div className="mt-6">
                <button
                  onClick={handleReserveCar}
                  disabled={isReserving}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-xl 
                    transition duration-300 ease-in-out transform hover:scale-105 
                    disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
                >
                  {isReserving ? (
                    <>
                      <span className="animate-spin mr-2">⏳</span>
                      Reserving...
                    </>
                  ) : (
                    'Reserve Car'
                  )}
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Description */}
        {carDetails.description && (
          <div className="p-8 bg-gray-100 dark:bg-gray-700/50 backdrop-blur-sm">
            <h3 className="text-2xl font-bold mb-4 flex items-center text-blue-800 dark:text-blue-300">
              <InfoIcon className="w-6 h-6 mr-3" />
              Car Description
            </h3>
            <p className="text-gray-700 dark:text-gray-200 leading-relaxed bg-white/50 dark:bg-gray-800/50 p-4 rounded-2xl">
              {carDetails.description}
            </p>
          </div>
        )}


       {/* Reservation Section */}
        {carDetails.availableStatus && (
          <div className="p-8 bg-gray-100 dark:bg-gray-700/50 backdrop-blur-sm">
            <h3 className="text-2xl font-bold mb-4 flex items-center text-blue-800 dark:text-blue-300">
              <CalendarIcon className="w-6 h-6 mr-3" />
              Reservation Details
            </h3>
            <div className="grid md:grid-cols-2 gap-6">
              {/* Pickup Date */}
              <div>
                <label className="block text-gray-700 dark:text-gray-300 mb-2">
                  Pickup Date
                </label>
                <input 
                  type="date" 
                  value={carDetails.availableDate}
                  disabled
                  className="w-full p-3 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg cursor-not-allowed"
                />
              </div>

              {/* Drop-off Date */}
              <div>
                <label className="block text-gray-700 dark:text-gray-300 mb-2">
                  Drop-off Date
                </label>
                <input 
                  type="date" 
                  value={dropOffDate}
                  min={minDropOffDate}
                  onChange={handleDropOffDateChange}
                  className="w-full p-3 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg"
                />
              </div>

              {/* Price Calculation */}
              {dropOffDate && (
                <div className="md:col-span-2 bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-700 dark:text-gray-300">
                      Days Booked: {calculateDaysBetween(carDetails.availableDate, dropOffDate)}
                    </span>
                    <span className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                      Total Price: ₹{totalPrice}
                    </span>
                  </div>
                </div>
              )}
            </div>

            {/* Reserve Car Button */}
            {dropOffDate && (
              <div className="mt-6">
                <button
                  onClick={handleReserveCar}
                  disabled={isReserving}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-xl 
                    transition duration-300 ease-in-out transform hover:scale-105 
                    disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
                >
                  {isReserving ? (
                    <>
                      <span className="animate-spin mr-2">⏳</span>
                      Reserving...
                    </>
                  ) : (
                    `Reserve Car - ₹${totalPrice}`
                  )}
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default CarDetailsPage;