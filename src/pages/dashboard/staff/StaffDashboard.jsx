import { useQuery } from "@tanstack/react-query";
import React from "react";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const StaffDashboard = () => {
  const { user, loading } = useAuth();
  const axiosSecure = useAxiosSecure();
  const { data: issues = [] } = useQuery({
    queryKey: ["Allissues"],
    queryFn: async () => {
      const res = await axiosSecure.get(`/issues`);
      return res.data;
    },
  });
  if (loading) {
    return <Loading></Loading>;
  }
  return (
    <div className="p-6 max-w-7xl mx-auto space-y-8">
      <h1 className="text-3xl font-bold text-gray-800">Dashboard</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Total Issues Submitted */}
        <div className="rounded-xl shadow-lg p-6 bg-blue-100 flex flex-col justify-between">
          <p className="text-sm font-medium text-gray-700">Assigned Issues</p>
          <p className="text-3xl font-bold text-blue-700 mt-2">
            {
              issues.filter((issue) => issue.assignedStaff == user?.email)
                .length
            }
          </p>
        </div>

        {/* Pending Issues */}
        <div className="rounded-xl shadow-lg p-6 bg-yellow-100 flex flex-col justify-between">
          <p className="text-sm font-medium text-gray-700">Resolved Issues</p>
          <p className="text-3xl font-bold text-yellow-700 mt-2">
            {
              issues.filter(
                (issue) =>
                  issue.status == "Pending" &&
                  issue.assignedStaff == user?.email
              ).length
            }
          </p>
        </div>
      </div>
    </div>
  );
};
export default StaffDashboard;
