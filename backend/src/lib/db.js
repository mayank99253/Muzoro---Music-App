import mogoose from "mongoose";
import { ENV } from "./env.js";

const connectDB = async () => {
  try {
    await mogoose.connect(ENV.MONGO_URI);
    console.log("Database connected");
  } catch (error) {
    console.error("Database connection failed:", error);
    process.exit(1);
  }
};

export { connectDB };