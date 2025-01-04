import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { HandPlatter, X } from "lucide-react";

export default function EditAppointmentModal({
  onClose,
  onServiceEdited,
  initialData,
}) {
  const displayId = initialData.id || initialData.booking_id;
  const [loading, setLoading] = useState(false);
  const [appointmentTimes, setAppointmentTimes] = useState([]);
  const [services, setServices] = useState([]);
  const [stylists, setStylists] = useState([]);
  const [appointmentDetails, setAppointmentDetails] = useState(null);

  const [formData, setFormData] = useState({
    id: displayId,
    appointment_date: "",
    full_name: "",
    email: "",
    mobile_number: "",
    service: "",
    appointment_time: "",
    stylist_id: "",
    status: "Active",
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch appointment details using the new endpoint
        const appointmentResponse = await fetch(
          `http://localhost:3000/api/appointments/details/${displayId}`
        );
        const appointmentData = await appointmentResponse.json();
        setAppointmentDetails(appointmentData);

        // Set form data with the fetched appointment details
        setFormData({
          id: displayId,
          appointment_date: appointmentData.appointment_date || "",
          full_name: appointmentData.full_name || "",
          email: appointmentData.email || "",
          mobile_number: appointmentData.mobile_number || "",
          service: appointmentData.services?.[0]?.service_name || "",
          appointment_time: appointmentData.appointment_time || "",
          stylist_id: appointmentData.stylist_id || "",
          status: appointmentData.status || "Active",
        });

        // Fetch other necessary data
        const [timesRes, servicesRes, stylistsRes] = await Promise.all([
          fetch("http://localhost:3000/api/appointment_time"),
          fetch("http://localhost:3000/api/service"),
          fetch("http://localhost:3000/api/employee"),
        ]);

        const times = await timesRes.json();
        const services = await servicesRes.json();
        const stylists = await stylistsRes.json();

        setAppointmentTimes(times);
        setServices(services);
        setStylists(stylists);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [displayId]);

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

  const parseTimeToServer = (timeString) => {
    if (!timeString) return "";
    try {
      // If timeString is already in HH:mm:ss format, return it
      if (timeString.includes(":")) {
        return timeString;
      }

      // Otherwise parse the AM/PM format
      const [time, period] = timeString.split(" ");
      let [hours, minutes] = time.split(":");
      hours = parseInt(hours);

      if (period.toLowerCase() === "pm" && hours !== 12) {
        hours += 12;
      }
      if (period.toLowerCase() === "am" && hours === 12) {
        hours = 0;
      }

      return `${hours.toString().padStart(2, "0")}:${minutes}:00`;
    } catch (error) {
      console.error("Error parsing time:", error);
      return timeString;
    }
  };

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

  const hasFormChanged = () => {
    if (!appointmentDetails) return false;

    const editableFields = [
      "appointment_date",
      "service",
      "appointment_time",
      "stylist_id",
    ];

    return editableFields.some((key) => {
      if (key === "service") {
        return formData[key] !== appointmentDetails.services?.[0]?.service_id;
      }
      return formData[key] !== appointmentDetails[key];
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value || initialData[name],
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // First, find the service ID that matches the selected service name
      const selectedService = services.find(
        (s) => s.ServiceName === formData.service
      );
      if (!selectedService) {
        throw new Error("Selected service not found");
      }

      // Update appointment details
      const appointmentResponse = await fetch(
        `http://localhost:3000/api/appointments/${displayId}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            appointment_date: formData.appointment_date,
            appointment_time: parseTimeToServer(formData.appointment_time),
            stylist_id: formData.stylist_id,
          }),
        }
      );

      // Update service using the service ID
      const serviceResponse = await fetch(
        `http://localhost:3000/api/apptservices/${displayId}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            service_id: selectedService.Id, // Use the ID from the found service
          }),
        }
      );

      if (!appointmentResponse.ok || !serviceResponse.ok) {
        throw new Error("Failed to update appointment");
      }

      // Fetch updated appointment details
      const updatedDetailsResponse = await fetch(
        `http://localhost:3000/api/appointments/details/${displayId}`
      );
      const updatedDetails = await updatedDetailsResponse.json();

      onServiceEdited(updatedDetails);
      onClose();
    } catch (error) {
      console.error("Error updating appointment:", error);
    } finally {
      setLoading(false);
    }
  };

  // Format the date to YYYY-MM-DD for the input
  const formatDateForInput = (dateString) => {
    if (!dateString) return "";
    try {
      const date = new Date(dateString);
      return date.toISOString().split("T")[0];
    } catch (error) {
      console.error("Error formatting date:", error);
      return dateString;
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-4">
        <div className="space-y-4">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <HandPlatter className="text-FontPrimary border border-gray rounded w-8 h-8 p-1.5" />
              <div>
                <h2 className="text-left text-sm font-semibold text-FontPrimary">
                  Edit Appointment
                </h2>
                <p className="text-xs text-gray">
                  Update the details. <span className="text-red-500">*</span>{" "}
                  Required fields.
                </p>
              </div>
            </div>
            <button onClick={onClose}>
              <X className="w-5 h-5" />
            </button>
          </div>

          <hr className="border-t border-Tableline opacity-50" />

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-xs font-medium">Status:</span>
              <span
                className={`px-1.5 py-0.5 text-xs rounded ${getStatusStyle(
                  formData.status
                )}`}
              >
                {formData.status}
              </span>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm text-gray-600 mb-1">
                  Booking ID
                </label>
                <input
                  type="text"
                  name="id"
                  value={displayId || "N/A"}
                  disabled
                  className="w-full px-4 py-2 text-sm border rounded-lg bg-gray-50 cursor-not-allowed"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-600 mb-1">Date</label>
                <input
                  type="date"
                  name="appointment_date"
                  value={formatDateForInput(formData.appointment_date)}
                  onChange={handleChange}
                  className="w-full px-4 py-2 text-sm border border-gray-200 rounded-lg"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm text-gray-600 mb-1">
                Full Name
              </label>
              <input
                type="text"
                name="full_name"
                value={formData.full_name}
                disabled
                className="w-full px-4 py-2 text-sm border rounded-lg bg-gray-50 cursor-not-allowed"
              />
            </div>

            <div>
              <label className="block text-sm text-gray-600 mb-1">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                disabled
                className="w-full px-4 py-2 text-sm border rounded-lg bg-gray-50 cursor-not-allowed"
              />
            </div>

            <div>
              <label className="block text-sm text-gray-600 mb-1">
                Phone number
              </label>
              <input
                type="text"
                name="mobile_number"
                value={formData.mobile_number}
                disabled
                className="w-full px-4 py-2 text-sm border rounded-lg bg-gray-50 cursor-not-allowed"
              />
            </div>

            <div>
              <label className="block text-sm text-gray-600 mb-1">
                Service <span className="text-red-500">*</span>
              </label>
              <select
                name="service"
                value={formData.service}
                onChange={handleChange}
                className="w-full px-4 py-2 text-sm border border-gray-200 rounded-lg"
                required
              >
                <option value="">Select service</option>
                {services.map((service) => (
                  <option key={service.Id} value={service.ServiceName}>
                    {service.ServiceName}
                  </option>
                ))}
              </select>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm text-gray-600 mb-1">
                  Time <span className="text-red-500">*</span>
                </label>
                <select
                  name="appointment_time"
                  value={
                    formData.appointment_time || initialData.appointment_time
                  }
                  onChange={handleChange}
                  className="w-full px-4 py-2 text-sm border border-gray-200 rounded-lg"
                >
                  <option value="">
                    {formatTime(initialData.appointment_time) || "Select time"}
                  </option>
                  {appointmentTimes.map((timeSlot) => (
                    <option key={timeSlot.Id} value={timeSlot.Time}>
                      {formatTime(timeSlot.Time)}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm text-gray-600 mb-1">
                  Stylist <span className="text-red-500">*</span>
                </label>
                <select
                  name="stylist_id"
                  value={formData.stylist_id}
                  onChange={handleChange}
                  className="w-full px-4 py-2 text-sm border border-gray-200 rounded-lg"
                  required
                >
                  <option value="">Select stylist</option>
                  {stylists.map((stylist) => (
                    <option key={stylist.ID} value={stylist.ID}>
                      {stylist.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <hr className="border-t border-Tableline opacity-50" />

            <div className="flex gap-3">
              <button
                type="button"
                onClick={onClose}
                className="flex-1 px-3 py-1.5 text-xs text-gray-600 border border-gray-300 rounded hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={!hasFormChanged() || loading}
                className="flex-1 px-3 py-1.5 text-xs text-white bg-BtnPrimary rounded hover:bg-blue-700 disabled:bg-gray-400"
              >
                {loading ? "Saving..." : "Save Changes"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

EditAppointmentModal.propTypes = {
  onClose: PropTypes.func.isRequired,
  onServiceEdited: PropTypes.func.isRequired,
  initialData: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    booking_id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    appointment_time: PropTypes.string,
    service: PropTypes.string,
  }).isRequired,
};
