import React from "react";
import { useLocation } from "react-router-dom";

const UpdatedBooking = () => {
  const location = useLocation();
  const updatedDetails = location.state?.updatedDetails;

  if (!updatedDetails) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-700">
        <h2>No updated booking details available.</h2>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center py-10">
      <div className="w-full max-w-4xl bg-white shadow-lg rounded-lg p-8">
        <h2 className="text-2xl font-bold mb-6">Updated Booking Details</h2>
        <ul className="space-y-4 text-gray-700">
          <li>
            <strong>Booking ID:</strong> {updatedDetails.booking_id}
          </li>
          <li>
            <strong>Full Name:</strong> {updatedDetails.fullName}
          </li>
          <li>
            <strong>Phone Number:</strong> {updatedDetails.phoneNumber}
          </li>
          <li>
            <strong>Email:</strong> {updatedDetails.email}
          </li>
          <li>
            <strong>Stylist:</strong> {updatedDetails.stylist}
          </li>
          <li>
            <strong>Service:</strong> {updatedDetails.service}
          </li>
          <li>
            <strong>Date:</strong> {updatedDetails.date}
          </li>
          <li>
            <strong>Time:</strong> {updatedDetails.time}
          </li>
        </ul>
        <div className="mt-6 text-center">
          <button
            onClick={() => window.location.replace("/")}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition"
          >
            Go Back to Home
          </button>
        </div>
      </div>
    </div>
  );
};

export default UpdatedBooking;
