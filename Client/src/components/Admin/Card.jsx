import PropTypes from "prop-types";

function Card({ children }) {
  console.log(children);
  return (
    <div className=" w-full rounded-lg bg-white p-4 shadow">{children}</div>
  );
}

Card.propTypes = {
  children: PropTypes.node, // Accepts any renderable React node
};

export default Card;
