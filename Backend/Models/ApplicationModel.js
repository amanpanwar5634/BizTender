import mongoose from "mongoose";

const applicationSchema = mongoose.Schema(
  {
    user: { type:String, ref: "User", required: true },
    tender: {  type:String, ref: "Tender", required: true },
    company: {  type:String, ref: "Company", required: true },
    proposalAmount: { type: Number, required: true },
    status: { type: String, enum: ["pending", "approved", "rejected"], default: "pending", },
    submittedAt: { type: Date, required: true },
    isSubmitted: { type: Boolean, default: true },
  },
  { timestamps: true }
);

const Application = mongoose.model("Application", applicationSchema);

export default Application;
