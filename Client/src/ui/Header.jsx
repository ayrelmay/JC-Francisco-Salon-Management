import { BellIcon } from "lucide-react";
import PropTypes from "prop-types";

const Header = ({ title }) => {
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
          <span className="text-sm text-gray-500">{getCurrentDate()}</span>
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
