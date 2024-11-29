import PropTypes from "prop-types";
import { PencilIcon, TrashIcon } from "lucide-react";
import { useState } from "react";

function DataTable({ columns, data, onEdit, onDelete }) {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 7;

  // Pagination logic
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedData = data.slice(startIndex, startIndex + itemsPerPage);
  const totalPages = Math.ceil(data.length / itemsPerPage);

  const handlePageChange = (page) => {
    setCurrentPage(page);
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
              {(onEdit || onDelete) && (
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
                {(onEdit || onDelete) && (
                  <td className="px-6 py-4">
                    <div className="flex items-center justify-center gap-2">
                      {onEdit && (
                        <button
                          onClick={() => onEdit(item)}
                          className="flex items-center justify-center h-6 w-6 rounded bg-gray-100 border border-Tableline border-opacity-50 hover:bg-gray-200"
                        >
                          <PencilIcon className="h-4 w-4 text-gray-600" />
                        </button>
                      )}
                      {onDelete && (
                        <button
                          onClick={() => onDelete(item)}
                          className="flex items-center justify-center h-6 w-6 rounded bg-gray-100 border border-Tableline border-opacity-50 hover:bg-gray-200"
                        >
                          <TrashIcon className="h-4 w-4 text-gray-600" />
                        </button>
                      )}
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
};

export default DataTable;
