import { useQuery } from "@tanstack/react-query";
import { useMemo } from "react";
import {
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useTitle from "../../../hooks/useTitle";

const AdminDashboard = () => {
  useTitle("Admin Dashboard");
  const axiosSecure = useAxiosSecure();

  const {
    data: issues = [],
    isLoading: issuesLoading,
    error: issuesError,
  } = useQuery({
    queryKey: ["Allissues"],
    queryFn: async () => {
      const res = await axiosSecure.get(`/issues`);
      return res.data;
    },
  });

  const {
    data: payments = [],
    isLoading: paymentsLoading,
    error: paymentsError,
  } = useQuery({
    queryKey: ["AllPayments"],
    queryFn: async () => {
      const res = await axiosSecure.get(`/payments`);
      return res.data;
    },
  });

  const getPayment = () => {
    let sum = 0;
    payments.map((payment) => {
      sum += payment.paymentAmount;
    });
    return sum;
  };

  // Chart data calculations
  const statusData = useMemo(() => {
    const statusCounts = {
      Pending: issues.filter((issue) => issue.status === "Pending").length,
      "In-Progress": issues.filter((issue) => issue.status === "In-Progress")
        .length,
      Resolved: issues.filter((issue) => issue.status === "Resolved").length,
      Rejected: issues.filter((issue) => issue.status === "Rejected").length,
    };

    return Object.entries(statusCounts).map(([status, count]) => ({
      name: status,
      value: count,
      percentage:
        issues.length > 0 ? ((count / issues.length) * 100).toFixed(1) : 0,
    }));
  }, [issues]);

  const categoryData = useMemo(() => {
    const categoryMap = {};
    issues.forEach((issue) => {
      categoryMap[issue.category] = (categoryMap[issue.category] || 0) + 1;
    });

    return Object.entries(categoryMap).map(([category, count]) => ({
      name: category,
      count: count,
    }));
  }, [issues]);

  const priorityData = useMemo(() => {
    const priorityMap = {};
    issues.forEach((issue) => {
      priorityMap[issue.priority] = (priorityMap[issue.priority] || 0) + 1;
    });

    return Object.entries(priorityMap).map(([priority, count]) => ({
      name: priority,
      count: count,
    }));
  }, [issues]);

  // Colors for charts
  const statusColors = {
    Pending: "#FCD34D", // yellow
    "In-Progress": "#FB923C", // orange
    Resolved: "#34D399", // green
    Rejected: "#F87171", // red
  };

  const CHART_COLORS = [
    "#3B82F6",
    "#10B981",
    "#F59E0B",
    "#EF4444",
    "#8B5CF6",
    "#06B6D4",
  ];

  // Show loading state
  if (issuesLoading || paymentsLoading) {
    return (
      <div className="p-6 max-w-7xl mx-auto">
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-secondary mx-auto mb-4"></div>
            <p className="text-gray-600">Loading dashboard data...</p>
          </div>
        </div>
      </div>
    );
  }

  // Show error state
  if (issuesError || paymentsError) {
    return (
      <div className="p-6 max-w-7xl mx-auto">
        <div className="bg-red-50 border border-red-200 rounded-lg p-6">
          <h2 className="text-lg font-semibold text-red-800 mb-2">
            Error Loading Dashboard
          </h2>
          <p className="text-red-600">
            {issuesError?.message ||
              paymentsError?.message ||
              "Failed to load dashboard data"}
          </p>
        </div>
      </div>
    );
  }

  console.log("Issues data:", issues);
  console.log("Payments data:", payments);

  // Sample data fallback if no real data exists
  const sampleStatusData = [
    { name: "Pending", value: 5, percentage: "35.7" },
    { name: "In-Progress", value: 3, percentage: "21.4" },
    { name: "Resolved", value: 4, percentage: "28.6" },
    { name: "Rejected", value: 2, percentage: "14.3" },
  ];

  const sampleCategoryData = [
    { name: "Roads", count: 4 },
    { name: "Lighting", count: 3 },
    { name: "Water", count: 2 },
    { name: "Parks", count: 2 },
    { name: "Traffic", count: 3 },
  ];

  // Use sample data if no real data
  const displayStatusData =
    statusData.length > 0 ? statusData : sampleStatusData;
  const displayCategoryData =
    categoryData.length > 0 ? categoryData : sampleCategoryData;
  return (
    <div className="p-6 max-w-7xl mx-auto space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-800">Dashboard</h1>
        <div className="text-sm text-gray-500">
          {issues.length === 0
            ? "Showing sample data"
            : `${issues.length} issues loaded`}
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Total Issues Submitted */}
        <div className="rounded-xl shadow-lg p-6 bg-blue-100 flex flex-col justify-between">
          <p className="text-sm font-medium text-gray-700">Total Issues</p>
          <p className="text-3xl font-bold text-blue-700 mt-2">
            {issues.length}
          </p>
        </div>

        {/* Pending Issues */}
        <div className="rounded-xl shadow-lg p-6 bg-yellow-100 flex flex-col justify-between">
          <p className="text-sm font-medium text-gray-700">Pending Issues</p>
          <p className="text-3xl font-bold text-yellow-700 mt-2">
            {issues.filter((issue) => issue.status == "Pending").length}
          </p>
        </div>

        {/* In-Progress Issues */}
        <div className="rounded-xl shadow-lg p-6 bg-orange-100 flex flex-col justify-between">
          <p className="text-sm font-medium text-gray-700">
            In-Progress Issues
          </p>
          <p className="text-3xl font-bold text-orange-700 mt-2">
            {issues.filter((issue) => issue.status == "In-Progress").length}
          </p>
        </div>

        {/* Resolved Issues */}
        <div className="rounded-xl shadow-lg p-6 bg-green-100 flex flex-col justify-between">
          <p className="text-sm font-medium text-gray-700">Resolved Issues</p>
          <p className="text-3xl font-bold text-green-700 mt-2">
            {issues.filter((issue) => issue.status == "Resolved").length}
          </p>
        </div>

        {/* Rejected Issues */}
        <div className="rounded-xl shadow-lg p-6 bg-red-100 flex flex-col justify-between">
          <p className="text-sm font-medium text-gray-700">Rejected Issues</p>
          <p className="text-3xl font-bold text-red-700 mt-2">
            {issues.filter((issue) => issue.status == "Rejected").length}
          </p>
        </div>

        {/* Total Payments */}
        <div className="rounded-xl shadow-lg p-6 bg-purple-100 flex flex-col justify-between">
          <p className="text-sm font-medium text-gray-700">Total Payment</p>
          <p className="text-3xl font-bold text-purple-700 mt-2">
            BDT {getPayment()}
          </p>
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Issue Status Distribution - Pie Chart */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-xl font-bold text-gray-800 mb-4">
            Issue Status Distribution
          </h2>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={displayStatusData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percentage }) => `${name}: ${percentage}%`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {displayStatusData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={
                      statusColors[entry.name] ||
                      CHART_COLORS[index % CHART_COLORS.length]
                    }
                  />
                ))}
              </Pie>
              <Tooltip formatter={(value, name) => [value, name]} />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Issues by Category - Bar Chart */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-xl font-bold text-gray-800 mb-4">
            Issues by Category
          </h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={displayCategoryData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis
                dataKey="name"
                angle={-45}
                textAnchor="end"
                height={80}
                fontSize={12}
              />
              <YAxis />
              <Tooltip />
              <Bar dataKey="count" fill="#3B82F6" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Issues by Priority - Bar Chart */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-xl font-bold text-gray-800 mb-4">
            Issues by Priority
          </h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={priorityData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="count" fill="#10B981" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Status Overview - Horizontal Bar Chart */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-xl font-bold text-gray-800 mb-4">
            Status Overview
          </h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={displayStatusData} layout="horizontal">
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis type="number" />
              <YAxis dataKey="name" type="category" width={80} />
              <Tooltip formatter={(value) => [value, "Issues"]} />
              <Bar dataKey="value" fill="#F59E0B" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Summary Stats */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h2 className="text-xl font-bold text-gray-800 mb-4">Quick Summary</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center">
            <div className="text-3xl font-bold text-blue-600">
              {issues.length > 0
                ? (
                    (issues.filter((issue) => issue.status === "Resolved")
                      .length /
                      issues.length) *
                    100
                  ).toFixed(1)
                : 0}
              %
            </div>
            <div className="text-sm text-gray-600 mt-1">Resolution Rate</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-orange-600">
              {
                issues.filter(
                  (issue) =>
                    issue.status === "Pending" || issue.status === "In-Progress"
                ).length
              }
            </div>
            <div className="text-sm text-gray-600 mt-1">Active Issues</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-purple-600">
              {categoryData.length}
            </div>
            <div className="text-sm text-gray-600 mt-1">Categories</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
