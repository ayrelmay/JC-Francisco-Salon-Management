import { useState, useEffect } from "react"; // Add these imports
import DataTable from "../../components/Global/datatable";
import { useNavigate } from "react-router-dom"; // Add this import at the top
import PrimaryBtn from "../../components/Global/PrimaryBtn";

const PaymentTable = () => {
  const [payments, setPayments] = useState([]); // Add state for payments
  const navigate = useNavigate(); // Add this hook

  // Define the columns for the DataTable
  const columns = [
    { key: "Id", header: "ID" },
    { key: "CustomerName", header: "Customer Name" },
    { key: "BeautyTech", header: "Beauty Tech" },
    { key: "ChairNumber", header: "Chair Number" },
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

  // Filter payments to only include those with status 'pending'
  const filteredPayments = payments.filter(
    (payment) => payment.Status === "pending"
  );

  // Add this log to see what's being passed to DataTable
  console.log("Payments state:", payments);
  const handleRowClick = (payment) => {
    navigate(`/payment/edit/${payment.Id}`, {
      state: {
        paymentData: {
          Id: payment.Id,
          CustomerName: payment.CustomerName,
          BeautyTech: payment.BeautyTech,
          ChairNumber: payment.ChairNumber,
          Status: payment.Status,
          AdditionalFee: payment.AdditionalFee,
          TotalAmount: payment.TotalAmount,
          AmountPaid: payment.AmountPaid,
          ChangeGiven: payment.ChangeGiven,
        },
      },
    });
  };

  const handleNewPayment = () => {
    navigate("/payment/edit/new"); // Navigate to new payment form
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-6 lg:p-8">
      <div className="mx-auto max-w-7xl">
        <div className="flex justify-end mb-4">
          <div className="w-{15px}/12">
            <PrimaryBtn onClick={handleNewPayment}>New Payment</PrimaryBtn>
          </div>
        </div>

        <DataTable
          columns={columns}
          data={filteredPayments}
          onRowClick={handleRowClick}
        />
      </div>
    </div>
  );
};

export default PaymentTable;
