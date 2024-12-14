import { useState } from "react";
import PropTypes from "prop-types";
import PrimaryBtn from "../Global/PrimaryBtn";
import TertiaryBtn from "../Global/TertiaryBtn";
import { HandPlatter, X } from "lucide-react";

export default function EditServiceModal({
  onClose,
  onServiceEdited,
  initialData,
  service,
}) {
  const [formData, setFormData] = useState({
    serviceName: service?.ServiceName || initialData?.ServiceName || "",
    category: service?.Category || initialData?.Category || "",
    serviceId: service?.Id || initialData?.Id || "",
    minimumPrice:
      service?.ServicePrice?.toLocaleString() ||
      initialData?.ServicePrice?.toLocaleString() ||
      "",
    duration: service?.Duration || initialData?.Duration || "",
  });

  const [loading, setLoading] = useState(false);

  const hasFormChanged = () => {
    const initialValues = {
      serviceName: service?.ServiceName || initialData?.ServiceName || "",
      category: service?.Category || initialData?.Category || "",
      serviceId: service?.Id || initialData?.Id || "",
      minimumPrice:
        service?.ServicePrice?.toLocaleString() ||
        initialData?.ServicePrice?.toLocaleString() ||
        "",
      duration: service?.Duration || initialData?.Duration || "",
    };

    return Object.keys(formData).some(
      (key) => formData[key] !== initialValues[key]
    );
  };

  const formatNumberWithCommas = (value) => {
    const cleanValue = value.replace(/[^\d.]/g, "");
    const parts = cleanValue.split(".");
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return parts.join(".");
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "minimumPrice") {
      const formattedValue = formatNumberWithCommas(value);
      setFormData((prevData) => ({
        ...prevData,
        [name]: formattedValue,
      }));
    } else {
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch(
        `http://localhost:3000/api/service/edit/${formData.serviceId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            serviceName: formData.serviceName,
            category: formData.category,
            minimumPrice: formData.minimumPrice,
            duration: formData.duration,
          }),
        }
      );

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || "Failed to update service");
      }

      await response.json();
      onServiceEdited(formData);
      onClose();
    } catch (error) {
      console.error("Error updating service:", error);
    } finally {
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
                  Edit Service
                </h2>
                <p className="text-sm text-gray leading-relaxed">
                  Update the details. <span className="text-red-500">*</span>{" "}
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
              <label
                htmlFor="serviceName"
                className="block text-sm font-medium text-font-gray mb-2 text-left"
              >
                Service name<span className="text-red-500"> *</span>
              </label>
              <input
                id="serviceName"
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
              <label
                htmlFor="category"
                className="block text-sm font-medium text-font-gray mb-2 text-left"
              >
                Category<span className="text-red-500"> *</span>
              </label>
              <select
                id="category"
                name="category"
                required
                className="w-full px-4 py-2 text-sm border border-Tableline border-opacity-50 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none bg-white"
                value={formData.category}
                onChange={handleChange}
              >
                <option value="">Choose a category</option>
                <option value="Hair">Hair</option>
                <option value="Nails">Nails</option>
                <option value="Beauty">Beauty</option>
                <option value="Spa">Spa</option>
              </select>
            </div>
            <div>
              <label
                htmlFor="serviceId"
                className="block text-sm font-medium text-font-gray mb-2 text-left"
              >
                Service ID
              </label>
              <div className="flex gap-3">
                <input
                  id="serviceId"
                  type="text"
                  name="serviceId"
                  className="w-full px-4 py-2 text-sm border border-Tableline border-opacity-50 rounded-lg bg-gray-50 focus:outline-none"
                  value={formData.serviceId}
                  readOnly
                />
                <span className="inline-flex items-center px-3 text-xs text-font-grey bg-gray-100 border border-Tableline border-opacity-50 rounded-lg">
                  Fixed
                </span>
              </div>
            </div>
            <div>
              <label
                htmlFor="minimumPrice"
                className="block text-sm font-medium text-font-gray mb-2 text-left"
              >
                Minimum Price<span className="text-red-500"> *</span>
              </label>
              <div className="flex gap-3">
                <input
                  id="minimumPrice"
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
              <label
                htmlFor="duration"
                className="block text-sm font-medium text-font-gray mb-2 text-left"
              >
                Duration<span className="text-red-500"> *</span>
              </label>
              <input
                id="duration"
                type="text"
                name="duration"
                placeholder="e.g. 3 hours"
                required
                className="w-full px-4 py-2 text-sm border border-Tableline border-opacity-50 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={formData.duration}
                onChange={handleChange}
              />
            </div>

            <div className="-mx-6 pt-2">
              <hr className="border-t border-Tableline opacity-50" />
            </div>

            {/* Buttons */}
            <div className="flex gap-4 pt-2 -mx-6 px-6">
              <TertiaryBtn type="button" onClick={onClose}>
                Cancel
              </TertiaryBtn>
              <PrimaryBtn type="submit" disabled={loading || !hasFormChanged()}>
                {loading ? "Updating..." : "Save Changes"}
              </PrimaryBtn>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

EditServiceModal.propTypes = {
  onClose: PropTypes.func.isRequired,
  onServiceEdited: PropTypes.func.isRequired,
  initialData: PropTypes.object.isRequired,
  service: PropTypes.object,
};
