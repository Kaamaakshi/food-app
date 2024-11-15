// src/contexts/AuthContext.js

import React, { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser) {
      setUser(storedUser); // Set user from localStorage if available
    }
  }, []);

  const login = (userData) => {
    localStorage.setItem("user", JSON.stringify(userData)); // Save user to localStorage
    setUser(userData); // Set user in context
  };

  const logout = () => {
    localStorage.removeItem("user"); // Remove user from localStorage
    setUser(null); // Reset user in context
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
