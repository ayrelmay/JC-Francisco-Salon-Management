// import { Search, Copy, Filter } from "lucide-react";
// import { useState } from "react";

// const InvoiceHistory = () => {
//   const [searchTerm, setSearchTerm] = useState("");
//   const [showModal, setShowModal] = useState(false);
//   const [selectedInvoice, setSelectedInvoice] = useState(null);

//   const invoices = [
//     {
//       id: "INV24112601",
//       customerName: "Cathy Capistrano",
//       date: "November 26, 2024",
//       amount: "Php 4,000.00",
//     },
//     {
//       id: "INV24112601",
//       customerName: "Cathy Capistrano",
//       date: "November 26, 2024",
//       amount: "Php 4,000.00",
//     },
//     {
//       id: "INV24112601",
//       customerName: "Cathy Capistrano",
//       date: "November 26, 2024",
//       amount: "Php 4,000.00",
//     },
//     {
//       id: "INV24112601",
//       customerName: "Cathy Capistrano",
//       date: "November 26, 2024",
//       amount: "Php 4,000.00",
//     },
//     {
//       id: "INV24112601",
//       customerName: "Cathy Capistrano",
//       date: "November 26, 2024",
//       amount: "Php 4,000.00",
//     },
//     {
//       id: "INV24112601",
//       customerName: "Cathy Capistrano",
//       date: "November 26, 2024",
//       amount: "Php 4,000.00",
//     },
//     {
//       id: "INV24112601",
//       customerName: "Cathy Capistrano",
//       date: "November 26, 2024",
//       amount: "Php 4,000.00",
//     },
//   ];

//   const handleRowClick = (invoice) => {
//     setSelectedInvoice(invoice);
//     setShowModal(true);
//   };

//   return (
//     <div className="p-6">
//       <h1 className="text-2xl font-bold text-PrimaryFont mb-6">
//         Invoice History
//       </h1>

//       {/* Search and Filters */}
//       <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
//         <div className="relative flex-1 max-w-md w-full">
//           <input
//             type="text"
//             placeholder="Search"
//             className="w-full pl-10 pr-4 py-2 border rounded-md"
//             value={searchTerm}
//             onChange={(e) => setSearchTerm(e.target.value)}
//           />
//           <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
//         </div>
//         <div className="flex gap-2">
//           <button className="px-4 py-2 bg-gray-800 text-white rounded-md flex items-center gap-2">
//             <Filter className="h-4 w-4" />
//             Filter
//           </button>
//           <button className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50">
//             Archive
//           </button>
//         </div>
//       </div>

//       {/* Invoice Table */}
//       <div className="bg-white rounded-lg shadow overflow-x-auto">
//         <table className="w-full">
//           <thead>
//             <tr className="bg-gray-50">
//               <th className="px-6 py-3 text-left text-xs font-medium text-PrimaryFont uppercase tracking-wider">
//                 Invoice ID
//               </th>
//               <th className="px-6 py-3 text-left text-xs font-medium text-PrimaryFont uppercase tracking-wider">
//                 Customer Name
//               </th>
//               <th className="px-6 py-3 text-left text-xs font-medium text-PrimaryFont uppercase tracking-wider">
//                 Date
//               </th>
//               <th className="px-6 py-3 text-left text-xs font-medium text-PrimaryFont uppercase tracking-wider">
//                 Amount
//               </th>
//               <th className="px-6 py-3 text-left text-xs font-medium text-PrimaryFont uppercase tracking-wider">
//                 Action
//               </th>
//             </tr>
//           </thead>
//           <tbody className="divide-y divide-gray-200">
//             {invoices.map((invoice, index) => (
//               <tr
//                 key={index}
//                 className="hover:bg-gray-50 cursor-pointer"
//                 onClick={() => handleRowClick(invoice)}
//               >
//                 <td className="px-6 py-4 whitespace-nowrap text-sm text-PrimaryFont">
//                   {invoice.id}
//                 </td>
//                 <td className="px-6 py-4 whitespace-nowrap text-sm text-PrimaryFont">
//                   {invoice.customerName}
//                 </td>
//                 <td className="px-6 py-4 whitespace-nowrap text-sm text-PrimaryFont">
//                   {invoice.date}
//                 </td>
//                 <td className="px-6 py-4 whitespace-nowrap text-sm text-PrimaryFont">
//                   {invoice.amount}
//                 </td>
//                 <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
//                   <button className="hover:text-gray-700">
//                     <Copy className="h-5 w-5" />
//                   </button>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>

//       {/* Modal Placeholder */}
//       {showModal && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
//           <div className="bg-white rounded-lg p-6 max-w-lg w-full">
//             <h2 className="text-xl font-bold mb-4">Invoice Details</h2>
//             <p>Modal content for Invoice {selectedInvoice?.id} will go here</p>
//             <button
//               onClick={() => setShowModal(false)}
//               className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
//             >
//               Close
//             </button>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default InvoiceHistory;

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

  // // Handles row click for invoice details
  // const handleRowClick = (invoice) => {
  //   setSelectedInvoice(invoice);
  //   setShowModal(true);
  // };

  // Function to handle edit (this can be customized further)
  const handleEdit = (invoice) => {
    alert(`Editing Invoice: ${invoice.id}`);
  };

  // Function to handle delete (this can be customized further)
  const handleDelete = (invoice) => {
    alert(`Deleting Invoice: ${invoice.id}`);
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-PrimaryFont mb-6">
        Invoice History
      </h1>

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
        onEdit={handleEdit}
        onDelete={handleDelete}
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
