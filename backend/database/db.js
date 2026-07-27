import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();
const URL = process.env.MONGO_URL;

export const connectDB = async () => {
  try {
    await mongoose.connect(URL);
    console.log("MongoDB Connected");
  } catch (err) {
    console.log("Error:", err);
  }
};
