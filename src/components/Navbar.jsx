import React from "react";
import { Link, NavLink } from "react-router";
import logo from "../assets/Logo.png";
import useAuth from "../hooks/useAuth";
import Swal from "sweetalert2";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../hooks/useAxiosSecure";

const Navbar = () => {
  const { user, logOut } = useAuth();
  const axiosSecure = useAxiosSecure();
  const { data: users = [] } = useQuery({
    queryKey: ["allUsers"],
    queryFn: async () => {
      const res = await axiosSecure.get("/users");
      return res.data;
    },
  });
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
        <NavLink to="/about-us">About us</NavLink>
      </li>
      <li>
        <NavLink to="/contact-us">Contact us</NavLink>
      </li>
    </>
  );

  const handleLogOut = () => {
    logOut().then(() => {
      Swal.fire({
        position: "center",
        icon: "success",
        title: "Successfully Logged Out!",
        showConfirmButton: false,
        timer: 1500,
      });
    });
  };

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
        {user ? (
          <div className="dropdown dropdown-end">
            <div tabIndex={0} role="button" className="m-1">
              <img
                src={user.photoURL}
                alt="Profile Picture"
                className="w-12 h-12 rounded-full border-2 border-secondary cursor-pointer object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
            <ul
              tabIndex="-1"
              className="dropdown-content menu bg-base-100 rounded-box z-1 w-52 p-2 shadow-sm"
            >
              <li>
                <NavLink
                  to={`/dashboard/${
                    users.filter((u) => u.email == user.email)[0]?.role
                  }/profile`}
                >
                  {user.displayName}
                </NavLink>
              </li>
              <li>
                <NavLink
                  to={`/dashboard/${
                    users.filter((u) => u.email == user.email)[0]?.role
                  }`}
                >
                  Dashboard
                </NavLink>
              </li>
              <li>
                <button onClick={handleLogOut}>Logout</button>
              </li>
            </ul>
          </div>
        ) : (
          <Link
            to="/auth/login"
            className="btn btn-secondary rounded px-8 py-5 text-base"
          >
            Login
          </Link>
        )}
      </div>
    </div>
  );
};

export default Navbar;
