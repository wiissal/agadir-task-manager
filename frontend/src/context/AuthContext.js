import React, { createContext, useState } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userToken, setUserToken] = useState(null);

  const login = (token) => {
    setUserToken(token);
    setIsLoggedIn(true);
  };

  const logout = () => {
    setUserToken(null);
    setIsLoggedIn(false);
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, userToken, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};