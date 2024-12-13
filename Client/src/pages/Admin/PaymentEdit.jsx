import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import ServiceSummary from "../../components/Admin/ServiceSummary";
import ServiceCard from "../../components/Admin/ServiceCard";

export default function PaymentEdit() {
  const { id } = useParams();
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedServices, setSelectedServices] = useState([]);
  const [paymentDetails, setPaymentDetails] = useState(null);
  const [services, setServices] = useState([]);

  const categories = [
    {
      id: "all",
      name: "All",
      activeColor:
        "bg-white text-FontPrimary border border-Tableline border-opacity-30",
      inactiveColor: "bg-Tableline text-FontPrimary",
    },
    {
      id: "beauty",
      name: "Beauty",
      activeColor:
        "bg-white text-FontPrimary border border-Tableline border-opacity-30",
      inactiveColor: "bg-beauty text-FontPrimary",
    },
    {
      id: "hair care",
      name: "Hair care",
      activeColor:
        "bg-white text-FontPrimary border border-Tableline border-opacity-30",
      inactiveColor: "bg-hair text-FontPrimary",
    },
    {
      id: "nail care",
      name: "Nail care",
      activeColor:
        "bg-white text-FontPrimary border border-Tableline border-opacity-30",
      inactiveColor: "bg-nails text-FontPrimary",
    },
    {
      id: "spa",
      name: "Spa",
      activeColor:
        "bg-white text-FontPrimary border border-Tableline border-opacity-30",
      inactiveColor: "bg-spa text-FontPrimary",
    },
  ];

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await fetch("http://localhost:3000/api/service");
        if (!response.ok) {
          throw new Error("Failed to fetch services");
        }
        const data = await response.json();
        setServices(data);
      } catch (error) {
        console.error("Error fetching services:", error);
      }
    };

    fetchServices();
  }, []);

  const filteredServices = services.filter(
    (service) =>
      (selectedCategory === "all"
        ? true
        : service.Category.toLowerCase() === selectedCategory) &&
      service.archived === 1
  );

  const addService = (service) => {
    setSelectedServices([
      ...selectedServices,
      {
        name: service.ServiceName,
        price: parseFloat(service.ServicePrice.replace(/,/g, "")),
      },
    ]);
  };

  const additionalFee = 100;

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
      <div className="flex gap-2 mb-6">
        {categories.map((category) => (
          <button
            key={category.id}
            onClick={() => setSelectedCategory(category.id)}
            className={`px-4 py-2 rounded-full transition-colors ${
              selectedCategory === category.id
                ? category.activeColor
                : category.inactiveColor
            }`}
          >
            {category.name}
          </button>
        ))}
      </div>

      {/* Main content grid */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        {/* Services List */}
        <div className="lg:col-span-3">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredServices.map((service) => (
              <ServiceCard
                key={service.Id}
                name={service.ServiceName}
                price={parseFloat(service.ServicePrice.replace(/,/g, ""))}
                category={service.Category}
                onAdd={() => addService(service)}
              />
            ))}
          </div>
        </div>

        {/* Service Summary */}
        <div className="lg:col-span-2">
          <ServiceSummary
            selectedServices={selectedServices}
            additionalFee={additionalFee}
            onRemoveService={(index) => {
              const newServices = [...selectedServices];
              newServices.splice(index, 1);
              setSelectedServices(newServices);
            }}
          />
        </div>
      </div>

      {paymentDetails && (
        <div className="mb-4">
          <h2>Payment ID: {paymentDetails.Id}</h2>
        </div>
      )}
    </div>
  );
}
