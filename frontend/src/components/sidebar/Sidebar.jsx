import { useState } from "react";
import { NavLink } from "react-router-dom";
import "./Sidebar.css";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Mobile toggle button */}
      <div className="sidebar-toggle" onClick={() => setIsOpen(!isOpen)}>
        <i className="ri-menu-2-line"></i>
      </div>

      <aside className={`sidebar ${isOpen ? "open" : ""}`}>
        <h2 className="logo">DevTrail</h2>
        <nav>
          <NavLink to="/dashboard" className="nav-link">
            <div>
              <i className="ri-dashboard-horizontal-line"></i>
              <p>Dashboard</p>
            </div>
          </NavLink>
          <NavLink to="/journal" className="nav-link">
            <div>
              <i className="ri-book-open-line"></i> <p> Journal</p>
            </div>
          </NavLink>
          <NavLink to="/settings" className="nav-link">
            <div>
              <i className="ri-settings-4-line"></i>
              <p>Settings</p>
            </div>
          </NavLink>
        </nav>
      </aside>
    </>
  );
};

export default Sidebar;
