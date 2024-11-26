import PropTypes from "prop-types";

function Table({ children }) {
  return (
    <div className="overflow-x-auto flex-grow">
      <table className="w-full">{children}</table>
    </div>
  );
}

Table.propTypes = {
  children: PropTypes.node,
};

export default Table;
