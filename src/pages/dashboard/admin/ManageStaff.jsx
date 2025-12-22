import React from "react";
import { Plus, Pencil, Trash2 } from "lucide-react";
import { Link } from "react-router";

const ManageStaff = () => {
  return (
    <div className="p-4 md:p-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-semibold text-gray-800">Manage Staff</h1>
          <p className="text-sm text-gray-500">View and manage staff members</p>
        </div>

        <Link
          to="/dashboard/admin/add-staff"
          className="btn btn-primary flex items-center gap-2 w-full sm:w-auto"
        >
          <Plus size={18} />
          Add Staff
        </Link>
      </div>

      {/* Desktop Table */}
      <div className="hidden md:block bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <table className="min-w-full">
          <thead className="bg-gray-50 border-b text-sm text-gray-600">
            <tr>
              <th className="px-6 py-4 text-left font-medium">Name</th>
              <th className="px-6 py-4 text-left font-medium">Email</th>
              <th className="px-6 py-4 text-center font-medium">Actions</th>
            </tr>
          </thead>

          <tbody className="divide-y text-sm text-gray-700">
            <tr className="hover:bg-gray-50 transition">
              <td className="px-6 py-4 font-medium">John Doe</td>
              <td className="px-6 py-4">john.doe@example.com</td>
              <td className="px-6 py-4">
                <div className="flex justify-center gap-2">
                  <button className="btn btn-sm btn-outline btn-info flex items-center gap-1">
                    <Pencil size={14} />
                    Update
                  </button>
                  <button className="btn btn-sm btn-outline btn-error flex items-center gap-1">
                    <Trash2 size={14} />
                    Delete
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Mobile Card Layout */}
      <div className="md:hidden space-y-4">
        <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-4">
          <div className="mb-3">
            <p className="text-xs text-gray-500">Name</p>
            <p className="font-medium text-gray-800">John Doe</p>
          </div>

          <div className="mb-4">
            <p className="text-xs text-gray-500">Email</p>
            <p className="text-sm text-gray-700">john.doe@example.com</p>
          </div>

          <div className="flex gap-2">
            <button className="btn btn-sm btn-outline btn-info flex-1 flex items-center justify-center gap-1">
              <Pencil size={14} />
              Update
            </button>
            <button className="btn btn-sm btn-outline btn-error flex-1 flex items-center justify-center gap-1">
              <Trash2 size={14} />
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ManageStaff;
