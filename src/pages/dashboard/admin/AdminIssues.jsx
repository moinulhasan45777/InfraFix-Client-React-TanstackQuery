import React, { useState } from "react";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import useTitle from "../../../hooks/useTitle";

const AdminIssues = () => {
  useTitle("All Issues");
  const axiosSecure = useAxiosSecure();
  const [selectedIssue, setSelectedIssue] = useState(null);

  const { data: issues = [], refetch: refetchIssues } = useQuery({
    queryKey: ["allIssues"],
    queryFn: async () => {
      const res = await axiosSecure.get("/issues");
      return res.data;
    },
  });

  const { data: staffs = [] } = useQuery({
    queryKey: ["allStaffs"],
    queryFn: async () => {
      const res = await axiosSecure.get("/staffs");
      return res.data;
    },
  });

  const handleAssignStaff = async (email) => {
    await axiosSecure.patch(`/assign-staff/${selectedIssue._id}`, {
      assignedStaff: email,
    });

    Swal.fire({
      icon: "success",
      title: "Staff Assigned!",
      timer: 1500,
      showConfirmButton: false,
    });

    document.getElementById("my_modal_1").close();
    refetchIssues();
  };

  const handleRejection = async (id) => {
    Swal.fire({
      title: "Are you sure?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, Reject",
    }).then(async (result) => {
      if (result.isConfirmed) {
        await axiosSecure.patch(`/reject-issue/${id}`, {
          status: "Rejected",
        });

        Swal.fire("Rejected!", "Issue has been rejected.", "success");
        refetchIssues();
      }
    });
  };

  return (
    <div className="p-4 md:p-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-semibold text-gray-800">All Issues</h1>
        <p className="text-sm text-gray-500">View and manage issues</p>
      </div>

      {/* ================= DESKTOP TABLE ================= */}
      <div className="hidden md:block bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <table className="min-w-full">
          <thead className="bg-gray-50 border-b text-sm text-gray-600">
            <tr>
              <th className="px-6 py-4 text-left">Title</th>
              <th className="px-6 py-4 text-left">Category</th>
              <th className="px-6 py-4 text-left">Status</th>
              <th className="px-6 py-4 text-left">Priority</th>
              <th className="px-6 py-4 text-left">Assigned Staff</th>
              <th className="px-6 py-4 text-left">Action</th>
            </tr>
          </thead>

          <tbody className="divide-y text-sm">
            {issues.map((issue) => (
              <tr key={issue._id} className="hover:bg-gray-50">
                <td className="px-6 py-4 font-medium">{issue.title}</td>
                <td className="px-6 py-4">{issue.category}</td>
                <td className="px-6 py-4">{issue.status}</td>
                <td className="px-6 py-4">{issue.priority}</td>
                <td className="px-6 py-4">
                  {issue.assignedStaff === "no" ? (
                    <button
                      className="btn btn-sm btn-outline btn-info"
                      onClick={() => {
                        setSelectedIssue(issue);
                        document.getElementById("my_modal_1").showModal();
                      }}
                    >
                      Assign Staff
                    </button>
                  ) : (
                    issue.assignedStaff
                  )}
                </td>
                <td className="px-6 py-4">
                  {issue.status === "Pending" ? (
                    <button
                      className="btn btn-sm btn-outline btn-error"
                      onClick={() => handleRejection(issue._id)}
                    >
                      Reject
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

      {/* ================= MOBILE CARDS ================= */}
      <div className="md:hidden space-y-4">
        {issues
          .slice()
          .sort((a, b) => {
            const order = { High: 0, Normal: 1 };
            return order[a.priority] - order[b.priority];
          })
          .map((issue) => (
            <div
              key={issue._id}
              className="bg-white border rounded-xl shadow-sm p-4 space-y-2"
            >
              <div>
                <h3 className="font-semibold text-gray-800">{issue.title}</h3>
                <p className="text-xs text-gray-500">{issue.category}</p>
              </div>

              <div className="flex justify-between text-sm">
                <span>Status:</span>
                <span className="font-medium">{issue.status}</span>
              </div>

              <div className="flex justify-between text-sm">
                <span>Priority:</span>
                <span className="font-medium">{issue.priority}</span>
              </div>

              <div className="flex justify-between text-sm">
                <span>Assigned:</span>
                <span className="font-medium">
                  {issue.assignedStaff === "no"
                    ? "Not Assigned"
                    : issue.assignedStaff}
                </span>
              </div>

              <div className="pt-3 flex gap-2">
                {issue.assignedStaff === "no" && (
                  <button
                    className="btn btn-xs btn-outline btn-info flex-1"
                    onClick={() => {
                      setSelectedIssue(issue);
                      document.getElementById("my_modal_1").showModal();
                    }}
                  >
                    Assign
                  </button>
                )}

                {issue.status === "Pending" && (
                  <button
                    className="btn btn-xs btn-outline btn-error flex-1"
                    onClick={() => handleRejection(issue._id)}
                  >
                    Reject
                  </button>
                )}
              </div>
            </div>
          ))}
      </div>

      {/* ================= MODAL ================= */}
      <dialog id="my_modal_1" className="modal">
        <div className="modal-box max-w-4xl bg-white">
          <h2 className="text-xl font-semibold mb-4">Assign Staff</h2>

          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead className="bg-gray-50 text-sm">
                <tr>
                  <th className="px-4 py-2 text-left">Name</th>
                  <th className="px-4 py-2 text-left">Email</th>
                  <th className="px-4 py-2 text-center">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y text-sm">
                {staffs.map((staff) => (
                  <tr key={staff._id}>
                    <td className="px-4 py-2">{staff.name}</td>
                    <td className="px-4 py-2 break-all">{staff.email}</td>
                    <td className="px-4 py-2 text-center">
                      <button
                        className="btn btn-xs btn-outline btn-info"
                        onClick={() => handleAssignStaff(staff.email)}
                      >
                        Assign
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-4 text-right">
            <button
              className="btn btn-sm"
              onClick={() => document.getElementById("my_modal_1").close()}
            >
              Close
            </button>
          </div>
        </div>
      </dialog>
    </div>
  );
};

export default AdminIssues;
