import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { setUserData } from "../utils/auth";
import "./LoginPage.css";

const LoginPage = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    console.log("LoginPage: Attempting login for username:", username);
    
    const res = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    });
    const data = await res.json();
    console.log("LoginPage: Backend response:", data);
    console.log("LoginPage: Response status:", res.status);
    
    if (res.ok) {
      console.log("LoginPage: Login successful, userId from response:", data.userId);
      // Store both username and user ID
      setUserData(username, data.userId);
      console.log("LoginPage: Stored user data, navigating to profile");
      navigate("/profile");
    } else {
      console.log("LoginPage: Login failed:", data.error);
      setError(data.error || (data.errors && data.errors[0].msg));
    }
  };

  return (
    <div className="login-bg">
      <div className="login-card">
        <h2 className="login-title">Login</h2>
        {error && <div style={{ color: "red", marginBottom: "1rem" }}>{error}</div>}
        <form onSubmit={handleLogin}>
          <input
            className="login-input"
            placeholder="Username"
            value={username}
            onChange={e => setUsername(e.target.value)}
            required
          />
          <input
            className="login-input"
            placeholder="Password"
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
          />
          <button className="login-btn" type="submit">
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
