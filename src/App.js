// src/App.js

import React, { useContext } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthContext } from "./contexts/AuthContext"; // Import the context
import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Menu from "./pages/Menu";
import Pagenotfound from "./pages/Pagenotfound";
import OrderNowPage from "./pages/OrderNowPage";
import SignUp from "./pages/SignUp"; // SignUp page
import LogoutPage from "./pages/LogoutPage"; // Import the LogoutPage

function App() {
  const { user } = useContext(AuthContext); // Access user from context

  return (
    <BrowserRouter>
      <Routes>
        {/* If user is not logged in, show SignUp page at root path */}
        <Route
          path="/"
          element={!user ? <SignUp /> : <Navigate to="/home" />} // Show SignUp if not logged in
        />

        {/* Routes for authenticated users */}
        <Route
          path="/home"
          element={user ? <Home /> : <Navigate to="/login" />} // Only show Home if user is logged in
        />

        <Route
          path="/menu"
          element={user ? <Menu /> : <Navigate to="/login" />} // Only show Menu if user is logged in
        />
        <Route
          path="/order-now"
          element={user ? <OrderNowPage /> : <Navigate to="/login" />} // Only show OrderNowPage if user is logged in
        />

        {/* Routes for unauthenticated users */}

        {/* Logout route */}
        <Route path="/logout" element={<LogoutPage />} />

        {/* Static routes */}
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />

        {/* 404 route */}
        <Route path="*" element={<Pagenotfound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
