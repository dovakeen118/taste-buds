import React from "react";

import { SelectableOption } from "./SelectableOption";

export const SortOptionSection = ({ selectedSortOption, setSelectedSortOption }) => {
  const sortOptions = ["a - z", "z - a", "low time", "high time"];

  const sortSection = sortOptions.map((option) => {
    const handleSelectSortOption = (event) => {
      if (selectedSortOption === event.currentTarget.id) {
        setSelectedSortOption("");
      } else {
        setSelectedSortOption(event.currentTarget.id);
      }
    };

    return (
      <SelectableOption
        key={option}
        option={option}
        selectedOption={selectedSortOption}
        handleSelect={handleSelectSortOption}
      />
    );
  });

  return sortSection;
};
