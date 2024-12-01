import { useState } from "react";
import { Search, Plus } from "lucide-react";
import AccountTable from "../../components/Admin/AccountTable"; // Adjust the path as needed

const Accounts = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const employees = [
    {
      id: "EMP001",
      name: "Ithel Mae Antang",
      role: "Cashier",
      email: "ayrel@jcfmail.com",
      recentAct: "Log, Today 9am",
      status: "Available",
    },
    {
      id: "EMP002",
      name: "Marcus Chen",
      role: "Tech",
      email: "march@jcfmail.com",
      recentAct: "Log, Today 10am",
      status: "Busy",
    },
    {
      id: "EMP003",
      name: "Leah Thompson",
      role: "Tech",
      email: "leaht@jcfmail.com",
      recentAct: "Log, Today 11am",
      status: "Break",
    },
    {
      id: "EMP004",
      name: "Ethan Sison",
      role: "Tech",
      email: "ethans@jcfmail.com",
      recentAct: "Log, Today 10am",
      status: "Available",
    },
    {
      id: "EMP005",
      name: "Chloe Danas",
      role: "Tech",
      email: "chloed@jcfmail.com",
      recentAct: "Log, Today 11am",
      status: "Available",
    },
  ];

  // Filter employees based on search term
  const filteredEmployees = employees.filter((employee) =>
    `${employee.name} ${employee.email} ${employee.role}`
      .toLowerCase()
      .includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Employees</h1>

      {/* Search and Actions */}
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
        <button className="px-4 py-2 bg-blue-600 text-white rounded-md flex items-center gap-2">
          <Plus className="h-4 w-4" />
          New employee
        </button>
      </div>

      {/* Employees Table */}
      <AccountTable data={filteredEmployees} />
    </div>
  );
};

export default Accounts;
