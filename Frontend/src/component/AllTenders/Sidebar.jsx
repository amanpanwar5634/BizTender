import React from "react";
import { motion } from "framer-motion";

export default function SideBar({ filters, setFilters }) {
  const toggleFilter = (category, value) => {
    setFilters((prev) => {
      const alreadySelected = prev[category].includes(value);
      const updatedCategory = alreadySelected
        ? prev[category].filter((item) => item !== value)
        : [...prev[category], value];

      return { ...prev, [category]: updatedCategory };
    });
  };

  const setSort = (value) => {
    setFilters((prev) => ({ ...prev, sortBy: value }));
  };

  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.1 },
    }),
  };

  return (
    <div className="p-6 space-y-10 text-gray-800 bg-white rounded-xl shadow-md">
      <motion.h2
        className="text-2xl font-bold mb-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.1 }}
      >
        Filters
      </motion.h2>

      {/* Budget Range */}
      <motion.div variants={fadeInUp} initial="hidden" animate="visible" custom={1}>
        <h3 className="text-lg font-semibold mb-3">Budget Range</h3>
        <div className="space-y-2">
          {["0-50000", "50000-100000", "100000+"].map((range) => (
            <motion.label
              key={range}
              className="flex items-center gap-2 cursor-pointer hover:text-blue-600 transition"
              whileHover={{ scale: 1.02 }}
            >
              <input
                type="checkbox"
                checked={filters.budgetRange.includes(range)}
                onChange={() => toggleFilter("budgetRange", range)}
                className="accent-blue-600"
              />
              ₹{range.replace("-", " – ₹").replace("+", "+")}
            </motion.label>
          ))}
        </div>
      </motion.div>

      {/* Industries */}
      <motion.div variants={fadeInUp} initial="hidden" animate="visible" custom={2}>
        <h3 className="text-lg font-semibold mb-3">Industries</h3>
        <div className="space-y-2">
          {["Construction", "IT Services", "Healthcare", "Manufacturing"].map((industry) => (
            <motion.label
              key={industry}
              className="flex items-center gap-2 cursor-pointer hover:text-blue-600 transition"
              whileHover={{ scale: 1.02 }}
            >
              <input
                type="checkbox"
                checked={filters.industries.includes(industry)}
                onChange={() => toggleFilter("industries", industry)}
                className="accent-blue-600"
              />
              {industry}
            </motion.label>
          ))}
        </div>
      </motion.div>

      {/* Sort By */}
      <motion.div variants={fadeInUp} initial="hidden" animate="visible" custom={3}>
        <h3 className="text-lg font-semibold mb-3">Sort By</h3>
        <div className="space-y-2">
          {[
            { label: "Budget: Low to High", value: "lowToHigh" },
            { label: "Budget: High to Low", value: "highToLow" },
            { label: "Deadline", value: "deadline" },
          ].map((sort) => (
            <motion.label
              key={sort.value}
              className="flex items-center gap-2 cursor-pointer hover:text-blue-600 transition"
              whileHover={{ scale: 1.02 }}
            >
              <input
                type="radio"
                name="sort"
                checked={filters.sortBy === sort.value}
                onChange={() => setSort(sort.value)}
                className="accent-blue-600"
              />
              {sort.label}
            </motion.label>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
