import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import Storage from "../../utils/Storage";

const RequireAuth = ({ children }: { children: JSX.Element }) => {
  const hasToken = Storage.get("token");
  const location = useLocation();

  if (!hasToken) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }
  return children;
};

export default RequireAuth;
