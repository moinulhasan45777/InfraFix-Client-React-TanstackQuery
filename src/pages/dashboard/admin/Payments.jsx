import React, { useState } from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import useTitle from "../../../hooks/useTitle";

const Payments = () => {
  useTitle("All Payments");
  const axiosSecure = useAxiosSecure();
  const [paymentType, setPaymentType] = useState("");

  const { data: payments = [] } = useQuery({
    queryKey: ["allPayments"],
    queryFn: async () => {
      const res = await axiosSecure.get(`/payments`);
      return res.data;
    },
  });

  const filteredPayments = payments.filter((pay) =>
    paymentType ? pay.paymentType === paymentType : true
  );

  return (
    <div className="p-4 md:p-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-semibold text-gray-800">All Payments</h1>
          <p className="text-sm text-gray-500">View Payments</p>
        </div>

        {/* Filter */}
        <select
          value={paymentType}
          onChange={(e) => setPaymentType(e.target.value)}
          className="select select-bordered w-full sm:w-60"
        >
          <option value="">All Payment Types</option>
          <option value="Issue Boost">Issue Boost</option>
          <option value="Subscription">Subscription</option>
        </select>
      </div>

      {/* Desktop Table */}
      <div className="hidden md:block bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <table className="min-w-full">
          <thead className="bg-gray-50 border-b text-sm text-gray-600">
            <tr>
              <th className="px-6 py-4 text-left font-medium">Payment Type</th>
              <th className="px-6 py-4 text-left font-medium">Paid By</th>
              <th className="px-6 py-4 text-center font-medium">Amount</th>
            </tr>
          </thead>

          <tbody className="divide-y text-sm text-gray-700">
            {filteredPayments.map((pay, idx) => (
              <tr key={idx} className="hover:bg-gray-50 transition">
                <td className="px-6 py-4 font-medium">{pay.paymentType}</td>
                <td className="px-6 py-4">{pay.paymentBy}</td>
                <td className="px-6 py-4 text-center">৳ {pay.paymentAmount}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Cards */}
      <div className="md:hidden space-y-4">
        {filteredPayments.map((pay, idx) => (
          <div
            key={idx}
            className="bg-white border border-gray-200 rounded-xl shadow-sm p-4"
          >
            <div className="mb-3">
              <p className="text-xs text-gray-500">Payment Type</p>
              <p className="font-medium text-gray-800">{pay.paymentType}</p>
            </div>

            <div className="mb-3">
              <p className="text-xs text-gray-500">Paid By</p>
              <p className="text-sm text-gray-700">{pay.paymentBy}</p>
            </div>

            <div>
              <p className="text-xs text-gray-500">Amount</p>
              <p className="font-semibold text-gray-900">
                ৳ {pay.paymentAmount}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Payments;
