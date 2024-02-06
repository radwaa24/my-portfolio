import React from "react";
import { Link } from "react-router-dom";
import todo from "./assets/todo.mp4";
import bittrust from "./assets/bittrust.mp4";
import littlelemon from "./assets/little-lemon.mp4";
import meits from "./assets/meits.mp4";
import caveo from "./assets/caveo.mp4";
import topNbuy from "./assets/topNbuy.mp4";

const Projects = () => {
  return (
    <>
      <body className="bg-gradient-to-b from-red-200 to-red-50 grid py-10">
        <div className="text-center mt-6">
          <Link
            to="/"
            className="
     bg-red-50 text-gray-700 hover:bg-gradient-to-t from-gray-100 to-red-300 
      p-2 rounded-md font-medium"
          >
            Home
          </Link>
          <Link
            to="/certificates"
            className=" mx-2
     bg-red-50 text-gray-700 hover:bg-gradient-to-t from-gray-100 to-red-300 
      p-2 rounded-md font-medium"
          >
            Certificates
          </Link>
          <Link
            to="/contactMe"
            className="
     bg-red-50 text-gray-700 hover:bg-gradient-to-t from-gray-100 to-red-300 
      p-2 rounded-md font-medium"
          >
            Contact Me
          </Link>
        </div>

        {/* ///////////////////////////// */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mt-20 gap-8 max-w-7xl mx-auto px-5 text-sm">
          <div className="p-4 bg-red-100 hover:bg-red-50 text-center rounded-3xl">
            <video
              src={topNbuy}
              controls
              autoPlay
              muted
              loop
              playsInline
            ></video>
            <h1 className="font-bold font-serif text-slate-800 hover:font-mono py-3">
              Top & Buy
            </h1>
            <p className="font-serif text-slate-800">
              UI Transformation: Orchestrated a comprehensive revamp of the
              React project's user interface, Implemented strategic changes to
              the codebase, ensuring a more organized and maintainable
              structure, Identified and resolved conflicts among dependencies.
            </p>{" "}
          </div>
          {/* ////////////////////////////// */}
          <div className="p-4 bg-red-100 hover:bg-red-50 text-center rounded-3xl">
            <video src={caveo} controls autoPlay muted loop playsInline></video>
            <h1 className="font-bold font-serif text-slate-800 hover:font-mono py-3">
              Caveo
            </h1>
            <p className="font-serif text-slate-800">
              Led the overhaul of an outdated WordPress-based system,
              transitioning it to a modern stack comprising Vue.js and Tailwind
              CSS. adding new features and dynamic components that seamlessly
              interact with the backend through Laravel's API.
              <a href="https://caveo.app" target="_blank" rel="noreferrer">
                <i className="fa-solid fa-arrow-up-right-from-square ml-2 hover:text-lime-600"></i>
              </a>
            </p>{" "}
          </div>
          {/* //////////////////////////// */}
          <div className="p-4 bg-red-100 hover:bg-red-50 text-center rounded-3xl">
            <video src={meits} controls autoPlay></video>
            <h1 className="font-bold font-serif text-slate-800 hover:font-mono py-3">
              Meits Tech
            </h1>
            <p className="font-serif text-slate-800">
              Converted an existing WordPress project to a dynamic Vue.js
              application to introduce enhanced interactivity and address
              server-related issues. This transition enabled the integration of
              dynamic features resolving performance challenges.
              <a href="https://meitstech.com/" target="_blank" rel="noreferrer">
                <i className="fa-solid fa-arrow-up-right-from-square ml-2 hover:text-blue-600"></i>
              </a>
            </p>
          </div>
          {/* ///////////////////////////////// */}
          <div className="p-4 bg-red-100 hover:bg-red-50 text-center rounded-3xl">
            <video src={bittrust} controls autoPlay></video>
            <h1 className="font-bold font-serif text-slate-800 hover:font-mono py-3">
              Bittrust
            </h1>
            <p className="font-serif text-slate-800">
              Expanded the functionality of an existing system by incorporating
              three new pages Registration, Profile, and Transactions - using
              React for the frontend and pure CSS for styling. Seamlessly
              integrated with API’s.
            </p>
          </div>
          {/* ///////////////////////////////////// */}
          <div className="p-4 bg-red-100 hover:bg-red-50 text-center rounded-3xl">
            <video src={littlelemon} controls autoPlay></video>

            <h1 className="font-bold font-serif text-slate-800 hover:font-mono py-3">
              Little Lemon Resturant
            </h1>
            <p className="font-serif text-slate-800">
              {" "}
              Developed a React-based restaurant booking site, utilizing
              Material-UI components to ensure a polished and responsive user
              interface. The project adheres closely to UI designs from Figma,
              providing a seamless and visually appealing user experience.
              <a
                href="https://little-limon.vercel.app/"
                target="_blank"
                rel="noreferrer"
              >
                <i className="fa-solid fa-arrow-up-right-from-square ml-2 hover:text-lime-600"></i>
              </a>
            </p>
          </div>
          {/* ///////////////////////////////////// */}
          <div className="p-4 bg-red-100 hover:bg-red-50 text-center rounded-3xl">
            <video src={todo} controls autoPlay></video>
            <h1 className="font-bold font-serif text-slate-800 hover:font-mono py-3">
              {" "}
              TODO List APP{" "}
            </h1>
            <p className="font-serif text-slate-800">
              {" "}
              Created s simple react App to manage daily tasks by adding items
              to do and complete or remove them and also disply both .
              <a
                href="https://todobyradwa.vercel.app/"
                target="_blank"
                rel="noreferrer"
              >
                <i className="fa-solid fa-arrow-up-right-from-square ml-2 hover:text-lime-600"></i>
              </a>
            </p>
          </div>
        </div>
      </body>
    </>
  );
};

export default Projects;
