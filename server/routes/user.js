import express from "express";

import { login, signup, sendotp, changePassword } from "../controllers/auth.js";

import {
  resetPasswordToken,
  resetPassword,
} from "../controllers/reset-password.js";

import { auth } from "../middleware/auth.js";

const userRoutes = express.Router();

// Route for user login
userRoutes.post("/login", login);

// Route for user signup
userRoutes.post("/signup", signup);

// Route for sending OTP to the user's email
userRoutes.post("/sendotp", sendotp);

// Route for Changing the password
userRoutes.post("/changepassword", auth, changePassword);

// Route for generating a reset password token
userRoutes.post("/reset-password-token", resetPasswordToken);

// Route for resetting user's password after verification
userRoutes.post("/reset-password", resetPassword);

export default userRoutes;
