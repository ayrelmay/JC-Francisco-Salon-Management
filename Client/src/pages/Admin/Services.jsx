import { useState } from "react";
import DataTable from "../../components/Global/datatable";
import PrimaryBtn from "../../components/Global/PrimaryBtn";
import SecondaryBtn from "../../components/Global/SecondaryBtn";

const Services = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [selectedService, setSelectedService] = useState(null);

  const ServicesOffer = [
    {
      id: "SRV-0001",
      name: "Brazilian Blowout",
      price: 1000.0,
      duration: "3 hours",
    },
    { id: "SRV-0002", name: "Curler Iron", price: 300.0, duration: "1 hours" },
    { id: "SRV-0003", name: "Hair Color", price: 500.0, duration: "5 hours" },
    { id: "SRV-0004", name: "Hair Curler", price: 700.0, duration: "1 hours" },
    { id: "SRV-0005", name: "Hair Iron", price: 500.0, duration: "1 hours" },
    { id: "SRV-0006", name: "Hair Spa", price: 500.0, duration: "2 hours" },
    { id: "SRV-0007", name: "Highlights", price: 700.0, duration: "2 hours" },
    { id: "SRV-0008", name: "Rebond", price: 1200.0, duration: "5 hours" },
    {
      id: "SRV-0009",
      name: "Rebond Brazilian",
      price: 2000.0,
      duration: "8 hours",
    },
  ];

  const handleEdit = (service) => {
    setSelectedService(service);
    setShowModal(true);
  };

  const handleDelete = (service) => {
    alert(`Service ${service.name} deleted!`);
  };

  const columns = [
    { key: "id", header: "Service ID" },
    { key: "name", header: "Service Name" },
    { key: "price", header: "Minimum Price", width: "w-1/6" },
    { key: "duration", header: "Est. Duration", width: "w-1/6" },
  ];

  const filteredServicesOffer = ServicesOffer.filter(
    (service) =>
      service.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      service.id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <h1 className="text-left text-2xl font-bold text-PrimaryFont mb-6">
        Services
      </h1>

      <div className="flex flex-col sm:flex-row justify-between gap-4 mb-6">
        {/* Search Bar */}
        <div className="flex-1 max-w-md relative">
          <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="grey"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </span>
          <input
            type="text"
            placeholder="Search"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-4 py-2 text-xs sm:text-sm rounded-lg border-Tableline border-[0.85px] border-opacity-50"
          />
        </div>

        {/* Buttons */}
        <div className="flex gap-2">
          <PrimaryBtn>Add Service</PrimaryBtn>
          <SecondaryBtn>Archive</SecondaryBtn>
        </div>
      </div>

      {/* DataTable Component */}
      <DataTable
        title="Services"
        columns={columns}
        data={filteredServicesOffer}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />

      {/* Modal Placeholder */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg">
            <h2 className="text-xl font-bold mb-4">Service Details</h2>
            <p>Modal content for {selectedService?.name} will go here</p>
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

export default Services;
