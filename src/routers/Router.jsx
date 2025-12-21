import React from "react";
import { createBrowserRouter } from "react-router";
import MainLayout from "../layouts/MainLayout";
import Home from "../pages/home/Home.jsx";
import AllIssues from "../pages/all-issues/AllIssues";
import ReportIssue from "../pages/report-issue/ReportIssue";
import AboutUs from "../pages/about-us/AboutUs";
import Login from "../pages/authentication/login/Login";
import Register from "../pages/authentication/register/Register";
import AuthLayout from "../layouts/AuthLayout.jsx";
import DashboardLayout from "../layouts/DashboardLayout.jsx";
import PrivateRoute from "./PrivateRoute.jsx";

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
        path: "/dashboard/report-issue",
        element: (
          <PrivateRoute>
            <ReportIssue></ReportIssue>
          </PrivateRoute>
        ),
      },
    ],
  },
]);

export default Router;
