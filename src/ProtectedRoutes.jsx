import React from "react";
import { Navigate, Outlet } from "react-router-dom";

export const getTokenWithExpiry = () => {
  const AUTH_TOKEN = "token";

  const itemStr = localStorage.getItem(AUTH_TOKEN);
  // if the item doesn't exist, return null
  if (!itemStr) {
    return null;
  }

  return itemStr;
};

const PrivateRoute = () => {
  return getTokenWithExpiry() ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoute;
