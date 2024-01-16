import { useState } from "react";
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import { Link } from "react-router-dom";
import styles from "../../components/styles/settingsstyles.module.css";

export default function Settings() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("settings");

  const handleTabClick = (tabName) => {
    setActiveTab(tabName);
  };

  return (
    <>
      <div className="">
        <div className="max-w-4xl mx-auto border-x border-gray-300">
          <div className="flex mb-2 ml-5 flex-row justify-start ">
            <div className={"flex my-auto "}>
              <img
                src={require("../../components/images/arrowBack.png")}
                onClick={() => {
                  navigate("/user");
                }}
                alt={"back"}
                className={styles.arrowback}
              />
            </div>
            <div className={styles.settingsheader}>Settings</div>
          </div>

          <div
            className={`${styles.tablabel} overflow-auto items-center p-2 lg:justify-center lg:space-x-12 space-x-6 `}
            id={"tabs"}
          >
            <Link
              to="/settings"
              className={`${styles.tabbox} ${
                activeTab === "settings" ? styles.activeTab : ""
              }`}
              onClick={() => handleTabClick("settings")}
            >
              Account Settings
            </Link>

            <Link
              to="privacynsafety"
              className={`${styles.tabbox} ${
                activeTab === "privacynsafety" ? styles.activeTab : ""
              }`}
              onClick={() => handleTabClick("privacynsafety")}
            >
              Privacy & Safety
            </Link>

            <Link
              to="notifications"
              className={`${styles.tabbox} ${
                activeTab === "notifications" ? styles.activeTab : ""
              }`}
              onClick={() => handleTabClick("notifications")}
            >
              Notifications
            </Link>

            <Link
              to="accessibility"
              className={`${styles.tabbox} ${
                activeTab === "accessibility" ? styles.activeTab : ""
              }`}
              onClick={() => handleTabClick("accessibility")}
            >
              Accessibility
            </Link>

            <Link
              to="billingnpayments"
              className={`${styles.tabbox} ${
                activeTab === "billingnpayments" ? styles.activeTab : ""
              }`}
              onClick={() => handleTabClick("billingnpayments")}
            >
              Billing & Payments
            </Link>
          </div>
          <Outlet />
        </div>
      </div>
    </>
  );
}
