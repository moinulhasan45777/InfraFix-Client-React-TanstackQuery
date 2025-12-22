import { useQuery } from "@tanstack/react-query";
import React, { useEffect, useRef, useState } from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useAuth from "../../../hooks/useAuth";
import Swal from "sweetalert2";

const AssignedIssues = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const [statusFilter, setStatusFilter] = useState("");
  const [priorityFilter, setPriorityFilter] = useState("");

  const [openDropdown, setOpenDropdown] = useState(null);
  const [dropdownPos, setDropdownPos] = useState({ top: 0, left: 0 });

  const dropdownRef = useRef(null);

  const { data: issues = [], refetch } = useQuery({
    queryKey: ["assignedIssues"],
    queryFn: async () => {
      const res = await axiosSecure.get("/issues");
      return res.data;
    },
  });

  const statuses = [
    "Pending",
    "In-Progress",
    "Working",
    "Resolved",
    "Closed",
    "Rejected",
  ];

  const priorities = ["Normal", "High"];

  const filteredIssues = issues.filter(
    (issue) =>
      issue.assignedStaff === user?.email &&
      (statusFilter ? issue.status === statusFilter : true) &&
      (priorityFilter ? issue.priority === priorityFilter : true)
  );

  // ================= Open dropdown =================
  const handleOpenDropdown = (e, issueId) => {
    const rect = e.currentTarget.getBoundingClientRect();

    setDropdownPos({
      top: rect.bottom + 6,
      left: rect.left,
    });

    setOpenDropdown(issueId);
  };

  // ================= Change status =================
  const handleStatusChange = async (issueId, newStatus) => {
    await axiosSecure
      .patch(`/update-status/${issueId}`, { status: newStatus })
      .then(() => {
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Status Updated",
          showConfirmButton: false,
          timer: 1500,
        });
        refetch();
      });
    setOpenDropdown(null);
  };

  // ================= Close on outside click =================
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setOpenDropdown(null);
      }
    };

    if (openDropdown) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [openDropdown]);

  return (
    <div className="p-4 md:p-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-semibold text-gray-800">
            Assigned Issues
          </h1>
          <p className="text-sm text-gray-500">
            Issues assigned to you for action
          </p>
        </div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-3">
          <select
            className="select select-bordered w-full sm:w-48"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="">All Status</option>
            {statuses.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>

          <select
            className="select select-bordered w-full sm:w-40"
            value={priorityFilter}
            onChange={(e) => setPriorityFilter(e.target.value)}
          >
            <option value="">All Priority</option>
            {priorities.map((p) => (
              <option key={p} value={p}>
                {p}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Desktop Table */}
      <div className="hidden md:block bg-white rounded-xl shadow-sm border border-gray-200">
        <table className="min-w-full">
          <thead className="bg-gray-50 border-b text-sm text-gray-600">
            <tr>
              <th className="px-6 py-4 text-left">Title</th>
              <th className="px-6 py-4 text-left">Created By</th>
              <th className="px-6 py-4 text-left">Status</th>
              <th className="px-6 py-4 text-left">Priority</th>
              <th className="px-6 py-4 text-left">Action</th>
            </tr>
          </thead>

          <tbody className="divide-y text-sm text-gray-700">
            {filteredIssues.map((issue) => (
              <tr key={issue._id} className="hover:bg-gray-50">
                <td className="px-6 py-4 font-medium">{issue.title}</td>
                <td className="px-6 py-4">{issue.createdBy}</td>
                <td className="px-6 py-4">
                  <span className="px-3 py-1 rounded-full text-xs bg-blue-100 text-blue-700">
                    {issue.status}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <span
                    className={`px-3 py-1 rounded-full text-xs ${
                      issue.priority === "High"
                        ? "bg-red-100 text-red-700"
                        : "bg-green-100 text-green-700"
                    }`}
                  >
                    {issue.priority}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <button
                    onClick={(e) => handleOpenDropdown(e, issue._id)}
                    className="btn btn-sm btn-outline btn-accent"
                  >
                    Change Status
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* ================= Floating Dropdown ================= */}
      {openDropdown && (
        <div
          ref={dropdownRef}
          style={{
            position: "fixed",
            top: dropdownPos.top,
            left: dropdownPos.left,
            zIndex: 9999,
          }}
          className="w-44 bg-white border border-gray-200 rounded-lg shadow-lg"
        >
          {statuses
            .filter(
              (s) =>
                s !== filteredIssues.find((i) => i._id === openDropdown)?.status
            )
            .map((status) => (
              <button
                key={status}
                onClick={() => handleStatusChange(openDropdown, status)}
                className="block w-full px-4 py-2 text-left text-sm hover:bg-gray-100"
              >
                {status}
              </button>
            ))}
        </div>
      )}
    </div>
  );
};

export default AssignedIssues;
