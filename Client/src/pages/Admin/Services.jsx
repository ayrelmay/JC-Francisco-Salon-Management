import { useState, useEffect } from "react";
import DataTable from "../../components/Global/datatable";
import AddServiceModal from "../../components/Admin/AddServiceModal";
import SearchBar from "../../components/Global/SearchBar";
import ActionButtons from "../../components/Global/ActionButtons";
import ConfirmationModal from "../../components/Global/ConfirmationModal";
import SuccessfulToast from "../../components/Global/SuccessfulToast";

const Services = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [servicesOffer, setServicesOffer] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const [serviceToDelete, setServiceToDelete] = useState(null);
  const [showSuccessToast, setShowSuccessToast] = useState(false);

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

  const columns = [
    { key: "Id", header: "Service ID" },
    { key: "ServiceName", header: "Service Name" },
    { key: "ServicePrice", header: "Minimum Price" },
    { key: "Duration", header: "Est. Duration" },
    { key: "Category", header: "Category" },
  ];

  const filteredServicesOffer = servicesOffer.filter(
    (service) =>
      service.ServiceName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      service.Id?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-6 max-w-7xl mx-auto">
      {isConfirmModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-30 z-40"></div>
      )}

      <h1 className="text-left text-2xl font-bold mb-6">Services</h1>

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
            title="Services"
            columns={columns}
            data={filteredServicesOffer}
            onDelete={handleDelete}
            onRefresh={handleServiceEdited}
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
    </div>
  );
};

export default Services;
