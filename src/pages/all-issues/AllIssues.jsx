import { useState, useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router";
import { ThumbsUp, MapPin, Search, Filter, X } from "lucide-react";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useAuth from "../../hooks/useAuth";
import Swal from "sweetalert2";
import useTitle from "../../hooks/useTitle";

const AllIssues = () => {
  useTitle("All Issues");
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();
  const { user } = useAuth();

  // State for search and filters
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("");
  const [showFilters, setShowFilters] = useState(false);

  const { data: issues = [], refetch } = useQuery({
    queryKey: ["allIssues"],
    queryFn: async () => {
      const res = await axiosSecure.get("/issues");
      return res.data;
    },
  });

  // Get unique categories and statuses for filter options
  const categories = useMemo(() => {
    const uniqueCategories = [
      ...new Set(issues.map((issue) => issue.category)),
    ];
    return uniqueCategories.sort();
  }, [issues]);

  const statuses = useMemo(() => {
    const uniqueStatuses = [...new Set(issues.map((issue) => issue.status))];
    return uniqueStatuses.sort();
  }, [issues]);

  // Filter and search logic
  const filteredIssues = useMemo(() => {
    return issues.filter((issue) => {
      const matchesSearch =
        issue.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        issue.location.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory =
        !selectedCategory || issue.category === selectedCategory;
      const matchesStatus = !selectedStatus || issue.status === selectedStatus;

      return matchesSearch && matchesCategory && matchesStatus;
    });
  }, [issues, searchTerm, selectedCategory, selectedStatus]);

  // Clear all filters
  const clearFilters = () => {
    setSearchTerm("");
    setSelectedCategory("");
    setSelectedStatus("");
  };

  // Check if any filters are active
  const hasActiveFilters = searchTerm || selectedCategory || selectedStatus;

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

      {/* Search and Filter Section */}
      <div className="mb-6 space-y-4">
        {/* Search Bar */}
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            placeholder="Search by title or location..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-secondary focus:border-transparent"
          />
        </div>

        {/* Filter Toggle and Controls */}
        <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center gap-2 px-4 py-2 bg-secondary text-white rounded-lg hover:bg-secondary/90 transition-colors"
          >
            <Filter className="h-4 w-4" />
            Filters
            {hasActiveFilters && (
              <span className="bg-white text-secondary text-xs px-2 py-1 rounded-full">
                {
                  [searchTerm, selectedCategory, selectedStatus].filter(Boolean)
                    .length
                }
              </span>
            )}
          </button>

          {hasActiveFilters && (
            <button
              onClick={clearFilters}
              className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
            >
              <X className="h-4 w-4" />
              Clear All Filters
            </button>
          )}
        </div>

        {/* Filter Dropdowns */}
        {showFilters && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4 bg-gray-50 rounded-lg">
            {/* Category Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Category
              </label>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="block w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-secondary focus:border-transparent"
              >
                <option value="">All Categories</option>
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>

            {/* Status Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Status
              </label>
              <select
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
                className="block w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-secondary focus:border-transparent"
              >
                <option value="">All Statuses</option>
                {statuses.map((status) => (
                  <option key={status} value={status}>
                    {status}
                  </option>
                ))}
              </select>
            </div>
          </div>
        )}

        {/* Results Count */}
        <div className="text-sm text-gray-600">
          Showing {filteredIssues.length} of {issues.length} issues
          {hasActiveFilters && (
            <span className="ml-2 text-secondary font-medium">(filtered)</span>
          )}
        </div>
      </div>

      {/* Issues Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredIssues.map((issue) => (
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
            <div className="p-4 flex flex-col grow">
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
      {filteredIssues.length === 0 && (
        <div className="text-center text-gray-500 mt-12 py-12">
          {issues.length === 0 ? (
            <div>
              <div className="text-6xl mb-4">📋</div>
              <h3 className="text-lg font-medium mb-2">No issues found</h3>
              <p>No issues have been reported yet.</p>
            </div>
          ) : (
            <div>
              <div className="text-6xl mb-4">🔍</div>
              <h3 className="text-lg font-medium mb-2">No matching issues</h3>
              <p>Try adjusting your search terms or filters.</p>
              <button
                onClick={clearFilters}
                className="mt-4 px-4 py-2 bg-secondary text-white rounded-lg hover:bg-secondary/90 transition-colors"
              >
                Clear Filters
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default AllIssues;
