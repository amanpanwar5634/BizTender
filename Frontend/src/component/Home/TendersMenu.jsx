import React from "react";
import { motion } from "framer-motion";
import TenderCard from "../TenderCard";
import { useNavigate } from "react-router-dom";
import { useAppContext } from "../context/context";

export default function TendersMenu() {
  const { tenders } = useAppContext();
  const navigate = useNavigate();

  return (
    <motion.section
      className="max-w-screen-2xl container mx-auto px-4 md:px-10 py-16"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      {/* Header */}
      <motion.div
        className="text-center mb-14"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1, duration: 0.5 }}
      >
        <h1 className="text-3xl md:text-5xl font-extrabold text-gray-900 dark:text-white">
          Open <span className="text-emerald-600">Tenders</span> for Your Business
        </h1>
        <p className="mt-4 text-gray-600 dark:text-gray-300 max-w-2xl mx-auto text-lg">
          Browse verified tenders from trusted companies. Find the right opportunities to grow.
        </p>
      </motion.div>

      {/* Tenders List */}
      {tenders && tenders.length > 0 ? (
        <motion.div
          className="grid gap-8 md:grid-cols-2"
          initial="hidden"
          animate="visible"
          variants={{
            hidden: {},
            visible: {
              transition: { staggerChildren: 0.1 },
            },
          }}
        >
          {tenders.slice(0, 6).map((tender) => (
            <TenderCard key={tender._id} tender={tender} />
          ))}
        </motion.div>
      ) : (
        <div className="text-center mt-16 text-xl text-gray-600 dark:text-gray-400">
          No tenders available at the moment. Please check back soon!
        </div>
      )}

      {/* View All */}
      {tenders && tenders.length > 0 && (
        <motion.div
          className="text-center mt-14"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
        >
          <button
            onClick={() => navigate("/tenders")}
            className="bg-emerald-600 hover:bg-emerald-700 text-white font-semibold px-8 py-3 rounded-full shadow-md hover:shadow-lg transition duration-300"
          >
            View All Tenders →
          </button>
        </motion.div>
      )}
    </motion.section>
  );
}
