import React from "react";
import useAuth from "../hooks/useAuth";
import Loading from "../components/Loading";
import { Navigate, useLocation } from "react-router";

const PrivateRoute = ({ children }) => {
  const { user, loading } = useAuth();
  const location = useLocation();
  if (loading) {
    return <Loading></Loading>;
  } else if (!user) {
    return <Navigate to="/auth/login" state={location.pathname}></Navigate>;
  }
  return children;
};

export default PrivateRoute;
