import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart, faSeedling } from "@fortawesome/free-solid-svg-icons";

export const Footer = (props) => {
  return (
    <div className="footer text-center">
      <p>
        <FontAwesomeIcon icon={faSeedling} className="teal" /> Thank you{" "}
        <FontAwesomeIcon icon={faHeart} className="pink" />
      </p>
    </div>
  );
};
