import React from "react";
import Navbar from "../components/Navbar";
import { Outlet } from "react-router";
import Footer from "../components/Footer";
import useAuth from "../hooks/useAuth";
import Loading from "../components/Loading";

const MainLayout = () => {
  const { loading } = useAuth();

  if (loading) {
    return <Loading></Loading>;
  }
  return (
    <div className="max-w-7xl mx-auto mt-5">
      <Navbar></Navbar>
      <div>
        <Outlet></Outlet>
      </div>
      <Footer></Footer>
    </div>
  );
};

export default MainLayout;
