import mongoose from "mongoose";

const MONGODB_URI = process.env.NEXT_PUBLIC_MONGO_URI_KEY as string;

if (!MONGODB_URI) {
  throw new Error("Please define the MONGODB_URI in your .env.local");
}

export const connectDB = async () => {
  try {
    if (mongoose.connection.readyState >= 1) return;
    await mongoose.connect(MONGODB_URI, {
      dbName: "nextjs_auth",
    });
    console.log("🚀 MongoDB Connected");
  } catch (error) {
    console.error("MongoDB connection error:", error);
  }
};
