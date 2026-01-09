import logo from "../assets/Logo.png";
import { FaPhone, FaEnvelope, FaMapMarkerAlt, FaClock } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-primary text-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <img src={logo} alt="InfraFix Logo" className="w-32" />
            <p className="text-secondary leading-relaxed">
              <b>InfraFix</b> - Making public infrastructure accountability
              simple. Empowering citizens to create positive change in their
              communities.
            </p>
          </div>

          {/* Contact Information */}
          <div className="space-y-4">
            <h6 className="text-lg font-bold text-black mb-4">Contact Us</h6>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <FaPhone className="text-secondary flex-shrink-0" />
                <span className="text-sm">+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center space-x-3">
                <FaEnvelope className="text-secondary flex-shrink-0" />
                <span className="text-sm">support@infrafix.com</span>
              </div>
              <div className="flex items-start space-x-3">
                <FaMapMarkerAlt className="text-secondary flex-shrink-0 mt-1" />
                <span className="text-sm">
                  123 Innovation Drive
                  <br />
                  Tech City, TC 12345
                  <br />
                  United States
                </span>
              </div>
              <div className="flex items-center space-x-3">
                <FaClock className="text-secondary flex-shrink-0" />
                <span className="text-sm">Mon - Fri: 9:00 AM - 6:00 PM</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h6 className="text-lg font-bold text-black mb-4">Quick Links</h6>
            <div className="space-y-2">
              <a
                href="/about-us"
                className="block text-sm text-secondary hover:text-black transition-colors"
              >
                About Us
              </a>
              <a
                href="/all-issues"
                className="block text-sm text-secondary hover:text-black transition-colors"
              >
                All Issues
              </a>
              <a
                href="/contact-us"
                className="block text-sm text-secondary hover:text-black transition-colors"
              >
                Contact Us
              </a>
            </div>
          </div>

          {/* Social Media */}
          <div className="space-y-4">
            <h6 className="text-lg font-bold text-black mb-4">Follow Us</h6>
            <div className="flex space-x-4">
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 bg-secondary/20 rounded-full hover:bg-secondary/30 transition-colors"
                aria-label="Follow us on Twitter"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  className="fill-current text-secondary"
                >
                  <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"></path>
                </svg>
              </a>

              <a
                href="https://youtube.com"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 bg-secondary/20 rounded-full hover:bg-secondary/30 transition-colors"
                aria-label="Subscribe to our YouTube channel"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  className="fill-current text-secondary"
                >
                  <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"></path>
                </svg>
              </a>

              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 bg-secondary/20 rounded-full hover:bg-secondary/30 transition-colors"
                aria-label="Like us on Facebook"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  className="fill-current text-secondary"
                >
                  <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"></path>
                </svg>
              </a>

              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 bg-secondary/20 rounded-full hover:bg-secondary/30 transition-colors"
                aria-label="Connect with us on LinkedIn"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  className="fill-current text-secondary"
                >
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"></path>
                </svg>
              </a>
            </div>

            <p className="text-xs text-secondary mt-4">
              Stay connected for updates on infrastructure improvements and
              community initiatives.
            </p>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-secondary/20 mt-8 pt-6">
          <div className="text-center">
            <p className="text-sm text-secondary">
              © 2024 InfraFix. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
