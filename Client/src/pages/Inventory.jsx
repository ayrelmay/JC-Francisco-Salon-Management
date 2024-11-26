import { useState } from "react";
import { Search, Filter, MoreVertical, Edit2, Copy, Plus } from "lucide-react";

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

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-PrimaryFont mb-6">Inventory</h1>

      {/* Search and Actions */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <div className="relative flex-1 max-w-md w-full">
          <input
            type="text"
            placeholder="Search"
            className="w-full pl-10 pr-4 py-2 border rounded-md"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
        </div>
        <div className="flex gap-2">
          <button className="px-4 py-2 bg-gray-800 text-white rounded-md flex items-center gap-2">
            <Filter className="h-4 w-4" />
            Filter
          </button>
          <button className="px-4 py-2 bg-blue-600 text-white rounded-md flex items-center gap-2">
            <Plus className="h-4 w-4" />
            Add Item
          </button>
          <button className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50">
            Archive
          </button>
        </div>
      </div>

      {/* Inventory Table */}
      <div className="bg-white rounded-lg shadow overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="bg-gray-50">
              <th className="px-6 py-3 text-left text-xs font-medium text-PrimaryFont uppercase tracking-wider">
                Item ID
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-PrimaryFont uppercase tracking-wider">
                Item Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-PrimaryFont uppercase tracking-wider">
                Category
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-PrimaryFont uppercase tracking-wider">
                Quantity
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-PrimaryFont uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-PrimaryFont uppercase tracking-wider">
                Action
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {inventoryItems.map((item) => (
              <tr
                key={item.id}
                className="hover:bg-gray-50 cursor-pointer"
                onClick={() => handleRowClick(item)}
              >
                <td className="px-6 py-4 whitespace-nowrap text-sm text-PrimaryFont">
                  {item.id}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-PrimaryFont">
                  {item.name}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-PrimaryFont">
                  {item.category}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-PrimaryFont">
                  <div className="flex items-center">
                    {item.quantity}
                    <MoreVertical className="h-4 w-4 ml-2 text-gray-400" />
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="h-2 w-2 rounded-full bg-red-500 mr-2"></div>
                    <span className="text-sm text-PrimaryFont">
                      {item.status}
                    </span>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex gap-3">
                    <button className="text-gray-400 hover:text-gray-600">
                      <Edit2 className="h-5 w-5" />
                    </button>
                    <button className="text-gray-400 hover:text-gray-600">
                      <Copy className="h-5 w-5" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

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
