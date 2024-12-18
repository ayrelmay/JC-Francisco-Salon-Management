import { BellIcon } from "lucide-react";
import PropTypes from "prop-types";
import CalendarModal from "../components/Global/CalendarModal";
import { useState } from "react";

const Header = ({ title }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  // Get current date in the format "Day, DD Month"
  const getCurrentDate = () => {
    return new Intl.DateTimeFormat("en-US", {
      weekday: "short",
      day: "numeric",
      month: "long",
    }).format(new Date());
  };

  return (
    <div className="">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900 mb-2 sm:mb-0">
          {title}
        </h1>
        <div className="flex items-center gap-4">
          <div className="relative">
            <button
              className="text-sm text-gray-500 px-3 py-1.5 rounded hover:bg-gray-100"
              onClick={toggleModal}
            >
              {getCurrentDate()} ▼
            </button>
            <CalendarModal isOpen={isModalOpen} onClose={toggleModal} />
          </div>
          <button className="rounded-full p-2 text-gray-600 hover:bg-gray-100 transition-colors">
            <BellIcon className="h-5 w-5" />
          </button>
        </div>
      </div>
    </div>
  );
};

Header.propTypes = {
  title: PropTypes.string.isRequired,
};

export default Header;
