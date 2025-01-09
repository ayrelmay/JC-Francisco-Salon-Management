import PropTypes from "prop-types";
import { Archive } from "lucide-react";
import { useState } from "react";

function ClickableTable({ columns, data, onArchive, onRowClick }) {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 7;

  const handleRowClick = async (invoice) => {
    try {
      // First get invoice details to get payment_id
      const invoiceResponse = await fetch(
        `http://localhost:3000/api/invoice/${invoice.id}`
      );
      const invoiceData = await invoiceResponse.json();
      const paymentId = invoiceData.payment_id;

      // Get payment info using payment_id
      const paymentResponse = await fetch(
        `http://localhost:3000/api/payment/${paymentId}`
      );
      const paymentData = await paymentResponse.json();

      // Get payment details (services) using payment_id
      const detailsResponse = await fetch(
        `http://localhost:3000/api/paymentdetails/bypayment/${paymentId}`
      );
      const detailsData = await detailsResponse.json();

      const invoiceDetails = {
        ...invoice,
        services: detailsData.map((service) => ({
          name: service.ServiceId,
          price: parseFloat(service.Price),
        })),
        beautyTech: paymentData.BeautyTech,
        totalAmount: parseFloat(paymentData.TotalAmount),
        additionalFee: parseFloat(paymentData.AdditionalFee || 0),
        amountPaid: parseFloat(paymentData.AmountPaid),
        change: parseFloat(paymentData.ChangeGiven),
        customerName: paymentData.CustomerName,
        chairNumber: paymentData.ChairNumber,
      };

      console.log("Payment Data:", paymentData);
      console.log("Invoice Details:", invoiceDetails);

      // Call the parent's onRowClick with all the data
      if (onRowClick) {
        onRowClick(invoiceDetails);
      }
    } catch (error) {
      console.error("Error fetching payment details:", error);
      // Add more detailed error logging
      if (error.response) {
        console.error("Response data:", error.response.data);
        console.error("Response status:", error.response.status);
      }
    }
  };

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
                className="border-b border-Tableline border-opacity-50 transition-colors hover:bg-gray-50 cursor-pointer"
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
  onRowClick: PropTypes.func,
};

export default ClickableTable;
