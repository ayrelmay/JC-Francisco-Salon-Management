import PropTypes from "prop-types";
import { SquarePen, ArchiveRestore } from "lucide-react";
import { useState } from "react";
import axios from "axios";
import EditServiceModal from "../Admin/EditServiceModal";

function DataTable({ columns, data, onDelete, onEdit, onRefresh }) {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  // filtering for archived
  const filteredData = data.filter((item) => item.archived === 1);

  // pagination
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedData = filteredData.slice(
    startIndex,
    startIndex + itemsPerPage
  );
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);

  const handleEdit = (item) => {
    setSelectedItem(item);
    setIsEditModalOpen(true);
  };

  const handleDelete = async (item) => {
    try {
      await axios.put(`http://localhost:3000/api/service/${item.Id}`, {
        archived: 0,
      });

      if (onDelete) {
        onDelete(item);
      }
    } catch (error) {
      console.error("Error updating archive status:", error);
    }
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleServiceEdited = (editedService) => {
    setSelectedItem(editedService);

    // Call onRefresh to update the table data
    if (onRefresh) {
      onRefresh();
    }

    // If onEdit prop exists, call it with the edited service
    if (onEdit) {
      onEdit(editedService);
    }

    // Close the modal
    setIsEditModalOpen(false);
  };

  return (
    <div className="w-full">
      <div className="overflow-x-auto rounded-lg border border-Tableline border-opacity-30">
        <table className="w-full table-auto">
          <thead className="bg-gray-50">
            <tr>
              {columns.map((column) => (
                <th
                  key={column.key}
                  className="border-b border-Tableline border-opacity-30 px-6 py-4 text-left text-[12px] font-semibold text-gray-600"
                >
                  {column.header}
                </th>
              ))}
              {onDelete && (
                <th className="border-b border-Tableline border-opacity-30 px-6 py-4.5 text-center text-[12px] font-semibold text-gray-600">
                  Action
                </th>
              )}
            </tr>
          </thead>
          <tbody className="bg-white">
            {paginatedData.map((item, index) => (
              <tr
                key={index}
                className="border-b border-Tableline border-opacity-50 transition-colors hover:bg-gray-50"
              >
                {columns.map((column) => (
                  <td
                    key={column.key}
                    className="px-6 py-4 text-[12px] text-gray-600 text-left whitespace-nowrap"
                  >
                    {item[column.key]}
                  </td>
                ))}
                {onDelete && (
                  <td className="px-4 py-4">
                    <div className="flex items-center justify-center space-x-2">
                      <button
                        onClick={() => handleEdit(item)}
                        className="flex items-center justify-center w-8 h-8 rounded bg-blue-50 text-blue-600 hover:bg-blue-100 border border-Tableline border-opacity-30"
                      >
                        <SquarePen className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(item)}
                        className="flex items-center justify-center w-8 h-8 rounded bg-red-50 text-red-600 hover:bg-red-100 border border-Tableline border-opacity-30"
                      >
                        <ArchiveRestore className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                )}
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

      {isEditModalOpen && (
        <EditServiceModal
          isOpen={isEditModalOpen}
          onClose={() => setIsEditModalOpen(false)}
          service={selectedItem}
          onServiceEdited={handleServiceEdited}
          initialData={selectedItem}
        />
      )}
    </div>
  );
}

DataTable.propTypes = {
  columns: PropTypes.arrayOf(
    PropTypes.shape({
      key: PropTypes.string.isRequired,
      header: PropTypes.string.isRequired,
    })
  ).isRequired,
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
  onEdit: PropTypes.func,
  onDelete: PropTypes.func,
  onRefresh: PropTypes.func,
};

export default DataTable;
