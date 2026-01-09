import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const LatestResolvedIssues = () => {
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();

  // ✅ Fetch issues (exact pattern you provided)
  const { data: issues = [], isLoading } = useQuery({
    queryKey: ["allIssues"],
    queryFn: async () => {
      const res = await axiosSecure.get("/issues");
      return res.data;
    },
  });
  // ✅ Filter + sort resolved issues
  const resolvedIssues = issues
    .filter((issue) => issue.status == "Resolved" || issue.status == "Closed")
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    .slice(0, 6);

  return (
    <section className="max-w-7xl mx-auto px-4 py-16">
      {/* Section Header */}
      <div className="mb-10 text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-800">
          Latest Resolved Issues
        </h2>
        <p className="text-gray-500 mt-2 max-w-2xl mx-auto">
          Recently resolved public infrastructure issues handled efficiently
          through InfraFix.
        </p>
      </div>

      {/* Loading State */}
      {isLoading ? (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {/* Skeleton Cards */}
          {[...Array(6)].map((_, index) => (
            <div
              key={index}
              className="bg-white border border-gray-200 rounded-xl shadow-sm animate-pulse"
            >
              <div className="p-5 space-y-4">
                {/* Title Skeleton */}
                <div className="h-6 bg-gray-200 rounded w-3/4"></div>

                {/* Meta Skeleton */}
                <div className="space-y-2">
                  <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                  <div className="h-4 bg-gray-200 rounded w-2/3"></div>
                </div>

                {/* Status & Priority Skeleton */}
                <div className="flex items-center justify-between">
                  <div className="h-6 bg-gray-200 rounded-full w-16"></div>
                  <div className="h-6 bg-gray-200 rounded-full w-12"></div>
                </div>

                {/* Footer Skeleton */}
                <div className="flex items-center justify-between pt-3 border-t">
                  <div className="h-4 bg-gray-200 rounded w-16"></div>
                  <div className="h-4 bg-gray-200 rounded w-20"></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <>
          {/* Cards */}
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {resolvedIssues.map((issue) => (
              <div
                key={issue._id}
                className="bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-md transition"
              >
                <div className="p-5 space-y-4">
                  {/* Title */}
                  <h3 className="text-lg font-semibold text-gray-800 line-clamp-1">
                    {issue.title}
                  </h3>

                  {/* Meta */}
                  <div className="text-sm text-gray-500 space-y-1">
                    <p>
                      <span className="font-medium text-gray-700">
                        Category:
                      </span>{" "}
                      {issue.category}
                    </p>
                    <p>
                      <span className="font-medium text-gray-700">
                        Location:
                      </span>{" "}
                      {issue.location}
                    </p>
                  </div>

                  {/* Status & Priority */}
                  <div className="flex items-center justify-between">
                    <span className="px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-700">
                      {issue.status}
                    </span>

                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium ${
                        issue.priority === "High"
                          ? "bg-red-100 text-red-700"
                          : "bg-blue-100 text-blue-700"
                      }`}
                    >
                      {issue.priority}
                    </span>
                  </div>

                  {/* Footer */}
                  <div className="flex items-center justify-between pt-3 border-t">
                    <span className="text-sm text-gray-500">
                      👍 {issue.upvoteCount} votes
                    </span>

                    <button
                      onClick={() =>
                        navigate("/issue-details", {
                          state: { issue },
                        })
                      }
                      className="text-sm font-medium text-secondary cursor-pointer hover:underline"
                    >
                      View Details →
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Empty State */}
          {resolvedIssues.length === 0 && (
            <p className="text-center text-gray-500 mt-10">
              No resolved issues available yet.
            </p>
          )}
        </>
      )}
    </section>
  );
};

export default LatestResolvedIssues;
