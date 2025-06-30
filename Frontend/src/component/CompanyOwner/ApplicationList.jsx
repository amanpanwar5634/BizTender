import React from "react";
import { applicationsDummyData } from "../../assets/assets";
import { motion } from "framer-motion";

export default function ApplicationList() {
  const applications = applicationsDummyData;

  return (
    <motion.div
      className="max-w-7xl mx-auto mt-12 px-4 sm:px-6 lg:px-8"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <motion.h2
        className="text-4xl font-extrabold text-blue-900 mb-10 text-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        📄 Manage Applications
      </motion.h2>

      <motion.div
        className="overflow-x-auto bg-white shadow-xl rounded-xl border border-gray-200"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        <table className="min-w-full text-sm text-left text-gray-800">
          <thead className="bg-blue-50 text-blue-700 uppercase text-xs tracking-wide">
            <tr>
              <th className="px-6 py-4">Tender</th>
              <th className="px-6 py-4">Company</th>
              <th className="px-6 py-4">Proposal Amount</th>
              <th className="px-6 py-4">Status</th>
              <th className="px-6 py-4">Submitted At</th>
            </tr>
          </thead>
          <tbody>
            {applications.map((app, index) => (
              <motion.tr
                key={app._id}
                className="border-t hover:bg-blue-50 transition"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 + index * 0.05 }}
              >
                <td className="px-6 py-4">{app.tender.title}</td>
                <td className="px-6 py-4">{app.company.name}</td>
                <td className="px-6 py-4 font-semibold text-green-600">
                  ₹{app.proposalAmount.toLocaleString()}
                </td>
                <td className="px-6 py-4">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-semibold ${
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
                <td className="px-6 py-4">
                  {new Date(app.submittedAt).toLocaleDateString()}
                </td>
              </motion.tr>
            ))}
            {applications.length === 0 && (
              <tr>
                <td colSpan="5" className="text-center py-6 text-gray-400">
                  No applications found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </motion.div>
    </motion.div>
  );
}
