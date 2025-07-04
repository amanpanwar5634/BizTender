import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-hot-toast";
import {
  FaGlobe,
  FaMapMarkerAlt,
  FaPhoneAlt,
  FaIndustry,
  FaBuilding,
  FaQuoteLeft,
} from "react-icons/fa";
import { motion } from "framer-motion";
import { useAppContext } from "../component/context/context";

export default function CompanyofTender() {
  const { axios } = useAppContext();
  const { id: tenderId } = useParams();
  const [company, setCompany] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchCompany = async () => {
    try {
      const { data } = await axios.get(`/api/companies/tender/${tenderId}`);
      if (data.success) {
        setCompany(data.company);
      } else {
        toast.error(data.message || "Could not fetch company data.");
      }
    } catch (err) {
      console.error(err);
      toast.error("Server error fetching company details.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCompany();
  }, [tenderId]);

  if (loading) {
    return (
      <div className="text-center py-20 text-lg text-gray-500 min-h-screen">
        Loading company details...
      </div>
    );
  }

  if (!company) {
    return (
      <div className="text-center py-20 text-lg text-red-600">
        No company found for this tender.
      </div>
    );
  }

  const fadeUp = {
    hidden: { opacity: 0, y: 40 },
    visible: (i = 1) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.2, duration: 0.6 },
    }),
  };

  return (
    <div className="flex flex-col">
      {/* Hero */}
      <div className="relative w-full bg-gradient-to-r from-indigo-500 to-purple-600 text-white py-16 md:py-24 flex flex-col items-center justify-center text-center px-4">
        <motion.img
          src={company.logo}
          alt="Company Logo"
          className="w-36 h-36 md:w-44 md:h-44 rounded-full border-4 border-white object-cover shadow-lg mb-6"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.6 }}
        />
        <motion.h1
          className="text-4xl md:text-5xl font-bold mb-2"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          {company.name}
        </motion.h1>
        <p className="flex items-center justify-center gap-2 text-lg">
          <FaIndustry /> {company.industry}
        </p>
        {company.website && (
          <a
            href={company.website}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 inline-flex items-center gap-2 text-white underline hover:text-indigo-100"
          >
            <FaGlobe /> {company.website}
          </a>
        )}
      </div>

      {/* Details */}
      <motion.div
        className="max-w-6xl mx-auto px-6 py-16 grid md:grid-cols-3 gap-8"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={{
          hidden: {},
          visible: { transition: { staggerChildren: 0.2 } },
        }}
      >
        {[
          {
            icon: <FaMapMarkerAlt className="text-indigo-600 text-3xl" />,
            title: "Address",
            text: company.address || "N/A",
          },
          {
            icon: <FaPhoneAlt className="text-indigo-600 text-3xl" />,
            title: "Contact",
            text: company.contact || "N/A",
          },
          {
            icon: <FaBuilding className="text-indigo-600 text-3xl" />,
            title: "City",
            text: company.city || "N/A",
          },
        ].map((item, i) => (
          <motion.div
            key={i}
            className="bg-white rounded-xl border shadow hover:shadow-xl p-6 space-y-4 text-center"
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0 },
            }}
          >
            {item.icon}
            <h4 className="text-lg font-semibold">{item.title}</h4>
            <p className="text-gray-600">{item.text}</p>
          </motion.div>
        ))}
      </motion.div>

      {/* About */}
      {company.about && (
        <div className="bg-gray-50 w-full py-16 px-6">
          <motion.div
            className="max-w-4xl mx-auto space-y-6 text-center"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-indigo-700">
              About the Company
            </h2>
            <hr className="w-20 mx-auto border-indigo-300" />
            <p className="text-lg text-gray-700 leading-relaxed whitespace-pre-line">
              {company.about}
            </p>
          </motion.div>
        </div>
      )}

      {/* Gallery */}
      {company.gallery && company.gallery.length > 0 && (
        <div className="w-full py-16 px-6">
          <motion.div
            className="max-w-6xl mx-auto"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={{
              hidden: {},
              visible: { transition: { staggerChildren: 0.15 } },
            }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-indigo-700 mb-6 text-center">
              Our Work & Spaces
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {company.gallery.map((img, i) => (
                <motion.div
                  key={i}
                  className="overflow-hidden rounded-xl shadow group"
                  variants={{
                    hidden: { opacity: 0, scale: 0.9 },
                    visible: { opacity: 1, scale: 1 },
                  }}
                >
                  <img
                    src={img}
                    alt={`Gallery ${i + 1}`}
                    className="w-full h-40 object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      )}

      {/* Testimonials */}
      <motion.section
        className="space-y-6 max-w-6xl mx-auto px-6 py-16"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeUp}
      >
        <h2 className="text-2xl font-bold text-gray-800 text-center">
          What Our Clients Say
        </h2>
        <div className="space-y-4">
          {[1, 2].map((i) => (
            <div
              key={i}
              className="bg-gray-50 border border-gray-200 rounded-lg p-6"
            >
              <FaQuoteLeft className="text-indigo-400 text-2xl mb-2" />
              <p className="text-gray-700 italic">
                "This company provided exceptional service and outstanding
                support throughout our project. Highly recommend!"
              </p>
              <p className="mt-2 text-sm font-semibold text-gray-800">
                - Client {i}
              </p>
            </div>
          ))}
        </div>
      </motion.section>

      {/* Contact CTA */}
      <motion.section
        className="bg-indigo-50 rounded-2xl p-10 text-center space-y-4 max-w-6xl mx-auto px-6 mb-16"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeUp}
      >
        <h2 className="text-2xl font-bold text-indigo-900">
          Interested in working with {company.name}?
        </h2>
        <p className="text-gray-700 max-w-2xl mx-auto">
          Reach out to us with your questions or proposals. We're excited to
          connect and build something amazing together!
        </p>
        <p className="text-lg text-gray-800">
          📞 {company.contact || "N/A"} | 📍 {company.address || "N/A"}
        </p>
        {company.website && (
          <a
            href={company.website}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block mt-4 text-indigo-600 hover:underline font-medium"
          >
            Visit Website
          </a>
        )}
      </motion.section>
    </div>
  );
}
