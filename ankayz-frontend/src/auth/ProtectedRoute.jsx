import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "./AuthProvider";

export default function ProtectedRoute({ children, requiredRole }) {
  const { user, loading } = useAuth();

  if (loading) return <div>Loading...</div>; // Wait for auth check

  if (!user) return <Navigate to="/auth" replace />;

  if (requiredRole && user.role !== requiredRole) {
    return <Navigate to="/book" replace />;
  }

  return children;
}
