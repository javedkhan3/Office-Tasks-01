import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const isLoggedIn = localStorage.getItem("loggedIn") === "true";

  console.log("loggedIn:", localStorage.getItem("loggedIn"));

  return isLoggedIn ? children : <Navigate to="/login" replace />;
};

export default ProtectedRoute;
