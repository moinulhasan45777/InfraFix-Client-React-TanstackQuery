import React from "react";
import {
  FaMapMarkedAlt,
  FaClock,
  FaUserShield,
  FaChartLine,
  FaTools,
  FaBell,
} from "react-icons/fa";

const Features = () => {
  return (
    <section className="max-w-7xl mx-auto px-4 py-20">
      {/* Header */}
      <div className="text-center mb-14">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-800">
          Powerful Features of InfraFix
        </h2>
        <p className="mt-4 text-gray-500 max-w-3xl mx-auto">
          InfraFix empowers citizens and authorities with a transparent,
          efficient, and data-driven platform to manage public infrastructure
          issues.
        </p>
      </div>

      {/* Features Grid */}
      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {/* Feature 1 */}
        <div className="bg-white border rounded-xl p-6 shadow-sm hover:shadow-md transition">
          <FaMapMarkedAlt className="text-primary text-3xl mb-4" />
          <h3 className="text-lg font-semibold text-gray-800 mb-2">
            Location-Based Issue Reporting
          </h3>
          <p className="text-gray-600 text-sm">
            Citizens can report real-world infrastructure issues with accurate
            location details for faster resolution.
          </p>
        </div>

        {/* Feature 2 */}
        <div className="bg-white border rounded-xl p-6 shadow-sm hover:shadow-md transition">
          <FaClock className="text-primary text-3xl mb-4" />
          <h3 className="text-lg font-semibold text-gray-800 mb-2">
            Faster Response Time
          </h3>
          <p className="text-gray-600 text-sm">
            Streamlined workflows help municipal teams respond and resolve
            issues quickly and efficiently.
          </p>
        </div>

        {/* Feature 3 */}
        <div className="bg-white border rounded-xl p-6 shadow-sm hover:shadow-md transition">
          <FaUserShield className="text-primary text-3xl mb-4" />
          <h3 className="text-lg font-semibold text-gray-800 mb-2">
            Role-Based Access Control
          </h3>
          <p className="text-gray-600 text-sm">
            Admins, staff, and citizens have defined access levels ensuring
            secure and organized issue management.
          </p>
        </div>

        {/* Feature 4 */}
        <div className="bg-white border rounded-xl p-6 shadow-sm hover:shadow-md transition">
          <FaTools className="text-primary text-3xl mb-4" />
          <h3 className="text-lg font-semibold text-gray-800 mb-2">
            Issue Assignment & Tracking
          </h3>
          <p className="text-gray-600 text-sm">
            Authorities can assign staff, monitor progress, and track issue
            status in real time.
          </p>
        </div>

        {/* Feature 5 */}
        <div className="bg-white border rounded-xl p-6 shadow-sm hover:shadow-md transition">
          <FaBell className="text-primary text-3xl mb-4" />
          <h3 className="text-lg font-semibold text-gray-800 mb-2">
            Real-Time Status Updates
          </h3>
          <p className="text-gray-600 text-sm">
            Citizens stay informed with live updates as issues move from
            reporting to resolution.
          </p>
        </div>

        {/* Feature 6 */}
        <div className="bg-white border rounded-xl p-6 shadow-sm hover:shadow-md transition">
          <FaChartLine className="text-primary text-3xl mb-4" />
          <h3 className="text-lg font-semibold text-gray-800 mb-2">
            Data-Driven Insights
          </h3>
          <p className="text-gray-600 text-sm">
            Analyze trends, frequent issue locations, and performance metrics to
            improve city services.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Features;
