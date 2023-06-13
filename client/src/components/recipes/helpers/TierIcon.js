import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClock } from "@fortawesome/free-solid-svg-icons";

export const TierIcon = ({ tier }) => {
  let tierIconClass;
  if (tier === "quick") {
    tierIconClass = "teal";
  } else if (tier === "average") {
    tierIconClass = "yellow";
  } else if (tier === "extended") {
    tierIconClass = "red";
  }
  return <FontAwesomeIcon icon={faClock} className={tierIconClass} />;
};
