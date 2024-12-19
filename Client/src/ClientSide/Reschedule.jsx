import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const Reschedule = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const bookingDetails = location.state?.bookingDetails;

  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(null);

  const handlePrevMonth = () => {
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1)
    );
  };

  const handleNextMonth = () => {
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1)
    );
  };

  const handleDateClick = (day) => {
    const date = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      day
    );
    if (date >= new Date().setHours(0, 0, 0, 0)) {
      setSelectedDate(date);
    }
  };

  const confirmReschedule = () => {
    if (!selectedDate) {
      alert("Please select a date.");
      return;
    }

    // Implement API call to update the rescheduled date in the backend
    navigate("/update-booking", { state: { bookingDetails, selectedDate } });
  };

  const daysInMonth = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth() + 1,
    0
  ).getDate();
  const firstDayOfMonth = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth(),
    1
  ).getDay();

  const today = new Date().setHours(0, 0, 0, 0);

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
          <h2 className="text-2xl font-bold mb-4">
            Reschedule Your Appointment
          </h2>

          {/* Month Navigation */}
          <div className="flex justify-between items-center mb-4">
            <button
              onClick={handlePrevMonth}
              className="text-blue-500 hover:underline"
            >
              &lt; Prev
            </button>
            <h3 className="text-lg font-semibold">
              {currentDate.toLocaleString("default", { month: "long" })}{" "}
              {currentDate.getFullYear()}
            </h3>
            <button
              onClick={handleNextMonth}
              className="text-blue-500 hover:underline"
            >
              Next &gt;
            </button>
          </div>

          {/* Days of the Week */}
          <div className="grid grid-cols-7 text-center text-gray-600 font-medium mb-2">
            {["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"].map((day) => (
              <div key={day}>{day}</div>
            ))}
          </div>

          {/* Calendar Days */}
          <div className="grid grid-cols-7 text-center">
            {/* Empty slots before the first day */}
            {[...Array(firstDayOfMonth)].map((_, index) => (
              <div key={index}></div>
            ))}

            {/* Days in the current month */}
            {[...Array(daysInMonth)].map((_, index) => {
              const day = index + 1;
              const date = new Date(
                currentDate.getFullYear(),
                currentDate.getMonth(),
                day
              );

              return (
                <button
                  key={day}
                  className={`w-full h-10 rounded-md transition ${
                    date.getTime() === selectedDate?.getTime()
                      ? "bg-blue-500 text-white"
                      : date.getTime() < today
                      ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                      : "bg-gray-50 hover:bg-blue-100 text-gray-700"
                  }`}
                  onClick={() => handleDateClick(day)}
                  disabled={date.getTime() < today}
                >
                  {day}
                </button>
              );
            })}
          </div>

          {/* Action Buttons */}
          <div className="mt-6 flex justify-end gap-4">
            <button
              onClick={() => navigate(-1)}
              className="px-4 py-2 border border-gray-400 text-gray-600 rounded-md hover:bg-gray-100"
            >
              Cancel
            </button>
            <button
              onClick={confirmReschedule}
              disabled={!selectedDate}
              className={`px-4 py-2 rounded-md text-white ${
                selectedDate
                  ? "bg-blue-600 hover:bg-blue-700"
                  : "bg-gray-400 cursor-not-allowed"
              }`}
            >
              Confirm
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reschedule;
