import { useEffect, useState } from "react";
import { useData } from "../../context/DataContext";
import { useLocation } from "react-router";
import "./Navbar.css";
import axios from "axios";

const Navbar = ({ mobileOpen, setMobileOpen }) => {
  const { user, backendUrl, setEntries } = useData();
  const [search, setSearch] = useState("");
  
  const location = useLocation();
  let title = "Dashboard";
  if (location.pathname.includes("journal")) title = "Journal";
  if (location.pathname.includes("settings")) title = "Settings";
    if (location.pathname.includes("community")) title = "Community";


  const params = new URLSearchParams();
  if (search) params.append("search", search);
  const fetchJournals = async () => {
    try {
      const res = await axios.get(
        `${backendUrl}/journals/get?${params.toString()}`
      );
      setEntries(res.data.journals);
    } catch (err) {
      // handle error
      console.error("Error fetching journals:", err);
    }
  };
  useEffect(() => {
    fetchJournals();
    // eslint-disable-next-line
  }, [search]);
  return (
    <div className="navbar">
      {/* Left - Title */}
      <h2 className="navbar-title">{title}</h2>

      <div className="navMenu" onClick={() => setMobileOpen(!mobileOpen)}>
        <i className="ri-menu-2-line"></i>
      </div>

      <div className="navDesktop">
        {/* Middle - Search */}
        <div className="navbar-search">
          <i className="ri-search-line search-icon"></i>
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search here..."
          />
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
