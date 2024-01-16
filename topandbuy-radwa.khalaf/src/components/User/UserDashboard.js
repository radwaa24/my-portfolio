import * as React from "react";
import styles from "../styles/rightstyles.module.css";
import ProfilePicture from "./ProfilePicture";
import { dummyuser } from "../../assets";

export default function UserDashboard() {
  return (
    <div className="flex flex-col w-full mb-14">
      <div className="flex items-center justify-center ">
        <div className="flex bg-gray-100 w-full h-[139px] justify-center items-center">
          <ProfilePicture user={dummyuser} />
        </div>
      </div>

      <div
        id="mainrow"
        className="flex justify-around items-center w-full border-y border-gray-300 my-2"
      >
        <StatsRow />
      </div>

      <div className="flex justify-center items-center flex-col">
        <OptionButtons />
      </div>
    </div>
  );
}

/* const ProfilePicture = () => {
	return (
		<Box
		sx={{
		width: 139,
		height: 139,
		backgroundColor: "gray",
		margin: "6px auto 13px auto",
		}}
		/* borderRadius={"100%"} /* Change to profpic container  
	>
			<ProfilePicture user= {dummyuser}/>
		</Box>


	);
}; */

const StatsRow = () => {
  return (
    <div className="flex justify-between">
      <div className="flex flex-col w-[115px] items-center my-2" id="post">
        <div id="postcount" className={`${styles.carddata} `}>
          XXX
        </div>
        <div id="postlabel" className={styles.cardlabel}>
          Post
        </div>
      </div>

      <div className="flex flex-col w-[115px] items-center my-2" id="following">
        <div id="followingcount" className={`${styles.carddata} `}>
          XXX
        </div>
        <div id="followinglabel" className={styles.cardlabel}>
          Following
        </div>
      </div>

      <div className="flex flex-col w-[115px] items-center my-2" id="followers">
        <div id="followerscount" className={`${styles.carddata} `}>
          XXX
        </div>
        <div id="followerslabel" className={styles.cardlabel}>
          Followers
        </div>
      </div>
    </div>
  );
};

const OptionButtons = () => {
  return (
    <ul className={styles.menu}>
      <li className="py-2">
        <a href="/settings" className="text-decoration-none">
          <div className="flex items-center">
            <span className={styles.menulabel}>Setting</span>
          </div>
        </a>
      </li>

      <li className="py-2">
        <a href="/" className="text-decoration-none">
          <div className="flex items-center">
            <span className={styles.menulabel}>Help center</span>
          </div>
        </a>
      </li>

      <li className="py-2">
        <a href="/" className="text-decoration-none">
          <div className="flex items-center">
            <span className={styles.menulabel}>Report a problem</span>
          </div>
        </a>
      </li>

      <li className="py-2">
        <a href="/" onClick={handleLogout} className="text-decoration-none">
          <div className="flex items-center">
            <span className={styles.menulabel}>Log out</span>
          </div>
        </a>
      </li>
    </ul>
  );
};

function handleLogout() {
  const navigate = require("react-router-dom").useNavigate;
  localStorage.clear();
  navigate("/");
  window.location.reload();
}

const personimg = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="41"
    height="41"
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
