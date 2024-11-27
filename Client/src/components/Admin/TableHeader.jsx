import PropTypes from "prop-types";

function TableHeader({ children }) {
  return <thead className="bg-gray-50">{children}</thead>;
}

TableHeader.propTypes = {
  children: PropTypes.node,
};
export default TableHeader;
