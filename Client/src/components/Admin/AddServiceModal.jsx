import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import PrimaryBtn from "../Global/PrimaryBtn";
import TertiaryBtn from "../Global/TertiaryBtn";
import { HandPlatter, X } from "lucide-react";

export default function AddServiceModal({ onClose, onServiceAdded }) {
  const [formData, setFormData] = useState({
    serviceName: "",
    category: "",
    serviceId: "Loading...", // Initial state for dynamic Service ID
    minimumPrice: "",
    duration: "",
  });

  const [loading, setLoading] = useState(false);

  // Fetch the next available Service ID
  useEffect(() => {
    const fetchNextServiceId = async () => {
      try {
        const response = await fetch(
          "http://localhost:3000/api/service/next-id"
        );
        if (!response.ok) {
          throw new Error("Failed to fetch Service ID");
        }
        const data = await response.json();
        setFormData((prev) => ({
          ...prev,
          serviceId: data.nextId, // Update Service ID dynamically
        }));
      } catch (error) {
        console.error("Error fetching Service ID:", error);
        setFormData((prev) => ({
          ...prev,
          serviceId: "Error generating ID",
        }));
      }
    };

    fetchNextServiceId();
  }, []);

  // Add this helper function inside the component
  const formatNumberWithCommas = (value) => {
    // Remove any existing commas and non-digit characters except decimal point
    const cleanValue = value.replace(/[^\d.]/g, "");
    // Format with commas
    const parts = cleanValue.split(".");
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return parts.join(".");
  };

  // Update the handleChange function
  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "minimumPrice") {
      // Format the price with commas
      const formattedValue = formatNumberWithCommas(value);
      setFormData((prevData) => ({
        ...prevData,
        [name]: formattedValue,
      }));
    } else {
      // Handle other fields normally
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Log the request payload for debugging
      const payload = {
        ServiceName: formData.serviceName.trim(),
        Category: formData.category,
        ServiceID: formData.serviceId,
        ServicePrice: parseFloat(formData.minimumPrice.replace(/,/g, "")), // Remove commas before parsing
        Duration: formData.duration.trim(),
      };
      console.log("Sending payload:", payload);

      const response = await fetch("http://localhost:3000/api/service", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to add service");
      }

      setLoading(false);

      if (typeof onServiceAdded === "function") {
        onServiceAdded(data.service);
      }
      onClose();
    } catch (error) {
      console.error("Error adding service:", error);
      alert(`Failed to add service: ${error.message}`);
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-6 z-50">
      <div className="bg-white rounded-[12px] shadow-lg w-full max-w-md p-6">
        <div className="space-y-6">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <HandPlatter className="text-FontPrimary border border-gray rounded-[4px] border-opacity-50 w-11 h-11 p-[8px]" />
              <div>
                <h2 className="text-left text-l font-semibold text-FontPrimary">
                  Add New Service
                </h2>
                <p className="text-sm text-gray leading-relaxed">
                  Fill in the details. <span className="text-red-500">*</span>{" "}
                  Required fields.
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
                Service name<span className="text-red-500"> *</span>
              </label>
              <input
                type="text"
                name="serviceName"
                placeholder="e.g. Hair color"
                required
                className="w-full px-4 py-2 text-sm border border-Tableline border-opacity-50 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={formData.serviceName}
                onChange={handleChange}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-font-gray mb-2 text-left">
                Category<span className="text-red-500"> *</span>
              </label>
              <select
                name="category"
                required
                className="w-full px-4 py-2 text-sm border border-Tableline border-opacity-50 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none bg-white"
                value={formData.category}
                onChange={handleChange}
              >
                <option value="">Choose a category</option>
                <option value="Hair">Hair</option>
                <option value="Nails">Nails</option>
                <option value="Skin">Skin</option>
                <option value="Massage">Massage</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-font-gray mb-2 text-left">
                Service ID<span className="text-red-500"> *</span>
              </label>
              <div className="flex gap-3">
                <input
                  type="text"
                  name="serviceId"
                  required
                  className="w-full px-4 py-2 text-sm border border-Tableline border-opacity-50 rounded-lg bg-gray-50 focus:outline-none"
                  value={formData.serviceId}
                  readOnly
                />
                <span className="inline-flex items-center px-3 text-xs text-font-grey bg-gray-100 border border-Tableline border-opacity-50 rounded-lg">
                  Auto
                </span>
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-font-gray mb-2 text-left">
                Minimum Price<span className="text-red-500"> *</span>
              </label>
              <div className="flex gap-3">
                <input
                  type="text"
                  name="minimumPrice"
                  placeholder="Enter minimum price"
                  required
                  className="w-full px-4 py-2 text-sm border border-Tableline border-opacity-50 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={formData.minimumPrice}
                  onChange={handleChange}
                />
                <span className="inline-flex items-center px-3 text-xs text-font-grey bg-gray-100 border border-Tableline border-opacity-50 rounded-lg">
                  PHP
                </span>
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-font-gray mb-2 text-left">
                Duration<span className="text-red-500"> *</span>
              </label>
              <input
                type="text"
                name="duration"
                placeholder="e.g. 3 hours"
                required
                className="w-full px-4 py-2 text-sm border border-Tableline border-opacity-50 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={formData.duration}
                onChange={handleChange}
              />
            </div>

            <div className="-mx-6 pt-2 ">
              <hr className="border-t border-Tableline opacity-50" />
            </div>

            {/* Buttons */}
            <div className="flex gap-4 pt-2 -mx-6 px-6">
              <TertiaryBtn type="button" onClick={onClose}>
                Cancel
              </TertiaryBtn>
              <PrimaryBtn type="submit" disabled={loading}>
                {loading ? "Submitting..." : "Confirm"}
              </PrimaryBtn>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

AddServiceModal.propTypes = {
  onClose: PropTypes.func.isRequired,
  onServiceAdded: PropTypes.func.isRequired,
};
