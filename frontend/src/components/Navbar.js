import React from "react";
import { NavLink } from "react-router-dom";

const Navbar = () => (
  <nav>
    <NavLink to="/profile">Profile</NavLink> |
    <NavLink to="/generate">Generate</NavLink> |
    <NavLink to="/upload">Upload</NavLink> |
    <NavLink to="/history">History</NavLink>
  </nav>
);

export default Navbar;
