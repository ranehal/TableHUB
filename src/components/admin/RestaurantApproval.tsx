import { useState } from 'react';
import { Search, Check, X, Eye, Plus, Trash2 } from 'lucide-react';
import { toast } from 'sonner@2.0.3';

interface RestaurantApplication {
  id: string;
  name: string;
  cuisine: string;
  address: string;
  phone: string;
  email: string;
  appliedDate: string;
  status: 'pending' | 'approved' | 'rejected';
  documents: string[];
  description?: string;
  openingHours?: string;
  priceRange?: string;
}

interface DeletionRequest {
  id: string;
  restaurantId: string;
  restaurantName: string;
  ownerName: string;
  requestDate: string;
  reason: string;
  status: 'pending' | 'approved' | 'rejected';
}

export function RestaurantApproval() {
  const [applications, setApplications] = useState<RestaurantApplication[]>([
    {
      id: 'R001',
      name: 'Dhaka Biryani House',
      cuisine: 'Bangladeshi',
      address: '321 Gulshan Avenue, Dhaka',
      phone: '+880 1712-345678',
      email: 'contact@dhakabiryani.com',
      appliedDate: '2025-11-22',
      status: 'pending',
      documents: ['Business License', 'Health Certificate', 'Insurance'],
      description: 'Authentic Bangladeshi biryani and traditional cuisine',
      openingHours: '11:00 AM - 11:00 PM',
      priceRange: '$$',
    },
    {
      id: 'R002',
      name: 'Khana Khazana',
      cuisine: 'Mughlai',
      address: '555 Banani Road, Dhaka',
      phone: '+880 1723-456789',
      email: 'info@khanakhazana.com',
      appliedDate: '2025-11-23',
      status: 'pending',
      documents: ['Business License', 'Health Certificate'],
      description: 'Royal Mughlai cuisine in elegant setting',
      openingHours: '12:00 PM - 12:00 AM',
      priceRange: '$$$',
    },
    {
      id: 'R003',
      name: 'Nanna Biriyani',
      cuisine: 'Bangladeshi',
      address: '123 Dhanmondi, Dhaka',
      phone: '+880 1734-567890',
      email: 'hello@nannabiriyani.com',
      appliedDate: '2025-11-15',
      status: 'approved',
      documents: ['Business License', 'Health Certificate', 'Insurance'],
      description: 'Traditional Dhaka-style biryani',
      openingHours: '11:00 AM - 10:00 PM',
      priceRange: '$$',
    },
  ]);

  const [deletionRequests, setDeletionRequests] = useState<DeletionRequest[]>([
    {
      id: 'D001',
      restaurantId: 'R005',
      restaurantName: 'Star Kabab',
      ownerName: 'Karim Rahman',
      requestDate: '2025-11-25',
      reason: 'Relocating business to new city',
      status: 'pending',
    },
    {
      id: 'D002',
      restaurantId: 'R007',
      restaurantName: 'Fusion Delight',
      ownerName: 'Fatima Ahmed',
      requestDate: '2025-11-20',
      reason: 'Closing down due to lease expiration',
      status: 'pending',
    },
  ]);

  const [filterStatus, setFilterStatus] = useState('all');
  const [selectedApp, setSelectedApp] = useState<RestaurantApplication | null>(null);
  const [selectedDeletion, setSelectedDeletion] = useState<DeletionRequest | null>(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [activeTab, setActiveTab] = useState<'applications' | 'deletions'>('applications');

  const [newRestaurant, setNewRestaurant] = useState({
    name: '',
    cuisine: '',
    address: '',
    phone: '',
    email: '',
    description: '',
    openingHours: '',
    priceRange: '$$',
  });

  const handleApprove = (id: string) => {
    setApplications(applications.map(app => 
      app.id === id ? { ...app, status: 'approved' as const } : app
    ));
    toast.success('Restaurant application approved!');
    setSelectedApp(null);
  };

  const handleReject = (id: string) => {
    setApplications(applications.map(app => 
      app.id === id ? { ...app, status: 'rejected' as const } : app
    ));
    toast.error('Restaurant application rejected!');
    setSelectedApp(null);
  };

  const handleApproveDeletion = (id: string) => {
    setDeletionRequests(deletionRequests.map(req => 
      req.id === id ? { ...req, status: 'approved' as const } : req
    ));
    toast.success('Restaurant deletion approved!');
    setSelectedDeletion(null);
  };

  const handleRejectDeletion = (id: string) => {
    setDeletionRequests(deletionRequests.map(req => 
      req.id === id ? { ...req, status: 'rejected' as const } : req
    ));
    toast.error('Restaurant deletion rejected!');
    setSelectedDeletion(null);
  };

  const handleAddRestaurant = () => {
    const newApp: RestaurantApplication = {
      id: `R${(applications.length + 1).toString().padStart(3, '0')}`,
      ...newRestaurant,
      appliedDate: new Date().toISOString().split('T')[0],
      status: 'approved',
      documents: ['Admin Added'],
    };
    setApplications([...applications, newApp]);
    setShowAddModal(false);
    setNewRestaurant({
      name: '',
      cuisine: '',
      address: '',
      phone: '',
      email: '',
      description: '',
      openingHours: '',
      priceRange: '$$',
    });
    toast.success('Restaurant added successfully!');
  };

  const filteredApps = applications.filter(app => 
    filterStatus === 'all' || app.status === filterStatus
  );

  const filteredDeletions = deletionRequests.filter(req => 
    filterStatus === 'all' || req.status === filterStatus
  );

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="mb-2">Restaurant Management</h2>
          <p className="text-gray-600">Manage restaurant applications and deletion requests</p>
        </div>
        <button
          onClick={() => setShowAddModal(true)}
          className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          <Plus className="w-5 h-5" />
          Add Restaurant
        </button>
      </div>

      {/* Tabs */}
      <div className="flex gap-4 mb-6">
        <button
          onClick={() => setActiveTab('applications')}
          className={`px-6 py-3 rounded-lg transition-all ${
            activeTab === 'applications'
              ? 'bg-blue-600 text-white'
              : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-200'
          }`}
        >
          Applications ({applications.filter(a => a.status === 'pending').length} pending)
        </button>
        <button
          onClick={() => setActiveTab('deletions')}
          className={`px-6 py-3 rounded-lg transition-all ${
            activeTab === 'deletions'
              ? 'bg-blue-600 text-white'
              : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-200'
          }`}
        >
          Deletion Requests ({deletionRequests.filter(d => d.status === 'pending').length} pending)
        </button>
      </div>

      {/* Applications Tab */}
      {activeTab === 'applications' && (
        <>
          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <div className="bg-white rounded-xl shadow-sm p-4">
              <p className="text-gray-600 mb-1">Total Applications</p>
              <p className="text-blue-600">{applications.length}</p>
            </div>
            <div className="bg-white rounded-xl shadow-sm p-4">
              <p className="text-gray-600 mb-1">Pending</p>
              <p className="text-yellow-600">
                {applications.filter(a => a.status === 'pending').length}
              </p>
            </div>
            <div className="bg-white rounded-xl shadow-sm p-4">
              <p className="text-gray-600 mb-1">Approved</p>
              <p className="text-green-600">
                {applications.filter(a => a.status === 'approved').length}
              </p>
            </div>
            <div className="bg-white rounded-xl shadow-sm p-4">
              <p className="text-gray-600 mb-1">Rejected</p>
              <p className="text-red-600">
                {applications.filter(a => a.status === 'rejected').length}
              </p>
            </div>
          </div>

          {/* Filters */}
          <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
            <div className="flex gap-4">
              {['all', 'pending', 'approved', 'rejected'].map((status) => (
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

          {/* Applications Table */}
          <div className="bg-white rounded-xl shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="px-6 py-4 text-left text-gray-700">ID</th>
                    <th className="px-6 py-4 text-left text-gray-700">Restaurant</th>
                    <th className="px-6 py-4 text-left text-gray-700">Contact</th>
                    <th className="px-6 py-4 text-left text-gray-700">Applied Date</th>
                    <th className="px-6 py-4 text-left text-gray-700">Documents</th>
                    <th className="px-6 py-4 text-left text-gray-700">Status</th>
                    <th className="px-6 py-4 text-left text-gray-700">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {filteredApps.map((app) => (
                    <tr key={app.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4">
                        <p>{app.id}</p>
                      </td>
                      <td className="px-6 py-4">
                        <p className="mb-1">{app.name}</p>
                        <p className="text-gray-600">{app.cuisine}</p>
                        <p className="text-gray-500">{app.address}</p>
                      </td>
                      <td className="px-6 py-4">
                        <p className="mb-1">{app.phone}</p>
                        <p className="text-gray-600">{app.email}</p>
                      </td>
                      <td className="px-6 py-4">
                        <p>{app.appliedDate}</p>
                      </td>
                      <td className="px-6 py-4">
                        <p className="text-gray-700">{app.documents.length} files</p>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`px-3 py-1 rounded-full ${
                          app.status === 'pending' ? 'bg-yellow-100 text-yellow-700' :
                          app.status === 'approved' ? 'bg-green-100 text-green-700' :
                          'bg-red-100 text-red-700'
                        }`}>
                          {app.status.charAt(0).toUpperCase() + app.status.slice(1)}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <button 
                            onClick={() => setSelectedApp(app)}
                            className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                          >
                            <Eye className="w-4 h-4" />
                          </button>
                          {app.status === 'pending' && (
                            <>
                              <button className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors" onClick={() => handleApprove(app.id)}>
                                <Check className="w-4 h-4" />
                              </button>
                              <button className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors" onClick={() => handleReject(app.id)}>
                                <X className="w-4 h-4" />
                              </button>
                            </>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </>
      )}

      {/* Deletions Tab */}
      {activeTab === 'deletions' && (
        <>
          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <div className="bg-white rounded-xl shadow-sm p-4">
              <p className="text-gray-600 mb-1">Total Requests</p>
              <p className="text-blue-600">{deletionRequests.length}</p>
            </div>
            <div className="bg-white rounded-xl shadow-sm p-4">
              <p className="text-gray-600 mb-1">Pending</p>
              <p className="text-yellow-600">
                {deletionRequests.filter(d => d.status === 'pending').length}
              </p>
            </div>
            <div className="bg-white rounded-xl shadow-sm p-4">
              <p className="text-gray-600 mb-1">Approved</p>
              <p className="text-green-600">
                {deletionRequests.filter(d => d.status === 'approved').length}
              </p>
            </div>
            <div className="bg-white rounded-xl shadow-sm p-4">
              <p className="text-gray-600 mb-1">Rejected</p>
              <p className="text-red-600">
                {deletionRequests.filter(d => d.status === 'rejected').length}
              </p>
            </div>
          </div>

          {/* Filters */}
          <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
            <div className="flex gap-4">
              {['all', 'pending', 'approved', 'rejected'].map((status) => (
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

          {/* Deletion Requests Table */}
          <div className="bg-white rounded-xl shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="px-6 py-4 text-left text-gray-700">Request ID</th>
                    <th className="px-6 py-4 text-left text-gray-700">Restaurant</th>
                    <th className="px-6 py-4 text-left text-gray-700">Owner</th>
                    <th className="px-6 py-4 text-left text-gray-700">Request Date</th>
                    <th className="px-6 py-4 text-left text-gray-700">Reason</th>
                    <th className="px-6 py-4 text-left text-gray-700">Status</th>
                    <th className="px-6 py-4 text-left text-gray-700">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {filteredDeletions.map((req) => (
                    <tr key={req.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4">
                        <p>{req.id}</p>
                      </td>
                      <td className="px-6 py-4">
                        <p className="mb-1">{req.restaurantName}</p>
                        <p className="text-gray-500 text-sm">ID: {req.restaurantId}</p>
                      </td>
                      <td className="px-6 py-4">
                        <p>{req.ownerName}</p>
                      </td>
                      <td className="px-6 py-4">
                        <p>{req.requestDate}</p>
                      </td>
                      <td className="px-6 py-4">
                        <p className="text-gray-700 max-w-xs truncate">{req.reason}</p>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`px-3 py-1 rounded-full ${
                          req.status === 'pending' ? 'bg-yellow-100 text-yellow-700' :
                          req.status === 'approved' ? 'bg-green-100 text-green-700' :
                          'bg-red-100 text-red-700'
                        }`}>
                          {req.status.charAt(0).toUpperCase() + req.status.slice(1)}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <button 
                            onClick={() => setSelectedDeletion(req)}
                            className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                          >
                            <Eye className="w-4 h-4" />
                          </button>
                          {req.status === 'pending' && (
                            <>
                              <button className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors" onClick={() => handleApproveDeletion(req.id)}>
                                <Check className="w-4 h-4" />
                              </button>
                              <button className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors" onClick={() => handleRejectDeletion(req.id)}>
                                <X className="w-4 h-4" />
                              </button>
                            </>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </>
      )}

      {/* Add Restaurant Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="border-b border-gray-200 px-6 py-4 flex items-center justify-between">
              <h3>Add New Restaurant</h3>
              <button onClick={() => setShowAddModal(false)} className="text-gray-500 hover:text-gray-700">
                ✕
              </button>
            </div>
            
            <div className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-700 mb-2">Restaurant Name</label>
                  <input
                    type="text"
                    value={newRestaurant.name}
                    onChange={(e) => setNewRestaurant({ ...newRestaurant, name: e.target.value })}
                    placeholder="e.g., Handi Restaurant"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-gray-700 mb-2">Cuisine Type</label>
                  <input
                    type="text"
                    value={newRestaurant.cuisine}
                    onChange={(e) => setNewRestaurant({ ...newRestaurant, cuisine: e.target.value })}
                    placeholder="e.g., Bangladeshi"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-gray-700 mb-2">Address</label>
                <input
                  type="text"
                  value={newRestaurant.address}
                  onChange={(e) => setNewRestaurant({ ...newRestaurant, address: e.target.value })}
                  placeholder="e.g., 123 Gulshan Avenue, Dhaka"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-700 mb-2">Phone</label>
                  <input
                    type="text"
                    value={newRestaurant.phone}
                    onChange={(e) => setNewRestaurant({ ...newRestaurant, phone: e.target.value })}
                    placeholder="+880 1712-345678"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-gray-700 mb-2">Email</label>
                  <input
                    type="email"
                    value={newRestaurant.email}
                    onChange={(e) => setNewRestaurant({ ...newRestaurant, email: e.target.value })}
                    placeholder="contact@restaurant.com"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-gray-700 mb-2">Description</label>
                <textarea
                  value={newRestaurant.description}
                  onChange={(e) => setNewRestaurant({ ...newRestaurant, description: e.target.value })}
                  placeholder="Brief description of the restaurant"
                  rows={3}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-700 mb-2">Opening Hours</label>
                  <input
                    type="text"
                    value={newRestaurant.openingHours}
                    onChange={(e) => setNewRestaurant({ ...newRestaurant, openingHours: e.target.value })}
                    placeholder="11:00 AM - 11:00 PM"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-gray-700 mb-2">Price Range</label>
                  <select
                    value={newRestaurant.priceRange}
                    onChange={(e) => setNewRestaurant({ ...newRestaurant, priceRange: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="$">$ - Budget Friendly</option>
                    <option value="$$">$$ - Moderate</option>
                    <option value="$$$">$$$ - Premium</option>
                    <option value="$$$$">$$$$ - Fine Dining</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="border-t border-gray-200 px-6 py-4 flex gap-4">
              <button
                onClick={() => setShowAddModal(false)}
                className="flex-1 px-6 py-2 border-2 border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleAddRestaurant}
                disabled={!newRestaurant.name || !newRestaurant.cuisine || !newRestaurant.address || !newRestaurant.phone || !newRestaurant.email}
                className="flex-1 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
              >
                Add Restaurant
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Application Detail Modal */}
      {selectedApp && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="border-b border-gray-200 px-6 py-4 flex items-center justify-between">
              <h3>Application Details</h3>
              <button onClick={() => setSelectedApp(null)} className="text-gray-500 hover:text-gray-700">
                ✕
              </button>
            </div>
            
            <div className="p-6 space-y-6">
              <div>
                <h4 className="mb-4">Restaurant Information</h4>
                <div className="grid grid-cols-2 gap-4 bg-gray-50 rounded-lg p-4">
                  <div>
                    <p className="text-gray-600 mb-1">Name</p>
                    <p>{selectedApp.name}</p>
                  </div>
                  <div>
                    <p className="text-gray-600 mb-1">Cuisine Type</p>
                    <p>{selectedApp.cuisine}</p>
                  </div>
                  <div className="col-span-2">
                    <p className="text-gray-600 mb-1">Address</p>
                    <p>{selectedApp.address}</p>
                  </div>
                  <div>
                    <p className="text-gray-600 mb-1">Phone</p>
                    <p>{selectedApp.phone}</p>
                  </div>
                  <div>
                    <p className="text-gray-600 mb-1">Email</p>
                    <p>{selectedApp.email}</p>
                  </div>
                  {selectedApp.description && (
                    <div className="col-span-2">
                      <p className="text-gray-600 mb-1">Description</p>
                      <p>{selectedApp.description}</p>
                    </div>
                  )}
                  {selectedApp.openingHours && (
                    <div>
                      <p className="text-gray-600 mb-1">Opening Hours</p>
                      <p>{selectedApp.openingHours}</p>
                    </div>
                  )}
                  {selectedApp.priceRange && (
                    <div>
                      <p className="text-gray-600 mb-1">Price Range</p>
                      <p>{selectedApp.priceRange}</p>
                    </div>
                  )}
                </div>
              </div>

              <div>
                <h4 className="mb-4">Submitted Documents</h4>
                <div className="space-y-2">
                  {selectedApp.documents.map((doc, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <span>{doc}</span>
                      <button className="text-blue-600 hover:text-blue-700">View</button>
                    </div>
                  ))}
                </div>
              </div>

              {selectedApp.status === 'pending' && (
                <div className="flex gap-4">
                  <button className="flex-1 px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors" onClick={() => handleApprove(selectedApp.id)}>
                    Approve Application
                  </button>
                  <button className="flex-1 px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors" onClick={() => handleReject(selectedApp.id)}>
                    Reject Application
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Deletion Detail Modal */}
      {selectedDeletion && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="border-b border-gray-200 px-6 py-4 flex items-center justify-between">
              <h3>Deletion Request Details</h3>
              <button onClick={() => setSelectedDeletion(null)} className="text-gray-500 hover:text-gray-700">
                ✕
              </button>
            </div>
            
            <div className="p-6 space-y-6">
              <div>
                <h4 className="mb-4">Request Information</h4>
                <div className="grid grid-cols-2 gap-4 bg-gray-50 rounded-lg p-4">
                  <div>
                    <p className="text-gray-600 mb-1">Request ID</p>
                    <p>{selectedDeletion.id}</p>
                  </div>
                  <div>
                    <p className="text-gray-600 mb-1">Request Date</p>
                    <p>{selectedDeletion.requestDate}</p>
                  </div>
                  <div>
                    <p className="text-gray-600 mb-1">Restaurant ID</p>
                    <p>{selectedDeletion.restaurantId}</p>
                  </div>
                  <div>
                    <p className="text-gray-600 mb-1">Restaurant Name</p>
                    <p>{selectedDeletion.restaurantName}</p>
                  </div>
                  <div>
                    <p className="text-gray-600 mb-1">Owner Name</p>
                    <p>{selectedDeletion.ownerName}</p>
                  </div>
                  <div>
                    <p className="text-gray-600 mb-1">Status</p>
                    <span className={`px-3 py-1 rounded-full ${
                      selectedDeletion.status === 'pending' ? 'bg-yellow-100 text-yellow-700' :
                      selectedDeletion.status === 'approved' ? 'bg-green-100 text-green-700' :
                      'bg-red-100 text-red-700'
                    }`}>
                      {selectedDeletion.status.charAt(0).toUpperCase() + selectedDeletion.status.slice(1)}
                    </span>
                  </div>
                  <div className="col-span-2">
                    <p className="text-gray-600 mb-1">Reason for Deletion</p>
                    <p>{selectedDeletion.reason}</p>
                  </div>
                </div>
              </div>

              <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                <p className="text-red-700">
                  ⚠️ Warning: Approving this request will permanently remove the restaurant from the platform. 
                  All associated bookings, reviews, and data will be archived.
                </p>
              </div>

              {selectedDeletion.status === 'pending' && (
                <div className="flex gap-4">
                  <button className="flex-1 px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors" onClick={() => handleApproveDeletion(selectedDeletion.id)}>
                    Approve Deletion
                  </button>
                  <button className="flex-1 px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors" onClick={() => handleRejectDeletion(selectedDeletion.id)}>
                    Reject Request
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
