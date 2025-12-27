import { useState } from 'react';
import { LayoutDashboard, Store, Users, AlertCircle, BarChart3 } from 'lucide-react';
import { AdminDashboard } from './AdminDashboard';
import { RestaurantApproval } from './RestaurantApproval';
import { CustomerManagement } from './CustomerManagement';
import { DisputeResolution } from './DisputeResolution';
import { PlatformAnalytics } from './PlatformAnalytics';

export type AdminView = 'dashboard' | 'restaurants' | 'customers' | 'disputes' | 'analytics';

export function AdminPortal() {
  const [currentView, setCurrentView] = useState<AdminView>('dashboard');

  const navigation = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'restaurants', label: 'Restaurants', icon: Store },
    { id: 'customers', label: 'Customers', icon: Users },
    { id: 'disputes', label: 'Disputes', icon: AlertCircle },
    { id: 'analytics', label: 'Analytics', icon: BarChart3 },
  ];

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-lg fixed h-full overflow-y-auto">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-blue-600">Admin Portal</h2>
          <p className="text-gray-600">Platform Management</p>
        </div>
        
        <nav className="p-4">
          <ul className="space-y-2">
            {navigation.map((item) => {
              const Icon = item.icon;
              return (
                <li key={item.id}>
                  <button
                    onClick={() => setCurrentView(item.id as AdminView)}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                      currentView === item.id
                        ? 'bg-blue-50 text-blue-600'
                        : 'text-gray-700 hover:bg-gray-50'
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