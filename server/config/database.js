import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const MONGODB_URL = process.env.MONGODB_URL;

if (!MONGODB_URL) {
  console.error("MongoDB URL is missing! Check your .env file.");
  process.exit(1);
}

export const connect = () => {
  mongoose
    .connect(MONGODB_URL, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log("✅ DB Connected Successfully"))
    .catch((err) => {
      console.error("❌ DB Connection Failed:", err);
      process.exit(1);
    });
};
