import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import LandingPage from './pages/LandingPage';
import LoginRegisterPage from './pages/LoginRegisterPage';
import Dashboard from './pages/Dashboard';
import MakeReservation from './pages/MakeReservation';
import ManageReservation from './pages/ManageReservation';
import SettingsPage from './pages/SettingsPage';
import CarDetailsPage from './pages/CarDetailsPage';

const App = () => {
  const location = useLocation();

  return (
    <div className="flex flex-col min-h-screen">
      {location.pathname !== '/login' && <Navbar />}
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<LoginRegisterPage />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/make-reservation" element={<MakeReservation />} />
          <Route path="/manage-reservation" element={<ManageReservation />} />
          <Route path="/settings" element={<SettingsPage />} />
          <Route path="/car/:carId" element={<CarDetailsPage />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
};

const AppWrapper = () => (
  <Router>
    <App />
  </Router>
);

export default AppWrapper;