import PropTypes from "prop-types";
import { CirclePlus } from "lucide-react";

export default function ServiceCard({ name, price, category, onAdd }) {
  // Function to determine color based on category
  const getCategoryColor = (category) => {
    switch (category.toLowerCase()) {
      case "beauty":
        return "bg-beauty";
      case "hair":
        return "bg-hair";
      case "nails":
        return "bg-nails";
      case "spa":
        return "bg-spa";
      default:
        return "bg-gray-300";
    }
  };

  return (
    <div className="flex items-center justify-between p-4 mb-2 bg-white border border-Tableline border-opacity-20 rounded-lg shadow hover:shadow-md transition-shadow relative overflow-hidden">
      {/* Dynamic color accent bar */}
      <div
        className={`absolute left-0 top-0 bottom-0 w-3 ${getCategoryColor(
          category
        )}`}
      />

      <div className="pl-4">
        <p className="font-medium text-s">{name}</p>
        <p className="text-gray-600 text-s">P{price.toLocaleString()}</p>
      </div>

      <button
        onClick={onAdd}
        className="w-6 h-6 flex items-center justify-center hover:border-gray-400 transition-colors"
      >
        <CirclePlus className="w-8 h-8" />
      </button>
    </div>
  );
}

ServiceCard.propTypes = {
  name: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  category: PropTypes.string.isRequired,
  onAdd: PropTypes.func.isRequired,
};
