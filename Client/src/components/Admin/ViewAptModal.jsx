import { X, CalendarClock } from "lucide-react";
import PropTypes from "prop-types";

export default function ViewAptModal({ appointment, service, onClose }) {
  // Format the date for display
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    });
  };

  // Format the time for display
  const formatTime = (timeString) => {
    return new Date(`2000-01-01T${timeString}`)
      .toLocaleTimeString("en-US", {
        hour: "numeric",
        minute: "2-digit",
        hour12: true,
      })
      .toLowerCase();
  };

  // Add this function at the top of your component
  const getStatusStyle = (status) => {
    switch (status.toLowerCase()) {
      case "active":
        return "bg-green bg-opacity-20 border text-green";
      case "cancelled":
        return "bg-red bg-opacity-20 border text-red";
      case "completed":
        return "bg-Blue bg-opacity-20 border text-Blue";
      default:
        return "bg-gray-100 border text-gray-600";
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-6 z-50 text-left">
      <div className="bg-white rounded-[12px] shadow-lg w-full max-w-md p-6">
        <div className="space-y-6">
          {/* Header */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="text-FontPrimary border border-gray rounded-[4px] border-opacity-50 w-11 h-11 p-[8px]">
                <CalendarClock className="w-6 h-6" />
              </div>
              <div>
                <p className="text-left text-l font-semibold text-FontPrimary">
                  Appointment Details
                </p>
                <div
                  className={`text-xs ${getStatusStyle(
                    appointment.status
                  )} px-3 py-1 rounded-md inline-block mt-2`}
                >
                  {appointment.status}
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
                  value={appointment.booking_id}
                  readOnly
                  className="w-full px-4 py-2 text-sm border rounded-lg bg-gray-50"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-600 mb-1">Date</label>
                <input
                  type="text"
                  value={formatDate(appointment.appointment_date)}
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
                value={appointment.full_name}
                readOnly
                className="w-full px-4 py-2 text-sm border border-gray-200 rounded-lg bg-gray-50"
              />
            </div>

            <div>
              <label className="block text-sm text-gray-600 mb-1">Email</label>
              <input
                type="email"
                value={appointment.email}
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
                value={appointment.mobile_number}
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
                value={service ? service.name : "No service"}
                readOnly
                className="w-full px-4 py-2 text-sm border border-gray-200 rounded-lg bg-gray-50"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm text-gray-600 mb-1">Time</label>
                <input
                  type="text"
                  value={formatTime(appointment.appointment_time)}
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
                  value={appointment.stylist}
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

ViewAptModal.propTypes = {
  appointment: PropTypes.shape({
    booking_id: PropTypes.string,
    appointment_date: PropTypes.string,
    appointment_time: PropTypes.string,
    full_name: PropTypes.string,
    email: PropTypes.string,
    mobile_number: PropTypes.string,
    stylist: PropTypes.string,
    status: PropTypes.string,
  }).isRequired,
  service: PropTypes.shape({
    name: PropTypes.string,
    category: PropTypes.string,
  }),
  onClose: PropTypes.func.isRequired,
};
