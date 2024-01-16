import React, { useState } from "react";
import createstyles from "../components/styles/createstyles.module.css";
import { IconBtn } from "../components/common";
import { ChevronDownIcon } from "@heroicons/react/20/solid";

export default function Createpost() {
  const [productCount, setProductCount] = useState(6);

  const handleAddPostButton = () => {
    //insert a product inside products array
    setProductCount(productCount + 1);
  };

  return (
    <div className="max-w-5xl mx-auto p-4 w-full">
      <div className="relative overflow-auto h-[90vh]  ">
        <div className="flex flex-col">
          <h6 className={createstyles.header}>Create List</h6>
          <div className="flex justify-between w-full">
            <Drop />
            <button
              onClick={handleCreatePostButton}
              className="border border-red-700 text-red-700 rounded-lg my-1 text-2xl font-semibold px-12"
            >
              Create
            </button>
          </div>
        </div>

        <div className="flex flex-col">
          <div className="bg-[#F4F0F0] rounded-lg mt-10 mb-4 pt-5 pb-6 px-8 max-h-auto flex-shrink-0">
            <label htmlFor="add-title"></label>
            <input
              multiline={true}
              className=" bg-inherit focus:outline-none w-full border-zinc-500 border-b-2 shadow-sm "
              id="add-title"
              type="text"
              placeholder="Add Title"
            />
          </div>

          <div className="bg-[#F4F0F0] rounded-lg  pb-10 pt-6 px-8 max-h-auto flex-shrink-0">
            <label htmlFor="Add Description"></label>
            <input
              multiline={true}
              className="bg-inherit focus:outline-none w-full border-zinc-500 border-b-2 shadow-sm  placeholder:text- "
              id="Add Description"
              variant="standard"
              type="text"
              placeholder="Add Description"
            />
            <hr className=" border-t-2 shadow-sm border-zinc-500 mt-6" />
          </div>
        </div>

        <hr className="border-b-1 border-black my-10" />

        <div className="flex flex-col mt-3">
          {Array.from({ length: productCount }, (_, i) => (
            <Addingproduct key={i} listnumber={i + 1} />
          ))}

          <div className="grid grid-cols-4 mt-3 mb-3 p-0">
            <button
              variant="outlined"
              className="mt-3 border border-black shadow-sm col-span-3 py-2 text-2xl font-semibold  rounded-lg"
              onClick={handleAddPostButton}
            >
              Add
            </button>

            <button
              onClick={handleCreatePostButton}
              className="mt-3 ml-10 border  border-red-700 text-red-700 py-2 text-2xl font-semibold  rounded-lg"
            >
              Create
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function handleCreatePostButton() {
  console.log("Create button clicked");
}

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const categories = [
  "Home & Kitchen",
  "Beauty & Personal Car",
  "Clothing",
  "Toys & games",
  "Health, Household & Baby Care",
  "Electronics",
  "Sports & outdoors",
  "Pet Supplies",
  "Office Supplies",
];

function getStyles(categories, personName) {
  return {
    fontWeight: personName.indexOf(categories) === -1,
  };
}

function Drop() {
  const [personName, setPersonName] = React.useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const handleCategorySelection = (category) => {
    if (selectedCategories.includes(category)) {
      setSelectedCategories(selectedCategories.filter((c) => c !== category));
    } else {
      setSelectedCategories([...selectedCategories, category]);
    }
  };

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setPersonName(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    );
  };

  return (
    <div className={`${createstyles.dropdown} relative m-1 `}>
      <button
        type="button"
        className=" flex py-2 px-4 border border-black rounded-lg text-2xl font-semibold"
        id="dropdown-button"
        onClick={() => setDropdownOpen(!dropdownOpen)}
      >
        {selectedCategories.length > 0
          ? selectedCategories.join(", ")
          : "Categories"}
        <ChevronDownIcon className="ml-14 w-8 h-8 my-auto right-0 text-gray-500" />
      </button>

      {dropdownOpen && (
        <div className="absolute mt-1 w-fit bg-white border border-gray-300 rounded-md shadow-lg">
          <div className="py-1">
            {categories.map((category) => (
              <div
                key={category}
                className={`px-4 py-2 cursor-pointer hover:bg-gray-100 ${
                  getStyles(category, selectedCategories).fontWeight
                }`}
                onClick={() => handleCategorySelection(category)}
              >
                {category}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

const line = (
  <svg
    className={createstyles.line}
    xmlns="http://www.w3.org/2000/svg"
    width="1042"
    height="2"
    viewBox="0 0 1042 2"
    fill="none"
  >
    <path d="M0 1H1042" stroke="#B0B0B2" strokeWidth="1px" />
  </svg>
);

function Addingproduct({ listnumber }) {
  return (
    <div className={createstyles.addingproduct}>
      <div className="flex flex-col w-full ">
        <div className="flex flex-row items-center border-b-2 ">
          <ListNumber number={listnumber} />
          <div className="flex flex-row ml-auto mr-8 ">
            <DeleteIcon />
            <OrderIcon />
          </div>
        </div>
        {/* {line} */}
        <div className={createstyles.codetxt}>
          <label
            htmlFor="product-code"
            className="block text-sm font-medium "
          ></label>
          <input
            id="product-code"
            type="text"
            placeholder="Product Code"
            className=" w-1/2 bg-inherit border-b-2 border-zinc-500 shadow-sm focus:outline-none mt-4 placeholder:text-sm placeholder:font-normal"
          />
        </div>
      </div>
    </div>
  );
}

const ListNumber = ({ number }) => {
  return <p className={createstyles.listnumber}>{number}</p>;
};

const DeleteIcon = () => {
  return (
    <IconBtn>
      <div>{deleteicon}</div>
    </IconBtn>
  );
};

const OrderIcon = () => {
  return (
    <IconBtn>
      <div>{ordericon}</div>
    </IconBtn>
  );
};

const deleteicon = (
  <svg
    className={createstyles.deleteicon}
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="20"
    viewBox="0 0 20 20"
    fill="none"
  >
    <path
      d="M16.6069 8.80273V17.9716C16.6069 18.2948 16.3449 18.5568 16.0217 18.5568H3.53642C3.2132 18.5568 2.95117 18.2948 2.95117 17.9716V8.80273"
      stroke="black"
      stroke-width="1.46311"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
    <path
      d="M7.82812 14.6552V8.80273"
      stroke="black"
      stroke-width="1.46311"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
    <path
      d="M11.7295 14.6552V8.80273"
      stroke="black"
      stroke-width="1.46311"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
    <path
      d="M18.5574 4.90164H13.6803M13.6803 4.90164V1.58525C13.6803 1.26202 13.4183 1 13.0951 1H6.4623C6.13907 1 5.87705 1.26202 5.87705 1.58525V4.90164M13.6803 4.90164H5.87705M1 4.90164H5.87705"
      stroke="black"
      stroke-width="1.46311"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
  </svg>
);
const ordericon = (
  <svg
    className={createstyles.ordericon}
    xmlns="http://www.w3.org/2000/svg"
    width="18"
    height="14"
    viewBox="0 0 18 14"
    fill="none"
  >
    <path
      d="M2.62305 2.17969H16.0001"
      stroke="black"
      stroke-width="3.34426"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
    <path
      d="M2.62305 11.376H16.0001"
      stroke="black"
      stroke-width="3.34426"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
  </svg>
);
