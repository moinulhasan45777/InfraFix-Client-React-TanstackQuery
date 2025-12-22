import React from "react";
import { Link } from "react-router";
import { FaExclamationTriangle, FaMapMarkedAlt } from "react-icons/fa";

const Banner = () => {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-primary via-primary/90 to-secondary/80 rounded-3xl">
      {/* Background Glow */}
      <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_top_left,white,transparent_60%)]" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="text-center lg:text-left text-black space-y-6">
            <h1 className="text-4xl sm:text-5xl xl:text-6xl font-extrabold leading-tight">
              Report. Track.
              <br />
              <span className="text-warning">Fix Your City.</span>
            </h1>

            <p className="text-secondary text-base sm:text-lg max-w-xl mx-auto lg:mx-0">
              InfraFix empowers citizens to report real-world public issues like
              potholes, broken streetlights, water leaks, and more — ensuring
              faster response and transparent resolution.
            </p>

            {/* CTA Buttons */}
          </div>

          {/* Right Visual */}
          <div className="hidden lg:flex justify-center">
            <div className="relative w-full max-w-md">
              <div className="absolute -inset-4 bg-white/10 rounded-3xl blur-xl" />
              <div className="relative bg-white/10 backdrop-blur-md border border-white/20 rounded-3xl p-8 text-black space-y-4">
                <h3 className="text-xl font-semibold">Why InfraFix?</h3>
                <ul className="space-y-3 text-sm">
                  <li>✔ Faster issue resolution</li>
                  <li>✔ Transparent tracking</li>
                  <li>✔ Data-driven city planning</li>
                  <li>✔ Citizen-government collaboration</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Banner;
