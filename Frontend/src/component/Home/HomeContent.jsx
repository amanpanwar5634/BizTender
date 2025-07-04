import React, { useState } from "react";
import { useAppContext } from "../context/context";
import { motion } from "framer-motion";
import { FaSearch, FaIndustry } from "react-icons/fa";

export default function HomeContent() {
  const { navigate, getToken, axios, setSearchedIndustries, toast,searchedIndustries } = useAppContext();
  const [industry, setIndustry] = useState("");
  const [keyword, setKeyword] = useState("");

  const onSearch = async (e) => {
    e.preventDefault();
    navigate(`/tenders?industry=${industry}&keyword=${keyword}`);

    try {
   await axios.post( "/api/user/store-recent-search",{ recentSearchedIndustry: industry },
    { headers: { Authorization: `Bearer ${await getToken()}` } }
      );
      setSearchedIndustries((prev) => {
        const updated = [...prev, industry];
        if (updated.length > 5) updated.shift();
        return updated;
      });
    } catch (err) {
      console.log("Error storing recent search:", err.message);
      toast?.error("Failed to store recent search");
    }
  };

  return (
    <section className="min-h-screen flex flex-col items-center justify-center px-4 py-16 bg-gradient-to-br from-emerald-50 to-blue-50">
      {/* Headline */}
      <motion.div
        className="text-center max-w-3xl mb-12"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
      >
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-gray-900 mb-4">
          Discover & Win Verified{" "}
          <span className="text-emerald-600">Tenders</span>
        </h1>
        <p className="text-gray-700 text-base sm:text-lg">
          Search by industry and keywords. Expand your business with trusted B2B opportunities.
        </p>
      </motion.div>

      {/* Search Card */}
      <motion.div
        className="w-full max-w-xl bg-white/90 backdrop-blur-md border border-gray-200 shadow-2xl rounded-3xl p-8"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.2 }}
      >
        <h2 className="text-2xl font-bold mb-6 text-emerald-700 text-center">
          Find Tenders by Industry & Keyword
        </h2>
        <form onSubmit={onSearch} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Select Industry
            </label>
            <div className="relative">
              <FaIndustry className="absolute top-1/2 left-3 transform -translate-y-1/2 text-gray-400" />
              <select
                value={industry}
                onChange={(e) => setIndustry(e.target.value)}
                className="w-full pl-10 pr-4 py-3 text-sm border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-400 focus:outline-none"
              >
                <option value="">All Industries</option>
                <option value="Construction">Construction</option>
                <option value="IT Services">IT Services</option>
                <option value="Manufacturing">Manufacturing</option>
                <option value="Logistics">Logistics</option>
                <option value="Healthcare">Healthcare</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Keywords (optional)
            </label>
            <div className="relative">
              <FaSearch className="absolute top-1/2 left-3 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
                placeholder="E.g. software, roads, equipment"
                className="w-full pl-10 pr-4 py-3 text-sm border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-400 focus:outline-none"
              />
            </div>
          </div>

          <motion.button
            type="submit"
            whileTap={{ scale: 0.98 }}
            whileHover={{ scale: 1.02 }}
            className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-3 rounded-xl transition duration-300"
          >
            Search Tenders
          </motion.button>
        </form>

        {/* Example: animated recent searches */}
        <div className="mt-6">
          <h3 className="text-sm font-semibold text-gray-600 mb-2">
            Recent Searches Industries:
          </h3>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="flex flex-wrap gap-2"
          >
            {/* Replace with your real `searchedIndustries` */}
            {searchedIndustries.map((tag, i) => (
              <button
                key={i}
                onClick={() => setIndustry(tag)}
                className="bg-emerald-100 text-emerald-800 px-3 py-1 rounded-full text-xs hover:bg-emerald-200 transition"
              >
                {tag}
              </button>
            ))}
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
