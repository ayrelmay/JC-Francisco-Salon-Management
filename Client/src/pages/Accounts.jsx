import { useState } from "react";
import { Search, Filter, MoreVertical, Plus } from "lucide-react";

const Accounts = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState(null);

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
      id: "EMP001",
      name: "Marcus Chen",
      role: "Tech",
      email: "march@jcfmail.com",
      recentAct: "Log, Today 10am",
      status: "Available",
    },
    {
      id: "EMP001",
      name: "Leah Thompson",
      role: "Tech",
      email: "leaht@jcfmail.com",
      recentAct: "Log, Today 11am",
      status: "Available",
    },
    {
      id: "EMP001",
      name: "Ethan Sison",
      role: "Tech",
      email: "ethans@jcfmail.com",
      recentAct: "Log, Today 10am",
      status: "Available",
    },
    {
      id: "EMP001",
      name: "Chloe Danas",
      role: "Tech",
      email: "chloed@jcfmail.com",
      recentAct: "Log, Today 11am",
      status: "Available",
    },
  ];

  const handleRowClick = (employee) => {
    setSelectedEmployee(employee);
    setShowModal(true);
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-PrimaryFont mb-6">Employees</h1>

      {/* Search and Actions */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <div className="flex gap-2 flex-1">
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
          <button className="px-4 py-2 bg-gray-800 text-white rounded-md flex items-center gap-2">
            <Filter className="h-4 w-4" />
            Filter
          </button>
        </div>
        <button className="px-4 py-2 bg-blue-600 text-white rounded-md flex items-center gap-2">
          <Plus className="h-4 w-4" />
          New employee
        </button>
      </div>

      {/* Employees Table */}
      <div className="bg-white rounded-lg shadow overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="bg-gray-50">
              <th className="px-6 py-3 text-left text-xs font-medium text-PrimaryFont uppercase tracking-wider">
                Employee ID
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-PrimaryFont uppercase tracking-wider">
                Employee Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-PrimaryFont uppercase tracking-wider">
                Role
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-PrimaryFont uppercase tracking-wider">
                Email
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-PrimaryFont uppercase tracking-wider">
                Recent Act
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-PrimaryFont uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-PrimaryFont uppercase tracking-wider">
                Action
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {employees.map((employee, index) => (
              <tr
                key={index}
                className="hover:bg-gray-50 cursor-pointer"
                onClick={() => handleRowClick(employee)}
              >
                <td className="px-6 py-4 whitespace-nowrap text-sm text-PrimaryFont">
                  {employee.id}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-PrimaryFont">
                  {employee.name}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-PrimaryFont">
                  {employee.role}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-PrimaryFont">
                  {employee.email}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-PrimaryFont">
                  {employee.recentAct}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="text-sm text-green-600">
                    {employee.status}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <button
                    className="text-gray-400 hover:text-gray-600"
                    onClick={(e) => {
                      e.stopPropagation();
                      // Handle menu click
                    }}
                  >
                    <MoreVertical className="h-5 w-5" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal Placeholder */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg p-6 max-w-lg w-full">
            <h2 className="text-xl font-bold mb-4">Employee Details</h2>
            <p>Modal content for {selectedEmployee?.name} will go here</p>
            <button
              onClick={() => setShowModal(false)}
              className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Accounts;
