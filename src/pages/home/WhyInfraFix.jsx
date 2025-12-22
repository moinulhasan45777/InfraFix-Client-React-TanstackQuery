import React from "react";
import { FaClock, FaEye, FaCity, FaDatabase } from "react-icons/fa";

const WhyInfraFix = () => {
  return (
    <section className="bg-base-200 py-20 mt-24 rounded-3xl">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800">
            Why InfraFix Matters
          </h2>
          <p className="mt-4 text-gray-500 max-w-3xl mx-auto">
            InfraFix bridges the gap between citizens and municipal services,
            ensuring faster responses, accountability, and smarter cities.
          </p>
        </div>

        {/* Points */}
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          <div className="bg-white p-6 rounded-xl shadow-sm text-center">
            <FaClock className="text-primary text-3xl mx-auto mb-4" />
            <h3 className="font-semibold text-gray-800 mb-2">
              Faster Resolution
            </h3>
            <p className="text-sm text-gray-600">
              Reduces delays by creating a direct digital pipeline to
              responsible authorities.
            </p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm text-center">
            <FaEye className="text-primary text-3xl mx-auto mb-4" />
            <h3 className="font-semibold text-gray-800 mb-2">Transparency</h3>
            <p className="text-sm text-gray-600">
              Citizens can track issue progress from submission to resolution.
            </p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm text-center">
            <FaCity className="text-primary text-3xl mx-auto mb-4" />
            <h3 className="font-semibold text-gray-800 mb-2">Smarter Cities</h3>
            <p className="text-sm text-gray-600">
              Data-driven insights help governments improve infrastructure
              planning.
            </p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm text-center">
            <FaDatabase className="text-primary text-3xl mx-auto mb-4" />
            <h3 className="font-semibold text-gray-800 mb-2">
              Centralized System
            </h3>
            <p className="text-sm text-gray-600">
              All infrastructure issues are managed in one unified platform.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyInfraFix;
