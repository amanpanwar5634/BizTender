import React, { useEffect, useState } from "react";
import { useAppContext } from "../context/context";
import { toast } from "react-hot-toast";
import { motion } from "framer-motion";

export default function TenderApplication() {
  const { getToken, axios } = useAppContext();
  const [applications, setApplications] = useState([]);

  useEffect(() => {
    const fetchOwnerApplications = async () => {
      try {
        const token = await getToken();
        const { data } = await axios.get("/api/applications/owner-application", {
          headers: { Authorization: `Bearer ${token}` },
        });
        console.log("Owner applications ->", data);
        if (data.success) {
          setApplications(data.applications);
        } else {
          toast.error(data.message || "Failed to load applications");
        }
      } catch (err) {
        toast.error(err.message || "Something went wrong");
      }
    };

    fetchOwnerApplications();
  }, [axios, getToken]);

  const handleAction = async (id, action) => {
    try {
      const token = await getToken();
      const { data } = await axios.patch(
        `/api/applications/${id}/${action}`,
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (data.success) {
        toast.success(data.message);
        setApplications((prev) =>
          prev.map((app) =>
            app._id === id
              ? { ...app, status: action === "approve" ? "approved" : "rejected" }
              : app
          )
        );
      } else {
        toast.error(data.message);
      }
    } catch (err) {
      toast.error(err.message || "Action failed");
    }
  };

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-6 min-h-screen mt-10">
      <motion.h2
        className="text-2xl sm:text-4xl font-extrabold text-center text-blue-800"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        Tender Applications
      </motion.h2>

      {applications.length === 0 ? (
        <p className="text-center text-gray-600">No applications found.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {applications.map((app, idx) => {
            const tender = app.tender || {};
            const company = app.company || {};

            return (
              <motion.div
                key={app._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.05 }}
                className="bg-white border border-gray-200 shadow rounded-lg p-6 space-y-4 hover:shadow-md transition"
              >
                {/* Tender Info */}
                <div>
                  <h3 className="text-lg font-semibold text-indigo-800">
                    {tender.title || "Tender Title"}
                  </h3>
                  <p className="text-sm text-gray-600 mt-1">
                    Industry: <span className="font-medium">{tender.industry || "N/A"}</span>
                  </p>
                  <p className="text-sm text-gray-600">
                    Budget: <span className="font-medium">₹{tender.budget?.toLocaleString() || "N/A"}</span>
                  </p>
                  <p className="text-sm text-gray-600">
                    Deadline:{" "}
                    <span className="font-medium">
                      {tender.deadline ? new Date(tender.deadline).toLocaleDateString() : "N/A"}
                    </span>
                  </p>
                </div>

                {/* Application Info */}
                <div className="text-sm text-gray-700">
                  <p>
                    Proposal Amount:{" "}
                    <span className="font-medium">
                      ₹{app.proposalAmount?.toLocaleString() || "N/A"}
                    </span>
                  </p>
                  <p>
                    Submitted On:{" "}
                    <span className="font-medium">
                      {new Date(app.submittedAt).toLocaleDateString()}
                    </span>
                  </p>
                </div>

                {/* Company Info */}
                {company && (
                  <div className="bg-blue-50 p-3 rounded-md border border-blue-200">
                    <h4 className="text-sm font-semibold text-blue-800 mb-1">Company Info</h4>
                    <p className="text-xs text-gray-700">
                      Name: <span className="font-medium">{company.name || "N/A"}</span>
                    </p>
                    <p className="text-xs text-gray-700">
                      City: <span className="font-medium">{company.city || "N/A"}</span>
                    </p>
                    <p className="text-xs text-gray-700">
                      Website:{" "}
                      {company.website ? (
                        <a
                          href={company.website}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-600 hover:underline"
                        >
                          {company.website}
                        </a>
                      ) : (
                        "N/A"
                      )}
                    </p>
                  </div>
                )}

                {/* Status + Actions */}
                <div className="flex items-center gap-3">
                  <div
                    className={`text-xs font-semibold px-2 py-1 rounded-full inline-block ${
                      (app.status || "").toLowerCase() === "pending"
                        ? "bg-yellow-100 text-yellow-700"
                        : (app.status || "").toLowerCase() === "approved"
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {(app.status || "PENDING").toUpperCase()}
                  </div>

                  {(app.status || "").toLowerCase() === "pending" && (
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleAction(app._id, "approve")}
                        className="px-3 py-1 bg-green-600 hover:bg-green-700 text-white text-xs rounded"
                      >
                        Accept
                      </button>
                      <button
                        onClick={() => handleAction(app._id, "reject")}
                        className="px-3 py-1 bg-red-600 hover:bg-red-700 text-white text-xs rounded"
                      >
                        Reject
                      </button>
                    </div>
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>
      )}
    </div>
  );
}
