import { Search, Filter } from "lucide-react";
import { useState } from "react";
//import DataTable from "../../components/Global/datatable"; // Assuming this is the correct path for the new component
import ClickableTable from "../../components/Global/ClickableTable";

const InvoiceHistory = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [selectedInvoice] = useState(null);
  // const [selectedInvoice, setSelectedInvoice] = useState(null); //with clickable data

  const invoices = [
    {
      id: "INV24112601",
      customerName: "Cathy Capistrano",
      date: "November 26, 2024",
      amount: "Php 4,000.00",
    },
    {
      id: "INV24112602",
      customerName: "John Doe",
      date: "November 27, 2024",
      amount: "Php 2,500.00",
    },
    {
      id: "INV24112603",
      customerName: "Jane Smith",
      date: "November 28, 2024",
      amount: "Php 5,000.00",
    },
    // Add more invoices as needed
  ];

  const columns = [
    { key: "id", header: "Invoice ID" },
    { key: "customerName", header: "Customer Name" },
    { key: "date", header: "Date" },
    { key: "amount", header: "Amount" },
  ];

  return (
    <div className="p-8">
      {/* Search and Filters */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <div className="relative flex-1 max-w-md w-full">
          <input
            type="text"
            placeholder="Search"
            className="w-full pl-10 pr-4 py-2 border rounded-md"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
        </div>
        <div className="flex gap-2">
          <button className="px-4 py-2 bg-gray-800 text-white rounded-md flex items-center gap-2">
            <Filter className="h-4 w-4" />
            Filter
          </button>
          <button className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50">
            Archive
          </button>
        </div>
      </div>

      {/* Invoice Table */}
      <ClickableTable
        columns={columns}
        data={invoices}
        onArchive={(item) => {
          // Handle archive action
          console.log("Archive item:", item);
        }}
      />

      {/* Modal Placeholder */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg p-6 max-w-lg w-full">
            <h2 className="text-xl font-bold mb-4">Invoice Details</h2>
            <p>Modal content for Invoice {selectedInvoice?.id} will go here</p>
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

export default InvoiceHistory;
