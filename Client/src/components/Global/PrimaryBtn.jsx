import PropTypes from "prop-types";

export default function PrimaryBtn({
  children,
  onClick = undefined,
  className = "",
  type = "button",
  disabled = false,
}) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`
        w-full 
        px-3 
        py-1.5 
        h-[42px] 
        rounded-md 
        bg-BtnPrimary 
        text-white 
        font-normal 
        transition-colors 
        hover:bg-BtnHover 
        disabled:bg-Disable 
        disabled:cursor-not-allowed 
        text-xs 
        sm:text-sm 
        ${className}`}
    >
      {children}
    </button>
  );
}

PrimaryBtn.propTypes = {
  children: PropTypes.node.isRequired,
  onClick: PropTypes.func,
  className: PropTypes.string,
  type: PropTypes.oneOf(["button", "submit", "reset"]),
  disabled: PropTypes.bool,
};
