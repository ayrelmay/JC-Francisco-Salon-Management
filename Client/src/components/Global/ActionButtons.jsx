import PrimaryBtn from "../../components/Global/PrimaryBtn";
import SecondaryBtn from "../../components/Global/SecondaryBtn";
import PropTypes from "prop-types";

const ActionButtons = ({ onAdd, onArchive = null }) => {
  return (
    <div className="flex gap-2">
      <PrimaryBtn onClick={onAdd}>Add Service</PrimaryBtn>
      {onArchive && <SecondaryBtn onClick={onArchive}>Archive</SecondaryBtn>}
    </div>
  );
};

ActionButtons.propTypes = {
  onAdd: PropTypes.func.isRequired,
  onArchive: PropTypes.func,
};

export default ActionButtons;
