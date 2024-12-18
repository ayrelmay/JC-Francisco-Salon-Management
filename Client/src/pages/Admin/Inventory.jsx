import { useState, useEffect } from "react";
import DataTable from "../../components/Global/datatable";
import SearchBar from "../../components/Global/SearchBar";
import ActionButtons from "../../components/Global/ActionButtons"; // Add your action buttons component
import { SquarePen, ArchiveRestore } from "lucide-react"; // Add this import

const Inventory = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [inventoryItems, setInventoryItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchInventory = async () => {
      try {
        const response = await fetch("http://localhost:3000/api/inventory");
        const data = await response.json();
        setInventoryItems(data);
      } catch (error) {
        console.error("Error fetching inventory:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchInventory();
  }, []);

  // Add this render function for action buttons
  const renderActionButtons = (inventoryItems) => (
    <>
      <button
        onClick={() => handleEdit(inventoryItems)}
        className="flex items-center justify-center w-8 h-8 rounded bg-blue-50 text-blue-600 hover:bg-blue-100 border border-Tableline border-opacity-30"
      >
        <SquarePen className="h-4 w-4 text-FontPrimary" />
      </button>
      <button
        onClick={() => handleDelete(inventoryItems)}
        className="flex items-center justify-center w-8 h-8 rounded bg-red-50 text-red-600 hover:bg-red-100 border border-Tableline border-opacity-30"
      >
        <ArchiveRestore className="h-4 w-4" />
      </button>
    </>
  );

  // Add handleEdit function
  const handleEdit = (item) => {
    setSelectedItem(item);
    setShowModal(true);
  };

  // Define the columns for the DataTable
  const columns = [
    { key: "id", header: "Item ID" },
    { key: "name", header: "Item Name" },
    { key: "category", header: "Category" },
    { key: "quantity", header: "Quantity" },
    {
      key: "status",
      header: "Status",
      render: (item) => (
        <div className="flex items-center">
          <span
            className={`inline-block w-3 h-3 mr-2 rounded-full ${
              item.status === "Out of Stock"
                ? "bg-green"
                : item.status === "Low Stock"
                ? "bg-yellow"
                : "bg-red"
            }`}
          ></span>
          {item.status}
        </div>
      ),
    },
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
    <div className="p-8 max-w-7xl mx-auto">
      {/* Search and Action Buttons */}
      <div className="flex flex-col sm:flex-row justify-between gap-4 mb-6">
        <SearchBar value={searchTerm} onChange={setSearchTerm} />
        <ActionButtons onAdd={handleAddItem} onArchive={() => {}} />
      </div>

      {loading ? (
        <div className="text-center py-4">Loading...</div>
      ) : (
        <DataTable
          columns={columns}
          data={inventoryItems}
          actionButtons={renderActionButtons}
        />
      )}

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
