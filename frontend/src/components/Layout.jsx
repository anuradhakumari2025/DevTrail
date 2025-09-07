import { Route, Routes } from "react-router-dom";
import Dashboard from "../pages/Dashboard/Dashboard";
import Sidebar from "./sidebar/Sidebar";
import Navbar from "./navbar/Navbar";
import Journal from "../pages/journal/Journal";
import { useState } from "react";
import Community from "../pages/community/Community";

const Layout = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  return (
    <div className="layout">
      <Sidebar mobileOpen={mobileOpen} setMobileOpen={setMobileOpen} />
      <div className="layoutChild">
        <Navbar mobileOpen={mobileOpen} setMobileOpen={setMobileOpen} />

        {/* Routes */}
        <Routes>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/journal" element={<Journal />} />
          <Route path="/community" element={<Community/>}/>
        </Routes>
      </div>
    </div>
  );
};

export default Layout;
