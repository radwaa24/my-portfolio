import React, { useState } from "react";
import styles from "../../components/styles/settingsstyles.module.css";

export default function Accessibility() {
  const [increaseColorContrast, setIncreaseColorContrast] = useState(false);
  const [reduceMotion, setReduceMotion] = useState(false);
  const [receiveImageDescriptionReminder, setReceiveImageDescriptionReminder] =
    useState(false);

  const handleIncreaseColorContrastChange = () => {
    setIncreaseColorContrast(!increaseColorContrast);
  };

  const handleReduceMotionChange = () => {
    setReduceMotion(!reduceMotion);
  };

  const handleReceiveImageDescriptionReminderChange = () => {
    setReceiveImageDescriptionReminder(!receiveImageDescriptionReminder);
  };

  const renderCheckbox = (isChecked) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="44"
      height="24"
      viewBox="0 0 44 24"
      fill="none"
      style={{ cursor: "pointer" }}
    >
      <rect
        width="43.166"
        height="23.9811"
        rx="11.9906"
        fill={isChecked ? "#32CD00" : "#D9D9D9"}
      />
      <rect
        x={isChecked ? "22.07666" : "4.07666"}
        y="3.59766"
        width="16.7868"
        height="16.7868"
        rx="8.39339"
        fill={isChecked ? "#ffff" : "#ffff"}
      />
    </svg>
  );

  return (
    <>
      <div className="px-6 pt-8">
        <h1 className={styles.bottomheader}>Vision</h1>
        <div className="flex lg:mx-16 m-8 py-2 justify-between">
          <span className={styles.bottomlabel}>Increase color contrast</span>
          <span onClick={handleIncreaseColorContrastChange}>
            {renderCheckbox(increaseColorContrast)}
          </span>
        </div>

        <div className={styles.bottomheader}>Motion</div>
        <div className="flex lg:mx-16 m-8 py-2  justify-between">
          <span className={styles.bottomlabel}>Reduce motion</span>
          <span onClick={handleReduceMotionChange}>
            {renderCheckbox(reduceMotion)}
          </span>
        </div>

        <div className={styles.bottomheader}>Media</div>
        <div className="flex lg:mx-16 m-8 py-2  justify-between">
          <span className={styles.bottomlabel}>
            Receive image description reminder
          </span>
          <span onClick={handleReceiveImageDescriptionReminderChange}>
            {renderCheckbox(receiveImageDescriptionReminder)}
          </span>
        </div>
      </div>
    </>
  );
}
