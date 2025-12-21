import React from "react";
import { IoMdArrowRoundBack } from "react-icons/io";
import authBanner from "../assets/authBanner.png";
import logo from "../assets/Logo.png";
import { Link, Outlet } from "react-router";
const AuthLayout = () => {
  return (
    <div className="h-[calc(100vh-20px)] text-primary-content max-w-7xl mx-auto mt-5">
      <div className="fixed top-20 w-7xl">
        <IoMdArrowRoundBack className="w-10 h-10 " />
        <img src={logo} alt="Logo" className="mx-auto w-70" />
      </div>

      <div className="flex flex-row-reverse items-center justify-center gap-40 h-full">
        <div>
          <Outlet></Outlet>
        </div>
        <div>
          <img src={authBanner} alt="Banner Image" className="w-120" />
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
