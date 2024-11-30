import { useState } from "react";
import DataTable from "../../components/Global/datatable";
import AddServiceModal from "../../components/Admin/AddServiceModal";
import SearchBar from "../../components/Global/SearchBar";
import ActionButtons from "../../components/Global/ActionButtons";
import useFetchServices from "../../hooks/useFetchServices";

const Services = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [showModal, setShowModal] = useState(false);

  const { servicesOffer, loading, error } = useFetchServices(
    "http://localhost:3000/api/service"
  );

  const handleAddService = () => setShowModal(true);
  const handleModalClose = () => setShowModal(false);

  const handleDelete = (service) => {
    alert(`Service ${service.name} deleted!`);
  };

  const columns = [
    { key: "id", header: "Service ID" },
    { key: "name", header: "Service Name" },
    { key: "price", header: "Minimum Price" },
    { key: "duration", header: "Est. Duration" },
  ];

  const filteredServicesOffer = servicesOffer.filter(
    (service) =>
      service.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      service.id?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <h1 className="text-left text-2xl font-bold text-PrimaryFont mb-6">
        Services
      </h1>

      {/* Error Handling */}
      {error && <p className="text-red-500">Error: {error}</p>}

      {/* Loading State */}
      {loading ? (
        <p>Loading services...</p>
      ) : (
        <>
          <div className="flex flex-col sm:flex-row justify-between gap-4 mb-6">
            {/* Search Bar */}
            <SearchBar value={searchTerm} onChange={setSearchTerm} />

            {/* Buttons */}
            <ActionButtons onAdd={handleAddService} onArchive={() => {}} />
          </div>

          {/* DataTable Component */}
          <DataTable
            title="Services"
            columns={columns}
            data={filteredServicesOffer}
            onDelete={handleDelete}
          />
        </>
      )}

      {/* AddServiceModal Component */}
      {showModal && (
        <AddServiceModal isOpen={showModal} onClose={handleModalClose} />
      )}
    </div>
  );
};

export default Services;
