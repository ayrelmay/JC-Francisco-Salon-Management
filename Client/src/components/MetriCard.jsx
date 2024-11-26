import Card from "./Card";
import PropTypes from "prop-types";

function MetricCard({ title, value, change, icon }) {
  return (
    <Card>
      <div className="flex items-center justify-between flex-grow">
        <div>
          <p className="text-sm text-gray-500">{title}</p>
          <p className="text-2xl font-bold text-FontPrimary">{value}</p>
          {change && <p className="text-sm text-green-600">{change}</p>}
        </div>
        <div className="text-2xl">{icon}</div>
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
