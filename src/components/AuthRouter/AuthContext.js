import React, { createContext, useContext, useEffect, useState } from "react";
import { Route, Navigate } from "react-router-dom";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [loggedIn, setLoggedIn] = useState(
    localStorage.getItem("psx_token") ? true : false
  );

  // useEffect(() => {
  //   if (localStorage.getItem("psx_token")) {
  //     // console.log("inside if", localStorage.getItem("psx_token"));
  //     setLoggedIn(true);
  //   }
  // }, []);

  const login = () => {
    setLoggedIn(true);
  };

  const logout = () => {
    setLoggedIn(false);
  };

  // console.log({ loggedIn });

  return (
    <AuthContext.Provider value={{ loggedIn, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

// export const ProtectedRoute = ({ element, ...rest }) => {
//   const { loggedIn } = useAuth();

//   return loggedIn ? (
//     <Route {...rest} element={element} />
//   ) : (
//     <Navigate to="/" replace />
//   );
// };
