import React from "react";
import { dashboardDummyData } from "../../assets/assets";
import { motion } from "framer-motion";
import CountUp from "react-countup";

export default function Dashboard() {
  const { totalTenders, totalCompanies, totalApplications, totalBudget, applications } =
    dashboardDummyData;

  return (
    <motion.div
      className="space-y-10 p-6 sm:p-10 bg-gradient-to-br from-blue-50 to-blue-100 min-h-screen"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
    >
      {/* Title */}
      <motion.h1
        className="text-4xl font-bold text-blue-900"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        Tender Dashboard Overview
      </motion.h1>

      {/* Stat Cards */}
      <motion.div
        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6"
        initial="hidden"
        animate="visible"
        variants={{ visible: { transition: { staggerChildren: 0.2 } } }}
      >
        {/* Tenders */}
        <motion.div
          className="bg-white shadow-xl hover:shadow-2xl p-6 rounded-xl border-l-4 border-blue-400"
          variants={{ hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0 } }}
        >
          <p className="text-sm text-gray-500 mb-1">Total Tenders</p>
          <h2 className="text-3xl font-bold text-blue-600">
            <CountUp end={totalTenders} duration={1.5} />
          </h2>
        </motion.div>

        {/* Companies */}
        <motion.div
          className="bg-white shadow-xl hover:shadow-2xl p-6 rounded-xl border-l-4 border-green-400"
          variants={{ hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0 } }}
        >
          <p className="text-sm text-gray-500 mb-1">Total Companies</p>
          <h2 className="text-3xl font-bold text-green-600">
            <CountUp end={totalCompanies} duration={1.5} />
          </h2>
        </motion.div>

        {/* Applications */}
        <motion.div
          className="bg-white shadow-xl hover:shadow-2xl p-6 rounded-xl border-l-4 border-purple-400"
          variants={{ hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0 } }}
        >
          <p className="text-sm text-gray-500 mb-1">Total Applications</p>
          <h2 className="text-3xl font-bold text-purple-600">
            <CountUp end={totalApplications} duration={1.5} />
          </h2>
        </motion.div>

        {/* Budget */}
        <motion.div
          className="bg-white shadow-xl hover:shadow-2xl p-6 rounded-xl border-l-4 border-yellow-400"
          variants={{ hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0 } }}
        >
          <p className="text-sm text-gray-500 mb-1">Total Budget</p>
          <h2 className="text-3xl font-bold text-yellow-600">
            ₹<CountUp end={totalBudget} duration={1.5} separator="," />
          </h2>
        </motion.div>
      </motion.div>

      {/* Applications Table */}
      <motion.div
        className="bg-white rounded-xl shadow-lg p-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        <h2 className="text-xl font-semibold text-blue-800 mb-4">Recent Applications</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white text-sm text-gray-700 rounded-md">
            <thead className="bg-blue-100 text-blue-800 font-semibold">
              <tr>
                <th className="px-4 py-3 text-left">Tender</th>
                <th className="px-4 py-3 text-left">Company</th>
                <th className="px-4 py-3 text-left">Proposal Amount</th>
                <th className="px-4 py-3 text-left">Status</th>
              </tr>
            </thead>
            <tbody>
              {applications.length > 0 ? (
                applications.map((app, index) => (
                  <motion.tr
                    key={index}
                    className="border-t hover:bg-blue-50 transition duration-200"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: index * 0.05 }}
                  >
                    <td className="px-4 py-3">{app.tender.title}</td>
                    <td className="px-4 py-3">{app.company.name}</td>
                    <td className="px-4 py-3">₹{app.proposalAmount.toLocaleString()}</td>
                    <td className="px-4 py-3">
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-medium ${
                          app.status === "pending"
                            ? "bg-yellow-100 text-yellow-700"
                            : app.status === "approved"
                            ? "bg-green-100 text-green-700"
                            : "bg-red-100 text-red-700"
                        }`}
                      >
                        {app.status}
                      </span>
                    </td>
                  </motion.tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4" className="text-center py-6 text-gray-400">
                    No applications found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </motion.div>
    </motion.div>
  );
}
