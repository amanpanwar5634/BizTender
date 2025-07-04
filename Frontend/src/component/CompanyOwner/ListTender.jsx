import React, { useEffect, useState } from "react";
import { useAppContext } from "../context/context";
import { toast } from "react-hot-toast";
import { motion } from "framer-motion";

export default function ListTender() {
  const [tenders, setTenders] = useState([]);
  const { axios, getToken, user } = useAppContext();

  const fetchTenders = async () => {
    try {
      const { data } = await axios.get("/api/tenders/owner", {
        headers: { Authorization: `Bearer ${await getToken()}` },
      });
      if (data.success) {
        setTenders(data.tenders);
      } else {
        toast.error(data.message || "Failed to fetch tenders.");
      }
    } catch (err) {
      console.error(err);
      toast.error(err.message || "Failed to fetch tenders.");
    }
  };

  useEffect(() => {
    if (user) fetchTenders();
  }, [user]);

  const handleToggle = async (id) => {
    try {
      const { data } = await axios.post(
        "/api/tenders/toggle-eligibility",
        { tenderId: id },
        { headers: { Authorization: `Bearer ${await getToken()}` } }
      );
      if (data.success) {
        toast.success(data.message);
        fetchTenders();
      } else {
        toast.error(data.message);
      }
    } catch (err) {
      console.error(err);
      toast.error(err.message || "Failed to toggle eligibility.");
    }
  };

  return (
    <motion.div
      className="max-w-7xl mx-auto mt-12 px-4 sm:px-6 lg:px-8"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <motion.h2
        className="text-3xl sm:text-4xl font-bold text-blue-900 mb-10 text-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        📄 Your Tenders
      </motion.h2>

      {/* Desktop Table */}
      <motion.div
        className="hidden md:block overflow-x-auto bg-white shadow-md rounded-lg border border-gray-200"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        <table className="w-full text-sm text-left text-gray-700">
          <thead className="bg-blue-50 text-blue-700 uppercase text-xs tracking-wider">
            <tr>
              <th className="px-6 py-4">Title</th>
              <th className="px-6 py-4">Industry</th>
              <th className="px-6 py-4">Budget</th>
              <th className="px-6 py-4">Company</th>
              <th className="px-6 py-4">Deadline</th>
              <th className="px-6 py-4">Eligible</th>
            </tr>
          </thead>
          <tbody>
            {tenders.map((tender, index) => (
              <motion.tr
                key={tender._id}
                className="border-t hover:bg-blue-50 transition-colors"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 + index * 0.05 }}
              >
                <td className="px-6 py-4">{tender.title}</td>
                <td className="px-6 py-4">{tender.industry}</td>
                <td className="px-6 py-4 font-semibold text-green-600">
                  ₹{tender.budget.toLocaleString()}
                </td>
                <td className="px-6 py-4">{tender.company?.name || "-"}</td>
                <td className="px-6 py-4">
                  {new Date(tender.deadline).toLocaleDateString()}
                </td>
                <td className="px-6 py-4">
                  <label className="inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      className="sr-only peer"
                      checked={tender.isOpen}
                      onChange={() => handleToggle(tender._id)}
                    />
                    <div className="w-11 h-6 bg-gray-300 peer-checked:bg-green-500 rounded-full transition-all relative">
                      <div
                        className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow transform transition-transform ${
                          tender.isOpen ? "translate-x-5" : ""
                        }`}
                      ></div>
                    </div>
                  </label>
                </td>
              </motion.tr>
            ))}
            {tenders.length === 0 && (
              <tr>
                <td colSpan="6" className="text-center py-8 text-gray-400">
                  No tenders found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </motion.div>

      {/* Mobile Cards */}
      <motion.div
        className="block md:hidden space-y-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        {tenders.map((tender, index) => (
          <motion.div
            key={tender._id}
            className="bg-white border border-gray-200 shadow-md rounded-lg p-4 space-y-2"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 + index * 0.05 }}
          >
            <div>
              <span className="font-semibold text-gray-500">Title:</span>{" "}
              {tender.title}
            </div>
            <div>
              <span className="font-semibold text-gray-500">Industry:</span>{" "}
              {tender.industry}
            </div>
            <div>
              <span className="font-semibold text-gray-500">Budget:</span>{" "}
              <span className="text-green-600 font-bold">
                ₹{tender.budget.toLocaleString()}
              </span>
            </div>
            <div>
              <span className="font-semibold text-gray-500">Company:</span>{" "}
              {tender.company?.name || "-"}
            </div>
            <div>
              <span className="font-semibold text-gray-500">Deadline:</span>{" "}
              {new Date(tender.deadline).toLocaleDateString()}
            </div>
            <div className="flex items-center gap-2">
              <span className="font-semibold text-gray-500">Eligible:</span>
              <label className="inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  className="sr-only peer"
                  checked={tender.isOpen}
                  onChange={() => handleToggle(tender._id)}
                />
                <div className="w-11 h-6 bg-gray-300 peer-checked:bg-green-500 rounded-full transition-all relative">
                  <div
                    className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow transform transition-transform ${
                      tender.isOpen ? "translate-x-5" : ""
                    }`}
                  ></div>
                </div>
              </label>
            </div>
          </motion.div>
        ))}
        {tenders.length === 0 && (
          <p className="text-center text-gray-400">No tenders found.</p>
        )}
      </motion.div>
    </motion.div>
  );
}
