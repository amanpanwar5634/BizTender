import React, { useState } from "react";
import { assets } from "../../assets/assets";
import { motion } from "framer-motion";
import { useAppContext } from "../context/context";
import { toast } from "react-hot-toast";

export default function AddTender() {
  const { axios, getToken } = useAppContext();
  const [images, setImages] = useState({ 1: null, 2: null });
  const [inputs, setInputs] = useState({
    title: "",
    industry: "",
    budget: 0,
    requirements: "",
    description: "",
    deadline: "",
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !inputs.title ||
      !inputs.industry ||
      !inputs.budget ||
      !inputs.requirements ||
      !inputs.description ||
      !inputs.deadline ||
      !Object.values(images).some((img) => img)
    ) {
      toast.error("Please fill in all fields and upload at least one document.");
      return;
    }

    setLoading(true);

    try {
      const formData = new FormData();
      Object.entries(inputs).forEach(([key, value]) => formData.append(key, value));
      Object.values(images).forEach((file) => {
        if (file) formData.append("documents", file);
      });

      const { data } = await axios.post("/api/tenders/", formData, {
        headers: {
          Authorization: `Bearer ${await getToken()}`,
          "Content-Type": "multipart/form-data",
        },
      });

      if (data.success) {
        toast.success(data.message || "Tender posted successfully!");
        setInputs({
          title: "",
          industry: "",
          budget: 0,
          requirements: "",
          description: "",
          deadline: "",
        });
        setImages({ 1: null, 2: null });
      } else {
        toast.error(data.message || "Failed to post tender.");
      }
    } catch (err) {
      console.error(err);
      toast.error(err.response?.data?.message || "Server error occurred.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      className="max-w-4xl mx-auto mt-10 p-6 sm:p-10 bg-gradient-to-br from-white via-indigo-50 to-blue-100 rounded-2xl shadow-2xl"
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <h2 className="text-3xl font-bold text-center text-indigo-900 mb-10">
        Add New Tender
      </h2>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Upload Section */}
        <div>
          <p className="font-semibold text-gray-700 mb-2">Upload Supporting Documents</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {Object.keys(images).map((key) => (
              <label
                key={key}
                className="border-2 border-dashed rounded-lg p-2 cursor-pointer hover:border-indigo-500"
              >
                <img
                  src={
                    images[key]
                      ? URL.createObjectURL(images[key])
                      : assets.uploadArea
                  }
                  alt="Upload"
                  className="w-full h-32 object-cover rounded"
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

        {/* Title */}
        <div>
          <label className="block font-medium text-gray-700 mb-1">Tender Title</label>
          <input
            type="text"
            value={inputs.title}
            onChange={(e) => setInputs({ ...inputs, title: e.target.value })}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-400 outline-none"
            placeholder="e.g. Website Development for NGO"
          />
        </div>

        {/* Industry */}
        <div>
          <label className="block font-medium text-gray-700 mb-1">Industry</label>
          <input
            type="text"
            value={inputs.industry}
            onChange={(e) => setInputs({ ...inputs, industry: e.target.value })}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-400 outline-none"
            placeholder="e.g. IT Services"
          />
        </div>

        {/* Budget */}
        <div>
          <label className="block font-medium text-gray-700 mb-1">Budget (INR)</label>
          <input
            type="number"
            value={inputs.budget}
            onChange={(e) => setInputs({ ...inputs, budget: +e.target.value })}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-400 outline-none"
            placeholder="e.g. 100000"
          />
        </div>

        {/* Requirements */}
        <div>
          <label className="block font-medium text-gray-700 mb-1">Requirements</label>
          <input
            type="text"
            value={inputs.requirements}
            onChange={(e) =>
              setInputs({ ...inputs, requirements: e.target.value })
            }
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-400 outline-none"
            placeholder="e.g. React, MongoDB, REST API"
          />
        </div>

        {/* Description */}
        <div>
          <label className="block font-medium text-gray-700 mb-1">Project Description</label>
          <textarea
            value={inputs.description}
            onChange={(e) =>
              setInputs({ ...inputs, description: e.target.value })
            }
            rows={5}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-400 outline-none"
            placeholder="Write a brief about the scope of work..."
          />
        </div>

        {/* Deadline */}
        <div>
          <label className="block font-medium text-gray-700 mb-1">Application Deadline</label>
          <input
            type="date"
            value={inputs.deadline}
            onChange={(e) =>
              setInputs({ ...inputs, deadline: e.target.value })
            }
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-400 outline-none"
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 rounded-lg transition duration-300"
          disabled={loading}
        >
          {loading ? "Submitting..." : "Submit Tender"}
        </button>
      </form>
    </motion.div>
  );
}
