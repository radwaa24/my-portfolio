import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const IconBtn = ({ children, handleClick, ...props }) => {
  return (
    <button
      {...props}
      onClick={handleClick}
      className="w-12 h-12 pl-2 relative p-0"
    >
      <FontAwesomeIcon />
      {children}
    </button>
  );
};

export default IconBtn;
