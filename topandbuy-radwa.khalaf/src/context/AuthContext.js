// AuthContext.js

import React, { createContext, useContext, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(true);
  const [authenticated, setAuthenticated] = useState(false);

  const login = () => {
    // your login logic here
  };

  const logout = () => {
    // your logout logic here
  };

  return (
    <AuthContext.Provider value={{ token, authenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

// this is the old code in case you want to use it again

// import React, { createContext, useContext, useState } from 'react';

// const AuthContext = createContext(undefined);

// export function useAuth() {
//   return useContext(AuthContext);
// }

// export  const AuthProvider =  ({ children }) => {
//   const [token, setToken] = useState(123);
//   const [authenticated, setAuthenticated] = useState(true);
//   const [ renderCreatepost, setRenderCreatepost ] = useState(false);

//  const value = {
//       token,
//       setToken,
//       authenticated,
//       setAuthenticated ,
//       setRenderCreatepost,
//     };

//   return (
//     <AuthContext.Provider value={value}>
//       {children}
//     </AuthContext.Provider>
//   );
// };
