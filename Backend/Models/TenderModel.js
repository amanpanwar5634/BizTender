import mongoose from "mongoose";

const tenderSchema = new mongoose.Schema({
  company: { type: String, ref: "Company", required: true }, // company/owner reference
  title: { type: String, required: true },
  description: { type: String, required: true },
  industry: { type: String, required: true },
  budget: { type: Number, required: true },
  requirements: { type: [String], required: true },
  documents: [{ type: String }], // file names or URLs
  isOpen: { type: Boolean, default: true },
  deadline: { type: Date, required: true },
}, { timestamps: true });

const Tender = mongoose.model("Tender", tenderSchema);
export default Tender;
