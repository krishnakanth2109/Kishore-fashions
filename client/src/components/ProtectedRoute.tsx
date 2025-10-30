import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = () => {
  // ✅ FIXED: Changed from localStorage to sessionStorage
  // ✅ FIXED: Changed from "authToken" to "isLoggedIn"
  const isLoggedIn = sessionStorage.getItem("isLoggedIn");

  // If isLoggedIn exists and is "true", allow access to the nested routes (e.g., Admin page)
  // Otherwise, redirect to the login page
  return isLoggedIn === "true" ? <Outlet /> : <Navigate to="/login" replace />;
};

export default ProtectedRoute;