import { useState, useRef, useEffect } from "react";
import PropTypes from "prop-types";
import { MoreHorizontal } from "lucide-react";

const ActionDropdown = ({ onCancel, onEdit, onViewDetails }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="p-1 rounded-full hover:bg-gray-100"
      >
        <MoreHorizontal className="h-5 w-5 text-gray-500" />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-10">
          <div className="py-1" role="menu">
            <button
              onClick={() => {
                onCancel();
                setIsOpen(false);
              }}
              className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              role="menuitem"
            >
              Cancel
            </button>
            <button
              onClick={() => {
                onEdit();
                setIsOpen(false);
              }}
              className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              role="menuitem"
            >
              Edit
            </button>
            <button
              onClick={() => {
                onViewDetails();
                setIsOpen(false);
              }}
              className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              role="menuitem"
            >
              View Details
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

ActionDropdown.propTypes = {
  onCancel: PropTypes.func.isRequired,
  onEdit: PropTypes.func.isRequired,
  onViewDetails: PropTypes.func.isRequired,
};

export default ActionDropdown;
