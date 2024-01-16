import React, { useEffect, useState } from "react";
import mainstyles from "../styles/mainstyles.module.css";
import { IconBtn, PositionedButton } from "../common";
import ProductButtons from "./productButtons";

const ProductContainer = ({ category }) => {
  return (
    <div className="flex flex-row">
      <div className="flex items-center justify-center mr-2">
        <div>
          <BadgeCategory prodcategory={category} />
        </div>
      </div>

      <div className="flex lg:flex-row flex-col space-x-0 border-t-2 lg:border-t-0 pt-4 lg:pt-0 px-14 lg:px-0 ">
        <ImageContainer productimg={prodimage} />

        <ProductInfo />
      </div>
    </div>
  );
};

export default ProductContainer;

const ProductInfo = () => {
  const [open, setOpen] = React.useState(false);
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleOpenMenu = (event) => {
    setOpen(true);
    setAnchorEl(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setOpen(false);
    setAnchorEl(null);
  };

  return (
    <div className="flex flex-col ">
      <div className="lg:border border-gray-300 border-l-0 rounded-r-lg w-full lg:h-[212.604px] h-full p-4">
        <div className="flex flex-col ">
          <div className="flex flex-row lg:h-32  lg:px-0">
            <div>
              <h5 className=" font-medium mr-1 text-xl ">
                Lorem ipsum dolor sit amet, consectetur tristique. Lorem ipsum
                dolor sit amet, consectetur tristique.
              </h5>
            </div>
            <div>
              <PositionedButton
                anchorEl={anchorEl}
                handleClick={handleOpenMenu}
                className=""
              />
            </div>
          </div>

          <PositionedMenu
            open={open}
            anchorEl={anchorEl}
            onClose={handleCloseMenu}
          />
        </div>

        <ProductButtons />
      </div>
    </div>
  );
};

const PositionedMenu = ({ anchorEl, open, onClose }) => {
  return (
    <div className={` absolute right-0 ${open ? "block" : "hidden"}`}>
      <div className="bg-white  border border-gray-300 shadow-md rounded-md p-3">
        <div className="py-2" onClick={onClose}>
          Not interested
        </div>
        <div className="py-2" onClick={onClose}>
          Report Product
        </div>
        <div className="py-2" onClick={onClose}>
          Block
        </div>
        <div className="py-2" onClick={onClose}>
          Report Post
        </div>
      </div>
    </div>
  );
};

//TODO: onCLick of each MenuItem

const prodimage = require("../images/RectangleNoProd.png");

const ImageContainer = ({ productimg }) => {
  return (
    <img
      src={productimg}
      alt="ProductImage"
      className="rounded-3xl lg:rounded-none "
      style={{ objectFit: "cover" }}
    />
  );
};

const numPosts = 4;
const BadgeCategory = ({ prodcategory }) => {
  let choice;

  if (prodcategory === "gold") {
    choice = (
      <img
        src={require("../images/classifBadges/7.png")}
        alt="gold"
        className="w-10 "
      />
    );
  } else if (prodcategory === "silver") {
    choice = (
      <img
        src={require("../images/classifBadges/8.png")}
        alt="silver"
        className="w-10 "
      />
    );
  } else if (prodcategory === "bronze") {
    choice = (
      <img
        src={require("../images/classifBadges/9.png")}
        alt="bronze"
        className="w-10 "
      />
    );
  } else {
    choice = renderBadge(numPosts);
  }

  return <div className={mainstyles}>{choice}</div>;
};

const renderBadge = (numPosts) => {
  return (
    <div className="w-10 ">
      <span className={mainstyles.number}>{numPosts}</span>
    </div>
  );
};
