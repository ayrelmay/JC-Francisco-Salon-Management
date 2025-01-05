import PropTypes from "prop-types";
import PrimaryBtn from "../Global/PrimaryBtn";
import TertiaryBtn from "../Global/TertiaryBtn";
import { PackagePlus, X } from "lucide-react";
import { useEffect, useState } from "react";

export default function AddInventoryModal({ onClose, onSuccess }) {
  const [nextId, setNextId] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    category: "",
    quantity: "",
  });

  useEffect(() => {
    // Fetch the next available ID when the modal opens
    const fetchNextId = async () => {
      try {
        const response = await fetch(
          "http://localhost:3000/api/inventory/next-id"
        );
        const data = await response.json();
        console.log("Data received:", data); // Check if data is correct
        setNextId(data.nextId);
        console.log("Next ID set:", data.nextId); // Confirm state is set
      } catch (error) {
        console.error("Error fetching next ID:", error);
      }
    };

    fetchNextId();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:3000/api/inventory", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: nextId,
          name: formData.name,
          category: formData.category,
          quantity: parseInt(formData.quantity) || 0,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to add item");
      }

      // Call onSuccess and close modal
      if (onSuccess) onSuccess();
      onClose();
    } catch (error) {
      console.error("Error adding item:", error);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-6 z-50">
      <div className="bg-white rounded-[12px] shadow-lg w-full max-w-md p-6">
        <div className="space-y-6">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <PackagePlus className="text-FontPrimary border border-gray rounded-[4px] border-opacity-50 w-11 h-11 p-[8px] square-icon" />
              <div>
                <h2 className="text-left text-l font-semibold text-FontPrimary">
                  Add New Service
                </h2>
                <p className="text-xs text-gray leading-relaxed text-left">
                  Fill in the details to add a new item. <br /> Required fields
                  are marked with an asterisk{" "}
                  <span className="text-red-500">*</span>
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
                placeholder="e.g. Shampoo"
                className="w-full px-4 py-2 text-sm border border-Tableline border-opacity-50 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
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
                required
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
                  value={nextId}
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
                  placeholder="Enter quantity"
                  className="w-full px-4 py-2 text-sm border border-Tableline border-opacity-50 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                  min="0"
                />
                <span className="inline-flex items-center px-3 text-xs text-font-grey bg-gray-100 border border-Tableline border-opacity-50 rounded-lg">
                  pc/s
                </span>
              </div>
            </div>

            <div className="-mx-6 pt-2 ">
              <hr className="border-t border-Tableline opacity-50" />
            </div>

            {/* Buttons */}
            <div className="flex gap-4 pt-2 -mx-6 px-6">
              <TertiaryBtn type="button" onClick={onClose}>
                Cancel
              </TertiaryBtn>
              <PrimaryBtn type="submit">Add Item</PrimaryBtn>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

AddInventoryModal.propTypes = {
  onClose: PropTypes.func.isRequired,
  onSuccess: PropTypes.func,
};
