import React from "react";
import {
  FaUserEdit,
  FaMapMarkerAlt,
  FaClipboardCheck,
  FaUserCog,
  FaCheckCircle,
} from "react-icons/fa";

const HowItWorks = () => {
  return (
    <section className="bg-base-200 py-20 rounded-3xl">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800">
            How InfraFix Works
          </h2>
          <p className="mt-4 text-gray-500 max-w-3xl mx-auto">
            A simple and transparent process that connects citizens and
            authorities to resolve public infrastructure issues efficiently.
          </p>
        </div>

        {/* Steps */}
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-5">
          {/* Step 1 */}
          <div className="text-center">
            <div className="w-16 h-16 mx-auto flex items-center justify-center rounded-full bg-primary text-white text-2xl mb-4">
              <FaUserEdit />
            </div>
            <h3 className="font-semibold text-gray-800 mb-2">
              Report an Issue
            </h3>
            <p className="text-sm text-gray-600">
              Citizens submit infrastructure issues with details like category,
              location, and description.
            </p>
          </div>

          {/* Step 2 */}
          <div className="text-center">
            <div className="w-16 h-16 mx-auto flex items-center justify-center rounded-full bg-primary text-white text-2xl mb-4">
              <FaMapMarkerAlt />
            </div>
            <h3 className="font-semibold text-gray-800 mb-2">
              Location Mapping
            </h3>
            <p className="text-sm text-gray-600">
              Each issue is tagged with a location for accurate identification
              and prioritization.
            </p>
          </div>

          {/* Step 3 */}
          <div className="text-center">
            <div className="w-16 h-16 mx-auto flex items-center justify-center rounded-full bg-primary text-white text-2xl mb-4">
              <FaClipboardCheck />
            </div>
            <h3 className="font-semibold text-gray-800 mb-2">Verification</h3>
            <p className="text-sm text-gray-600">
              Admins review and verify reported issues before assigning them to
              staff.
            </p>
          </div>

          {/* Step 4 */}
          <div className="text-center">
            <div className="w-16 h-16 mx-auto flex items-center justify-center rounded-full bg-primary text-white text-2xl mb-4">
              <FaUserCog />
            </div>
            <h3 className="font-semibold text-gray-800 mb-2">
              Assignment & Action
            </h3>
            <p className="text-sm text-gray-600">
              Verified issues are assigned to government staff for resolution
              and progress tracking.
            </p>
          </div>

          {/* Step 5 */}
          <div className="text-center">
            <div className="w-16 h-16 mx-auto flex items-center justify-center rounded-full bg-primary text-white text-2xl mb-4">
              <FaCheckCircle />
            </div>
            <h3 className="font-semibold text-gray-800 mb-2">
              Resolution & Updates
            </h3>
            <p className="text-sm text-gray-600">
              Citizens receive status updates as the issue gets resolved,
              ensuring transparency.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
