import { Clock, DollarSign, Timer, XCircle, Save } from 'lucide-react';
import { useState } from 'react';

export function ReservationRules() {
  const [rules, setRules] = useState({
    openingTime: '11:00',
    closingTime: '23:00',
    gracePeriod: 20,
    penaltyFee: 10,
    maxDuration: 2,
    cancellationHours: 2,
  });

  const handleSave = () => {
    // Save rules logic
    alert('Reservation rules updated successfully!');
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="mb-2">Reservation Rules</h2>
          <p className="text-gray-600">Configure your booking policies and restrictions</p>
        </div>
        <button
          onClick={handleSave}
          className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          <Save className="w-5 h-5" />
          Save Changes
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Operating Hours */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <Clock className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <h3>Operating Hours</h3>
              <p className="text-gray-600">Set your restaurant's opening hours</p>
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-gray-700 mb-2">Opening Time</label>
              <input
                type="time"
                value={rules.openingTime}
                onChange={(e) => setRules({ ...rules, openingTime: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-gray-700 mb-2">Closing Time</label>
              <input
                type="time"
                value={rules.closingTime}
                onChange={(e) => setRules({ ...rules, closingTime: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="bg-blue-50 rounded-lg p-4">
              <p className="text-blue-800">
                Current Hours: {rules.openingTime} - {rules.closingTime}
              </p>
            </div>
          </div>
        </div>

        {/* Grace Period */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
              <Timer className="w-6 h-6 text-yellow-600" />
            </div>
            <div>
              <h3>Grace Period</h3>
              <p className="text-gray-600">Late arrival tolerance</p>
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-gray-700 mb-2">Grace Period (minutes)</label>
              <input
                type="number"
                min="0"
                max="60"
                value={rules.gracePeriod}
                onChange={(e) => setRules({ ...rules, gracePeriod: parseInt(e.target.value) })}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="bg-yellow-50 rounded-lg p-4">
              <h4 className="text-yellow-800 mb-2">What is Grace Period?</h4>
              <p className="text-yellow-700">
                Customers can arrive up to {rules.gracePeriod} minutes late without penalty. 
                After this time, the penalty fee will apply.
              </p>
            </div>
          </div>
        </div>

        {/* Penalty Fee */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
              <DollarSign className="w-6 h-6 text-red-600" />
            </div>
            <div>
              <h3>Penalty Fee</h3>
              <p className="text-gray-600">Late arrival or no-show fee</p>
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-gray-700 mb-2">Penalty Amount ($)</label>
              <input
                type="number"
                min="0"
                step="0.01"
                value={rules.penaltyFee}
                onChange={(e) => setRules({ ...rules, penaltyFee: parseFloat(e.target.value) })}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="bg-red-50 rounded-lg p-4">
              <h4 className="text-red-800 mb-2">When is the penalty applied?</h4>
              <ul className="text-red-700 space-y-1">
                <li>• Customer arrives after grace period</li>
                <li>• No-show without cancellation</li>
                <li>• Late cancellation (within policy window)</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Maximum Duration */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <Clock className="w-6 h-6 text-green-600" />
            </div>
            <div>
              <h3>Maximum Duration</h3>
              <p className="text-gray-600">Max booking length per table</p>
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-gray-700 mb-2">Max Duration (hours)</label>
              <select
                value={rules.maxDuration}
                onChange={(e) => setRules({ ...rules, maxDuration: parseFloat(e.target.value) })}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="1">1 hour</option>
                <option value="1.5">1.5 hours</option>
                <option value="2">2 hours</option>
                <option value="2.5">2.5 hours</option>
                <option value="3">3 hours</option>
              </select>
            </div>

            <div className="bg-green-50 rounded-lg p-4">
              <p className="text-green-800">
                Customers can book tables for up to {rules.maxDuration} hours.
                This helps optimize table turnover during peak hours.
              </p>
            </div>
          </div>
        </div>

        {/* Cancellation Policy */}
        <div className="bg-white rounded-xl shadow-sm p-6 lg:col-span-2">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
              <XCircle className="w-6 h-6 text-purple-600" />
            </div>
            <div>
              <h3>Cancellation Policy</h3>
              <p className="text-gray-600">Free cancellation window</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-gray-700 mb-2">Free Cancellation (hours before)</label>
              <select
                value={rules.cancellationHours}
                onChange={(e) => setRules({ ...rules, cancellationHours: parseInt(e.target.value) })}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="1">1 hour before</option>
                <option value="2">2 hours before</option>
                <option value="3">3 hours before</option>
                <option value="4">4 hours before</option>
                <option value="6">6 hours before</option>
                <option value="12">12 hours before</option>
                <option value="24">24 hours before</option>
              </select>
            </div>

            <div className="bg-purple-50 rounded-lg p-4 flex items-center">
              <p className="text-purple-800">
                Customers can cancel for free up to {rules.cancellationHours} hours before their reservation. 
                Cancellations after this will incur the penalty fee.
              </p>
            </div>
          </div>
        </div>

        {/* Auto-Cancel Threshold */}
        <div className="bg-white rounded-xl shadow-sm p-6 lg:col-span-2">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
              <XCircle className="w-6 h-6 text-orange-600" />
            </div>
            <div>
              <h3>Auto-Cancel Settings</h3>
              <p className="text-gray-600">Automatically cancel no-show bookings</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-gray-700 mb-2">Auto-cancel after (minutes)</label>
              <select
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="15">15 minutes</option>
                <option value="20">20 minutes</option>
                <option value="30">30 minutes</option>
                <option value="45">45 minutes</option>
                <option value="60">60 minutes</option>
              </select>
            </div>

            <div className="bg-orange-50 rounded-lg p-4 flex items-center">
              <p className="text-orange-800">
                If a customer doesn't check in within this time after their booking starts, 
                the reservation will be automatically cancelled and the table released.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Summary Card */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl shadow-lg p-8 mt-8">
        <h3 className="mb-6">Current Policy Summary</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div>
            <p className="opacity-80 mb-1">Operating Hours</p>
            <p>{rules.openingTime} - {rules.closingTime}</p>
          </div>
          <div>
            <p className="opacity-80 mb-1">Grace Period</p>
            <p>{rules.gracePeriod} minutes</p>
          </div>
          <div>
            <p className="opacity-80 mb-1">Penalty Fee</p>
            <p>${rules.penaltyFee}</p>
          </div>
          <div>
            <p className="opacity-80 mb-1">Max Duration</p>
            <p>{rules.maxDuration} hours</p>
          </div>
          <div>
            <p className="opacity-80 mb-1">Free Cancellation</p>
            <p>Up to {rules.cancellationHours} hours before</p>
          </div>
          <div>
            <p className="opacity-80 mb-1">Status</p>
            <p className="flex items-center gap-2">
              <span className="w-2 h-2 bg-green-400 rounded-full"></span>
              Active
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
