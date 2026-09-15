import { useState } from 'react';
import { UserHome } from './UserHome';
import { FoodSearchResults } from './FoodSearchResults';
import { RestaurantProfile } from './RestaurantProfile';
import { UserBookings } from './UserBookings';
import { UserProfile } from './UserProfile';
import { BookingConfirmation } from './BookingConfirmation';
import { AuthModal } from './AuthModal';
import { PaymentModal } from './PaymentModal';
import { EnhancedBookingModal } from './EnhancedBookingModal';
import { Restaurant, Booking } from '../../types';
import { Toaster } from '../ui/sonner';

import { useAuthStore } from '../../store/useAuthStore';
import { useNavigate } from 'react-router-dom';
import { ShieldCheck, Store, LogOut } from 'lucide-react';

export type UserView = 'home' | 'search' | 'restaurant' | 'bookings' | 'profile' | 'confirmation';

export function UserPortal() {
  const [currentView, setCurrentView] = useState<UserView>('home');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRestaurant, setSelectedRestaurant] = useState<Restaurant | null>(null);
  const [currentBooking, setCurrentBooking] = useState<Booking | null>(null);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [showBookingModal, setShowBookingModal] = useState(false);

  const { user, isAuthenticated, login: storeLogin, logout: storeLogout } = useAuthStore();
  const navigate = useNavigate();

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    setCurrentView('search');
  };

  const handleSelectRestaurant = (restaurant: Restaurant) => {
    setSelectedRestaurant(restaurant);
    setCurrentView('restaurant');
  };

  const handleBookingClick = (restaurant: Restaurant) => {
    if (!isAuthenticated) {
      setShowAuthModal(true);
      setSelectedRestaurant(restaurant);
      return;
    }
    setSelectedRestaurant(restaurant);
    setShowBookingModal(true);
  };

  const handleBookingComplete = (booking: Booking) => {
    setCurrentBooking(booking);
    setShowBookingModal(false);
    setShowPaymentModal(true);
  };

  const handlePaymentSuccess = () => {
    setShowPaymentModal(false);
    setCurrentView('confirmation');
  };

  const handleAuthSuccess = (userData: { id: string; name: string; email: string }) => {
    storeLogin({ id: userData.id, name: userData.name, email: userData.email, role: 'user' });
    setShowAuthModal(false);
    if (selectedRestaurant) {
      setShowBookingModal(true);
    }
  };

  return (
    <div className="min-h-screen">
      <Toaster position="top-center" richColors />

      {/* Role Banner if logged in as Admin or Restaurant Manager */}
      {isAuthenticated && user && (user.role === 'admin' || user.role === 'restaurant') && (
        <div className="bg-gradient-to-r from-black via-[#1c1917] to-black border-b border-[#d4af37]/30 py-2 px-4 text-xs flex items-center justify-between z-50 sticky top-0 backdrop-blur-md">
          <div className="flex items-center gap-2 text-gray-200">
            {user.role === 'admin' ? (
              <ShieldCheck className="w-4 h-4 text-amber-400" />
            ) : (
              <Store className="w-4 h-4 text-blue-400" />
            )}
            <span>
              Active Session: <strong className="text-white">{user.name}</strong> ({user.role.toUpperCase()})
            </span>
          </div>
          <div className="flex items-center gap-2 sm:gap-3">
            <button
              onClick={() => navigate(user.role === 'admin' ? '/admin' : '/restaurant')}
              className="px-3 py-1 rounded bg-[#d4af37] text-black font-semibold hover:bg-[#b8860b] transition-colors flex items-center gap-1.5"
            >
              <span>Open {user.role === 'admin' ? 'Admin' : 'Operator'} Portal</span>
              <span>&rarr;</span>
            </button>
            <button
              onClick={() => navigate('/login')}
              className="px-2.5 py-1 rounded border border-white/20 text-gray-300 hover:text-white hover:border-white/40 transition-colors"
            >
              Switch Role
            </button>
            <button
              onClick={() => storeLogout()}
              className="p-1 text-gray-400 hover:text-red-400 transition-colors"
              title="Sign Out"
            >
              <LogOut className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      )}
      
      {currentView === 'home' && (
        <UserHome 
          onSearch={handleSearch}
          onSelectRestaurant={handleSelectRestaurant}
          onNavigate={setCurrentView}
          onAuthClick={() => setShowAuthModal(true)}
          isAuthenticated={isAuthenticated}
        />
      )}
      
      {currentView === 'search' && (
        <FoodSearchResults 
          searchQuery={searchQuery}
          onSelectRestaurant={handleSelectRestaurant}
          onBack={() => setCurrentView('home')}
        />
      )}
      
      {currentView === 'restaurant' && selectedRestaurant && (
        <RestaurantProfile 
          restaurant={selectedRestaurant}
          onBack={() => setCurrentView('search')}
          onBookingComplete={handleBookingComplete}
          onBookingClick={() => handleBookingClick(selectedRestaurant)}
        />
      )}
      
      {currentView === 'bookings' && (
        <UserBookings 
          onBack={() => setCurrentView('home')}
        />
      )}
      
      {currentView === 'profile' && user && (
        <UserProfile 
          onBack={() => setCurrentView('home')}
          user={user}
        />
      )}
      
      {currentView === 'confirmation' && currentBooking && (
        <BookingConfirmation 
          booking={currentBooking}
          onBack={() => setCurrentView('home')}
        />
      )}

      {/* Modals */}
      {showAuthModal && (
        <AuthModal 
          onClose={() => setShowAuthModal(false)}
          onAuthSuccess={handleAuthSuccess}
        />
      )}

      {showBookingModal && selectedRestaurant && (
        <EnhancedBookingModal 
          restaurant={selectedRestaurant}
          onClose={() => setShowBookingModal(false)}
          onComplete={handleBookingComplete}
        />
      )}

      {showPaymentModal && currentBooking && (
        <PaymentModal 
          booking={currentBooking}
          onClose={() => setShowPaymentModal(false)}
          onPaymentSuccess={handlePaymentSuccess}
        />
      )}
    </div>
  );
}