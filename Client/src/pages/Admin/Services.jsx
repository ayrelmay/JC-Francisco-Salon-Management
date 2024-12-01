import { useState, useEffect } from "react";
import DataTable from "../../components/Global/datatable";
import AddServiceModal from "../../components/Admin/AddServiceModal";
import SearchBar from "../../components/Global/SearchBar";
import ActionButtons from "../../components/Global/ActionButtons";

const Services = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [servicesOffer, setServicesOffer] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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

  const handleServiceAdded = () => {
    fetchServices(); // Refresh services after adding
  };

  const handleDelete = (service) => {
    alert(`Service ${service.ServiceName} deleted!`);
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
      <h1 className="text-left text-2xl font-bold mb-6">Services</h1>

      {error && <p className="text-red-500">Error: {error}</p>}

      {loading ? (
        <p>Loading services...</p>
      ) : (
        <>
          <div className="flex flex-col sm:flex-row justify-between gap-4 mb-6">
            <SearchBar value={searchTerm} onChange={setSearchTerm} />
            <ActionButtons onAdd={handleAddService} />
          </div>

          <DataTable
            title="Services"
            columns={columns}
            data={filteredServicesOffer}
            onDelete={handleDelete}
          />
        </>
      )}

      {showModal && (
        <AddServiceModal
          isOpen={showModal}
          onClose={handleModalClose}
          onServiceAdded={handleServiceAdded}
        />
      )}
    </div>
  );
};

export default Services;
