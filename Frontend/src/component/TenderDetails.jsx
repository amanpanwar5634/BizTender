import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useAppContext } from "./context/context";
import { motion } from "framer-motion";
import {
  FaMapMarkerAlt,
  FaIndustry,
  FaCheckCircle,
  FaBuilding,
  FaRegClock,
  FaListUl,
  FaFileAlt
} from "react-icons/fa";
import { IoMdPricetags } from "react-icons/io";
import { toast } from "react-hot-toast";

export default function TenderDetail() {
  const { id } = useParams();
  const { tenders, getToken, axios, navigate } = useAppContext();

  const [tender, setTender] = useState(null);
  const [isEligible, setIsEligible] = useState(false);
  const [proposalAmount, setProposalAmount] = useState("");
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    const selectedTender = tenders.find((t) => t._id === id);
    if (selectedTender) {
      setTender(selectedTender);
    }
  }, [id, tenders]);

  const checkEligibility = async () => {
    try {
      const { data } = await axios.post(`/api/applications/check-eligibility`, { tender: id });
      console.log("data from the checkEligibility->",data);
      if (data.success) {
        if (data.isEligible) {
          setIsEligible(true);
          toast.success("You are eligible to apply!");
        } else {
          setIsEligible(false);
          toast.error("You are not eligible for this tender.");
        }
      } else {
        toast.error(data.message);
      }
    } catch (err) {
      toast.error(err.message);
    }
  };

  const onSubmitHandler = async (e) => {
    try {
      e.preventDefault();
      if (!isEligible) {
        return checkEligibility();
      }

      if (!proposalAmount) {
        toast.error("Please enter your proposal amount.");
        return;
      }

      const { data } = await axios.post(
        `/api/applications/apply`,
        {
          tender: id,
          proposalAmount: proposalAmount,
        },
        {
          headers: { Authorization: `Bearer ${await getToken()}` },
        }
      );
console.log("data from application->",data);
      if (data.success) {
        toast.success(data.message);
        navigate(`/my-applications`);
        window.scrollTo(0, 0);
      } else {
        toast.error(data.message);
      }
    } catch (err) {
      toast.error(err.message);
    }
  };

  return (
    tender && (
      <div className="p-6 md:p-10 min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50 text-gray-800 space-y-12">
        {/* Tender Intro */}
        <motion.div
          className="max-w-4xl mx-auto text-center space-y-4 mt-6 sm:mt-10"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
        >
          <motion.h2 className="text-2xl sm:text-4xl font-extrabold bg-gradient-to-r from-blue-600 via-indigo-500 to-purple-400 bg-clip-text text-transparent drop-shadow-md">
            Tender Details
          </motion.h2>

          <motion.p className="text-gray-600 text-sm sm:text-base max-w-3xl mx-auto">
            Explore full details about this tender, eligibility, company, documents, and how to apply.
          </motion.p>
        </motion.div>

        {/* Tender Info */}
        <motion.section
          className="max-w-6xl mx-auto bg-white rounded-2xl shadow-xl p-6 sm:p-8 space-y-6 border border-blue-100"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <motion.h1 className="text-3xl sm:text-4xl font-extrabold text-blue-900">
            {tender.title}
          </motion.h1>

          <div className="text-gray-700 text-base leading-relaxed">
            {tender.description}
          </div>

          <motion.div className="grid grid-cols-1 md:grid-cols-2 gap-5 text-gray-700 text-sm sm:text-base">
            <div className="flex items-start gap-3 bg-green-50 p-4 rounded-lg shadow hover:shadow-md transition">
              <FaIndustry className="text-green-600 text-xl mt-1" />
              <div>
                <div className="font-semibold text-green-800 mb-1">Industry</div>
                <div>{tender.industry}</div>
              </div>
            </div>

            <div className="flex items-start gap-3 bg-yellow-50 p-4 rounded-lg shadow hover:shadow-md transition">
              <IoMdPricetags className="text-yellow-600 text-xl mt-1" />
              <div>
                <div className="font-semibold text-yellow-800 mb-1">Budget</div>
                <div>₹{tender.budget?.toLocaleString()}</div>
              </div>
            </div>

            <div className="flex items-start gap-3 bg-pink-50 p-4 rounded-lg shadow hover:shadow-md transition">
              <FaRegClock className="text-pink-600 text-xl mt-1" />
              <div>
                <div className="font-semibold text-pink-800 mb-1">Deadline</div>
                <div>{new Date(tender.deadline).toLocaleDateString()}</div>
              </div>
            </div>

            <div className="flex items-start gap-3 bg-purple-50 p-4 rounded-lg shadow hover:shadow-md transition">
              <FaCheckCircle className="text-purple-600 text-xl mt-1" />
              <div>
                <div className="font-semibold text-purple-800 mb-1">Status</div>
                <div>{tender.isOpen ? "Open" : "Closed"}</div>
              </div>
            </div>
          </motion.div>

          {tender.requirements?.length > 0 && (
            <div className="bg-blue-50 p-4 rounded-lg shadow hover:shadow-md transition">
              <div className="flex items-center gap-2 text-blue-800 font-semibold mb-2">
                <FaListUl className="text-blue-500" /> Requirements
              </div>
              <ul className="list-disc list-inside space-y-1 text-gray-700">
                {tender.requirements.map((req, idx) => (
                  <li key={idx}>{req}</li>
                ))}
              </ul>
            </div>
          )}

         {tender.documents?.length > 0 && (
  <div className="bg-green-50 p-4 rounded-lg shadow hover:shadow-md transition">
    <div className="flex items-center gap-2 text-green-800 font-semibold mb-4">
      <FaFileAlt className="text-green-600" /> Documents
    </div>

    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
      {tender.documents.map((doc, idx) => (
        <div key={idx} className="relative group overflow-hidden rounded-lg shadow-lg cursor-pointer">
          {/* Blurred Image */}
          <a
            href={doc}
            download
            className="block"
          >
            <img
              src={doc}
              alt={`Document ${idx + 1}`}
              className="w-full h-48 object-cover filter blur-md transition duration-300"
            />

            {/* Download Icon Overlay */}
            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition">
              <div className="bg-white bg-opacity-80 rounded-full p-3">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-6 h-6 text-green-700"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v2a2 2 0 002 2h12a2 2 0 002-2v-2M7 10l5 5 5-5M12 4v12" />
                </svg>
              </div>
            </div>
          </a>

          {/* File Name Below */}
          <div className="mt-2 text-sm text-center text-gray-600 truncate">
            {doc.split("/").pop()}
          </div>
        </div>
      ))}
    </div>
  </div>
)}

        </motion.section>

        {/* Apply Section with Proposal Amount */}
        <section className="max-w-6xl mx-auto bg-white rounded-xl p-6 sm:p-8 shadow-md space-y-6">
          <h2 className="text-xl sm:text-2xl font-bold text-blue-800">Apply for Tender</h2>
          <form onSubmit={onSubmitHandler} className="flex flex-col gap-4">

            <div>
              <label htmlFor="proposalAmount" className="block text-sm font-medium text-gray-700 mb-1">
                Proposal Amount (₹)
              </label>
              <input
                type="number"
                id="proposalAmount"
                value={proposalAmount}
                onChange={(e) => setProposalAmount(e.target.value)}
                placeholder="Enter your proposal amount"
                className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <button
                type="button"
                onClick={checkEligibility}
                className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded shadow text-sm"
              >
                Check Eligibility
              </button>
              <button
                type="submit"
                className={`w-full sm:w-auto ${
                  isEligible ? "bg-green-600 hover:bg-green-700" : "bg-gray-300 cursor-not-allowed"
                } text-white font-semibold py-2 px-6 rounded shadow text-sm`}
                disabled={!isEligible}
              >
                {isEligible ? "Submit Application" : "Check Eligibility First"}
              </button>
            </div>
          </form>
        </section>

        {/* Company Info */}
        {tender.company && (
          <motion.section
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="max-w-6xl mx-auto bg-gradient-to-r from-indigo-50 to-blue-50 border border-blue-200 p-6 rounded-2xl shadow-lg flex flex-col sm:flex-row items-center justify-between gap-6"
          >
            <div className="flex items-center gap-4">
              <img
                src={tender.company.logo || "https://via.placeholder.com/80"}
                alt="Company"
                className="w-20 h-20 sm:w-24 sm:h-24 rounded-full object-cover border-4 border-indigo-300 shadow-md"
              />
              <div>
                <h3 className="text-xl sm:text-2xl font-bold text-indigo-900">{tender.company.name}</h3>
                <p className="text-sm sm:text-base text-gray-600 flex items-center gap-2">
                  <FaBuilding className="text-indigo-600" /> {tender.company.industry}
                </p>
              </div>
            </div>
     <motion.button
  whileHover={{ scale: 1.05 }}
  whileTap={{ scale: 0.95 }}
  onClick={() => navigate(`/tendercompany/${tender._id}`)}
  className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-lg shadow-md text-base font-semibold"
>
  Visit Company
</motion.button>

          </motion.section>
        )}

        {/* Modal */}
        {selectedImage && (
          <div
            className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50"
            onClick={() => setSelectedImage(null)}
          >
            <img
              src={selectedImage}
              alt="Document Preview"
              className="max-h-full max-w-full rounded-lg shadow-lg"
            />
          </div>
        )}
      </div>
    )
  );
}
