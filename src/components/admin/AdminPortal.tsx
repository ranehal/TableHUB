import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { LayoutDashboard, Store, Users, AlertCircle, BarChart3, LogOut, ArrowLeft } from 'lucide-react';
import { useAuthStore } from '../../store/useAuthStore';
import { AdminDashboard } from './AdminDashboard';
import { RestaurantApproval } from './RestaurantApproval';
import { CustomerManagement } from './CustomerManagement';
import { DisputeResolution } from './DisputeResolution';
import { PlatformAnalytics } from './PlatformAnalytics';

export type AdminView = 'dashboard' | 'restaurants' | 'customers' | 'disputes' | 'analytics';

export function AdminPortal() {
  const [currentView, setCurrentView] = useState<AdminView>('dashboard');
  const navigate = useNavigate();
  const logout = useAuthStore((s) => s.logout);

  const navigation = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'restaurants', label: 'Restaurants', icon: Store },
    { id: 'customers', label: 'Customers', icon: Users },
    { id: 'disputes', label: 'Disputes', icon: AlertCircle },
    { id: 'analytics', label: 'Analytics', icon: BarChart3 },
  ];

  return (
    <div className="flex min-h-screen bg-gray-50 dark:bg-[#0f0f0f]">
      {/* Sidebar */}
      <aside className="w-64 bg-white dark:bg-[#1a1a1a] shadow-lg fixed h-full overflow-y-auto border-r border-transparent dark:border-[#2a2a2a] flex flex-col justify-between">
        <div className="p-6 border-b border-gray-200 dark:border-[#2a2a2a]">
          <h2 className="text-blue-600 dark:text-blue-500">Admin Portal</h2>
          <p className="text-gray-600 dark:text-gray-400">Platform Management</p>
        </div>
        
        <div className="flex-1 p-4">
          <ul className="space-y-2">
            {navigation.map((item) => {
              const Icon = item.icon;
              return (
                <li key={item.id}>
                  <button
                    onClick={() => setCurrentView(item.id as AdminView)}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                      currentView === item.id
                        ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400'
                        : 'text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-[#2a2a2a]'
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                    <span>{item.label}</span>
                  </button>
                </li>
              );
            })}
          </ul>
        </div>

        {/* Portal Switcher & Session Controls */}
        <div className="p-4 border-t border-gray-200 dark:border-[#2a2a2a] space-y-2 bg-gray-50/50 dark:bg-black/20">
          <div className="px-2 py-1 text-xs text-gray-500 flex items-center justify-between">
            <span>Active Session</span>
            <span className="font-semibold text-amber-500">👑 Admin</span>
          </div>

          <button
            onClick={() => navigate('/restaurant')}
            className="w-full flex items-center gap-2 px-3 py-2 text-xs rounded-lg text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-[#2a2a2a] transition-colors"
          >
            <Store className="w-4 h-4 text-blue-500" />
            <span>Restaurant Portal</span>
          </button>

          <button
            onClick={() => navigate('/')}
            className="w-full flex items-center gap-2 px-3 py-2 text-xs rounded-lg text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-[#2a2a2a] transition-colors"
          >
            <ArrowLeft className="w-4 h-4 text-emerald-500" />
            <span>Customer View</span>
          </button>

          <button
            onClick={() => {
              logout();
              navigate('/login');
            }}
            className="w-full flex items-center gap-2 px-3 py-2 text-xs rounded-lg text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/30 transition-colors"
          >
            <LogOut className="w-4 h-4" />
            <span>Sign Out</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="ml-64 flex-1 p-8">
        {currentView === 'dashboard' && <AdminDashboard onNavigate={setCurrentView} />}
        {currentView === 'restaurants' && <RestaurantApproval />}
        {currentView === 'customers' && <CustomerManagement />}
        {currentView === 'disputes' && <DisputeResolution />}
        {currentView === 'analytics' && <PlatformAnalytics />}
      </main>
    </div>
  );
}