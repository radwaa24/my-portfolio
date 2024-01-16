import React, { useState } from "react";
import buttonstyles from "../styles/buttonstyles.module.css";
import { IconBtn } from "../common";
import SellersButton from "./sellersbutton";

const ProductButtons = () => {
  return (
    <div className="lg:flex ">
      <div className="flex flex-row lg:space-x-16 space-x-5 my-2 lg:my-0 w-full justify-center  ">
        <LikeCounterBtn />
        <CommentCounter />
        <ShareButton />
        <SaveButton />
      </div>
      <div>
        <SellerCounter />
      </div>
    </div>
  );
};

function LikeCounterBtn() {
  const [likeCount, setLikeCount] = useState(0);
  const [incrementClicked, setIncrementClicked] = useState(false);
  const [decrementClicked, setDecrementClicked] = useState(false);

  const increment = () => {
    setLikeCount(likeCount + 1);
    setIncrementClicked(true);
    setDecrementClicked(false);
  };

  const decrement = () => {
    setLikeCount(likeCount - 1);
    setDecrementClicked(true);
    setIncrementClicked(false);
  };
  return (
    <div className="flex items-center justify-center border border-gray-300 rounded-full h-[33px] my-auto">
      <IconBtn disableRipple handleClick={decrement}>
        <img
          className=" cursor-pointer w-7"
          src={require("../images/decrementbtn.png")}
          alt=""
        />
      </IconBtn>

      <p id={buttonstyles.countdisplay}>{likeCount}</p>

      <IconBtn
        disableRipple
        handleClick={increment}
        disabled={incrementClicked}
      >
        <img
          className=" cursor-pointer w-6 ml-1"
          src={require("../images/incrementbtn.png")}
          alt=""
        />
      </IconBtn>
    </div>
  );
}

//TODO:
// 1. likeCount value should come from database
// 2. User can click + and - only once

const CommentCounter = () => {
  const [commentCount, setCommentCount] = useState(0);

  function handleButtonClick() {
    console.log("comment button is clicked");
    setCommentCount((prevCount) => prevCount + 1); //if comment is posted successfully
  }

  return (
    <div className="flex items-center relative">
      <IconBtn handleClick={handleButtonClick} className={buttonstyles.commbtn}>
        {commbtn}
      </IconBtn>
      <span className="absolute right-0 bottom-0">{commentCount}</span>
    </div>
  );
};

//TODO: component should receive the total number of comments from DB

const ShareButton = () => {
  function handleButtonClick() {
    console.log("Share button is clicked");
    //TODO: Add logic to share product
  }
  return (
    <IconBtn handleClick={handleButtonClick} className={buttonstyles.sharebtn}>
      {sharebtn}
    </IconBtn>
  );
};

const SaveButton = () => {
  function handleButtonClick() {
    console.log("Save button is clicked");
    //TODO: Add logic to share product
  }
  return (
    <IconBtn handleClick={handleButtonClick} className={buttonstyles.savebtn}>
      {savebtn}
    </IconBtn>
  );
};

function SellerCounter() {
  const [numSeller, setNumSeller] = useState(300);
  return (
    <div className="">
      <button className="bg-yellow-300 hover:bg-yellow-400 text-black rounded-2xl lg:w-[103px] w-72 mx-auto  py-2 flex items-center justify-center px-2">
        <div className="flex items-center justify-center ">
          <h3 className="mr-1 font-semibold text-2xl">{numSeller}</h3>
          <p className=" text-sm pt-1">Seller</p>
        </div>
      </button>
    </div>
  );
}

const commbtn = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="21"
    height="21"
    viewBox="0 0 21 21"
    fill="none"
  >
    <path
      d="M1.06055 18.8349V3.08986C1.06055 1.95238 1.98266 1.03027 3.12014 1.03027H17.5373C18.6748 1.03027 19.5969 1.95238 19.5969 3.08986V13.3878C19.5969 14.5253 18.6748 15.4474 17.5373 15.4474H6.16962C5.54395 15.4474 4.9522 15.7318 4.56135 16.2204L2.1609 19.2209C1.79604 19.677 1.06055 19.419 1.06055 18.8349Z"
      stroke="#353535"
      stroke-width="1.59718"
    />
  </svg>
);

const sharebtn = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="18"
    height="20"
    viewBox="0 0 18 20"
    fill="none"
  >
    <path
      d="M17.0042 11.001V17.0025C17.0042 18.1074 16.1086 19.0031 15.0037 19.0031H3.00052C1.89566 19.0031 1 18.1074 1 17.0025V11.001"
      stroke="#353535"
      stroke-width="1.55138"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
    <path
      d="M9.00092 13.0031V1M9.00092 1L5.5 4.50091M9.00092 1L12.5018 4.50091"
      stroke="#353535"
      stroke-width="1.55138"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
  </svg>
);

const savebtn = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="15"
    height="18"
    viewBox="0 0 15 18"
    fill="none"
  >
    <path
      d="M1.56449 15.6453L7.30096 13.3503L13.0374 15.6453V1.48063H1.56449V15.6453ZM1.09514 17.4467C0.834395 17.5619 0.586684 17.5454 0.352011 17.3974C0.117337 17.2493 0 17.0437 0 16.7805V1.48063C0 1.08579 0.156449 0.740314 0.469347 0.444188C0.782246 0.148063 1.14729 0 1.56449 0H13.0374C13.4546 0 13.8197 0.148063 14.1326 0.444188C14.4455 0.740314 14.6019 1.08579 14.6019 1.48063V16.7805C14.6019 17.0437 14.4846 17.2493 14.2499 17.3974C14.0152 17.5454 13.7675 17.5619 13.5068 17.4467L7.30096 14.9297L1.09514 17.4467Z"
      fill="#353535"
    />
  </svg>
);

export default ProductButtons;
