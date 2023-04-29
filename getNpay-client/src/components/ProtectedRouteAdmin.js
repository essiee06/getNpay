import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRouteAdmin = ({ children }) => {
  let auth = true;
  if (!auth) {
    return <Navigate to="/login/admin" />;
  }
  return children;
};
export default ProtectedRouteAdmin;
