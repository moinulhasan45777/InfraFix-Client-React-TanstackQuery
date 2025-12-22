import React from "react";
import { IoMdArrowRoundBack } from "react-icons/io";
import authBanner from "../assets/authBanner.png";
import logo from "../assets/Logo.png";
import { Link, Navigate, Outlet } from "react-router";
import useAuth from "../hooks/useAuth";
import Loading from "../components/Loading";
const AuthLayout = () => {
  const { user, loading } = useAuth();

  if (loading) {
    return <Loading></Loading>;
  }

  if (!loading && user) {
    return <Navigate to="/"></Navigate>;
  }
  return (
    <div className="text-primary-content max-w-7xl mx-auto mt-5">
      <div className=" w-7xl mb-20">
        <Link to="/">
          <IoMdArrowRoundBack className="w-10 h-10 cursor-pointer" />
        </Link>
      </div>

      <div className="flex flex-col lg:flex-row-reverse items-center justify-center gap-40 h-full">
        <div>
          <img src={logo} alt="Logo" className="mx-auto w-60 mb-10" />
          <Outlet></Outlet>
        </div>
        <div>
          <img
            src={authBanner}
            alt="Banner Image"
            className="w-120 hidden lg:block"
          />
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
