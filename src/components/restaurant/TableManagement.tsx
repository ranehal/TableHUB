import { useState } from 'react';
import { Plus, Edit2, Trash2, Users, Eye } from 'lucide-react';
import { toast } from 'sonner@2.0.3';

interface Table {
  id: string;
  type: 2 | 3 | 4 | 6 | 8;
  quantity: number;
  available: number;
  description: string;
  image: string;
  isWindowSide: boolean;
}

export function TableManagement() {
  const [tables, setTables] = useState<Table[]>([
    { 
      id: '1', 
      type: 2, 
      quantity: 8, 
      available: 5,
      description: 'Window Seat - Perfect for intimate dining with city views',
      image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=400&h=300&fit=crop',
      isWindowSide: true
    },
    { 
      id: '2', 
      type: 3, 
      quantity: 6, 
      available: 3,
      description: 'Corner Table - Cozy seating in quiet corners',
      image: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=400&h=300&fit=crop',
      isWindowSide: false
    },
    { 
      id: '3', 
      type: 4, 
      quantity: 10, 
      available: 7,
      description: 'Main Hall - Standard dining tables in the main area',
      image: 'https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?w=400&h=300&fit=crop',
      isWindowSide: false
    },
    { 
      id: '4', 
      type: 6, 
      quantity: 4, 
      available: 2,
      description: 'Private Booth - Semi-private seating with dividers',
      image: 'https://images.unsplash.com/photo-1551218808-94e220e084d2?w=400&h=300&fit=crop',
      isWindowSide: false
    },
    { 
      id: '5', 
      type: 4, 
      quantity: 5, 
      available: 3,
      description: 'Window View Tables - Enjoy beautiful outdoor views while dining',
      image: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=400&h=300&fit=crop',
      isWindowSide: true
    },
  ]);

  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showPreviewModal, setShowPreviewModal] = useState(false);
  const [selectedTable, setSelectedTable] = useState<Table | null>(null);
  const [formData, setFormData] = useState({
    type: '2',
    quantity: '1',
    description: '',
    image: '',
    isWindowSide: false,
  });

  const totalCapacity = tables.reduce((sum, table) => sum + (table.type * table.quantity), 0);
  const availableSeats = tables.reduce((sum, table) => sum + (table.type * table.available), 0);

  const handleEdit = (table: Table) => {
    setSelectedTable(table);
    setFormData({
      type: table.type.toString(),
      quantity: table.quantity.toString(),
      description: table.description,
      image: table.image,
      isWindowSide: table.isWindowSide,
    });
    setShowEditModal(true);
  };

  const handleDelete = (id: string) => {
    setTables(tables.filter(t => t.id !== id));
    toast.error('Table type deleted!');
  };

  const handlePreview = (table: Table) => {
    setSelectedTable(table);
    setShowPreviewModal(true);
  };

  const handleAddTable = () => {
    const newTable: Table = {
      id: Date.now().toString(),
      type: parseInt(formData.type) as 2 | 3 | 4 | 6 | 8,
      quantity: parseInt(formData.quantity),
      available: parseInt(formData.quantity),
      description: formData.description,
      image: formData.image,
      isWindowSide: formData.isWindowSide,
    };
    setTables([...tables, newTable]);
    setShowAddModal(false);
    setFormData({ type: '2', quantity: '1', description: '', image: '', isWindowSide: false });
    toast.success('New table type added!');
  };

  const handleUpdateTable = () => {
    if (selectedTable) {
      setTables(tables.map(t => 
        t.id === selectedTable.id 
          ? {
              ...t,
              type: parseInt(formData.type) as 2 | 3 | 4 | 6 | 8,
              quantity: parseInt(formData.quantity),
              description: formData.description,
              image: formData.image,
              isWindowSide: formData.isWindowSide,
            }
          : t
      ));
      setShowEditModal(false);
      setSelectedTable(null);
      toast.success('Table type updated!');
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="mb-2">Table & Seat Management</h2>
          <p className="text-gray-600">Manage your restaurant's seating capacity</p>
        </div>
        <button
          onClick={() => setShowAddModal(true)}
          className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          <Plus className="w-5 h-5" />
          Add Table Type
        </button>
      </div>

      {/* Capacity Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <Users className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <p className="text-gray-600">Total Capacity</p>
              <p className="text-blue-600">{totalCapacity} seats</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <Users className="w-6 h-6 text-green-600" />
            </div>
            <div>
              <p className="text-gray-600">Available Seats</p>
              <p className="text-green-600">{availableSeats} seats</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
              <Users className="w-6 h-6 text-red-600" />
            </div>
            <div>
              <p className="text-gray-600">Occupied Seats</p>
              <p className="text-red-600">{totalCapacity - availableSeats} seats</p>
            </div>
          </div>
        </div>
      </div>

      {/* Tables Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {tables.map((table) => (
          <div key={table.id} className="bg-white rounded-xl shadow-sm overflow-hidden">
            {/* Table Image */}
            <div className="relative h-48 overflow-hidden">
              <img 
                src={table.image} 
                alt={table.description}
                className="w-full h-full object-cover"
              />
              <div className="absolute top-3 right-3 bg-blue-600 text-white px-3 py-1 rounded-full">
                {table.type}-Seat
              </div>
            </div>

            <div className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <h4 className="mb-2">{table.type}-Seat Tables</h4>
                  <p className="text-gray-600 text-sm mb-3 line-clamp-2">{table.description}</p>
                  <p className="text-gray-600 text-sm">Capacity: {table.type * table.quantity} seats</p>
                </div>
              </div>

              <div className="space-y-3 mb-4">
                <div className="flex items-center justify-between">
                  <span className="text-gray-700">Total Tables</span>
                  <span className="text-blue-600">{table.quantity}</span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-gray-700">Available</span>
                  <span className="text-green-600">{table.available}</span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-gray-700">Occupied</span>
                  <span className="text-red-600">{table.quantity - table.available}</span>
                </div>

                <div className="pt-3 border-t border-gray-200">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-gray-600 text-sm">Occupancy Rate</span>
                    <span className="text-gray-600 text-sm">
                      {Math.round(((table.quantity - table.available) / table.quantity) * 100)}%
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-blue-600 h-2 rounded-full transition-all"
                      style={{ 
                        width: `${((table.quantity - table.available) / table.quantity) * 100}%` 
                      }}
                    ></div>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2 pt-4 border-t border-gray-200">
                <button 
                  onClick={() => handlePreview(table)}
                  className="flex-1 p-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors flex items-center justify-center gap-1"
                >
                  <Eye className="w-4 h-4" />
                  Preview
                </button>
                <button 
                  onClick={() => handleEdit(table)}
                  className="flex-1 p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors flex items-center justify-center gap-1"
                >
                  <Edit2 className="w-4 h-4" />
                  Edit
                </button>
                <button 
                  onClick={() => handleDelete(table.id)}
                  className="flex-1 p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors flex items-center justify-center gap-1"
                >
                  <Trash2 className="w-4 h-4" />
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Time Slots */}
      <div className="bg-white rounded-xl shadow-sm p-6">
        <h3 className="mb-6">Available Time Slots</h3>
        <p className="text-gray-600 mb-4">Configure which time slots are available for booking</p>
        
        <div className="grid grid-cols-4 md:grid-cols-8 gap-3">
          {['11:00', '12:00', '13:00', '14:00', '17:00', '18:00', '19:00', '20:00', '21:00'].map((time) => (
            <button
              key={time}
              className="px-4 py-3 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors"
            >
              {time}
            </button>
          ))}
        </div>

        <button className="mt-6 px-6 py-2 border-2 border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
          Manage Time Slots
        </button>
      </div>

      {/* Add Table Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="border-b border-gray-200 px-6 py-4 flex items-center justify-between">
              <h3>Add Table Type</h3>
              <button onClick={() => setShowAddModal(false)} className="text-gray-500 hover:text-gray-700">
                ✕
              </button>
            </div>
            
            <div className="p-6 space-y-4">
              <div>
                <label className="block text-gray-700 mb-2">Table Type (Seats)</label>
                <select 
                  value={formData.type}
                  onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="2">2-Seat Table</option>
                  <option value="3">3-Seat Table</option>
                  <option value="4">4-Seat Table</option>
                  <option value="6">6-Seat Table</option>
                  <option value="8">8-Seat Table</option>
                </select>
              </div>

              <div>
                <label className="block text-gray-700 mb-2">Quantity</label>
                <input
                  type="number"
                  min="1"
                  value={formData.quantity}
                  onChange={(e) => setFormData({ ...formData, quantity: e.target.value })}
                  placeholder="How many tables?"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-gray-700 mb-2">Description</label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="e.g., Window Seat - Perfect for intimate dining with city views"
                  rows={3}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-gray-700 mb-2">Table Image URL</label>
                <input
                  type="text"
                  value={formData.image}
                  onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                  placeholder="https://images.unsplash.com/..."
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                {formData.image && (
                  <div className="mt-3">
                    <p className="text-gray-600 text-sm mb-2">Preview:</p>
                    <img 
                      src={formData.image} 
                      alt="Preview"
                      className="w-full h-48 object-cover rounded-lg"
                    />
                  </div>
                )}
              </div>

              <div>
                <label className="block text-gray-700 mb-2">Is Window Side?</label>
                <input
                  type="checkbox"
                  checked={formData.isWindowSide}
                  onChange={(e) => setFormData({ ...formData, isWindowSide: e.target.checked })}
                  className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2"
                />
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
                onClick={handleAddTable}
                disabled={!formData.quantity || !formData.description || !formData.image}
                className="flex-1 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
              >
                Add Tables
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Table Modal */}
      {showEditModal && selectedTable && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="border-b border-gray-200 px-6 py-4 flex items-center justify-between">
              <h3>Edit Table Type</h3>
              <button onClick={() => setShowEditModal(false)} className="text-gray-500 hover:text-gray-700">
                ✕
              </button>
            </div>
            
            <div className="p-6 space-y-4">
              <div>
                <label className="block text-gray-700 mb-2">Table Type (Seats)</label>
                <select 
                  value={formData.type}
                  onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="2">2-Seat Table</option>
                  <option value="3">3-Seat Table</option>
                  <option value="4">4-Seat Table</option>
                  <option value="6">6-Seat Table</option>
                  <option value="8">8-Seat Table</option>
                </select>
              </div>

              <div>
                <label className="block text-gray-700 mb-2">Quantity</label>
                <input
                  type="number"
                  min="1"
                  value={formData.quantity}
                  onChange={(e) => setFormData({ ...formData, quantity: e.target.value })}
                  placeholder="How many tables?"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-gray-700 mb-2">Description</label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="e.g., Window Seat - Perfect for intimate dining with city views"
                  rows={3}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-gray-700 mb-2">Table Image URL</label>
                <input
                  type="text"
                  value={formData.image}
                  onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                  placeholder="https://images.unsplash.com/..."
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                {formData.image && (
                  <div className="mt-3">
                    <p className="text-gray-600 text-sm mb-2">Preview:</p>
                    <img 
                      src={formData.image} 
                      alt="Preview"
                      className="w-full h-48 object-cover rounded-lg"
                    />
                  </div>
                )}
              </div>

              <div>
                <label className="block text-gray-700 mb-2">Is Window Side?</label>
                <input
                  type="checkbox"
                  checked={formData.isWindowSide}
                  onChange={(e) => setFormData({ ...formData, isWindowSide: e.target.checked })}
                  className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2"
                />
              </div>
            </div>

            <div className="border-t border-gray-200 px-6 py-4 flex gap-4">
              <button
                onClick={() => setShowEditModal(false)}
                className="flex-1 px-6 py-2 border-2 border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleUpdateTable}
                disabled={!formData.quantity || !formData.description || !formData.image}
                className="flex-1 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
              >
                Update Table
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Preview Modal */}
      {showPreviewModal && selectedTable && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-md w-full">
            <div className="border-b border-gray-200 px-6 py-4 flex items-center justify-between">
              <h3>Table Preview</h3>
              <button onClick={() => setShowPreviewModal(false)} className="text-gray-500 hover:text-gray-700">
                ✕
              </button>
            </div>
            
            <div className="p-6">
              <div className="mb-4">
                <img 
                  src={selectedTable.image} 
                  alt={selectedTable.description}
                  className="w-full h-64 object-cover rounded-lg"
                />
              </div>
              <div className="bg-blue-50 text-blue-700 px-4 py-2 rounded-lg text-center mb-4">
                {selectedTable.type}-Seat Table
              </div>
              <p className="text-gray-700 mb-4">{selectedTable.description}</p>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Total Tables:</span>
                  <span className="text-blue-600">{selectedTable.quantity}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Available Now:</span>
                  <span className="text-green-600">{selectedTable.available}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Total Capacity:</span>
                  <span className="text-gray-700">{selectedTable.type * selectedTable.quantity} seats</span>
                </div>
              </div>
            </div>

            <div className="border-t border-gray-200 px-6 py-4">
              <button
                onClick={() => setShowPreviewModal(false)}
                className="w-full px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}