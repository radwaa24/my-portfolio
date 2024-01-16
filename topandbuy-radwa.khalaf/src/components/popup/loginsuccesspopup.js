import * as React from "react";

const LoginSuccessPopup = ({ open, onClose }) => {
  return (
    <div className={`fixed inset-0 ${open ? "block" : "hidden"}`}>
      <div className="flex items-center justify-center h-screen">
        <div className="bg-white p-6 rounded-lg">
          <h2 className="text-2xl font-bold mb-4">
            Welcome <span className="text-green-500">TopNBuyer</span>! You have
            successfully logged in!
          </h2>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            className="w-10 h-10 text-green-500 mb-4"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M5 13l4 4L19 7"
            />
          </svg>
          <button
            onClick={onClose}
            className="bg-blue-500 text-white rounded py-2 px-4 hover:bg-blue-600 focus:outline-none"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginSuccessPopup;
