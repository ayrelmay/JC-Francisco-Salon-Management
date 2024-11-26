import { useState } from "react";

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

  const handleRowClick = (service) => {
    setSelectedService(service);
    setShowModal(true);
  };

  const filteredServicesOffer = ServicesOffer.filter(
    (service) =>
      service.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      service.id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <h1 className="text-2xl font-bold text-PrimaryFont mb-6">Services</h1>

      <div className="flex flex-col sm:flex-row justify-between gap-4 mb-6">
        <div className="flex-1 max-w-md">
          <div className="relative">
            <input
              type="text"
              placeholder="Search"
              className="w-full px-4 py-2 border rounded-md pr-10"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <span className="absolute right-3 top-2.5 text-gray-400">
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
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
          </div>
        </div>

        <div className="flex gap-2">
          <button className="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700">
            Filter
          </button>
          <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
            Add Service
          </button>
          <button className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50">
            Archive
          </button>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full border rounded-lg">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-PrimaryFont uppercase tracking-wider">
                Service ID
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-PrimaryFont uppercase tracking-wider">
                Service name
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-PrimaryFont uppercase tracking-wider">
                Minimum price
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-PrimaryFont uppercase tracking-wider">
                Est. Duration
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-PrimaryFont uppercase tracking-wider">
                Action
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredServicesOffer.map((service) => (
              <tr
                key={service.id}
                onClick={() => handleRowClick(service)}
                className="hover:bg-gray-50 cursor-pointer"
              >
                <td className="px-6 py-4 whitespace-nowrap text-sm text-PrimaryFont">
                  {service.id}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-PrimaryFont">
                  {service.name}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-PrimaryFont">
                  ₱{service.price.toFixed(2)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-PrimaryFont">
                  {service.duration}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-PrimaryFont">
                  <div className="flex gap-3"></div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

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
