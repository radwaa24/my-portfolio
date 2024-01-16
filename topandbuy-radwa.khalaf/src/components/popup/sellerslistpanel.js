import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import styles from "../styles/sellerslist.module.css";
import { closeButton } from "../../assets/constants";
import { DropdownMenu } from "../common";
import { dummySellers } from "../../assets/dummyData/dummySellers";

const SellersListPanel = ({ visible, handleClose }) => {
  /* Dummy data */
  const prodImage = require("../images/RectangleNoProd.png");
  const caption =
    "Lorem ipsum dolor sit amet, consectetur adi piscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.";
  const sellers = dummySellers;

  return (
    <div
      className={`fixed right-0 top-0 h-full w-520px ${
        visible ? "block" : "hidden"
      }`}
    >
      <div className={styles.closeIcon} onClick={handleClose}>
        {" "}
        {closeButton}{" "}
      </div>

      <div className="flex flex-col justify-center">
        <div className="flex flex-row justify-center items-center">
          <img
            className="h-140 w-140 rounded-full"
            src={prodImage}
            alt={caption}
          />
          <div className="ml-4">
            <span className="text-sm font-semibold">{caption}</span>
          </div>
        </div>
        <div className="flex items-center justify-between h-16 bg-gray-300">
          <div className="ml-4">
            <span className={styles.header}>
              <span id={styles.num}>{sellers.length}</span>
              Sellers
            </span>
          </div>
          <div className="ml-4">
            <span className={styles.header}>Rating</span>
          </div>
          <div className="mr-4">
            <DropdownMenu className="m-1 min-w-20" size="small" />
          </div>
        </div>
        <div className="max-h-500 overflow-y-auto">
          <ul className="list-reset">
            {sellers.map((seller) => (
              <li key={seller.id}>
                <div className="flex items-center justify-between">
                  <img
                    className="h-16 w-16 rounded-full"
                    src={seller.image}
                    alt={seller.name}
                  />
                  <div className="flex flex-col ml-4">
                    <span className="text-sm font-semibold">{seller.name}</span>
                    <span className="text-sm text-gray-500">
                      {seller.price}
                    </span>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default SellersListPanel;

const ImageContainer = ({ image, ...props }) => {
  return <img {...props} src={image} alt="product image" />;
};

const Caption = ({ caption }) => {
  return (
    <div className="flex flex-col justify-center items-center mt-24 h-140">
      <p className={styles.caption}>{caption}</p>
    </div>
  );
};

const SellerRow = (props) => {
  return (
    <div className="flex flex-row justify-between h-60">
      <div className="flex flex-col">
        <ProductPrices image={props.image} price={props.price} />
      </div>
      <div className="flex flex-col">
        <ProductRating />
      </div>
      <div className="flex flex-col">
        <BuyButton />
      </div>
    </div>
  );
};

const ProductPrices = ({ image, price, caption }) => {
  return (
    <div className="flex flex-row justify-center">
      <div className="flex flex-row">
        <img
          className="h-55 w-55 rounded-full mr-3"
          src={image}
          alt={caption}
        />
        <div className="w-55 h-55 mr-3 rounded-md">
          <img
            src={image}
            alt="Product Image"
            className="w-full h-full rounded-md"
          />
        </div>

        <div className="flex flex-col">
          <span className={styles.price}>{price}</span>
          <span className={styles.seller}>Seller</span>
        </div>
      </div>
    </div>
  );
};

const ProductRating = ({ props }) => {
  <div className="flex items-center">
    <span className="text-gray-500">No rating available</span>
  </div>;
};

const BuyButton = (props) => {
  const handleButtonClick = () => {
    window.open("https://www.google.com", "_blank");
  };

  return (
    <button
      onClick={handleButtonClick}
      className="bg-yellow-400 w-24 h-6 text-black"
    >
      Buy
    </button>
  );
};
