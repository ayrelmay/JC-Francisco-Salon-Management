import { useState, useEffect } from "react";
import { User, X, ChevronDown } from "lucide-react";
import PropTypes from "prop-types";

export default function EditEmployeeModal({
  onClose,
  isOpen,
  employee,
  onUpdate,
}) {
  const [formData, setFormData] = useState({
    employeeId: "",
    name: "",
    email: "",
    role: "",
    status: "",
  });
  const [isFormChanged, setIsFormChanged] = useState(false);
  const [showValidation, setShowValidation] = useState(false);

  // Populate form data when employee prop changes
  useEffect(() => {
    if (employee) {
      const initialData = {
        employeeId: employee.ID || "",
        name: employee.name || "",
        email: employee.email || "",
        role: employee.role || "",
        status: employee.status || "",
      };
      setFormData(initialData);
      setIsFormChanged(false); // Reset form changed state
    }
  }, [employee]);

  // Handle form changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setIsFormChanged(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setShowValidation(true);

    try {
      const response = await fetch(
        `http://localhost:3000/api/employee/${employee.ID}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: formData.name,
            email: formData.email,
            role: formData.role,
            status: formData.status,
          }),
        }
      );

      if (!response.ok) throw new Error("Failed to update employee");

      onUpdate(); // Refresh the table
      onClose(); // Close the modal
    } catch (error) {
      console.error("Error updating employee:", error);
    }
  };

  const handleAutoGenerate = () => {
    // Add your auto-generate logic here
    setFormData({
      ...formData,
      employeeId: "EMP" + Math.floor(1000 + Math.random() * 9000),
    });
  };

  // Handle ESC key press
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === "Escape") onClose();
    };

    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [onClose]);

  // Prevent click propagation from modal content to backdrop
  const handleContentClick = (e) => {
    e.stopPropagation();
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-lg shadow-xl w-full max-w-md"
        onClick={handleContentClick}
      >
        {/* Modal Header */}
        <div className="flex items-center gap-3 p-6 border-b">
          <div className="p-2 bg-blue-50 rounded-full">
            <User className="w-5 h-5 text-blue-600" />
          </div>
          <div className="flex-1">
            <h2 className="text-xl font-semibold text-gray-900">
              Edit Employee Account
            </h2>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Employee ID*
            </label>
            <div className="flex gap-2">
              <input
                type="text"
                value={formData.employeeId}
                onChange={(e) =>
                  setFormData({ ...formData, employeeId: e.target.value })
                }
                className="flex-1 rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter employee ID"
                readOnly
              />
              <button
                type="button"
                onClick={handleAutoGenerate}
                className="px-3 py-2 bg-gray-50 text-sm text-gray-600 border border-gray-300 rounded-md hover:bg-gray-100"
              >
                Auto
              </button>
            </div>
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Name*
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Enter name"
            />
            {showValidation && !formData.name && (
              <p className="text-red-500 text-xs mt-1">
                This field is required
              </p>
            )}
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Email*
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Enter email"
            />
            {showValidation &&
              !formData.email.endsWith("@jcfsalonmail.com") && (
                <p className="text-red-500 text-xs mt-1">
                  Must end with @jcfsalonmail.com
                </p>
              )}
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Role*
            </label>
            <div className="relative">
              <select
                name="role"
                value={formData.role}
                onChange={handleInputChange}
                className="w-full appearance-none rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">Select role</option>
                <option value="admin">Admin</option>
                <option value="cashier">Cashier</option>
                <option value="technician">Technician</option>
              </select>
              {showValidation && !formData.role && (
                <p className="text-red-500 text-xs mt-1">
                  Please select a role
                </p>
              )}
              <ChevronDown className="w-4 h-4 text-gray-400 absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none" />
            </div>
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Status
            </label>
            <div className="relative">
              <select
                name="status"
                value={formData.status}
                onChange={handleInputChange}
                className="w-full appearance-none rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">Select status</option>
                <option value="available">Available</option>
                <option value="break">On Break</option>
                <option value="busy">Busy</option>
              </select>
              <ChevronDown className="w-4 h-4 text-gray-400 absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none" />
            </div>
          </div>
        </form>

        {/* Modal Footer */}
        <div className="flex gap-3 p-6 border-t">
          <button
            onClick={onClose}
            className="flex-1 px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            disabled={!isFormChanged}
            className={`flex-1 px-4 py-2 text-sm font-medium text-white rounded-md ${
              isFormChanged
                ? "bg-BtnPrimary hover:bg-blue-700"
                : "bg-gray-400 cursor-not-allowed"
            }`}
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}

EditEmployeeModal.propTypes = {
  onClose: PropTypes.func.isRequired,
  isOpen: PropTypes.bool.isRequired,
  employee: PropTypes.object,
  onUpdate: PropTypes.func.isRequired,
};
