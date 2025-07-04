import React, { useEffect, useState } from "react";
import { useAppContext } from "../context/context";
import { motion } from "framer-motion";
import CountUp from "react-countup";

export default function CompanyDashboard() {
  const { axios, getToken, user, toast } = useAppContext();
  const [dashboardData, setDashboardData] = useState({
    applications: [],
    totalApplications: 0,
    totalProposalAmount: 0,
  });

  const fetchData = async () => {
    try {
      const { data } = await axios.get("/api/applications/company", {
        headers: { Authorization: `Bearer ${await getToken()}` },
      });
      if (data.success) {
        setDashboardData(data.dashboardData);
      } else {
        toast.error(data.message || "Failed to fetch dashboard data.");
      }
    } catch (err) {
      console.error(err);
      toast.error(err.message || "Failed to fetch dashboard data.");
    }
  };

  useEffect(() => {
    if (user) fetchData();
  }, [user]);

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
        Company Dashboard Overview
      </motion.h1>

      {/* Stat Cards */}
      <motion.div
        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 gap-6"
        initial="hidden"
        animate="visible"
        variants={{ visible: { transition: { staggerChildren: 0.2 } } }}
      >
        {/* Total Applications */}
        <motion.div
          className="bg-white shadow-xl hover:shadow-2xl p-6 rounded-xl border-l-4 border-purple-400"
          variants={{ hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0 } }}
        >
          <p className="text-sm text-gray-500 mb-1">Total Applications</p>
          <h2 className="text-3xl font-bold text-purple-600">
            <CountUp end={dashboardData.totalApplications} duration={1.5} />
          </h2>
        </motion.div>

        {/* Total Proposal Amount */}
        <motion.div
          className="bg-white shadow-xl hover:shadow-2xl p-6 rounded-xl border-l-4 border-yellow-400"
          variants={{ hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0 } }}
        >
          <p className="text-sm text-gray-500 mb-1">Total Proposal Amount</p>
          <h2 className="text-3xl font-bold text-yellow-600">
            ₹<CountUp end={dashboardData.totalProposalAmount} duration={1.5} separator="," />
          </h2>
        </motion.div>
      </motion.div>

      {/* Applications Section */}
      <motion.div
        className="bg-white rounded-xl shadow-lg p-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        <h2 className="text-xl font-semibold text-blue-800 mb-4">
          Recent Applications
        </h2>

        {/* Desktop Table */}
        <div className="hidden md:block overflow-x-auto">
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
              {dashboardData.applications.length > 0 ? (
                dashboardData.applications.map((app, index) => (
                  <motion.tr
                    key={index}
                    className="border-t hover:bg-blue-50 transition duration-200"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: index * 0.05 }}
                  >
                    <td className="px-4 py-3">{app.tender?.title || "-"}</td>
                    <td className="px-4 py-3">{app.company?.name || "-"}</td>
                    <td className="px-4 py-3">
                      ₹{app.proposalAmount?.toLocaleString() || 0}
                    </td>
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

        {/* Mobile Cards */}
        <div className="md:hidden space-y-4">
          {dashboardData.applications.length > 0 ? (
            dashboardData.applications.map((app, index) => (
              <motion.div
                key={index}
                className="border rounded-lg p-4 bg-white shadow-sm"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                <div className="mb-2">
                  <p className="text-xs text-gray-500">Tender</p>
                  <p className="text-sm font-medium text-gray-800">{app.tender?.title || "-"}</p>
                </div>
                <div className="mb-2">
                  <p className="text-xs text-gray-500">Company</p>
                  <p className="text-sm font-medium text-gray-800">{app.company?.name || "-"}</p>
                </div>
                <div className="mb-2">
                  <p className="text-xs text-gray-500">Proposal Amount</p>
                  <p className="text-sm font-medium text-gray-800">
                    ₹{app.proposalAmount?.toLocaleString() || 0}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-gray-500">Status</p>
                  <span
                    className={`inline-block mt-1 px-2 py-1 rounded-full text-xs font-medium ${
                      app.status === "pending"
                        ? "bg-yellow-100 text-yellow-700"
                        : app.status === "approved"
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {app.status}
                  </span>
                </div>
              </motion.div>
            ))
          ) : (
            <div className="text-center py-6 text-gray-400">
              No applications found.
            </div>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
}
