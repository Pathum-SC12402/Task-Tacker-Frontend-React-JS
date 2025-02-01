import React from "react";
import { Link, useLocation } from "react-router-dom";
import "./Sidebar.css";

const Sidebar = () => {
  const location = useLocation(); // Hook to get the current route

  return (
    <div className="sidebar">
      <ul className="menu">
        <li>
          <Link
            to="/content/dashboard"
            className={location.pathname === "/dashborad" ? "active" : ""}
          >
            Dashboard
          </Link>
        </li>
        <li>
          <Link
            to="/content/today-plans"
            className={location.pathname === "/today-plans" ? "active" : ""}
          >
            Today Plans
          </Link>
        </li>
        <li>
          <Link
            to="/content/past-plans"
            className={location.pathname === "/past-plans" ? "active" : ""}
          >
            Past Plans
          </Link>
        </li>
        <li>
          <Link
            to="/content/future-plans"
            className={location.pathname === "/future-plans" ? "active" : ""}
          >
            Future Plans
          </Link>
        </li>
      </ul>
      <div className="bottom-menu">
        <ul>
          <li>
            <Link
              to="/content/settings"
              className={location.pathname === "/settings" ? "active" : ""}
            >
              Settings
            </Link>
          </li>
          <li>
            <Link
              to="/"
              className={location.pathname === "/logout" ? "active" : ""}
            >
              Log Out
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
