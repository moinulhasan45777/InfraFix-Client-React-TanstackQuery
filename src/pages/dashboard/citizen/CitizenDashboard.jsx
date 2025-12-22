import React from "react";
import useAuth from "../../../hooks/useAuth";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const CitizenDashboard = () => {
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
    </div>
  );
};

export default CitizenDashboard;
