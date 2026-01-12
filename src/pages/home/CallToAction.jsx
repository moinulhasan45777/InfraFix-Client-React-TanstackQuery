import { motion } from "framer-motion";
import { Link } from "react-router";
import { FaArrowRight } from "react-icons/fa";

const CallToAction = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  return (
    <section className="py-24 bg-gradient-to-br from-secondary via-secondary/90 to-primary relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-96 h-96 bg-white rounded-full blur-3xl transform -translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-white rounded-full blur-3xl transform translate-x-1/2 translate-y-1/2"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <motion.div
          className="text-center"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {/* Main Heading */}
          <motion.div variants={itemVariants} className="mb-12">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
              Ready to Make Your
              <br />
              <span className="text-primary">City Better?</span>
            </h2>

            <p className="text-xl text-white/90 max-w-3xl mx-auto leading-relaxed">
              Join thousands of citizens who are already using InfraFix to
              report issues, track progress, and create positive change in their
              communities.
            </p>
          </motion.div>

          {/* CTA Button */}
          <motion.div variants={itemVariants} className="mb-12">
            <Link to="/auth/register">
              <motion.button
                className="group bg-white text-secondary px-8 py-4 rounded-full font-bold text-lg hover:bg-white/90 transition-all duration-300 flex items-center mx-auto"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Get Started Now
                <motion.div
                  className="ml-2"
                  animate={{ x: [0, 5, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  <FaArrowRight />
                </motion.div>
              </motion.button>
            </Link>
          </motion.div>

          {/* Bottom Message */}
          <motion.div
            variants={itemVariants}
            className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 max-w-4xl mx-auto"
          >
            <h3 className="text-2xl font-bold text-white mb-4">
              Every Report Matters
            </h3>

            <p className="text-white/80 text-lg leading-relaxed mb-6">
              Your voice can spark real change. Whether it's a pothole that
              needs fixing, a streetlight that's out, or a park that needs
              attention - your reports help build stronger, safer communities
              for everyone.
            </p>

            <div className="flex flex-wrap justify-center gap-4 text-sm text-white/70">
              <span className="flex items-center">✓ Free to use forever</span>
              <span className="flex items-center">✓ Real-time tracking</span>
              <span className="flex items-center">
                ✓ Direct city communication
              </span>
              <span className="flex items-center">✓ Community-driven</span>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default CallToAction;
