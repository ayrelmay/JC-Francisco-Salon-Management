import { X } from "lucide-react";

export default function ViewAptModal({ appointment, onClose }) {
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-6 z-50">
      <div className="bg-white rounded-[12px] shadow-lg w-full max-w-md p-6">
        <div className="space-y-6">
          {/* Header */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="text-FontPrimary border border-gray rounded-[4px] border-opacity-50 w-11 h-11 p-[8px]">
                {/* You can add an appropriate icon here */}
              </div>
              <div>
                <h2 className="text-left text-l font-semibold text-FontPrimary">
                  Appointment Details
                </h2>
                <div className="bg-green-100 text-green-800 px-3 py-1 rounded-md inline-block">
                  Active
                </div>
              </div>
            </div>
            <button
              onClick={onClose}
              className="text-gray hover:text-gray-700 transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Appointment Details */}
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm text-gray-600 mb-1">
                  Booking ID
                </label>
                <input
                  type="text"
                  value="6TXBEK56"
                  readOnly
                  className="w-full px-4 py-2 text-sm border border-gray-200 rounded-lg bg-gray-50"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-600 mb-1">Date</label>
                <input
                  type="text"
                  value="November 30, 2024"
                  readOnly
                  className="w-full px-4 py-2 text-sm border border-gray-200 rounded-lg bg-gray-50"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm text-gray-600 mb-1">
                Full Name
              </label>
              <input
                type="text"
                value="Momo Jerez"
                readOnly
                className="w-full px-4 py-2 text-sm border border-gray-200 rounded-lg bg-gray-50"
              />
            </div>

            <div>
              <label className="block text-sm text-gray-600 mb-1">Email</label>
              <input
                type="email"
                value="momoj@gmail.com"
                readOnly
                className="w-full px-4 py-2 text-sm border border-gray-200 rounded-lg bg-gray-50"
              />
            </div>

            <div>
              <label className="block text-sm text-gray-600 mb-1">
                Phone number
              </label>
              <input
                type="text"
                value="09876458132"
                readOnly
                className="w-full px-4 py-2 text-sm border border-gray-200 rounded-lg bg-gray-50"
              />
            </div>

            <div>
              <label className="block text-sm text-gray-600 mb-1">
                Service
              </label>
              <input
                type="text"
                value="Foot Spa"
                readOnly
                className="w-full px-4 py-2 text-sm border border-gray-200 rounded-lg bg-gray-50"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm text-gray-600 mb-1">Time</label>
                <input
                  type="text"
                  value="1pm-5pm"
                  readOnly
                  className="w-full px-4 py-2 text-sm border border-gray-200 rounded-lg bg-gray-50"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-600 mb-1">
                  Stylist
                </label>
                <input
                  type="text"
                  value="Ms. Milo Dog"
                  readOnly
                  className="w-full px-4 py-2 text-sm border border-gray-200 rounded-lg bg-gray-50"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
