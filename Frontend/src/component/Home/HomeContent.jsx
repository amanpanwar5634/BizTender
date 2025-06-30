 

import React, { useState } from "react";
import { motion } from "framer-motion";
export default function HomeContent() {
//   const { navigate } = useAppContext();

  const [budgetMin, setBudgetMin] = useState("");
  const [budgetMax, setBudgetMax] = useState("");
  const [industry, setIndustry] = useState("");

  const onSearch = (e) => {
    e.preventDefault();
  // Example: route to /tenders page with query params or call your API
    console.log({
      budgetMin,
      budgetMax,
      industry,
    });
  };

  return (
    <div
      className="hero min-h-screen sm:h-[90vh] bg-cover bg-center"
      style={{
        backgroundImage:
          "url(https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=1350&q=80)",
      }}
    >
      <div className="hero-overlay bg-black bg-opacity-60 flex items-center h-full px-4 sm:px-6 md:px-20">
        <div className="mt-16 md:mt-4 flex flex-col md:flex-row justify-between items-center w-full max-w-screen-2xl mx-auto gap-6 sm:gap-10">
          
          {/* Left Content */}
          <motion.div
            className="text-white max-w-xl text-center md:text-left"
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.7 }}
          >
            <motion.div
              className="inline-block bg-yellow-400 text-black font-semibold px-3 py-1 rounded-full mb-3 text-xs sm:text-sm shadow-md"
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.3 }}
            >
              📑 Find & Win New B2B Opportunities
            </motion.div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold mb-3 leading-snug drop-shadow">
              Discover & Apply for Tenders on BizTender
            </h1>
            <p className="text-sm sm:text-base font-light mb-4">
              Search tenders by industry and budget range. Grow your business by connecting with verified opportunities.
            </p>
            <motion.a
              href="/register"
              whileHover={{ scale: 1.05 }}
              className="inline-block bg-yellow-400 hover:bg-yellow-500 text-black font-semibold py-2 px-5 rounded-lg transition duration-300 shadow-lg text-sm sm:text-base"
            >
              Register Company
            </motion.a>
          </motion.div>

          {/* Find Tenders Form */}
          <motion.div
            className="bg-white bg-opacity-90 backdrop-blur-lg p-4 sm:p-6 rounded-lg shadow-2xl w-full max-w-md sm:max-w-sm"
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.3 }}
          >
            <h2 className="text-lg sm:text-xl font-bold mb-3 text-gray-800">
              Find Tenders
            </h2>
            <form className="space-y-3 sm:space-y-4" onSubmit={onSearch}>
              {/* Budget Min */}
              <div>
                <label className="block text-xs sm:text-sm font-medium text-gray-700">
                  Budget Min ($)
                </label>
                <input
                  type="number"
                  min="0"
                  placeholder="Minimum Budget"
                  value={budgetMin}
                  onChange={(e) => setBudgetMin(e.target.value)}
                  className="w-full mt-1 px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-400 focus:outline-none"
                />
              </div>

              {/* Budget Max */}
              <div>
                <label className="block text-xs sm:text-sm font-medium text-gray-700">
                  Budget Max ($)
                </label>
                <input
                  type="number"
                  min="0"
                  placeholder="Maximum Budget"
                  value={budgetMax}
                  onChange={(e) => setBudgetMax(e.target.value)}
                  className="w-full mt-1 px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-400 focus:outline-none"
                />
              </div>

              {/* Industry */}
              <div>
                <label className="block text-xs sm:text-sm font-medium text-gray-700">
                  Industry
                </label>
                <select
                  value={industry}
                  onChange={(e) => setIndustry(e.target.value)}
                  className="w-full mt-1 px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-400 focus:outline-none"
                >
                  <option value="">All Industries</option>
                  <option value="Construction">Construction</option>
                  <option value="IT Services">IT Services</option>
                  <option value="Manufacturing">Manufacturing</option>
                  <option value="Logistics">Logistics</option>
                  <option value="Healthcare">Healthcare</option>
                </select>
              </div>

              <motion.button
                type="submit"
                whileTap={{ scale: 0.97 }}
                whileHover={{ scale: 1.02 }}
                className="w-full bg-yellow-400 hover:bg-yellow-500 text-black font-semibold py-2 px-4 text-sm sm:text-base rounded-lg transition duration-300"
              >
                Search Tenders
              </motion.button>
            </form>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
