import * as React from "react";

export default function Right() {
  return (
    <div class="flex flex-col w-278">
      <div class="w-full">
        <div class="w-full border-t border-gray-300">
          <div class="flex justify-center items-center w-full h-full">
            <div class="w-139 h-139 bg-gray-500 rounded-full mx-auto my-6"></div>
          </div>
        </div>

        <div
          id="mainrow"
          class="w-full h-71 border-t border-gray-300 flex justify-around items-center"
        >
          <div
            id="post"
            class="w-115 flex flex-col justify-center items-center"
          >
            <div id="postcount" class="carddata">
              XXX
            </div>
            <div id="postlabel" class="cardlabel">
              Post
            </div>
          </div>

          <div
            id="following"
            class="w-115 flex flex-col justify-center items-center"
          >
            <div id="followingcount" class="carddata">
              XXX
            </div>
            <div id="followinglabel" class="cardlabel">
              Following
            </div>
          </div>

          <div
            id="followers"
            class="w-115 flex flex-col justify-center items-center"
          >
            <div id="followerscount" class="carddata">
              XXX
            </div>
            <div id="followerslabel" class="cardlabel">
              Followers
            </div>
          </div>
        </div>

        <div class="h-404">
          <div class="menu">
            <a href="/settings" class="text-decoration-none">
              <div class="menulabel">Setting</div>
            </a>
            <a href="/" class="text-decoration-none">
              <div class="menulabel">Help center</div>
            </a>
            <a href="/" class="text-decoration-none">
              <div class="menulabel">Report a problem</div>
            </a>
            <a href="/" onclick="handleLogout" class="text-decoration-none">
              <div class="menulabel">Log out</div>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

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
