import { motion } from "framer-motion";
import { FaStar, FaQuoteLeft } from "react-icons/fa";

const Testimonials = () => {
  const testimonials = [
    {
      id: 1,
      name: "Sarah Johnson",
      role: "City Resident",
      location: "Downtown District",
      image:
        "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face",
      rating: 5,
      text: "InfraFix made it so easy to report the pothole on my street. Within a week, it was fixed! The transparency in tracking the progress was amazing.",
    },
    {
      id: 2,
      name: "Michael Chen",
      role: "Business Owner",
      location: "Commercial Area",
      image:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
      rating: 5,
      text: "As a business owner, broken streetlights were affecting my customers. InfraFix helped me report it efficiently, and the city responded quickly.",
    },
    {
      id: 3,
      name: "Emily Rodriguez",
      role: "Community Leader",
      location: "Residential Zone",
      image:
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
      rating: 5,
      text: "The platform brings our community together. We can see what issues others are facing and support each other by upvoting important problems.",
    },
  ];

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
    hidden: { y: 50, opacity: 0 },
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
    <section className="py-20 bg-gradient-to-br from-secondary/10 via-primary/20 to-secondary/10">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        {/* Section Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
            What Our Community Says
          </h2>
          <p className="text-secondary text-lg max-w-2xl mx-auto">
            Real stories from citizens who have used InfraFix to make their
            neighborhoods better
          </p>
        </motion.div>

        {/* Testimonials Grid */}
        <motion.div
          className="grid gap-8 md:grid-cols-2 lg:grid-cols-3"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {testimonials.map((testimonial) => (
            <motion.div
              key={testimonial.id}
              className="relative bg-white/80 backdrop-blur-sm border border-primary/20 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300"
              variants={itemVariants}
              whileHover={{
                scale: 1.02,
                boxShadow: "0 20px 40px rgba(164, 144, 124, 0.15)",
              }}
            >
              {/* Quote Icon */}
              <div className="absolute -top-4 left-6">
                <div className="bg-primary p-3 rounded-full shadow-md">
                  <FaQuoteLeft className="text-secondary text-lg" />
                </div>
              </div>

              {/* Rating */}
              <div className="flex items-center justify-end mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <FaStar key={i} className="text-yellow-400 text-sm" />
                ))}
              </div>

              {/* Testimonial Text */}
              <p className="text-gray-700 mb-6 leading-relaxed">
                "{testimonial.text}"
              </p>

              {/* User Info */}
              <div className="flex items-center">
                <img
                  src={testimonial.image}
                  alt={testimonial.name}
                  className="w-12 h-12 rounded-full object-cover border-2 border-primary/30"
                />
                <div className="ml-4">
                  <h4 className="font-semibold text-gray-800">
                    {testimonial.name}
                  </h4>
                  <p className="text-sm text-secondary">
                    {testimonial.role} • {testimonial.location}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Testimonials;
