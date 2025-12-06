import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AdminAuthContext } from "../context/AdminAuthContext";

export default function ProtectedRoute({ children }) {
  const { admin, loading } = useContext(AdminAuthContext);

  if (loading) return <div>Loading...</div>; // wait until localStorage is restored
  if (!admin) return <Navigate to="/admin-login" replace />;

  return children;
}
