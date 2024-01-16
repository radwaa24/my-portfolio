import React from "react";

const DropdownMenu = ({ ...props }) => {
  const [value, setValue] = React.useState("");

  const handleChange = (event) => {
    setValue(event.target.value);
  };

  return (
    <div className="relative">
      <label htmlFor={props.label} className="text-sm text-gray-600">
        Sort By
      </label>
      <select
        id={props.label}
        value={value}
        onChange={handleChange}
        className="block w-full px-4 py-2 mt-1 text-sm border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
      >
        <option value="">None</option>
        <option value="brand">Brand</option>
        <option value="color">Color</option>
        <option value="size">Size</option>
        <option value="type">Type</option>
        <option value="price">Price</option>
      </select>
    </div>
  );
};

export default DropdownMenu;
