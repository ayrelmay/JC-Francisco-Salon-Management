import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const UpdateBooking = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { bookingDetails, selectedDate } = location.state;

  const [formData, setFormData] = useState({
    fullName: bookingDetails.full_name,
    phoneNumber: bookingDetails.mobile_number,
    email: bookingDetails.email,
    stylist: "",
    service: "",
    time: "",
    date: selectedDate.toDateString(),
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        `http://localhost:5001/api/bookings/${bookingDetails.booking_id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to update booking. Please try again.");
      }

      const updatedDetails = {
        booking_id: bookingDetails.booking_id,
        ...formData, // Include all updated form data
      };

      navigate("/updated-booking", { state: { updatedDetails } }); // Navigate to the updated booking page
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800 flex flex-col items-center py-10">
      <div className="w-full max-w-6xl bg-white shadow-lg rounded-lg overflow-hidden flex flex-col lg:flex-row">
        {/* Left Section */}
        <div className="lg:w-1/3 bg-gray-100 p-8 flex flex-col items-start">
          <img
            src="https://via.placeholder.com/120"
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
          <h2 className="text-2xl font-bold mb-6">Update Your Booking</h2>
          <p className="text-lg text-gray-700 mb-6">
            <strong>Booking for:</strong> {selectedDate.toDateString()}
          </p>

          <form className="space-y-6" onSubmit={handleSubmit}>
            {/* Full Name (Non-Editable) */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Full Name *
              </label>
              <input
                type="text"
                name="fullName"
                value={formData.fullName}
                disabled
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md bg-gray-100 text-gray-700"
              />
            </div>

            {/* Phone Number */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Phone Number *
              </label>
              <input
                type="tel"
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleChange}
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
              />
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Email *
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
              />
            </div>

            {/* Stylist */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Select Stylist *
              </label>
              <select
                name="stylist"
                value={formData.stylist}
                onChange={handleChange}
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                required
              >
                <option value="">Choose a stylist</option>
                <option value="Stylist A">Stylist A</option>
                <option value="Stylist B">Stylist B</option>
                <option value="Stylist C">Stylist C</option>
              </select>
            </div>

            {/* Service */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Select Service *
              </label>
              <select
                name="service"
                value={formData.service}
                onChange={handleChange}
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                required
              >
                <option value="">Choose a service</option>
                <option value="Haircut">Haircut</option>
                <option value="Manicure">Manicure</option>
                <option value="Facial">Facial</option>
              </select>
            </div>

            {/* Time */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Select Time *
              </label>
              <select
                name="time"
                value={formData.time}
                onChange={handleChange}
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                required
              >
                <option value="">Choose time</option>
                <option value="10:00 AM">10:00 AM</option>
                <option value="11:00 AM">11:00 AM</option>
                <option value="01:00 PM">01:00 PM</option>
              </select>
            </div>

            {/* Action Buttons */}
            <div className="flex justify-end gap-4">
              <button
                type="button"
                onClick={() => navigate(-1)}
                className="px-4 py-2 border border-gray-400 text-gray-600 rounded-md hover:bg-gray-100"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
              >
                Update Booking
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UpdateBooking;
