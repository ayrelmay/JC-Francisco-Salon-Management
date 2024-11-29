import PropTypes from "prop-types";

export default function SecondaryBtn({
  children,
  onClick,
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
        px-4 
        py-2 
        h-36px
        min-w-103px
        rounded 
        rounded-5px 
        border
        text-BtnPrimary
         border-BtnPrimary
        bg-white
        font-normal 
        transition-colors 
        hover:border-BtnHover
        hover:text-BtnHover
        disabled:bg-Disable 
        disabled:cursor-not-allowed
        text-[9px]
        sm:text-base
        leading-[15px] 
        ${className}
      `}
    >
      {children}
    </button>
  );
}

SecondaryBtn.propTypes = {
  children: PropTypes.node.isRequired,
  onClick: PropTypes.func,
  className: PropTypes.string,
  type: PropTypes.oneOf(["button", "submit", "reset"]),
  disabled: PropTypes.bool,
};

SecondaryBtn.defaultProps = {
  onClick: undefined,
  className: "",
  type: "button",
  disabled: false,
};
