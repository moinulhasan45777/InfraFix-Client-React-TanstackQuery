import React from "react";
import { Link, NavLink } from "react-router";
import logo from "../assets/Logo.png";

const Navbar = () => {
  const links = (
    <>
      <li>
        <NavLink to="/" className="rounded-none">
          Home
        </NavLink>
      </li>
      <li>
        <NavLink to="/all-issues">All Issues</NavLink>
      </li>
      <li>
        <NavLink to="/report-issue">Report Issue</NavLink>
      </li>
      <li>
        <NavLink to="/about-us">About us</NavLink>
      </li>
    </>
  );
  return (
    <div className="mb-5 navbar bg-primary text-black shadow-sm rounded-xl px-5">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {" "}
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />{" "}
            </svg>
          </div>
          <ul
            tabIndex="-1"
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow font-bold"
          >
            {links}
          </ul>
        </div>
        <Link to="/">
          <img src={logo} alt="InfraFix Logo" className="w-30"></img>
        </Link>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1 font-bold text-base">
          {links}
        </ul>
      </div>
      <div className="navbar-end">
        <Link
          to="/auth/login"
          className="btn btn-secondary rounded px-8 py-5 text-base"
        >
          Login
        </Link>
      </div>
    </div>
  );
};

export default Navbar;
