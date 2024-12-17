import React, { useState } from 'react';
import { 
  Car, 
  Users, 
  City, 
  Star, 
  ShieldCheck, 
  CreditCard, 
  Infinity, 
  MapPin, 
  UserPlus, 
  BuildingIcon
} from 'lucide-react';
import SearchCars from '../components/SearchCars';
import CarList from '../components/CarList';
import AddCarButton from '../components/AddCarButton';
import UserList from '../components/UserList';
import CarRentalCharts from '../components/CarRentalCharts';

const DashboardCard = ({ icon: Icon, title, value, className }) => (
  <div className={`bg-white dark:bg-gray-700 p-6 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 ${className}`}>
    <div className="flex items-center justify-between">
      <div>
        <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">{title}</h3>
        <p className="text-2xl font-bold text-gray-800 dark:text-white">{value}</p>
      </div>
      <Icon className="text-blue-500 w-10 h-10 opacity-70" />
    </div>
  </div>
);

const AdminDashboard = () => {
  const [cars, setCars] = useState([
    {
      reservationStatus: "Confirmed",
      pickUpDate: "2024-12-18",
      dropOffDate: "2024-12-19",
      userEmail: "mridulmohanta@example.com",
      carMake: "Honda",
      carModel: "City",
      carNumber: "MP09CP7235",
      colour: "White",
      modelYear: 2020,
      totalSeats: 5,
      totalAmount: 3000,
      imageUrl: "http://res.cloudinary.com/dhnatfkvb/image/upload/v1732706410/da229famd8vwpbc09lq9.jpg",
      city: "Indore",
      address: "711,Honda Showroom",
      state: "Madhya Pradesh",
      country: "India",
      zipCode: "452014"
    },
    {
      reservationStatus: "Pending",
      pickUpDate: "2024-12-20",
      dropOffDate: "2024-12-21",
      userEmail: "john@example.com",
      carMake: "Toyota",
      carModel: "Corolla",
      carNumber: "MH12AB1234",
      colour: "Blue",
      modelYear: 2019,
      totalSeats: 4,
      totalAmount: 3500,
      imageUrl: "https://via.placeholder.com/300",
      city: "Mumbai",
      address: "Toyota Plaza, Main Street",
      state: "Maharashtra",
      country: "India",
      zipCode: "400001"
    },
    {
      reservationStatus: "Cancelled",
      pickUpDate: "2024-12-22",
      dropOffDate: "2024-12-23",
      userEmail: "jane@example.com",
      carMake: "Maruti",
      carModel: "Swift",
      carNumber: "DL10XYZ9876",
      colour: "Red",
      modelYear: 2021,
      totalSeats: 5,
      totalAmount: 2500,
      imageUrl: "https://via.placeholder.com/300",
      city: "Delhi",
      address: "Maruti Showroom, Ring Road",
      state: "Delhi",
      country: "India",
      zipCode: "110001"
    }
    // Add other mock cars here
  ]);

  const [filters, setFilters] = useState({
    make: '',
    model: '',
    colour: '',
    city: '',
    state: ''
  });

  // Dashboard statistics
  const dashboardStats = {
    totalCars: cars.length,
    totalCities: [...new Set(cars.map(car => car.city))].length,
    totalBrands: [...new Set(cars.map(car => car.carMake))].length,
    rentedCars: cars.filter(car => car.reservationStatus === 'Confirmed').length,
    totalUsers: 3,
    totalAgents: 15
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFilters((prevFilters) => ({
      ...prevFilters,
      [name]: value
    }));
  };

  const handleSearch = () => alert('Search functionality here!');
  const handleAddCar = () => alert('Redirect to Add Car Page');
  const handleEditCar = (carNumber) => alert(`Edit Car: ${carNumber}`);
  const handleDeleteCar = (carNumber) => alert(`Delete Car: ${carNumber}`);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 p-8">
      <div className="mt-14 container mx-auto">
        {/* Dashboard Header */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 dark:text-white">
            Admin Dashboard
          </h1>
          <div className="flex items-center space-x-4">
            <ShieldCheck className="text-blue-500" />
            <span className="text-gray-600 dark:text-gray-300">Admin Panel</span>
          </div>
        </div>

        {/* Statistics Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
          <DashboardCard 
            icon={Car} 
            title="Total Cars" 
            value={dashboardStats.totalCars} 
          />
          <DashboardCard 
            icon={BuildingIcon} 
            title="Total Cities" 
            value={dashboardStats.totalCities} 
          />
          <DashboardCard 
            icon={Infinity} 
            title="Car Brands" 
            value={dashboardStats.totalBrands} 
          />
          <DashboardCard 
            icon={CreditCard} 
            title="Rented Cars" 
            value={dashboardStats.rentedCars} 
          />
          <DashboardCard 
            icon={Users} 
            title="Total Users" 
            value={dashboardStats.totalUsers} 
          />
          <DashboardCard 
            icon={UserPlus} 
            title="Total Agents" 
            value={dashboardStats.totalAgents} 
          />
        </div>

        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">
            Rental Analytics
          </h2>
          <CarRentalCharts />
        </div>

        {/* Search and Add Car Section */}
        <div className="mb-8">
          <SearchCars
            filters={filters}
            onInputChange={handleInputChange}
            onSearch={handleSearch}
          />
          <AddCarButton onAddCar={handleAddCar} />
        </div>

        {/* Car List Section */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-4 flex items-center">
            <Car className="mr-2 text-blue-500" /> Car Inventory
          </h2>
          <CarList
            cars={cars}
            onEditCar={handleEditCar}
            onDeleteCar={handleDeleteCar}
          />
        </div>

        {/* Car List Section */}
        <div className="mb-8 mt-14">
          <UserList />
        </div>

        {/* Reviews Section */}
        <div className="bg-white dark:bg-gray-700 rounded-xl shadow-md p-6 mt-14">
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-4 flex items-center">
            <Star className="mr-2 text-yellow-500" /> Recent Reviews
          </h2>
          <div className="grid md:grid-cols-3 gap-4">
            {[1, 2, 3].map((review, index) => (
              <div 
                key={index} 
                className="bg-gray-50 dark:bg-gray-600 p-4 rounded-lg"
              >
                <div className="flex items-center mb-2">
                  <img 
                    src={`/api/placeholder/40/40?text=${index + 1}`} 
                    alt={`User ${index + 1}`} 
                    className="w-10 h-10 rounded-full mr-3" 
                  />
                  <div>
                    <p className="font-semibold text-gray-800 dark:text-white">User {index + 1}</p>
                    <div className="flex text-yellow-500">
                      {[...Array(5)].map((_, i) => (
                        <Star 
                          key={i} 
                          className={`w-4 h-4 ${i < 4 ? 'fill-current' : 'text-gray-300'}`} 
                        />
                      ))}
                    </div>
                  </div>
                </div>
                <p className="text-gray-600 dark:text-gray-300">
                  Great service and smooth booking experience!
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;