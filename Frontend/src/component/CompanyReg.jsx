import React, { useState, useEffect } from "react";
import axios from "axios";
import { assets } from "../assets/assets.js";
import { toast } from "react-hot-toast";
import { useAppContext } from "./context/context.jsx";

export default function CompanyRegModal() {
  const {
    showCompanyReg,
    setShowCompanyReg,
    getToken,
    isOwner,
    setIsOwner,
  } = useAppContext();

  const industries = [
    "Construction",
    "IT Services",
    "Manufacturing",
    "Consulting",
    "Healthcare",
    "Education",
    "Finance",
    "Retail",
    "Transportation",
    "Energy",
  ];

  const [formData, setFormData] = useState({
    name: "",
    address: "",
    contact: "",
    city: "",
    industry: "",
    website: "",
    about: "",  // ✅ new field
    termsAccepted: false,
  });

  const [logoImage, setLogoImage] = useState(null);
  const [galleryImages, setGalleryImages] = useState([]);

  useEffect(() => {
    const modal = document.getElementById("company_modal");
    if (!modal) return;
    if (showCompanyReg) modal.showModal();
    else modal.close();
  }, [showCompanyReg]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.termsAccepted) {
      toast.error("Please accept the terms and conditions.");
      return;
    }

    const form = new FormData();
    form.append("name", formData.name);
    form.append("address", formData.address);
    form.append("contact", formData.contact);
    form.append("city", formData.city);
    form.append("industry", formData.industry);
    form.append("website", formData.website);
    form.append("about", formData.about); // ✅ include about field

    if (logoImage) {
      form.append("logo", logoImage);
    }

    if (galleryImages.length > 0) {
      galleryImages.forEach((img) => form.append("gallery", img));
    }

    try {
      const { data } = await axios.post("/api/companies/", form, {
        headers: {
          Authorization: `Bearer ${await getToken()}`,
          "Content-Type": "multipart/form-data",
        },
      });

      if (data.success) {
        toast.success(data.message || "Company registered successfully!");
        setIsOwner(true);
        setShowCompanyReg(false);
        document.getElementById("company_modal").close();
        setFormData({
          name: "",
          address: "",
          contact: "",
          city: "",
          industry: "",
          website: "",
          about: "",
          termsAccepted: false,
        });
        setLogoImage(null);
        setGalleryImages([]);
      } else {
        toast.error(data.message || "Registration failed.");
      }
    } catch (err) {
      console.error(err);
      toast.error(
        err.response?.data?.message || err.message || "Something went wrong."
      );
    }
  };

  return (
    <dialog id="company_modal" className="modal">
      <div className="modal-box p-8 max-w-5xl md:max-w-4xl lg:max-w-5xl rounded-3xl shadow-xl overflow-y-auto max-h-[90vh]">
        <h2 className="text-3xl font-bold text-indigo-800 text-center mb-6">
          Register Your Company
        </h2>

        <form onSubmit={handleSubmit} className="space-y-5">

          {/* ✅ Single input */}
          <input
            type="text"
            name="name"
            placeholder="Company Name"
            value={formData.name}
            onChange={handleChange}
            required
            className="input input-bordered w-full"
          />

          {/* ✅ Address & Contact */}
          <div className="flex flex-col md:flex-row gap-4">
            <input
              type="text"
              name="address"
              placeholder="Address"
              value={formData.address}
              onChange={handleChange}
              required
              className="input input-bordered w-full md:w-1/2"
            />
            <input
              type="tel"
              name="contact"
              placeholder="Contact Number"
              value={formData.contact}
              onChange={handleChange}
              required
              className="input input-bordered w-full md:w-1/2"
            />
          </div>

          {/* ✅ City & Website */}
          <div className="flex flex-col md:flex-row gap-4">
            <input
              type="text"
              name="city"
              placeholder="City"
              value={formData.city}
              onChange={handleChange}
              required
              className="input input-bordered w-full md:w-1/2"
            />
            <input
              type="url"
              name="website"
              placeholder="Company Website"
              value={formData.website}
              onChange={handleChange}
              className="input input-bordered w-full md:w-1/2"
            />
          </div>

          {/* ✅ Industry */}
          <select
            name="industry"
            value={formData.industry}
            onChange={handleChange}
            required
            className="select select-bordered w-full"
          >
            <option value="">Select Industry</option>
            {industries.map((industry) => (
              <option key={industry} value={industry}>
                {industry}
              </option>
            ))}
          </select>

          {/* ✅ About */}
          <textarea
            name="about"
            placeholder="About the Company"
            value={formData.about}
            onChange={handleChange}
            rows={4}
            className="textarea textarea-bordered w-full"
          ></textarea>

          {/* ✅ Logo Upload */}
          <div>
            <p className="font-semibold mb-2">Company Logo</p>
            <label className="border-2 border-dashed border-gray-400 rounded-lg p-4 cursor-pointer flex items-center justify-center hover:border-indigo-500 transition">
              <img
                src={
                  logoImage
                    ? URL.createObjectURL(logoImage)
                    : assets.uploadArea
                }
                alt="Logo Upload"
                className="w-28 h-28 object-cover"
              />
              <input
                type="file"
                accept="image/*"
                hidden
                onChange={(e) => setLogoImage(e.target.files[0])}
              />
            </label>
          </div>

          {/* ✅ Gallery Upload */}
          <div>
            <p className="font-semibold mb-2">Gallery Images (Max 4)</p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[0, 1, 2, 3].map((i) => (
                <label
                  key={i}
                  className="border-2 border-dashed border-gray-400 rounded-lg p-2 cursor-pointer flex items-center justify-center hover:border-indigo-500 transition"
                >
                  <img
                    src={
                      galleryImages[i]
                        ? URL.createObjectURL(galleryImages[i])
                        : assets.uploadArea
                    }
                    alt="Gallery Upload"
                    className="w-24 h-24 object-cover"
                  />
                  <input
                    type="file"
                    accept="image/*"
                    hidden
                    onChange={(e) => {
                      const files = [...galleryImages];
                      files[i] = e.target.files[0];
                      setGalleryImages(files);
                    }}
                  />
                </label>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              name="termsAccepted"
              checked={formData.termsAccepted}
              onChange={handleChange}
              className="checkbox checkbox-primary"
            />
            <label className="text-sm text-gray-600">
              I agree to the terms and conditions.
            </label>
          </div>

          <button
            type="submit"
            className="btn btn-primary w-full mt-4"
          >
            Register Company
          </button>
        </form>
      </div>

      <form
        method="dialog"
        className="modal-backdrop"
        onClick={() => setShowCompanyReg(false)}
      >
        <button>close</button>
      </form>
    </dialog>
  );
}
