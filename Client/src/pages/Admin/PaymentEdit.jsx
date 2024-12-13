"use client";

import { useState, useEffect } from "react";
import { Plus } from "lucide-react";
import { useParams } from "react-router-dom";

// Sample services data
const services = [
  { id: "1", name: "Brazilian Blowout", price: 1000, category: "hair-care" },
  { id: "2", name: "Rebond", price: 1200, category: "hair-care" },
  { id: "3", name: "Manicure", price: 2800, category: "nail-care" },
  { id: "4", name: "Curler Iron", price: 300, category: "hair-care" },
  { id: "5", name: "Hair Color", price: 500, category: "hair-care" },
  { id: "6", name: "Make-up", price: 2800, category: "beauty" },
  { id: "7", name: "Foot Spa", price: 2800, category: "spa" },
  { id: "8", name: "Hair Spa", price: 500, category: "spa" },
  { id: "9", name: "Highlights", price: 700, category: "hair-care" },
];

export default function PaymentEdit() {
  const { id } = useParams(); // Get the payment ID from the URL
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedServices, setSelectedServices] = useState([]);
  const [staffName1, setStaffName1] = useState("Milo D.");
  const [staffName2, setStaffName2] = useState("Cathy C.");
  const [selectedChair, setSelectedChair] = useState("6");
  const [paymentDetails, setPaymentDetails] = useState(null);

  const categories = [
    { id: "all", name: "All" },
    { id: "beauty", name: "Beauty" },
    { id: "hair-care", name: "Hair care" },
    { id: "nail-care", name: "Nail care" },
    { id: "spa", name: "Spa" },
  ];

  const filteredServices = services.filter((service) =>
    selectedCategory === "all" ? true : service.category === selectedCategory
  );

  const addService = (service) => {
    setSelectedServices([...selectedServices, service]);
  };

  const removeService = (serviceId) => {
    setSelectedServices(selectedServices.filter((s) => s.id !== serviceId));
  };

  const totalAmount = selectedServices.reduce(
    (sum, service) => sum + service.price,
    0
  );
  const additionalFee = 100;
  const finalTotal = totalAmount + additionalFee;
  const amountPay = 3000;
  const change = amountPay - finalTotal;

  useEffect(() => {
    const fetchPaymentDetails = async () => {
      try {
        const response = await fetch(`http://localhost:3000/api/payment/${id}`);
        if (!response.ok) {
          throw new Error("Failed to fetch payment details");
        }
        const data = await response.json();
        setPaymentDetails(data);
      } catch (error) {
        console.error("Error fetching payment details:", error);
      }
    };

    fetchPaymentDetails();
  }, [id]);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">Payment</h1>

      {/* Category Filter */}
      <div className="flex flex-wrap gap-2 mb-6">
        {categories.map((category) => (
          <button
            key={category.id}
            onClick={() => setSelectedCategory(category.id)}
            className={`px-4 py-2 rounded-full text-sm transition-colors ${
              selectedCategory === category.id
                ? "bg-blue-500 text-white"
                : "bg-gray-100 hover:bg-gray-200"
            }`}
          >
            {category.name}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Services Grid */}
        <div className="lg:col-span-2">
          <div className="border-2 border-purple-200 rounded-lg p-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {filteredServices.map((service, index) => (
                <div key={service.id} className="relative">
                  {/* Service Card */}
                  <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 relative">
                    <div className="pr-8">
                      <h3 className="font-medium text-gray-900">
                        {service.name}
                      </h3>
                      <p className="text-sm text-gray-600">
                        ₱ {service.price.toLocaleString()}
                      </p>
                    </div>
                    <button
                      onClick={() => addService(service)}
                      className="absolute bottom-4 right-4 h-6 w-6 flex items-center justify-center"
                    >
                      <Plus className="h-4 w-4" />
                    </button>
                  </div>

                  {/* Row Markers */}
                  {(index + 1) % 3 === 0 &&
                    index !== filteredServices.length - 1 && (
                      <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2">
                        <div className="bg-pink-500 text-white text-xs rounded-full w-6 h-6 flex items-center justify-center">
                          29
                        </div>
                      </div>
                    )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Service Summary */}
        <div className="lg:col-span-1">
          <div className="border border-gray-200 rounded-lg shadow-sm bg-white p-6">
            <h2 className="text-xl font-semibold mb-4">Service summary</h2>

            <div className="space-y-4 mb-6">
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-500">Chair</span>
                <select
                  value={selectedChair}
                  onChange={(e) => setSelectedChair(e.target.value)}
                  className="w-24 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  {Array.from({ length: 10 }, (_, i) => (
                    <option key={i + 1} value={String(i + 1)}>
                      {i + 1}
                    </option>
                  ))}
                </select>
              </div>

              <input
                type="text"
                value={staffName1}
                onChange={(e) => setStaffName1(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 mb-2"
              />
              <input
                type="text"
                value={staffName2}
                onChange={(e) => setStaffName2(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Selected Services */}
            <div className="space-y-2 mb-6">
              {selectedServices.map((service) => (
                <div
                  key={service.id}
                  className="flex justify-between items-center"
                >
                  <div>
                    <p className="font-medium">{service.name}</p>
                    <p className="text-sm text-gray-500">
                      ₱ {service.price.toLocaleString()}
                    </p>
                  </div>
                  <button
                    onClick={() => removeService(service.id)}
                    className="text-red-500 hover:text-red-700"
                  >
                    Remove
                  </button>
                </div>
              ))}
            </div>

            {/* Payment Summary */}
            <div className="space-y-2 border-t pt-4">
              <div className="flex justify-between">
                <span>Additional Fee</span>
                <span>₱ {additionalFee.toLocaleString()}</span>
              </div>
              <div className="flex justify-between font-bold">
                <span>Total:</span>
                <span>₱ {finalTotal.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span>Amount pay:</span>
                <span>₱ {amountPay.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span>Change:</span>
                <span>₱ {change.toLocaleString()}</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-4 mt-6">
              <button className="flex-1 px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50">
                Save
              </button>
              <button className="flex-1 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600">
                Pay now
              </button>
            </div>
          </div>
        </div>
      </div>

      {paymentDetails && (
        <div className="mb-4">
          <h2>Payment ID: {paymentDetails.Id}</h2>
          {/* Display other payment details as needed */}
        </div>
      )}
    </div>
  );
}
