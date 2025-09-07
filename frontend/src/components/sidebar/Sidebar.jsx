import { NavLink } from "react-router-dom";
import "./Sidebar.css";

const Sidebar = ({ mobileOpen, setMobileOpen }) => {
  return (
    <>
      <aside className={`sidebar ${mobileOpen ? "open" : ""}`}>
        <div className="sidebarHeader">
          <h2 className="logo">DevTrail</h2>
          <span onClick={() => setMobileOpen(!mobileOpen)}>
            <i className="ri-close-large-line"></i>
          </span>
        </div>
        <nav>
          <NavLink
            to="/dashboard"
            className="nav-link"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            <div>
              <i className="ri-dashboard-horizontal-line"></i>
              <p>Dashboard</p>
            </div>
          </NavLink>
          <NavLink
            to="/journal"
            className="nav-link"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            <div>
              <i className="ri-book-open-line"></i> <p> Journal</p>
            </div>
          </NavLink>
          <NavLink
            to="/settings"
            className="nav-link"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            <div>
              <i className="ri-settings-4-line"></i>
              <p>Settings</p>
            </div>
          </NavLink>
          <NavLink
            to="/community"
            className="nav-link"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            <div>
              <i className="ri-group-line"></i>
              <p>Community</p>
            </div>
          </NavLink>
        </nav>
      </aside>
    </>
  );
};

export default Sidebar;
