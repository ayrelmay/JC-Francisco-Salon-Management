import DataTable from "../../components/Global/datatable"; // Import the DataTable component

const payments = [
  {
    id: "1",
    chair: "Chair 6",
    name: "Cathy C.",
    beautyTech: "Momo Jerez",
    time: "1pm-3pm",
    amount: 8000,
  },
  {
    id: "2",
    chair: "Chair 5",
    name: "Janus M.",
    beautyTech: "Momo Jerez",
    time: "1pm-3pm",
    amount: 8000,
  },
  {
    id: "3",
    chair: "Chair 4",
    name: "Gem B.",
    beautyTech: "Momo Jerez",
    time: "1pm-3pm",
    amount: 8000,
  },
  {
    id: "4",
    chair: "Chair 3",
    name: "Sebastian C.",
    beautyTech: "Momo Jerez",
    time: "1pm-3pm",
    amount: 8000,
  },
  {
    id: "5",
    chair: "Chair 1",
    name: "Cy B.",
    beautyTech: "Momo Jerez",
    time: "1pm-3pm",
    amount: 8000,
  },
  {
    id: "6",
    chair: "Chair 2",
    name: "Popoy R.",
    beautyTech: "Momo Jerez",
    time: "1pm-3pm",
    amount: 8000,
  },
  {
    id: "7",
    chair: "Chair 7",
    name: "Maria S.",
    beautyTech: "Momo Jerez",
    time: "1pm-3pm",
    amount: 8000,
  },
  {
    id: "8",
    chair: "Chair 8",
    name: "John D.",
    beautyTech: "Momo Jerez",
    time: "1pm-3pm",
    amount: 8000,
  },
  {
    id: "9",
    chair: "Chair 9",
    name: "Anna P.",
    beautyTech: "Momo Jerez",
    time: "1pm-3pm",
    amount: 8000,
  },
  {
    id: "10",
    chair: "Chair 10",
    name: "Mike R.",
    beautyTech: "Momo Jerez",
    time: "1pm-3pm",
    amount: 8000,
  },
];

const PaymentTable = () => {
  // Define the columns for the DataTable without the action column
  const columns = [
    { key: "chair", header: "Chair" },
    { key: "name", header: "Name" },
    { key: "beautyTech", header: "Beauty Tech" },
    { key: "time", header: "Time" },
    { key: "amount", header: "Amount" },
  ];

  // Define the onEdit and onDelete functions (if needed)
  const handleEdit = (payment) => {
    // Implement edit functionality
    console.log("Edit", payment);
  };

  const handleDelete = (payment) => {
    // Implement delete functionality
    console.log("Delete", payment);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-6 lg:p-8">
      <div className="mx-auto max-w-7xl">
        {/* Header with left-aligned title */}
        <div className="mb-6 text-left">
          <h1 className="text-2xl font-bold text-gray-900">Payment</h1>
        </div>

        {/* DataTable with limited rows and no action column */}
        <DataTable
          columns={columns}
          data={payments.slice(0, 10)} // Limit data to the first 10 rows
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      </div>
    </div>
  );
};

export default PaymentTable;
