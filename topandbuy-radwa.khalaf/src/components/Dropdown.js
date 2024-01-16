import React, { useState } from "react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import topnavstyles from "./styles/topnavbarelements.module.css";

export default function Dropdown() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div
      id={topnavstyles.topdropdown}
      onClick={toggleDropdown}
      className="flex gap-16 "
      aria-haspopup="true"
      aria-expanded={isOpen}
    >
      <button className="ml-5">Top</button>
      <ChevronDownIcon
        className=" my-auto "
        id={topnavstyles.dropicon}
        aria-hidden="false"
      />
      {isOpen && (
        <div
          className=" absolute mt-10 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none"
          role="menu"
          aria-orientation="vertical"
        >
          <div className="py-1" role="none">
            <a
              href="/"
              id={topnavstyles.dropitems}
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
              role="menuitem"
            >
              Home & Kitchen
            </a>
            <a
              href="/"
              id={topnavstyles.dropitems}
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
              role="menuitem"
            >
              Beauty & Personal Care
            </a>
            <a
              href="/"
              id={topnavstyles.dropitems}
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
              role="menuitem"
            >
              Clothing
            </a>
            <a
              href="/"
              id={topnavstyles.dropitems}
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
              role="menuitem"
            >
              Toys & Games
            </a>
            <a
              href="/"
              id={topnavstyles.dropitems}
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
              role="menuitem"
            >
              Health, Household & Baby Care
            </a>
            <a
              href="/"
              id={topnavstyles.dropitems}
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
              role="menuitem"
            >
              Electronics
            </a>
            <a
              href="/"
              id={topnavstyles.dropitems}
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
              role="menuitem"
            >
              Sports & Outdoors
            </a>
            <a
              href="/"
              id={topnavstyles.dropitems}
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
              role="menuitem"
            >
              Pet Supplies
            </a>
            <a
              href="/"
              id={topnavstyles.dropitems}
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
              role="menuitem"
            >
              Office Supplies
            </a>
          </div>
        </div>
      )}
    </div>
  );
}
