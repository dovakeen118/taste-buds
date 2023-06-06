import React from "react";

const RadioButton = ({ name, data, handleChange, checked, labelClassName }) => {
  return (
    <label key={data} className={labelClassName} htmlFor={name}>
      <input
        type="radio"
        id={name}
        name={name}
        onChange={handleChange}
        value={data}
        checked={checked}
      />
      {data}
    </label>
  );
};

export default RadioButton;
