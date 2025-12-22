import { useQuery } from "@tanstack/react-query";
import React from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { Link } from "react-router";
import Swal from "sweetalert2";
import useTitle from "../../../hooks/useTitle";

const ManageUsers = () => {
  useTitle("Manage Users");
  const axiosSecure = useAxiosSecure();
  const { data: citizens = [], refetch } = useQuery({
    queryKey: ["allUsers"],
    queryFn: async () => {
      const res = await axiosSecure.get("/citizens");
      return res.data;
    },
  });

  const handleBlock = (ct) => {
    const updated = {
      blocked: ct.blocked == "no" ? "yes" : "no",
    };

    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Proceed!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        await axiosSecure
          .patch(`/update-blocked/${ct._id}`, updated)
          .then(() => {
            Swal.fire({
              title: ct.blocked == "no" ? "Blocked!" : "Unblocked",
              icon: "success",
            });
            refetch();
          });
      }
    });
  };
  return (
    <div className="p-4 md:p-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-semibold text-gray-800">
            Manage Citizens
          </h1>
          <p className="text-sm text-gray-500">View and manage Citizens</p>
        </div>
      </div>

      {/* Desktop Table */}
      <div className="hidden md:block bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <table className="min-w-full">
          <thead className="bg-gray-50 border-b text-sm text-gray-600">
            <tr>
              <th className="px-6 py-4 text-left font-medium">Email</th>
              <th className="px-6 py-4 text-left font-medium">Status</th>
              <th className="px-6 py-4 text-center font-medium">Actions</th>
            </tr>
          </thead>

          <tbody className="divide-y text-sm text-gray-700">
            {citizens.map((citizen) => (
              <tr key={citizen.email} className="hover:bg-gray-50 transition">
                <td className="px-6 py-4 font-medium">{citizen.email}</td>
                <td className="px-6 py-4">{citizen.status}</td>
                <td className="px-6 py-4">
                  <div className="flex justify-center gap-2">
                    <button
                      onClick={() => handleBlock(citizen)}
                      className="btn btn-sm btn-outline btn-error flex items-center gap-1"
                    >
                      {citizen.blocked == "no" ? "Block" : "Unblock"}
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Card Layout */}
      <div className="md:hidden space-y-4">
        {citizens.map((citizen) => (
          <div
            key={citizen.email}
            className="bg-white border border-gray-200 rounded-xl shadow-sm p-4"
          >
            <div className="mb-3">
              <p className="text-xs text-gray-500">Email</p>
              <p className="font-medium text-gray-800">{citizen.email}</p>
            </div>

            <div className="mb-4">
              <p className="text-xs text-gray-500">Status</p>
              <p className="text-sm text-gray-700">{citizen.status}</p>
            </div>

            <div className="flex gap-2">
              <button className="btn btn-sm btn-outline btn-error flex items-center gap-1">
                Block
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ManageUsers;
