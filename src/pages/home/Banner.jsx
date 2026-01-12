import React, { useEffect, useRef } from "react";
import { Link } from "react-router";
import { FaExclamationTriangle, FaMapMarkedAlt } from "react-icons/fa";
import { motion } from "framer-motion";
import { gsap } from "gsap";

const Banner = () => {
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);
  const glowRef = useRef(null);

  useEffect(() => {
    const tl = gsap.timeline();

    // Animate the background glow with more dynamic movement
    gsap.to(glowRef.current, {
      scale: 1.3,
      opacity: 0.4,
      duration: 4,
      repeat: -1,
      yoyo: true,
      ease: "power2.inOut",
    });

    // Add rotation to the glow
    gsap.to(glowRef.current, {
      rotation: 360,
      duration: 20,
      repeat: -1,
      ease: "none",
    });

    // Animate title letters (initial load only)
    tl.fromTo(
      titleRef.current.children,
      {
        y: 100,
        opacity: 0,
        rotationX: 90,
      },
      {
        y: 0,
        opacity: 1,
        rotationX: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: "back.out(1.7)",
      }
    );

    // Animate subtitle (initial load only)
    tl.fromTo(
      subtitleRef.current,
      {
        y: 50,
        opacity: 0,
      },
      {
        y: 0,
        opacity: 1,
        duration: 0.6,
        ease: "power2.out",
      },
      "-=0.3"
    );
  }, []);

  // Framer Motion variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.6,
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  const cardVariants = {
    hidden: {
      x: 100,
      opacity: 0,
      rotateY: 45,
    },
    visible: {
      x: 0,
      opacity: 1,
      rotateY: 0,
      transition: {
        duration: 0.8,
        delay: 0.5,
        ease: "back.out(1.7)",
      },
    },
  };

  return (
    <motion.section
      className="relative overflow-hidden bg-gradient-to-br from-primary via-primary/90 to-secondary/80 rounded-3xl"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      style={{
        background:
          "linear-gradient(135deg, #f1dec9 0%, rgba(241, 222, 201, 0.9) 50%, rgba(164, 144, 124, 0.8) 100%)",
      }}
    >
      {/* Background Glow */}
      <div
        ref={glowRef}
        className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_top_left,white,transparent_60%)]"
      />

      {/* Floating Elements */}
      <motion.div
        className="absolute top-20 left-10 w-4 h-4 bg-white/30 rounded-full"
        animate={{
          y: [-20, 20, -20],
          x: [-10, 10, -10],
          scale: [1, 1.2, 1],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      <motion.div
        className="absolute top-40 right-20 w-6 h-6 bg-white/20 rounded-full"
        animate={{
          y: [20, -20, 20],
          x: [10, -10, 10],
          scale: [1.2, 1, 1.2],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1,
        }}
      />

      <motion.div
        className="absolute bottom-20 left-1/4 w-3 h-3 bg-white/25 rounded-full"
        animate={{
          y: [-15, 15, -15],
          x: [-5, 5, -5],
          opacity: [0.3, 0.7, 0.3],
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 2,
        }}
      />

      <motion.div
        className="absolute top-1/3 right-10 w-2 h-2 bg-white/40 rounded-full"
        animate={{
          y: [10, -10, 10],
          scale: [1, 1.5, 1],
          opacity: [0.4, 0.8, 0.4],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 0.5,
        }}
      />

      <div className="relative max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left Content */}
          <motion.div
            className="text-center lg:text-left text-black space-y-8"
            variants={itemVariants}
          >
            <h1
              ref={titleRef}
              className="text-4xl sm:text-5xl xl:text-6xl font-extrabold leading-tight"
            >
              <span className="inline-block">Report.</span>{" "}
              <span className="inline-block">Track.</span>
              <br />
              <span className="text-warning inline-block">Fix Your City.</span>
            </h1>

            <motion.p
              ref={subtitleRef}
              className="text-secondary text-base sm:text-lg max-w-xl mx-auto lg:mx-0"
              variants={itemVariants}
            >
              InfraFix empowers citizens to report real-world public issues like
              potholes, broken streetlights, water leaks, and more — ensuring
              faster response and transparent resolution.
            </motion.p>

            {/* CTA Buttons */}
          </motion.div>

          {/* Right Visual */}
          <div className="hidden lg:flex justify-center">
            <motion.div
              className="relative w-full max-w-md"
              variants={cardVariants}
            >
              <motion.div
                className="absolute -inset-4 bg-white/10 rounded-3xl blur-xl"
                animate={{
                  scale: [1, 1.1, 1],
                  rotate: [0, 2, -2, 0],
                  opacity: [0.1, 0.2, 0.1],
                }}
                transition={{
                  duration: 6,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
              <motion.div
                className="relative bg-white/10 backdrop-blur-md border border-white/20 rounded-3xl p-8 text-black space-y-4"
                whileHover={{
                  scale: 1.02,
                  boxShadow: "0 20px 40px rgba(0,0,0,0.1)",
                }}
                transition={{ duration: 0.3 }}
              >
                <motion.h3
                  className="text-xl font-semibold"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8, duration: 0.5 }}
                >
                  Why InfraFix?
                </motion.h3>
                <motion.ul
                  className="space-y-3 text-sm"
                  initial="hidden"
                  animate="visible"
                  variants={{
                    visible: {
                      transition: {
                        staggerChildren: 0.1,
                        delayChildren: 1,
                      },
                    },
                  }}
                >
                  {[
                    "✔ Faster issue resolution",
                    "✔ Transparent tracking",
                    "✔ Data-driven city planning",
                    "✔ Citizen-government collaboration",
                  ].map((item, index) => (
                    <motion.li
                      key={index}
                      variants={{
                        hidden: { opacity: 0, x: -20 },
                        visible: { opacity: 1, x: 0 },
                      }}
                      whileHover={{ x: 5 }}
                      transition={{ duration: 0.2 }}
                    >
                      {item}
                    </motion.li>
                  ))}
                </motion.ul>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>
    </motion.section>
  );
};

export default Banner;
