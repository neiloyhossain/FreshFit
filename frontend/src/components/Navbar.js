import React, { useState, useRef, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { logout, getCurrentUser } from "../utils/auth";
import ProfileImage from "./ProfileImage";
import "./components.css";

const Navbar = () => {
  const navigate = useNavigate();
  const { username } = getCurrentUser();
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleSignOut = () => {
    logout();
    navigate("/");
  };

  const handleProfileClick = () => {
    setShowDropdown(!showDropdown);
  };

  const handleMenuItemClick = (path) => {
    setShowDropdown(false);
    navigate(path);
  };

  return (
    <nav className="navbar">
      <div className="nav-links">
        <NavLink to="/generate">Generate</NavLink>
        <NavLink to="/upload">Upload</NavLink>
        <NavLink to="/history">History</NavLink>
        <NavLink to="/wardrobe">Wardrobe</NavLink>
      </div>
      <div className="nav-user-section" ref={dropdownRef}>
        <div className="user-info" onClick={handleProfileClick}>
          <ProfileImage size={32} className="small" />
          <span className="username">{username}</span>
          <i className={`fas fa-chevron-down dropdown-arrow ${showDropdown ? 'rotated' : ''}`}></i>
        </div>
        
        {showDropdown && (
          <div className="profile-dropdown">
            <div className="dropdown-header">
              <span className="dropdown-username">{username}</span>
            </div>
            <div className="dropdown-menu">
              <button 
                className="dropdown-item"
                onClick={() => handleMenuItemClick('/profile')}
              >
                <i className="fas fa-user"></i>
                Edit Profile
              </button>
              <button 
                className="dropdown-item"
                onClick={() => handleMenuItemClick('/account-settings')}
              >
                <i className="fas fa-cog"></i>
                Account Settings
              </button>
              <div className="dropdown-divider"></div>
              <button 
                className="dropdown-item sign-out"
                onClick={handleSignOut}
              >
                <i className="fas fa-sign-out-alt"></i>
                Sign Out
              </button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
