import React from "react";
import "./FillButton.css";
import "../../assets/root.css";

const FillButton = ({ href, children }) => {
  return (
    <a href={href} className="filled-button">
      {children}
    </a>
  );
};

export default FillButton;
