import { React,  useState } from "react";

import loginstyle from "../styles/loginstyles.module.css";
import LoginForm  from "./loginForm";
import SignupForm from "./signupForm"; 
import { ForgotPwdPopup, InterestsPopup, PopupTopcontainer} from "../popup";
import { useAuth } from "../../context/AuthContext";
import { reloadPage, displayError } from "../../utilities";
import LoginSuccessPopup from "../popup/loginsuccesspopup";


/* 
TODO: 
1. Authenticate the user with the backend
2. LoginSuccessPopup
3.Login with google and Facebook
4. clean the code
*/

export default function LoginRegisterContainer({onClose}) { 
    const { token, setToken, setAuthenticated } = useAuth();
    const [showLogin, setShowLogin] = useState(true);
    const [showForgotPwd, setShowForgotPwd] = useState(false);
    const [showInterestsPopup, setShowInterestsPopup] = useState(false);
    const [errorMessage, setErrorMsg] = useState('');
    const [loginSuccess, setLoginSuccess] = useState(false);
    
    const handleForgotPassword = () => {
        setShowForgotPwd(true);
    }

    const handleToggleForm = () => {
        setShowLogin(!showLogin);
        setErrorMsg('');
    }

    const handleClose = () => {
        onClose();
        setErrorMsg(''); 
      };

    const onError = (message) => {
        setErrorMsg(message);
    }

    const onLoginSuccess = ({data}) => {
        setLoginSuccess(true);
        setErrorMsg('');
        setAuthenticated(true);
        setToken(data.session_token);
        localStorage.setItem('token', data.session_token);
        localStorage.setItem('userData', JSON.stringify(data));
        localStorage.setItem('authenticated', true);
        handleClose();
         /* TODO: make a login success popup */
    }


   const onSignupSuccess = ({data}) => {
        setErrorMsg('');
        setAuthenticated(true);
        setToken(data.session_token);
        localStorage.setItem('token', data.session_token);
        localStorage.setItem('userData', JSON.stringify(data));
        localStorage.setItem('authenticated', true);
        handleClose();
        setShowInterestsPopup(true);
    } 

    const renderLogin = () => {
        setShowForgotPwd(false);
        setShowLogin(true);
        setErrorMsg('');
    }


    const renderComponent = () => {
        switch(true && !token){
            case showForgotPwd:
                return(
                    <LoginRegisterContainer onClose={true} /> ,
                    <ForgotPwdPopup show={handleForgotPassword} onClose={handleClose} goBack={renderLogin} />
                );
            case showInterestsPopup:
                return(
                    <>
                        <LoginRegisterContainer onClose={true} /> ,
                        <InterestsPopup onClose={reloadPage} />
                    </>
                );
            
            default:
                return (
                    <>
                        <div className={loginstyle.popupContainer}>
                        <PopupTopcontainer handleClose={handleClose} />
                        {showLogin ? (
                            <>                         
                            <LoginForm 
                            onToggleForm={handleToggleForm}
                            onSuccess={onLoginSuccess}
                            onError={onError}
                            handleForgotPassword={handleForgotPassword}
                            /> 
                        </>
                        ) : (
                            <SignupForm
                            onToggleForm={handleToggleForm}
                            onSuccess={onSignupSuccess}
                            onError={onError}
                            />
                        )}
                        
                    
                        {errorMessage && displayError(errorMessage)}
                        </div>
                     </>
                  
                );
            }

    };
            
    /* return <>{renderComponent()}</>; */
    return(
        <>
        {
            loginSuccess ? (
                <LoginSuccessPopup open={loginSuccess} onClose={handleClose} />
            ) : (
                renderComponent() )
        }
        
        </>

    )



 }