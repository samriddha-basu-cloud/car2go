import React, { useState, useEffect } from 'react';
import { Edit2, Save, Trash2, LogOut, Bell, MapPin } from 'lucide-react';

const SettingsPage = () => {
  const [editMode, setEditMode] = useState(false);
  const [userDetails, setUserDetails] = useState({
    name: '',
    email: '',
    phoneNumber: '',
    password: '',
  });
  const [permissions, setPermissions] = useState({
    emailNotifications: true,
    smsNotifications: false,
    locationAccess: true,
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [confirmationModal, setConfirmationModal] = useState({
    isOpen: false,
    action: null,
    message: '',
  });

  const fetchUserData = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem('token');
      const email = localStorage.getItem('email');

      const response = await fetch(
        `https://localhost:7273/api/User/get-user?email=${encodeURIComponent(email)}`,
        {
          method: 'GET',
          headers: {
            Accept: 'text/plain',
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }

      const data = await response.json();
      setUserDetails({
        name: `${data.firstName} ${data.lastName}`,
        email: data.email,
        phoneNumber: data.phoneNumber,
        password: data.password,
      });
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  const handleEditToggle = () => {
    if (editMode) {
      setConfirmationModal({
        isOpen: true,
        action: handleSave,
        message: 'Are you sure you want to save these changes?',
      });
    } else {
      setEditMode(true);
    }
  };

  const handleSave = () => {
    alert('Details updated successfully!');
    setEditMode(false);
    closeModal();
  };

  const handleDeleteAccount = () => {
    setConfirmationModal({
      isOpen: true,
      action: () => {
        alert('Account deleted. This action is irreversible.');
        closeModal();
      },
      message: 'Are you sure you want to delete your account? This action cannot be undone.',
    });
  };

  const handleLogOut = () => {
    setConfirmationModal({
      isOpen: true,
      action: () => {
        alert('You have been logged out.');
        closeModal();
      },
      message: 'Are you sure you want to log out?',
    });
  };

  const handlePermissionChange = (permission) => {
    setPermissions((prev) => ({
      ...prev,
      [permission]: !prev[permission],
    }));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserDetails((prev) => ({ ...prev, [name]: value }));
  };

  const closeModal = () => {
    setConfirmationModal({ isOpen: false, action: null, message: '' });
  };

  if (loading) {
    return <p className="text-center text-gray-700">Loading...</p>;
  }

  if (error) {
    return <p className="text-center text-red-600">Error: {error}</p>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 py-12 px-6">
      {/* Header */}
      <div className="mt-14 text-center mb-12">
        <h1 className="text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400 mb-4">
          Settings
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-300">
          Manage your preferences, account, and personal details.
        </p>
      </div>

      {/* Settings Sections */}
      <div className="max-w-4xl mx-auto space-y-10">
        {/* Personal Details */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-200">Personal Details</h2>
            <button
              onClick={handleEditToggle}
              className="bg-blue-500 text-white px-4 py-2 rounded-full flex items-center space-x-2 hover:bg-blue-600 transition-all"
            >
              {editMode ? <Save className="w-5 h-5" /> : <Edit2 className="w-5 h-5" />}
              <span>{editMode ? 'Save' : 'Edit'}</span>
            </button>
          </div>
          <div className="space-y-4">
            {['name', 'email', 'phoneNumber', 'password'].map((field) => (
              <div key={field} className="flex items-center space-x-4">
                <label
                  className="text-gray-600 dark:text-gray-400 w-36 capitalize"
                  htmlFor={field}
                >
                  {field === 'phoneNumber'
                    ? 'Phone'
                    : field === 'password'
                    ? 'Password'
                    : field}
                  :
                </label>
                {editMode ? (
                  <input
                    id={field}
                    type={field === 'password' ? 'password' : 'text'}
                    name={field}
                    value={userDetails[field]}
                    onChange={handleChange}
                    className="w-full bg-gray-50 dark:bg-gray-700 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 dark:text-gray-200"
                  />
                ) : (
                  <p className="text-gray-800 dark:text-gray-200">
                    {field === 'password' ? '********' : userDetails[field]}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Permissions */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-200">Permissions</h2>
          </div>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <div className="flex items-center space-x-4">
                <Bell className="w-6 h-6 text-blue-500" />
                <span className="text-gray-800 dark:text-gray-200">Email Notifications</span>
              </div>
              <input
                type="checkbox"
                checked={permissions.emailNotifications}
                onChange={() => handlePermissionChange('emailNotifications')}
                className="toggle-checkbox"
              />
            </div>
            <div className="flex justify-between items-center">
              <div className="flex items-center space-x-4">
                <Bell className="w-6 h-6 text-green-500" />
                <span className="text-gray-800 dark:text-gray-200">SMS Notifications</span>
              </div>
              <input
                type="checkbox"
                checked={permissions.smsNotifications}
                onChange={() => handlePermissionChange('smsNotifications')}
                className="toggle-checkbox"
              />
            </div>
            <div className="flex justify-between items-center">
              <div className="flex items-center space-x-4">
                <MapPin className="w-6 h-6 text-purple-500" />
                <span className="text-gray-800 dark:text-gray-200">Location Access</span>
              </div>
              <input
                type="checkbox"
                checked={permissions.locationAccess}
                onChange={() => handlePermissionChange('locationAccess')}
                className="toggle-checkbox"
              />
            </div>
          </div>
        </div>

        {/* Account Settings */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-200">Account Settings</h2>
          </div>
          <div className="flex justify-between">
            <button
              onClick={handleDeleteAccount}
              className="bg-red-500 text-white px-6 py-2 rounded-full flex items-center space-x-2 hover:bg-red-600 transition-all"
            >
              <Trash2 className="w-5 h-5" />
              <span>Delete Account</span>
            </button>
            <button
              onClick={handleLogOut}
              className="bg-gray-500 text-white px-6 py-2 rounded-full flex items-center space-x-2 hover:bg-gray-600 transition-all"
            >
              <LogOut className="w-5 h-5" />
              <span>Log Out</span>
            </button>
          </div>
        </div>
      </div>

      {/* Confirmation Modal */}
      {confirmationModal.isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 max-w-md w-full">
            <h2 className="text-xl font-bold text-gray-800 dark:text-gray-200 mb-4">Confirmation</h2>
            <p className="text-gray-600 dark:text-gray-300 mb-6">{confirmationModal.message}</p>
            <div className="flex justify-end space-x-4">
              <button
                onClick={closeModal}
                className="px-4 py-2 bg-gray-300 dark:bg-gray-700 text-gray-800 dark:text-gray-300 rounded-full hover:bg-gray-400 dark:hover:bg-gray-600 transition-all"
              >
                Cancel
              </button>
              <button
                onClick={confirmationModal.action}
                className="px-4 py-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition-all"
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SettingsPage;