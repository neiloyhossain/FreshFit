import React from "react";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const navigate = useNavigate();

  const handleLogin = () => {
    navigate("/profile");
  };

  return (
    <div>
      <h2>Login</h2>
      <input placeholder="Username" />
      <br />
      <input placeholder="Password" type="password" />
      <br />
      <button onClick={handleLogin}>Login</button>
    </div>
  );
};

export default LoginPage;
