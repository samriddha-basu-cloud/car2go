import { Car, ShieldCheck, Star, MapPin, Globe, ChevronRight, Quote, Users } from 'lucide-react';
import { Link } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ReviewSubmission from '../components/ReviewSubmission';

const LandingPage = () => {
  const blogs = [
    {
      id: 1,
      title: 'Top 10 Electric Cars to Rent in 2024',
      description: 'Explore the best electric cars for your next rental adventure.',
      imageUrl: 'https://hips.hearstapps.com/hmg-prod/images/2025-tesla-model-s-1-672d42e172407.jpg?crop=0.465xw:0.466xh;0.285xw,0.361xh&resize=2048:*',
      date: 'March 10, 2024',
    },
    {
      id: 2,
      title: 'How to Choose the Perfect Car for Your Trip',
      description: 'Learn tips and tricks to pick the right car for any occasion.',
      imageUrl: 'https://stimg.cardekho.com/images/carexteriorimages/630x420/Mahindra-BE/6e/9263/1732689215786/front-left-side-47.jpg?tr=w-664',
      date: 'February 20, 2024',
    },
    {
      id: 3,
      title: '5 Road Trip Destinations with Rental Cars',
      description: 'Discover amazing destinations you can explore with a rental car.',
      imageUrl: 'https://cdni.autocarindia.com/Utils/ImageResizer.ashx?n=https://cdni.autocarindia.com/ExtraImages/20241111075122_14%20_2_.jpg&w=700&c=1',
      date: 'January 15, 2024',
    },
  ];

  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const fetchReviews = async () => {
    try {
      const response = await axios.get('https://localhost:7273/api/Review/get-all-Reviews', {
        headers: {
          'accept': 'text/plain',
          'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJNeWFwcF9Vc2VyX0lkIjoiMSIsImh0dHA6Ly9zY2hlbWFzLnhtbHNvYXAub3JnL3dzLzIwMDUvMDUvaWRlbnRpdHkvY2xhaW1zL25hbWVpZGVudGlmaWVyIjoiemFoYWJpeWFAZ21haWwuY29tIiwic3ViIjoiMSIsImh0dHA6Ly9zY2hlbWFzLm1pY3Jvc29mdC5jb20vd3MvMjAwOC8wNi9pZGVudGl0eS9jbGFpbXMvcm9sZSI6IkFkbWluIiwiZXhwIjoxNzM0Mjk4MTU0LCJpc3MiOiJodHRwczovL2xvY2FsaG9zdDo3MjczIiwiYXVkIjoiQXVkaWVuY2UifQ.AfJ9AEZ2_HsB0NTX7nBh2ktg3wi1K9XcLIJlesLRIfY'
        }
      });
      setReviews(response.data);
      setLoading(false);
    } catch (err) {
      console.error('Error fetching reviews:', err);
      setError('Failed to load reviews');
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReviews();
    const token = localStorage.getItem('token');
    setIsLoggedIn(!!token);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 relative overflow-hidden">
      {/* Background Decorative Elements */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden">
        <div className="absolute top-10 -left-20 w-96 h-96 bg-blue-100/20 dark:bg-blue-900/10 rounded-full blur-3xl animate-float"></div>
        <div className="absolute bottom-20 -right-20 w-96 h-96 bg-indigo-100/20 dark:bg-indigo-900/10 rounded-full blur-3xl animate-float-delayed"></div>
      </div>

      {/* Main Content */}
      <div className="mt-14 relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Hero Section */}
        <div className="text-center mb-16">
          {/* Added Hero Image */}
          <div className="mb-8 mx-auto max-w-4xl">
            <img 
              src="https://images.unsplash.com/photo-1539788816080-8bdd722d8c22?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" 
              alt="Car Rental Experience" 
              className="w-full h-[400px] object-cover rounded-3xl shadow-2xl"
            />
          </div>
          
          <h1 className="text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400 mb-4 animate-gradient-text">
            Welcome to Car2Go
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto mb-8">
            Your trusted platform for renting cars effortlessly. Discover the perfect car for every trip and make your journey unforgettable.
          </p>
          <Link 
            to={isLoggedIn ? "/dashboard" : "/login"}
            className="inline-flex mt-6 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-full px-6 py-3 items-center space-x-2 shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-1"
          >
            <Car className="w-5 h-5" />
            <span>{isLoggedIn ? "Start Exploring" : "Login"}</span>
          </Link>
        </div>

        {/* About Us Section */}
        <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-2xl p-10 mb-16 border border-gray-100 dark:border-gray-700">
          <h2 className="text-3xl font-bold text-gray-800 dark:text-gray-200 mb-6 text-center">
            About Car2Go
          </h2>
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-4 leading-relaxed">
                Car2Go is more than just a car rental service – we're your travel companion, dedicated to transforming your journey into an unforgettable experience. Founded with a passion for mobility and customer satisfaction, we offer a seamless, innovative approach to car rentals.
              </p>
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <ShieldCheck className="text-green-500 w-6 h-6" />
                  <span className="text-gray-700 dark:text-gray-300">Comprehensive Vehicle Inspection</span>
                </div>
                <div className="flex items-center space-x-3">
                  <MapPin className="text-blue-500 w-6 h-6" />
                  <span className="text-gray-700 dark:text-gray-300">Wide Range of Locations</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Globe className="text-indigo-500 w-6 h-6" />
                  <span className="text-gray-700 dark:text-gray-300">Nationwide and International Coverage</span>
                </div>
              </div>
            </div>
            <div>
              <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
                Our mission is to provide hassle-free, reliable, and affordable transportation solutions. Whether you're planning a weekend getaway, a business trip, or need a temporary vehicle, we've got you covered. With a diverse fleet of well-maintained vehicles, transparent pricing, and exceptional customer support, we ensure your travel experience is smooth, comfortable, and enjoyable.
              </p>
            </div>
          </div>
        </div>

       {/* Reviews Section */}
        <div className="mb-16 mt-16">
          <h2 className="text-3xl font-bold text-gray-800 dark:text-gray-200 text-center mb-8">
            What Our Customers Say
          </h2>
          {loading ? (
            <p className="text-center text-gray-600 dark:text-gray-300">Loading reviews...</p>
          ) : error ? (
            <p className="text-center text-red-600 dark:text-red-400">{error}</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {reviews.map((review) => (
                <div 
                  key={review.id}
                  className="bg-white dark:bg-gray-800 rounded-3xl p-6 shadow-lg hover:shadow-2xl transition-all transform hover:-translate-y-2 border border-gray-100 dark:border-gray-700 relative"
                >
                  <Quote className="absolute top-4 left-4 text-gray-200 dark:text-gray-700 w-12 h-12 transform rotate-180" />
                  <div className="flex flex-col items-center text-center">
                    {/* Review Text */}
                    <p className="text-gray-600 dark:text-gray-300 mb-4 italic z-10 relative min-h-[100px]">
                      "{review.reviewText}"
                    </p>
                    
                    {/* Rating Stars */}
                    <div className="flex mb-2">
                      {[...Array(review.rating)].map((_, i) => (
                        <Star key={i} className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                      ))}
                      {[...Array(5 - review.rating)].map((_, i) => (
                        <Star key={i} className="w-5 h-5 text-gray-300 dark:text-gray-600" />
                      ))}
                    </div>
                    
                    {/* Review Date */}
                    {/* <div className="text-sm text-gray-500 dark:text-gray-400 mt-2">
                      Reviewed on: {new Date(review.reviewCreatedAt).toLocaleDateString()}
                    </div> */}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Review Submission section */}
          <div className="mt-16">
            <ReviewSubmission />
          </div>
        </div>

        {/* Blog Section */}
        <div>
          <h2 className="text-3xl font-bold text-gray-800 dark:text-gray-200 text-center mb-8">
            Latest from Our Blog
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {blogs.map((blog) => (
              <div
                key={blog.id}
                className="bg-white dark:bg-gray-800 rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all transform hover:-translate-y-2 border border-gray-100 dark:border-gray-700"
              >
                <img
                  src={blog.imageUrl}
                  alt={blog.title}
                  className="w-full h-48 object-cover"
                />
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-800 dark:text-gray-200 mb-2">
                    {blog.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-4">
                    {blog.description}
                  </p>
                  <div className="flex justify-between items-center">
                    <p className="text-sm text-gray-500 dark:text-gray-400">{blog.date}</p>
                    <button className="text-blue-600 dark:text-blue-400 flex items-center hover:underline">
                      Read More <ChevronRight className="ml-2" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        
      </div>
    </div>
  );
};

export default LandingPage;