import { useState, useMemo, useEffect, useCallback } from "react";
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

  // Infinite scroll state
  const [displayedIssues, setDisplayedIssues] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const ITEMS_PER_PAGE = 12;

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
        issue.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (issue.description &&
          issue.description.toLowerCase().includes(searchTerm.toLowerCase()));
      const matchesCategory =
        !selectedCategory || issue.category === selectedCategory;
      const matchesStatus = !selectedStatus || issue.status === selectedStatus;

      return matchesSearch && matchesCategory && matchesStatus;
    });
  }, [issues, searchTerm, selectedCategory, selectedStatus]);

  // Load more issues for infinite scroll
  const loadMoreIssues = useCallback(() => {
    if (isLoadingMore || !hasMore) return;

    setIsLoadingMore(true);

    // Simulate loading delay for better UX
    setTimeout(() => {
      const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
      const endIndex = startIndex + ITEMS_PER_PAGE;
      const newIssues = filteredIssues.slice(startIndex, endIndex);

      if (newIssues.length === 0) {
        setHasMore(false);
      } else {
        setDisplayedIssues((prev) => [...prev, ...newIssues]);
        setCurrentPage((prev) => prev + 1);

        // Check if we've loaded all issues
        if (endIndex >= filteredIssues.length) {
          setHasMore(false);
        }
      }

      setIsLoadingMore(false);
    }, 500);
  }, [currentPage, filteredIssues, isLoadingMore, hasMore]);

  // Reset pagination when filters change
  useEffect(() => {
    // Use a timeout to avoid cascading renders
    const timeoutId = setTimeout(() => {
      const initialIssues = filteredIssues.slice(0, ITEMS_PER_PAGE);
      setDisplayedIssues(initialIssues);
      setCurrentPage(2); // Next page to load
      setHasMore(filteredIssues.length > ITEMS_PER_PAGE);
    }, 0);

    return () => clearTimeout(timeoutId);
  }, [filteredIssues]);

  // Infinite scroll effect
  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + document.documentElement.scrollTop >=
        document.documentElement.offsetHeight - 1000 // Load when 1000px from bottom
      ) {
        loadMoreIssues();
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [loadMoreIssues]);

  // Clear all filters
  const clearFilters = () => {
    setSearchTerm("");
    setSelectedCategory("");
    setSelectedStatus("");
  };

  // Check if any filters are active
  const hasActiveFilters = searchTerm || selectedCategory || selectedStatus;

  // Utility function to truncate description
  const truncateDescription = (description, maxLength = 120) => {
    if (!description) return "No description provided for this issue.";
    if (description.length <= maxLength) return description;
    return description.substring(0, maxLength).trim() + "...";
  };

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
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center md:text-left">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-2">
          All Issues
        </h1>
        <p className="text-gray-600">
          View reported public infrastructure issues
        </p>
      </div>

      {/* Search and Filter Section */}
      <div className="space-y-6">
        {/* Search Bar */}
        <div className="relative max-w-2xl mx-auto">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            placeholder="Search by title, location, or description..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="block w-full pl-12 pr-4 py-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-secondary focus:border-transparent text-lg"
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
        <div className="text-center text-gray-600">
          Showing{" "}
          <span className="font-semibold">{displayedIssues.length}</span> of{" "}
          <span className="font-semibold">{filteredIssues.length}</span> issues
          {hasActiveFilters && (
            <span className="ml-2 text-secondary font-medium">
              (filtered from {issues.length} total)
            </span>
          )}
        </div>
      </div>

      {/* Issues Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {displayedIssues.map((issue) => (
          <div
            key={issue._id}
            className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden flex flex-col hover:shadow-lg transition-shadow duration-300"
          >
            {/* Image */}
            <div className="h-44 w-full overflow-hidden bg-gray-100">
              <img
                src={issue.image}
                alt={issue.title}
                className="h-full w-full object-cover hover:scale-105 transition-transform duration-300"
              />
            </div>

            {/* Content */}
            <div className="p-6 flex flex-col grow space-y-4">
              {/* Title */}
              <h3 className="text-xl font-bold text-gray-800 line-clamp-2 leading-tight">
                {issue.title}
              </h3>

              {/* Description */}
              <p className="text-gray-600 text-sm leading-relaxed line-clamp-3">
                {truncateDescription(issue.description)}
              </p>

              {/* Category */}
              <p className="text-sm text-gray-500 font-medium">
                Category: {issue.category}
              </p>

              {/* Status & Priority */}
              <div className="flex flex-wrap gap-2">
                <span className="px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-700">
                  {issue.status}
                </span>

                <span
                  className={`px-3 py-1 rounded-full text-sm font-medium ${
                    issue.priority === "High"
                      ? "bg-red-100 text-red-700"
                      : "bg-green-100 text-green-700"
                  }`}
                >
                  {issue.priority}
                </span>
              </div>

              {/* Location */}
              <div className="flex items-center gap-2 text-gray-600">
                <MapPin size={16} className="shrink-0" />
                <span className="line-clamp-1 text-sm">{issue.location}</span>
              </div>

              {/* Footer */}
              <div className="mt-auto flex items-center justify-between pt-4 border-t border-gray-100">
                {/* Upvote (UI only) */}
                <button
                  onClick={() => {
                    handleUpvote(issue);
                  }}
                  className="flex items-center gap-2 text-gray-600 cursor-pointer hover:text-secondary hover:scale-110 transition-all duration-200"
                >
                  <ThumbsUp size={18} />
                  <span className="font-medium">{issue.upvoteCount}</span>
                </button>

                {/* View Details */}
                <button
                  onClick={() =>
                    navigate("/issue-details", { state: { issue } })
                  }
                  className="px-4 py-2 bg-secondary text-white rounded-lg hover:bg-secondary/90 transition-colors font-medium"
                >
                  View Details
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Loading More Indicator */}
      {isLoadingMore && (
        <div className="flex justify-center items-center py-12">
          <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-secondary mr-4"></div>
          <span className="text-gray-600 text-lg">Loading more issues...</span>
        </div>
      )}

      {/* Load More Button (fallback for users who prefer clicking) */}
      {!isLoadingMore && hasMore && displayedIssues.length > 0 && (
        <div className="flex justify-center py-12">
          <button
            onClick={loadMoreIssues}
            className="px-8 py-4 bg-secondary text-white rounded-xl hover:bg-secondary/90 transition-colors font-medium text-lg"
          >
            Load More Issues
          </button>
        </div>
      )}

      {/* End of Results Indicator */}
      {!hasMore && displayedIssues.length > 0 && (
        <div className="text-center py-12">
          <div className="text-gray-500">
            <div className="text-4xl mb-4">🎉</div>
            <p className="text-lg font-medium">
              You've seen all {filteredIssues.length} issues!
            </p>
          </div>
        </div>
      )}

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
