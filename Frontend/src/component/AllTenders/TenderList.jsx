import React from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

export default function TenderList({ data }) {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col gap-6 p-4 max-w-full">
      {data.map((tender, index) => {
        const today = new Date();
        const deadlineDate = new Date(tender.deadline);
        const isDeadlinePassed = today > deadlineDate;

        // Smart status: closed if deadline passed
        const isTenderOpen = tender.isOpen && !isDeadlinePassed;

        return (
          <motion.div
            key={tender._id}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="w-full max-w-[900px] mx-auto bg-white dark:bg-slate-900 rounded-xl shadow-lg p-6 flex flex-col gap-4 border border-gray-200 dark:border-slate-700 hover:shadow-2xl hover:border-primary-500 transition duration-300 cursor-pointer"
            onClick={() => navigate(`/tenders/${tender._id}`)}
          >
            {/* Tender Header */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-2">
              <div>
                <h2 className="text-2xl font-bold text-slate-800 dark:text-white mb-1">
                  {tender.title}
                </h2>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {tender.location} &middot; Industry:{" "}
                  <span className="font-medium">{tender.industry}</span>
                </p>
              </div>
              <div className="mt-2 md:mt-0">
                <span className="bg-yellow-400 text-black px-4 py-1 rounded-full text-sm font-semibold shadow">
                  ₹{tender.budget.toLocaleString()}
                </span>
              </div>
            </div>

            {/* Description Snippet */}
            <p className="text-gray-700 dark:text-gray-300 text-sm mt-2 line-clamp-3">
              {tender.description}
            </p>

            {/* Extra Info */}
            <div className="flex justify-between items-center mt-4">
              <p className="text-xs text-gray-500 dark:text-gray-400">
                Deadline:{" "}
                <span className="font-medium">
                  {deadlineDate.toLocaleDateString()}
                </span>
              </p>
              <span
                className={`px-3 py-1 rounded-full text-xs font-semibold shadow ${
                  isTenderOpen
                    ? "bg-green-100 text-green-700"
                    : "bg-red-100 text-red-600"
                }`}
              >
                {isTenderOpen ? "Open" : "Closed"}
              </span>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}
