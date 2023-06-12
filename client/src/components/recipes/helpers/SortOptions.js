import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";

export const SortOptions = ({ sortOptions, selectedSortOption, setSelectedSortOption }) => {
  const selectableSortOptions = sortOptions.map((option) => {
    const handleSelectOption = (event) => {
      if (selectedSortOption === event.currentTarget.id) {
        setSelectedSortOption("");
      } else {
        setSelectedSortOption(event.currentTarget.id);
      }
    };

    let selectedClass = "button";
    let optionIcon = <FontAwesomeIcon icon={faXmark} className="close-icon" />;
    if (!selectedSortOption.includes(option)) {
      selectedClass = "hollow";
      optionIcon = null;
    }

    return (
      <button
        key={option}
        type="button"
        id={option}
        className={`button ${selectedClass}`}
        onClick={handleSelectOption}
      >
        {option} {optionIcon}
      </button>
    );
  });
  return <>{selectableSortOptions}</>;
};
