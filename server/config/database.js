import mongoose from "mongoose";

const { MONGODB_URL } = process.env;


export const connect = () => {
  mongoose
    .connect(MONGODB_URL, {})
    .then(() => console.log("DB Connection Successfully"))
    .catch((err) => {
      console.error("DB Connection Failed");
      console.error(err);
      process.exit(1);
    });
};
