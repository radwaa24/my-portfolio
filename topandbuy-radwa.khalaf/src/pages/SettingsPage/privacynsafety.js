import React, { useState } from "react";
import styles from "../../components/styles/settingsstyles.module.css";

const PrivacyNSafety = () => {
  const [showInSearch, setShowInSearch] = useState(false);

  const handleCheckboxClick = () => {
    setShowInSearch(!showInSearch);
  };

  const checkbox = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="44"
      height="24"
      viewBox="0 0 44 24"
      fill="none"
      onClick={handleCheckboxClick}
      style={{ cursor: "pointer" }}
    >
      <rect
        width="43.166"
        height="23.9811"
        rx="11.9906"
        fill={showInSearch ? "#32CD00" : "#D9D9D9"}
      />
      <rect
        x={showInSearch ? "22.07666" : "4.07666"}
        y="3.59766"
        width="16.7868"
        height="16.7868"
        rx="8.39339"
        fill={showInSearch ? "#ffff" : "#ffff"}
      />
    </svg>
  );

  return (
    <>
      <div className=" mb-16">
        <h1 className={`${styles.bottomheader} m-5 `}>Block Setting</h1>
        <div className="flex lg:mx-20 mx-8 mt-6 gap-x-5">
          <h1 className={`${styles.bottomlabel} my-auto `}>
            People you've blocked
          </h1>
          <div className="border border-gray-30 p-2 mr-4 rounded-xl shadow-sm flex flex-grow">
            <input
              type="text"
              placeholder="Block new user"
              className="w-full"
            />
            <button href="/" className={styles.add}>
              ADD
            </button>
          </div>
        </div>
      </div>
      <div>
        <div className={`${styles.bottomheader} m-5`}>Privacy</div>
        <div
          className={`${styles.bottomlabel} mt-8 flex   lg:mx-20 mx-8 justify-between `}
        >
          <span>Show up in search results</span>
          <span className=" ">{checkbox}</span>
        </div>
      </div>
    </>
  );
};

export default PrivacyNSafety;
