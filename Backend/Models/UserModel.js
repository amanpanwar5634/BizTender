import mongoose from "mongoose";

const userSchema = mongoose.Schema(
  {
    _id: { type: String, required: true }, // if using Clerk or Auth0 IDs
    username: { type: String, required: true },
    email: { type: String, required: true },
    image: { type: String, required: true },
    role: { type: String, enum: ["user", "companyOwner"],default: "user" },
    industry: { type: String }, // optional: industry for suppliers
    recentSearchedTenders: [{ type: String }], // tender IDs or keywords
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);
export default User;
