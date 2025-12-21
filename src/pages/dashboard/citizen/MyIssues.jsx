import React from "react";

const MyIssues = () => {
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

  const statuses = ["Pending", "In Progress", "Resolved", "Closed"];
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
            <select className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring">
              <option value="">All Status</option>
              {statuses.map((status) => (
                <option key={status}>{status}</option>
              ))}
            </select>
          </div>

          {/* Category Filter */}
          <div>
            <label className="block text-sm text-gray-600 mb-1">Category</label>
            <select className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring">
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
            <tr className="border-t hover:bg-gray-50 transition">
              <td className="px-4 py-3 font-medium">Broken Street Light</td>
              <td className="px-4 py-3">21 Jan 2025</td>
              <td className="px-4 py-3">
                <span className="px-3 py-1 text-xs rounded-full bg-yellow-100 text-yellow-700">
                  Pending
                </span>
              </td>
              <td className="px-4 py-3">
                <div className="flex items-center justify-center gap-2 flex-wrap">
                  <button className="px-3 py-1 text-xs rounded-md bg-blue-100 text-blue-700 hover:bg-blue-200">
                    View
                  </button>
                  <button className="px-3 py-1 text-xs rounded-md bg-green-100 text-green-700 hover:bg-green-200">
                    Edit
                  </button>
                  <button className="px-3 py-1 text-xs rounded-md bg-red-100 text-red-700 hover:bg-red-200">
                    Delete
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MyIssues;
