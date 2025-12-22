import React from "react";
import infrastructureImg from "../../assets/authBanner.png";

const AboutUs = () => {
  return (
    <div className="bg-gray-50 min-h-screen text-gray-800">
      {/* Hero Section */}
      <section className="relative bg-primary text-black">
        <div className="max-w-7xl mx-auto px-4 py-20 flex flex-col md:flex-row items-center gap-10">
          <div className="md:w-1/2">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              About InfraFix
            </h1>
            <p className="text-lg md:text-xl leading-relaxed">
              InfraFix is a Public Infrastructure Issue Reporting System that
              enables citizens to report real-world issues such as broken
              streetlights, potholes, water leakage, garbage overflow, damaged
              footpaths, and more. Government staff and admins can manage,
              verify, assign, and resolve reported issues efficiently.
            </p>
          </div>
          <div className="md:w-1/2">
            <img
              src={infrastructureImg}
              alt="Infrastructure"
              className="rounded-xl shadow-lg w-full object-cover"
            />
          </div>
        </div>
      </section>

      {/* Problem & Solution Section */}
      <section className="max-w-7xl mx-auto px-4 py-16">
        <h2 className="text-3xl font-semibold text-center mb-10">
          Why InfraFix?
        </h2>
        <div className="grid md:grid-cols-2 gap-10">
          <div className="bg-white rounded-xl shadow p-6">
            <h3 className="text-xl font-bold mb-3">The Problem</h3>
            <p className="text-gray-600 leading-relaxed">
              Municipal services often suffer from delayed response and lack of
              tracking. Citizens have no centralized platform to report public
              issues. This leads to frustration, inefficiency, and lack of
              transparency in public service delivery.
            </p>
          </div>
          <div className="bg-white rounded-xl shadow p-6">
            <h3 className="text-xl font-bold mb-3">Our Solution</h3>
            <p className="text-gray-600 leading-relaxed">
              InfraFix improves transparency, reduces response time, helps
              collect and analyze infrastructure data, and makes city service
              delivery more efficient. Citizens can easily report issues, and
              government staff can manage and resolve them effectively.
            </p>
          </div>
        </div>
      </section>

      {/* Key Features Section */}
      <section className="bg-gray-100 py-16">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-semibold text-center mb-12">
            Key Features
          </h2>
          <div className="grid md:grid-cols-4 gap-8">
            <div className="bg-white rounded-xl shadow p-6 text-center">
              <h3 className="font-bold text-xl mb-2">Transparency</h3>
              <p className="text-gray-600 text-sm">
                Citizens can track the status of their reported issues in
                real-time.
              </p>
            </div>
            <div className="bg-white rounded-xl shadow p-6 text-center">
              <h3 className="font-bold text-xl mb-2">Faster Response</h3>
              <p className="text-gray-600 text-sm">
                Government staff can assign and resolve issues quickly.
              </p>
            </div>
            <div className="bg-white rounded-xl shadow p-6 text-center">
              <h3 className="font-bold text-xl mb-2">Data Analytics</h3>
              <p className="text-gray-600 text-sm">
                Collect and analyze infrastructure issues to make informed
                decisions.
              </p>
            </div>
            <div className="bg-white rounded-xl shadow p-6 text-center">
              <h3 className="font-bold text-xl mb-2">Efficiency</h3>
              <p className="text-gray-600 text-sm">
                Streamlined management of city services reduces delays and
                improves accountability.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="max-w-7xl mx-auto px-4 py-16 text-center">
        <h2 className="text-3xl font-bold mb-4">
          Join Us in Improving Our City
        </h2>
        <p className="text-gray-700 mb-6">
          Be part of the solution. Report issues easily and help your city run
          efficiently.
        </p>
        <button className="btn btn-primary px-8 py-3 text-lg rounded-lg">
          Report an Issue
        </button>
      </section>
    </div>
  );
};

export default AboutUs;
