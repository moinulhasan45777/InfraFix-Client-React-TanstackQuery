import React from "react";
import { useLocation, useNavigate } from "react-router";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import Swal from "sweetalert2";

const IssueDetails = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const axiosSecure = useAxiosSecure();
  const { issue } = location.state || {};

  const formatDate = (dateStr) => {
    return new Date(dateStr).toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  // Status badge colors
  const statusColors = {
    Pending: "bg-yellow-100 text-yellow-700",
    "In Progress": "bg-blue-100 text-blue-700",
    Resolved: "bg-green-100 text-green-700",
    Closed: "bg-gray-100 text-gray-700",
  };
  // Priority badge colors (only Low and High)
  const priorityColors = {
    Low: "bg-green-100 text-green-700",
    High: "bg-red-100 text-red-700",
  };

  //   --------------------------------
  const handleDelete = () => {
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
            navigate("/dashboard/citizen/my-issues");
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
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-md rounded-lg space-y-6 mb-5">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2">
        <div>
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            {issue.title}
          </h1>
          <span
            className={`px-3 py-1 rounded-full text-sm ${
              statusColors[issue.status] || "bg-gray-100 text-gray-700"
            }`}
          >
            {issue.status}
          </span>
        </div>

        {/* Upvotes */}
        <div className="flex items-center gap-2 text-gray-700 text-sm font-medium">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 text-yellow-500"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path d="M2 10c0-1.105.895-2 2-2h2.293l.853-2.561A1 1 0 018 4h5a1 1 0 01.962 1.272l-1 4A1 1 0 0112 10H6.414l-.707 2H4a2 2 0 01-2-2z" />
          </svg>
          <span>{issue.upvoteCount || 0} Upvotes</span>
        </div>
      </div>

      {/* Created info */}
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center text-sm text-gray-500">
        <p>
          <strong>Created By:</strong> {issue.createdBy}
        </p>
        <p>
          <strong>Created At:</strong> {formatDate(issue.createdAt)}
        </p>
      </div>

      {/* Category, Location & Priority */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 items-center">
        <div>
          <h3 className="text-gray-600 font-medium mb-1">Category</h3>
          <p className="text-gray-800">{issue.category}</p>
        </div>
        <div>
          <h3 className="text-gray-600 font-medium mb-1">Location</h3>
          <p className="text-gray-800">{issue.location}</p>
        </div>
        <div className="flex items-center gap-2">
          <div>
            <h3 className="text-gray-600 font-medium mb-1">Priority</h3>
            <span
              className={`px-3 py-1 text-sm rounded-full ${
                priorityColors[issue.priority] || "bg-green-100 text-green-700"
              }`}
            >
              {issue.priority || "Low"}
            </span>
          </div>
          <button className="px-3 py-1 text-sm bg-purple-600 text-white rounded-md hover:bg-purple-700 transition mt-5 sm:mt-0">
            Boost Issue
          </button>
        </div>
      </div>

      {/* Description */}
      <div>
        <h3 className="text-gray-600 font-medium mb-1">Description</h3>
        <p className="text-gray-800">{issue.description}</p>
      </div>

      {/* Image */}
      {issue.image && (
        <div>
          <h3 className="text-gray-600 font-medium mb-2">Image</h3>
          <img
            src={issue.image}
            alt={issue.title}
            className="w-full max-h-96 object-cover rounded-lg shadow-sm"
          />
        </div>
      )}

      {/* Actions */}
      <div className="flex flex-wrap gap-2 mt-4">
        <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition">
          Edit
        </button>
        <button
          onClick={handleDelete}
          className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition"
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default IssueDetails;
