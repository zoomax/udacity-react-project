import React from "react";
import PropTypes from "prop-types";
function CustomSelect({ options, onChange, initialValue = undefined }) {
  return (
    <div className='book-shelf-changer'>
      <select value={initialValue} onChange={onChange}>
        <option value={undefined} disabled>
          ... selecetd an Option
        </option>
        {options.map(({ value, label }) => (
          <option key={value} value={value}>
            {label}
          </option>
        ))}
      </select>
    </div>
  );
}

CustomSelect.propTypes = {
  options: PropTypes.array.isRequired,
  onChange: PropTypes.func.isRequired,
  initialValue: PropTypes.string,
};
export default CustomSelect;
