import PropTypes from "prop-types";
import { Archive } from "lucide-react";
import { useState } from "react";

function ClickableTable({ columns, data, onArchive }) {
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedItem, setSelectedItem] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const itemsPerPage = 7;

  // Pagination logic
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedData = data.slice(startIndex, startIndex + itemsPerPage);
  const totalPages = Math.ceil(data.length / itemsPerPage);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleRowClick = (item) => {
    setSelectedItem(item);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedItem(null);
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
              <th className="border-b border-Tableline border-opacity-30 px-6 py-4 text-center text-[12px] font-semibold text-gray-600">
                Action
              </th>
            </tr>
          </thead>
          <tbody className="bg-white">
            {paginatedData.map((item, index) => (
              <tr
                key={index}
                onClick={() => handleRowClick(item)}
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
                <td className="px-6 py-4 text-center">
                  {onArchive && (
                    <div className="flex items-center justify-center">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onArchive(item);
                        }}
                        className="flex items-center justify-center h-6 w-6 rounded bg-gray-100 border border-Tableline border-opacity-50 hover:bg-gray-200"
                      >
                        <Archive className="h-4 w-4 text-gray-600" />
                      </button>
                    </div>
                  )}
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

      {/* Modal */}
      {showModal && selectedItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4">
          <div className="w-full max-w-md rounded-lg bg-white p-6 shadow-lg">
            <h3 className="mb-4 text-lg font-semibold">Invoice Details</h3>
            {columns.map((column) => (
              <div key={column.key} className="mb-2">
                <span className="font-medium">{column.header}: </span>
                <span>{selectedItem[column.key]}</span>
              </div>
            ))}
            <div className="mt-6 flex justify-end">
              <button
                onClick={handleCloseModal}
                className="rounded bg-gray-100 px-4 py-2 text-sm text-gray-600 hover:bg-gray-200"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

ClickableTable.propTypes = {
  columns: PropTypes.arrayOf(
    PropTypes.shape({
      key: PropTypes.string.isRequired,
      header: PropTypes.string.isRequired,
    })
  ).isRequired,
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
  onArchive: PropTypes.func,
};

export default ClickableTable;
