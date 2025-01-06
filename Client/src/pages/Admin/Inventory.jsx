import { useState, useEffect } from "react";
import DataTable from "../../components/Global/datatable";
import SearchBar from "../../components/Global/SearchBar";
import { SquarePen, ArchiveRestore } from "lucide-react"; // Add this import
import ConfirmationModal from "../../components/Global/ConfirmationModal"; // Import ConfirmationModal
import SecondaryBtn from "../../components/Global/SecondaryBtn";
import PrimaryBtn from "../../components/Global/PrimaryBtn";
import AddInventoryModal from "../../components/Admin/AddInventoryModal"; // Import AddInventoryModal
import SuccessfulToast from "../../components/Global/SuccessfulToast";
import EditItemModal from "../../components/Admin/EditItemModal";
import ViewItemModal from "../../components/Admin/ViewItemModal";

const Inventory = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedItem, setSelectedItem] = useState(null);
  const [inventoryItems, setInventoryItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showConfirmation, setShowConfirmation] = useState(false); // State for confirmation modal
  const [showAddItemModal, setShowAddItemModal] = useState(false); // New state for AddInventoryModal
  const [showToast, setShowToast] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false); // Separate state for edit modal
  const [showViewModal, setShowViewModal] = useState(false); // Separate state for view modal
  // const [showArchived, setShowArchived] = useState(false); // State to manage showing archived items
  const [toastMessage, setToastMessage] = useState({ title: "", message: "" }); // Add this new state

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
  const renderActionButtons = (item) => (
    <>
      <button
        onClick={(e) => handleEdit(e, item)}
        className="flex items-center justify-center w-8 h-8 rounded bg-blue-50 text-blue-600 hover:bg-blue-100 border border-Tableline border-opacity-30"
      >
        <SquarePen className="h-4 w-4 text-FontPrimary" />
      </button>
      <button
        onClick={(e) => {
          e.stopPropagation();
          handleDelete(item);
        }}
        className="flex items-center justify-center w-8 h-8 rounded bg-red-50 text-red-600 hover:bg-red-100 border border-Tableline border-opacity-30"
      >
        <ArchiveRestore className="h-4 w-4" />
      </button>
    </>
  );

  // Update handleEdit function to show only EditModal
  const handleEdit = (e, item) => {
    e.stopPropagation(); // Prevent row click event from firing
    setSelectedItem(item);
    setShowEditModal(true);
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

  // Update handleAddSuccess to include specific message
  const handleAddSuccess = () => {
    setToastMessage({
      title: "Item Added",
      message: "New inventory item has been added successfully!",
    });
    setShowToast(true);
    fetchInventory(); // Refresh the data
    setTimeout(() => {
      setShowToast(false);
    }, 2000);
  };

  // Update handleEditSuccess to include specific message
  const handleEditSuccess = () => {
    setToastMessage({
      title: "Changes Saved",
      message: "Item details have been updated successfully!",
    });
    setShowToast(true);
    fetchInventory(); // Refresh the data
    setTimeout(() => {
      setShowToast(false);
    }, 2000);
  };

  // Update handleRowClick to show only ViewModal
  const handleRowClick = (item) => {
    setSelectedItem(item);
    setShowViewModal(true);
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

      {/* Render AddInventoryModal with onSuccess */}
      {showAddItemModal && (
        <AddInventoryModal
          onClose={() => setShowAddItemModal(false)}
          onSuccess={handleAddSuccess}
        />
      )}

      {loading ? (
        <div className="text-center py-4">Loading...</div>
      ) : (
        <DataTable
          columns={columns}
          data={inventoryItems.map((item) => ({
            ...item,
            statusColor: getStatusColor(item),
            onClick: () => handleRowClick(item),
          }))}
          actionButtons={renderActionButtons}
          onRowClick={handleRowClick}
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

      {/* Edit Modal */}
      {showEditModal && (
        <EditItemModal
          item={selectedItem}
          onClose={() => {
            setShowEditModal(false);
            setSelectedItem(null);
          }}
          onSuccess={handleEditSuccess}
        />
      )}

      {/* View Modal */}
      {showViewModal && (
        <ViewItemModal
          item={selectedItem}
          onClose={() => {
            setShowViewModal(false);
            setSelectedItem(null);
          }}
          onSuccess={handleEditSuccess}
        />
      )}

      {/* Update SuccessfulToast to use dynamic messages */}
      <SuccessfulToast
        isVisible={showToast}
        title={toastMessage.title}
        message={toastMessage.message}
        onClose={() => setShowToast(false)}
        duration={2000}
      />
    </div>
  );
};

export default Inventory;
