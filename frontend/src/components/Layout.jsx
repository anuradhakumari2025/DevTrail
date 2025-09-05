import { Route, Routes } from "react-router-dom";
import Dashboard from "../pages/Dashboard/Dashboard";
import Sidebar from "./sidebar/Sidebar";
import Navbar from "./navbar/Navbar";
import Journal from "../pages/journal/Journal";

function Layout() {
  return (
    <>
      <Sidebar />
      <Navbar/>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/journal" element={<Journal />} />
        </Routes>
    </>
  );
}

export default Layout