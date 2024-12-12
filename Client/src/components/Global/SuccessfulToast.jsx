import React from "react";
import PropTypes from "prop-types";

export default function SuccessfulToast(props) {
  const {
    title = "Success",
    message = "Operation completed successfully.",
    onClose = () => {},
    isVisible = true,
    accentColor = "#00875A",
    duration = 3000,
  } = props;

  React.useEffect(() => {
    if (duration && isVisible) {
      const timer = setTimeout(() => {
        onClose();
      }, duration);
      return () => clearTimeout(timer);
    }
  }, [duration, isVisible, onClose]);

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-4 right-4 z-50 animate-slide-in md:bottom-6 md:right-6">
      <div className="flex w-full max-w-[350px] overflow-hidden rounded-lg bg-white shadow-lg">
        <div className="w-2" style={{ backgroundColor: accentColor }} />
        <div className="flex flex-1 items-start p-4">
          <div className="flex-1 pl-3">
            <div className="flex items-center gap-2">
              <svg
                viewBox="0 0 24 24"
                className="h-5 w-5"
                style={{ color: accentColor }}
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M5 13l4 4L19 7"
                />
              </svg>
              <p className="font-semibold text-gray-900">{title}</p>
            </div>
            <p className="mt-1 text-sm text-gray-600">{message}</p>
          </div>
          <button
            onClick={onClose}
            className="ml-4 inline-flex h-6 w-6 items-center justify-center rounded-full text-gray-400 hover:bg-gray-100 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-300"
          >
            <span className="sr-only">Close</span>
            <svg
              className="h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}

SuccessfulToast.propTypes = {
  title: PropTypes.string,
  message: PropTypes.string,
  onClose: PropTypes.func,
  isVisible: PropTypes.bool,
  accentColor: PropTypes.string,
  duration: PropTypes.number,
};
