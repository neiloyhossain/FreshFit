import React from "react";
import { useNavigate } from "react-router-dom";
import "./LandingPage.css";

const LandingPage = () => {
  const navigate = useNavigate();
  return (
    <div className="landing-bg">
      <div className="landing-card">
        <h1 className="landing-title">Welcome to FreshFit</h1>
        <button className="landing-btn" onClick={() => navigate("/login")}>Login</button>
        <button className="landing-btn" style={{marginLeft: '1rem'}} onClick={() => navigate("/register")}>Register</button>
      </div>
    </div>
  );
};

export default LandingPage;
