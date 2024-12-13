import { useState, useEffect } from "react"; // Add these imports
import DataTable from "../../components/Global/datatable";
import { SquarePen, Trash2 } from "lucide-react";

const PaymentTable = () => {
  const [payments, setPayments] = useState([]); // Add state for payments

  // Define the columns for the DataTable
  const columns = [
    { key: "Id", header: "ID" },
    { key: "CustomerName", header: "Customer Name" },
    { key: "BeautyTech", header: "Beauty Tech" },
    { key: "TotalTime", header: "Total Time" },
    { key: "TotalAmount", header: "Total Amount" },
    { key: "Status", header: "Status" },
  ];

  // Add useEffect to fetch payments when component mounts
  useEffect(() => {
    const fetchPayments = async () => {
      try {
        const response = await fetch("http://localhost:3000/api/payment");
        if (!response.ok) {
          throw new Error("Failed to fetch payments");
        }
        const data = await response.json();
        console.log("Fetched payments:", data);
        setPayments(data);
      } catch (error) {
        console.error("Error fetching payments:", error);
      }
    };

    fetchPayments();
  }, []);

  // Add this log to see what's being passed to DataTable
  console.log("Payments state:", payments);

  const handleEdit = (payment) => {
    console.log("Edit", payment);
  };

  const handleDelete = (payment) => {
    console.log("Delete", payment);
  };

  const renderActionButtons = (payment) => (
    <>
      <button
        onClick={() => handleEdit(payment)}
        className="flex items-center justify-center w-8 h-8 rounded bg-blue-50 text-blue-600 hover:bg-blue-100 border border-Tableline border-opacity-30"
      >
        <SquarePen className="h-4 w-4" />
      </button>
      <button
        onClick={() => handleDelete(payment)}
        className="flex items-center justify-center w-8 h-8 rounded bg-red-50 text-red-600 hover:bg-red-100 border border-Tableline border-opacity-30"
      >
        <Trash2 className="h-4 w-4" />
      </button>
    </>
  );

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-6 lg:p-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-6 text-left">
          <h1 className="text-2xl font-bold text-gray-900">Payment</h1>
        </div>

        <DataTable
          columns={columns}
          data={payments}
          actionButtons={renderActionButtons}
        />
      </div>
    </div>
  );
};

export default PaymentTable;
