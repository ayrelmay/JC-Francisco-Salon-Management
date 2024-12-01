import PropTypes from "prop-types";
import { useState } from "react";
import { MoreHorizontal } from "lucide-react";

const AppointmentTable = ({ data }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 7;

  const getStatusColor = (status) => {
    switch (status) {
      case "active":
        return "bg-green bg-opacity-25 text-green border-green";
      case "cancelled":
        return "bg-red bg-opacity-25 text-red border-red";
      case "completed":
        return "bg-blue bg-opacity-25 text-blue border-blue";
      default:
        return "bg-gray-50 text-gray-600 border-gray-200";
    }
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  // Pagination logic
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedData = data.slice(startIndex, startIndex + itemsPerPage);
  const totalPages = Math.ceil(data.length / itemsPerPage);

  return (
    <div className="w-full">
      <div className="overflow-x-auto rounded-lg border border-Tableline border-opacity-30">
        <table className="w-full table-auto">
          <thead className="bg-gray-50">
            <tr>
              <th className="border-b border-Tableline border-opacity-30 px-6 py-4 text-left text-[12px] font-semibold text-gray-600">
                Date
              </th>
              <th className="border-b border-Tableline border-opacity-30 px-6 py-4 text-left text-[12px] font-semibold text-gray-600">
                Name
              </th>
              <th className="border-b border-Tableline border-opacity-30 px-6 py-4 text-left text-[12px] font-semibold text-gray-600">
                Service Type
              </th>
              <th className="border-b border-Tableline border-opacity-30 px-6 py-4 text-left text-[12px] font-semibold text-gray-600">
                Beauty Tech
              </th>
              <th className="border-b border-Tableline border-opacity-30 px-6 py-4 text-left text-[12px] font-semibold text-gray-600">
                Status
              </th>
              <th className="border-b border-Tableline border-opacity-30 px-6 py-4 text-center text-[12px] font-semibold text-gray-600">
                Action
              </th>
            </tr>
          </thead>
          <tbody className="bg-white">
            {paginatedData.map((appointment) => (
              <tr
                key={appointment.id}
                className="text-left border-b border-Tableline border-opacity-50 transition-colors hover:bg-gray-50"
              >
                <td className="px-6 py-4 text-[12px] text-gray-600">
                  {appointment.date}
                  <div className="text-xs text-gray-500">
                    {appointment.time}
                  </div>
                </td>
                <td className="px-6 py-4 text-[12px] text-gray-600">
                  {appointment.name}
                  <div className="text-xs text-gray-500">
                    {appointment.email}
                  </div>
                </td>
                <td className="px-6 py-4 text-[12px] text-gray-600">
                  {appointment.serviceType}
                  <div className="text-xs text-gray-500">
                    {appointment.serviceDetail}
                  </div>
                </td>
                <td className="px-6 py-4 text-[12px] text-gray-600">
                  {appointment.beautyTech}
                </td>
                <td className="px-6 py-4 text-[12px]">
                  <span
                    className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full border ${getStatusColor(
                      appointment.status
                    )}`}
                  >
                    {appointment.status.charAt(0).toUpperCase() +
                      appointment.status.slice(1)}
                  </span>
                </td>
                <td className="px-6 py-4 text-center">
                  <MoreHorizontal className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-end items-center gap-2 mt-4">
          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i}
              onClick={() => handlePageChange(i + 1)}
              className={`px-3 py-1 text-[12px] rounded ${
                currentPage === i + 1
                  ? "bg-BtnPrimary text-white"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              {i + 1}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

AppointmentTable.propTypes = {
  data: PropTypes.array.isRequired,
};

export default AppointmentTable;
