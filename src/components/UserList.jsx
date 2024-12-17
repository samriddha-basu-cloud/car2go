import React, { useState } from 'react';
import { 
  Users, 
  Mail, 
  Phone, 
  MapPin, 
  Edit2, 
  Trash2 
} from 'lucide-react';

const UserList = () => {
  const [users, setUsers] = useState([
    {
      id: 1,
      name: "Mridul Mohanta",
      email: "mridulmohanta@example.com",
      phone: "+91 9876543210",
      city: "Indore",
      state: "Madhya Pradesh",
      status: "Active",
      totalBookings: 5,
      profileImage: "https://via.placeholder.com/150"
    },
    {
      id: 2,
      name: "John Doe",
      email: "john.doe@example.com",
      phone: "+91 8765432109",
      city: "Mumbai",
      state: "Maharashtra",
      status: "Inactive",
      totalBookings: 2,
      profileImage: "https://via.placeholder.com/150"
    },
    {
      id: 3,
      name: "Jane Smith",
      email: "jane.smith@example.com",
      phone: "+91 7654321098",
      city: "Delhi",
      state: "Delhi",
      status: "Active",
      totalBookings: 7,
      profileImage: "https://via.placeholder.com/150"
    }
  ]);

  const [searchQuery, setSearchQuery] = useState("");

  const filteredUsers = users.filter((user) =>
    Object.values(user)
      .some((value) =>
        String(value).toLowerCase().includes(searchQuery.toLowerCase())
      )
  );

  const getStatusStyles = (status) => {
    switch (status) {
      case 'Active':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300';
      case 'Inactive':
        return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300';
    }
  };

  const handleEditUser = (userId) => {
    alert(`Edit User: ${userId}`);
  };

  const handleDeleteUser = (userId) => {
    alert(`Delete User: ${userId}`);
  };

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
          placeholder="Search users by name, email, phone, city, or state..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full p-3 rounded-lg border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
        />
      </div>

      {/* User Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredUsers.map((user) => (
          <div 
            key={user.id} 
            className="bg-gray-50 dark:bg-gray-700 rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 overflow-hidden"
          >
            <div className="relative p-6">
              {/* Status Badge */}
              <div className={`absolute top-4 right-4 px-3 py-1 rounded-full text-xs font-semibold ${getStatusStyles(user.status)}`}>
                {user.status}
              </div>

              {/* User Profile */}
              <div className="flex items-center mb-4">
                <img 
                  src={user.profileImage} 
                  alt={user.name} 
                  className="w-16 h-16 rounded-full mr-4 object-cover border-4 border-white dark:border-gray-600"
                />
                <div>
                  <h3 className="text-xl font-bold text-gray-800 dark:text-white">
                    {user.name}
                  </h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {user.totalBookings} Bookings
                  </p>
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
                  <span>{user.phone}</span>
                </div>
                <div className="flex items-center">
                  <MapPin className="mr-3 text-red-500 w-5 h-5" />
                  <span>{user.city}, {user.state}</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex space-x-3">
                <button
                  onClick={() => handleEditUser(user.id)}
                  className="flex-1 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center justify-center transition-colors"
                >
                  <Edit2 className="mr-2 w-5 h-5" /> Edit
                </button>
                <button
                  onClick={() => handleDeleteUser(user.id)}
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