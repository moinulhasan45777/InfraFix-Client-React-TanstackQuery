import React from "react";
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router";
import { ThumbsUp, MapPin } from "lucide-react";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useAuth from "../../hooks/useAuth";
import Swal from "sweetalert2";

const AllIssues = () => {
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();

  const { user } = useAuth();

  const { data: issues = [], refetch } = useQuery({
    queryKey: ["allIssues"],
    queryFn: async () => {
      const res = await axiosSecure.get("/issues");
      return res.data;
    },
  });

  const handleUpvote = async (issue) => {
    if (user) {
      const updatedIssue = {
        upvoteCount: issue.upvoteCount + 1,
      };
      await axiosSecure.patch(`/upvote/${issue._id}`, updatedIssue).then(() => {
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Upvoted",
          showConfirmButton: false,
          timer: 1500,
        });
        refetch();
      });
    } else {
      navigate("/auth/login");
    }
  };

  return (
    <div className="p-4 md:p-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl md:text-3xl font-semibold text-gray-800">
          All Issues
        </h1>
        <p className="text-sm text-gray-500">
          View reported public infrastructure issues
        </p>
      </div>

      {/* Issues Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {issues.map((issue) => (
          <div
            key={issue._id}
            className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden flex flex-col"
          >
            {/* Image */}
            <div className="h-48 w-full overflow-hidden bg-gray-100">
              <img
                src={issue.image}
                alt={issue.title}
                className="h-full w-full object-cover"
              />
            </div>

            {/* Content */}
            <div className="p-4 flex flex-col flex-grow">
              {/* Title */}
              <h3 className="text-lg font-semibold text-gray-800 mb-1 line-clamp-1">
                {issue.title}
              </h3>

              {/* Category */}
              <p className="text-xs text-gray-500 mb-2">
                Category: {issue.category}
              </p>

              {/* Status & Priority */}
              <div className="flex flex-wrap gap-2 mb-3">
                <span className="px-3 py-1 rounded-full text-xs bg-blue-100 text-blue-700">
                  {issue.status}
                </span>

                <span
                  className={`px-3 py-1 rounded-full text-xs ${
                    issue.priority === "High"
                      ? "bg-red-100 text-red-700"
                      : "bg-green-100 text-green-700"
                  }`}
                >
                  {issue.priority}
                </span>
              </div>

              {/* Location */}
              <div className="flex items-center gap-1 text-sm text-gray-600 mb-4">
                <MapPin size={14} />
                <span className="line-clamp-1">{issue.location}</span>
              </div>

              {/* Footer */}
              <div className="mt-auto flex items-center justify-between">
                {/* Upvote (UI only) */}
                <button
                  onClick={() => {
                    handleUpvote(issue);
                  }}
                  className="flex items-center gap-1 text-gray-600 cursor-pointer hover:scale-110"
                >
                  <ThumbsUp size={16} />
                  <span className="text-sm">{issue.upvoteCount}</span>
                </button>

                {/* View Details */}
                <button
                  onClick={() =>
                    navigate("/issue-details", { state: { issue } })
                  }
                  className="btn btn-sm btn-outline btn-secondary"
                >
                  View Details
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {issues.length === 0 && (
        <div className="text-center text-gray-500 mt-12">No issues found.</div>
      )}
    </div>
  );
};

export default AllIssues;
