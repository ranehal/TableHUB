import { motion } from 'framer-motion';
import { Calendar, Users, XCircle, TrendingUp, Clock, DollarSign } from 'lucide-react';
import { mockBookings } from '../../data/mockData';
import { RestaurantView } from './RestaurantPortal';
import { toast } from 'sonner';

interface RestaurantDashboardProps {
  onNavigate: (view: RestaurantView) => void;
}

export function RestaurantDashboard({ onNavigate }: RestaurantDashboardProps) {
  const todayBookings = mockBookings.filter(b => b.status === 'upcoming');
  const totalBookings = mockBookings.length;
  const cancelledBookings = mockBookings.filter(b => b.status === 'cancelled').length;
  const totalRevenue = mockBookings.reduce((sum, b) => sum + b.price, 0);

  const todaySchedule = todayBookings.slice(0, 5);

  const handleCheckIn = (bookingId: string) => {
    toast.success(`Customer checked in for booking ${bookingId}!`);
  };

  return (
    <div>
      <div className="mb-8">
        <h2 className="mb-2">Dashboard Overview</h2>
        <p className="text-gray-600">Welcome back! Here's what's happening today.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <motion.div 
          className="bg-white rounded-xl shadow-sm p-6"
          whileHover={{ y: -5, scale: 1.02 }}
          transition={{ duration: 0.2 }}
        >
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <Calendar className="w-6 h-6 text-blue-600" />
            </div>
            <span className="text-green-600">+12%</span>
          </div>
          <p className="text-gray-600 mb-1">Total Bookings</p>
          <h3 className="text-blue-600">{totalBookings}</h3>
        </motion.div>

        <motion.div 
          className="bg-white rounded-xl shadow-sm p-6"
          whileHover={{ y: -5, scale: 1.02 }}
          transition={{ duration: 0.2 }}
        >
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <Users className="w-6 h-6 text-green-600" />
            </div>
            <span className="text-green-600">+8%</span>
          </div>
          <p className="text-gray-600 mb-1">Today's Reservations</p>
          <h3 className="text-green-600">{todayBookings.length}</h3>
        </motion.div>

        <motion.div 
          className="bg-white rounded-xl shadow-sm p-6"
          whileHover={{ y: -5, scale: 1.02 }}
          transition={{ duration: 0.2 }}
        >
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
              <XCircle className="w-6 h-6 text-red-600" />
            </div>
            <span className="text-red-600">-3%</span>
          </div>
          <p className="text-gray-600 mb-1">Cancellations</p>
          <h3 className="text-red-600">{cancelledBookings}</h3>
        </motion.div>

        <motion.div 
          className="bg-white rounded-xl shadow-sm p-6"
          whileHover={{ y: -5, scale: 1.02 }}
          transition={{ duration: 0.2 }}
        >
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
              <DollarSign className="w-6 h-6 text-yellow-600" />
            </div>
            <span className="text-green-600">+15%</span>
          </div>
          <p className="text-gray-600 mb-1">Revenue (This Month)</p>
          <h3 className="text-yellow-600">${totalRevenue}</h3>
        </motion.div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Today's Schedule */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex items-center justify-between mb-6">
            <h3>Today's Schedule</h3>
            <button 
              onClick={() => onNavigate('bookings')}
              className="text-blue-600 hover:text-blue-700"
            >
              View All
            </button>
          </div>

          {todaySchedule.length === 0 ? (
            <div className="text-center py-12">
              <Calendar className="w-12 h-12 text-gray-300 mx-auto mb-3" />
              <p className="text-gray-500">No bookings scheduled for today</p>
            </div>
          ) : (
            <div className="space-y-3">
              {todaySchedule.map((booking) => (
                <motion.div 
                  key={booking.id} 
                  className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                  whileHover={{ x: 5 }}
                >
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                    <Clock className="w-6 h-6 text-blue-600" />
                  </div>
                  <div className="flex-1">
                    <p className="mb-1">Booking #{booking.id}</p>
                    <p className="text-gray-600">{booking.time} • {booking.numberOfPeople} guests</p>
                  </div>
                  <motion.button 
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleCheckIn(booking.id)}
                  >
                    Check In
                  </motion.button>
                </motion.div>
              ))}
            </div>
          )}
        </div>

        {/* Real-time Table Occupancy */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h3 className="mb-6">Real-time Table Occupancy</h3>
          
          <div className="space-y-4">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-gray-700">2-Seat Tables</span>
                <span className="text-gray-600">5/8 occupied</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-3">
                <div className="bg-blue-600 h-3 rounded-full" style={{ width: '62.5%' }}></div>
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-gray-700">3-Seat Tables</span>
                <span className="text-gray-600">3/6 occupied</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-3">
                <div className="bg-green-600 h-3 rounded-full" style={{ width: '50%' }}></div>
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-gray-700">4-Seat Tables</span>
                <span className="text-gray-600">7/10 occupied</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-3">
                <div className="bg-yellow-600 h-3 rounded-full" style={{ width: '70%' }}></div>
              </div>
            </div>
          </div>

          <button 
            onClick={() => onNavigate('tables')}
            className="w-full mt-6 px-6 py-2 border-2 border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
          >
            Manage Tables
          </button>
        </div>
      </div>

      {/* Peak Hours */}
      <div className="bg-white rounded-xl shadow-sm p-6 mt-8">
        <h3 className="mb-6">Peak Hours Today</h3>
        <div className="grid grid-cols-7 gap-2">
          {['12PM', '1PM', '2PM', '6PM', '7PM', '8PM', '9PM'].map((hour, index) => {
            const heights = [40, 60, 45, 70, 85, 90, 75];
            return (
              <div key={hour} className="text-center">
                <div className="h-32 flex items-end mb-2">
                  <div 
                    className="w-full bg-blue-600 rounded-t"
                    style={{ height: `${heights[index]}%` }}
                  ></div>
                </div>
                <p className="text-gray-600">{hour}</p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}