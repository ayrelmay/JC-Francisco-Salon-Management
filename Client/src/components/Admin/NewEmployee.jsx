import { X, ChevronDown, User } from "lucide-react";
import { useState, useEffect } from "react";
import PropTypes from "prop-types";

export default function NewEmployee({ isOpen, onClose }) {
  const [formData, setFormData] = useState({
    employeeId: "",
    name: "",
    email: "",
    password: "",
    role: "",
  });
  const [showValidation, setShowValidation] = useState(false);

  const generateNextEmployeeId = async () => {
    try {
      const response = await fetch(
        "http://localhost:3000/api/employee/next-id"
      );
      if (!response.ok) {
        throw new Error("Failed to fetch next ID");
      }

      const data = await response.json();
      return data.nextId; // This will return the properly formatted ID like 'EMP0001'
    } catch (error) {
      console.error("Error generating employee ID:", error);
      return "EMP0001"; // Fallback ID
    }
  };

  useEffect(() => {
    if (isOpen) {
      generateNextEmployeeId().then((newId) => {
        setFormData((prev) => ({ ...prev, employeeId: newId }));
      });
    }
  }, [isOpen]);

  const handleAutoGenerate = async () => {
    const newId = await generateNextEmployeeId();
    setFormData((prev) => ({ ...prev, employeeId: newId }));
  };

  const validateForm = () => {
    // Password validation - requires both letters and numbers, minimum 8 characters
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d).{8,}$/;
    if (!passwordRegex.test(formData.password)) {
      alert(
        "Password must be at least 8 characters long and contain both letters and numbers"
      );
      return false;
    }

    // Email validation
    if (!formData.email.endsWith("@jcfsalonmail.com")) {
      alert("Email must end with @jcfsalonmail.com");
      return false;
    }

    // Check if all required fields are filled
    if (
      !formData.employeeId ||
      !formData.name ||
      !formData.email ||
      !formData.password ||
      !formData.role
    ) {
      alert("Please fill in all required fields");
      return false;
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setShowValidation(true);

    if (!validateForm()) {
      return;
    }

    try {
      // Format the data to match your backend route expectations
      const employeeData = {
        ID: formData.employeeId,
        name: formData.name,
        email: formData.email,
        password: formData.password,
        role: formData.role,
        status: "available", // Default status
      };

      // Debug log
      console.log(
        "About to send this data:",
        JSON.stringify(employeeData, null, 2)
      );

      const response = await fetch("http://localhost:3000/api/employee", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(employeeData),
      });

      // Debug log for response
      const responseText = await response.text();
      console.log("Raw response:", responseText);

      if (!response.ok) {
        throw new Error(
          `Server responded with ${response.status}: ${responseText}`
        );
      }

      const result = JSON.parse(responseText);
      console.log("Parsed response:", result);

      alert("Employee created successfully!");
      setShowValidation(false);
      onClose();
    } catch (error) {
      console.error("Full error details:", error);
      alert(`Failed to create employee: ${error.message}`);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex text-left items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md">
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
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
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
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
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
              Password*
            </label>
            <input
              type="password"
              value={formData.password}
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
              className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Enter password"
            />
            {showValidation &&
              !/^(?=.*[A-Za-z])(?=.*\d).{8,}$/.test(formData.password) && (
                <p className="text-red-500 text-xs mt-1">
                  Must contain at least 8 characters with both letters and
                  numbers
                </p>
              )}
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Role*
            </label>
            <div className="relative">
              <select
                value={formData.role}
                onChange={(e) =>
                  setFormData({ ...formData, role: e.target.value })
                }
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
        </form>

        {/* Modal Footer */}
        <div className="flex gap-3 p-6 border-t">
          <button
            onClick={onClose}
            className="flex-1 px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="flex-1 px-4 py-2 text-sm font-medium text-white bg-BtnPrimary border border-b-BtnPrimary rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
}
NewEmployee.propTypes = {
  isOpen: PropTypes.bool.isRequired, // or PropTypes.bool if it's not required
  onClose: PropTypes.func.isRequired,
};
