import Card from "./Card";
import PropTypes from "prop-types";

function MetricCard({ title, value, onChange, change, icon, editable }) {
  return (
    <Card>
      <div className="flex items-left justify-between flex-grow px-3">
        <div>
          <p className="text-sm text-gray-500 text-left my-3">{title}</p>
          {editable ? (
            <input
              type="text"
              value={value}
              onChange={(e) => onChange(e.target.value)}
              className="my-2 text-xl text-left font-semibold text-FontPrimary bg-transparent border-none focus:outline-none w-24"
            />
          ) : (
            <div className="my-2 text-xl text-left font-semibold text-FontPrimary">
              {value}
            </div>
          )}
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
  title: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  onChange: PropTypes.func,
  change: PropTypes.string,
  icon: PropTypes.node.isRequired,
  editable: PropTypes.bool,
};

MetricCard.defaultProps = {
  editable: false,
  onChange: () => {},
};

export default MetricCard;
