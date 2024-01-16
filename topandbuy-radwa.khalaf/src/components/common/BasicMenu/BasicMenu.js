import * as React from "react";

export default function BasicMenu({ anchorEl, handleClose, open, menuItems }) {
  return (
    <div className={`absolute ${open ? "block" : "hidden"}`}>
      {menuItems.map((item) => (
        <button
          key={item.label}
          onClick={handleClose}
          className="block px-4 py-2 text-gray-800 hover:bg-gray-100"
        >
          {item.label}
        </button>
      ))}
    </div>
  );
}

//TODO:
/* 
1. Make this component generic so it can be reusable by other components
2. instead of mappin in notitifcations array, make it as constant that use the value passed 
as props 

*/
