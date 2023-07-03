import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHeart as faSolidHeart,
  faFilter,
  faSort,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import { faHeart as faRegularHeart } from "@fortawesome/free-regular-svg-icons";

import { FilterOptionSection } from "./FilterOptionSection";
import { SortOptionSection } from "./SortOptionSection";

export const SortFilterContainer = ({
  selectedSortOption,
  setSelectedSortOption,
  selectedFilterOptions,
  setSelectedFilterOptions,
}) => {
  const [displaySort, setDisplaySort] = useState(false);
  const [displayFilter, setDisplayFilter] = useState(false);

  const filterOptions = [
    "breakfast",
    "lunch",
    "dinner",
    "snack",
    "dessert",
    "quick",
    "average",
    "extended",
  ];

  const handleSelectFilterOption = (event) => {
    if (selectedFilterOptions.includes(event.currentTarget.id)) {
      setSelectedFilterOptions(
        selectedFilterOptions.filter((option) => option !== event.currentTarget.id)
      );
    } else {
      setSelectedFilterOptions([...selectedFilterOptions, event.currentTarget.id]);
    }
  };

  const resetFilterOptions = () => {
    if (selectedFilterOptions.includes("favorites")) {
      setSelectedFilterOptions(["favorites"]);
    } else {
      setSelectedFilterOptions([]);
    }
  };

  return (
    <div className="grid-x grid-margin-x filter-section">
      <div className="cell small-2 medium-3 callout sort-filter">
        <p onClick={() => setDisplaySort(!displaySort)}>
          <FontAwesomeIcon icon={faSort} className="teal" /> sort by
          {selectedSortOption ? (
            <FontAwesomeIcon
              icon={faXmark}
              className="close-icon float-right"
              onClick={() => setSelectedSortOption("")}
            />
          ) : null}
        </p>
        {displaySort ? (
          <SortOptionSection
            selectedSortOption={selectedSortOption}
            setSelectedSortOption={setSelectedSortOption}
          />
        ) : null}
      </div>
      <div className="cell small-2 medium-3 callout sort-filter">
        <p onClick={() => setDisplayFilter(!displayFilter)}>
          <FontAwesomeIcon icon={faFilter} className="teal" /> filters
          {selectedFilterOptions.some((option) => filterOptions.includes(option)) ? (
            <FontAwesomeIcon
              icon={faXmark}
              className="close-icon float-right"
              onClick={resetFilterOptions}
            />
          ) : null}
        </p>
        {displayFilter ? (
          <FilterOptionSection
            filterOptions={filterOptions}
            selectedFilterOptions={selectedFilterOptions}
            handleSelectFilterOption={handleSelectFilterOption}
          />
        ) : null}
      </div>
      <div
        className="grid-x cell small-2 medium-3 callout sort-filter"
        id="favorites"
        onClick={handleSelectFilterOption}
      >
        <FontAwesomeIcon
          icon={selectedFilterOptions.includes("favorites") ? faSolidHeart : faRegularHeart}
          className={"cell small-3 button-heart pink"}
        />
        <p className="cell small-9">favorites</p>
      </div>
    </div>
  );
};
