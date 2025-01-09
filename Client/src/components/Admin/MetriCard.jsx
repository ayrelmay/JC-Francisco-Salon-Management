import Card from "./Card";
import PropTypes from "prop-types";
import { useState } from "react";

function MetricCard({ title, value, icon, editable, onChange }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editValue, setEditValue] = useState(value.replace("₱", ""));

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      setIsEditing(false);
      onChange(editValue, e);
    }
  };

  const handleBlur = () => {
    setIsEditing(false);
    setEditValue(value.replace("₱", ""));
  };

  const handleClick = () => {
    if (editable) {
      setIsEditing(true);
      setEditValue(value.replace("₱", ""));
    }
  };

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
              className={`my-2 text-xl text-left font-semibold text-FontPrimary ${
                editable ? "cursor-pointer" : ""
              }`}
              onClick={handleClick}
            >
              {value}
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
};

MetricCard.defaultProps = {
  editable: false,
  onChange: () => {},
};

export default MetricCard;
