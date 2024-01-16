import React from "react";
import mainstyles from "../styles/mainstyles.module.css";
import { PositionedButton } from "../common";

export const PostInfoContainer = ({ renderDate }) => {
  return (
    <div className="flex">
      <ProfilepicContainer userprofpic={personimg} />
      <PostInfo renderDate={renderDate} />
    </div>
  );
};

const ProfilepicContainer = ({ userprofpic }) => {
  return (
    <div className={mainstyles.iconwrapper}>
      <div className={mainstyles.iconcontainer}>{userprofpic}</div>
    </div>
  );
};

const body = (
  <p>
    Lorem ipsum dolor sit amet, consectetur tristique Lorem ipsum dolor sit
    amet, consectetur tristique Lorem ipsum dolor sit amet, consectetur tristiqu
    Lorem ipsum dolor sit amet, consectetur tristique Lorem ipsum dolor sit
    amet, consectetur Lorem ipsum dolor sit amet, consectetur tristique Lorem
    ipsum dolor sit amet, consectetur tristiq
  </p>
);

const personimg = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="100%"
    height="100%"
    viewBox="0 0 51 52"
    fill="none"
  >
    <path
      d="M25.1602 2C11.9053 2 1.16016 12.7452 1.16016 26C1.16016 39.2547 11.9053 50 25.1602 50C38.4149 50 49.1602 39.2547 49.1602 26C49.1602 12.7452 38.4149 2 25.1602 2Z"
      stroke="black"
      stroke-width="2.23242"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
    <path
      d="M6.60938 41.2301C6.60938 41.2301 11.959 34.4004 25.159 34.4004C38.359 34.4004 43.7088 41.2301 43.7088 41.2301"
      stroke="black"
      stroke-width="2.23242"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
    <path
      d="M25.1609 26.0006C29.1375 26.0006 32.3609 22.7771 32.3609 18.8006C32.3609 14.8241 29.1375 11.6006 25.1609 11.6006C21.1844 11.6006 17.9609 14.8241 17.9609 18.8006C17.9609 22.7771 21.1844 26.0006 25.1609 26.0006Z"
      stroke="black"
      stroke-width="2.23242"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
  </svg>
);

const PositionedMenu = ({ anchorEl, open, onClose }) => {
  return (
    <div
      className={` absolute right-0 mt-8 ${open ? "block" : "hidden"}`}
      onClick={onClose}
    >
      <div className=" bg-white border border-gray-300 shadow-md p-2 rounded-md">
        <div className="p-2" onClick={onClose}>
          Follow @user
        </div>
        <div className="p-2" onClick={onClose}>
          Mute @user
        </div>
        <div className="p-2" onClick={onClose}>
          Block
        </div>
        <div className="p-2" onClick={onClose}>
          Report List
        </div>
        <div className="p-2" onClick={onClose}>
          Hide
        </div>
      </div>
    </div>
  );
};

const PostInfo = ({ renderDate }) => {
  const [open, setOpen] =
    React.useState(
      false
    ); /*Hook dynamicaly to notif bell and display the menu in the right part     */
  const [anchorEl, setAnchorEl] = React.useState(null);
  const dateofpost = new Date();

  const handleOpenMenu = (event) => {
    setOpen(true);
    setAnchorEl(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setOpen(false);
    setAnchorEl(null);
  };

  return (
    <div className="">
      <div className="flex flex-row ">
        <h1 className="font-semibold my-auto lg:text-base text-sm flex-shrink-0">
          Lorem ipsum dolor sit amet, consectetur tristique.
        </h1>
        <span className="font-light ml-2 lg:text-sm text-xs my-auto flex-shrink-0 ">
          {renderDate}
        </span>
        <span className="mt-0 w-full flex items-end justify-end">
          <PositionedButton
            anchorEl={anchorEl}
            handleClick={handleOpenMenu}
            handleClose={handleCloseMenu}
          />{" "}
        </span>
      </div>

      <p className="">{body}</p>

      <PositionedMenu
        open={open}
        anchorEl={anchorEl}
        onClose={handleCloseMenu}
      />
    </div>
  );
};
