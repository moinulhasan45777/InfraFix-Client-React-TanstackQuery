import { useState } from "react";
import { motion } from "framer-motion";
import { FaEnvelope, FaCheckCircle } from "react-icons/fa";

const Newsletter = () => {
  const [email, setEmail] = useState("");
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email) return;

    setIsLoading(true);

    // Simulate API call
    setTimeout(() => {
      setIsSubscribed(true);
      setIsLoading(false);
      setEmail("");
    }, 1500);
  };

  const benefits = [
    "Weekly infrastructure updates",
    "Community success stories",
    "New feature announcements",
    "City improvement insights",
  ];

  return (
    <section className="py-20 bg-gradient-to-r from-primary via-primary/90 to-secondary/80 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 left-10 w-32 h-32 bg-white rounded-full blur-xl"></div>
        <div className="absolute bottom-10 right-10 w-40 h-40 bg-white rounded-full blur-xl"></div>
        <div className="absolute top-1/2 left-1/3 w-24 h-24 bg-white rounded-full blur-lg"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left Content */}
          <motion.div
            className="text-center lg:text-left"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center justify-center w-16 h-16 bg-white/20 rounded-full mb-6">
              <FaEnvelope className="text-2xl text-white" />
            </div>

            <h2 className="text-3xl md:text-4xl font-bold text-black mb-4">
              Stay Updated with InfraFix
            </h2>

            <p className="text-secondary text-lg mb-8 max-w-lg">
              Get the latest updates on infrastructure improvements, community
              initiatives, and platform features delivered to your inbox.
            </p>

            {/* Benefits List */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
              {benefits.map((benefit, index) => (
                <motion.div
                  key={index}
                  className="flex items-center text-black"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                >
                  <FaCheckCircle className="text-white mr-3 text-sm" />
                  <span className="text-sm font-medium">{benefit}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Right Content - Newsletter Form */}
          <motion.div
            className="bg-white/10 backdrop-blur-md border border-white/20 rounded-3xl p-8"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {!isSubscribed ? (
              <>
                <h3 className="text-2xl font-bold text-black mb-6 text-center">
                  Join Our Newsletter
                </h3>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="relative">
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Enter your email address"
                      className="w-full px-4 py-4 bg-white/80 border border-white/30 rounded-xl focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-transparent text-gray-800 placeholder-gray-500"
                      required
                    />
                    <FaEnvelope className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  </div>

                  <motion.button
                    type="submit"
                    disabled={isLoading}
                    className="w-full bg-secondary text-white py-4 rounded-xl font-semibold hover:bg-secondary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    whileHover={{ scale: isLoading ? 1 : 1.02 }}
                    whileTap={{ scale: isLoading ? 1 : 0.98 }}
                  >
                    {isLoading ? (
                      <div className="flex items-center justify-center">
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                        Subscribing...
                      </div>
                    ) : (
                      "Subscribe Now"
                    )}
                  </motion.button>
                </form>

                <p className="text-xs text-black/70 text-center mt-4">
                  No spam, unsubscribe at any time. We respect your privacy.
                </p>
              </>
            ) : (
              <motion.div
                className="text-center py-8"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
              >
                <motion.div
                  className="inline-flex items-center justify-center w-16 h-16 bg-green-500 rounded-full mb-4"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                >
                  <FaCheckCircle className="text-2xl text-white" />
                </motion.div>

                <h3 className="text-2xl font-bold text-black mb-2">
                  Welcome Aboard!
                </h3>

                <p className="text-secondary">
                  Thank you for subscribing. You'll receive our next newsletter
                  soon!
                </p>

                <motion.button
                  onClick={() => setIsSubscribed(false)}
                  className="mt-4 text-sm text-black/70 hover:text-black underline"
                  whileHover={{ scale: 1.05 }}
                >
                  Subscribe another email
                </motion.button>
              </motion.div>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Newsletter;
