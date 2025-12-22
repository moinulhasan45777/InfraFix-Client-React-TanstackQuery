import React from "react";
import { RiDashboardLine } from "react-icons/ri";
import { CgProfile } from "react-icons/cg";
import { MdMenuBook } from "react-icons/md";
import { MdReportProblem } from "react-icons/md";
import useAuth from "../hooks/useAuth";
import { Link, Outlet, useNavigate } from "react-router";
import useRole from "../hooks/useRole";
import { GrUserWorker } from "react-icons/gr";
import { FaUser } from "react-icons/fa";
import { MdOutlinePayment } from "react-icons/md";
import { FaHome } from "react-icons/fa";
import { IoIosLogOut } from "react-icons/io";
import Swal from "sweetalert2";
const DashboardLayout = () => {
  const { user, logOut } = useAuth();
  const { role } = useRole();
  const navigate = useNavigate();
  const handleLogout = () => {
    logOut().then(() => {
      Swal.fire({
        position: "center",
        icon: "success",
        title: "Logged out successfully!",
        showConfirmButton: false,
        timer: 1500,
      });
    });
    navigate("/");
  };
  return (
    <div className="drawer lg:drawer-open ">
      <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content">
        {/* Navbar */}
        <nav className="navbar w-full bg-primary">
          <label
            htmlFor="my-drawer-4"
            aria-label="open sidebar"
            className="btn btn-square btn-ghost"
          >
            {/* Sidebar toggle icon */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              strokeLinejoin="round"
              strokeLinecap="round"
              strokeWidth="2"
              fill="none"
              stroke="currentColor"
              className="my-1.5 inline-block size-4"
            >
              <path d="M4 4m0 2a2 2 0 0 1 2 -2h12a2 2 0 0 1 2 2v12a2 2 0 0 1 -2 2h-12a2 2 0 0 1 -2 -2z"></path>
              <path d="M9 4v16"></path>
              <path d="M14 10l2 2l-2 2"></path>
            </svg>
          </label>
          <div className="px-4">{user?.displayName}</div>
        </nav>
        {/* Page content here */}
        <div>
          <Outlet></Outlet>
        </div>
      </div>

      <div className="drawer-side is-drawer-close:overflow-visible">
        <label
          htmlFor="my-drawer-4"
          aria-label="close sidebar"
          className="drawer-overlay"
        ></label>
        <div className="flex min-h-full flex-col items-start bg-primary is-drawer-close:w-14 is-drawer-open:w-64">
          {/* Sidebar content here */}
          {role.role == "citizen" ? (
            <ul className="menu w-full grow">
              {/* List item */}
              <li>
                <Link
                  to="/"
                  className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                  data-tip="Home"
                >
                  {/* Dashboard icon */}
                  <FaHome className="text-xl" />
                  <span className="is-drawer-close:hidden">Home</span>
                </Link>
              </li>
              <li>
                <Link
                  to="/dashboard/citizen"
                  className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                  data-tip="Dashboard"
                >
                  {/* Dashboard icon */}
                  <RiDashboardLine className="text-xl" />
                  <span className="is-drawer-close:hidden">Dashboard</span>
                </Link>
              </li>

              {/* List item */}
              <li>
                <Link
                  to="/dashboard/citizen/profile"
                  className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                  data-tip="Profile"
                >
                  {/* Profile icon */}
                  <CgProfile className="text-xl" />
                  <span className="is-drawer-close:hidden">Profile</span>
                </Link>
              </li>
              {/* List item */}
              <li>
                <Link
                  to="/dashboard/citizen/my-issues"
                  className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                  data-tip="My Issues"
                >
                  {/* My Issues icon */}
                  <MdMenuBook className="text-xl" />
                  <span className="is-drawer-close:hidden">My Issues</span>
                </Link>
              </li>
              <li>
                <Link
                  to="/dashboard/citizen/report-issue"
                  className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                  data-tip="Report Issue"
                >
                  {/* My Issues icon */}
                  <MdReportProblem className="text-xl" />
                  <span className="is-drawer-close:hidden">Report Issue</span>
                </Link>
              </li>
            </ul>
          ) : role.role == "admin" ? (
            <ul className="menu w-full grow">
              <li>
                <Link
                  to="/"
                  className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                  data-tip="Home"
                >
                  {/* Dashboard icon */}
                  <FaHome className="text-xl" />
                  <span className="is-drawer-close:hidden">Home</span>
                </Link>
              </li>
              {/* List item */}
              <li>
                <Link
                  to="/dashboard/admin"
                  className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                  data-tip="Dashboard"
                >
                  {/* Dashboard icon */}
                  <RiDashboardLine className="text-xl" />
                  <span className="is-drawer-close:hidden">Dashboard</span>
                </Link>
              </li>

              {/* List item */}
              <li>
                <Link
                  to="/dashboard/admin/profile"
                  className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                  data-tip="Profile"
                >
                  {/* Profile icon */}
                  <CgProfile className="text-xl" />
                  <span className="is-drawer-close:hidden">Profile</span>
                </Link>
              </li>
              {/* List item */}
              <li>
                <Link
                  to="/dashboard/admin/all-issues"
                  className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                  data-tip="All Issues"
                >
                  {/* My Issues icon */}
                  <MdMenuBook className="text-xl" />
                  <span className="is-drawer-close:hidden">All Issues</span>
                </Link>
              </li>
              <li>
                <Link
                  to="/dashboard/admin/manage-staffs"
                  className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                  data-tip="Manage Staffs"
                >
                  {/* My Issues icon */}
                  <GrUserWorker className="text-xl" />
                  <span className="is-drawer-close:hidden">Manage Staffs</span>
                </Link>
              </li>
              <li>
                <Link
                  to="/dashboard/admin/manage-users"
                  className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                  data-tip="Manage Users"
                >
                  {/* My Issues icon */}
                  <FaUser className="text-xl" />
                  <span className="is-drawer-close:hidden">Manage Users</span>
                </Link>
              </li>
              <li>
                <Link
                  to="/dashboard/admin/payments"
                  className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                  data-tip="All Payments"
                >
                  {/* My Issues icon */}
                  <MdOutlinePayment className="text-xl" />
                  <span className="is-drawer-close:hidden">All Payments</span>
                </Link>
              </li>
            </ul>
          ) : (
            <ul className="menu w-full grow">
              <li>
                <Link
                  to="/"
                  className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                  data-tip="Home"
                >
                  {/* Dashboard icon */}
                  <FaHome className="text-xl" />
                  <span className="is-drawer-close:hidden">Home</span>
                </Link>
              </li>
              {/* List item */}
              <li>
                <Link
                  to="/dashboard/staff"
                  className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                  data-tip="Dashboard"
                >
                  {/* Dashboard icon */}
                  <RiDashboardLine className="text-xl" />
                  <span className="is-drawer-close:hidden">Dashboard</span>
                </Link>
              </li>

              {/* List item */}
              <li>
                <Link
                  to="/dashboard/staff/profile"
                  className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                  data-tip="Profile"
                >
                  {/* Profile icon */}
                  <CgProfile className="text-xl" />
                  <span className="is-drawer-close:hidden">Profile</span>
                </Link>
              </li>
              {/* List item */}
              <li>
                <Link
                  to="/dashboard/staff/assigned-issues"
                  className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                  data-tip="Assigned Issues"
                >
                  {/* My Issues icon */}
                  <MdMenuBook className="text-xl" />
                  <span className="is-drawer-close:hidden">
                    Assigned Issues
                  </span>
                </Link>
              </li>
            </ul>
          )}
          <button
            onClick={() => handleLogout()}
            to="/dashboard/staff/assigned-issues"
            className="is-drawer-close:tooltip is-drawer-close:tooltip-right flex items-center gap-4 cursor-pointer"
            data-tip="Log out"
          >
            {/* My Issues icon */}
            <IoIosLogOut className="text-xl ml-4 mb-4" />
            <span className="is-drawer-close:hidden -mt-4">Log out</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
