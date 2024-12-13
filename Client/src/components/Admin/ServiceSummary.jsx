import PropTypes from "prop-types";

export default function ServiceSummary({
  selectedServices,
  additionalFee = 0,
  onRemoveService,
}) {
  const total =
    selectedServices.reduce((sum, service) => sum + service.price, 0) +
    additionalFee;

  return (
    <div className="p-6 bg-white rounded-lg shadow border border-Tableline border-opacity-20 text-left">
      <h2 className="text-xl font-bold mb-4">Payment summary</h2>

      {/* Selected Services */}
      <div className="space-y-2 mb-6">
        {selectedServices.map((service, index) => (
          <div key={index} className="flex items-center justify-between py-2">
            <div>
              <h3>{service.name}</h3>
              <p className="text-gray-600">
                P {service.price.toLocaleString()}
              </p>
            </div>
            <button
              onClick={() => onRemoveService(index)}
              className="w-6 h-6 flex items-center justify-center rounded-full hover:bg-gray-100"
            >
              ×
            </button>
          </div>
        ))}
      </div>

      {/* Summary */}
      <div className="space-y-2 border-t pt-4">
        <div className="flex justify-between">
          <span>Additional Fee</span>
          <span>P {additionalFee.toLocaleString()}</span>
        </div>
        <div className="flex justify-between font-bold text-lg">
          <span>Total:</span>
          <span>P {total.toLocaleString()}</span>
        </div>
      </div>

      {/* Actions */}
      <div className="flex gap-4 mt-6">
        <button className="flex-1 px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50">
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
    })
  ).isRequired,
  additionalFee: PropTypes.number,
  onRemoveService: PropTypes.func.isRequired,
};
