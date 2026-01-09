import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaChevronDown, FaQuestionCircle } from "react-icons/fa";

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(0);

  const faqs = [
    {
      id: 1,
      question: "How do I report an infrastructure issue?",
      answer:
        "Simply create an account, click 'Report Issue', fill out the form with details and location, add photos if possible, and submit. Your report will be tracked and you'll receive updates on its progress.",
    },
    {
      id: 2,
      question: "How long does it take for issues to be resolved?",
      answer:
        "Resolution time varies depending on the issue type and severity. Minor issues like broken streetlights typically take 3-7 days, while major infrastructure problems may take several weeks. You can track progress in real-time through your dashboard.",
    },
    {
      id: 3,
      question: "Can I track the status of my reported issues?",
      answer:
        "Yes! Once you report an issue, you'll receive a unique tracking ID. You can monitor its status through your dashboard, receive email notifications for updates, and see when it moves from 'Reported' to 'In Progress' to 'Resolved'.",
    },
    {
      id: 4,
      question: "Is InfraFix free to use?",
      answer:
        "Absolutely! InfraFix is completely free for all citizens. Our platform is funded through partnerships with local governments and civic organizations to ensure everyone can participate in improving their community.",
    },
    {
      id: 5,
      question: "What types of issues can I report?",
      answer:
        "You can report various infrastructure problems including potholes, broken streetlights, water leaks, damaged sidewalks, traffic signal issues, graffiti, illegal dumping, and other public safety concerns.",
    },
    {
      id: 6,
      question: "How does the upvoting system work?",
      answer:
        "Community members can upvote issues they've also experienced or consider important. Higher upvoted issues get priority attention from city officials. This democratic approach ensures the most pressing community concerns are addressed first.",
    },
  ];

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? -1 : index);
  };

  return (
    <section className="py-16 bg-gradient-to-br from-gray-50 to-primary/10">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="inline-flex items-center justify-center w-16 h-16 bg-primary rounded-full mb-6">
            <FaQuestionCircle className="text-2xl text-secondary" />
          </div>

          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
            Frequently Asked Questions
          </h2>

          <p className="text-secondary text-lg max-w-2xl mx-auto">
            Find answers to common questions about using InfraFix to report and
            track infrastructure issues
          </p>
        </motion.div>

        {/* FAQ Items */}
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <motion.div
              key={faq.id}
              className="bg-white border border-primary/20 rounded-2xl shadow-sm hover:shadow-md transition-shadow"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
            >
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full px-6 py-5 text-left flex items-center justify-between hover:bg-primary/5 rounded-2xl transition-colors"
              >
                <h3 className="text-lg font-semibold text-gray-800 pr-4">
                  {faq.question}
                </h3>

                <motion.div
                  animate={{ rotate: openIndex === index ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                  className="flex-shrink-0"
                >
                  <FaChevronDown className="text-secondary" />
                </motion.div>
              </button>

              <AnimatePresence>
                {openIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div className="px-6 pb-5">
                      <div className="border-t border-primary/10 pt-4">
                        <p className="text-gray-600 leading-relaxed">
                          {faq.answer}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQ;
