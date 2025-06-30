import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

export default function TenderCard({ tender }) {
  return (
    <motion.div
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      className="mt-4 mb-6"
      whileHover={{ scale: 1.02 }}
      transition={{ type: "spring", stiffness: 200, damping: 20 }}
    >
      <Link to={`/tenders/${tender._id}`}>
        <div className="bg-white dark:bg-slate-900 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg p-6 w-full max-w-4xl mx-auto">
          {/* Tender Header */}
          <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4 mb-4">
            <div>
              <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
                {tender.title}
              </h2>
              <p className="text-sm text-gray-500 dark:text-gray-300">
                {tender.company?.name} • {tender.industry} • {tender.location}
              </p>
            </div>
            <div className="flex flex-col md:items-end">
              <span className="text-lg font-semibold text-green-700 dark:text-green-400">
                Budget: ₹{tender.budget.toLocaleString()}
              </span>
              <span className="text-xs text-gray-500">
                Deadline: {new Date(tender.deadline).toLocaleDateString()}
              </span>
            </div>
          </div>

          {/* Description */}
          <p className="text-gray-700 dark:text-gray-300 mb-4">
            {tender.description}
          </p>

          {/* Requirements */}
          {tender.requirements && tender.requirements.length > 0 && (
            <div className="mb-4">
              <h3 className="font-semibold text-gray-800 dark:text-white mb-1">
                Requirements:
              </h3>
              <ul className="list-disc list-inside text-sm text-gray-600 dark:text-gray-300">
                {tender.requirements.map((req, idx) => (
                  <li key={idx}>{req}</li>
                ))}
              </ul>
            </div>
          )}

          {/* Call to Action */}
          <div className="mt-4">
            <button className="w-full md:w-auto px-5 py-2 rounded-md bg-yellow-400 text-black font-semibold hover:bg-yellow-500 transition">
              View Details & Apply
            </button>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
