import { Search, ChevronDown, MoreHorizontal, Circle } from "lucide-react";
import { useState } from "react";

const AppointmentsTable = () => {
  const [activeTab, setActiveTab] = useState("Today");
  const [showModal, setShowModal] = useState(false);
  const [selectedAppointment, setSelectedAppointment] = useState(null);

  const tabs = ["Today", "Upcoming", "Complete", "Canceled"];

  const appointments = [
    {
      id: 1,
      date: "Today",
      time: "10:00 am - 10:30 am",
      name: "Cathy C.",
      email: "cathycasis@gmail.com",
      serviceType: "Hair Care",
      subService: "Brazilian Blowout",
      beautyTech: "Marcus Chen",
      status: "Active",
      isNew: true,
    },
    // More appointments...
  ];

  const handleRowClick = (appointment) => {
    setSelectedAppointment(appointment);
    setShowModal(true);
  };

  return (
    <div className="flex-1 h-screen bg-gray-100 overflow-auto">
      <div className="p-8">
        <h1 className="text-2xl font-bold text-PrimaryFont mb-6">
          Appointments
        </h1>

        {/* Tabs and Search */}
        <div className="flex flex-col sm:flex-row justify-between items-center mb-6">
          <div className="flex space-x-4 mb-4 sm:mb-0">
            {tabs.map((tab) => (
              <button
                key={tab}
                className={`px-4 py-2 text-sm font-medium ${
                  activeTab === tab
                    ? "text-blue-600 border-b-2 border-blue-600"
                    : "text-gray-500 hover:text-gray-700"
                }`}
                onClick={() => setActiveTab(tab)}
              >
                {tab}
              </button>
            ))}
          </div>
          <div className="relative">
            <input
              type="text"
              placeholder="Search"
              className="pl-10 pr-4 py-2 border rounded-md"
            />
            <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
          </div>
        </div>

        {/* Filter button */}
        <div className="flex justify-end mb-4">
          <button className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
            Filter
            <ChevronDown className="ml-2 h-5 w-5 inline" />
          </button>
        </div>

        {/* Table */}
        <div className="overflow-x-auto bg-white rounded-lg shadow">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                {[
                  "Date",
                  "Name",
                  "Service Type",
                  "Beauty Tech",
                  "Status",
                  "Action",
                ].map((header) => (
                  <th
                    key={header}
                    className="px-6 py-3 text-left text-xs font-medium text-PrimaryFont uppercase tracking-wider"
                  >
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {appointments.map((appointment) => (
                <tr
                  key={appointment.id}
                  className="hover:bg-gray-50 cursor-pointer"
                  onClick={() => handleRowClick(appointment)}
                >
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-PrimaryFont">
                      {appointment.date}
                    </div>
                    <div className="text-sm text-gray-500">
                      {appointment.time}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-PrimaryFont">
                      {appointment.name}
                    </div>
                    <div className="text-sm text-gray-500">
                      {appointment.email}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-PrimaryFont">
                      {appointment.serviceType}
                    </div>
                    <div className="text-sm text-gray-500">
                      {appointment.subService}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-PrimaryFont">
                    {appointment.beautyTech}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        appointment.status === "Active"
                          ? "bg-green-100 text-green-800"
                          : "bg-red-100 text-red-800"
                      }`}
                    >
                      {appointment.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex items-center">
                      <button className="text-gray-400 hover:text-gray-500">
                        <MoreHorizontal className="h-5 w-5" />
                      </button>
                      {appointment.isNew && (
                        <Circle className="ml-2 h-2 w-2 text-green-500 fill-current" />
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal Placeholder */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg">
            <h2 className="text-xl font-bold mb-4">Appointment Details</h2>
            <p>
              Modal content for {selectedAppointment?.name} appointment will go
              here
            </p>
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

export default AppointmentsTable;
