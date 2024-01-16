import { React, useEffect, useRef, useState } from "react";
import loginstyle from "../styles/loginstyles.module.css";
import { EMAIL_REGEX, PWD_REGEX, baseUrl } from "../constants/consts";
import { google__icon } from "../constants/svgfiles";
import { apiCall } from "../../utilities";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEye,
  faEyeSlash,
  faInfoCircle,
} from "@fortawesome/free-solid-svg-icons";

export default function SignupForm({ onToggleForm, onSuccess, onError }) {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const [matchPwd, setMatchPwd] = useState("");

  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };

  const [validEmail, setvalidEmail] = useState(false);
  const [emailFocus, setEmailFocus] = useState(false);
  const [validPwd, setValidPwd] = useState(false);
  const [pwdFocus, setPwdFocus] = useState(false);
  const [validMatch, setValidMatch] = useState(false);
  const [matchFocus, setMatchFocus] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const inputRef = useRef();
  const handleInputClick = () => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  const handleShowLoginForm = () => {
    onToggleForm();
  };

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSignupSubmit = async (e) => {
    e.preventDefault();
    const sendUserData = {
      email: user.email,
      password: user.password,
    };
    console.log(sendUserData);
    const endpoint = "/signup.php";
    const API = `${baseUrl}${endpoint}`;
    apiCall(
      API,
      sendUserData,
      onSuccess,
      onError
    ); /* 'http://localhost/signup.php'; */
  };

  useEffect(() => {
    const result = EMAIL_REGEX.test(user.email);
    console.log(user.email);
    setvalidEmail(result);
    console.log(result);
  }, [user.email]);

  useEffect(() => {
    const result = PWD_REGEX.test(user.password);
    console.log(user.password);
    console.log(result);
    setValidPwd(result);
    const match = user.password === matchPwd;
    console.log(matchPwd);
    setValidMatch(match);
    console.log(match);
  }, [user.password, matchPwd]);

  return (
    <div
      className="flex flex-col justify-center my-5 "
      direction="column"
      justifyContent="center"
      alignItems="center"
      marginTop={5}
      marginBottom={5}
    >
      <h1 className={loginstyle.form__title}>Create an account</h1>

      <form onSubmit={handleSignupSubmit}>
        <div marginBottom={3}>
          <label htmlFor="email" className={loginstyle.input__label}>
            Email*
          </label>

          <input
            type="email"
            name="email"
            id="email"
            className={`${loginstyle.email__input} 
                                  ${
                                    user.email && validEmail
                                      ? loginstyle.valid__input
                                      : user.email && !validEmail
                                      ? loginstyle.invalid__input
                                      : ""
                                  }  `}
            ref={inputRef}
            onClick={handleInputClick}
            autoComplete="off"
            placeholder="Insert email"
            onChange={handleChange}
            value={user.email}
            required
            onFocus={() => setEmailFocus(true)}
            onBlur={() => setEmailFocus(false)}
            aria-invalid={validEmail ? "false" : "true"}
            aria-describedby="email-error"
          />

          <p
            id="email-error"
            className={
              emailFocus && user && !validEmail
                ? loginstyle.error__message
                : loginstyle.offscreen
            }
          >
            <WarningMessage type="email-error" />
          </p>
        </div>

        <div className="mb-3">
          <label htmlFor="password" className={loginstyle.input__label}>
            Password*
          </label>
          <div>
            <div className={loginstyle.password__wrapper}>
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                name="password"
                className={`${loginstyle.password__input}  
                                          ${
                                            user.password && validPwd
                                              ? loginstyle.valid__input
                                              : user.password && !validPwd
                                              ? loginstyle.invalid__input
                                              : ""
                                          }`}
                required
                placeholder="Enter your password"
                onChange={handleChange}
                value={user.password}
                aria-invalid={validPwd ? "false" : "true"}
                aria-describedby="pwdnote"
                onFocus={() => setPwdFocus(true)}
                onBlur={() => setPwdFocus(false)}
              />
              <EyeIcon
                showPassword={showPassword}
                handleTogglePassword={handleTogglePassword}
              />
            </div>

            <p
              id="pwdnote"
              className={
                pwdFocus && user && !validPwd
                  ? loginstyle.error__message
                  : loginstyle.offscreen
              }
            >
              <WarningMessage type="pwdnote" />
            </p>
          </div>
        </div>

        <div className="mb-4">
          <label htmlFor="confirm_pwd" className={loginstyle.input__label}>
            Confirm Password*
          </label>
          <div className={loginstyle.password__wrapper}>
            <input
              type={showPassword ? "text" : "password"}
              id="confirm_pwd"
              name="confirm_pwd"
              className={`${loginstyle.password__input}  
                          ${
                            matchPwd && validMatch
                              ? loginstyle.valid__input
                              : matchPwd && !validMatch
                              ? loginstyle.invalid__input
                              : ""
                          }`}
              required
              placeholder="Confirm your password"
              onChange={(e) => setMatchPwd(e.target.value)}
              value={matchPwd}
              aria-invalid={validMatch ? "false" : "true"}
              aria-describedby="confirmPwd"
              onFocus={() => setMatchFocus(true)}
              onBlur={() => setMatchFocus(false)}
            />
            <EyeIcon
              showPassword={showPassword}
              handleTogglePassword={handleTogglePassword}
            />
          </div>

          <p
            id="confirmPwd"
            className={
              matchFocus && user && !validMatch
                ? loginstyle.error__message
                : loginstyle.offscreen
            }
          >
            <WarningMessage type="confirmPwd" />
          </p>
        </div>

        <div className="flex flex-col">
          <button
            disabled={!validEmail || !validPwd || !validMatch ? true : false}
            type="submit"
            className={loginstyle.submitBtn__signup}
            id={loginstyle.btn1}
            name="signup"
          >
            <p> CREATE YOUR ACCOUNT </p>
          </button>

          <button
            type="submit"
            className={loginstyle.submitBtn__signup}
            id={loginstyle.btn2}
            name="signupGoogle"
          >
            <div className={loginstyle.goog__icon}>{google__icon}</div>
            <p>Continue with Google </p>
          </button>

          <button
            type="submit"
            className={loginstyle.submitBtn__signup}
            id={loginstyle.btn2}
            name="signupFacebook"
          >
            <img src={require("../images/fb_icon.png")} alt="fb icon" />
            <p>Continue with Facebook</p>
          </button>

          <p className={loginstyle.noaccount}>
            Already Have An Account?{" "}
            <a href="#" onClick={handleShowLoginForm}>
              {" "}
              Login
            </a>
          </p>
        </div>
      </form>
    </div>
  );
}

function EyeIcon({ showPassword, handleTogglePassword }) {
  return (
    <FontAwesomeIcon
      className={loginstyle.eye__icon}
      icon={showPassword ? faEye : faEyeSlash}
      onClick={handleTogglePassword}
    />
  );
}

function WarningMessage({ type }) {
  let warningMessage;

  switch (type) {
    case "email-error":
      warningMessage = "Please insert a valid email address";
      break;
    case "pwdnote":
      warningMessage =
        "Password should be a minimum of eight characters, at least one letter, and one number";
      break;
    case "confirmPwd":
      warningMessage = "Must match the first password input field.";
      break;
    default:
      warningMessage = "Unknown warning";
      break;
  }

  return (
    <div>
      <FontAwesomeIcon icon={faInfoCircle} />
      <span> </span>
      {warningMessage}
    </div>
  );
}
