import { useState, useEffect, useRef } from 'react';
import { Application } from '@splinetool/runtime';
import { Search, MapPin, Star, Calendar, User, History, Home, Compass, Tag, Heart, Bell, HelpCircle, X, Coffee, Sun, Sunset, Moon, Utensils, ChevronRight } from 'lucide-react';
import { mockRestaurants, mockMenuItems } from '../../data/mockData';
import { Restaurant } from '../../types';
import { UserView } from './UserPortal';
import { Footer } from './Footer';
import { motion, useScroll, useTransform } from 'motion/react';
import { ErrorBoundary } from '../ui/ErrorBoundary';

interface UserHomeProps {
  onSearch: (query: string) => void;
  onSelectRestaurant: (restaurant: Restaurant) => void;
  onNavigate: (view: UserView) => void;
  onAuthClick: () => void;
  isAuthenticated: boolean;
}

export function UserHome({ onSearch, onSelectRestaurant, onNavigate, onAuthClick, isAuthenticated }: UserHomeProps) {
  const [searchInput, setSearchInput] = useState('');
  const [searchMode, setSearchMode] = useState<'food' | 'restaurant'>('food');
  const [showNotifications, setShowNotifications] = useState(false);
  const [showHelp, setShowHelp] = useState(false);
  const [showOffers, setShowOffers] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  useEffect(() => {
    if (canvasRef.current) {
      const app = new Application(canvasRef.current);
      app.load('https://prod.spline.design/TS91-wcgqLHYx5Nd/scene.splinecode');
    }
  }, []);
  
  const categories = ['Biryani', 'Rice', 'Seafood', 'Main Course', 'Appetizers', 'Breads', 'Desserts', 'Drinks'];
  
  const popularFood = mockMenuItems.slice(0, 6);

  const notifications = [
    { id: 1, title: 'Booking Confirmed', message: 'Your reservation at Handi Restaurant is confirmed for Dec 8', time: '2h ago', unread: true },
    { id: 2, title: 'Special Offer', message: '25% off on your next booking at Spice Symphony', time: '5h ago', unread: true },
    { id: 3, title: 'Review Reminder', message: 'How was your experience at Mezban?', time: '1d ago', unread: false },
  ];

  const offers = [
    { id: 1, title: '25% Off First Booking', code: 'FIRST25', description: 'Get 25% off on your first restaurant booking', expiry: 'Valid till Dec 31' },
    { id: 2, title: 'Weekend Special', code: 'WEEKEND15', description: '15% discount on weekend reservations', expiry: 'Valid every Sat-Sun' },
    { id: 3, title: 'Loyalty Bonus', code: 'LOYAL50', description: 'TK 50 off on bookings above TK 500', expiry: 'Valid for 30 days' },
  ];

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchInput.trim()) {
      onSearch(searchInput);
    }
  };

  const handleCategoryClick = (category: string) => {
    onSearch(category.toLowerCase());
  };

  const filteredRestaurants = searchMode === 'restaurant' && searchInput
    ? mockRestaurants.filter(r => 
        r.name.toLowerCase().includes(searchInput.toLowerCase()) ||
        r.cuisine.toLowerCase().includes(searchInput.toLowerCase()) ||
        r.address.toLowerCase().includes(searchInput.toLowerCase())
      )
    : [];

  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 100], [0, -100]);
  const y2 = useTransform(scrollY, [0, 100], [0, -50]);

  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const updateMousePosition = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener("mousemove", updateMousePosition);

    return () => {
      window.removeEventListener("mousemove", updateMousePosition);
    };
  }, []);

  return (
    <div className="min-h-screen bg-[#0f0f0f] cursor-none">
      <motion.div
        className="fixed top-0 left-0 w-8 h-8 border-2 border-[#d4af37] rounded-full pointer-events-none z-50 mix-blend-difference"
        animate={{
          x: mousePosition.x - 16,
          y: mousePosition.y - 16,
        }}
        transition={{
          type: "spring",
          stiffness: 500,
          damping: 28,
          mass: 0.5,
        }}
      />
      <motion.div
        className="fixed top-0 left-0 w-2 h-2 bg-[#d4af37] rounded-full pointer-events-none z-50"
        animate={{
          x: mousePosition.x - 4,
          y: mousePosition.y - 4,
        }}
        transition={{
          type: "spring",
          stiffness: 800,
          damping: 35,
          mass: 0.5,
        }}
      />
      {/* Header */}
      <header className="bg-[#1a1a1a]/70 backdrop-blur-xl shadow-lg sticky top-0 z-40 border-b border-[#d4af37]/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2.5">
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              {/* Logo */}
              <div className="relative flex items-center gap-2.5">
                <div className="w-10 h-10 bg-[#d4af37] rounded-xl flex items-center justify-center border-2 border-[#d4af37]/30 p-2">
                  <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
                    <defs>
                      <linearGradient id="fork-gradient" x1="0%" y1="0%" x2="0%" y2="100%">
                        <stop offset="0%" stopColor="#ffffff" stopOpacity="1"/>
                        <stop offset="100%" stopColor="#f5f5f5" stopOpacity="0.95"/>
                      </linearGradient>
                    </defs>
                    
                    {/* Left Fork */}
                    <g transform="translate(-8, 0)">
                      <rect x="20" y="45" width="4" height="35" rx="1.5" fill="url(#fork-gradient)"/>
                      <rect x="18" y="18" width="2.5" height="30" rx="1.2" fill="url(#fork-gradient)"/>
                      <rect x="23.5" y="18" width="2.5" height="30" rx="1.2" fill="url(#fork-gradient)"/>
                      <rect x="29" y="18" width="2.5" height="25" rx="1.2" fill="url(#fork-gradient)"/>
                      <path d="M 18 45 Q 22 43, 26 45 Q 27 46, 22 47 Q 19 46, 18 45 Z" fill="url(#fork-gradient)"/>
                    </g>
                    
                    {/* Middle Fork */}
                    <g>
                      <rect x="48" y="45" width="4" height="35" rx="1.5" fill="url(#fork-gradient)"/>
                      <rect x="46" y="18" width="2.5" height="30" rx="1.2" fill="url(#fork-gradient)"/>
                      <rect x="51.5" y="18" width="2.5" height="30" rx="1.2" fill="url(#fork-gradient)"/>
                      <rect x="57" y="18" width="2.5" height="25" rx="1.2" fill="url(#fork-gradient)"/>
                      <path d="M 46 45 Q 50 43, 54 45 Q 55 46, 50 47 Q 47 46, 46 45 Z" fill="url(#fork-gradient)"/>
                    </g>
                    
                    {/* Right Fork */}
                    <g transform="translate(8, 0)">
                      <rect x="76" y="45" width="4" height="35" rx="1.5" fill="url(#fork-gradient)"/>
                      <rect x="74" y="18" width="2.5" height="30" rx="1.2" fill="url(#fork-gradient)"/>
                      <rect x="79.5" y="18" width="2.5" height="30" rx="1.2" fill="url(#fork-gradient)"/>
                      <rect x="85" y="18" width="2.5" height="25" rx="1.2" fill="url(#fork-gradient)"/>
                      <path d="M 74 45 Q 78 43, 82 45 Q 83 46, 78 47 Q 75 46, 74 45 Z" fill="url(#fork-gradient)"/>
                    </g>
                  </svg>
                </div>
                <div>
                  <h1 className="text-2xl flex items-center gap-0.5" style={{ fontFamily: "'Satisfy', cursive" }}>
                    <span className="text-white font-[Caesar_Dressing]">
                      Table
                    </span>
                    <span className="bg-[#FFA31A] text-black px-3 py-0.5 rounded-md font-[Caesar_Dressing]">
                      Hub
                    </span>
                  </h1>
                  <div className="text-[10px] text-[#d4af37]/70 tracking-wider">
                    PREMIUM DINING
                  </div>
                </div>
              </div>
            </div>

            {/* Navigation Buttons */}
            <div className="hidden lg:flex items-center gap-1.5">
              <button 
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                className="flex items-center gap-2 px-3 py-1.5 rounded-lg hover:bg-white/5 transition-all border border-transparent hover:border-[#d4af37]/20"
                title="Home"
              >
                <Home className="w-4 h-4 text-[#d4af37]" />
                <span className="text-gray-300 text-sm">Home</span>
              </button>
              
              <button 
                onClick={() => onSearch('all')}
                className="flex items-center gap-2 px-3 py-1.5 rounded-lg hover:bg-white/5 transition-all border border-transparent hover:border-[#d4af37]/20"
                title="Explore Restaurants"
              >
                <Compass className="w-4 h-4 text-[#d4af37]" />
                <span className="text-gray-300 text-sm">Explore</span>
              </button>
              
              <button 
                onClick={() => setShowOffers(true)}
                className="flex items-center gap-2 px-3 py-1.5 rounded-lg hover:bg-white/5 transition-all border border-transparent hover:border-[#d4af37]/20"
                title="Offers & Deals"
              >
                <Tag className="w-4 h-4 text-[#d4af37]" />
                <span className="text-gray-300 text-sm">Offers</span>
              </button>
              
              <button 
                onClick={() => onNavigate('home')}
                className="flex items-center gap-2 px-3 py-1.5 rounded-lg hover:bg-white/5 transition-all border border-transparent hover:border-[#d4af37]/20"
                title="Favorites"
              >
                <Heart className="w-4 h-4 text-[#d4af37]" />
                <span className="text-gray-300 text-sm">Favorites</span>
              </button>
            </div>

            {/* Right Side Buttons */}
            <div className="flex items-center gap-1.5">
              {/* Notifications */}
              <div className="relative">
                <button 
                  onClick={() => setShowNotifications(!showNotifications)}
                  className="relative p-2 rounded-lg hover:bg-white/5 transition-all border border-transparent hover:border-[#d4af37]/20"
                  title="Notifications"
                >
                  <Bell className="w-4 h-4 text-[#d4af37]" />
                  {notifications.filter(n => n.unread).length > 0 && (
                    <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
                  )}
                </button>

                {/* Notifications Dropdown */}
                {showNotifications && (
                  <div className="absolute right-0 mt-2 w-80 bg-[#1a1a1a]/95 backdrop-blur-xl border border-[#2a2a2a] rounded-xl shadow-2xl z-50">
                    <div className="p-4 border-b border-[#2a2a2a] flex items-center justify-between">
                      <h3 className="text-white">Notifications</h3>
                      <button 
                        onClick={() => setShowNotifications(false)}
                        className="text-gray-500 hover:text-gray-300"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                    <div className="max-h-96 overflow-y-auto">
                      {notifications.map((notif) => (
                        <div 
                          key={notif.id}
                          className={`p-4 border-b border-[#2a2a2a] hover:bg-white/5 transition-all cursor-pointer ${
                            notif.unread ? 'bg-[#d4af37]/5' : ''
                          }`}
                        >
                          <div className="flex items-start justify-between mb-1">
                            <p className="text-white text-sm">{notif.title}</p>
                            {notif.unread && <span className="w-2 h-2 bg-[#d4af37] rounded-full mt-1"></span>}
                          </div>
                          <p className="text-gray-400 text-sm mb-1">{notif.message}</p>
                          <p className="text-gray-600 text-xs">{notif.time}</p>
                        </div>
                      ))}
                    </div>
                    <div className="p-3 text-center border-t border-[#2a2a2a]">
                      <button className="text-[#d4af37] text-sm hover:text-[#f4d03f]">View All Notifications</button>
                    </div>
                  </div>
                )}
              </div>

              {/* Help Button */}
              <button 
                onClick={() => setShowHelp(true)}
                className="p-2 rounded-lg hover:bg-white/5 transition-all border border-transparent hover:border-[#d4af37]/20"
                title="Help & Support"
              >
                <HelpCircle className="w-4 h-4 text-[#d4af37]" />
              </button>

              {isAuthenticated ? (
                <>
                  <button 
                    onClick={() => onNavigate('bookings')}
                    className="flex items-center gap-2 px-3 py-1.5 rounded-lg hover:bg-white/5 transition-all border border-transparent hover:border-[#d4af37]/20"
                  >
                    <History className="w-4 h-4 text-[#d4af37]" />
                    <span className="hidden sm:inline text-gray-300 text-sm">Bookings</span>
                  </button>
                  <button 
                    onClick={() => onNavigate('profile')}
                    className="flex items-center gap-2 px-3 py-1.5 rounded-lg hover:bg-white/5 transition-all border border-transparent hover:border-[#d4af37]/20"
                  >
                    <User className="w-4 h-4 text-[#d4af37]" />
                    <span className="hidden sm:inline text-gray-300 text-sm">Profile</span>
                  </button>
                </>
              ) : (
                <button 
                  onClick={onAuthClick}
                  className="px-5 py-1.5 bg-[#d4af37] text-[#0f0f0f] rounded-lg hover:bg-[#b8860b] transition-all text-sm"
                >
                  Sign In
                </button>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Offers Modal */}
      {showOffers && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-[#1a1a1a] rounded-2xl max-w-2xl w-full border border-[#2a2a2a]">
            <div className="border-b border-[#2a2a2a] px-6 py-4 flex items-center justify-between">
              <h3 className="text-white">Special Offers & Deals</h3>
              <button 
                onClick={() => setShowOffers(false)} 
                className="text-gray-500 hover:text-gray-300"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <div className="p-6 space-y-4 max-h-[70vh] overflow-y-auto">
              {offers.map((offer) => (
                <div 
                  key={offer.id}
                  className="bg-[#2a2a2a] border border-[#3a3a3a] rounded-xl p-5 hover:border-[#d4af37]/30 transition-all"
                >
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h4 className="text-white mb-1">{offer.title}</h4>
                      <p className="text-gray-400 text-sm">{offer.description}</p>
                    </div>
                    <Tag className="w-5 h-5 text-[#d4af37]" />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="bg-[#d4af37]/10 border border-[#d4af37]/30 rounded-lg px-4 py-2">
                      <p className="text-[#d4af37] text-sm">Code: <span className="font-mono">{offer.code}</span></p>
                    </div>
                    <p className="text-gray-500 text-sm">{offer.expiry}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Help Modal */}
      {showHelp && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-[#1a1a1a] rounded-2xl max-w-2xl w-full border border-[#2a2a2a]">
            <div className="border-b border-[#2a2a2a] px-6 py-4 flex items-center justify-between">
              <h3 className="text-white">Help & Support</h3>
              <button 
                onClick={() => setShowHelp(false)} 
                className="text-gray-500 hover:text-gray-300"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <div className="p-6 space-y-6">
              <div>
                <h4 className="text-white mb-4">Frequently Asked Questions</h4>
                <div className="space-y-3">
                  <div className="bg-[#2a2a2a] rounded-lg p-4">
                    <p className="text-[#d4af37] mb-2">How do I make a reservation?</p>
                    <p className="text-gray-400 text-sm">Browse restaurants, select your preferred one, choose date and time, then confirm your booking.</p>
                  </div>
                  <div className="bg-[#2a2a2a] rounded-lg p-4">
                    <p className="text-[#d4af37] mb-2">Can I cancel my booking?</p>
                    <p className="text-gray-400 text-sm">Yes, you can cancel up to 2 hours before your reservation time without any penalty.</p>
                  </div>
                  <div className="bg-[#2a2a2a] rounded-lg p-4">
                    <p className="text-[#d4af37] mb-2">How do payment methods work?</p>
                    <p className="text-gray-400 text-sm">We support bKash, Nagad, Rocket, and other popular Bangladeshi payment methods.</p>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="text-white mb-4">Contact Support</h4>
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-[#2a2a2a] rounded-lg p-4 text-center">
                    <p className="text-gray-400 text-sm mb-2">Email</p>
                    <p className="text-[#d4af37]">support@tablehub.com</p>
                  </div>
                  <div className="bg-[#2a2a2a] rounded-lg p-4 text-center">
                    <p className="text-gray-400 text-sm mb-2">Phone</p>
                    <p className="text-[#d4af37]">+880 1711-123456</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Hero Section */}
      <section 
        className="relative text-white py-32 px-4 overflow-hidden"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1744776411214-31209006a0f6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjByZXN0YXVyYW50JTIwaW50ZXJpb3J8ZW58MXx8fHwxNzYzOTI4NTg0fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="absolute inset-0 bg-[#0f0f0f]/90 bg-[rgba(0,0,0,0.46)]"></div>
        
        {/* Spline 3D Scene - Moved to grid layout */}

        <div className="relative max-w-7xl mx-auto px-4 z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center min-h-[500px]">
            
            {/* Left Content */}
            <div className="w-full relative z-20">
              
              {/* Headline */}
              <div className="mb-8">
                <motion.h1 
                  className="text-5xl sm:text-6xl lg:text-7xl mb-4 font-bold text-white"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, ease: "easeOut" }}
                >
                  Discover Fine Dining Excellence
                </motion.h1>
                
                {/* Decorative line */}
                <motion.div 
                  className="flex items-center gap-4 mb-8"
                  initial={{ opacity: 0, scaleX: 0 }}
                  animate={{ opacity: 1, scaleX: 1 }}
                  transition={{ delay: 0.4, duration: 0.8 }}
                >
                  <div className="h-0.5 w-24 bg-gradient-to-r from-transparent to-[#d4af37]" />
                  <div className="w-3 h-3 bg-[#d4af37] rounded-full shadow-[0_0_10px_#d4af37]" />
                  <div className="h-0.5 w-24 bg-gradient-to-l from-transparent to-[#d4af37]" />
                </motion.div>
              </div>
              
              <p className="mb-16 text-gray-200 text-xl sm:text-2xl max-w-2xl leading-relaxed">
                Experience world-class restaurants with seamless table reservations and exclusive member benefits
              </p>
              
              {/* Search Bar */}
              <div className="max-w-2xl">
                {/* Search Mode Toggle */}
                <div className="flex gap-3 mb-6">
                  <button
                    onClick={() => setSearchMode('food')}
                    className={`px-8 py-3 rounded-lg transition-all ${
                      searchMode === 'food'
                        ? 'bg-[#d4af37] text-[#0f0f0f]'
                        : 'bg-[#1a1a1a] text-gray-300 hover:bg-[#2a2a2a] border border-[#2a2a2a]'
                    }`}
                  >
                    Search by Cuisine
                  </button>
                  <button
                    onClick={() => setSearchMode('restaurant')}
                    className={`px-8 py-3 rounded-lg transition-all ${
                      searchMode === 'restaurant'
                        ? 'bg-[#d4af37] text-[#0f0f0f]'
                        : 'bg-[#1a1a1a] text-gray-300 hover:bg-[#2a2a2a] border border-[#2a2a2a]'
                    }`}
                  >
                    Search by Restaurant
                  </button>
                </div>

                <form onSubmit={handleSearchSubmit} className="relative">
                  <div className="relative bg-[#1a1a1a] rounded-2xl border border-[#d4af37]/20 overflow-hidden">
                    <Search className="absolute left-6 top-1/2 transform -translate-y-1/2 text-[#d4af37] w-6 h-6" />
                    <input
                      type="text"
                      placeholder={searchMode === 'food' 
                        ? "Search for burgers, sushi, fine dining..." 
                        : "Search restaurants by name or cuisine..."}
                      value={searchInput}
                      onChange={(e) => setSearchInput(e.target.value)}
                      className="w-full pl-16 pr-36 py-6 bg-transparent text-white placeholder-gray-500 focus:outline-none text-lg"
                    />
                    <button
                      type="submit"
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 bg-[#d4af37] text-[#0f0f0f] px-10 py-3.5 rounded-xl hover:bg-[#b8860b] transition-all hover:shadow-[0_0_20px_rgba(212,175,55,0.6)]"
                    >
                      Search
                    </button>
                  </div>
                </form>

                {/* Live search results */}
                {searchMode === 'restaurant' && searchInput && (
                  <div className="mt-4 bg-[#1a1a1a] rounded-2xl border border-[#d4af37]/20 overflow-hidden max-h-80 overflow-y-auto">
                    {filteredRestaurants.length > 0 ? (
                      filteredRestaurants.map((restaurant) => (
                        <button
                          key={restaurant.id}
                          onClick={() => {
                            setSearchInput('');
                            onSelectRestaurant(restaurant);
                          }}
                          className="w-full px-6 py-5 text-left hover:bg-[#2a2a2a] transition-all border-b border-[#2a2a2a]/50 last:border-0 flex items-center gap-4"
                        >
                          <div className="w-14 h-14 bg-[#d4af37]/20 rounded-xl flex items-center justify-center border border-[#d4af37]/20">
                            <span className="text-2xl">🍽️</span>
                          </div>
                          <div className="flex-1">
                            <h4 className="text-white mb-1">{restaurant.name}</h4>
                            <p className="text-gray-400">{restaurant.cuisine} • {restaurant.distance} km</p>
                          </div>
                          <div className="flex items-center gap-1.5 text-[#d4af37]">
                            <Star className="w-4 h-4 fill-[#d4af37]" />
                            <span>{restaurant.rating}</span>
                          </div>
                        </button>
                      ))
                    ) : (
                      <div className="px-6 py-12 text-center text-gray-400">
                        <p>No restaurants found matching "{searchInput}"</p>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>


            {/* Right Side - Spline 3D Scene */}
            <div className="hidden lg:block h-[600px]">
              <div className="relative w-full h-full rounded-2xl cursor-crosshair hover:cursor-move pointer-events-auto">
                <ErrorBoundary
                  fallback={
                    <div className="w-full h-full bg-[#1a1a1a] flex items-center justify-center">
                      <img 
                        src="https://images.unsplash.com/photo-1559339352-11d035aa65de?w=800&h=600&fit=crop" 
                        alt="Dining Experience" 
                        className="w-full h-full object-cover opacity-50"
                      />
                    </div>
                  }
                >
                  <canvas ref={canvasRef} className="w-full h-full" />
                </ErrorBoundary>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Categories */}
        <section className="mb-20">
          <h3 className="mb-10 text-white">Browse by Category</h3>
          <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => handleCategoryClick(category)}
                className="px-10 py-5 bg-[#1a1a1a] rounded-xl border border-[#2a2a2a] hover:border-[#d4af37]/30 hover:bg-[#2a2a2a] transition-all whitespace-nowrap"
              >
                <span className="text-gray-300 hover:text-[#d4af37] transition-colors">{category}</span>
              </button>
            ))}
          </div>
        </section>

        {/* Meal Selection Section */}
        <MealSelectionSection />

        {/* Popular Food Items */}
        <section className="mb-20">
          <div className="flex items-center justify-between mb-10">
            <div>
              <h3 className="text-white mb-2">Signature Dishes</h3>
              <p className="text-gray-400">Handpicked selections from our finest restaurants</p>
            </div>
            <button 
              onClick={() => onSearch('popular')}
              className="text-[#d4af37] hover:text-[#f4d03f] px-5 py-2.5 rounded-lg hover:bg-[#2a2a2a] transition-all border border-transparent hover:border-[#d4af37]/20"
            >
              View All →
            </button>
          </div>
          <motion.div 
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-50px" }}
            variants={{
              hidden: { opacity: 0 },
              show: {
                opacity: 1,
                transition: {
                  staggerChildren: 0.1
                }
              }
            }}
          >
            {popularFood.map((item) => {
              const restaurant = mockRestaurants.find(r => r.id === item.restaurantId);
              return (
                <motion.div 
                  key={item.id} 
                  onClick={() => restaurant && onSelectRestaurant(restaurant)}
                  variants={{
                    hidden: { opacity: 0, scale: 0.9 },
                    show: { opacity: 1, scale: 1, transition: { type: "spring", stiffness: 60 } }
                  }}
                  whileHover={{ y: -5, scale: 1.02 }}
                  className="bg-[#1a1a1a] rounded-2xl border border-[#2a2a2a] hover:border-[#d4af37]/50 transition-colors cursor-pointer overflow-hidden group shadow-lg hover:shadow-[#d4af37]/10"
                >
                  <div className="aspect-video overflow-hidden relative">
                    <motion.img 
                      src={item.image} 
                      alt={item.name}
                      className="w-full h-full object-cover"
                      whileHover={{ scale: 1.1 }}
                      transition={{ duration: 0.6 }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0f0f0f] via-transparent to-transparent opacity-60"></div>
                    <div className="absolute bottom-4 left-4 right-4 flex justify-between items-center">
                      <span className="inline-block px-4 py-1.5 bg-[#d4af37]/90 text-[#0f0f0f] rounded-full font-bold shadow-lg">TK {item.price}</span>
                    </div>
                  </div>
                  <div className="p-6">
                    <h4 className="mb-2 text-white text-lg font-semibold group-hover:text-[#d4af37] transition-colors">{item.name}</h4>
                    <p className="text-gray-400 mb-4 text-sm">{restaurant?.name}</p>
                    <div className="flex items-center justify-between">
                      <span className="px-4 py-1.5 bg-[#d4af37]/10 text-[#d4af37] rounded-lg text-sm border border-[#d4af37]/20 font-medium">{item.category}</span>
                      <span className="text-gray-500 text-sm group-hover:text-white transition-colors">Order Now →</span>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </section>

        {/* Nearby Restaurants */}
        <section>
          <div className="flex items-center justify-between mb-10">
            <div>
              <h3 className="text-white mb-2">Featured Restaurants</h3>
              <p className="text-gray-400">Experience exceptional dining at these premier locations</p>
            </div>
            <button className="text-[#d4af37] hover:text-[#f4d03f] px-5 py-2.5 rounded-lg hover:bg-[#2a2a2a] transition-all border border-transparent hover:border-[#d4af37]/20">
              View All →
            </button>
          </div>
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-50px" }}
            variants={{
              hidden: { opacity: 0 },
              show: {
                opacity: 1,
                transition: {
                  staggerChildren: 0.1
                }
              }
            }}
          >
            {mockRestaurants.map((restaurant) => (
              <motion.div
                key={restaurant.id}
                onClick={() => onSelectRestaurant(restaurant)}
                variants={{
                  hidden: { opacity: 0, y: 30 },
                  show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 50, damping: 20 } }
                }}
                whileHover={{ y: -10, transition: { duration: 0.2 } }}
                className="bg-[#1a1a1a] rounded-2xl border border-[#2a2a2a] hover:border-[#d4af37]/50 transition-colors cursor-pointer overflow-hidden group shadow-lg hover:shadow-[#d4af37]/10"
              >
                <div className="aspect-video overflow-hidden relative">
                  <motion.img 
                    src={restaurant.image} 
                    alt={restaurant.name}
                    className="w-full h-full object-cover"
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 0.6 }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0f0f0f] via-transparent to-transparent opacity-60"></div>
                  <div className="absolute top-4 right-4 px-4 py-2 bg-[#1a1a1a]/90 rounded-full border border-[#d4af37]/30 backdrop-blur-md">
                    <div className="flex items-center gap-1.5">
                      <Star className="w-4 h-4 fill-[#d4af37] text-[#d4af37]" />
                      <span className="text-white font-medium">{restaurant.rating}</span>
                    </div>
                  </div>
                </div>
                <div className="p-6">
                  <h4 className="mb-3 text-white text-xl font-semibold group-hover:text-[#d4af37] transition-colors">{restaurant.name}</h4>
                  <div className="flex items-center gap-4 mb-5 text-gray-400">
                    <div className="flex items-center gap-1.5">
                      <MapPin className="w-4 h-4 text-[#d4af37]" />
                      <span>{restaurant.distance} km</span>
                    </div>
                    <span className="text-[#d4af37] font-medium">{restaurant.priceRange}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-400">{restaurant.cuisine}</span>
                    <button className="flex items-center gap-2 bg-[#d4af37] text-[#0f0f0f] px-6 py-2.5 rounded-lg hover:bg-[#b8860b] transition-all font-medium hover:shadow-[0_0_15px_rgba(212,175,55,0.5)]">
                      <Calendar className="w-4 h-4" />
                      Reserve
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </section>

        {/* Meet the Team */}
        <section className="mt-20 relative overflow-hidden">
          {/* Animated Background Orbs */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <motion.div
              className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#d4af37]/20 rounded-full blur-3xl"
              animate={{
                scale: [1, 1.3, 1],
                x: [0, 100, 0],
                y: [0, -50, 0],
              }}
              transition={{
                duration: 15,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
            <motion.div
              className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#d4af37]/15 rounded-full blur-3xl"
              animate={{
                scale: [1, 1.4, 1],
                x: [0, -80, 0],
                y: [0, 60, 0],
              }}
              transition={{
                duration: 18,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
          </div>

          {/* Header */}
          <motion.div 
            className="text-center mb-16 relative z-10"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <motion.div
              className="inline-flex items-center gap-3 mb-6"
              initial={{ opacity: 0, scale: 0.5 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2, type: 'spring', stiffness: 150 }}
            >
              <div className="h-px w-20 bg-gradient-to-r from-transparent via-[#d4af37] to-[#d4af37]"/>
              <div className="w-3 h-3 bg-[#d4af37] rounded-full animate-pulse" />
              <div className="h-px w-20 bg-gradient-to-l from-transparent via-[#d4af37] to-[#d4af37]"/>
            </motion.div>
            <h3 className="text-white mb-4">Meet Our Team</h3>
            <p className="text-gray-400 max-w-2xl mx-auto">
              The talented individuals behind TableHub who make seamless dining experiences possible
            </p>
          </motion.div>

          {/* Team Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 relative z-10">
            {[
              {
                name: 'Arif Hassan',
                role: 'Frontend Developer',
                image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop',
                bio: 'Crafting beautiful interfaces with React & TypeScript',
                social: { linkedin: '#', github: '#', twitter: '#' }
              },
              {
                name: 'Nadia Rahman',
                role: 'Backend Developer',
                image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop',
                bio: 'Building scalable systems & APIs',
                social: { linkedin: '#', github: '#', twitter: '#' }
              },
              {
                name: 'Fahim Ahmed',
                role: 'UI/UX Designer',
                image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop',
                bio: 'Designing user-centered experiences',
                social: { linkedin: '#', github: '#', twitter: '#' }
              },
              {
                name: 'Saima Khan',
                role: 'Product Manager',
                image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop',
                bio: 'Driving product vision & strategy',
                social: { linkedin: '#', github: '#', twitter: '#' }
              },
            ].map((member, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 80 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ 
                  delay: index * 0.15, 
                  duration: 0.7,
                  type: 'spring',
                  stiffness: 100
                }}
                className="group relative"
              >
                <motion.div 
                  className="relative bg-gradient-to-br from-[#1a1a1a] to-[#0f0f0f] rounded-3xl border border-[#2a2a2a] overflow-hidden transition-all duration-500 shadow-2xl"
                  whileHover={{ 
                    y: -15,
                    borderColor: 'rgba(212, 175, 55, 0.5)',
                    transition: { duration: 0.3 }
                  }}
                >
                  
                  {/* Gradient Overlay Border Effect */}
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
                    <div className="absolute inset-0 bg-gradient-to-br from-[#d4af37]/20 via-transparent to-[#d4af37]/10 rounded-3xl" />
                  </div>

                  {/* Image Container */}
                  <div className="relative aspect-square overflow-hidden">
                    <img
                      src={member.image}
                      alt={member.name}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    
                    {/* Gradient Overlay on Image */}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0f0f0f] via-[#0f0f0f]/40 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-500 pointer-events-none" />
                    
                    {/* Floating Badge */}
                    <div className="absolute top-4 right-4 bg-[#d4af37]/90 backdrop-blur-sm text-[#0f0f0f] px-3 py-1 rounded-full text-xs opacity-0 group-hover:opacity-100 transition-all duration-300 scale-90 group-hover:scale-100">
                      View Profile
                    </div>

                    {/* Bio Overlay - Appears on Hover */}
                    <div className="absolute inset-x-0 bottom-0 p-6 bg-gradient-to-t from-[#0f0f0f] to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-4 group-hover:translate-y-0">
                      <p className="text-gray-300 text-sm mb-3">{member.bio}</p>
                      
                      {/* Social Links */}
                      <div className="flex gap-3 justify-center">
                        {['linkedin', 'github', 'twitter'].map((social, i) => (
                          <a
                            key={social}
                            href={member.social[social as keyof typeof member.social]}
                            className="w-8 h-8 bg-[#d4af37]/20 hover:bg-[#d4af37] backdrop-blur-sm rounded-full flex items-center justify-center border border-[#d4af37]/30 transition-all duration-300 hover:scale-110 group"
                            style={{
                              transitionDelay: `${i * 50}ms`
                            }}
                          >
                            {social === 'linkedin' && (
                              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[#d4af37] group-hover:text-[#0f0f0f] transition-colors"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/></svg>
                            )}
                            {social === 'github' && (
                              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[#d4af37] group-hover:text-[#0f0f0f] transition-colors"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/><path d="M9 18c-4.51 2-5-2-7-2"/></svg>
                            )}
                            {social === 'twitter' && (
                              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[#d4af37] group-hover:text-[#0f0f0f] transition-colors"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"/></svg>
                            )}
                          </a>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Info Section */}
                  <div className="relative p-6 text-center bg-[#1a1a1a]/80 backdrop-blur-sm">
                    <h4 className="text-white mb-2">
                      {member.name}
                    </h4>
                    
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-[#d4af37]/10 border border-[#d4af37]/30 rounded-full transition-transform duration-300 group-hover:scale-105">
                      <div className="w-1.5 h-1.5 bg-[#d4af37] rounded-full animate-pulse" />
                      <p className="text-[#d4af37] text-sm">{member.role}</p>
                    </div>

                    {/* Decorative Bottom Line */}
                    <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#d4af37] to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 scale-x-0 group-hover:scale-x-100" />
                  </div>

                  {/* Corner Accents */}
                  <div className="absolute top-0 left-0 w-20 h-20 border-t-2 border-l-2 border-[#d4af37]/0 group-hover:border-[#d4af37]/50 transition-all duration-500 rounded-tl-3xl pointer-events-none" />
                  <div className="absolute bottom-0 right-0 w-20 h-20 border-b-2 border-r-2 border-[#d4af37]/0 group-hover:border-[#d4af37]/50 transition-all duration-500 rounded-br-3xl pointer-events-none" />
                </motion.div>

                {/* Floating Glow Effect */}
                <div className="absolute inset-0 -z-10 bg-[#d4af37]/20 rounded-3xl blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
              </motion.div>
            ))}
          </div>
        </section>
      </div>

      <Footer />
    </div>
  );
}

// Meal Selection Section Component
function MealSelectionSection() {
  const [selectedMeal, setSelectedMeal] = useState<'breakfast' | 'brunch' | 'lunch' | 'snacks' | 'dinner'>('lunch');

  const mealTypes = [
    { type: 'breakfast' as const, label: 'Breakfast', icon: Coffee, timeRange: '6AM - 11AM', color: 'from-orange-400 to-amber-500', description: 'Start your day with a delightful morning feast' },
    { type: 'brunch' as const, label: 'Brunch', icon: Sun, timeRange: '10AM - 2PM', color: 'from-yellow-400 to-orange-400', description: 'Perfect blend of breakfast and lunch favorites' },
    { type: 'lunch' as const, label: 'Lunch', icon: Utensils, timeRange: '12PM - 4PM', color: 'from-green-400 to-emerald-500', description: 'Midday delights to fuel your afternoon' },
    { type: 'snacks' as const, label: 'Snacks', icon: Coffee, timeRange: '3PM - 6PM', color: 'from-blue-400 to-cyan-500', description: 'Light bites and refreshing treats' },
    { type: 'dinner' as const, label: 'Dinner', icon: Moon, timeRange: '6PM - 11PM', color: 'from-purple-500 to-indigo-600', description: 'Elegant evening dining experiences' },
  ];

  return (
    <section className="mb-20 relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-30">
        <motion.div
          className="absolute -top-20 -left-20 w-96 h-96 bg-[#d4af37]/10 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            x: [0, 50, 0],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div
          className="absolute -bottom-20 -right-20 w-96 h-96 bg-[#d4af37]/10 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.3, 1],
            x: [0, -50, 0],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </div>

      <div className="relative">
        {/* Header */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <motion.div
            className="inline-flex items-center gap-3 mb-4"
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            <div className="h-px w-16 bg-gradient-to-r from-transparent to-[#d4af37]"/>
            <Utensils className="w-6 h-6 text-[#d4af37]"/>
            <div className="h-px w-16 bg-gradient-to-l from-transparent to-[#d4af37]"/>
          </motion.div>
          <h3 className="text-white mb-3">Reserve by Meal Time</h3>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Find the perfect time for your dining experience - from sunrise to starlight
          </p>
        </motion.div>

        {/* Meal Type Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4 mb-8">
          {mealTypes.map((meal, index) => {
            const Icon = meal.icon;
            const isSelected = selectedMeal === meal.type;
            
            return (
              <motion.button
                key={meal.type}
                initial={{ opacity: 0, y: 40, scale: 0.9 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ 
                  delay: index * 0.08, 
                  duration: 0.5,
                  type: 'spring',
                  stiffness: 120
                }}
                whileHover={{ y: -10, scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setSelectedMeal(meal.type)}
                className={`relative p-6 rounded-2xl border-2 transition-all duration-300 overflow-hidden group ${
                  isSelected
                    ? 'border-[#d4af37] bg-[#d4af37]/10 shadow-lg shadow-[#d4af37]/20'
                    : 'border-[#3a3a3a] bg-[#1a1a1a] hover:border-[#d4af37]/50 hover:bg-[#2a2a2a]'
                }`}
              >
                {/* Gradient Background on Hover */}
                <motion.div
                  className={`absolute inset-0 bg-gradient-to-br ${meal.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300`}
                  animate={{
                    opacity: isSelected ? 0.15 : 0,
                  }}
                />

                {/* Pulse Ring on Selected */}
                {isSelected && (
                  <motion.div
                    className="absolute inset-0 rounded-2xl border-2 border-[#d4af37]"
                    animate={{
                      scale: [1, 1.05, 1],
                      opacity: [0.5, 0, 0.5],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  />
                )}

                <div className="relative z-10">
                  {/* Icon */}
                  <motion.div
                    className="mb-4 flex justify-center"
                    animate={{
                      rotate: isSelected ? [0, -10, 10, -10, 0] : 0,
                      scale: isSelected ? [1, 1.1, 1] : 1,
                    }}
                    transition={{
                      duration: 0.6,
                      ease: "easeInOut"
                    }}
                  >
                    <div className={`p-4 rounded-xl ${isSelected ? 'bg-[#d4af37]/20' : 'bg-[#2a2a2a]'} transition-colors`}>
                      <Icon className={`w-8 h-8 ${isSelected ? 'text-[#d4af37]' : 'text-gray-400'}`} />
                    </div>
                  </motion.div>

                  {/* Label */}
                  <h4 className={`mb-2 ${isSelected ? 'text-white' : 'text-gray-300'}`}>
                    {meal.label}
                  </h4>
                  
                  {/* Time Range */}
                  <p className="text-sm text-gray-500 mb-2">{meal.timeRange}</p>

                  {/* Selected Indicator */}
                  {isSelected && (
                    <motion.div
                      className="absolute top-4 right-4"
                      initial={{ scale: 0, rotate: -180 }}
                      animate={{ scale: 1, rotate: 0 }}
                      transition={{ type: 'spring', stiffness: 200, damping: 15 }}
                    >
                      <div className="w-8 h-8 bg-[#d4af37] rounded-full flex items-center justify-center">
                        <svg className="w-5 h-5 text-[#0f0f0f]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                    </motion.div>
                  )}
                </div>

                {/* Hover Shine Effect */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent"
                  initial={{ x: '-100%' }}
                  whileHover={{ x: '100%' }}
                  transition={{ duration: 0.6 }}
                />
              </motion.button>
            );
          })}
        </div>

        {/* Description for Selected Meal */}
        <motion.div
          key={selectedMeal}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="text-center"
        >
          <div className="inline-flex items-center gap-3 px-6 py-4 bg-[#1a1a1a] border border-[#d4af37]/30 rounded-2xl">
            <div className="w-2 h-2 bg-[#d4af37] rounded-full animate-pulse" />
            <p className="text-gray-300">
              {mealTypes.find(m => m.type === selectedMeal)?.description}
            </p>
            <motion.div
              animate={{ x: [0, 5, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              <ChevronRight className="w-5 h-5 text-[#d4af37]" />
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}