// src/AuthContext.js
import React, { createContext, useState } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [portfolioInfo, setPortfolioInfo] = useState(null);

  return (
    <AuthContext.Provider value={{ isAuthenticated, setIsAuthenticated, user, setUser, portfolioInfo, setPortfolioInfo }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
