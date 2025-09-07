import { useData } from "../context/DataContext";
import { Navigate } from "react-router-dom";

function PrivateRoute({ children }) {
  const { user, loading } = useData();
  if (loading) {
    return (
      <div className="loader">
        <div className="loadElem">
          <i className="ri-loader-4-line"></i>
        </div>
      </div>
    );
  }
  return user ? children : <Navigate to="/login" />;
}

export default PrivateRoute;
