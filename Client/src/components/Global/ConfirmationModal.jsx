import PropTypes from "prop-types";

const ConfirmationModal = ({
  isOpen,
  onClose,
  onConfirm,
  message,
  cancelButtonText = "Cancel",
  confirmButtonText = "Proceed",
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-sm w-full mx-4 shadow-md">
        <h2 className="text-l font-regular mb-6 text-fontPrimary text-left">
          {message}
        </h2>
        <div className="flex justify-end gap-4">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded border border-Tableline border-opacity-30 text-fontPrimary hover:bg-gray-100 transition"
          >
            {cancelButtonText}
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-2 rounded bg-BtnPrimary text-white hover:bg-gray-800 transition"
          >
            {confirmButtonText}
          </button>
        </div>
      </div>
    </div>
  );
};

ConfirmationModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onConfirm: PropTypes.func.isRequired,
  message: PropTypes.string.isRequired,
  cancelButtonText: PropTypes.string,
  confirmButtonText: PropTypes.string,
};

export default ConfirmationModal;
