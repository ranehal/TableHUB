import { useState } from 'react';
import { motion } from 'framer-motion';
import { AlertCircle, CheckCircle, XCircle } from 'lucide-react';

interface Dispute {
  id: string;
  type: string;
  restaurant: string;
  customer: string;
  description: string;
  date: string;
  status: 'open' | 'resolved' | 'rejected';
  amount?: number;
}

export function DisputeResolution() {
  const [disputes] = useState<Dispute[]>([
    {
      id: 'D001',
      type: 'Late Cancellation',
      restaurant: 'The Burger House',
      customer: 'John Doe',
      description: 'Customer cancelled 30 minutes before reservation without valid reason. Requesting penalty fee.',
      date: '2025-11-23',
      status: 'open',
      amount: 10,
    },
    {
      id: 'D002',
      type: 'Service Issue',
      restaurant: 'Pizza Paradise',
      customer: 'Jane Smith',
      description: 'Customer claims table was not ready despite confirmed booking. Requesting refund.',
      date: '2025-11-22',
      status: 'open',
      amount: 15,
    },
    {
      id: 'D003',
      type: 'No-Show Dispute',
      restaurant: 'Biryani Palace',
      customer: 'Bob Johnson',
      description: 'Restaurant claims customer did not show up. Customer states they arrived within grace period.',
      date: '2025-11-21',
      status: 'resolved',
      amount: 12,
    },
  ]);

  const [selectedDispute, setSelectedDispute] = useState<Dispute | null>(null);

  return (
    <div>
      <div className="mb-8">
        <h2 className="mb-2">Dispute Resolution</h2>
        <p className="text-gray-600">Handle and resolve customer-restaurant disputes</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-white rounded-xl shadow-sm p-4">
          <p className="text-gray-600 mb-1">Total Disputes</p>
          <p className="text-blue-600">{disputes.length}</p>
        </div>
        <div className="bg-white rounded-xl shadow-sm p-4">
          <p className="text-gray-600 mb-1">Open</p>
          <p className="text-yellow-600">
            {disputes.filter(d => d.status === 'open').length}
          </p>
        </div>
        <div className="bg-white rounded-xl shadow-sm p-4">
          <p className="text-gray-600 mb-1">Resolved</p>
          <p className="text-green-600">
            {disputes.filter(d => d.status === 'resolved').length}
          </p>
        </div>
        <div className="bg-white rounded-xl shadow-sm p-4">
          <p className="text-gray-600 mb-1">Rejected</p>
          <p className="text-red-600">
            {disputes.filter(d => d.status === 'rejected').length}
          </p>
        </div>
      </div>

      {/* Disputes List */}
      <div className="space-y-4">
        {disputes.map((dispute) => (
          <div key={dispute.id} className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-start gap-4">
                <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${
                  dispute.status === 'open' ? 'bg-yellow-100' :
                  dispute.status === 'resolved' ? 'bg-green-100' :
                  'bg-red-100'
                }`}>
                  {dispute.status === 'open' ? <AlertCircle className="w-6 h-6 text-yellow-600" /> :
                   dispute.status === 'resolved' ? <CheckCircle className="w-6 h-6 text-green-600" /> :
                   <XCircle className="w-6 h-6 text-red-600" />}
                </div>
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <h3>{dispute.type}</h3>
                    <span className={`px-3 py-1 rounded-full ${
                      dispute.status === 'open' ? 'bg-yellow-100 text-yellow-700' :
                      dispute.status === 'resolved' ? 'bg-green-100 text-green-700' :
                      'bg-red-100 text-red-700'
                    }`}>
                      {dispute.status.charAt(0).toUpperCase() + dispute.status.slice(1)}
                    </span>
                  </div>
                  <p className="text-gray-600 mb-2">
                    #{dispute.id} • {dispute.date}
                  </p>
                  <div className="flex items-center gap-4 mb-3">
                    <div>
                      <p className="text-gray-600">Restaurant</p>
                      <p>{dispute.restaurant}</p>
                    </div>
                    <div>
                      <p className="text-gray-600">Customer</p>
                      <p>{dispute.customer}</p>
                    </div>
                    {dispute.amount && (
                      <div>
                        <p className="text-gray-600">Disputed Amount</p>
                        <p className="text-red-600">${dispute.amount}</p>
                      </div>
                    )}
                  </div>
                  <p className="text-gray-700 bg-gray-50 rounded-lg p-3">
                    {dispute.description}
                  </p>
                </div>
              </div>
            </div>

            {dispute.status === 'open' && (
              <div className="flex gap-4 mt-4 pt-4 border-t border-gray-200">
                <button
                  onClick={() => setSelectedDispute(dispute)}
                  className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Review & Resolve
                </button>
                <button className="px-6 py-2 border-2 border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
                  Contact Parties
                </button>
                <button className="px-6 py-2 border-2 border-red-300 text-red-600 rounded-lg hover:bg-red-50 transition-colors">
                  Reject Dispute
                </button>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Resolution Modal */}
      {selectedDispute && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="border-b border-gray-200 px-6 py-4 flex items-center justify-between">
              <h3>Resolve Dispute</h3>
              <button onClick={() => setSelectedDispute(null)} className="text-gray-500 hover:text-gray-700">
                ✕
              </button>
            </div>
            
            <div className="p-6 space-y-6">
              <div>
                <h4 className="mb-4">Dispute Details</h4>
                <div className="bg-gray-50 rounded-lg p-4 space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Dispute ID</span>
                    <span>{selectedDispute.id}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Type</span>
                    <span>{selectedDispute.type}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Restaurant</span>
                    <span>{selectedDispute.restaurant}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Customer</span>
                    <span>{selectedDispute.customer}</span>
                  </div>
                  {selectedDispute.amount && (
                    <div className="flex justify-between">
                      <span className="text-gray-600">Amount</span>
                      <span className="text-red-600">${selectedDispute.amount}</span>
                    </div>
                  )}
                  <div className="pt-3 border-t border-gray-200">
                    <p className="text-gray-600 mb-2">Description</p>
                    <p className="text-gray-800">{selectedDispute.description}</p>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="mb-4">Resolution Action</h4>
                <div className="space-y-3">
                  <label className="flex items-center gap-3 p-4 border-2 border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50">
                    <input type="radio" name="resolution" className="w-4 h-4" />
                    <div>
                      <p>Favor Customer - Full Refund</p>
                      <p className="text-gray-600">Issue full refund to customer</p>
                    </div>
                  </label>
                  <label className="flex items-center gap-3 p-4 border-2 border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50">
                    <input type="radio" name="resolution" className="w-4 h-4" />
                    <div>
                      <p>Favor Restaurant - No Refund</p>
                      <p className="text-gray-600">Restaurant keeps the penalty fee</p>
                    </div>
                  </label>
                  <label className="flex items-center gap-3 p-4 border-2 border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50">
                    <input type="radio" name="resolution" className="w-4 h-4" />
                    <div>
                      <p>Partial Resolution</p>
                      <p className="text-gray-600">Split the amount 50/50</p>
                    </div>
                  </label>
                </div>
              </div>

              <div>
                <label className="block text-gray-700 mb-2">Admin Notes</label>
                <textarea
                  rows={4}
                  placeholder="Add notes about the resolution decision..."
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="flex gap-4">
                <button
                  onClick={() => setSelectedDispute(null)}
                  className="flex-1 px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={() => {
                    setSelectedDispute(null);
                    alert('Dispute resolved successfully!');
                  }}
                  className="flex-1 px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                >
                  Confirm Resolution
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}