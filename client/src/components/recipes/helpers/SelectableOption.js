import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";

export const SelectableOption = ({ option, selectedOption, handleSelect }) => {
  let optionIcon = <FontAwesomeIcon icon={faXmark} className="close-icon" />;
  if (!selectedOption.includes(option)) {
    optionIcon = null;
  }

  return (
    <p id={option} className="select-option" onClick={handleSelect}>
      {optionIcon} {option}
    </p>
  );
};
