import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { tendersDummyData } from "../assets/assets";
import { motion } from "framer-motion";
import { FaMapMarkerAlt, FaIndustry, FaMoneyBillWave, FaClock, FaBuilding, FaCheckCircle, FaTimesCircle, FaCheck } from "react-icons/fa";
import toast from "react-hot-toast";

export default function TenderDetail() {
  const { id } = useParams();
  const [tender, setTender] = useState(null);
  const [comment, setComment] = useState("");
  const [isEligible, setIsEligible] = useState(false);

  useEffect(() => {
    const found = tendersDummyData.find((t) => t._id === id);
    if (found) setTender(found);
  }, [id]);

  const checkEligibility = () => {
    if (!tender.isOpen || new Date() > new Date(tender.deadline)) {
      toast.error("This tender is closed or the deadline has passed.");
      setIsEligible(false);
    } else {
      toast.success("You are eligible to apply!");
      setIsEligible(true);
    }
  };

  const submitApplication = (e) => {
    e.preventDefault();
    if (!isEligible) {
      return checkEligibility();
    } else {
      toast.success("Your application has been submitted!");
      // Here, you’d call your POST /api/tenders/apply endpoint
      setComment("");
    }
  };

  if (!tender) return <div className="text-center p-10">Loading...</div>;

  return (
    <div className="p-6 md:p-12 min-h-screen bg-gradient-to-b from-white via-gray-50 to-blue-50 text-gray-800 space-y-12">
      {/* ✅ Hero */}
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="text-center max-w-4xl mx-auto">
        <h1 className="text-3xl md:text-5xl font-extrabold mb-4 text-blue-900">{tender.title}</h1>
        <p className="text-gray-600 text-base md:text-lg">{tender.description}</p>
      </motion.div>

      {/* ✅ Tender Info */}
      <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="max-w-5xl mx-auto bg-white rounded-xl border border-blue-100 shadow-lg p-6 md:p-8 space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <DetailItem icon={<FaMapMarkerAlt />} label="Location" value={tender.location} color="blue" />
          <DetailItem icon={<FaIndustry />} label="Industry" value={tender.industry} color="green" />
          <DetailItem icon={<FaMoneyBillWave />} label="Budget" value={`₹${tender.budget.toLocaleString()}`} color="yellow" />
          <DetailItem icon={<FaClock />} label="Deadline" value={new Date(tender.deadline).toLocaleDateString()} color="purple" />
          <div className="flex items-start gap-4">
            {tender.isOpen ? (
              <FaCheckCircle className="text-green-600 text-2xl mt-1" />
            ) : (
              <FaTimesCircle className="text-red-600 text-2xl mt-1" />
            )}
            <div>
              <h4 className="font-semibold text-gray-800">Status</h4>
              <p className={tender.isOpen ? "text-green-700" : "text-red-700"}>{tender.isOpen ? "Open" : "Closed"}</p>
            </div>
          </div>
        </div>

        {/* ✅ Requirements */}
        {tender.requirements?.length > 0 && (
          <div>
            <h3 className="text-lg font-semibold mb-3 text-blue-900">Requirements</h3>
            <ul className="flex flex-wrap gap-3">
              {tender.requirements.map((req, i) => (
                <li key={i} className="flex items-center gap-2 bg-blue-100 px-4 py-2 rounded-full text-blue-800 text-sm shadow-sm">
                  <FaCheck className="text-blue-500" /> {req}
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* ✅ Documents */}
        {tender.documents?.length > 0 && (
          <div>
            <h3 className="text-lg font-semibold mb-3 text-blue-900">Tender Documents</h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
              {tender.documents.map((doc, idx) => (
                <div key={idx} className="border border-blue-100 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition">
                  <img src={`https://via.placeholder.com/400x300?text=${encodeURIComponent(doc)}`} alt={doc} className="w-full h-40 object-cover" />
                  <div className="p-3 text-center text-sm text-blue-800 font-medium">{doc}</div>
                </div>
              ))}
            </div>
          </div>
        )}
      </motion.section>

      {/* ✅ Company Info */}
      {tender.company && (
        <motion.section initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="max-w-5xl mx-auto bg-gradient-to-r from-blue-50 to-blue-100 border border-blue-200 rounded-xl p-6 md:p-8 shadow-lg flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <img src={tender.company.logo || "https://via.placeholder.com/80"} alt="Company Logo" className="w-20 h-20 rounded-full object-cover border-4 border-blue-300 shadow-md" />
            <div>
              <h3 className="text-xl font-bold text-blue-900">{tender.company.name}</h3>
              <p className="text-gray-600 flex items-center gap-2">
                <FaBuilding className="text-blue-600" /> {tender.company.industry}
              </p>
            </div>
          </div>
          <motion.a whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} href={tender.company.website || "#"} target="_blank" rel="noopener noreferrer" className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg shadow font-semibold">Visit Company</motion.a>
        </motion.section>
      )}

      {/* ✅ Apply / Check Form */}
      <motion.section initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="max-w-5xl mx-auto bg-white rounded-xl p-6 md:p-8 shadow space-y-4">
        <h3 className="text-xl font-bold text-blue-900">Apply for this Tender</h3>
        <form onSubmit={submitApplication} className="space-y-4">
          <textarea placeholder="Write a short note or cover letter..." value={comment} onChange={(e) => setComment(e.target.value)} className="w-full border px-4 py-3 rounded-lg text-sm" rows={4} required />
          <div className="flex flex-col sm:flex-row gap-4">
            <button type="button" onClick={checkEligibility} className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded shadow">Check Eligibility</button>
            <button type="submit" className={`w-full sm:w-auto ${isEligible ? "bg-green-600 hover:bg-green-700" : "bg-gray-300 cursor-not-allowed"} text-white px-6 py-2 rounded shadow`}>
              {isEligible ? "Submit Application" : "Check Eligibility First"}
            </button>
          </div>
        </form>
      </motion.section>
    </div>
  );
}

function DetailItem({ icon, label, value, color }) {
  return (
    <div className="flex items-start gap-4">
      <div className={`text-${color}-600 text-2xl mt-1`}>{icon}</div>
      <div>
        <h4 className={`font-semibold text-${color}-800`}>{label}</h4>
        <p>{value}</p>
      </div>
    </div>
  );
}
