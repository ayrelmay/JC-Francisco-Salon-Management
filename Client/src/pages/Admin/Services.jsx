import { useState, useEffect } from "react";
import DataTable from "../../components/Global/datatable";
import AddServiceModal from "../../components/Admin/AddServiceModal";
import SearchBar from "../../components/Global/SearchBar";
import ActionButtons from "../../components/Global/ActionButtons";
import ConfirmationModal from "../../components/Global/ConfirmationModal";
import SuccessfulToast from "../../components/Global/SuccessfulToast";
import { SquarePen, ArchiveRestore } from "lucide-react";
import EditServiceModal from "../../components/Admin/EditServiceModal";

const Services = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [servicesOffer, setServicesOffer] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const [serviceToDelete, setServiceToDelete] = useState(null);
  const [showSuccessToast, setShowSuccessToast] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedService, setSelectedService] = useState(null);

  const API_URL = "http://localhost:3000/api/service";

  const fetchServices = async () => {
    try {
      setLoading(true);
      const response = await fetch(API_URL);
      if (!response.ok) {
        throw new Error("Failed to fetch services");
      }
      const data = await response.json();
      setServicesOffer(data);
      setLoading(false);
    } catch (err) {
      console.error("Error fetching services:", err);
      setError(err.message);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchServices();
  }, []);

  const handleAddService = () => setShowModal(true);
  const handleModalClose = () => setShowModal(false);

  const handleServiceAdded = async () => {
    await fetchServices(); // Refresh the services list
  };

  const handleDelete = async (service) => {
    setServiceToDelete(service);
    setIsConfirmModalOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (!serviceToDelete) return;

    try {
      const response = await fetch(`${API_URL}/${serviceToDelete.Id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ archived: 0 }),
      });

      const responseData = await response.json();

      if (!response.ok) {
        throw new Error(
          `Failed to update service: ${
            responseData.message || response.statusText
          }`
        );
      }

      alert(`Service ${serviceToDelete.ServiceName} restored from archive!`);
      await fetchServices(); // This will refresh just the data
    } catch (err) {
      console.error("Error updating service:", err);
      setError(`Update failed: ${err.message}`);
    } finally {
      setIsConfirmModalOpen(false);
      setServiceToDelete(null);
    }
  };

  const handleArchive = () => {
    // Add your archive logic here
    console.log("Archiving services");
  };

  const handleServiceEdited = async () => {
    await fetchServices(); // Refresh the services list
    setShowSuccessToast(true);

    setTimeout(() => {
      setShowSuccessToast(false);
    }, 3000);
  };

  const handleEdit = (service) => {
    setSelectedService(service);
    setIsEditModalOpen(true);
  };

  const columns = [
    { key: "Id", header: "Service ID" },
    { key: "ServiceName", header: "Service Name" },
    { key: "ServicePrice", header: "Minimum Price" },
    { key: "Duration", header: "Est. Duration" },
    { key: "Category", header: "Category" },
  ];

  const filteredData = servicesOffer.filter(
    (service) =>
      service.archived === 1 &&
      (service.ServiceName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        service.Id?.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const renderActionButtons = (service) => (
    <>
      <button
        onClick={() => handleEdit(service)}
        className="flex items-center justify-center w-8 h-8 rounded bg-blue-50 text-blue-600 hover:bg-blue-100 border border-Tableline border-opacity-30"
      >
        <SquarePen className="h-4 w-4" />
      </button>
      <button
        onClick={() => handleDelete(service)}
        className="flex items-center justify-center w-8 h-8 rounded bg-red-50 text-red-600 hover:bg-red-100 border border-Tableline border-opacity-30"
      >
        <ArchiveRestore className="h-4 w-4" />
      </button>
    </>
  );

  return (
    <div className="p-8 max-w-7xl mx-auto">
      {isConfirmModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-30 z-40"></div>
      )}
      {error && <p className="text-red-500">Error: {error}</p>}

      {loading ? (
        <p>Loading services...</p>
      ) : (
        <>
          <div className="flex flex-col sm:flex-row justify-between gap-4 mb-6">
            <SearchBar value={searchTerm} onChange={setSearchTerm} />
            <ActionButtons onAdd={handleAddService} onArchive={handleArchive} />
          </div>

          <DataTable
            columns={columns}
            data={filteredData}
            actionButtons={renderActionButtons}
          />
        </>
      )}

      {showModal && (
        <AddServiceModal
          onClose={handleModalClose}
          onServiceAdded={handleServiceAdded}
        />
      )}

      <ConfirmationModal
        isOpen={isConfirmModalOpen}
        onClose={() => setIsConfirmModalOpen(false)}
        onConfirm={handleConfirmDelete}
        title="Confirm Delete"
        message={`Are you sure you want to delete ${serviceToDelete?.ServiceName}?`}
      />

      {showSuccessToast && (
        <SuccessfulToast
          message="Service Updated"
          subMessage="Service Updated"
          onClose={() => setShowSuccessToast(false)}
        />
      )}

      {isEditModalOpen && (
        <EditServiceModal
          isOpen={isEditModalOpen}
          onClose={() => setIsEditModalOpen(false)}
          service={selectedService}
          onServiceEdited={handleServiceEdited}
          initialData={selectedService}
        />
      )}
    </div>
  );
};

export default Services;
