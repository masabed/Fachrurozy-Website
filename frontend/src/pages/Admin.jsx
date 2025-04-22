import React, { useState } from "react";
import "../App.scss"; // ✅ Import global styles
import { FaUsers, FaNewspaper, FaBars } from "react-icons/fa";

export default function Admin() {
  const [activePage, setActivePage] = useState("dashboard"); // Track selected menu
  const [isOpen, setIsOpen] = useState(true); // Sidebar state

  const renderContent = () => {
    switch (activePage) {
      case "dashboard":
        return <h2>📊 Dashboard Content</h2>;
      case "user-management":
        return <h2>👥 User Management</h2>;
      case "article-management":
        return <h2>📰 Article Management</h2>;
      default:
        return <h2>Welcome to Admin Panel</h2>;
    }
  };

  return (
    <div className={`admin-container ${isOpen ? "sidebar-open" : "sidebar-closed"}`}>
      {/* ✅ Sidebar */}
      <div className="sidebar">
        <button className="menu-toggle" onClick={() => setIsOpen(!isOpen)}>
          <FaBars size={24} />
        </button>
        <div className="sidebar-content">
          <h5 className="sidebar-title">{isOpen ? "Admin Panel" : "AP"}</h5>
          <ul className="sidebar-menu">
            <li onClick={() => setActivePage("dashboard")}>
              <FaUsers className="icon" />
              {isOpen && <span>Dashboard</span>}
            </li>
            <li onClick={() => setActivePage("user-management")}>
              <FaUsers className="icon" />
              {isOpen && <span>User Management</span>}
            </li>
            <li onClick={() => setActivePage("article-management")}>
              <FaNewspaper className="icon" />
              {isOpen && <span>Article Management</span>}
            </li>
          </ul>
        </div>
      </div>

      {/* ✅ Main Content */}
      <div className="admin-content">{renderContent()}</div>
    </div>
  );
}
