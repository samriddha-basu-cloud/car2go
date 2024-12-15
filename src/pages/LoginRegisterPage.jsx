import React, { useState } from 'react';
import { 
  LogIn, 
  UserPlus, 
  Mail, 
  Lock, 
  User,
  Phone,
  FileType,
} from 'lucide-react';


const LoginRegisterPage = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    // Login form
    email: '',
    password: '',
    
    // Register form
    firstName: '',
    lastName: '',
    phoneNumber: '',
    roleType: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: Implement login/registration logic
    console.log(formData);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 relative overflow-hidden">
      {/* Background Decorative Elements */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden">
        <div className="absolute top-10 -left-20 w-96 h-96 bg-blue-100/20 dark:bg-blue-900/10 rounded-full blur-3xl animate-float"></div>
        <div className="absolute bottom-20 -right-20 w-96 h-96 bg-indigo-100/20 dark:bg-indigo-900/10 rounded-full blur-3xl animate-float-delayed"></div>
        
        <div 
          className="absolute inset-0 opacity-5 dark:opacity-5 pointer-events-none"
          style={{
            backgroundImage: 'linear-gradient(to right, rgba(0,0,0,0.03) 1px, transparent 1px), linear-gradient(to bottom, rgba(0,0,0,0.03) 1px, transparent 1px)',
            backgroundSize: '30px 30px'
          }}
        ></div>
      </div>

      {/* Main Content */}
      <div className="min-h-screen flex items-center justify-center relative z-10 px-4 sm:px-6 mt-12 lg:px-8 py-12">
        <div className="w-full max-w-md bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-8 relative overflow-hidden animate-slide-in-up">
          {/* Subtle Gradient Overlay */}
          <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-blue-500 to-indigo-600"></div>
          
          {/* Form Header */}
          <div className="text-center mb-8">
            <h1 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400 mb-2 animate-slide-in-left">
              {isLogin ? 'Welcome Back' : 'Get Started'}
            </h1>
            <p className="text-gray-600 dark:text-gray-300 text-lg animate-slide-in-left">
              {isLogin 
                ? 'Log in to access your car rental dashboard' 
                : 'Create an account to explore amazing rides'}
            </p>
          </div>

          {/* Login/Register Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {isLogin ? (
              // Login Form
              <>
                {/* Email Input */}
                <div className="flex items-center space-x-3 bg-gray-50 dark:bg-gray-700 p-3 rounded-xl animate-slide-in-up">
                  <Mail className="w-6 h-6 text-blue-500" />
                  <input 
                    type="email" 
                    name="email"
                    placeholder="Email" 
                    value={formData.email}
                    onChange={handleInputChange}
                    className="bg-transparent w-full focus:outline-none text-gray-700 dark:text-gray-200"
                    required
                  />
                </div>

                {/* Password Input */}
                <div className="flex items-center space-x-3 bg-gray-50 dark:bg-gray-700 p-3 rounded-xl animate-slide-in-up">
                  <Lock className="w-6 h-6 text-green-500" />
                  <input 
                    type="password" 
                    name="password"
                    placeholder="Password" 
                    value={formData.password}
                    onChange={handleInputChange}
                    className="bg-transparent w-full focus:outline-none text-gray-700 dark:text-gray-200"
                    required
                  />
                </div>
              </>
            ) : (
              // Register Form
              <>
                {/* First Name Input */}
                <div className="flex items-center space-x-3 bg-gray-50 dark:bg-gray-700 p-3 rounded-xl animate-slide-in-up">
                  <User className="w-6 h-6 text-purple-500" />
                  <input 
                    type="text" 
                    name="firstName"
                    placeholder="First Name" 
                    value={formData.firstName}
                    onChange={handleInputChange}
                    className="bg-transparent w-full focus:outline-none text-gray-700 dark:text-gray-200"
                    required
                  />
                </div>

                {/* Last Name Input */}
                <div className="flex items-center space-x-3 bg-gray-50 dark:bg-gray-700 p-3 rounded-xl animate-slide-in-up">
                  <User className="w-6 h-6 text-purple-500" />
                  <input 
                    type="text" 
                    name="lastName"
                    placeholder="Last Name" 
                    value={formData.lastName}
                    onChange={handleInputChange}
                    className="bg-transparent w-full focus:outline-none text-gray-700 dark:text-gray-200"
                    required
                  />
                </div>

                {/* Email Input */}
                <div className="flex items-center space-x-3 bg-gray-50 dark:bg-gray-700 p-3 rounded-xl animate-slide-in-up">
                  <Mail className="w-6 h-6 text-blue-500" />
                  <input 
                    type="email" 
                    name="email"
                    placeholder="Email" 
                    value={formData.email}
                    onChange={handleInputChange}
                    className="bg-transparent w-full focus:outline-none text-gray-700 dark:text-gray-200"
                    required
                  />
                </div>

                {/* Password Input */}
                <div className="flex items-center space-x-3 bg-gray-50 dark:bg-gray-700 p-3 rounded-xl animate-slide-in-up">
                  <Lock className="w-6 h-6 text-green-500" />
                  <input 
                    type="password" 
                    name="password"
                    placeholder="Password" 
                    value={formData.password}
                    onChange={handleInputChange}
                    className="bg-transparent w-full focus:outline-none text-gray-700 dark:text-gray-200"
                    required
                  />
                </div>

                {/* Phone Number Input */}
                <div className="flex items-center space-x-3 bg-gray-50 dark:bg-gray-700 p-3 rounded-xl animate-slide-in-up">
                  <Phone className="w-6 h-6 text-teal-500" />
                  <input 
                    type="tel" 
                    name="phoneNumber"
                    placeholder="Phone Number" 
                    value={formData.phoneNumber}
                    onChange={handleInputChange}
                    className="bg-transparent w-full focus:outline-none text-gray-700 dark:text-gray-200"
                    required
                  />
                </div>

                {/* Role Type Dropdown */}
                <div className="flex items-center space-x-3 bg-gray-50 dark:bg-gray-700 p-3 rounded-xl animate-slide-in-up">
                  <FileType className="w-6 h-6 text-orange-500" />
                  <select 
                    name="roleType"
                    value={formData.roleType}
                    onChange={handleInputChange}
                    className="bg-transparent w-full focus:outline-none text-gray-700 dark:text-gray-200"
                    required
                  >
                    <option value="">Select Role Type</option>
                    <option value="customer">Customer</option>
                    <option value="agent">Agent</option>
                  </select>
                </div>
              </>
            )}

            {/* Submit Button */}
            <button 
              type="submit" 
              className="w-full bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-xl px-6 py-3 flex items-center justify-center space-x-2 shadow-lg hover:shadow-xl transition-all animate-slide-in-up"
            >
              {isLogin ? <LogIn className="mr-2" /> : <UserPlus className="mr-2" />}
              {isLogin ? 'Log In' : 'Sign Up'}
            </button>
          </form>

          {/* Toggle Between Login/Register */}
          <div className="text-center mt-6">
            <button 
              onClick={() => setIsLogin(!isLogin)}
              className="text-blue-600 dark:text-blue-400 hover:underline animate-slide-in-up"
            >
              {isLogin 
                ? 'Create a new account' 
                : 'Already have an account? Log In'}
            </button>
          </div>

          {/* Copyright */}
          <p className="text-center text-gray-500 dark:text-gray-400 mt-8 text-sm animate-slide-in-up">
            &copy; {new Date().getFullYear()} Car Rental Co. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginRegisterPage;