import React from "react";

import { SelectableOption } from "./SelectableOption";

export const FilterOptionSection = ({
  filterOptions,
  selectedFilterOptions,
  handleSelectFilterOption,
}) => {
  const filterSection = filterOptions.map((option) => {
    return (
      <SelectableOption
        key={option}
        option={option}
        selectedOption={selectedFilterOptions}
        handleSelect={handleSelectFilterOption}
      />
    );
  });

  return <>{filterSection}</>;
};
