import PropTypes from "prop-types";

const SearchBar = ({ value, onChange }) => {
  return (
    <div className="flex-1 max-w-md relative">
      <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">
        <svg className="w-5 h-5" fill="none" stroke="grey" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
      </span>
      <input
        type="text"
        placeholder="Search"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full px-4 py-2 text-xs sm:text-sm rounded-lg border-Tableline border-[0.85px] border-opacity-50"
      />
    </div>
  );
};

SearchBar.propTypes = {
  value: PropTypes.string.isRequired, // `value` must be a string and required
  onChange: PropTypes.func.isRequired, // `onChange` must be a function and required
};

export default SearchBar;
