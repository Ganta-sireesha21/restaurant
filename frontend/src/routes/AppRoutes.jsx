import { Routes, Route, Navigate } from 'react-router-dom';
import HomePage from '../pages/HomePage';
import RestaurantListPage from '../pages/RestaurantListPage';
import RestaurantDetailsPage from '../pages/RestaurantDetailsPage';
import MenuPage from '../pages/MenuPage';
import LoginPage from '../pages/LoginPage';
import SignupPage from '../pages/SignupPage';
import DashboardPage from '../pages/DashboardPage';
import ReservationHistoryPage from '../pages/ReservationHistoryPage';
import ProtectedRoute from '../components/ProtectedRoute';

const AppRoutes = () => (
  <Routes>
    <Route path="/" element={<HomePage />} />
    <Route path="/restaurants" element={<RestaurantListPage />} />
    <Route path="/restaurants/:id" element={<RestaurantDetailsPage />} />
    <Route path="/menu/:restaurantId" element={<MenuPage />} />
    <Route path="/login" element={<LoginPage />} />
    <Route path="/signup" element={<SignupPage />} />
    <Route path="/dashboard" element={<ProtectedRoute><DashboardPage /></ProtectedRoute>} />
    <Route path="/reservations" element={<ProtectedRoute><ReservationHistoryPage /></ProtectedRoute>} />
    <Route path="*" element={<Navigate to="/" replace />} />
  </Routes>
);

export default AppRoutes;
