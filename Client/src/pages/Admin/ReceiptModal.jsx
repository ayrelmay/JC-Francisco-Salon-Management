import PropTypes from "prop-types";

export default function ReceiptModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg w-full max-w-md relative">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute right-4 top-4 text-gray-500 hover:text-gray-700"
        >
          ×
        </button>

        {/* Receipt Content */}
        <div className="p-6">
          {/* Invoice Number */}
          <h2 className="text-2xl font-bold mb-2">INV24112601</h2>

          {/* Business Details */}
          <div className="mb-4">
            <p className="font-medium">J.C. Francisco Salon</p>
            <p className="text-gray-600 text-sm">
              Q23F+3PR, Saranay Road, Bagumbong,
              <br />
              Caloocan City
            </p>
          </div>

          {/* Cashier Info */}
          <div className="flex justify-between text-sm mb-6">
            <span>Cashier</span>
            <span>Nov. 24, 2024, 16:00</span>
          </div>

          {/* Services Section */}
          <div className="border-t border-b border-gray-200 py-4 mb-4">
            <div className="flex justify-between mb-2">
              <span className="font-medium">Services</span>
              <span className="font-medium">Amount</span>
            </div>
            <div className="flex justify-between">
              <span>Brazilian Blowout</span>
              <span>₱2,800.00</span>
            </div>
          </div>

          {/* Price Breakdown */}
          <div className="space-y-2 mb-6">
            <div className="flex justify-between">
              <span>Total Price:</span>
              <span>₱2,800.00</span>
            </div>
            <div className="flex justify-between">
              <span>Additional fees:</span>
              <span>₱100.00</span>
            </div>
            <div className="flex justify-between font-bold">
              <span>Total:</span>
              <span>₱2,900.00</span>
            </div>
            <div className="flex justify-between">
              <span>Amount Paid:</span>
              <span>₱3,000.00</span>
            </div>
            <div className="flex justify-between">
              <span>Change:</span>
              <span>₱100.00</span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-4">
            <button
              onClick={() => {
                /* Add save logic */
              }}
              className="flex-1 px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50"
            >
              Save
            </button>
            <button
              onClick={() => {
                /* Add print logic */
              }}
              className="flex-1 px-4 py-2 bg-gray-900 text-white rounded-md hover:bg-gray-800"
            >
              Print
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

ReceiptModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};
