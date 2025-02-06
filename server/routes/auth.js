import express from "express";

import {
  login,
  signup,
  sendotp,
  changePassword,
  resetPasswordToken,
  resetPassword,
} from "../controllers/auth.js";

import { auth } from "../middleware/auth.js";

const authRoutes = express.Router();

authRoutes.post("/login", login);

authRoutes.post("/signup", signup);

authRoutes.post("/sendotp", sendotp);

authRoutes.post("/changepassword", auth, changePassword);

authRoutes.post("/reset-password-token", resetPasswordToken);

authRoutes.post("/reset-password", resetPassword);

export default authRoutes;
