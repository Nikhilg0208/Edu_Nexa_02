import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const { MONGODB_URL } = process.env;

export const connect = () => {
  mongoose
    .connect(MONGODB_URL, {})
    .then(() => console.log("DB Connection Successful"))
    .catch((err) => {
      console.error("DB Connection Failed");
      // console.error(err);
      process.exit(1);
    });
};
