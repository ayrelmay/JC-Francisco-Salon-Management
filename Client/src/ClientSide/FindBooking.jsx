import { useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate for navigation
import "react-datepicker/dist/react-datepicker.css";

const FindBooking = () => {
  const navigate = useNavigate(); // Initialize useNavigate
  const [searchInput, setSearchInput] = useState("");
  const [bookingDetails, setBookingDetails] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false); // Added loading state

  const handleSearch = async () => {
    if (!searchInput.trim()) {
      setError("Please enter Booking ID, Email, or Phone Number.");
      setBookingDetails(null);
      return;
    }

    setLoading(true); // Start loading
    setError(null); // Clear previous errors
    setBookingDetails(null); // Clear previous results

    try {
      const response = await fetch(
        `http://localhost:5001/api/bookings/search?query=${encodeURIComponent(
          searchInput
        )}`
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "An unexpected error occurred.");
      }

      setBookingDetails(data); // Set fetched booking details
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false); // Stop loading
    }
  };

  const handleReschedule = () => {
    // Navigate to the Reschedule page with booking details passed as state
    navigate("/reschedule", { state: { bookingDetails } });
  };

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800 flex flex-col items-center py-10">
      {/* Content Container */}
      <div className="w-full max-w-6xl bg-white shadow-lg rounded-lg overflow-hidden flex flex-col lg:flex-row">
        {/* Left Section */}
        <div className="lg:w-1/3 bg-gray-100 p-8 flex flex-col items-start">
          <img
            src="https://via.placeholder.com/120" // Replace with salon logo
            alt="Salon Logo"
            className="mb-4 rounded-full"
          />
          <h2 className="text-2xl font-semibold mb-2">J.C. Francisco Salon</h2>
          <p className="text-gray-600 text-center mb-4">
            Your ultimate destination for beauty! ✨
          </p>
          <p className="text-gray-600 text-sm leading-relaxed mb-4">
            Experience personalized haircare, spa treatments, and premium nail
            services that enhance your natural beauty. Book your appointment
            today!
          </p>
          <div className="text-sm text-gray-600 space-y-2 py-18">
            <p>📍 J.C. Francisco Salon</p>
            <p>📧 jcfrancisco.salon</p>
            <p>📞 0909-xxx-xxx</p>
          </div>
        </div>

        {/* Right Section */}
        <div className="lg:w-2/3 p-8">
          <h2 className="text-2xl font-bold mb-4">Find Your Booking</h2>
          <p className="text-gray-600 mb-6">
            Enter your <strong>Booking ID</strong>, <strong>Email</strong>, or{" "}
            <strong>Phone Number</strong> to view your appointment details.
          </p>

          {/* Search Input */}
          <div className="flex flex-col sm:flex-row gap-4 items-center mb-6">
            <input
              type="text"
              placeholder="Enter Booking ID, Email, or Phone Number"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              className="w-full sm:w-3/4 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              onClick={handleSearch}
              className="w-full sm:w-auto bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition disabled:bg-gray-400"
              disabled={loading}
            >
              {loading ? "Searching..." : "Search"}
            </button>
          </div>

          {/* Error Message */}
          {error && <p className="text-red-500 mb-4">{error}</p>}

          {/* Booking Details */}
          {bookingDetails && (
            <div className="bg-gray-50 border rounded-lg p-4 shadow">
              <h3 className="text-lg font-bold mb-2">Booking Details</h3>
              <ul className="space-y-2 text-gray-700">
                <li>
                  <strong>Booking ID:</strong> {bookingDetails.booking_id}
                </li>
                <li>
                  <strong>Full Name:</strong> {bookingDetails.full_name}
                </li>
                <li>
                  <strong>Service:</strong> {bookingDetails.service}
                </li>
                <li>
                  <strong>Date:</strong> {bookingDetails.appointment_date}
                </li>
                <li>
                  <strong>Time:</strong> {bookingDetails.appointment_time}
                </li>
                <li>
                  <strong>Phone:</strong> {bookingDetails.mobile_number}
                </li>
                <li>
                  <strong>Email:</strong> {bookingDetails.email}
                </li>
                <li>
                  <strong>Stylist:</strong> {bookingDetails.stylist}
                </li>
              </ul>

              {/* Contact Info */}
              <div className="text-center text-xs text-gray-600 mt-4">
                <p>
                  If you have any concern about your reservation, don’t hesitate
                  to contact us:
                </p>
                <p className="mt-1">
                  <strong>Mobile no.:</strong> 09875487634
                </p>
                <p>
                  <strong>Facebook account:</strong> J.C. Francisco Salon
                </p>
              </div>

              {/* Buttons */}
              <div className="flex justify-center gap-4 mt-6">
                <button
                  className="px-4 py-2 border rounded-md text-blue-600 border-blue-600 hover:bg-blue-600 hover:text-white transition"
                  onClick={handleReschedule}
                >
                  Reschedule
                </button>
                <button
                  className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition"
                  onClick={() => alert("Cancel functionality coming soon.")}
                >
                  Cancel my booking
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default FindBooking;
