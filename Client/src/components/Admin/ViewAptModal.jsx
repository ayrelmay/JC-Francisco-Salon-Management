import PropTypes from "prop-types";
import { X, HandPlatter } from "lucide-react";
import { useState, useEffect } from "react";

export default function ViewAptModal({ appointment, onClose }) {
  const [appointmentDetails, setAppointmentDetails] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAppointmentDetails = async () => {
      try {
        const response = await fetch(
          `http://localhost:3000/api/appointments/details/${appointment.id}`
        );
        const data = await response.json();
        setAppointmentDetails(data);
      } catch (error) {
        console.error("Error fetching appointment details:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAppointmentDetails();
  }, [appointment.id]);

  const formatDate = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const formatTime = (timeString) => {
    if (!timeString) return "";
    try {
      return new Date(`2000-01-01T${timeString}`)
        .toLocaleTimeString("en-US", {
          hour: "numeric",
          minute: "2-digit",
          hour12: true,
        })
        .toLowerCase();
    } catch (error) {
      console.error("Error formatting time:", error);
      return timeString;
    }
  };

  if (loading) {
    return (
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
        <div className="bg-white rounded-lg p-6">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-md">
        <div className="p-6 space-y-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <HandPlatter className="text-FontPrimary border border-gray rounded w-8 h-8 p-1.5" />
              <div>
                <h2 className="text-left text-sm font-semibold text-FontPrimary">
                  Appointment Details
                </h2>
                <p className="text-xs text-gray">
                  View appointment information
                </p>
              </div>
            </div>
            <button onClick={onClose}>
              <X className="w-5 h-5" />
            </button>
          </div>

          <hr className="border-t border-Tableline opacity-50" />

          <div className="space-y-4">
            <div>
              <p className="text-xs text-gray mb-1">Booking ID</p>
              <p className="text-sm">
                {appointmentDetails?.appointment_id || "N/A"}
              </p>
            </div>

            <div>
              <p className="text-xs text-gray mb-1">Customer Name</p>
              <p className="text-sm">
                {appointmentDetails?.full_name || "N/A"}
              </p>
            </div>

            <div>
              <p className="text-xs text-gray mb-1">Email Address</p>
              <p className="text-sm">{appointmentDetails?.email || "N/A"}</p>
            </div>

            <div>
              <p className="text-xs text-gray mb-1">Phone Number</p>
              <p className="text-sm">
                {appointmentDetails?.mobile_number || "N/A"}
              </p>
            </div>

            <div>
              <p className="text-xs text-gray mb-1">Service</p>
              {appointmentDetails?.services?.map((service, index) => (
                <div key={index} className="mb-2 last:mb-0">
                  <p className="text-sm font-medium">{service.service_name}</p>
                  <p className="text-xs text-gray">{service.category}</p>
                </div>
              ))}
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-xs text-gray mb-1">Date</p>
                <p className="text-sm">
                  {formatDate(appointmentDetails?.appointment_date)}
                </p>
              </div>
              <div>
                <p className="text-xs text-gray mb-1">Time</p>
                <p className="text-sm">
                  {formatTime(appointmentDetails?.appointment_time)}
                </p>
              </div>
            </div>

            <div>
              <p className="text-xs text-gray mb-1">Status</p>
              <span
                className={`px-2 py-1 text-xs rounded-full ${
                  appointmentDetails?.status === "Active"
                    ? "bg-green/20 text-green"
                    : appointmentDetails?.status === "Cancelled"
                    ? "bg-red/20 text-red"
                    : "bg-Blue/20 text-Blue"
                }`}
              >
                {appointmentDetails?.status || "N/A"}
              </span>
            </div>
          </div>

          <hr className="border-t border-Tableline opacity-50" />

          <div className="flex justify-end">
            <button
              onClick={onClose}
              className="px-4 py-2 text-xs text-gray-600 hover:bg-gray-100 rounded"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

ViewAptModal.propTypes = {
  appointment: PropTypes.shape({
    id: PropTypes.number.isRequired,
  }).isRequired,
  onClose: PropTypes.func.isRequired,
};
