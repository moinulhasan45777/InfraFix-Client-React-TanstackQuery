import React, { useState } from "react";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";

const AdminIssues = () => {
  const axiosSecure = useAxiosSecure();
  const { data: issues = [], refetch: refetchIssues } = useQuery({
    queryKey: ["allIssues"],
    queryFn: async () => {
      const res = await axiosSecure.get(`/issues`);
      return res.data;
    },
  });
  const { data: staffs = [] } = useQuery({
    queryKey: ["allStaffs"],
    queryFn: async () => {
      const res = await axiosSecure.get(`/staffs`);
      return res.data;
    },
  });
  const [selectedIssue, setSelectedIssue] = useState(null);
  const handleAssignStaff = async (email) => {
    const assigned = {
      assignedStaff: email,
    };
    await axiosSecure
      .patch(`/assign-staff/${selectedIssue._id}`, assigned)
      .then(() => {
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Staff Assigned!",
          showConfirmButton: false,
          timer: 1500,
        });
        document.getElementById("my_modal_1").close();
        refetchIssues();
      });
  };

  const handleRejection = async (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Proceed!",
    }).then(async (result) => {
      const newStatus = {
        status: "Rejected",
      };
      await axiosSecure.patch(`/reject-issue/${id}`, newStatus).then(() => {
        if (result.isConfirmed) {
          Swal.fire({
            title: "Rejected!",
            text: "Issue has been Rejected!",
            icon: "success",
          });
        }
        refetchIssues();
      });
    });
  };

  return (
    <div className="p-4 md:p-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-semibold text-gray-800">All Issues</h1>
          <p className="text-sm text-gray-500">View and manage Issues</p>
        </div>
      </div>

      {/* Desktop Table */}
      <div className="hidden md:block bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <table className="min-w-full">
          <thead className="bg-gray-50 border-b text-sm text-gray-600">
            <tr>
              <th className="px-6 py-4 text-left font-medium">Title</th>
              <th className="px-6 py-4 text-left font-medium">Category</th>
              <th className="px-6 py-4 text-left font-medium">Status</th>
              <th className="px-6 py-4 text-left font-medium">Priority</th>
              <th className="px-6 py-4 text-left font-medium">
                Assigned Staff
              </th>
              <th className="px-6 py-4 text-left font-medium">Action</th>
            </tr>
          </thead>

          <tbody className="divide-y text-sm text-gray-700">
            {issues.map((issue) => (
              <tr key={issue._id} className="hover:bg-gray-50 transition">
                <td className="px-6 py-4 font-medium">{issue.title}</td>
                <td className="px-6 py-4">{issue.category}</td>
                <td className="px-6 py-4">{issue.status}</td>
                <td className="px-6 py-4">{issue.priority}</td>
                <td className="px-6 py-4">
                  {issue.assignedStaff == "no" ? (
                    <div className="flex justify-center gap-2">
                      <button
                        onClick={() => {
                          setSelectedIssue(issue);
                          document.getElementById("my_modal_1").showModal();
                        }}
                        className="btn btn-sm btn-outline btn-info flex items-center gap-1"
                      >
                        Assign Staff
                      </button>
                    </div>
                  ) : (
                    issue.assignedStaff
                  )}
                </td>
                <td className="px-6 py-4">
                  {issue.status == "Pending" ? (
                    <button
                      onClick={() => {
                        handleRejection(issue._id);
                      }}
                      className="btn bg-red btn-sm btn-outline btn-error flex items-center gap-1"
                    >
                      Reject Issue
                    </button>
                  ) : (
                    issue.status
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {/* --------------------------------------------------MODAL------------------------------------------------------------------- */}
      <dialog id="my_modal_1" className="modal">
        <div className="modal-box bg-white w-full max-w-5xl p-4 md:p-6">
          {/* Table wrapper for horizontal scroll */}
          <div className="overflow-x-auto">
            <h2 className="text-3xl font-bold mb-10">Staff List</h2>
            <table className="min-w-full bg-white">
              <thead className="bg-gray-50 border-b text-sm text-gray-600">
                <tr>
                  <th className="px-4 py-3 text-left font-medium">Name</th>
                  <th className="px-4 py-3 text-left font-medium">Email</th>
                  <th className="px-4 py-3 text-center font-medium">Action</th>
                </tr>
              </thead>

              <tbody className="divide-y text-sm text-gray-700">
                {staffs.map((staff) => (
                  <tr key={staff._id} className="hover:bg-gray-50 transition">
                    <td className="px-4 py-3 font-medium whitespace-nowrap">
                      {staff.name}
                    </td>
                    <td className="px-4 py-3 break-all">{staff.email}</td>
                    <td className="px-4 py-3 text-center">
                      <button
                        onClick={() => handleAssignStaff(staff.email)}
                        className="btn btn-xs sm:btn-sm btn-outline btn-info"
                      >
                        Assign
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Footer */}
          <div className="mt-4 flex justify-end">
            <button
              type="button"
              className="btn btn-ghost btn-sm bg-base-300"
              onClick={() => document.getElementById("my_modal_1").close()}
            >
              Cancel
            </button>
          </div>
        </div>
      </dialog>
    </div>
  );
};

export default AdminIssues;
