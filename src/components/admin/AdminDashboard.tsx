import { motion } from 'framer-motion';
import { Store, Users, DollarSign, TrendingUp, AlertCircle, CheckCircle } from 'lucide-react';
import { toast } from 'sonner@2.0.3';
import { AdminView } from './AdminPortal';

interface AdminDashboardProps {
  onNavigate: (view: AdminView) => void;
}

export function AdminDashboard({ onNavigate }: AdminDashboardProps) {
  const handleApprove = (name: string) => {
    toast.success(`${name} has been approved!`);
  };

  const handleReject = (name: string) => {
    toast.error(`${name} has been rejected!`);
  };

  const handleReview = (id: string) => {
    toast.info(`Opening dispute ${id}...`);
    onNavigate('disputes');
  };

  return (
    <div>
      <div className="mb-8">
        <h2 className="mb-2">Platform Overview</h2>
        <p className="text-gray-600">Monitor the entire platform's performance</p>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <motion.div 
          className="bg-white rounded-xl shadow-sm p-6"
          whileHover={{ y: -5, scale: 1.02 }}
          transition={{ duration: 0.2 }}
        >
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <Store className="w-6 h-6 text-blue-600" />
            </div>
            <span className="text-green-600">+5</span>
          </div>
          <p className="text-gray-600 mb-1">Total Restaurants</p>
          <h3 className="text-blue-600">127</h3>
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
            <span className="text-green-600">+234</span>
          </div>
          <p className="text-gray-600 mb-1">Total Users</p>
          <h3 className="text-green-600">12,458</h3>
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
            <span className="text-green-600">+18%</span>
          </div>
          <p className="text-gray-600 mb-1">Monthly Revenue</p>
          <h3 className="text-yellow-600">$89,450</h3>
        </motion.div>

        <motion.div 
          className="bg-white rounded-xl shadow-sm p-6"
          whileHover={{ y: -5, scale: 1.02 }}
          transition={{ duration: 0.2 }}
        >
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
              <TrendingUp className="w-6 h-6 text-purple-600" />
            </div>
            <span className="text-green-600">+25%</span>
          </div>
          <p className="text-gray-600 mb-1">Total Bookings</p>
          <h3 className="text-purple-600">8,932</h3>
        </motion.div>
      </div>

      {/* Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        {/* Pending Approvals */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex items-center justify-between mb-6">
            <h3>Pending Restaurant Approvals</h3>
            <span className="px-3 py-1 bg-yellow-100 text-yellow-700 rounded-full">3 Pending</span>
          </div>
          
          <div className="space-y-4">
            {[
              { name: 'Sushi Dreams', cuisine: 'Japanese', date: '2025-11-22' },
              { name: 'Taco Fiesta', cuisine: 'Mexican', date: '2025-11-23' },
              { name: 'Pasta House', cuisine: 'Italian', date: '2025-11-24' },
            ].map((restaurant, index) => (
              <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div>
                  <p className="mb-1">{restaurant.name}</p>
                  <p className="text-gray-600">{restaurant.cuisine} • Applied {restaurant.date}</p>
                </div>
                <div className="flex gap-2">
                  <button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors" onClick={() => handleApprove(restaurant.name)}>
                    Approve
                  </button>
                  <button className="px-4 py-2 border-2 border-red-300 text-red-600 rounded-lg hover:bg-red-50 transition-colors" onClick={() => handleReject(restaurant.name)}>
                    Reject
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Active Disputes */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex items-center justify-between mb-6">
            <h3>Active Disputes</h3>
            <span className="px-3 py-1 bg-red-100 text-red-700 rounded-full">2 Active</span>
          </div>
          
          <div className="space-y-4">
            {[
              { id: 'D001', type: 'Late Cancellation', restaurant: 'The Burger House', user: 'John Doe' },
              { id: 'D002', type: 'Service Issue', restaurant: 'Pizza Paradise', user: 'Jane Smith' },
            ].map((dispute) => (
              <div key={dispute.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div>
                  <p className="mb-1">{dispute.type}</p>
                  <p className="text-gray-600">{dispute.restaurant} vs {dispute.user}</p>
                  <p className="text-gray-500">#{dispute.id}</p>
                </div>
                <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors" onClick={() => handleReview(dispute.id)}>
                  Review
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Platform Stats */}
      <div className="bg-white rounded-xl shadow-sm p-6">
        <h3 className="mb-6">Platform Health</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-gray-700">Active Restaurants</span>
              <span className="text-green-600">124/127</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-3">
              <div className="bg-green-600 h-3 rounded-full" style={{ width: '97.6%' }}></div>
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-gray-700">User Satisfaction</span>
              <span className="text-blue-600">4.6/5.0</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-3">
              <div className="bg-blue-600 h-3 rounded-full" style={{ width: '92%' }}></div>
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-gray-700">System Uptime</span>
              <span className="text-purple-600">99.9%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-3">
              <div className="bg-purple-600 h-3 rounded-full" style={{ width: '99.9%' }}></div>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
        <button onClick={() => onNavigate('restaurants')} className="bg-white rounded-xl shadow-sm p-6 hover:shadow-lg transition-all text-left">
          <div className="flex items-center gap-4 mb-3">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <Store className="w-6 h-6 text-blue-600" />
            </div>
            <h4>Approve Restaurants</h4>
          </div>
          <p className="text-gray-600">Review and approve pending restaurant applications</p>
        </button>

        <button onClick={() => onNavigate('disputes')} className="bg-white rounded-xl shadow-sm p-6 hover:shadow-lg transition-all text-left">
          <div className="flex items-center gap-4 mb-3">
            <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
              <AlertCircle className="w-6 h-6 text-red-600" />
            </div>
            <h4>Resolve Disputes</h4>
          </div>
          <p className="text-gray-600">Handle customer and restaurant disputes</p>
        </button>

        <button onClick={() => onNavigate('analytics')} className="bg-white rounded-xl shadow-sm p-6 hover:shadow-lg transition-all text-left">
          <div className="flex items-center gap-4 mb-3">
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <CheckCircle className="w-6 h-6 text-green-600" />
            </div>
            <h4>View Analytics</h4>
          </div>
          <p className="text-gray-600">Access platform-wide analytics and reports</p>
        </button>
      </div>
    </div>
  );
}