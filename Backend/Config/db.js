import mongoose from "mongoose";

export const connectDb = async () => {
  try {
    await mongoose.connect(
     `${process.env.MONGODB_URL}/Biztender`
    );
    console.log("✅ Database connected successfully");
  } catch (err) {
    console.error("❌ Failed to connect to MongoDB:", err.message);
 
  }
};
