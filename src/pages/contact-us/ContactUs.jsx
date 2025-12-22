import React from "react";

const ContactUs = () => {
  return (
    <div className="bg-gray-50 min-h-screen text-gray-800">
      {/* Hero Section */}
      <section className="bg-primary text-black py-16">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Contact InfraFix
          </h1>
          <p className="text-lg md:text-xl">
            Have questions, suggestions, or need support? Reach out to us and
            we'll help you.
          </p>
        </div>
      </section>

      {/* Main Info Section */}
      <section className="max-w-4xl mx-auto px-4 py-16 space-y-12">
        <div>
          <h2 className="text-3xl font-bold mb-4">Get in Touch</h2>
          <p className="mb-6">
            InfraFix is here to make city infrastructure management easier and
            more transparent. Whether you have a question, feedback, or an issue
            to report, our team is ready to assist.
          </p>
          <div className="bg-white rounded-xl shadow-lg p-6 space-y-4">
            <p>
              <span className="font-semibold">Email:</span> support@infrafix.com
            </p>
            <p>
              <span className="font-semibold">Phone:</span> +1 234 567 890
            </p>
            <p>
              <span className="font-semibold">Address:</span> 123 City Road,
              Metropolis
            </p>
            <p className="text-gray-500 text-sm mt-2">
              Our support team is available Monday to Friday, 9:00 AM to 6:00
              PM.
            </p>
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center">
          <h2 className="text-3xl font-bold mb-3">Want to Report an Issue?</h2>
          <p className="mb-6">
            Join InfraFix and help improve city infrastructure efficiently.
          </p>
          <button className="btn btn-secondary px-8 py-3 rounded-lg text-lg">
            Report an Issue
          </button>
        </div>
      </section>
    </div>
  );
};

export default ContactUs;
