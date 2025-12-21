import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { Link, useNavigate } from "react-router";
import Swal from "sweetalert2";

const MyIssues = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const axiosSecure = useAxiosSecure();
  const categories = [
    "Roads & Transportation",
    "Water & Sanitation",
    "Electricity & Power",
    "Waste Management",
    "Public Safety",
    "Environment & Public Spaces",
    "Construction & Building Safety",
    "Public Facilities",
    "Traffic & Signals",
    "Law & Civic Issues",
    "Health Hazards",
    "Other",
  ];
  const [selectedStatus, setSelectedStatus] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const statuses = ["Pending", "In Progress", "Resolved", "Closed"];

  const { data: issues = [], refetch } = useQuery({
    queryKey: ["myIssues", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/my-issues?email=${user.email}`);
      return res.data;
    },
  });

  const filteredIssues = issues.filter((issue) => {
    return (
      (selectedStatus ? issue.status === selectedStatus : true) &&
      (selectedCategory ? issue.category === selectedCategory : true)
    );
  });

  const handleDelete = (issue) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        await axiosSecure
          .delete(`/delete-issue/${issue._id}`)
          .then(() => {
            Swal.fire({
              title: "Deleted!",
              text: "Your file has been deleted.",
              icon: "success",
            });
            refetch();
          })
          .catch((err) => {
            Swal.fire({
              icon: "error",
              title: "Oops...",
              text: { err },
              footer: '<a href="#">Why do I have this issue?</a>',
            });
          });
      }
    });
  };

  return (
    <div className="p-4 md:p-6 max-w-7xl">
      {/* Page Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-semibold text-gray-800">My Issues</h1>
        <p className="text-sm text-gray-500">
          View and manage your reported public infrastructure issues
        </p>
      </div>

      {/* Filters */}
      <div className="bg-white p-4 rounded-lg shadow-sm mb-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Status Filter */}
          <div>
            <label className="block text-sm text-gray-600 mb-1">Status</label>
            <select
              defaultValue=""
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring"
            >
              <option value="">All Status</option>
              {statuses.map((status) => (
                <option key={status}>{status}</option>
              ))}
            </select>
          </div>

          {/* Category Filter */}
          <div>
            <label className="block text-sm text-gray-600 mb-1">Category</label>
            <select
              defaultValue=""
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring"
            >
              <option value="">All Categories</option>
              {categories.map((cat) => (
                <option key={cat}>{cat}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-lg shadow-sm overflow-x-auto">
        <table className="min-w-full border-collapse">
          <thead className="bg-gray-100 text-gray-700 text-sm">
            <tr>
              <th className="text-left px-4 py-3">Title</th>
              <th className="text-left px-4 py-3">Created At</th>
              <th className="text-left px-4 py-3">Status</th>
              <th className="text-center px-4 py-3">Actions</th>
            </tr>
          </thead>
          <tbody className="text-sm text-gray-700">
            {/* Row */}
            {filteredIssues.map((issue) => {
              return (
                <tr className="border-t hover:bg-gray-50 transition">
                  <td className="px-4 py-3 font-medium">{issue.title}</td>
                  <td className="px-4 py-3">
                    {new Date(issue.createdAt).toLocaleDateString("en-GB", {
                      day: "2-digit",
                      month: "short",
                      year: "numeric",
                    })}
                  </td>
                  <td className="px-4 py-3">
                    <span className="px-3 py-1 text-xs rounded-full bg-yellow-100 text-yellow-700">
                      {issue.status}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center justify-center gap-2 flex-wrap">
                      <button
                        onClick={() =>
                          navigate("/issue-details", { state: { issue } })
                        }
                        className="px-3 py-1 text-xs rounded-md bg-blue-100 text-blue-700 hover:bg-blue-200"
                      >
                        View
                      </button>
                      <button className="px-3 py-1 text-xs rounded-md bg-green-100 text-green-700 hover:bg-green-200">
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(issue)}
                        className="px-3 py-1 text-xs rounded-md bg-red-100 text-red-700 hover:bg-red-200"
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <dialog id="my_modal_1" className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg">Hello!</h3>
          <p className="py-4">
            Press ESC key or click the button below to close
          </p>
          <div className="modal-action">
            <form method="dialog">
              {/* if there is a button in form, it will close the modal */}
              <button className="btn">Close</button>
            </form>
          </div>
        </div>
      </dialog>
    </div>
  );
};

export default MyIssues;
