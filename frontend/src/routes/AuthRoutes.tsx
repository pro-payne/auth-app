import React from "react";
import { Navigate, Outlet } from "react-router-dom";

const AuthRoutes = () => {
  const loggedOut = localStorage.getItem("user") === null;

  return loggedOut ? <Outlet /> : <Navigate to="/home" replace />;
};

export default AuthRoutes;
