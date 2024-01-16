import React, { useState } from "react";
import UserDashboard from "../components/User/UserDashboard";
import FilterButtons from "../components/common/CommonButtons/FilterButtons";
import ProfileList from "./Profile/ProfileList";
import ProfileComments from "./Profile/ProfileComments";
import ProfileSaved from "./Profile/ProfileSaved";
import ProfileHistory from "./Profile/ProfileHistory";
import mainstyles from "../components/styles/mainstyles.module.css";
import buttonstyles from "../components/styles/buttonstyles.module.css";

const Userpage = () => {
  const [activeComponent, setActiveComponent] = useState("ProfileComments");

  const renderComponent = () => {
    switch (activeComponent) {
      case "ProfileList":
        return <ProfileList />;
      case "ProfileComments":
        return <ProfileComments />;
      case "ProfileSaved":
        return <ProfileSaved />;
      case "ProfileHistory":
        return <ProfileHistory />;
      default:
        return <ProfileComments />;
    }
  };

  return (
    <div className="flex flex-col-reverse lg:flex-row lg:mx-20 border-t border-gray-300 ">
      <div className="flex flex-col lg:col-span-2 border-l  border-gray-300 max-w-5xl">
        <div className="flex lg:border-b w-full lg:justify-center overflow-auto border-gray-300  p-1">
          <button
            className={`tex ${
              activeComponent === "ProfileList"
                ? "text-red-500"
                : "text-gray-400"
            } ${buttonstyles.categoryfilterbuttons}`}
            onClick={() => setActiveComponent("ProfileList")}
          >
            List
          </button>
          <button
            className={`${
              activeComponent === "ProfileComments"
                ? "text-red-500"
                : "text-gray-400"
            } ${buttonstyles.categoryfilterbuttons}`}
            onClick={() => setActiveComponent("ProfileComments")}
          >
            Comments
          </button>
          <button
            className={`${
              activeComponent === "ProfileSaved"
                ? "text-red-500"
                : "text-gray-400"
            } ${buttonstyles.categoryfilterbuttons}`}
            onClick={() => setActiveComponent("ProfileSaved")}
          >
            Saved
          </button>
          <button
            className={`${
              activeComponent === "ProfileHistory"
                ? "text-red-500"
                : "text-gray-400"
            } ${buttonstyles.categoryfilterbuttons}`}
            onClick={() => setActiveComponent("ProfileHistory")}
          >
            History
          </button>
        </div>
        <div className={` ${mainstyles.mainarea}`}>
          <div className="my-2">
            <FilterButtons />
          </div>
          {renderComponent()}
        </div>
      </div>

      <div className="border-l border-gray-300 ml-2 flex-start lg:w-[310px] ">
        <UserDashboard />
      </div>
    </div>
  );
};

export default Userpage;
