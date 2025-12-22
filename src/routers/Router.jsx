import React from "react";
import { createBrowserRouter } from "react-router";
import MainLayout from "../layouts/MainLayout";
import Home from "../pages/home/Home.jsx";
import AllIssues from "../pages/all-issues/AllIssues";
import ReportIssue from "../pages/dashboard/citizen/ReportIssue.jsx";
import AboutUs from "../pages/about-us/AboutUs";
import Login from "../pages/authentication/login/Login";
import Register from "../pages/authentication/register/Register";
import AuthLayout from "../layouts/AuthLayout.jsx";
import DashboardLayout from "../layouts/DashboardLayout.jsx";
import PrivateRoute from "./PrivateRoute.jsx";
import MyIssues from "../pages/dashboard/citizen/MyIssues.jsx";
import IssueDetails from "../pages/issue-details/IssueDetails.jsx";
import CitizenProfile from "../pages/dashboard/citizen/CitizenProfile.jsx";
import CitizenDashboard from "../pages/dashboard/citizen/CitizenDashboard.jsx";
import ManageStaff from "../pages/dashboard/admin/ManageStaff.jsx";
import AddStaff from "../pages/dashboard/admin/AddStaff.jsx";
import ManageUsers from "../pages/dashboard/admin/ManageUsers.jsx";
import Payments from "../pages/dashboard/admin/Payments.jsx";
import AdminProfile from "../pages/dashboard/admin/AdminProfile.jsx";
import AdminIssues from "../pages/dashboard/admin/AdminIssues.jsx";
import AdminDashboard from "../pages/dashboard/admin/AdminDashboard.jsx";
import StaffDashboard from "../pages/dashboard/staff/StaffDashboard.jsx";
import StaffProfile from "../pages/dashboard/staff/StaffProfile.jsx";
import AssignedIssues from "../pages/dashboard/staff/AssignedIssues.jsx";

const Router = createBrowserRouter([
  {
    path: "/",
    Component: MainLayout,
    children: [
      {
        index: true,
        Component: Home,
      },
      {
        path: "/all-issues",
        Component: AllIssues,
      },
      {
        path: "/about-us",
        Component: AboutUs,
      },
      {
        path: "/issue-details",
        element: (
          <PrivateRoute>
            <IssueDetails></IssueDetails>
          </PrivateRoute>
        ),
      },
    ],
  },
  {
    path: "/auth",
    Component: AuthLayout,
    children: [
      {
        path: "/auth/login",
        Component: Login,
      },
      {
        path: "/auth/register",
        Component: Register,
      },
    ],
  },
  {
    path: "/dashboard",
    element: <DashboardLayout></DashboardLayout>,
    children: [
      {
        path: "/dashboard/citizen",
        element: (
          <PrivateRoute>
            <CitizenDashboard></CitizenDashboard>
          </PrivateRoute>
        ),
      },
      {
        path: "/dashboard/staff",
        element: (
          <PrivateRoute>
            <StaffDashboard></StaffDashboard>
          </PrivateRoute>
        ),
      },
      {
        path: "/dashboard/staff/profile",
        element: (
          <PrivateRoute>
            <StaffProfile></StaffProfile>
          </PrivateRoute>
        ),
      },
      {
        path: "/dashboard/staff/assigned-issues",
        element: (
          <PrivateRoute>
            <AssignedIssues></AssignedIssues>
          </PrivateRoute>
        ),
      },
      {
        path: "/dashboard/admin",
        element: (
          <PrivateRoute>
            <AdminDashboard></AdminDashboard>
          </PrivateRoute>
        ),
      },
      {
        path: "/dashboard/admin/profile",
        element: (
          <PrivateRoute>
            <AdminProfile></AdminProfile>
          </PrivateRoute>
        ),
      },
      {
        path: "/dashboard/admin/all-issues",
        element: (
          <PrivateRoute>
            <AdminIssues></AdminIssues>
          </PrivateRoute>
        ),
      },
      {
        path: "/dashboard/admin/payments",
        element: (
          <PrivateRoute>
            <Payments></Payments>
          </PrivateRoute>
        ),
      },
      {
        path: "/dashboard/admin/manage-users",
        element: (
          <PrivateRoute>
            <ManageUsers></ManageUsers>
          </PrivateRoute>
        ),
      },
      {
        path: "/dashboard/admin/manage-staffs",
        element: (
          <PrivateRoute>
            <ManageStaff></ManageStaff>
          </PrivateRoute>
        ),
      },
      {
        path: "/dashboard/admin/add-staff",
        element: (
          <PrivateRoute>
            <AddStaff></AddStaff>
          </PrivateRoute>
        ),
      },
      {
        path: "/dashboard/citizen/report-issue",
        element: (
          <PrivateRoute>
            <ReportIssue></ReportIssue>
          </PrivateRoute>
        ),
      },
      {
        path: "/dashboard/citizen/my-issues",
        element: (
          <PrivateRoute>
            <MyIssues></MyIssues>
          </PrivateRoute>
        ),
      },
      {
        path: "/dashboard/citizen/profile",
        element: (
          <PrivateRoute>
            <CitizenProfile></CitizenProfile>
          </PrivateRoute>
        ),
      },
    ],
  },
]);

export default Router;
