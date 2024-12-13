import React from 'react';
import { Car, ShieldCheck, Star, MapPin, Globe, ChevronRight, Quote, Users } from 'lucide-react';
import { Link } from 'react-router-dom';

const LandingPage = () => {
  const blogs = [
    {
      id: 1,
      title: 'Top 10 Electric Cars to Rent in 2024',
      description: 'Explore the best electric cars for your next rental adventure.',
      imageUrl: 'electric-cars.jpg',
      date: 'March 10, 2024',
    },
    {
      id: 2,
      title: 'How to Choose the Perfect Car for Your Trip',
      description: 'Learn tips and tricks to pick the right car for any occasion.',
      imageUrl: 'choose-car.jpg',
      date: 'February 20, 2024',
    },
    {
      id: 3,
      title: '5 Road Trip Destinations with Rental Cars',
      description: 'Discover amazing destinations you can explore with a rental car.',
      imageUrl: 'road-trip.jpg',
      date: 'January 15, 2024',
    },
  ];

  const reviews = [
    {
      id: 1,
      name: 'Emily Johnson',
      location: 'New York, NY',
      quote: 'Absolutely fantastic service! The car was clean, modern, and perfect for my business trip.',
      rating: 5,
    },
    {
      id: 2,
      name: 'Michael Chen',
      location: 'San Francisco, CA',
      quote: 'Smooth booking process and great customer support. Will definitely rent again!',
      rating: 5,
    },
    {
      id: 3,
      name: 'Sarah Rodriguez',
      location: 'Miami, FL',
      quote: 'Wide selection of cars and very competitive prices. Made my vacation so much easier!',
      rating: 4,
    },
  ];

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
          <h1 className="text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400 mb-4 animate-gradient-text">
            Welcome to Car2Go
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto mb-8">
            Your trusted platform for renting cars effortlessly. Discover the perfect car for every trip and make your journey unforgettable.
          </p>
          <Link 
            to="/dashboard"
            className="inline-flex mt-6 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-full px-6 py-3 items-center space-x-2 shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-1"
          >
            <Car className="w-5 h-5" />
            <span>Start Exploring</span>
          </Link>
        </div>

        {/* About Us Section */}
        <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-2xl p-10 mb-16 border border-gray-100 dark:border-gray-700">
          <h2 className="text-3xl font-bold text-gray-800 dark:text-gray-200 mb-4 text-center">
            About Us
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 text-center max-w-4xl mx-auto leading-relaxed">
            At Car Rental, we aim to provide the best car rental experience for our customers. With a wide range of vehicles, exceptional service, and competitive pricing, we're your go-to solution for all your car rental needs.
          </p>
        </div>

        {/* Why Choose Us Section */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-800 dark:text-gray-200 text-center mb-8">
            Why Choose Us
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { 
                icon: <ShieldCheck className="w-10 h-10 text-blue-500 mb-4 mx-auto" />,
                title: 'Reliable Service',
                description: 'Our customers trust us for dependable and efficient service every time.'
              },
              { 
                icon: <Star className="w-10 h-10 text-yellow-500 mb-4 mx-auto" />,
                title: 'Top-notch Cars',
                description: 'Choose from a wide selection of premium and well-maintained vehicles.'
              },
              { 
                icon: <MapPin className="w-10 h-10 text-green-500 mb-4 mx-auto" />,
                title: 'Multiple Locations',
                description: 'With locations across the globe, we are here wherever you need us.'
              }
            ].map((feature, index) => (
              <div 
                key={index}
                className="bg-white dark:bg-gray-800 rounded-3xl p-6 shadow-lg hover:shadow-2xl transition-all transform hover:-translate-y-2 border border-gray-100 dark:border-gray-700"
              >
                {feature.icon}
                <h3 className="text-xl font-bold text-gray-800 dark:text-gray-200 text-center mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 text-center">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Reviews Section */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-800 dark:text-gray-200 text-center mb-8">
            What Our Customers Say
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {reviews.map((review) => (
              <div 
                key={review.id}
                className="bg-white dark:bg-gray-800 rounded-3xl p-6 shadow-lg hover:shadow-2xl transition-all transform hover:-translate-y-2 border border-gray-100 dark:border-gray-700 relative"
              >
            <Quote className="absolute top-4 left-4 text-gray-200 dark:text-gray-700 w-12 h-12 transform rotate-180" />
                <div className="flex flex-col items-center text-center">
                  <p className="text-gray-600 dark:text-gray-300 mb-4 italic z-10 relative">
                    "{review.quote}"
                  </p>
                  <div className="flex mb-2">
                    {[...Array(review.rating)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                    ))}
                  </div>
                  <div>
                    <p className="font-bold text-gray-800 dark:text-gray-200">{review.name}</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">{review.location}</p>
                  </div>
                </div>
              </div>
            ))}
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