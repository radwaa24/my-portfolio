import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import mainstyles from "./styles/mainstyles.module.css";
import { FilterButtons } from "./common";
import { UsersPost } from "./posts";
import { RenderPopup } from "./popup";

function Main() {
  return (
    <div className={`${mainstyles.mainarea} w-full overflow-y-auto`}>
      <div className="">
        <FilterButtons />
      </div>
      <Createpostbutton />
      <UsersPost />
    </div>
  );
}

export default Main;

function Createpostbutton() {
  const [showLoginModal, setShowLoginModal] = useState(false);
  const navigate = useNavigate();

  const handleClick = () => {
    if (localStorage.getItem("token")) {
      navigate("/newpost");
    } else {
      setShowLoginModal(true);
    }
  };

  return (
    <>
      <div className="flex border-y items-center mt-2">
        <div className="ml-3 mr-10">{personimg}</div>
        <div
          onClick={handleClick}
          className="border border-gray-300 rounded-2xl w-full mr-14 p-2 "
        >
          Create Post
        </div>
      </div>

      {showLoginModal && !localStorage.getItem("authenticated") && (
        <RenderPopup
          component="login"
          handleClose={() => {
            setShowLoginModal(false);
          }}
        />
      )}
    </>
  );
}

const personimg = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="48"
    height="48"
    viewBox="0 0 51 52"
    fill="none"
  >
    <path
      d="M25.1602 2C11.9053 2 1.16016 12.7452 1.16016 26C1.16016 39.2547 11.9053 50 25.1602 50C38.4149 50 49.1602 39.2547 49.1602 26C49.1602 12.7452 38.4149 2 25.1602 2Z"
      stroke="black"
      strokeWidth="2.23242"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M6.60938 41.2301C6.60938 41.2301 11.959 34.4004 25.159 34.4004C38.359 34.4004 43.7088 41.2301 43.7088 41.2301"
      stroke="black"
      strokeWidth="2.23242"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M25.1609 26.0006C29.1375 26.0006 32.3609 22.7771 32.3609 18.8006C32.3609 14.8241 29.1375 11.6006 25.1609 11.6006C21.1844 11.6006 17.9609 14.8241 17.9609 18.8006C17.9609 22.7771 21.1844 26.0006 25.1609 26.0006Z"
      stroke="black"
      strokeWidth="2.23242"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);
