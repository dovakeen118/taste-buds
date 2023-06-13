import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";

export const SelectableOptions = ({ options, selectedOption, handleSelect }) => {
  const selectableOptions = options.map((option) => {
    let selectedClass = "button";
    let optionIcon = <FontAwesomeIcon icon={faXmark} className="close-icon" />;
    if (!selectedOption.includes(option)) {
      selectedClass = "hollow";
      optionIcon = null;
    }

    return (
      <button
        key={option}
        type="button"
        id={option}
        className={`button ${selectedClass}`}
        onClick={handleSelect}
      >
        {option} {optionIcon}
      </button>
    );
  });
  return <>{selectableOptions}</>;
};
