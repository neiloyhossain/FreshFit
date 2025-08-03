import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { setUserData } from "../utils/auth";
import "./ProfilePage.css";

const RegisterPage = () => {
  const [message, setMessage] = useState("");
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    reset
  } = useForm({
    mode: "onChange" // Enable real-time validation
  });

  const password = watch("password");

  const onSubmit = async (data) => {
    setMessage("");
    setSuccess(false);

    const res = await fetch("/api/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ 
        firstName: data.firstName, 
        lastName: data.lastName, 
        username: data.username, 
        password: data.password 
      }),
    });
    const responseData = await res.json();
    if (res.ok) {
      // Store both username and user ID after successful registration
      setUserData(data.username, responseData.userId);
      setMessage("Registration successful! Redirecting to login...");
      setSuccess(true);
      reset();
      setTimeout(() => navigate("/login"), 1500);
    } else {
      setMessage(responseData.error || (responseData.errors && responseData.errors[0].msg));
    }
  };

  return (
    <div className="profile-bg">
      <div className="profile-card" style={{ maxWidth: 400, margin: "auto" }}>
        <h2 className="profile-title">Create Your Account</h2>
        {message && (
          <div style={{ color: success ? "green" : "red", marginBottom: "1rem" }}>{message}</div>
        )}
        <form onSubmit={handleSubmit(onSubmit)} style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
          <div style={{ display: "flex", gap: "0.5rem" }}>
            <div style={{ flex: 1 }}>
              <input
                className={`login-input ${errors.firstName ? 'error' : ''}`}
                placeholder="First Name"
                {...register("firstName", { 
                  required: "First name is required",
                  minLength: { value: 2, message: "First name must be at least 2 characters" }
                })}
                style={{ marginBottom: 0 }}
              />
              {errors.firstName && (
                <div style={{ color: "red", fontSize: "0.75rem", marginTop: "0.25rem" }}>
                  {errors.firstName.message}
                </div>
              )}
            </div>
            <div style={{ flex: 1 }}>
              <input
                className={`login-input ${errors.lastName ? 'error' : ''}`}
                placeholder="Last Name"
                {...register("lastName", { 
                  required: "Last name is required",
                  minLength: { value: 2, message: "Last name must be at least 2 characters" }
                })}
                style={{ marginBottom: 0 }}
              />
              {errors.lastName && (
                <div style={{ color: "red", fontSize: "0.75rem", marginTop: "0.25rem" }}>
                  {errors.lastName.message}
                </div>
              )}
            </div>
          </div>
          
          <div>
            <input
              className={`login-input ${errors.username ? 'error' : ''}`}
              placeholder="Username"
              {...register("username", { 
                required: "Username is required",
                minLength: { value: 3, message: "Username must be at least 3 characters" },
                pattern: { 
                  value: /^[a-zA-Z0-9_]+$/, 
                  message: "Username can only contain letters, numbers, and underscores" 
                }
              })}
              style={{ marginBottom: 0 }}
            />
            {errors.username && (
              <div style={{ color: "red", fontSize: "0.75rem", marginTop: "0.25rem" }}>
                {errors.username.message}
              </div>
            )}
          </div>

          <div>
            <input
              className={`login-input ${errors.password ? 'error' : ''}`}
              placeholder="Password"
              type="password"
              {...register("password", { 
                required: "Password is required",
                minLength: { value: 6, message: "Password must be at least 6 characters" },
                pattern: { 
                  value: /^(?=.*[A-Z])(?=.*\d)/, 
                  message: "Password must contain at least one capital letter and one number" 
                }
              })}
              style={{ marginBottom: 0 }}
            />
            {errors.password && (
              <div style={{ color: "red", fontSize: "0.75rem", marginTop: "0.25rem" }}>
                {errors.password.message}
              </div>
            )}
          </div>

          <div>
            <input
              className={`login-input ${errors.confirmPassword ? 'error' : ''}`}
              placeholder="Confirm Password"
              type="password"
              {...register("confirmPassword", { 
                required: "Please confirm your password",
                validate: value => value === password || "Passwords do not match"
              })}
              style={{ marginBottom: 0 }}
            />
            {errors.confirmPassword && (
              <div style={{ color: "red", fontSize: "0.75rem", marginTop: "0.25rem" }}>
                {errors.confirmPassword.message}
              </div>
            )}
          </div>

          <div style={{ fontSize: "0.8rem", color: "#666", textAlign: "left", marginTop: "0.5rem" }}>
            Password must contain:
            <ul style={{ margin: "0.5rem 0", paddingLeft: "1.5rem" }}>
              <li>At least 6 characters</li>
              <li>At least one capital letter (A-Z)</li>
              <li>At least one number (0-9)</li>
            </ul>
          </div>

          <button className="login-btn" type="submit" style={{ marginTop: "1rem" }}>
            Register
          </button>
        </form>
        <div style={{ marginTop: "1rem" }}>
          Already have an account?{' '}
          <span
            style={{ color: "#38b2ac", cursor: "pointer", textDecoration: "underline" }}
            onClick={() => navigate("/login")}
          >
            Login
          </span>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage; 