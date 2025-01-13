import Card from "./Card";
import PropTypes from "prop-types";
import { useState } from "react";

function MetricCard({ title, value, icon, editable, onChange, hasData }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editValue, setEditValue] = useState(
    typeof value === "string" ? value.replace(/[^0-9.-]/g, "") : value
  );

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      const numericValue = parseFloat(editValue);
      if (!isNaN(numericValue)) {
        setIsEditing(false);
        onChange(numericValue, e);
      } else {
        alert("Please enter a valid number");
      }
    }
  };

  const handleBlur = () => {
    setIsEditing(false);
    setEditValue(
      typeof value === "string" ? value.replace(/[^0-9.-]/g, "") : value
    );
  };

  const handleClick = () => {
    if (editable && (hasData || title === "Opening")) {
      setIsEditing(true);
      setEditValue(value.replace("₱", ""));
    }
  };

  const displayValue = hasData ? value : "No data";

  return (
    <Card>
      <div className="flex items-left justify-between flex-grow px-3">
        <div>
          <p className="text-sm text-gray-500 text-left my-3">{title}</p>
          {editable && isEditing ? (
            <input
              type="text"
              value={editValue}
              onChange={(e) => setEditValue(e.target.value)}
              onKeyPress={handleKeyPress}
              onBlur={handleBlur}
              className="my-2 text-xl text-left font-semibold text-FontPrimary bg-transparent border-none focus:outline-none w-24"
              autoFocus
            />
          ) : (
            <div
              className={`my-2 text-xl text-left font-semibold ${
                hasData ? "text-FontPrimary" : "text-gray-400"
              } ${
                editable && (hasData || title === "Opening")
                  ? "cursor-pointer"
                  : ""
              }`}
              onClick={handleClick}
            >
              {displayValue}
            </div>
          )}
        </div>
        <div className="flex items-center justify-center w-10 h-10 rounded-full border border-Tableline border-opacity-50">
          {icon}
        </div>
      </div>
    </Card>
  );
}

MetricCard.propTypes = {
  title: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  onChange: PropTypes.func,
  icon: PropTypes.node.isRequired,
  editable: PropTypes.bool,
  hasData: PropTypes.bool,
};

MetricCard.defaultProps = {
  editable: false,
  onChange: () => {},
  hasData: false,
};

export default MetricCard;
