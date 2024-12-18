import { useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import PropTypes from "prop-types";

export default function CalendarModal({ isOpen, onClose }) {
  const [currentDate, setCurrentDate] = useState(new Date());
  const modalRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const daysOfWeek = ["S", "M", "T", "W", "T", "F", "S"];

  const getDaysInMonth = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const prevMonthDays = new Date(year, month, 0).getDate();

    const days = [];

    // Previous month days
    for (let i = firstDay - 1; i >= 0; i--) {
      days.push({
        date: prevMonthDays - i,
        isCurrentMonth: false,
      });
    }

    // Current month days
    for (let i = 1; i <= daysInMonth; i++) {
      days.push({
        date: i,
        isCurrentMonth: true,
        isToday:
          i === new Date().getDate() &&
          month === new Date().getMonth() &&
          year === new Date().getFullYear(),
      });
    }

    return days;
  };

  const handlePrevMonth = () => {
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() - 1)
    );
  };

  const handleNextMonth = () => {
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() + 1)
    );
  };

  return (
    <div
      ref={modalRef}
      className="absolute top-full right-0 mt-1 z-50 bg-white rounded-lg shadow-lg p-4 w-[300px] border border-gray-200"
      onClick={(e) => e.stopPropagation()}
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <button className="text-gray-900 font-medium hover:text-gray-600">
          {months[currentDate.getMonth()]} {currentDate.getFullYear()}
        </button>
        <div className="flex gap-1">
          <button
            onClick={handlePrevMonth}
            className="p-1 hover:bg-gray-100 rounded-full"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button
            onClick={handleNextMonth}
            className="p-1 hover:bg-gray-100 rounded-full"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Calendar Grid */}
      <div className="grid grid-cols-7 gap-1">
        {/* Day headers */}
        {daysOfWeek.map((day) => (
          <div
            key={day}
            className="h-8 flex items-center justify-center text-sm text-gray-500"
          >
            {day}
          </div>
        ))}

        {/* Date cells */}
        {getDaysInMonth(currentDate).map((day, index) => (
          <button
            key={index}
            className={`h-8 flex items-center justify-center text-sm rounded-full ${
              day.isCurrentMonth ? "text-gray-900" : "text-gray-400"
            } ${
              day.isToday ? "bg-blue-100 text-blue-600" : "hover:bg-gray-100"
            }`}
          >
            {day.date}
          </button>
        ))}
      </div>
    </div>
  );
}

CalendarModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};
