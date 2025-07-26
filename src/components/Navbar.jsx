import React from "react";
import "./Navbar.css";

const Navbar = ({ onLogout }) => {
  return (
    <nav className="navbar">
      <div className="logo">Taskify</div>
      <div className="nav-right">
        <span className="user-avatar">👤</span>
        <button className="logout-btn" onClick={onLogout}>
          Logout
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
