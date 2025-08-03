import React from "react";
import { Navigate } from "react-router-dom";
import "./components.css";

const ProtectedRoute = ({ children, isAuthenticated }) => {
  return isAuthenticated ? (
    children
  ) : (
    <div className="protected-route-message">
      <p>You must be logged in to view this page.</p>
      <Navigate to="/login" />
    </div>
  );
};

export default ProtectedRoute;
