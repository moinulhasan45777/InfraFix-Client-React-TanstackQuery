import { useMemo } from "react";
import useAuth from "../../../hooks/useAuth";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useTitle from "../../../hooks/useTitle";
import Loading from "../../../components/Loading";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
  Legend,
} from "recharts";

const CitizenDashboard = () => {
  useTitle("Citizen Dashboard");
  const { user, loading } = useAuth();
  const axiosSecure = useAxiosSecure();
  const { data: issues = [] } = useQuery({
    queryKey: ["Allissues"],
    queryFn: async () => {
      const res = await axiosSecure.get(`/my-issues?email=${user.email}`);
      return res.data;
    },
  });
  const { data: payments = [] } = useQuery({
    queryKey: ["AllPayments"],
    queryFn: async () => {
      const res = await axiosSecure.get(`/payments`);
      return res.data;
    },
  });

  const getPayment = () => {
    let sum = 0;
    payments
      .filter((payment) => payment.paymentBy == user.email)
      .map((payment) => {
        sum += payment.paymentAmount;
      });
    return sum;
  };

  // Chart data for citizen's issues
  const myIssuesStatusData = useMemo(() => {
    const statusCounts = {
      Pending: issues.filter((issue) => issue.status === "Pending").length,
      "In-Progress": issues.filter((issue) => issue.status === "In-Progress")
        .length,
      Resolved: issues.filter((issue) => issue.status === "Resolved").length,
      Rejected: issues.filter((issue) => issue.status === "Rejected").length,
    };

    return Object.entries(statusCounts)
      .filter(([, count]) => count > 0) // Only show statuses with issues
      .map(([status, count]) => ({
        name: status,
        value: count,
        percentage:
          issues.length > 0 ? ((count / issues.length) * 100).toFixed(1) : 0,
      }));
  }, [issues]);

  // Colors for citizen dashboard
  const statusColors = {
    Pending: "#FCD34D",
    "In-Progress": "#FB923C",
    Resolved: "#34D399",
    Rejected: "#F87171",
  };

  if (loading) {
    return <Loading></Loading>;
  }
  return (
    <div className="p-6 max-w-7xl mx-auto space-y-8">
      <h1 className="text-3xl font-bold text-gray-800">Dashboard</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Total Issues Submitted */}
        <div className="rounded-xl shadow-lg p-6 bg-blue-100 flex flex-col justify-between">
          <p className="text-sm font-medium text-gray-700">
            Total Issues Submitted
          </p>
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

        {/* Total Payments */}
        <div className="rounded-xl shadow-lg p-6 bg-purple-100 flex flex-col justify-between">
          <p className="text-sm font-medium text-gray-700">Total Payment</p>
          <p className="text-3xl font-bold text-purple-700 mt-2">
            BDT {getPayment()}
          </p>
        </div>
      </div>

      {/* Chart Section for Citizens */}
      {issues.length > 0 && (
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-xl font-bold text-gray-800 mb-4">
            My Issues Status Distribution
          </h2>
          <div className="flex flex-col lg:flex-row items-center gap-8">
            <div className="w-full lg:w-1/2">
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={myIssuesStatusData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percentage }) => `${name}: ${percentage}%`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {myIssuesStatusData.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={statusColors[entry.name]}
                      />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="w-full lg:w-1/2 space-y-4">
              <h3 className="text-lg font-semibold text-gray-700">
                Issue Summary
              </h3>
              {myIssuesStatusData.map((item) => (
                <div
                  key={item.name}
                  className="flex justify-between items-center p-3 bg-gray-50 rounded-lg"
                >
                  <span className="font-medium">{item.name}</span>
                  <div className="text-right">
                    <span className="text-lg font-bold">{item.value}</span>
                    <span className="text-sm text-gray-500 ml-2">
                      ({item.percentage}%)
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* No Issues Message */}
      {issues.length === 0 && (
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 text-center">
          <div className="text-4xl mb-4">📝</div>
          <h3 className="text-lg font-semibold text-blue-800 mb-2">
            No Issues Reported Yet
          </h3>
          <p className="text-blue-600">
            Start by reporting your first infrastructure issue to help improve
            your community!
          </p>
        </div>
      )}
    </div>
  );
};

export default CitizenDashboard;
