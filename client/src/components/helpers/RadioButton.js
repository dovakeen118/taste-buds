import React from "react";

const RadioButton = ({ name, value, labelText, handleChange, checked, labelClassName }) => {
  return (
    <label key={value} className={labelClassName} htmlFor={name}>
      <input
        type="radio"
        id={name}
        name={name}
        onChange={handleChange}
        value={value}
        checked={checked}
      />
      {labelText || value}
    </label>
  );
};

export default RadioButton;
