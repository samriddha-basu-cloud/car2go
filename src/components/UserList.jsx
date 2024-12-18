import React, { useState, useEffect } from 'react';
import { 
  Users, 
  Mail, 
  Phone, 
  MapPin, 
  Edit2, 
  Trash2 
} from 'lucide-react';
import axios from 'axios';

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        // Get token from local storage
        const token = localStorage.getItem('token');
        
        if (!token) {
          throw new Error('No authorization token found');
        }

        const response = await axios.get('https://localhost:7273/api/User/get-all-users', {
          headers: {
            'accept': 'text/plain',
            'Authorization': `Bearer ${token}`
          }
        });

        setUsers(response.data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const filteredUsers = users.filter((user) =>
    Object.values(user)
      .some((value) =>
        String(value).toLowerCase().includes(searchQuery.toLowerCase())
      )
  );

  const getRoleStyles = (roleTypes) => {
    const role = roleTypes[0]; // Assuming first role is primary
    switch (role) {
      case 'Admin':
        return 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300';
      case 'User':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300';
      case 'Agent':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300';
    }
  };

  const handleEditUser = (userEmail) => {
    alert(`Edit User: ${userEmail}`);
  };

  const handleDeleteUser = (userEmail) => {
    alert(`Delete User: ${userEmail}`);
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
          <Users className="mr-3 text-blue-500 w-6 h-6" /> 
          User Management
        </h2>
        <div className="flex items-center space-x-2">
          <span className="text-gray-600 dark:text-gray-300">
            Total Users: {users.length}
          </span>
        </div>
      </div>

      {/* Search Bar */}
      <div className="mb-6">
        <input
          type="text"
          placeholder="Search users by name, email, phone..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full p-3 rounded-lg border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
        />
      </div>

      {/* User Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredUsers.map((user) => (
          <div 
            key={user.email} 
            className="bg-gray-50 dark:bg-gray-700 rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 overflow-hidden"
          >
            <div className="relative p-6">
              {/* Role Badge */}
              <div className={`absolute top-4 right-4 px-3 py-1 rounded-full text-xs font-semibold ${getRoleStyles(user.roleType)}`}>
                {user.roleType[0]}
              </div>

              {/* User Profile */}
              <div className="flex items-center mb-4">
                <div className="w-16 h-16 rounded-full mr-4 bg-blue-200 flex items-center justify-center">
                  <span className="text-2xl font-bold text-blue-800">
                    {user.firstName[0]}{user.lastName[0]}
                  </span>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-800 dark:text-white">
                    {user.firstName} {user.lastName}
                  </h3>
                </div>
              </div>

              {/* User Details */}
              <div className="space-y-3 mb-4 text-gray-700 dark:text-gray-300">
                <div className="flex items-center">
                  <Mail className="mr-3 text-blue-500 w-5 h-5" />
                  <span>{user.email}</span>
                </div>
                <div className="flex items-center">
                  <Phone className="mr-3 text-green-500 w-5 h-5" />
                  <span>{user.phoneNumber}</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex space-x-3">
                <button
                  onClick={() => handleEditUser(user.email)}
                  className="flex-1 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center justify-center transition-colors"
                >
                  <Edit2 className="mr-2 w-5 h-5" /> Edit
                </button>
                <button
                  onClick={() => handleDeleteUser(user.email)}
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

export default UserList;