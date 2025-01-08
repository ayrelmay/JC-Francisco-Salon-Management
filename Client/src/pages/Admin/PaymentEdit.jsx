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
        "bg-white text-FontPrimary border border-Tableline border-opacity-30 text-sm ",
      inactiveColor: "bg-Tableline text-FontPrimary text-sm bg-opacity-50",
    },
    {
      id: "beauty",
      name: "Beauty",
      activeColor:
        "bg-white text-FontPrimary border border-Tableline border-opacity-30 text-sm",
      inactiveColor: "bg-beauty text-FontPrimary text-sm bg-opacity-50",
    },
    {
      id: "hair",
      name: "Hair care",
      activeColor:
        "bg-white text-FontPrimary border border-Tableline border-opacity-30 text-sm",
      inactiveColor: "bg-hair text-FontPrimary text-sm bg-opacity-50",
    },
    {
      id: "nails",
      name: "Nail care",
      activeColor:
        "bg-white text-FontPrimary border border-Tableline border-opacity-30 text-sm",
      inactiveColor: "bg-nails text-FontPrimary text-sm bg-opacity-50",
    },
    {
      id: "spa",
      name: "Spa",
      activeColor:
        "bg-white text-FontPrimary border border-Tableline border-opacity-30 text-sm",
      inactiveColor: "bg-spa text-FontPrimary text-sm",
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
    const isServiceAlreadyAdded = selectedServices.some(
      (selectedService) => selectedService.name === service.ServiceName
    );

    if (!isServiceAlreadyAdded) {
      setSelectedServices([
        ...selectedServices,
        {
          id: service.Id,
          name: service.ServiceName,
          price: parseFloat(service.ServicePrice.replace(/,/g, "")),
          category: service.Category,
          quantity: 1,
        },
      ]);
    }
  };

  useEffect(() => {
    const fetchPaymentData = async () => {
      try {
        // Only fetch existing payment data if we have a real ID
        if (id && id !== "new") {
          // Fetch payment details
          const paymentResponse = await fetch(
            `http://localhost:3000/api/payment/${id}`
          );
          if (!paymentResponse.ok) {
            throw new Error("Failed to fetch payment details");
          }
          const paymentData = await paymentResponse.json();
          setPaymentDetails(paymentData);

          // Fetch selected services for this payment
          const servicesResponse = await fetch(
            `http://localhost:3000/api/paymentdetails/${id}`
          );
          if (!servicesResponse.ok) {
            throw new Error("Failed to fetch payment services");
          }
          const servicesData = await servicesResponse.json();

          // Transform the services data to match your selectedServices format
          const formattedServices = servicesData.map((detail) => ({
            id: detail.ServiceId,
            name: detail.ServiceName,
            price: parseFloat(detail.ServicePrice),
            category: detail.Category,
            quantity: 1,
          }));

          setSelectedServices(formattedServices);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchPaymentData();
  }, [id]);

  return (
    <div className="min-h-screen">
      {/* Main content grid */}
      <div className="grid grid-cols-1 lg:grid-cols-6 gap-6 p-8">
        {/* Left side: Filter + Services */}
        <div className="lg:col-span-4">
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

          {/* Divider */}
          <div className="w-full h-[1px] bg-Tableline opacity-30 mb-6"></div>

          {/* Services Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
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

        {/* Right side: Service Summary */}
        <div className="lg:col-span-2">
          <ServiceSummary
            selectedServices={selectedServices}
            additionalFee={paymentDetails?.AdditionalFee || 0}
            onRemoveService={(index) => {
              const newServices = [...selectedServices];
              newServices.splice(index, 1);
              setSelectedServices(newServices);
            }}
            paymentDetails={paymentDetails}
            onAdditionalFeeChange={(fee) => {
              setPaymentDetails((prev) => ({ ...prev, AdditionalFee: fee }));
            }}
          />
        </div>
      </div>
    </div>
  );
}
