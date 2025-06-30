import React, { useState, useEffect } from "react";
import { assets, cities } from "../assets/assets.js";
import { toast } from "react-hot-toast";

export default function CompanyRegModal({ showCompanyReg, setShowCompanyReg }) {
  const [formData, setFormData] = useState({
    name: "",
    address: "",
    contact: "",
    city: "",
    industry: "",
    termsAccepted: false,
  });

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

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.termsAccepted) {
      toast.error("Please accept the terms and conditions.");
      return;
    }

    console.log("✅ Company Registered:", formData);
    toast.success("Company registered successfully!");

    // Close modal & reset form
    document.getElementById("company_modal").close();
    setShowCompanyReg(false);
    setFormData({
      name: "",
      address: "",
      contact: "",
      city: "",
      industry: "",
      termsAccepted: false,
    });
  };

  return (
    <dialog id="company_modal" className="modal">
      <div className="modal-box p-0 max-w-4xl overflow-hidden">
        <div className="flex flex-col md:flex-row w-full h-full">
          {/* Left Side: Image */}
          <div className="md:w-1/2 w-full bg-blue-100 flex justify-center items-center p-4">
            <img
              src={assets.regImage}
              alt="Register"
              className="rounded-lg w-full h-auto object-cover"
            />
          </div>

          {/* Right Side: Form */}
          <div className="md:w-1/2 w-full p-6 space-y-4 bg-white">
            <h2 className="text-2xl font-bold text-blue-800 text-center">
              Register Your Company
            </h2>

            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                type="text"
                name="name"
                placeholder="Company Name"
                value={formData.name}
                onChange={handleChange}
                required
                className="input input-bordered w-full"
              />

              <input
                type="text"
                name="address"
                placeholder="Address"
                value={formData.address}
                onChange={handleChange}
                required
                className="input input-bordered w-full"
              />

              <input
                type="tel"
                name="contact"
                placeholder="Contact Number"
                value={formData.contact}
                onChange={handleChange}
                required
                className="input input-bordered w-full"
              />

              <select
                name="city"
                value={formData.city}
                onChange={handleChange}
                required
                className="select select-bordered w-full"
              >
                <option value="">Select City</option>
                {cities.map((city) => (
                  <option key={city} value={city}>
                    {city}
                  </option>
                ))}
              </select>

              <input
                type="text"
                name="industry"
                placeholder="Industry"
                value={formData.industry}
                onChange={handleChange}
                required
                className="input input-bordered w-full"
              />

              {/* Terms Checkbox */}
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

              <button type="submit" className="btn btn-primary w-full mt-2">
                Register Company
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Backdrop */}
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
