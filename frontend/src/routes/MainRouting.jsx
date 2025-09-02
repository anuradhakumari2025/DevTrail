import { Route, Routes } from "react-router-dom"
import Login from "../pages/Login/Login"
import PrivateRoute from "../components/PrivateRoute"
import Layout from "../components/Layout"

const MainRouting = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route
        path="/*"
        element={
          <PrivateRoute>
            <Layout />
          </PrivateRoute>
        }
      />
    </Routes>
  )
}

export default MainRouting