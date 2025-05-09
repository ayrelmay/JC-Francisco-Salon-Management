import PropTypes from "prop-types";

function TableCell({ children }) {
  return <td className=" text-xs whitespace-nowrap px-4 py-2">{children}</td>;
}

TableCell.propTypes = {
  children: PropTypes.node,
};

export default TableCell;
