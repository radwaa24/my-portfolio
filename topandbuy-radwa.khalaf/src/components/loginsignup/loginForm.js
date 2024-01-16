import { React, useEffect, useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import loginstyle from "../styles/loginstyles.module.css";
import { EMAIL_REGEX, baseUrl } from "../constants/consts";
import { apiCall } from "../../utilities";

export default function LoginForm({
  onToggleForm,
  onSuccess,
  onError,
  handleForgotPassword,
}) {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const [validEmail, setvalidEmail] = useState(false);
  const [validPwd, setvalidPwd] = useState(false);
  const [emailFocus, setEmailFocus] = useState(false);
  const [pwdFocus, setPwdFocus] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitDisabled, setIsSubmitDisabled] = useState(true);

  const inputRef = useRef();
  const handleFocusClick = () => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  const handleShowSignupForm = () => {
    onToggleForm();
  };

  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault(); //prevent default behavior : reload of page

    const sendUserData = {
      email: user.email,
      password: user.password,
    };
    console.log(sendUserData);
    const endpoint = "/login.php";
    const API = `${baseUrl}${endpoint}`; /* 'http://localhost/login.php'; */
    apiCall(API, sendUserData, onSuccess, onError);
  };

  useEffect(() => {
    const emailResult = EMAIL_REGEX.test(user.email);
    console.log(user.email);
    setvalidEmail(emailResult);
    console.log(emailResult);
  }, [user.email]);

  useEffect(() => {
    const pwdResult = user.password !== "";
    console.log(user.password);
    setvalidPwd(pwdResult);
    console.log(pwdResult);
  }, [user.password]);

  useEffect(() => {
    if (validEmail && validPwd) {
      setIsSubmitDisabled(false);
    }
  }, [user.email, user.password, validEmail, validPwd]);

  return (
    <div className="flex flex-col justify-center items-center mb-5 mt-5">
      <h1 className={loginstyle.form__title}>Login to your account</h1>
      <form onSubmit={handleLoginSubmit}>
        <div className="mb-3">
          <label htmlFor="email" className={loginstyle.input__label}>
            Email
          </label>
          <input
            type="email"
            name="email"
            id="email"
            ref={inputRef}
            onClick={handleFocusClick}
            className={`${loginstyle.email__input} ${
              emailFocus && user.email && validEmail
                ? loginstyle.valid__input
                : user.email && !validEmail
                ? loginstyle.invalid__input
                : ""
            }`}
            placeholder="Insert email"
            onChange={handleChange}
            value={user.email}
            required
            onFocus={() => setEmailFocus(true)}
          />
        </div>
        <div className="mb-3">
          <div className="flex items-center justify-between">
            <label htmlFor="password" className={loginstyle.input__label}>
              Password
            </label>
            <ForgotPassword handleForgotPassword={handleForgotPassword} />
          </div>
          <div className={loginstyle.password__wrapper}>
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              name="password"
              placeholder="Enter your password"
              className={`${loginstyle.password__input} ${
                pwdFocus && !user.password ? loginstyle.invalid__input : ""
              }`}
              required
              onChange={handleChange}
              value={user.password}
              onFocus={() => setPwdFocus(true)}
              onBlur={() => setPwdFocus(false)}
            />
            <EyeIcon
              showPassword={showPassword}
              handleTogglePassword={handleTogglePassword}
            />
          </div>
        </div>
        <button
          type="submit"
          name="signin"
          id={loginstyle.login__button}
          className={loginstyle.submitBtn}
          disabled={isSubmitDisabled}
        >
          <p>LOGIN NOW</p>
        </button>
        <p className={loginstyle.noaccount}>
          Don't Have an Account?{" "}
          <a href="#" onClick={handleShowSignupForm}>
            Sign Up
          </a>
        </p>
      </form>
    </div>
  );
}

function ForgotPassword({ handleForgotPassword }) {
  return (
    <a
      href="#"
      className={loginstyle.forgotPwdLink}
      onClick={handleForgotPassword}
    >
      Forgot ?
    </a>
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
