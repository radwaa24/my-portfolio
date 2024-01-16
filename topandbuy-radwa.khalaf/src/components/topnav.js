import React, { useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import "./styles/topnavbarelements.module.css";
import topnavstyles from "./styles/topnavbarelements.module.css";
import { RenderPopup } from "./popup";
import { useAuth, AuthProvider } from "../context/AuthContext";
import { Logo, dummyuser } from "../assets";
import NotificationBell from "./notifiication/notificationBell";
import { notifications } from "../assets/dummyData/notifications";
import { ProfilePicture } from "./User";
import { ChevronDownIcon } from "@heroicons/react/outline";

import Chat from "./Chat";
import Dropdown from "./Dropdown";

function Navbar() {
  const navigate = useNavigate();

  const { token } = useAuth();
  const [open, setOpen] =
    React.useState(
      false
    ); /*Hook dynamicaly to notif bell and display the menu in the right part     */
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleOpenNotif = (event) => {
    setOpen(true);
    setAnchorEl(event.currentTarget);
  };

  const renderCreatepost = () => {
    if (token || localStorage.getItem("token")) {
      navigate("/newpost");
    } else {
      setShowLoginModal(true);
    }
  };

  const renderUserprofile = () => {
    if (token || localStorage.getItem("token")) {
      navigate("/user");
    } else {
      setShowLoginModal(true);
    }
  };

  //TODO:  render the userprofile
  // TODO:  render the notifs

  const handleCloseModal = () => {
    setShowLoginModal(false);
  };

  const goBack = () => {
    navigate("/");
  };

  return (
    <AuthProvider token={localStorage.getItem("token")}>
      <nav className="flex fixed bg-white w-full">
        <div className="lg:ml-20 lg:mr-2 mx-auto" onClick={goBack}>
          <Logo />
        </div>
        <div className="mx-auto lg:ml-20 lg:mr-6 ">
          <Dropdown />
        </div>
        <div id={topnavstyles.searchbar} className="hidden lg:flex">
          <Searchbar />
        </div>
        <div className="hidden lg:flex gap-5 lg:ml-6">
          <img
            src={require("./images/add.png")}
            alt="addPost"
            id={topnavstyles.add}
            onClick={renderCreatepost}
          />
          <div onClick={renderUserprofile}>
            <Mainuser />
          </div>
          {showLoginModal &&
            !token &&
            !localStorage.getItem("authenticated") && (
              <RenderPopup component="login" handleClose={handleCloseModal} />
            )}
          <div className="hidden lg:inline-flex my-auto ">
            <NotificationBell anchorEl={anchorEl} onClick={handleOpenNotif} />
          </div>

          <div className="hidden lg:inline-flex">
            <Chat id={topnavstyles.chaticon} />
          </div>
        </div>

        {/* --------------- Responsive menu ----------------------- */}

        <div className="flex mx-auto justify-end right-0 lg:hidden">
          <button
            className="right-0 text-red-800 hover:text-red-950 focus:outline-none focus:text-gray-700"
            onClick={toggleMenu}
          >
            <svg
              className="h-6 w-6"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        </div>

        {isOpen && (
          <div className="lg:hidden absolute mt-14 right-1 rounded-sm bg-white shadow-lg  ">
            <div className="w-72 h-12">
              <Searchbar />
            </div>
            <div className="grid grid-cols-4 px-2 bg-orange-50">
              <div className=" my-auto">
                <img
                  src={require("./images/add.png")}
                  alt="addPost"
                  onClick={renderCreatepost}
                />
              </div>
              <div className="" onClick={renderUserprofile}>
                <Mainuser />
              </div>
              {showLoginModal &&
                !token &&
                !localStorage.getItem("authenticated") && (
                  <RenderPopup
                    component="login"
                    handleClose={handleCloseModal}
                  />
                )}
              <div className="my-auto">
                <NotificationBell
                  anchorEl={anchorEl}
                  onClick={handleOpenNotif}
                />
              </div>
              <div className="my-auto">
                <Chat />
              </div>
            </div>
          </div>
        )}
      </nav>
    </AuthProvider>
  );
}
export default Navbar;

function Mainuser({ onClick }) {
  const name = "John Doe";
  const { token } = useAuth();

  return token || localStorage.getItem("token") ? (
    <ProfilePicture
      user={dummyuser}
      onClick={onClick}
      id={topnavstyles.profileimg}
    />
  ) : (
    <img
      id={topnavstyles.profileimg}
      src={require("./images/icon_profile.png")}
      alt={"Photo of " + name}
      onClick={onClick}
    />
  );
}

function Searchbar() {
  return (
    <form className="flex" role="search">
      <img
        className={` ${topnavstyles.searchimage}`}
        alt="Search Button"
        src={require("./images/icon_search.png")}
      ></img>
      <input
        type="search"
        placeholder="Search Top"
        aria-label="Search"
        style={{ textIndent: "50px" }}
        className="bg-transparent border-none "
      />
    </form>
  );
}
