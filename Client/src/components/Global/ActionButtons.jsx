import PrimaryBtn from "../../components/Global/PrimaryBtn";
import SecondaryBtn from "../../components/Global/SecondaryBtn";
import PropTypes from "prop-types";

const ActionButtons = ({ onAdd, onArchive }) => {
  return (
    <div className="flex gap-2">
      <PrimaryBtn onClick={onAdd}>Add Service</PrimaryBtn>
      <SecondaryBtn onClick={onArchive}>Archive</SecondaryBtn>
    </div>
  );
};

ActionButtons.propTypes = {
  onAdd: PropTypes.func.isRequired, // `onAdd` must be a function and is required
  onArchive: PropTypes.func.isRequired, // `onArchive` must be a function and is required
};

export default ActionButtons;
