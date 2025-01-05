import PropTypes from "prop-types";
import { Package, X } from "lucide-react";
import PrimaryBtn from "../Global/PrimaryBtn";
import TertiaryBtn from "../Global/TertiaryBtn";
import { useState, useEffect } from "react";

export default function EditItemModal({ onClose, item, onSuccess }) {
  const [formData, setFormData] = useState({
    name: item?.name || "",
    category: item?.category || "",
    quantity: item?.quantity || 0,
  });
  const [hasChanges, setHasChanges] = useState(false);

  // Track initial values for comparison
  useEffect(() => {
    setFormData({
      name: item?.name || "",
      category: item?.category || "",
      quantity: item?.quantity || 0,
    });
  }, [item]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    const newFormData = {
      ...formData,
      [name]: value,
    };
    setFormData(newFormData);

    // Check if any values are different from initial values
    const hasAnyChanges =
      newFormData.name !== item.name ||
      newFormData.category !== item.category ||
      Number(newFormData.quantity) !== item.quantity;

    setHasChanges(hasAnyChanges);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(
        `http://localhost:3000/api/inventory/${item.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: formData.name,
            category: formData.category,
            quantity: parseInt(formData.quantity),
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to update item");
      }

      // Call onSuccess callback if provided
      if (onSuccess) {
        onSuccess();
      }
      onClose();
    } catch (error) {
      console.error("Error updating item:", error);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-6 z-50">
      <div className="bg-white rounded-[12px] shadow-lg w-full max-w-md p-6">
        <div className="space-y-6">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <Package className="text-FontPrimary border border-gray rounded-[4px] border-opacity-50 w-11 h-11 p-[8px]" />
              <div>
                <h2 className="text-left text-l font-semibold text-FontPrimary">
                  Edit Item Details
                </h2>
                <p className="text-sm text-gray leading-relaxed text-left">
                  Update the fields below to edit the item. Required fields are
                  marked with an asterisk{" "}
                  <span className="text-red-500">*</span>.
                </p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="text-gray hover:text-gray-700 transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          <div className="-mx-6">
            <hr className="border-t border-Tableline opacity-50" />
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-font-gray mb-2 text-left">
                Item name<span className="text-red-500"> *</span>
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className="w-full px-4 py-2 text-sm border border-Tableline border-opacity-50 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-font-gray mb-2 text-left">
                Category<span className="text-red-500"> *</span>
              </label>
              <select
                name="category"
                value={formData.category}
                onChange={handleInputChange}
                className="w-full px-4 py-2 text-sm border border-Tableline border-opacity-50 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none bg-white"
              >
                <option value="">Choose a category</option>
                <option value="Hair Color">Hair Color</option>
                <option value="Nails">Nails</option>
                <option value="Beauty">Beauty</option>
                <option value="Spa">Spa</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-font-gray mb-2 text-left">
                Item ID<span className="text-red-500"> *</span>
              </label>
              <div className="flex gap-3">
                <input
                  type="text"
                  value={item?.id || ""}
                  className="w-full px-4 py-2 text-sm border border-Tableline border-opacity-50 rounded-lg bg-gray-50 focus:outline-none"
                  readOnly
                />
                <span className="inline-flex items-center px-3 text-xs text-font-grey bg-gray-100 border border-Tableline border-opacity-50 rounded-lg">
                  Auto
                </span>
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-font-gray mb-2 text-left">
                Item Quantity<span className="text-red-500"> *</span>
              </label>
              <div className="flex gap-3">
                <input
                  type="number"
                  name="quantity"
                  value={formData.quantity}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 text-sm border border-Tableline border-opacity-50 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <span className="inline-flex items-center px-3 text-xs text-font-grey bg-gray-100 border border-Tableline border-opacity-50 rounded-lg">
                  pc/s
                </span>
              </div>
            </div>

            <div className="-mx-6 pt-2">
              <hr className="border-t border-Tableline opacity-50" />
            </div>

            {/* Buttons */}
            <div className="flex gap-4 pt-2 -mx-6 px-6">
              <TertiaryBtn type="button" onClick={onClose}>
                Cancel
              </TertiaryBtn>
              <PrimaryBtn type="submit" disabled={!hasChanges}>
                Save Changes
              </PrimaryBtn>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

EditItemModal.propTypes = {
  onClose: PropTypes.func.isRequired,
  onSuccess: PropTypes.func,
  item: PropTypes.shape({
    id: PropTypes.string,
    name: PropTypes.string,
    category: PropTypes.string,
    quantity: PropTypes.number,
  }),
};
