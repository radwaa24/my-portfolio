import React, { useState } from "react";
import buttonstyles from "../styles/buttonstyles.module.css";
import { SellersListPanel } from "../popup";
import backarrow from "../images/arrowBack.png";

function SellersButton() {
  const [isVisible, setIsVisible] = useState(false);

  const close = () => setIsVisible(false);
  const open = () => setIsVisible(true);

  const [numSeller, setNumSeller] = useState(0);

  return (
    <div className="hidden lg:grid grid-cols-1 h-full py-36">
      <div className="ml-16 mb-5 ">{arrow1}</div>
      <div className="flex ">
        <span className="mt-5">{arrowBack}</span>
        <button
          onClick={() => (isVisible ? close() : open())}
          className="bg-yellow-300  h-16 w-24 py-1 flex items-center justify-center rounded-xl  focus:outline-none hover:bg-yellow-400"
        >
          <div className="flex flex-col w-full">
            <h1 className="font-bold text-2xl">BUY</h1>
            <div className="">
              <span className="font-bold ">{numSeller}</span>
              <span className="mx-auto">Seller</span>
            </div>
          </div>
        </button>
      </div>
      <div className="ml-16 mt-5">{arrow2}</div>

      {isVisible && (
        <SellersListPanel visible={isVisible} handleClose={close} />
      )}
    </div>
  );
}

export default SellersButton;

const arrow1 = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="114"
    viewBox="0 0 24 114"
    fill="none"
  >
    <path
      d="M10.9393 113.061C11.5251 113.646 12.4749 113.646 13.0607 113.061L22.6066 103.515C23.1924 102.929 23.1924 101.979 22.6066 101.393C22.0208 100.808 21.0711 100.808 20.4853 101.393L12 109.879L3.51472 101.393C2.92894 100.808 1.97919 100.808 1.3934 101.393C0.807616 101.979 0.807616 102.929 1.3934 103.515L10.9393 113.061ZM10.5 6.55671e-08L10.5 112L13.5 112L13.5 -6.55671e-08L10.5 6.55671e-08Z"
      fill="black"
    />
  </svg>
);

const arrow2 = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="114"
    viewBox="0 0 24 114"
    fill="none"
  >
    <path
      d="M13.0607 0.939339C12.4749 0.353554 11.5251 0.353554 10.9393 0.939339L1.3934 10.4853C0.807613 11.0711 0.807613 12.0208 1.3934 12.6066C1.97919 13.1924 2.92893 13.1924 3.51472 12.6066L12 4.12132L20.4853 12.6066C21.0711 13.1924 22.0208 13.1924 22.6066 12.6066C23.1924 12.0208 23.1924 11.0711 22.6066 10.4853L13.0607 0.939339ZM13.5 114L13.5 2L10.5 2L10.5 114L13.5 114Z"
      fill="black"
    />
  </svg>
);

const arrowBack = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="18"
    height="24"
    viewBox="0 0 18 24"
    fill="none"
  >
    <path
      d="M0.939341 10.9393C0.353554 11.5251 0.353554 12.4749 0.939341 13.0607L10.4853 22.6066C11.0711 23.1924 12.0208 23.1924 12.6066 22.6066C13.1924 22.0208 13.1924 21.0711 12.6066 20.4853L4.12132 12L12.6066 3.51472C13.1924 2.92893 13.1924 1.97919 12.6066 1.3934C12.0208 0.807611 11.0711 0.807611 10.4853 1.3934L0.939341 10.9393ZM18 10.5L2 10.5V13.5L18 13.5V10.5Z"
      fill="black"
    />
  </svg>
);
