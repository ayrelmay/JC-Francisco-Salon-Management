import PropTypes from "prop-types";
function TableHead({ children }) {
  return (
    <th className="px-4 py-2 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
      {children}
    </th>
  );
}

TableHead.propTypes = {
  children: PropTypes.node,
};
export default TableHead;
