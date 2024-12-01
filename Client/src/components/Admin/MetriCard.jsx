import Card from "./Card";
import PropTypes from "prop-types";

function MetricCard({ title, value, change, icon }) {
  return (
    <Card>
      <div className="flex items-left justify-between flex-grow px-3">
        <div>
          <p className="text-sm text-gray-500 text-left my-3">{title}</p>
          <p className="my-2 text-xl text-left font-semibold text-FontPrimary">
            {value}
          </p>
          {change && <p className="text-sm text-green-600">{change}</p>}
        </div>
        <div className="flex items-center justify-center w-10 h-10 rounded-full border border-Tableline border-opacity-50">
          {icon}
        </div>
      </div>
    </Card>
  );
}

MetricCard.propTypes = {
  title: PropTypes.string.isRequired, // Title is required and should be a string
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired, // Can be string or number
  change: PropTypes.string, // Optional, should be a string if provided
  icon: PropTypes.node.isRequired, // Icon is required and can be any renderable React node
};

export default MetricCard;
