import { useData } from "../context/DataContext";
import {  Navigate } from "react-router-dom";

function PrivateRoute({ children }) {
  const { user,loading } = useData();
  if (loading) {
    return <div>Loading...</div>;
  }
  return user ? children : <Navigate to="/login" />;
}

export default PrivateRoute