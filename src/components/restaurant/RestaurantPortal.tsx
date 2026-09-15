import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { RestaurantDashboard } from './RestaurantDashboard';
import { MenuManagement } from './MenuManagement';
import { TableManagement } from './TableManagement';
import { ReservationRules } from './ReservationRules';
import { BookingList } from './BookingList';
import { Analytics } from './Analytics';
import { LayoutDashboard, Menu, Users, Settings, Calendar, BarChart3, LogOut, ArrowLeft, ShieldCheck } from 'lucide-react';
import { useAuthStore } from '../../store/useAuthStore';

export type RestaurantView = 'dashboard' | 'menu' | 'tables' | 'rules' | 'bookings' | 'analytics';

export function RestaurantPortal() {
  const [currentView, setCurrentView] = useState<RestaurantView>('dashboard');
  const navigate = useNavigate();
  const { user, logout } = useAuthStore();

  const navigation = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'bookings', label: 'Bookings', icon: Calendar },
    { id: 'menu', label: 'Menu', icon: Menu },
    { id: 'tables', label: 'Tables', icon: Users },
    { id: 'rules', label: 'Rules', icon: Settings },
    { id: 'analytics', label: 'Analytics', icon: BarChart3 },
  ];

  return (
    <div className="flex min-h-screen bg-gray-50 dark:bg-[#0f0f0f]">
      {/* Sidebar */}
      <aside className="w-64 bg-white dark:bg-[#1a1a1a] shadow-lg fixed h-full overflow-y-auto border-r border-transparent dark:border-[#2a2a2a] flex flex-col justify-between">
        <div>
          <div className="p-6 border-b border-gray-200 dark:border-[#2a2a2a]">
            <h2 className="text-blue-600 dark:text-blue-500 font-[Chivo_Mono]">Restaurant Portal</h2>
            <p className="text-gray-600 dark:text-gray-400">The Burger House</p>
          </div>
          
          <nav className="p-4">
            <ul className="space-y-2">
              {navigation.map((item) => {
                const Icon = item.icon;
                return (
                  <li key={item.id}>
                    <button
                      onClick={() => setCurrentView(item.id as RestaurantView)}
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
          </nav>
        </div>

        {/* Portal Switcher & Session Controls */}
        <div className="p-4 border-t border-gray-200 dark:border-[#2a2a2a] space-y-2 bg-gray-50/50 dark:bg-black/20">
          <div className="px-2 py-1 text-xs text-gray-500 flex items-center justify-between">
            <span>Active Session</span>
            <span className="font-semibold text-blue-500">👨‍🍳 Operator</span>
          </div>

          <button
            onClick={() => navigate('/admin')}
            className="w-full flex items-center gap-2 px-3 py-2 text-xs rounded-lg text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-[#2a2a2a] transition-colors"
          >
            <ShieldCheck className="w-4 h-4 text-amber-500" />
            <span>Admin Portal</span>
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
        {currentView === 'dashboard' && <RestaurantDashboard onNavigate={setCurrentView} />}
        {currentView === 'menu' && <MenuManagement />}
        {currentView === 'tables' && <TableManagement />}
        {currentView === 'rules' && <ReservationRules />}
        {currentView === 'bookings' && <BookingList />}
        {currentView === 'analytics' && <Analytics />}
      </main>
    </div>
  );
}
