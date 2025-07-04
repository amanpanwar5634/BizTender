import React, { useEffect, useState } from "react";
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
import { useAppContext } from "../context/context";

export default function OwnerCompanyProfile() {
  const { axios, setIsOwner, getToken } = useAppContext();
  const [company, setCompany] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchCompany = async () => {
    try {
      const { data } = await axios.get("/api/companies/owner", {
        headers: { Authorization: `Bearer ${await getToken()}` },
      });
      if (data.success) {
        setCompany(data.OwnerCompany);
      } else {
        toast.error(data.message || "Failed to fetch company data.");
      }
    } catch (err) {
      console.error(err);
      toast.error(err.response?.data?.message || "Error fetching company.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const checkRole = async () => {
      const { data } = await axios.get("/api/user/me", {
        headers: { Authorization: `Bearer ${await getToken()}` },
      });
      if (data.user.role === "companyOwner") {
        setIsOwner(true);
      }
    };
    checkRole();
    fetchCompany();
  }, []);

  if (loading) {
    return (
      <div className="text-center py-20 text-xl text-gray-600 min-h-screen">
        Loading your company profile...
      </div>
    );
  }

  if (!company) {
    return (
      <div className="text-center py-20 text-xl text-red-600 min-h-screen">
        No company found for your account.
      </div>
    );
  }

  // Framer motion animation variants
  const fadeUp = {
    hidden: { opacity: 0, y: 40 },
    visible: (i = 1) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.2, duration: 0.6 },
    }),
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-16 space-y-20 min-h-screen">
      {/* Hero Section */}
      <motion.section
        className="flex flex-col md:flex-row items-center gap-8"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeUp}
      >
        <img
          src={company.logo}
          alt="Company Logo"
          className="w-40 h-40 rounded-lg shadow-lg border border-gray-300 object-cover"
        />
        <div className="text-center md:text-left">
          <h1 className="text-4xl font-extrabold text-indigo-800 mb-2">
            {company.name}
          </h1>
          <p className="text-lg text-gray-600 flex items-center justify-center md:justify-start gap-2 mb-1">
            <FaIndustry /> {company.industry}
          </p>
          {company.website && (
            <a
              href={company.website}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:underline flex items-center justify-center md:justify-start gap-2"
            >
              <FaGlobe /> {company.website}
            </a>
          )}
        </div>
      </motion.section>

      {/* Details Section */}
      <motion.section
        className="grid md:grid-cols-3 gap-8"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeUp}
      >
        <div className="flex items-start gap-3">
          <FaMapMarkerAlt className="text-indigo-500 text-xl mt-1" />
          <div>
            <h4 className="font-bold text-gray-800">Address</h4>
            <p>{company.address}</p>
          </div>
        </div>
        <div className="flex items-start gap-3">
          <FaPhoneAlt className="text-indigo-500 text-xl mt-1" />
          <div>
            <h4 className="font-bold text-gray-800">Contact</h4>
            <p>{company.contact}</p>
          </div>
        </div>
        <div className="flex items-start gap-3">
          <FaBuilding className="text-indigo-500 text-xl mt-1" />
          <div>
            <h4 className="font-bold text-gray-800">City</h4>
            <p>{company.city}</p>
          </div>
        </div>
      </motion.section>

      {/* About, Vision, Mission */}
      <motion.section
        className="space-y-10"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeUp}
      >
        <div>
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            About the Company
          </h2>
          <p className="text-gray-700 leading-relaxed whitespace-pre-line">
            {company.about ||
              "Our company has a rich history of delivering exceptional services to our clients. We believe in quality, trust, and innovation as our core values."}
          </p>
        </div>
        <div>
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            Our Vision & Mission
          </h2>
          <p className="text-gray-700 leading-relaxed">
            Our vision is to become the leading company in our industry, setting
            benchmarks in quality and client satisfaction. We aim to innovate
            continuously and foster an environment of growth and collaboration.
          </p>
        </div>
        <div>
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Our Values</h2>
          <ul className="list-disc ml-6 text-gray-700 leading-relaxed">
            <li>Integrity and Transparency</li>
            <li>Innovation and Excellence</li>
            <li>Customer-First Approach</li>
            <li>Teamwork and Collaboration</li>
          </ul>
        </div>
      </motion.section>

      {/* Gallery */}
      {company.gallery && company.gallery.length > 0 && (
        <motion.section
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
        >
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Gallery</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {company.gallery.map((img, index) => (
              <img
                key={index}
                src={img}
                alt={`Gallery ${index + 1}`}
                className="w-full h-40 object-cover rounded-lg shadow border"
              />
            ))}
          </div>
        </motion.section>
      )}

      {/* Team Section */}
      <motion.section
        className="space-y-6"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeUp}
      >
        <h2 className="text-2xl font-bold text-gray-800">Meet Our Team</h2>
        <div className="grid md:grid-cols-3 gap-6">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="bg-white shadow rounded-xl p-4 text-center border"
            >
              <div className="w-24 h-24 bg-gray-200 rounded-full mx-auto mb-3" />
              <h4 className="font-semibold">Team Member {i}</h4>
              <p className="text-gray-600 text-sm">Position / Role</p>
            </div>
          ))}
        </div>
      </motion.section>

      {/* Testimonials */}
      <motion.section
        className="space-y-6"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeUp}
      >
        <h2 className="text-2xl font-bold text-gray-800">What Our Clients Say</h2>
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
        className="bg-indigo-50 rounded-2xl p-10 text-center space-y-4"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeUp}
      >
        <h2 className="text-2xl font-bold text-indigo-900">
          Get In Touch With Us
        </h2>
        <p className="text-gray-700 max-w-2xl mx-auto">
          Have questions or want to learn more about our services? We’re here to
          help you every step of the way.
        </p>
        <p className="text-lg text-gray-800">
          📞 {company.contact} | 📍 {company.address}
        </p>
      </motion.section>
    </div>
  );
}
