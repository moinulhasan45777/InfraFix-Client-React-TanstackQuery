import React from "react";
import { FaUsers, FaUserShield, FaTools } from "react-icons/fa";

const WhoUsesInfraFix = () => {
  return (
    <section className="bg-base-100 py-20 my-24 rounded-3xl">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800">
            Who Uses InfraFix
          </h2>
          <p className="mt-4 text-gray-500 max-w-3xl mx-auto">
            InfraFix is designed for everyone involved in improving public
            infrastructure.
          </p>
        </div>

        {/* Roles */}
        <div className="grid gap-10 md:grid-cols-3">
          {/* Citizens */}
          <div className="border border-gray-200 rounded-xl p-8 text-center">
            <FaUsers className="text-primary text-4xl mx-auto mb-4" />
            <h3 className="font-semibold text-xl text-gray-800 mb-3">
              Citizens
            </h3>
            <p className="text-gray-600 text-sm">
              Report issues, upvote problems, track progress, and stay informed
              about city infrastructure updates.
            </p>
          </div>

          {/* Admins */}
          <div className="border border-gray-200 rounded-xl p-8 text-center">
            <FaUserShield className="text-primary text-4xl mx-auto mb-4" />
            <h3 className="font-semibold text-xl text-gray-800 mb-3">
              Administrators
            </h3>
            <p className="text-gray-600 text-sm">
              Verify issues, assign priorities, manage staff, and monitor system
              performance.
            </p>
          </div>

          {/* Staff */}
          <div className="border border-gray-200 rounded-xl p-8 text-center">
            <FaTools className="text-primary text-4xl mx-auto mb-4" />
            <h3 className="font-semibold text-xl text-gray-800 mb-3">
              Government Staff
            </h3>
            <p className="text-gray-600 text-sm">
              Receive assignments, update issue status, and resolve problems
              efficiently.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhoUsesInfraFix;
