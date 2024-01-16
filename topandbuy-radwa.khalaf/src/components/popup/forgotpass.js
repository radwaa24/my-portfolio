import { useState } from "react";
import { useNavigate } from "react-router-dom";
import forgotpwdstyles from "../styles/forgotpwdstyles.module.css";
import PopupTopcontainer from "./popuptopcontainer";
import { reloadPage, apiCall, displayError } from "../../utilities";
import { baseUrl } from "../constants/consts";

export default function ForgotPwdPopup({ onClose, goBack }) {
  const navigate = useNavigate();
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const setErr = (message) => {
    setError(message);
  };

  const handleSuccess = () => {
    setSuccess(true);
  };

  const handleNavigate = () => {
    onClose();
    navigate("/");
  };

  return (
    <div id={forgotpwdstyles.popup__container}>
      <PopupTopcontainer handleClose={handleNavigate} />
      <img
        src={require("../images/arrowBack.png")}
        className={forgotpwdstyles.arrowBack}
        onClick={goBack}
      />

      {error && displayError(error)}

      <>
        {success ? (
          (error && setError(""), // Clear the error message
          (<Success />))
        ) : (
          <ForgotPwdForm onSuccess={handleSuccess} onError={setErr} />
        )}
      </>
    </div>
  );
}

function ForgotPwdForm({ onSuccess, onError }) {
  const [email, setEmail] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault(); //prevent default behavior : reload of page

    const endpoint = "/forgotPass.php";
    const API = `${baseUrl}${endpoint}`;
    apiCall(
      API,
      email,
      onSuccess,
      onError
    ); /* 'http://localhost/signup.php'; */
  };

  return (
    <div className="p-6 ">
      <h1 className="text-3xl text-center font-bold">FORGOT YOUR PASSWORD?</h1>
      <p className="text-center">Enter the email address you used to login</p>

      <div className="mt-5">
        <form className="space-y-4">
          <label htmlFor="email" className="text-sm font-semibold">
            Email
          </label>
          <input
            type="email"
            name="email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            placeholder="Enter your email"
            className="border rounded p-2 w-full"
          />
          <button
            className="bg-blue-500 text-white rounded py-2 px-4 hover:bg-blue-600 focus:outline-none"
            type="submit"
            name="forgotpwd__submit"
            onClick={handleSubmit}
            disabled={email.trim() === ""}
          >
            Send
          </button>
        </form>
      </div>
    </div>
  );
}

function Success() {
  return (
    <div className={`${forgotpwdstyles.success} text-center`}>
      <h1 className="text-2xl mb-4">
        Message sent,
        <br /> please check your inbox
      </h1>

      <button
        className="text-white text-lg font-normal mt-3 px-4 py-2 bg-blue-500 hover:bg-blue-600 focus:outline-none"
        onClick={reloadPage}
      >
        Go back to Homepage
      </button>
    </div>
  );
}
