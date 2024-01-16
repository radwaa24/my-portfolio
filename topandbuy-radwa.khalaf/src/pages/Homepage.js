import React from "react";
import SellersButton from "../components/posts/sellersbutton";

import "../index.css";
import { Sidenav, Main } from "../components";

function Homepage() {
  return (
    <div className="flex lg:pl-28 ">
      <div className="fixed">
        <Sidenav />
      </div>
      <div className=" lg:mx-auto">
        <Main />
      </div>
      <div className=" fixed right-16">
        <SellersButton />
      </div>
    </div>
  );
}

export default Homepage;

export function HomepageAuth() {
  const userData = sessionStorage.getItem("userData");
  return (
    <div className="flex">
      <div className="">
        <Sidenav />
      </div>
      <div className="">
        <Main />
      </div>
      <div className="fixed">
        <SellersButton />
      </div>
    </div>
  );
}
