import { useState } from "react";

const BookAppointment = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(null); // Tracks the selected date
  const [showForm, setShowForm] = useState(false); // Toggles between calendar and form
  const [showPolicy, setShowPolicy] = useState(false);
  const [isChecked, setIsChecked] = useState(false); // State to track checkbox
  const [formData, setFormData] = useState(null); // Temporarily store form data
  const [reservationDetails, setReservationDetails] = useState(null); // Store reservation details
  const [showThankYouPage, setShowThankYouPage] = useState(false); // Tracks Thank You page

  // Track error messages
  const [errors, setErrors] = useState({
    fullName: "",
    phoneNumber: "",
    email: "",
    stylist: "",
    time: "",
  });

  // Helper function to convert time to 24-hour format (HH:MM:SS)
  const convertTo24HourFormat = (timeStr) => {
    if (timeStr.includes("AM") || timeStr.includes("PM")) {
      // Convert 12-hour format to 24-hour format
      const [time, modifier] = timeStr.split(" ");
      let [hours, minutes] = time.split(":");
      if (modifier === "PM" && hours !== "12") {
        hours = String(parseInt(hours) + 12);
      }
      if (modifier === "AM" && hours === "12") {
        hours = "00";
      }
      return `${hours}:${minutes}:00`;
    } else if (timeStr.length === 5) {
      // If already HH:MM (from <input type="time">), append :00
      return `${timeStr}:00`;
    }
    return timeStr; // Return unchanged if already correct
  };

  const handleConfirmAndProceed = async () => {
    if (!isChecked) {
      alert("You must agree to the terms and conditions to proceed.");
      return;
    }

    if (!formData || !selectedDate) {
      alert(
        "Missing form data or selected date. Please fill out the form again."
      );
      return;
    }

    try {
      const formattedTime = convertTo24HourFormat(formData?.time);
      const payload = {
        full_name: formData?.fullName || "",
        email: formData?.email || "",
        mobile_number: formData?.phoneNumber || "",
        service: services.join(", "),
        stylist: formData?.stylist || "Not specified",
        appointment_date: selectedDate?.toISOString().split("T")[0],
        appointment_time: formattedTime,
      };

      console.log("Payload being sent to backend:", payload);

      const response = await fetch("http://localhost:5001/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error("Error response from backend:", errorData);
        throw new Error(errorData.message || "Failed to save booking.");
      }

      const responseData = await response.json();
      console.log("Booking created successfully:", responseData);

      setReservationDetails({
        bookingID: responseData.booking_id, // Use backend-generated booking ID
        fullName: formData?.fullName,
        email: formData?.email,
        phoneNumber: formData?.phoneNumber,
        services: services.join(", "),
        stylist: formData?.stylist,
        time: formData?.time,
        date: new Date(payload.appointment_date).toLocaleDateString("en-US"), // Consistent formatting
      });
      setShowThankYouPage(true);
    } catch (error) {
      console.error("Error saving booking:", error.message);
      alert("An error occurred while saving the booking. Please try again.");
    }
  };

  // State for managing servicess
  const [services, setServices] = useState([""]); // Default with one empty service

  // Add a new service
  const addService = () => {
    setServices([...services, ""]);
  };

  // Remove a service
  const removeService = (index) => {
    const updatedServices = services.filter((_, i) => i !== index);
    setServices(updatedServices);
  };

  // Handle service change
  const handleServiceChange = (e, index) => {
    const updatedServices = [...services];
    updatedServices[index] = e.target.value;
    setServices(updatedServices);
  };

  // Helper functions to get the first day and days in the current month
  const getFirstDayOfMonth = (date) =>
    new Date(date.getFullYear(), date.getMonth(), 1).getDay();
  const getDaysInMonth = (date) =>
    new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();

  // Handlers for navigating months
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

  // Handler for clicking a date
  const handleDateClick = (day) => {
    const date = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      day
    );

    if (date >= today) {
      console.log("Selected Date:", date);
      setSelectedDate(date);
      setShowForm(true); // Show the booking form
    } else {
      alert("You cannot select a past date.");
    }
  };

  // Handler for returning to the calendar
  const handleBackToCalendar = () => {
    setShowForm(false);
    setSelectedDate(null);
  };

  // Calendar values
  const year = currentDate.getFullYear();
  const month = currentDate.toLocaleString("default", { month: "long" });
  const daysInMonth = getDaysInMonth(currentDate);
  const firstDayOffset = getFirstDayOfMonth(currentDate);

  const today = new Date().setHours(0, 0, 0, 0); // Today's date without time

  const handleSubmit = (e) => {
    e.preventDefault();

    const form = e.target;
    const fullName = form.fullName.value.trim();
    const phoneNumber = form.phoneNumber.value.trim();
    const email = form.email.value.trim();
    const stylist = form.stylist.value.trim();
    const time = form.time.value.trim();

    let formErrors = {};

    // Validation logic
    if (!phoneNumber) {
      formErrors.phoneNumber = "Phone Number is required.";
    } else if (!/^\+?[1-9]\d{1,14}$/.test(phoneNumber)) {
      formErrors.phoneNumber = "Enter a valid phone number in E.164 format.";
    }

    if (!email) {
      formErrors.email = "Email is required.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      formErrors.email = "Enter a valid email address.";
    }

    if (!stylist) {
      formErrors.stylist = "Please select a stylist.";
    }
    if (!time) {
      formErrors.time = "Please select a time.";
    }

    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors); // Set error state
      return;
    }

    setFormData({
      fullName,
      phoneNumber,
      email,
      stylist,
      time,
      services,
      date: selectedDate.toLocaleDateString("en-US"),
    });
    setShowPolicy(true); // Show the policy page
  };

  const goToHome = () => {
    setShowThankYouPage(false); // Hide Thank You Page
    setReservationDetails(null); // Clear reservation details
    setShowForm(false); // Return to calendar or home
  };

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-6">
      {/* Main Container */}
      <div className="max-w-5xl mx-auto bg-white rounded-lg shadow-md p-8">
        <h1 className="text-2xl font-bold text-center mb-8">
          Book your appointment with us!
        </h1>

        <div className="flex flex-col lg:flex-row">
          {/* Left Section: Salon Details */}
          <div className="lg:w-1/2 border-r border-gray-200 pr-6 mb-6 lg:mb-0">
            <div className="text-center">
              <img
                src="https://via.placeholder.com/150" // Replace with your logo URL
                alt="Salon Logo"
                className="mx-auto w-24 h-24 mb-4"
              />
              <h2 className="text-xl font-semibold">J.C. Francisco Salon</h2>
              <p className="text-gray-500 italic mt-2 mb-4">
                Your ultimate destination for beauty! ✨
              </p>
            </div>
            <p className="text-gray-600 text-sm">
              Indulge in our exclusive packages tailored for you. Experience
              personalized haircare, premium nail services, rejuvenating spa
              treatments, and stunning eyelash extensions that enhance your
              natural beauty.
            </p>
            <p className="text-gray-600 text-sm mt-4">
              Book your appointment today and treat yourself to the luxury you
              deserve!
            </p>
            <div className="mt-6">
              <p className="text-sm text-gray-500">📍 J.C. Francisco Salon</p>
              <p className="text-sm text-gray-500">📧 jcfrancisco.salon</p>
              <p className="text-sm text-gray-500">📞 0909-xxxx-xxx</p>
            </div>
          </div>

          {/* Right Section */}
          <div className="lg:w-1/2 pl-6">
            {!showForm ? (
              // Calendar View
              <div>
                <h3 className="text-lg font-semibold mb-4">Select a Date</h3>
                <div className="border border-gray-300 rounded-lg p-4">
                  {/* Month Navigation */}
                  <div className="flex justify-between items-center mb-4">
                    <button
                      onClick={handlePrevMonth}
                      className="text-blue-500 hover:text-blue-700"
                    >
                      &lt; Prev
                    </button>
                    <h4 className="text-gray-700 font-medium">
                      {month} {year}
                    </h4>
                    <button
                      onClick={handleNextMonth}
                      className="text-blue-500 hover:text-blue-700"
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
                    {[...Array(firstDayOffset)].map((_, index) => (
                      <div key={index}></div>
                    ))}
                    {/* Days in the current month */}
                    {[...Array(daysInMonth)].map((_, index) => (
                      <button
                        key={index}
                        className={`w-10 h-10 text-sm rounded hover:bg-blue-100 ${
                          index + 1 === new Date().getDate() &&
                          currentDate.getMonth() === new Date().getMonth() &&
                          currentDate.getFullYear() === new Date().getFullYear()
                            ? "bg-blue-500 text-white"
                            : "bg-gray-50 text-gray-700"
                        }`}
                        onClick={() => handleDateClick(index + 1)} // Handle Date Click
                      >
                        {index + 1}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            ) : showThankYouPage ? (
              // Thank You for Booking Page
              <div className="flex flex-col items-center justify-center">
                <div className="bg-white shadow-lg rounded-lg w-full max-w-md p-8 text-center">
                  <h2 className="text-2xl font-bold text-gray-800 mb-4">
                    Thank you for Booking!
                  </h2>
                  <p className="text-gray-600 mb-4">
                    Thanks for booking! Your appointment is at{" "}
                    <span className="font-bold text-gray-800">
                      {reservationDetails.time}
                    </span>{" "}
                    on{" "}
                    <span className="font-bold text-gray-800">
                      {new Date(reservationDetails.date).toLocaleDateString(
                        "en-US",
                        {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        }
                      )}
                    </span>
                    .
                  </p>
                  <p className="text-sm text-gray-600 leading-relaxed mb-4">
                    Please arrive on time—over 30 minutes late means
                    cancellation, and a fee applies for late arrivals. No-shows
                    without a 24-hour notice may result in a booking ban. We
                    look forward to seeing you!
                  </p>
                  <p className="text-sm text-gray-600 leading-relaxed mb-4">
                    To cancel an appointment, contact us at{" "}
                    <span className="font-semibold">0909-xxxx-xxx</span>.
                    Alternatively, use our Find My Booking feature by entering
                    your Booking ID and details.
                  </p>
                  <button
                    className="bg-blue-600 text-white py-2 px-6 rounded-lg hover:bg-blue-700 transition"
                    onClick={goToHome} // Reset to home
                  >
                    Back to home
                  </button>
                </div>
              </div>
            ) : reservationDetails ? (
              <div className=" flex flex-col items-center">
                {/* Header Section */}
                <div className="w-full max-w-3xl bg-white rounded-lg shadow-md p-8">
                  <h2 className="text-2xl font-semibold text-center text-gray-800 mb-4">
                    Reservation Details
                  </h2>
                  <p className="text-center text-xs text-gray-500 mb-6">
                    Your appointment is confirmed. Youll receive a confirmation
                    with your booking ID and details via email or SMS. Please
                    keep this information handy for any changes or updates.
                  </p>

                  {/* Details Section */}
                  <div className="bg-gray-100 border rounded-lg p-6">
                    <div className="space-y-4 text-sm">
                      {/* Row 1 */}
                      <div className="flex justify-between">
                        <span className="font-medium text-gray-600">
                          Booking ID:
                        </span>
                        <span className="font-bold text-gray-800">
                          {reservationDetails.bookingID}
                        </span>
                      </div>
                      {/* Row 2 */}
                      <div className="flex justify-between">
                        <span className="font-medium text-gray-600">
                          Service/s:
                        </span>
                        <span className="font-bold text-gray-800">
                          {reservationDetails.services}
                        </span>
                      </div>
                      {/* Row 3 */}
                      <div className="flex justify-between">
                        <span className="font-medium text-gray-600">
                          Full Name:
                        </span>
                        <span className="font-bold text-gray-800">
                          {reservationDetails.fullName}
                        </span>
                      </div>
                      {/* Row 4 */}
                      <div className="flex justify-between">
                        <span className="font-medium text-gray-600">Time:</span>
                        <span className="font-bold text-gray-800">
                          {reservationDetails.time}
                        </span>
                      </div>
                      {/* Row 5 */}
                      <div className="flex justify-between">
                        <span className="font-medium text-gray-600">
                          Email:
                        </span>
                        <span className="font-bold text-gray-800">
                          {reservationDetails.email}
                        </span>
                      </div>
                      {/* Row 6 */}
                      <div className="flex justify-between">
                        <span className="font-medium text-gray-600">Date:</span>
                        <span className="font-bold text-gray-800">
                          {selectedDate.toLocaleDateString("en-US")}
                        </span>
                      </div>
                      {/* Row 7 */}
                      <div className="flex justify-between">
                        <span className="font-medium text-gray-600">
                          Mobile Number:
                        </span>
                        <span className="font-bold text-gray-800">
                          {reservationDetails.phoneNumber}
                        </span>
                      </div>
                      {/* Row 8 */}
                      <div className="flex justify-between">
                        <span className="font-medium text-gray-600">
                          Stylist:
                        </span>
                        <span className="font-bold text-gray-800">
                          {reservationDetails.stylist}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Footer Section */}
                  <div className="mt-6 text-xs text-gray-500">
                    <p>
                      If you have any concern about your reservation, don’t
                      hesitate to contact us
                    </p>
                  </div>

                  {/* Proceed Button */}
                  <div className="mt-6 text-center">
                    <button
                      className="bg-blue-600 text-white py-2 px-4 rounded-lg shadow hover:bg-blue-700 transition"
                      onClick={() => {
                        handleConfirmAndProceed();
                        setShowThankYouPage(true); // Navigate to Thank You page
                      }}
                    >
                      Proceed
                    </button>
                  </div>
                </div>
              </div>
            ) : showPolicy ? (
              // Booking Policy View
              <div>
                <button
                  onClick={() => setShowPolicy(false)} // Go back to booking form
                  className="text-blue-500 hover:text-blue-700 text-sm underline mb-4"
                >
                  &lt; Back to Booking Form
                </button>
                <h3 className="text-lg font-semibold text-gray-700 mb-4">
                  Important Booking Policy – Must Read
                </h3>
                <div className="space-y-4 text-sm text-gray-700">
                  <p>
                    By proceeding with your booking, you agree to the following
                    terms:
                  </p>
                  <ul className="list-decimal pl-5 space-y-2">
                    <li>
                      <strong>No-Show Policy:</strong> If you fail to attend
                      your appointment without proper notification or
                      cancellation at least 24 hours in advance, you will be
                      banned from making future appointments in the salon.
                    </li>
                    <li>
                      <strong>Late Arrival Policy:</strong>
                      <ul className="list-disc pl-5">
                        <li>
                          If you are more than 30 minutes late, your appointment
                          will be automatically canceled.
                        </li>
                        <li>
                          Late arrivals under 30 minutes will incur an
                          additional charge.
                        </li>
                      </ul>
                    </li>
                  </ul>
                  <p>
                    Please ensure to call us if youre unable to attend or if you
                    will be late. Thank you for your understanding and
                    cooperation!
                  </p>
                </div>
                <div className="mt-6">
                  <label className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      checked={isChecked}
                      onChange={(e) => setIsChecked(e.target.checked)}
                      className="form-checkbox h-5 w-5 text-blue-500"
                    />
                    <span className="text-gray-700 text-sm">
                      I agree to the terms and conditions. (Required)
                    </span>
                  </label>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    if (isChecked) {
                      setReservationDetails({
                        ...formData, // Use form data collected earlier
                      });
                      setShowPolicy(false); // Hide the policy page
                    }
                  }}
                  disabled={!isChecked}
                  className={`mt-4 w-full py-2 px-4 rounded-lg ${
                    isChecked
                      ? "bg-blue-500 text-white hover:bg-blue-600"
                      : "bg-gray-300 text-gray-500 cursor-not-allowed"
                  }`}
                >
                  Confirm and Proceed
                </button>
              </div>
            ) : (
              // Booking Form View
              <div>
                <button
                  onClick={handleBackToCalendar}
                  className="text-blue-500 hover:text-blue-700 text-sm underline mb-4"
                >
                  &lt; Back to Calendar
                </button>
                <h3 className="text-lg font-semibold text-gray-700 mb-4">
                  Booking for:{" "}
                  {selectedDate.toLocaleDateString("en-US", {
                    month: "long",
                    day: "numeric",
                    year: "numeric",
                  })}
                </h3>
                <form className="space-y-6" onSubmit={handleSubmit}>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      name="fullName"
                      className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                      placeholder="Enter your full name"
                      required
                    />
                    {errors.fullName && (
                      <p className="text-red-500 text-sm">{errors.fullName}</p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      name="phoneNumber"
                      className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                      placeholder="+639123456789"
                      required
                    />
                    {errors.phoneNumber && (
                      <p className="text-red-500 text-sm">
                        {errors.phoneNumber}
                      </p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Email *
                    </label>
                    <input
                      type="email"
                      name="email"
                      className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                      placeholder="example@gmail.com"
                      required
                    />
                    {errors.email && (
                      <p className="text-red-500 text-sm">{errors.email}</p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Select Stylist *
                    </label>
                    <select
                      name="stylist"
                      className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                      required
                    >
                      <option value="">Choose a stylist</option>
                      <option value="Stylist A">Stylist A</option>
                      <option value="Stylist B">Stylist B</option>
                      <option value="Stylist C">Stylist C</option>
                    </select>
                    {errors.stylist && (
                      <p className="text-red-500 text-sm">{errors.stylist}</p>
                    )}
                  </div>
                  {/* Services Section */}
                  {services.map((service, index) => (
                    <div key={index} className="flex gap-4 items-center">
                      <div className="flex-1">
                        <label className="block text-sm font-medium text-gray-700">
                          Select Service *
                        </label>
                        <select
                          name={`service-${index}`}
                          value={service}
                          onChange={(e) => handleServiceChange(e, index)}
                          className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                          required
                        >
                          <option value="">Choose a service</option>
                          <option value="Haircut">Haircut</option>
                          <option value="Manicure">Manicure</option>
                          <option value="Facial">Facial</option>
                        </select>
                      </div>
                      {index > 0 && (
                        <button
                          type="button"
                          onClick={() => removeService(index)}
                          className="text-red-500 hover:text-red-700 text-sm"
                        >
                          Remove
                        </button>
                      )}
                    </div>
                  ))}
                  <button
                    type="button"
                    onClick={addService}
                    className="text-blue-500 hover:text-blue-700 text-sm underline mt-2"
                  >
                    Add Another Service
                  </button>
                  <div className="flex gap-4">
                    <div className="flex-1">
                      <label className="block text-sm font-medium text-gray-700">
                        Select Time *
                      </label>
                      <select
                        name="time"
                        className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                        required
                      >
                        <option value="">Choose time</option>
                        <option value="10:00 AM">10:00 AM</option>
                        <option value="11:00 AM">11:00 AM</option>
                        <option value="01:00 PM">01:00 PM</option>
                      </select>
                      {errors.time && (
                        <p className="text-red-500 text-sm">{errors.time}</p>
                      )}
                    </div>
                  </div>
                  <button
                    type="submit"
                    className="mt-4 w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600"
                  >
                    Proceed
                  </button>
                </form>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookAppointment;
