import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
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
  const [carDetails, setCarDetails] = useState(null);
  const [selectedDates, setSelectedDates] = useState({
    pickupDate: '',
    dropoffDate: ''
  });
  const [totalPrice, setTotalPrice] = useState(0);

  // Simulated API call to fetch car details with more comprehensive data
  useEffect(() => {
    const fetchCarDetails = async () => {
      const mockCarDetails = {
        id: carId,
        name: 'Tesla Model S',
        make: 'Tesla',
        model: 'Model S',
        year: 2022,
        color: 'Midnight Silver',
        location: 'San Francisco, CA',
        pricePerDay: 150,
        description:
          'Experience the pinnacle of electric performance with the Tesla Model S. Combining cutting-edge technology, exceptional range, and luxurious design, this vehicle redefines modern driving.',
        imageUrl: 'tesla.jpg',
        features: [
          'Autopilot Capability',
          'Long Range Battery',
          'Premium Interior',
          'Quick Charging',
          'Advanced Safety Features'
        ],
        specifications: {
          transmission: 'Automatic',
          acceleration: '0-60 mph in 3.1 sec',
          topSpeed: '155 mph',
          range: '405 miles',
          seating: '5 passengers'
        },
        reviews: [
          { 
            name: 'John D.', 
            rating: 5, 
            comment: 'Incredible car! Smooth ride and amazing technology.' 
          },
          { 
            name: 'Sarah M.', 
            rating: 4, 
            comment: 'Love the electric performance and sleek design.' 
          }
        ]
      };

      setCarDetails(mockCarDetails);
    };

    fetchCarDetails();
  }, [carId]);

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

        <div className="grid md:grid-cols-2 gap-8 bg-white dark:bg-gray-800 rounded-2xl shadow-2xl overflow-hidden">
          {/* Car Image Section */}
          <div className="relative">
            <img
              src={carDetails.imageUrl}
              alt={carDetails.name}
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
                {carDetails.name}
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

            <p className="text-gray-600 dark:text-gray-300">{carDetails.description}</p>

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
                  <span className="text-xs text-gray-500">{carDetails.color}</span>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <MapPin className="w-6 h-6 text-blue-500" />
                <div>
                  <span className="block text-sm font-medium">Location</span>
                  <span className="text-xs text-gray-500">{carDetails.location}</span>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <DollarSign className="w-6 h-6 text-blue-500" />
                <div>
                  <span className="block text-sm font-medium">Price</span>
                  <span className="text-xs text-gray-500">${carDetails.pricePerDay}/day</span>
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
                    ${totalPrice}
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
              Key Features
            </h2>
            <ul className="space-y-2">
              {carDetails.features.map((feature, index) => (
                <li 
                  key={index} 
                  className="flex items-center space-x-3 text-gray-600 dark:text-gray-300"
                >
                  <ShieldCheck className="w-5 h-5 text-blue-500" />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Specifications */}
          <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-md">
            <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-gray-200">
              Technical Specifications
            </h2>
            <div className="grid grid-cols-2 gap-4">
              {Object.entries(carDetails.specifications).map(([key, value]) => (
                <div key={key} className="bg-gray-50 dark:bg-gray-700 p-3 rounded-xl">
                  <span className="block text-xs font-medium text-gray-500 capitalize">
                    {key.replace(/([A-Z])/g, ' $1')}
                  </span>
                  <span className="text-sm font-semibold text-gray-800 dark:text-gray-200">
                    {value}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Reviews Section */}
        <div className="mt-12 bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-md">
          <h2 className="text-2xl font-bold mb-6 text-gray-800 dark:text-gray-200">
            Customer Reviews
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            {carDetails.reviews.map((review, index) => (
              <div 
                key={index} 
                className="bg-gray-50 dark:bg-gray-700 p-6 rounded-xl space-y-3"
              >
                <div className="flex justify-between items-center">
                  <h3 className="font-semibold text-gray-800 dark:text-gray-200">
                    {review.name}
                  </h3>
                  <div className="flex text-yellow-500">
                    {[...Array(review.rating)].map((_, i) => (
                      <Star key={i} className="w-5 h-5" />
                    ))}
                  </div>
                </div>
                <p className="text-gray-600 dark:text-gray-300">
                  "{review.comment}"
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CarDetailsPage;