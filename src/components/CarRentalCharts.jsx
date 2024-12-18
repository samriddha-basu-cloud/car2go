import React, { useState, useEffect } from 'react';
import { 
  BarChart, Bar, PieChart, Pie, LineChart, Line, 
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, Cell, ResponsiveContainer 
} from 'recharts';
import { BarChart as BarIcon, PieChart as PieIcon, LineChart as LineIcon } from 'lucide-react';

const CarRentalCharts = () => {
  const [chartType1, setChartType1] = useState('bar');
  const [chartType2, setChartType2] = useState('pie');
  const [carData, setCarData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCarData = async () => {
      try {
        // Retrieve the token from local storage
        const token = localStorage.getItem('token');
        
        if (!token) {
          throw new Error('No authentication token found');
        }

        const response = await fetch('https://localhost:7273/api/Car/get-all-cars', {
          method: 'GET',
          headers: {
            'accept': 'text/plain',
            'Authorization': `Bearer ${token}`
          }
        });

        if (!response.ok) {
          throw new Error('Failed to fetch cars');
        }

        const cars = await response.json();

        // Process car data for charts
        const rentalStatusData = processCarRentalStatus(cars);
        const userRentalData = processUserRentalActivity(cars);

        setCarData(rentalStatusData);
        setIsLoading(false);
      } catch (err) {
        console.error('Error fetching car data:', err);
        setError(err.message);
        setIsLoading(false);
      }
    };

    fetchCarData();
  }, []);

  // Process car data to get rental status
  const processCarRentalStatus = (cars) => {
    const totalCars = cars.length;
    const rentedCars = cars.filter(car => car.availableStatus === false).length;
    const availableCars = totalCars - rentedCars;

    return [
      { name: 'Rented', value: rentedCars, total: totalCars },
      { name: 'Available', value: availableCars, total: totalCars }
    ];
  };

  // Process user rental activity (simplified)
  const processUserRentalActivity = (cars) => {
    const uniqueUsers = new Set(cars.map(car => car.userEmail)).size;
    const activeUsers = cars.filter(car => car.availableStatus === false).length;
    const inactiveUsers = uniqueUsers - activeUsers;

    return [
      { name: 'Active Users', value: activeUsers, total: uniqueUsers },
      { name: 'Inactive Users', value: inactiveUsers, total: uniqueUsers }
    ];
  };

  // Professional color palette
  const COLORS = ['#3B82F6', '#10B981', '#F43F5E', '#8B5CF6'];

  // Chart type options
  const chartTypes = [
    { type: 'bar', icon: BarIcon },
    { type: 'pie', icon: PieIcon },
    { type: 'line', icon: LineIcon }
  ];

  // Render dynamic chart based on type
  const renderChart = (data, title, chartType, setChartType) => {
    // If data is not available, show a placeholder
    if (!data || data.length === 0) {
      return (
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 flex items-center justify-center">
          <p className="text-gray-500 dark:text-gray-300">No data available</p>
        </div>
      );
    }

    return (
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden">
        {/* Chart Type Selector */}
        <div className="flex justify-center py-3 border-b border-gray-200 dark:border-gray-700">
          <div className="inline-flex bg-gray-100 dark:bg-gray-700 rounded-full p-1 space-x-1">
            {chartTypes.map((type) => (
              <button
                key={type.type}
                onClick={() => setChartType(type.type)}
                className={`p-2 rounded-full transition-colors duration-200 ${
                  chartType === type.type 
                    ? 'bg-blue-500 text-white' 
                    : 'text-gray-500 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                }`}
              >
                <type.icon className="w-5 h-5" />
              </button>
            ))}
          </div>
        </div>

        {/* Chart Title */}
        <h3 className="text-center text-lg font-semibold text-gray-800 dark:text-gray-200 pt-4">
          {title}
        </h3>

        {/* Responsive Chart Container */}
        <ResponsiveContainer width="100%" height={300}>
          {chartType === 'bar' ? (
            <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
              <XAxis dataKey="name" axisLine={false} tickLine={false} />
              <YAxis 
                domain={[0, (dataMax) => Math.max(...data.map(d => d.total))]} 
                axisLine={false} 
                tickLine={false} 
              />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: '#fff', 
                  borderRadius: '12px', 
                  boxShadow: '0 4px 6px rgba(0,0,0,0.1)' 
                }} 
              />
              <Bar dataKey="value" fill="#3B82F6" radius={[10, 10, 0, 0]}>
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Bar>
            </BarChart>
          ) : chartType === 'pie' ? (
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                labelLine={false}
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
              >
                {data.map((entry, index) => (
                  <Cell 
                    key={`cell-${index}`} 
                    fill={COLORS[index % COLORS.length]} 
                  />
                ))}
              </Pie>
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: '#fff', 
                  borderRadius: '12px', 
                  boxShadow: '0 4px 6px rgba(0,0,0,0.1)' 
                }} 
              />
              <Legend 
                layout="horizontal" 
                verticalAlign="bottom" 
                align="center"
                iconType="circle"
              />
            </PieChart>
          ) : (
            <LineChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
              <XAxis dataKey="name" axisLine={false} tickLine={false} />
              <YAxis 
                domain={[0, (dataMax) => Math.max(...data.map(d => d.total))]} 
                axisLine={false} 
                tickLine={false} 
              />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: '#fff', 
                  borderRadius: '12px', 
                  boxShadow: '0 4px 6px rgba(0,0,0,0.1)' 
                }} 
              />
              <Line 
                type="monotone" 
                dataKey="value" 
                stroke="#3B82F6" 
                strokeWidth={3}
                dot={{ r: 6, strokeWidth: 2, fill: '#fff' }}
                activeDot={{ r: 8, stroke: '#3B82F6', strokeWidth: 2, fill: '#fff' }}
              />
            </LineChart>
          )}
        </ResponsiveContainer>
      </div>
    );
  };

  // Loading state
  if (isLoading) {
    return (
      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 flex items-center justify-center">
          <p className="text-gray-500 dark:text-gray-300">Loading car data...</p>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 flex items-center justify-center">
          <p className="text-gray-500 dark:text-gray-300">Loading car data...</p>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 flex items-center justify-center">
          <p className="text-red-500">Error: {error}</p>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 flex items-center justify-center">
          <p className="text-red-500">Error: {error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="grid md:grid-cols-2 gap-6">
      {renderChart(carData, 'Car Rental Status', chartType1, setChartType1)}
      {renderChart(carData, 'User Rental Activity', chartType2, setChartType2)}
    </div>
  );
};

export default CarRentalCharts;