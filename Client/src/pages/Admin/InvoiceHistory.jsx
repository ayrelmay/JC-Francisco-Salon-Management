import { Search, Filter } from "lucide-react";
import { useState, useEffect } from "react";
import ClickableTable from "../../components/Global/ClickableTable";
import ConfirmationModal from "../../components/Global/ConfirmationModal";

const InvoiceHistory = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [showArchiveConfirmation, setShowArchiveConfirmation] = useState(false);
  const [invoiceToArchive, setInvoiceToArchive] = useState(null);
  const [showArchived, setShowArchived] = useState(false);
  const [invoices, setInvoices] = useState([]);

  useEffect(() => {
    const fetchInvoices = async () => {
      try {
        const response = await fetch(
          `http://localhost:3000/api/invoice?archived=${showArchived ? 1 : 0}`
        );
        const data = await response.json();

        const formattedInvoices = data.map((invoice) => ({
          id: invoice.invoice_id,
          customerName: invoice.customer_name,
          date: new Date(invoice.created_at).toLocaleDateString(),
          amount: `Php ${parseFloat(invoice.total_amount).toLocaleString(
            "en-US",
            {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            }
          )}`,
        }));

        setInvoices(formattedInvoices);
      } catch (error) {
        console.error("Error fetching invoices:", error);
      }
    };

    fetchInvoices();
  }, [showArchived]);

  const columns = [
    { key: "id", header: "Invoice ID" },
    { key: "customerName", header: "Customer Name" },
    { key: "date", header: "Date" },
    { key: "amount", header: "Amount" },
  ];

  const handleArchiveClick = (item) => {
    setInvoiceToArchive(item);
    setShowArchiveConfirmation(true);
  };

  const handleArchiveConfirm = async () => {
    if (!invoiceToArchive) return;

    try {
      const response = await fetch(
        `http://localhost:3000/api/invoice/${invoiceToArchive.id}/archived  `,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.ok) {
        const updatedInvoices = invoices.filter(
          (invoice) => invoice.id !== invoiceToArchive.id
        );
        setInvoices(updatedInvoices);
      } else {
        console.error("Failed to archive invoice");
      }
    } catch (error) {
      console.error("Error archiving invoice:", error);
    } finally {
      setShowArchiveConfirmation(false);
      setInvoiceToArchive(null);
    }
  };

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
          <button
            onClick={() => setShowArchived(!showArchived)}
            className={`px-4 py-2 border rounded-md transition-colors ${
              showArchived
                ? "bg-gray-800 text-white border-gray-800"
                : "border-gray-300 hover:bg-gray-50"
            }`}
          >
            {showArchived ? "Show Active" : "Show Archived"}
          </button>
        </div>
      </div>

      {/* Invoice Table */}
      <ClickableTable
        columns={columns}
        data={invoices}
        onArchive={handleArchiveClick}
      />

      <ConfirmationModal
        isOpen={showArchiveConfirmation}
        onClose={() => setShowArchiveConfirmation(false)}
        onConfirm={handleArchiveConfirm}
        message="Are you sure you want to archive this receipt?"
        cancelButtonText="Cancel"
        confirmButtonText="Archive"
      />
    </div>
  );
};

export default InvoiceHistory;
