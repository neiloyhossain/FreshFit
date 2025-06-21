import React from "react";
import { useNavigate } from "react-router-dom";

const LandingPage = () => {
  const navigate = useNavigate();
  return (
    <div>
      <h1>Welcome to FreshFit</h1>
      <button onClick={() => navigate("/login")}>Login</button>
    </div>
  );
};

export default LandingPage;
