import React, { useState, useEffect } from "react";
import {
  Routes,
  Route,
  BrowserRouter,
  Navigate,
  Outlet,
} from "react-router-dom";
import "./index.css";
import { useAuth, AuthProvider } from "./context/AuthContext";
import { Homepage, HomepageAuth, Userpage, Createpost } from "./pages";
import {
  Settings,
  AccountSettings,
  BillingNPayments,
  PrivacyNSafety,
  Notifications,
  Accessibility,
} from "./pages/SettingsPage";
import { Navbar, RenderPopup, SellersList } from "./components";

function App() {
  const { token } = useAuth;
  const { authenticated } = useAuth;
  const [showLoginModal, setShowLoginModal] = useState(false);

  const handleCloseModal = () => {
    setShowLoginModal(false);
  };
  useEffect(() => {
    const token = useAuth;
    if (!token) {
      const timer = setTimeout(() => {
        setShowLoginModal(true);
      }, 5000);

      return () => clearTimeout(timer); // Clean up the timer to avoid memory leaks
    }
  }, []);

  return (
    <AuthProvider token={token}>
      <BrowserRouter>
        {showLoginModal && authenticated && (
          <RenderPopup component="login" handleClose={handleCloseModal} />
        )}

        <Routes>
          <Route path="/" element={<Layout />}>
            <Route
              path="/"
              element={
                authenticated ? (
                  <HomepageAuth userData={localStorage.getItem("userData")} />
                ) : (
                  <Homepage />
                )
              }
            />
            <Route path="newpost" element={<Createpost />} />

            <Route path="user" element={<Userpage />} />
            {/* <Route path='user/:id'  element={<Userpage/>}/> */}
            <Route path="settings" element={<Settings />}>
              <Route index element={<AccountSettings />} />
              <Route path="billingnpayments" element={<BillingNPayments />} />
              <Route path="notifications" element={<Notifications />} />
              <Route path="accessibility" element={<Accessibility />} />
              <Route path="privacynsafety" element={<PrivacyNSafety />} />
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}
export default App;

const Layout = () => {
  return (
    <>
      <div className="relative">
        <div className="fixed w-full z-10">
          <Navbar />
        </div>

        <div className=" pt-20 ">
          <Outlet />
        </div>
      </div>
    </>
  );
};

/* const ProtectedRoute = ({ token, children, showLoginModal, handleCloseModal}) => {

  return (
    <>
      { token || localStorage.getItem("token") ? (
        <>
         {children}
          
        </>
      ): (
        <>
       {showLoginModal &&
        <RenderPopup component="login" handleClose={handleCloseModal} />}
        <Navigate to="/" />
        </>
      )
      }
    </>
  )
} */
