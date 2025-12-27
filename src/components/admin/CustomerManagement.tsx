import { useState } from 'react';
import { Search, Eye, Ban } from 'lucide-react';

interface Customer {
  id: string;
  name: string;
  email: string;
  phone: string;
  totalBookings: number;
  cancelledBookings: number;
  joinedDate: string;
  status: 'active' | 'suspended';
}

export function CustomerManagement() {
  const [customers] = useState<Customer[]>([
    {
      id: 'U001',
      name: 'John Doe',
      email: 'john.doe@example.com',
      phone: '+1 234 567 8900',
      totalBookings: 45,
      cancelledBookings: 3,
      joinedDate: '2025-01-15',
      status: 'active',
    },
    {
      id: 'U002',
      name: 'Jane Smith',
      email: 'jane.smith@example.com',
      phone: '+1 234 567 8901',
      totalBookings: 28,
      cancelledBookings: 1,
      joinedDate: '2025-03-22',
      status: 'active',
    },
    {
      id: 'U003',
      name: 'Bob Johnson',
      email: 'bob.johnson@example.com',
      phone: '+1 234 567 8902',
      totalBookings: 12,
      cancelledBookings: 8,
      joinedDate: '2025-05-10',
      status: 'suspended',
    },
  ]);

  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');

  const filteredCustomers = customers.filter(customer => {
    const matchesSearch = customer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         customer.email.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = filterStatus === 'all' || customer.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  return (
    <div>
      <div className="mb-8">
        <h2 className="mb-2">Customer Management</h2>
        <p className="text-gray-600">Manage user accounts and activity</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-white rounded-xl shadow-sm p-4">
          <p className="text-gray-600 mb-1">Total Customers</p>
          <p className="text-blue-600">{customers.length}</p>
        </div>
        <div className="bg-white rounded-xl shadow-sm p-4">
          <p className="text-gray-600 mb-1">Active</p>
          <p className="text-green-600">
            {customers.filter(c => c.status === 'active').length}
          </p>
        </div>
        <div className="bg-white rounded-xl shadow-sm p-4">
          <p className="text-gray-600 mb-1">Suspended</p>
          <p className="text-red-600">
            {customers.filter(c => c.status === 'suspended').length}
          </p>
        </div>
        <div className="bg-white rounded-xl shadow-sm p-4">
          <p className="text-gray-600 mb-1">Avg. Bookings/User</p>
          <p className="text-purple-600">
            {Math.round(customers.reduce((sum, c) => sum + c.totalBookings, 0) / customers.length)}
          </p>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search customers..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="flex gap-2">
            {['all', 'active', 'suspended'].map((status) => (
              <button
                key={status}
                onClick={() => setFilterStatus(status)}
                className={`px-4 py-2 rounded-lg transition-all ${
                  filterStatus === status
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {status.charAt(0).toUpperCase() + status.slice(1)}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Customers Table */}
      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-4 text-left text-gray-700">ID</th>
                <th className="px-6 py-4 text-left text-gray-700">Customer</th>
                <th className="px-6 py-4 text-left text-gray-700">Contact</th>
                <th className="px-6 py-4 text-left text-gray-700">Total Bookings</th>
                <th className="px-6 py-4 text-left text-gray-700">Cancelled</th>
                <th className="px-6 py-4 text-left text-gray-700">Joined</th>
                <th className="px-6 py-4 text-left text-gray-700">Status</th>
                <th className="px-6 py-4 text-left text-gray-700">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredCustomers.map((customer) => (
                <tr key={customer.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <p>{customer.id}</p>
                  </td>
                  <td className="px-6 py-4">
                    <p className="mb-1">{customer.name}</p>
                  </td>
                  <td className="px-6 py-4">
                    <p className="mb-1">{customer.email}</p>
                    <p className="text-gray-600">{customer.phone}</p>
                  </td>
                  <td className="px-6 py-4">
                    <p className="text-blue-600">{customer.totalBookings}</p>
                  </td>
                  <td className="px-6 py-4">
                    <p className={customer.cancelledBookings > 5 ? 'text-red-600' : 'text-gray-600'}>
                      {customer.cancelledBookings}
                    </p>
                  </td>
                  <td className="px-6 py-4">
                    <p>{customer.joinedDate}</p>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 rounded-full ${
                      customer.status === 'active' 
                        ? 'bg-green-100 text-green-700' 
                        : 'bg-red-100 text-red-700'
                    }`}>
                      {customer.status.charAt(0).toUpperCase() + customer.status.slice(1)}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <button className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                        <Eye className="w-4 h-4" />
                      </button>
                      <button className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors">
                        <Ban className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
