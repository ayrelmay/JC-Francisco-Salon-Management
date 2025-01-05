import { useState, useEffect } from "react";
import DataTable from "../../components/Global/datatable";
import SearchBar from "../../components/Global/SearchBar";
import { SquarePen, ArchiveRestore } from "lucide-react"; // Add this import
import ConfirmationModal from "../../components/Global/ConfirmationModal"; // Import ConfirmationModal
import SecondaryBtn from "../../components/Global/SecondaryBtn";
import PrimaryBtn from "../../components/Global/PrimaryBtn";
import AddInventoryModal from "../../components/Admin/AddInventoryModal"; // Import AddInventoryModal

const Inventory = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [inventoryItems, setInventoryItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showConfirmation, setShowConfirmation] = useState(false); // State for confirmation modal
  const [showAddItemModal, setShowAddItemModal] = useState(false); // New state for AddInventoryModal
  // const [showArchived, setShowArchived] = useState(false); // State to manage showing archived items

  // New function to fetch inventory items with optional archived filter
  const fetchInventory = async (archived = false) => {
    setLoading(true);
    try {
      const response = await fetch(
        `http://localhost:3000/api/inventory?archived=${archived ? 1 : 0}`
      );
      const data = await response.json();
      setInventoryItems(data);
    } catch (error) {
      console.error("Error fetching inventory:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchInventory(); // Fetch inventory items on component mount
  }, []);

  // New function to fetch the status of an item
  const fetchItemStatus = (item) => {
    return item.status.toLowerCase().trim(); // Fetching the status
  };

  const getStatusColor = (item) => {
    const status = fetchItemStatus(item); // Using the new function to get the status
    switch (status) {
      case "In Stock":
        return "bg-green bg-opacity-25 text-green-800 border-green-500";
      case "Out of Stock":
        return "bg-red-500 bg-opacity-25 text-red-800 border-red-500";
      case "low in stock":
        return "bg-yellow-500 bg-opacity-25 text-yellow-800 border-yellow-500";
      default:
        return "bg-gray-200 text-gray-800 border-gray-300";
    }
  };

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
    },
  ];

  // New function to handle showing the Add Inventory Modal
  const handleAddItem = () => {
    setShowAddItemModal(true); // Show the AddInventoryModal
  };

  // New function to handle showing archived items
  // const handleShowArchived = () => {
  //   setShowArchived(!showArchived); // Toggle the showArchived state
  //   fetchInventory(!showArchived); // Fetch inventory items based on the new state
  // };

  // Update handleDelete function to show confirmation modal
  const handleDelete = (item) => {
    setSelectedItem(item); // Set the selected item for confirmation
    setShowConfirmation(true); // Show the confirmation modal
  };

  // Function to confirm archiving the item
  const confirmArchive = async () => {
    if (selectedItem) {
      try {
        const response = await fetch(
          `http://localhost:3000/api/inventory/archive/${selectedItem.id}`,
          {
            method: "PUT",
          }
        );
        if (response.ok) {
          alert(`Item ${selectedItem.name} archived!`);
          await fetchInventory(); // Refresh the inventory items after archiving
        } else {
          alert("Failed to archive item.");
        }
      } catch (error) {
        console.error("Error archiving item:", error);
        alert("Error archiving item.");
      } finally {
        setShowConfirmation(false); // Close the confirmation modal
        setSelectedItem(null); // Clear the selected item
      }
    }
  };

  return (
    <div className="p-8 max-w-7xl mx-auto">
      {/* Search and Action Buttons */}
      <div className="flex flex-col sm:flex-row justify-between gap-4 mb-6">
        <SearchBar value={searchTerm} onChange={setSearchTerm} />
        <div className="flex items-center gap-2">
          <PrimaryBtn onClick={handleAddItem}>Add Item</PrimaryBtn>
          <SecondaryBtn>Archive</SecondaryBtn>
        </div>
      </div>

      {/* Render AddInventoryModal */}
      {showAddItemModal && (
        <AddInventoryModal onClose={() => setShowAddItemModal(false)} />
      )}

      {loading ? (
        <div className="text-center py-4">Loading...</div>
      ) : (
        <DataTable
          columns={columns}
          data={inventoryItems.map((item) => ({
            ...item,
            statusColor: getStatusColor(item), // Add status color to each item
          }))}
          actionButtons={renderActionButtons}
          renderRow={(item) => (
            <tr key={item.id} className={item.statusColor}>
              <td>{item.id}</td>
              <td>{item.name}</td>
              <td>{item.category}</td>
              <td>{item.quantity}</td>
              <td>{item.status}</td>
            </tr>
          )}
        />
      )}

      {/* Confirmation Modal */}
      <ConfirmationModal
        isOpen={showConfirmation}
        onClose={() => setShowConfirmation(false)}
        onConfirm={confirmArchive}
        message="Are you sure you want to archive this item?"
        cancelButtonText="Cancel"
        confirmButtonText="Proceed"
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
