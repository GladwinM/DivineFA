import React from "react";
import { NavLink } from "react-router-dom";

const Sidebar = () => {
  return (
    <div
      style={{
        width: "200px",
        height: "90vh",
        background: "#991B21", 
        color: "#fff", 
        padding: "20px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "start",
        boxShadow: "4px 0 15px rgba(0,0,0,0.3)",
        borderRadius: "10px",
      }}
    >
      <h1 style={headerStyle}>Divine Admin</h1>
      <ul style={{ listStyleType: "none", padding: 0, margin: 0 }}>
        {navItems.map((item, index) => (
          <li key={index} style={linkStyle}>
            <NavLink
              to={item.path}
              style={({ isActive }) => navLinkStyle(isActive)}
            >
              {item.label}
            </NavLink>
            
          </li>
        ))}
      </ul>
    </div>
  );
};

const headerStyle = {
  color: "black",
  fontSize: "23px",
  marginBottom: "20px",
  textAlign: "center",
  backgroundColor: "#C5D3F9",
  borderRadius: "3px",
  fontFamily: "Arial, sans-serif",
  padding: "10px",
};

const linkStyle = {
  marginBottom: "10px", // Space between links
  transition: "transform 0.2s ease-in-out", // Smooth transform effect on hover
  
  fontFamily: "Arial, sans-serif",
};

const navLinkStyle = (isActive) => ({
  color: isActive ? "#00BFFF" : "#ccc", // Switching from cyan to deep sky blue for active link for better visibility
  textDecoration: "none",
  padding: "10px 15px", // Adjusted padding for better touch target size
  display: "block",
  borderRadius: "5px", // Rounded corners for aesthetic enhancement
  backgroundColor: isActive ? "rgba(255, 255, 255, 0.1)" : "transparent", // Subtle background highlight for active items
  transition: "all 0.3s ease", // Ensures smooth color and background transition
  cursor: "pointer", // Makes the whole area clickable
  fontWeight: isActive ? "bold" : "normal", // Bold for active items to stand out
});

const navItems = [
  { label: "User Master", path: "/users" },
  { label: "Banner Master", path: "/banners" },
  { label: "Calendar Master", path: "/calendars" },
  { label: "Q&A Master", path: "/qa" },
  { label: "Update Manager", path: "/updates" },
];

export default Sidebar;

