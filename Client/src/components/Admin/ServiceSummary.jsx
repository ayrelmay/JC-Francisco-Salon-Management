import PropTypes from "prop-types";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

export default function ServiceSummary({
  selectedServices,
  setSelectedServices,
  additionalFee = 0,
  onRemoveService,
  onAdditionalFeeChange,
  paymentDetails,
}) {
  const { id } = useParams();
  const [amountPaid, setAmountPaid] = useState(0);

  const getCategoryColor = (category) => {
    switch (category.toLowerCase()) {
      case "beauty":
        return "bg-beauty bg-opacity-50";
      case "hair":
        return "bg-hair bg-opacity-50";
      case "nails":
        return "bg-nails bg-opacity-50";
      case "spa":
        return "bg-spa bg-opacity-50";
      default:
        return "bg-gray-300 bg-opacity-50";
    }
  };

  const total =
    selectedServices.reduce((sum, service) => {
      return sum + (Number(service.price) || 0);
    }, 0) + (Number(additionalFee) || 0);
  const change = amountPaid - total;

  useEffect(() => {
    if (paymentDetails) {
      setAmountPaid(paymentDetails.AmountPaid || 0);
    }
  }, [paymentDetails]);

  useEffect(() => {
    console.log("Selected Services:", selectedServices);
    console.log(
      "Service Prices:",
      selectedServices.map((s) => Number(s.price))
    );
    console.log("Additional Fee:", Number(additionalFee));
    console.log("Total:", total);
  }, [selectedServices, additionalFee, total]);

  const handleSave = async () => {
    try {
      const paymentData = {
        TotalAmount: parseFloat(total || 0).toFixed(2),
        AdditionalFee: parseFloat(additionalFee || 0).toFixed(2),
        AmountPaid: parseFloat(amountPaid || 0).toFixed(2),
        ChangeGiven: parseFloat(change || 0).toFixed(2),
      };

      // First update the payment details in the payments table
      const paymentResponse = await fetch(
        `http://localhost:3000/api/payment/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(paymentData),
        }
      );

      // Log the raw response for debugging
      console.log(
        "Raw payment response:",
        await paymentResponse.text().catch(() => "Failed to get response text")
      );

      if (!paymentResponse.ok) {
        throw new Error(
          `Payment update failed with status: ${paymentResponse.status}`
        );
      }

      // Then save the services in paymentdetails table
      const servicesResponse = await fetch(
        `http://localhost:3000/api/paymentdetails/save/${id}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ services: selectedServices }),
        }
      );

      // Log the raw response for debugging
      console.log(
        "Raw services response:",
        await servicesResponse.text().catch(() => "Failed to get response text")
      );

      if (!servicesResponse.ok) {
        throw new Error(
          `Services update failed with status: ${servicesResponse.status}`
        );
      }

      alert("Payment details saved successfully");
    } catch (error) {
      console.error("Error saving payment details:", error);
      alert(`Failed to save payment details: ${error.message}`);
    }
  };

  return (
    <div className="px-10 py-8 bg-white rounded-lg shadow border border-Tableline border-opacity-20 text-left h-full">
      <h2 className="text-xl font-bold mb-4">Service summary</h2>

      {/* Payment Details Section */}
      <div className="space-y-2 mb-4 border-b pb-4 border-Tableline border-opacity-20">
        <div className="flex justify-between items-center text-sm">
          <span>Customer Name:</span>
          <span className="font-medium">
            {paymentDetails?.CustomerName || "-"}
          </span>
        </div>
        <div className="flex justify-between items-center text-sm">
          <span>Beauty Tech:</span>
          <span className="font-medium">
            {paymentDetails?.BeautyTech || "-"}
          </span>
        </div>
        <div className="flex justify-between items-center text-sm">
          <span>Chair Number:</span>
          <span className="font-medium">
            {paymentDetails?.ChairNumber || "-"}
          </span>
        </div>
        <div className="flex justify-between items-center text-sm">
          <span>Status:</span>
          <span className="font-medium">{paymentDetails?.Status || "-"}</span>
        </div>
      </div>

      {/* Selected Services */}
      <div className="space-y-2 mb-6">
        {selectedServices.map((service, index) => (
          <div
            key={index}
            className="flex items-center justify-between p-4 bg-white border border-Tableline border-opacity-20 rounded-lg shadow hover:shadow-md transition-shadow relative overflow-hidden"
          >
            {/* Dynamic color accent bar */}
            <div
              className={`absolute left-0 top-0 bottom-0 w-3 ${getCategoryColor(
                service.category
              )}`}
            />

            <div className="pl-4 flex-grow">
              <p className="font-medium text-sm">{service.name}</p>
              <div className="flex items-center">
                <span className="text-gray-600 text-sm mr-1">P</span>
                <input
                  type="text"
                  inputMode="decimal"
                  value={service.price}
                  onChange={(e) => {
                    const newValue = e.target.value;
                    const updatedServices = [...selectedServices];
                    updatedServices[index] = {
                      ...service,
                      price: newValue === "" ? 0 : parseFloat(newValue),
                    };
                    setSelectedServices(updatedServices);
                  }}
                  className="w-24 text-gray-600 text-sm bg-transparent focus:outline-none text-left"
                />
              </div>
            </div>

            <button
              onClick={() => onRemoveService(index)}
              className="w-6 h-6 flex items-center justify-center hover:border-gray-400 transition-colors"
            >
              <span className="text-xl">×</span>
            </button>
          </div>
        ))}
      </div>

      {/* Summary with payment details */}
      <div className="space-y-2 border-t pt-4 border-Tableline border-opacity-20">
        <div className="flex justify-between items-center text-sm">
          <span>Additional Fee</span>
          <input
            type="text"
            inputMode="numeric"
            value={
              additionalFee === 0
                ? ""
                : Math.round(additionalFee).toLocaleString()
            }
            onChange={(e) => {
              const value = e.target.value.replace(/[^\d]/g, "");
              onAdditionalFeeChange(value === "" ? 0 : parseInt(value));
            }}
            className="w-24 p-1 text-right bg-transparent focus:outline-none"
          />
        </div>
        <div className="flex justify-between font-bold text-lg">
          <span>Total:</span>
          <span className="w-24 text-right">
            P {Math.round(total).toLocaleString()}
          </span>
        </div>
        <div className="flex justify-between items-center text-sm">
          <span>Amount paid:</span>
          <input
            type="text"
            inputMode="numeric"
            value={
              amountPaid === 0 ? "" : Math.round(amountPaid).toLocaleString()
            }
            onChange={(e) => {
              const value = e.target.value.replace(/[^\d]/g, "");
              setAmountPaid(value === "" ? 0 : parseInt(value));
            }}
            className="w-24 p-1 text-right bg-transparent focus:outline-none"
          />
        </div>
        <div className="flex justify-between items-center text-sm">
          <span>Change:</span>
          <span className="w-24 text-right">
            P {Math.round(change).toLocaleString()}
          </span>
        </div>
      </div>

      {/* Actions */}
      <div className="flex gap-4 mt-6">
        <button
          onClick={handleSave}
          className="flex-1 px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50"
        >
          Save
        </button>
        <button className="flex-1 px-4 py-2 bg-BtnPrimary text-white rounded-md hover:bg-gray-800">
          Pay now
        </button>
      </div>
    </div>
  );
}

ServiceSummary.propTypes = {
  selectedServices: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      price: PropTypes.number.isRequired,
      category: PropTypes.string.isRequired,
    })
  ).isRequired,
  setSelectedServices: PropTypes.func.isRequired,
  additionalFee: PropTypes.number,
  onRemoveService: PropTypes.func.isRequired,
  onAdditionalFeeChange: PropTypes.func.isRequired,
  paymentDetails: PropTypes.shape({
    CustomerName: PropTypes.string,
    BeautyTech: PropTypes.string,
    ChairNumber: PropTypes.number,
    TotalAmount: PropTypes.number,
    AdditionalFee: PropTypes.number,
    AmountPaid: PropTypes.number,
    ChangeGiven: PropTypes.number,
    Status: PropTypes.string,
  }),
};
