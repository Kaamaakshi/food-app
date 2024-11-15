// src/pages/LogoutPage.js

import React, { useContext, useEffect } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";

const LogoutPage = () => {
  const { logout } = useContext(AuthContext); // Access logout function from context
  const navigate = useNavigate(); // Access navigate function to redirect after logout

  useEffect(() => {
    // Perform the logout operation
    logout();
    navigate("/"); // Redirect to login page after logging out
  }, [logout, navigate]);

  return (
    <div>
      <h2>Logging out...</h2>
      <p>Please wait while we log you out.</p>
    </div>
  );
};

export default LogoutPage;
