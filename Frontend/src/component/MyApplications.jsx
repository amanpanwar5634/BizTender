import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import toast from "react-hot-toast";
import { useAppContext } from "./context/context";
import {
  FaCalendarAlt,
  FaMoneyBillWave,
  FaBuilding,
  FaClock,
  FaCheckCircle,
  FaTimesCircle,
} from "react-icons/fa";

export default function MyApplications() {
  const { axios, getToken, user } = useAppContext();
  const [applications, setApplications] = useState([]);

  const fetchUserApplications = async () => {
    try {
      const { data } = await axios.get("/api/applications/user", {
        headers: { Authorization: `Bearer ${await getToken()}` },
      });
      if (data.success) {
        console.log("data.applications ->", data.applications);
        setApplications(data.applications);
      } else {
        toast.error(data.message);
      }
    } catch (err) {
      toast.error(err.message);
    }
  };

  useEffect(() => {
    if (user) fetchUserApplications();
  }, [user]);

  const formatDate = (dateStr) =>
    new Date(dateStr).toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });

  return (
    <motion.div
      className="p-6 md:p-10 min-h-screen bg-gradient-to-b from-white via-blue-50 to-blue-100 text-gray-800"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <motion.h1
        className="text-4xl font-bold mb-10 text-center text-blue-900 underline underline-offset-4"
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        My Applications
      </motion.h1>

      {/* ✅ Applications List */}
      {applications.map((app, index) => (
        <motion.div
          key={app._id}
          className="grid grid-cols-1 md:grid-cols-3 gap-4 bg-white rounded-xl shadow-lg p-6 mb-6 hover:shadow-xl transition-shadow duration-300 border-l-4 border-blue-400"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
        >
          {/* ✅ Tender Info */}
          <div className="flex flex-col gap-2">
            <h2 className="text-xl font-bold text-blue-800">{app.tender.title}</h2>
            <p className="text-sm text-gray-600">{app.tender.industry}</p>
            <p className="flex items-center gap-1 text-sm text-gray-600">
              <FaBuilding className="text-blue-500" /> {app.company.name}
            </p>
          </div>

          {/* ✅ Proposal & Dates */}
          <div className="flex flex-col gap-2">
            <p className="flex items-center gap-2 text-gray-700 text-sm">
              <FaMoneyBillWave className="text-green-600" />
              Proposal: ₹{app.proposalAmount.toLocaleString()}
            </p>
            <p className="flex items-center gap-2 text-gray-700 text-sm">
              <FaClock className="text-purple-600" />
              Deadline: {formatDate(app.tender.deadline)}
            </p>
            <p className="flex items-center gap-2 text-gray-700 text-sm">
              <FaCalendarAlt className="text-blue-600" />
              Submitted: {formatDate(app.submittedAt)}
            </p>
          </div>

          {/* ✅ Status */}
          <div className="flex flex-col gap-2 justify-center md:items-center">
            {app.isSubmitted ? (
              <span className="flex items-center gap-2 text-green-700 font-semibold bg-green-50 px-4 py-1 rounded-full text-sm">
                <FaCheckCircle /> Submitted
              </span>
            ) : (
              <span className="flex items-center gap-2 text-red-700 font-semibold bg-red-50 px-4 py-1 rounded-full text-sm">
                <FaTimesCircle /> Not Submitted
              </span>
            )}
            <span className="px-4 py-1 rounded-full text-sm font-semibold bg-yellow-100 text-yellow-700 capitalize">
              Status: {app.status}
            </span>
          </div>
        </motion.div>
      ))}
    </motion.div>
  );
}
