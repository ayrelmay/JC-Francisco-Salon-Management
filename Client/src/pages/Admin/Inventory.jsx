import { useState } from "react";
import DataTable from "../../components/Global/datatable";
import SearchBar from "../../components/Global/SearchBar";
import ActionButtons from "../../components/Global/ActionButtons"; // Add your action buttons component

const Inventory = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  const inventoryItems = [
    {
      id: "ITM-A0001",
      name: "Bremod Hair Color",
      category: "Hair Color",
      quantity: 20,
      status: "Out of Stock",
    },
    {
      id: "ITM-A0002",
      name: "Rebon Treatment",
      category: "Hair Color",
      quantity: 20,
      status: "Out of Stock",
    },
    {
      id: "ITM-A0003",
      name: "Brazilian Treatment",
      category: "Hair Color",
      quantity: 20,
      status: "Out of Stock",
    },
    {
      id: "ITM-A0004",
      name: "Shampoo",
      category: "Hair Color",
      quantity: 20,
      status: "Out of Stock",
    },
    {
      id: "ITM-A0005",
      name: "Conditioner",
      category: "Hair Color",
      quantity: 20,
      status: "Out of Stock",
    },
    {
      id: "ITM-A0006",
      name: "Nail Polish",
      category: "Hair Color",
      quantity: 20,
      status: "Out of Stock",
    },
    {
      id: "ITM-A0007",
      name: "Oil",
      category: "Hair Color",
      quantity: 20,
      status: "Out of Stock",
    },
  ];

  const handleRowClick = (item) => {
    setSelectedItem(item);
    setShowModal(true);
  };

  // Define the columns for the DataTable
  const columns = [
    { key: "id", header: "Item ID" },
    { key: "name", header: "Item Name" },
    { key: "category", header: "Category" },
    { key: "quantity", header: "Quantity" },
    { key: "status", header: "Status" },
  ];

  // Handle the action buttons
  const handleAddItem = () => {
    // Implement add item logic
    console.log("Add Item clicked");
  };

  const handleDelete = (item) => {
    // Implement delete logic
    alert(`Item ${item.name} deleted!`);
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <h1 className="text-left text-2xl font-bold mb-6">Inventory</h1>

      {/* Search and Action Buttons */}
      <div className="flex flex-col sm:flex-row justify-between gap-4 mb-6">
        <SearchBar value={searchTerm} onChange={setSearchTerm} />
        <ActionButtons onAdd={handleAddItem} onArchive={() => {}} />
      </div>

      {/* DataTable Component */}
      <DataTable
        title="Inventory"
        columns={columns}
        data={inventoryItems.filter(
          (item) =>
            item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            item.id.toLowerCase().includes(searchTerm.toLowerCase())
        )}
        onDelete={handleDelete}
        onRowClick={handleRowClick} // Pass the row click handler
      />

      {/* Modal Placeholder */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg p-6 max-w-lg w-full">
            <h2 className="text-xl font-bold mb-4">Item Details</h2>
            <p>Modal content for {selectedItem?.name} will go here</p>
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

export default Inventory;
