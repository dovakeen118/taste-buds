import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart, faFaceSmileBeam, faSeedling } from "@fortawesome/free-solid-svg-icons";

export const Footer = () => {
  return (
    <div className="footer text-center">
      <p>
        <FontAwesomeIcon icon={faSeedling} className="teal" /> Made with{" "}
        <FontAwesomeIcon icon={faHeart} className="pink" /> Thank you{" "}
        <FontAwesomeIcon icon={faFaceSmileBeam} className="yellow" />
      </p>
    </div>
  );
};
