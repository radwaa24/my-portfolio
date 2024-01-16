import React from "react";
import { bell } from "../../assets";
import { BasicMenu } from "../common";
import { notifications } from "../../assets/dummyData/notifications";

const NotificationBell = ({ badgeContent }) => {
  const newNotifs = `You have ${badgeContent} new notifications`;
  const noNotifs = "You have no new notifications";
  const [open, setOpen] =
    React.useState(
      false
    ); /*Hook dynamicaly to notif bell and display the menu in the right part     */
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleOpenNotif = (event) => {
    setOpen(true);
    setAnchorEl(event.currentTarget);
  };

  const handleCloseNotif = () => {
    setOpen(false);
    setAnchorEl(null);
  };

  const notifs = notifications;

  return (
    <div>
      <div className="">
        <div className="">
          <button onClick={badgeContent ? handleOpenNotif : null} className="">
            {bell}
            {badgeContent && (
              <div className="absolute top-0 right-0 -mt-1 -mr-1">
                <span className="w-5 h-5 bg-red-500 rounded-full text-white text-center leading-5 text-xs">
                  {badgeContent}
                </span>
              </div>
            )}
          </button>
        </div>
        {badgeContent && (
          <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2">
            <span className="px-2 py-1 text-xs bg-gray-800 text-white rounded">
              {badgeContent > 99 ? "99+" : badgeContent}
            </span>
          </div>
        )}
      </div>

      <BasicMenu
        open={open}
        anchorEl={anchorEl}
        handleClose={handleCloseNotif}
        menuItems={notifications}
      />
    </div>
  );
};

export default NotificationBell;
