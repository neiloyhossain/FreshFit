import React, { useState, useEffect } from "react";
import "./AccountSettingsPage.css";

const AccountSettingsPage = () => {
  const [username, setUsername] = useState("");
  const [settings, setSettings] = useState({
    email: "",
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
    emailNotifications: true,
    outfitReminders: true
  });
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    const storedUsername = localStorage.getItem("username");
    if (storedUsername) {
      setUsername(storedUsername);
    }
  }, []);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setSettings(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handlePasswordChange = async (e) => {
    e.preventDefault();
    setError("");
    setMessage("");

    if (settings.newPassword !== settings.confirmPassword) {
      setError("New passwords don't match");
      return;
    }

    if (settings.newPassword.length < 6) {
      setError("New password must be at least 6 characters long");
      return;
    }

    try {
      const response = await fetch("/api/auth/change-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username,
          currentPassword: settings.currentPassword,
          newPassword: settings.newPassword
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage("Password changed successfully!");
        setSettings(prev => ({
          ...prev,
          currentPassword: "",
          newPassword: "",
          confirmPassword: ""
        }));
      } else {
        setError(data.error || "Failed to change password");
      }
    } catch (err) {
      setError("Network error. Please try again.");
    }
  };

  const handleSettingsSave = async (e) => {
    e.preventDefault();
    setError("");
    setMessage("");

    try {
      const response = await fetch("/api/user/settings", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username,
          email: settings.email,
          emailNotifications: settings.emailNotifications,
          outfitReminders: settings.outfitReminders
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage("Settings saved successfully!");
      } else {
        setError(data.error || "Failed to save settings");
      }
    } catch (err) {
      setError("Network error. Please try again.");
    }
  };

  return (
    <div className="account-settings-bg">
      <div className="account-settings-card">
        <h2 className="account-settings-title">Account Settings</h2>
        
        {message && <div className="success-message">{message}</div>}
        {error && <div className="error-message">{error}</div>}

        <div className="settings-section">
          <h3>Change Password</h3>
          <form onSubmit={handlePasswordChange} className="settings-form">
            <div className="form-group">
              <label htmlFor="currentPassword">Current Password</label>
              <input
                type="password"
                id="currentPassword"
                name="currentPassword"
                value={settings.currentPassword}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="newPassword">New Password</label>
              <input
                type="password"
                id="newPassword"
                name="newPassword"
                value={settings.newPassword}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="confirmPassword">Confirm New Password</label>
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                value={settings.confirmPassword}
                onChange={handleInputChange}
                required
              />
            </div>
            <button type="submit" className="btn-primary">
              Change Password
            </button>
          </form>
        </div>

        <div className="settings-section">
          <h3>Preferences</h3>
          <form onSubmit={handleSettingsSave} className="settings-form">
            <div className="form-group">
              <label htmlFor="email">Email Address</label>
              <input
                type="email"
                id="email"
                name="email"
                value={settings.email}
                onChange={handleInputChange}
                placeholder="Enter your email address"
              />
            </div>
            <div className="form-group checkbox-group">
              <label className="checkbox-label">
                <input
                  type="checkbox"
                  name="emailNotifications"
                  checked={settings.emailNotifications}
                  onChange={handleInputChange}
                />
                <span className="checkmark"></span>
                Email Notifications
              </label>
            </div>
            <div className="form-group checkbox-group">
              <label className="checkbox-label">
                <input
                  type="checkbox"
                  name="outfitReminders"
                  checked={settings.outfitReminders}
                  onChange={handleInputChange}
                />
                <span className="checkmark"></span>
                Outfit Reminders
              </label>
            </div>
            <button type="submit" className="btn-primary">
              Save Settings
            </button>
          </form>
        </div>

        <div className="settings-section">
          <h3>Account Information</h3>
          <div className="info-group">
            <label>Username</label>
            <span className="info-value">{username}</span>
          </div>
          <div className="info-group">
            <label>Member Since</label>
            <span className="info-value">January 2024</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccountSettingsPage; 