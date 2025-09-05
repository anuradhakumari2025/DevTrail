import { useData } from "../../context/DataContext";
import "./Navbar.css";

const Navbar = ({ mobileOpen, setMobileOpen }) => {
  const { user } = useData();
  // console.log(user)
  return (
    <div className="navbar">
      {/* Left - Title */}
      <h2 className="navbar-title">Dashboard</h2>

      <div className="navMenu" onClick={() => setMobileOpen(!mobileOpen)}>
        <i className="ri-menu-2-line"></i>
      </div>

      <div className="navDesktop">
        {/* Middle - Search */}
        <div className="navbar-search">
          <i className="ri-search-line search-icon"></i>
          <input type="text" placeholder="Search here..." />
        </div>

        {/* Right - Icons + Profile */}
        <div className="navbar-right">
          <div className="icon">
            <i className="ri-notification-2-line"></i>
          </div>
          <div className="icon">
            <i className="ri-settings-4-line"></i>
          </div>
          <div className="profile">
            <div className="profile-pic icon">
              <img src={user?.avatarUrl} alt="" className="user" />
              {/* <i className="ri-user-line "></i> */}
            </div>
            <p>{user?.name}</p>
            <i className="ri-arrow-drop-down-line"></i>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
