import React, { useState } from "react";
import { assets } from "../../assets/assets";
import { motion } from "framer-motion";

export default function AddTender() {
  const [images, setImages] = useState({ 1: null, 2: null });
  const [inputs, setInputs] = useState({
    title: "",
    industry: "",
    budget: 0,
    requirements: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Added Tender Data:", { ...inputs, images });
    alert("Tender added (dummy): check console!");
  };

  return (
    <motion.div
      className="max-w-4xl mx-auto mt-10 p-6 sm:p-10 bg-gradient-to-br from-blue-50 to-indigo-100 rounded-2xl shadow-2xl"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <h2 className="text-3xl font-bold text-center text-indigo-900 mb-8">
        Add New Tender
      </h2>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <p className="font-semibold text-gray-700 mb-2">Upload Documents</p>
          <div className="grid grid-cols-2 gap-4">
            {Object.keys(images).map((key) => (
              <label key={key} className="border-2 border-dashed rounded-lg p-2 cursor-pointer">
                <img
                  src={images[key] ? URL.createObjectURL(images[key]) : assets.uploadArea}
                  alt=""
                  className="w-full h-32 object-cover"
                />
                <input
                  type="file"
                  accept="image/*,.pdf"
                  hidden
                  onChange={(e) =>
                    setImages({ ...images, [key]: e.target.files[0] })
                  }
                />
              </label>
            ))}
          </div>
        </div>

        <input
          className="input input-bordered w-full"
          placeholder="Tender Title"
          value={inputs.title}
          onChange={(e) => setInputs({ ...inputs, title: e.target.value })}
        />

        <input
          className="input input-bordered w-full"
          placeholder="Industry"
          value={inputs.industry}
          onChange={(e) => setInputs({ ...inputs, industry: e.target.value })}
        />

        <input
          className="input input-bordered w-full"
          placeholder="Budget"
          type="number"
          value={inputs.budget}
          onChange={(e) => setInputs({ ...inputs, budget: +e.target.value })}
        />

        <input
          className="input input-bordered w-full"
          placeholder="Requirements (comma separated)"
          value={inputs.requirements}
          onChange={(e) =>
            setInputs({ ...inputs, requirements: e.target.value })
          }
        />

        <button type="submit" className="btn btn-primary w-full">
          Add Tender
        </button>
      </form>
    </motion.div>
  );
}
