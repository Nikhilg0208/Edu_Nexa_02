import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import fileUpload from "express-fileupload";
import morgan from "morgan";
import { cloudinaryConnect } from "./config/cloudinary.js";
import { connect } from "./config/database.js";
import { connectRedis } from "./config/redis.js";
import contactUsRoute from "./routes/contact.js";
import courseRoutes from "./routes/course.js";
import paymentRoutes from "./routes/payments.js";
import profileRoutes from "./routes/profile.js";
import userRoutes from "./routes/user.js";

const app = express();

dotenv.config();

const mode = process.env.mode || "production";

const redisURI = process.env.REDIS_URI || "";

const PORT = process.env.PORT || 4000;

connect();
export const redis = connectRedis(redisURI);

if (mode !== "production") {
  app.use(morgan("dev"));
}

app.use(express.json());
app.use(cookieParser());

app.options("*", cors());

app.use(
  cors({
    origin: [
      "https://www.rcbian.shop",
      "http://localhost:3000",
      "http://localhost:3000/",
    ],
    credentials: true,
  })
);

app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: "/tmp/",
  })
);

cloudinaryConnect();

app.use("/api/v1/auth", userRoutes);
app.use("/api/v1/profile", profileRoutes);
app.use("/api/v1/course", courseRoutes);
app.use("/api/v1/payment", paymentRoutes);
app.use("/api/v1/reach", contactUsRoute);

app.get("/", (req, res) => {
  return res.json({
    success: true,
    message: "Your server is up and running ...",
  });
});

app.listen(PORT, () => {
  console.log(`App is listening at ${PORT}`);
});
