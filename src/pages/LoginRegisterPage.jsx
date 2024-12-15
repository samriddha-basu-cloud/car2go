import React, { useState } from 'react';

const LoginRegisterPage = () => {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center bg-cover bg-center"
      style={{ backgroundImage: "url('https://source.unsplash.com/1600x900/?car,rental')" }}
    >
      <div className="w-full max-w-md p-8 bg-white bg-opacity-90 dark:bg-gray-800 dark:bg-opacity-90 shadow-lg rounded-lg">
        <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-gray-100 mb-6">
          {isLogin ? 'Welcome Back!' : 'Join Us Today!'}
        </h2>
        <p className="text-center text-gray-600 dark:text-gray-400 mb-6">
          {isLogin ? 'Log in to your account to manage your bookings and rentals.' : 'Register to explore the best car rental deals!'}
        </p>
        <form className="space-y-4">
          <input
            type="text"
            placeholder="Username"
            className="w-full px-4 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
          <input
            type="password"
            placeholder="Password"
            className="w-full px-4 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
          {!isLogin && (
            <input
              type="email"
              placeholder="Email"
              className="w-full px-4 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          )}
          <button
            type="submit"
            className="w-full px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition duration-300"
          >
            {isLogin ? 'Log In' : 'Sign Up'}
          </button>
        </form>
        <button
          onClick={() => setIsLogin(!isLogin)}
          className="mt-4 w-full text-blue-500 hover:underline"
        >
          {isLogin ? 'Create an account' : 'Already have an account? Log In'}
        </button>
        <p className="text-center text-gray-500 dark:text-gray-400 mt-6 text-sm">
          &copy; {new Date().getFullYear()} Car Rental Co. All rights reserved.
        </p>
      </div>
    </div>
  );
};

export default LoginRegisterPage;
