import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useAuthStore } from './store/useAuthStore';
import { UserPortal } from './components/user/UserPortal';
import { RestaurantPortal } from './components/restaurant/RestaurantPortal';
import { AdminPortal } from './components/admin/AdminPortal';
import { UserHome } from './components/user/UserHomeAnimated';
import Login from './pages/Login';

const ProtectedRoute = ({ children, allowedRoles }: { children: JSX.Element, allowedRoles: string[] }) => {
  const { user, isAuthenticated } = useAuthStore();

  if (!isAuthenticated || !user) {
    return <Navigate to="/login" replace />;
  }

  if (!allowedRoles.includes(user.role || '')) {
    // Redirect to their appropriate dashboard if they try to access wrong portal
    if (user.role === 'admin') return <Navigate to="/admin" replace />;
    if (user.role === 'restaurant') return <Navigate to="/restaurant" replace />;
    return <Navigate to="/" replace />;
  }

  return children;
};

export default function Router() {
  return (
    <HashRouter>
      <Routes>
        {/* Public Route */}
        <Route path="/login" element={<Login />} />
        
        {/* User Routes */}
        <Route path="/" element={<UserPortal />} />
        
        {/* Protected Restaurant Routes */}
        <Route 
          path="/restaurant/*" 
          element={
            <ProtectedRoute allowedRoles={['restaurant', 'admin']}>
              <RestaurantPortal />
            </ProtectedRoute>
          } 
        />

        {/* Protected Admin Routes */}
        <Route 
          path="/admin/*" 
          element={
            <ProtectedRoute allowedRoles={['admin']}>
              <AdminPortal />
            </ProtectedRoute>
          } 
        />

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </HashRouter>
  );
}
