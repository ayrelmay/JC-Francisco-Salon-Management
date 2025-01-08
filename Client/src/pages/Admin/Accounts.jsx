import { useState, useEffect } from "react";
import { Search, Plus } from "lucide-react";
import AccountTable from "../../components/Admin/AccountTable";
import NewEmployee from "../../components/Admin/NewEmployee";
import SuccessfulToast from "../../components/Global/SuccessfulToast";

const Accounts = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [employees, setEmployees] = useState([]);
  const [isNewEmployeeModalOpen, setIsNewEmployeeModalOpen] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");

  const fetchEmployees = async () => {
    try {
      const response = await fetch("http://localhost:3000/api/employee");
      if (!response.ok) throw new Error("Failed to fetch");
      const data = await response.json();
      setEmployees(data);
    } catch (error) {
      console.error("Error fetching employees:", error);
    }
  };

  const handleUpdateSuccess = (message = "Changes Saved") => {
    fetchEmployees();
    setToastMessage(message);
    setShowToast(true);
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  // Filter employees based on search term
  const filteredEmployees = employees.filter((employee) =>
    `${employee.name} ${employee.email} ${employee.role}`
      .toLowerCase()
      .includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-8">
      <div className="flex flex-col sm:flex-row justify-between items-center mb-6">
        <div className="relative flex-1 max-w-md">
          <input
            type="text"
            placeholder="Search"
            className="w-full pl-10 pr-4 py-2 border rounded-md bg-white"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
        </div>
        <button
          onClick={() => setIsNewEmployeeModalOpen(true)}
          className="px-4 py-2 bg-BtnPrimary text-white rounded-md flex items-center gap-2"
        >
          <Plus className="h-4 w-4" />
          New employee
        </button>
      </div>

      <AccountTable
        data={filteredEmployees}
        onRefresh={() => handleUpdateSuccess("Account is deleted successfully")}
      />

      <NewEmployee
        isOpen={isNewEmployeeModalOpen}
        onClose={() => setIsNewEmployeeModalOpen(false)}
      />

      <SuccessfulToast
        title="Success"
        message={toastMessage}
        isVisible={showToast}
        onClose={() => setShowToast(false)}
      />
    </div>
  );
};

export default Accounts;
