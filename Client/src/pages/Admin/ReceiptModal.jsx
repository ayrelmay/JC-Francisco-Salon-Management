import PropTypes from "prop-types";
import { X } from "lucide-react";

export default function ReceiptModal({
  isOpen,
  onClose,
  paymentData,
  invoiceId,
}) {
  if (!isOpen) return null;

  const handlePrint = () => {
    // Create a new window for printing
    const printWindow = window.open("", "_blank");

    // Generate the receipt HTML
    const receiptHTML = `
      <!DOCTYPE html>
      <html>
      <head>
        <title>Receipt</title>
        <style>
          body {
            font-family: Arial, sans-serif;
            padding: 20px;
            max-width: 300px;
            margin: 0 auto;
          }
          .header {
            text-align: center;
            margin-bottom: 20px;
          }
          .details {
            margin-bottom: 20px;
          }
          .services {
            border-top: 1px dashed #000;
            border-bottom: 1px dashed #000;
            padding: 10px 0;
            margin: 10px 0;
          }
          .service-item {
            display: flex;
            justify-content: space-between;
            margin: 5px 0;
          }
          .total {
            font-weight: bold;
            margin: 10px 0;
          }
          .footer {
            text-align: center;
            margin-top: 20px;
            font-size: 0.8em;
          }
        </style>
      </head>
      <body>
        <div class="header">
          <h2>J.C. Francisco Salon</h2>
          <p>Q23F+3PR, Saranay Road, Bagumbong,<br/>Caloocan City</p>
        </div>
        
        <div class="details">
          <p>Invoice: ${invoiceId || "INV-XXXXXX"}</p>
          <p>Date: ${new Date().toLocaleDateString("en-US", {
            year: "numeric",
            month: "short",
            day: "numeric",
            hour: "2-digit",
            minute: "2-digit",
          })}</p>
          <p>Beauty Tech: ${paymentData?.beautyTech || "Admin"}</p>
        </div>

        <div class="services">
          <div class="service-item">
            <span>Services</span>
            <span>Amount</span>
          </div>
          ${paymentData?.services
            ?.map(
              (service) => `
            <div class="service-item">
              <span>${service.name}</span>
              <span>₱${service.price.toLocaleString()}</span>
            </div>
          `
            )
            .join("")}
        </div>

        <div class="total">
          <div class="service-item">
            <span>Total Price:</span>
            <span>₱${paymentData?.totalAmount?.toLocaleString()}</span>
          </div>
          <div class="service-item">
            <span>Additional fees:</span>
            <span>₱${paymentData?.additionalFee?.toLocaleString()}</span>
          </div>
          <div class="service-item">
            <span>Total:</span>
            <span>₱${paymentData?.totalAmount?.toLocaleString()}</span>
          </div>
          <div class="service-item">
            <span>Amount Paid:</span>
            <span>₱${paymentData?.amountPaid?.toLocaleString()}</span>
          </div>
          <div class="service-item">
            <span>Change:</span>
            <span>₱${paymentData?.change?.toLocaleString()}</span>
          </div>
        </div>

        <div class="footer">
          <p>Thank you for your business!</p>
          <p>Please come again</p>
        </div>
      </body>
      </html>
    `;

    // Write the HTML to the new window and print
    printWindow.document.write(receiptHTML);
    printWindow.document.close();

    // Wait for content to load then print
    printWindow.onload = function () {
      printWindow.print();
      // Close the window after printing (optional)
      // printWindow.close();
    };
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg w-full max-w-sm relative">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute right-4 top-4 text-gray-600 hover:text-gray-800"
        >
          <X size={24} />
        </button>

        {/* Receipt Content */}
        <div className="p-6">
          {/* Invoice Number */}
          <h2 className="text-xl font-semibold mb-1">
            {invoiceId || "INV-XXXXXX"}
          </h2>

          {/* Business Details */}
          <div className="mb-4">
            <p className="font-medium">J.C. Francisco Salon</p>
            <p className="text-gray-600 text-sm">
              Q23F+3PR, Saranay Road, Bagumbong,
              <br />
              Caloocan City
            </p>
          </div>

          {/* Admin Info */}
          <div className="flex justify-between text-sm mb-6 border-b pb-4">
            <span>{paymentData?.beautyTech || "Admin"}</span>
            <span>
              {new Date().toLocaleDateString("en-US", {
                year: "numeric",
                month: "short",
                day: "numeric",
                hour: "2-digit",
                minute: "2-digit",
              })}
            </span>
          </div>

          {/* Services Section */}
          <div className="mb-4">
            <div className="flex justify-between mb-2 text-sm">
              <span>Services</span>
              <span>Amount</span>
            </div>
            {paymentData?.services?.map((service, index) => (
              <div key={index} className="flex justify-between text-sm mb-2">
                <span>{service.name}</span>
                <span>₱{service.price.toLocaleString()}</span>
              </div>
            ))}
          </div>

          {/* Price Breakdown */}
          <div className="space-y-2 text-sm border-t pt-4">
            <div className="flex justify-between">
              <span>Total Price:</span>
              <span>₱{paymentData?.totalAmount?.toLocaleString()}</span>
            </div>
            <div className="flex justify-between">
              <span>Additional fees:</span>
              <span>₱{paymentData?.additionalFee?.toLocaleString()}</span>
            </div>
            <div className="flex justify-between font-semibold border-t border-b py-2 my-2">
              <span>Total:</span>
              <span>₱{paymentData?.totalAmount?.toLocaleString()}</span>
            </div>
            <div className="flex justify-between">
              <span>Amount Paid:</span>
              <span>₱{paymentData?.amountPaid?.toLocaleString()}</span>
            </div>
            <div className="flex justify-between">
              <span>Change:</span>
              <span>₱{paymentData?.change?.toLocaleString()}</span>
            </div>
          </div>

          {/* Print Button */}
          <button
            onClick={handlePrint}
            className="w-full mt-6 px-4 py-2 bg-[#1a2642] text-white rounded-md hover:bg-[#243154] transition-colors"
          >
            Print
          </button>
        </div>
      </div>
    </div>
  );
}

ReceiptModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  invoiceId: PropTypes.string,
  paymentData: PropTypes.shape({
    services: PropTypes.arrayOf(
      PropTypes.shape({
        name: PropTypes.string,
        price: PropTypes.number,
      })
    ),
    beautyTech: PropTypes.string,
    totalAmount: PropTypes.number,
    additionalFee: PropTypes.number,
    amountPaid: PropTypes.number,
    change: PropTypes.number,
  }),
};
