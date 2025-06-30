import React from "react";
import { motion } from "framer-motion";
import TenderCard from "../TenderCard";
 import { useNavigate } from "react-router-dom";
 import { tendersDummyData } from "../../assets/assets";
 import { useState } from "react";
export default function TendersMenu() {
   const [tenders, setTenders] = useState(tendersDummyData);
  const navigate = useNavigate();

  return (
    <motion.div
      className="max-w-screen-2xl container mx-auto md:px-20 px-4 py-12"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      {/* Header Section */}
      <motion.div
        className="text-center mb-12"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.5 }}
      >
        <h1 className="text-3xl md:text-5xl font-bold text-slate-800 dark:text-white">
          Discover Open <span className="text-yellow-500">Tenders</span>
        </h1>
        <p className="mt-6 text-gray-600 dark:text-gray-300 max-w-2xl mx-auto text-lg">
          Explore verified opportunities from trusted companies. Find tenders that
          match your expertise and grow your business through BizTender.
        </p>
      </motion.div>

      {/* Tender Cards or No Tenders Message */}
      {tenders && tenders.length > 0 ? (
        <motion.div
          className="flex flex-col gap-6"
          initial="hidden"
          animate="visible"
          variants={{
            hidden: {},
            visible: {
              transition: {
                staggerChildren: 0.1,
              },
            },
          }}
        >
          {tenders.slice(0, 6).map((tender) => (
            <TenderCard key={tender._id} tender={tender} />
          ))}
        </motion.div>
      ) : (
        <div className="text-center mt-16 text-xl text-gray-600 dark:text-gray-300">
          No tenders available at the moment. Please check back later!
        </div>
      )}

      {/* View All Button */}
      {tenders && tenders.length > 0 && (
        <motion.div
          className="text-center mt-12"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
        >
          <button
            onClick={() => navigate("/tenders")}
            className="bg-yellow-500 hover:bg-yellow-600 text-slate-900 font-semibold px-8 py-3 rounded-full shadow-md hover:shadow-lg transition duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-yellow-400"
          >
            View All Tenders →
          </button>
        </motion.div>
      )}
    </motion.div>
  );
}
